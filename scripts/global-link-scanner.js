const fs = require("fs");
const glob = require("glob");
const axios = require("axios");
const cheerio = require("cheerio");
const { unified } = require("unified");
const remarkParse = require("remark-parse");
const remarkStringify = require("remark-stringify");
const { visit } = require("unist-util-visit");

// -----------------------------
// CONFIGURATION
// -----------------------------
const MY_DOMAIN = "https://smartgentools.com"; 
const SITEMAP_URL = "https://smartgentools.com/sitemap.xml";

const BLOG_FILES = glob.sync("blog-posts/**/*.md"); 
const HTML_FILES = glob.sync("**/*.html", { ignore: ["node_modules/**", ".git/**"] }); 
const README_FILE = "README.md";

const urlRegex = /https?:\/\/[^\s"'<>]*(?<![.,;:!?])/g;

let validUrls = new Set();
let brokenLinksReport = []; 

// Normalize URLs to a standard format (removes trailing slashes and makes lowercase)
// This prevents valid links like /base64-to-image/ from being falsely flagged
function normalizeUrl(url) {
  if (!url) return "";
  return url.trim().replace(/\/+$/, "").toLowerCase();
}

// 1. Load valid links from Sitemap
async function loadSitemapUrls() {
  try {
    const res = await axios.get(SITEMAP_URL);
    const $ = cheerio.load(res.data, { xmlMode: true });
    $("url loc").each((_, el) => {
      const url = $(el).text().trim();
      if (url) validUrls.add(normalizeUrl(url));
    });
  } catch (e) {
    console.error("❌ Sitemap error:", e.message);
  }
}

// 2. Load valid links from README.md
function loadReadmeUrls() {
  try {
    if (fs.existsSync(README_FILE)) {
      const content = fs.readFileSync(README_FILE, "utf-8");
      const matches = [...content.matchAll(urlRegex)];
      matches.forEach(m => {
        if (m[0].startsWith(MY_DOMAIN)) validUrls.add(normalizeUrl(m[0]));
      });
    }
  } catch (e) {
    console.warn(`⚠️ Could not read ${README_FILE}:`, e.message);
  }
}

// 3. Load valid links from HTML files (including relative paths)
function loadHtmlUrls() {
  for (const file of HTML_FILES) {
    try {
      const content = fs.readFileSync(file, "utf-8");
      const $ = cheerio.load(content);
      
      $("a").each((_, el) => {
        let href = $(el).attr("href");
        if (href) {
          if (href.startsWith(MY_DOMAIN)) {
            validUrls.add(normalizeUrl(href));
          } else if (href.startsWith("/") && !href.startsWith("//")) {
            // Convert relative links (/page) to full URLs before adding to the valid list
            validUrls.add(normalizeUrl(MY_DOMAIN + href));
          }
        }
      });
    } catch (e) {}
  }
}

// 4. Safely process blog posts using AST (Abstract Syntax Tree)
function processBlogFiles() {
  const processor = unified().use(remarkParse).use(remarkStringify);

  for (const file of BLOG_FILES) {
    try {
      let content = fs.readFileSync(file, "utf-8");
      const ast = processor.parse(content);
      let madeChanges = false;

      // Accurately visit only link nodes in the Markdown tree
      visit(ast, "link", (node) => {
        const originalUrl = node.url;
        
        if (originalUrl && originalUrl.startsWith(MY_DOMAIN)) {
          const normalized = normalizeUrl(originalUrl);
          
          // If the link is missing from valid sources, neutralize it safely
          if (!validUrls.has(normalized)) {
            console.log(`❌ Removing broken internal link in [${file}]: ${originalUrl}`);
            node.url = "#"; // Converts broken link to a dead link (#) without destroying anchor text
            brokenLinksReport.push({ file, url: originalUrl });
            madeChanges = true;
          }
        }
      });

      if (madeChanges) {
        const updatedContent = processor.stringify(ast);
        fs.writeFileSync(file, updatedContent, "utf-8");
      }
    } catch (e) {
      console.error(`❌ Error parsing file ${file}:`, e.message);
    }
  }
}

// 5. Generate README.md Status Alerts
function updateReadmeStatus() {
  try {
    if (!fs.existsSync(README_FILE)) return;
    let readmeContent = fs.readFileSync(README_FILE, "utf-8");
    
    const startTag = "";
    const endTag = "";

    if (!readmeContent.includes(startTag) || !readmeContent.includes(endTag)) return;

    let statusContent = "";
    if (brokenLinksReport.length === 0) {
      statusContent = `\n### 🟢 Link Status: All Perfect!\nNo broken internal links (\`${MY_DOMAIN}\`) found in Blog Posts. Last checked: ${new Date().toUTCString()}\n`;
    } else {
      statusContent = `\n### 🔴 Warning: Broken Internal Links Cleaned!\nAutomatically neutralized **${brokenLinksReport.length}** invalid internal link(s) from blog posts. External links and article layouts remain fully safe.\n\n| Blog File | Removed URL |\n| --- | --- |\n`;
      brokenLinksReport.forEach(item => {
        statusContent += `| \`${item.file}\` | \`${item.url}\` |\n`;
      });
      statusContent += `\n*Last auto-cleaned on: ${new Date().toUTCString()}*\n`;
    }

    const regexPattern = new RegExp(`${startTag}[\\s\\S]*?${endTag}`);
    const updatedReadme = readmeContent.replace(regexPattern, `${startTag}${statusContent}${endTag}`);
    fs.writeFileSync(README_FILE, updatedReadme, "utf-8");
  } catch (e) {
    console.error("❌ README update error:", e.message);
  }
}

// Execution block
(async () => {
  console.log(`🚀 Starting Bulletproof Scanner for: ${MY_DOMAIN}`);
  await loadSitemapUrls();
  loadReadmeUrls();
  loadHtmlUrls();
  console.log(`🔗 Total Valid Internal Links Indexed: ${validUrls.size}`);
  
  processBlogFiles();
  updateReadmeStatus();
  console.log("✅ Process safely finished without text destruction.");
})();

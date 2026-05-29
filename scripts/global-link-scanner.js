const fs = require("fs");
const glob = require("glob");
const axios = require("axios");
const cheerio = require("cheerio");

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

// 1. Load valid links from Sitemap
async function loadSitemapUrls() {
  try {
    const res = await axios.get(SITEMAP_URL);
    const $ = cheerio.load(res.data, { xmlMode: true });
    $("url loc").each((_, el) => validUrls.add($(el).text().trim()));
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
        if (m[0].startsWith(MY_DOMAIN)) validUrls.add(m[0]);
      });
    }
  } catch (e) {
    console.warn(`⚠️ Could not read ${README_FILE}:`, e.message);
  }
}

// 3. Load valid links from index.html / all HTML files
function loadHtmlUrls() {
  for (const file of HTML_FILES) {
    try {
      const content = fs.readFileSync(file, "utf-8");
      const matches = [...content.matchAll(urlRegex)];
      matches.forEach(m => {
        if (m[0].startsWith(MY_DOMAIN)) validUrls.add(m[0]);
      });
    } catch (e) {}
  }
}

// 4. Scan blog posts and remove broken internal links only
function processBlogFiles() {
  for (const file of BLOG_FILES) {
    let content = fs.readFileSync(file, "utf-8");
    let updated = content;
    let madeChanges = false;

    const matches = [...content.matchAll(urlRegex)];

    for (const match of matches) {
      const url = match[0];

      // Strictly check only your domain links
      if (url.startsWith(MY_DOMAIN)) {
        // If it's not found in the valid sources, remove it
        if (!validUrls.has(url)) {
          console.log(`❌ Removing broken internal link: ${url}`);
          updated = updated.replaceAll(url, ""); 
          brokenLinksReport.push({ file, url });
          madeChanges = true;
        }
      }
    }

    if (madeChanges) {
      fs.writeFileSync(file, updated, "utf-8");
    }
  }
}

// 5. Update README.md Status Alerts (Pure English)
function updateReadmeStatus() {
  try {
    if (!fs.existsSync(README_FILE)) return;
    let readmeContent = fs.readFileSync(README_FILE, "utf-8");
    
    const startTag = "<!-- LINK_STATUS_START -->";
    const endTag = "<!-- LINK_STATUS_END -->";

    if (!readmeContent.includes(startTag) || !readmeContent.includes(endTag)) return;

    let statusContent = "";
    if (brokenLinksReport.length === 0) {
      statusContent = `\n### 🟢 Link Status: All Perfect!\nNo broken internal links (\`${MY_DOMAIN}\`) found in Blog Posts. Last checked: ${new Date().toUTCString()}\n`;
    } else {
      statusContent = `\n### 🔴 Warning: Broken Internal Links Removed!\nAutomatically removed **${brokenLinksReport.length}** invalid internal link(s) from blog posts. External/Promo links were skipped.\n\n| Blog File | Removed URL |\n| --- | --- |\n`;
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

// Run Process
(async () => {
  console.log(`🚀 Starting Scanner for: ${MY_DOMAIN}`);
  await loadSitemapUrls();
  loadReadmeUrls();
  loadHtmlUrls();
  console.log(`🔗 Total Valid Internal Links Indexed: ${validUrls.size}`);
  
  processBlogFiles();
  updateReadmeStatus();
  console.log("✅ Process Complete!");
})();

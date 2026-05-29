const fs = require("fs");
const glob = require("glob");
const axios = require("axios");
const cheerio = require("cheerio");

// -----------------------------
// CONFIGURATION & KEYWORDS
// -----------------------------
const MY_DOMAIN = "https://smartgentools.com"; 
const SITEMAP_URL = "https://smartgentools.com/sitemap.xml";

const BLOG_FILES = glob.sync("blog-posts/**/*.md"); 
const HTML_FILES = glob.sync("**/*.html", { ignore: ["node_modules/**", ".git/**"] }); 
const README_FILE = "README.md";

const TOOL_KEYWORDS = {
  "age calculator": "https://smartgentools.com/age-calculator/",
  "base64 to image": "https://smartgentools.com/base64-to-image/",
  "blog title generator": "https://smartgentools.com/blog-title-generator/",
  "bmi calculator": "https://smartgentools.com/bmi-bmr-calculator/",
  "bmr calculator": "https://smartgentools.com/bmi-bmr-calculator/",
  "color palette extractor": "https://smartgentools.com/color-palette-extractor/",
  "cpm calculator": "https://smartgentools.com/cpm-roi-calculator/",
  "roi calculator": "https://smartgentools.com/cpm-roi-calculator/",
  "css gradient generator": "https://smartgentools.com/css-gradient-generator/",
  "disclaimer generator": "https://smartgentools.com/disclaimer-generator/",
  "emi calculator": "https://smartgentools.com/emi-calculator/",
  "facebook id finder": "https://smartgentools.com/facebook-id-finder/",
  "fancy font generator": "https://smartgentools.com/fancy-font-generator/",
  "hash generator": "https://smartgentools.com/hash-generator/",
  "hashtag generator": "https://smartgentools.com/hashtag-generator/",
  "html code preview": "https://smartgentools.com/html-code-preview/",
  "image compressor": "https://smartgentools.com/image-compressor/",
  "image to base64": "https://smartgentools.com/image-to-base64/",
  "ip address lookup": "https://smartgentools.com/ip-address-lookup/",
  "json formatter": "https://smartgentools.com/json-formatter-validator/",
  "json validator": "https://smartgentools.com/json-formatter-validator/",
  "keyword density checker": "https://smartgentools.com/keyword-density-checker/",
  "lorem ipsum generator": "https://smartgentools.com/lorem-ipsum-generator/",
  "mailto generator": "https://smartgentools.com/mailto-generator/",
  "meta tag generator": "https://smartgentools.com/meta-tag-generator/",
  "password generator": "https://smartgentools.com/password-generator/",
  "percentage calculator": "https://smartgentools.com/percentage-calculator/",
  "picture url generator": "https://smartgentools.com/picture-url-generator/",
  "pomodoro timer": "https://smartgentools.com/pomodoro-timer/",
  "privacy policy generator": "https://smartgentools.com/privacy-policy-generator/",
  "qr generator": "https://smartgentools.com/qr-generator/",
  "random choice picker": "https://smartgentools.com/random-choice-picker/",
  "robots txt generator": "https://smartgentools.com/robots-txt-generator/",
  "schema generator": "https://smartgentools.com/schema-generator/",
  "secure notepad": "https://smartgentools.com/secure-notepad/",
  "serp preview tool": "https://smartgentools.com/serp-preview-tool/",
  "terms and conditions generator": "https://smartgentools.com/terms-conditions-generator/",
  "text case converter": "https://smartgentools.com/text-case-converter/",
  "changelog generator": "https://smartgentools.com/text-to-changelog-json-generator/",
  "unit converter": "https://smartgentools.com/unit-converter/",
  "url encoder": "https://smartgentools.com/url-encoder-decoder/",
  "url decoder": "https://smartgentools.com/url-encoder-decoder/",
  "utm builder": "https://smartgentools.com/utm-builder/",
  "uuid generator": "https://smartgentools.com/uuid-generator/",
  "voice remover": "https://smartgentools.com/voice-remover/",
  "whatsapp link generator": "https://smartgentools.com/whatsapp-link/",
  "word counter": "https://smartgentools.com/word-counter/",
  "youtube thumbnail downloader": "https://smartgentools.com/youtube-thumbnail-downloader/"
};

const urlRegex = /https?:\/\/[^\s"'<>]*(?<![.,;:!?])/g;

let validUrls = new Set();
let brokenLinksReport = []; 
let autoLinksAdded = 0;

function normalizeUrl(url) {
  if (!url) return "";
  return url.trim().replace(/\/+$/, "").toLowerCase();
}

// 1. Load Valid Links from Sources
async function loadValidUrls() {
  try {
    const res = await axios.get(SITEMAP_URL);
    const $ = cheerio.load(res.data, { xmlMode: true });
    $("url loc").each((_, el) => validUrls.add(normalizeUrl($(el).text())));

    if (fs.existsSync(README_FILE)) {
      const content = fs.readFileSync(README_FILE, "utf-8");
      [...content.matchAll(urlRegex)].forEach(m => {
        if (m[0].startsWith(MY_DOMAIN)) validUrls.add(normalizeUrl(m[0]));
      });
    }

    for (const file of HTML_FILES) {
      try {
        const content = fs.readFileSync(file, "utf-8");
        const $ = cheerio.load(content);
        $("a").each((_, el) => {
          let href = $(el).attr("href");
          if (href && href.startsWith(MY_DOMAIN)) {
            validUrls.add(normalizeUrl(href));
          } else if (href && href.startsWith("/") && !href.startsWith("//")) {
            validUrls.add(normalizeUrl(MY_DOMAIN + href));
          }
        });
      } catch (e) {}
    }
  } catch (e) {
    console.error("❌ Sitemap/Sources error:", e.message);
  }
}

// 2. Build the Auto-Link Replacer Rules
const autoLinkRules = Object.entries(TOOL_KEYWORDS).map(([keyword, url]) => {
  return [
    new RegExp(`\\b${keyword}\\b`, 'gi'), 
    (match) => {
      autoLinksAdded++;
      return {
        type: "link",
        url: url,
        children: [{ type: "text", value: match }]
      };
    }
  ];
});

// 3. Process Blog Files (Async to support modern ESM packages)
async function processBlogFiles() {
  // Dynamically load Pure ESM packages to avoid the "empty preset" error
  const { unified } = await import("unified");
  const remarkParse = (await import("remark-parse")).then(m => m.default);
  const remarkStringify = (await import("remark-stringify")).then(m => m.default);
  const { visit } = await import("unist-util-visit");
  const { findAndReplace } = await import("mdast-util-find-and-replace");

  const processor = unified().use(await remarkParse).use(await remarkStringify);

  for (const file of BLOG_FILES) {
    try {
      let content = fs.readFileSync(file, "utf-8");
      const ast = processor.parse(content);
      let madeChanges = false;
      let initialAutoLinkCount = autoLinksAdded;

      // A: Auto-Link Keywords safely
      findAndReplace(ast, autoLinkRules, { ignore: ['link', 'linkReference', 'heading', 'code'] });
      
      if (autoLinksAdded > initialAutoLinkCount) {
        console.log(`🔗 Injected ${autoLinksAdded - initialAutoLinkCount} tool link(s) into: [${file}]`);
        madeChanges = true;
      }

      // B: Clean Broken Internal Links safely
      visit(ast, "link", (node) => {
        const originalUrl = node.url;
        if (originalUrl && originalUrl.startsWith(MY_DOMAIN)) {
          const normalized = normalizeUrl(originalUrl);
          
          if (!validUrls.has(normalized)) {
            console.log(`❌ Removed broken internal link in [${file}]: ${originalUrl}`);
            node.url = "#"; 
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

// 4. Update README.md Status Alerts
function updateReadmeStatus() {
  try {
    if (!fs.existsSync(README_FILE)) return;
    let readmeContent = fs.readFileSync(README_FILE, "utf-8");
    
    const startTag = "";
    const endTag = "";

    if (!readmeContent.includes(startTag) || !readmeContent.includes(endTag)) return;

    let statusContent = `\n### 🟢 Link Status Report\n*Last automated run: ${new Date().toUTCString()}*\n\n`;
    
    if (autoLinksAdded > 0) {
      statusContent += `- **Auto-Linked:** Safely generated **${autoLinksAdded}** tool keyword link(s) across blog posts.\n`;
    } else {
      statusContent += `- **Auto-Linked:** No new keywords found to link.\n`;
    }

    if (brokenLinksReport.length === 0) {
      statusContent += `- **Broken Links:** 0 internal broken links found. All perfect!\n`;
    } else {
      statusContent += `- **Broken Links:** Neutralized **${brokenLinksReport.length}** invalid link(s).\n\n| Blog File | Removed URL |\n| --- | --- |\n`;
      brokenLinksReport.forEach(item => {
        statusContent += `| \`${item.file}\` | \`${item.url}\` |\n`;
      });
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
  console.log(`🚀 Starting Global Scanner & Auto-Linker for: ${MY_DOMAIN}`);
  await loadValidUrls();
  console.log(`✅ Loaded ${validUrls.size} valid internal URLs.`);
  
  await processBlogFiles();
  updateReadmeStatus();
  console.log("✅ Process safely finished!");
})();

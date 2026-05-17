# ⚡ SmartGen Wiki

Welcome to the official documentation for **SmartGen**, an all-in-one digital and web utility platform designed for developers, marketers, and everyday users. This wiki provides a deep dive into our architecture, development philosophy, and the tools we offer.

---

## 🚀 Overview

SmartGen is built on the principle of **100% Client-Side Processing**. Unlike traditional utility sites that require data to be uploaded to a server, SmartGen performs all calculations, generations, and transformations directly within the user's browser.

### Core Values
- **Privacy First:** No user data ever leaves the local device.
- **Speed:** Instant results without the latency of server round-trips.
- **Accessibility:** A clean, responsive, and ad-friendly UI for all devices.
- **SEO Optimized:** Every tool is backed by a "Skyscraper" SEO strategy.

---

## 🏗️ Technical Architecture

SmartGen uses a lightweight, modular architecture that ensures scalability and ease of maintenance.

### File Structure
- `/assets/css/style.css`: Global styles, theme variables, and responsive layout.
- `/assets/js/app.js`: Global logic including navbar/footer injection and theme toggling.
- `/[tool-folder]/index.html`: Self-contained tool page with its own logic and SEO content.

### Dynamic UI Injection
To maintain a consistent look across dozens of pages, we use a custom JavaScript injection system in `app.js`:
- **`injectNavbar()`**: Injects a responsive header with a hamburger menu for mobile.
- **`injectFooter()`**: Injects a multi-column footer with quick links and social icons.
- **`initTheme()`**: Handles persistent Dark/Light mode preferences via `localStorage`.

---

## 🛠️ Tool Catalog

SmartGen hosts a wide variety of tools categorized into several key areas:

### 📈 SEO & Marketing Tools
| Tool | Folder | Description |
| :--- | :--- | :--- |
| **SERP Preview** | `/serp-preview-tool/` | Visualizes how titles/meta descriptions appear in Google. |
| **QR Generator** | `/qr-generator/` | Creates custom QR codes for URLs, WiFi, and more. |
| **UTM Builder** | `/utm-builder/` | Generates tracking links for marketing campaigns. |
| **Meta Tag Gen** | `/meta-tag-generator/` | Boosts SEO with perfect meta tag creation. |
| **Robots.txt Gen** | `/robots-txt-generator/` | Creates robots.txt files for search engines. |

### 💻 Developer Utilities
| Tool | Folder | Description |
| :--- | :--- | :--- |
| **Password Gen** | `/password-generator/` | Creates high-entropy, random secure passwords. |
| **Image Compressor** | `/image-compressor/` | Reduces image size locally using HTML5 Canvas. |
| **Image to Base64** | `/image-to-base64/` | Converts images to Base64 strings for CSS/JS. |
| **Text Case** | `/text-case-converter/` | Converts text to UPPER, lower, or Title Case. |

### 💰 Financial Calculators
| Tool | Folder | Description |
| :--- | :--- | :--- |
| **EMI Calculator** | `/emi-calculator/` | Calculates monthly installments and total interest. |
| **CPM & ROI** | `/cpm-roi-calculator/` | Calculates marketing metrics and investment returns. |

---

## 📈 Skyscraper SEO Strategy

Every tool page on SmartGen follows a rigorous SEO framework to ensure high visibility and authority.

1. **Action-Oriented Metadata:** Titles and descriptions are optimized for Click-Through Rate (CTR).
2. **JSON-LD Schema:** Each page includes `FAQPage` schema to capture Google's rich snippets.
3. **1200+ Word Content Blocks:** Detailed guides, technical deep dives, and best practices are included below the tool UI.
4. **LSI Keyword Integration:** Content is enriched with Latent Semantic Indexing keywords to cover a broad range of search intents.

---

## 📱 Mobile Responsiveness

SmartGen features a custom-built responsive navbar:
- **Desktop:** Full horizontal navigation.
- **Mobile:** A compact hamburger menu (☰) that expands into a vertical dropdown.
- **Theme Support:** Both the desktop and mobile views fully support Dark and Light modes.

---

## 🛠️ Contributing

To add a new tool to SmartGen:
1. Create a new folder at the root.
2. Create an `index.html` following the standard template.
3. Link the global CSS and JS from `../assets/`.
4. Update the homepage grid in `index.html`.
5. Update the "Top Tools" section in `assets/js/app.js` if necessary.

---

*Developed by [Sayad Md Bayezid Hosan](https://sayadbayezid.com)*

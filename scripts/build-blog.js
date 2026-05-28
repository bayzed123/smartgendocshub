#!/usr/bin/env node

/**
 * SmartGen Blog Builder
 * Converts Markdown files from blog-posts/ into static HTML pages
 * Generates blog.json for dynamic frontend rendering
 * Includes SEO, Open Graph, and JSON-LD Schema
 */

const fs = require('fs');
const path = require('path');
const matter = require('front-matter');
const { marked } = require('marked');
const slugify = require('slugify');

// Configuration
const BLOG_POSTS_DIR = path.join(__dirname, '../blog-posts');
const BLOG_OUTPUT_DIR = path.join(__dirname, '../blog');
const TEMPLATES_DIR = path.join(__dirname, '../templates');
const AUTHOR_NAME = 'Sayad Md Bayezid Hosan';
const SITE_URL = 'https://smartgentools.com';

// Ensure directories exist
if (!fs.existsSync(BLOG_OUTPUT_DIR)) {
  fs.mkdirSync(BLOG_OUTPUT_DIR, { recursive: true });
}

// Configure marked for better HTML rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

/**
 * Read all markdown files from blog-posts directory
 */
function readBlogPosts() {
  if (!fs.existsSync(BLOG_POSTS_DIR)) {
    console.log('⚠️  blog-posts directory not found. Creating it...');
    fs.mkdirSync(BLOG_POSTS_DIR, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(BLOG_POSTS_DIR).filter(file => file.endsWith('.md'));
  const posts = [];

  files.forEach(file => {
    const filePath = path.join(BLOG_POSTS_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { attributes, body } = matter(fileContent);

    const slug = slugify(attributes.title || file.replace('.md', ''), {
      lower: true,
      strict: true,
    });

    posts.push({
      slug,
      title: attributes.title || 'Untitled',
      description: attributes.description || '',
      content: body,
      date: attributes.date || new Date().toISOString().split('T')[0],
      tags: attributes.tags || [],
      image: attributes.image || `${SITE_URL}/assets/images/blog-default.jpg`,
      author: attributes.author || AUTHOR_NAME,
      category: attributes.category || 'General',
    });
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Generate HTML for a single blog post
 */
function generatePostHTML(post) {
  const htmlContent = marked(post.content);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} - SmartGen Blog</title>
    <meta name="description" content="${post.description}">
    <meta name="author" content="${post.author}">
    <meta name="keywords" content="${post.tags.join(', ')}">
    
    <!-- Open Graph Tags -->
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.description}">
    <meta property="og:image" content="${post.image}">
    <meta property="og:url" content="${SITE_URL}/blog/${post.slug}/">
    <meta property="og:type" content="article">
    <meta property="article:published_time" content="${post.date}">
    <meta property="article:author" content="${post.author}">
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${post.title}">
    <meta name="twitter:description" content="${post.description}">
    <meta name="twitter:image" content="${post.image}">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${SITE_URL}/blog/${post.slug}/">
    
    <!-- JSON-LD Article Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${post.title}",
        "description": "${post.description}",
        "image": "${post.image}",
        "datePublished": "${post.date}",
        "author": {
            "@type": "Person",
            "name": "${post.author}",
            "url": "${SITE_URL}/about/"
        },
        "publisher": {
            "@type": "Organization",
            "name": "SmartGen",
            "logo": {
                "@type": "ImageObject",
                "url": "${SITE_URL}/assets/images/logo.png"
            }
        }
    }
    </script>

    <!-- Fonts & Styles -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/style.css">
    <link rel="stylesheet" href="../../assets/css/blog.css">
    
    <!-- Scripts -->
    <script src="../../assets/js/app.js" defer></script>
    <script src="../../assets/js/blog.js" defer></script>
</head>
<body>
    <header id="main-header"></header>

    <main class="blog-post-container">
        <article class="blog-post-article">
            <header class="blog-post-header">
                <div class="blog-post-meta">
                    <time datetime="${post.date}">${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    <span class="meta-separator">•</span>
                    <span class="blog-post-category">${post.category}</span>
                    <span class="meta-separator">•</span>
                    <span class="blog-post-author">By ${post.author}</span>
                </div>
                <h1 class="blog-post-title">${post.title}</h1>
                <p class="blog-post-excerpt">${post.description}</p>
            </header>

            <img src="${post.image}" alt="${post.title}" class="blog-post-featured-image">

            <div class="blog-post-content">
                ${htmlContent}
            </div>

            <footer class="blog-post-footer">
                <div class="blog-post-tags">
                    ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                </div>
            </footer>
        </article>

        <!-- Related Posts Section -->
        <section class="blog-related-posts" data-post-slug="${post.slug}" data-post-tags="${post.tags.join(',')}">
            <h2 class="related-posts-title">📚 Related Posts</h2>
            <div id="related-posts-grid" class="blog-grid">
                <!-- Related posts will be injected by JS -->
            </div>
        </section>
    </main>

    <footer id="main-footer"></footer>
</body>
</html>`;

  return html;
}

/**
 * Generate the main Blog Archive page
 */
function generateArchiveHTML() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - SmartGen | Insights, Tutorials & Digital Tool Updates</title>
    <meta name="description" content="Explore the SmartGen blog for the latest tutorials, digital marketing insights, and web utility updates. Stay ahead with expert advice from Sayad Md Bayezid Hosan.">
    
    <!-- Open Graph Tags -->
    <meta property="og:title" content="SmartGen Blog - Digital Insights & Web Tools">
    <meta property="og:description" content="Expert tutorials and insights on web utilities, SEO, and digital growth.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${SITE_URL}/blog/">
    <meta property="og:image" content="${SITE_URL}/assets/images/blog-og.jpg">
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="SmartGen Blog">
    <meta name="twitter:description" content="Expert tutorials and insights on web utilities, SEO, and digital growth.">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${SITE_URL}/blog/">
    
    <!-- JSON-LD Blog Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "SmartGen Blog",
        "description": "Digital insights and web tool tutorials.",
        "url": "${SITE_URL}/blog/",
        "publisher": {
            "@type": "Organization",
            "name": "SmartGen",
            "logo": {
                "@type": "ImageObject",
                "url": "${SITE_URL}/assets/images/logo.png"
            }
        }
    }
    </script>

    <!-- Fonts & Styles -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/blog.css">
    
    <!-- Scripts -->
    <script src="../assets/js/app.js" defer></script>
    <script src="../assets/js/blog.js" defer></script>
</head>
<body>
    <header id="main-header"></header>

    <main>
        <section class="blog-hero">
            <div class="container">
                <h1 class="blog-hero-title">📖 SmartGen Blog</h1>
                <p class="blog-hero-subtitle">Discover expert insights, step-by-step tutorials, and the latest updates from the SmartGen ecosystem.</p>
                
                <div class="blog-search-bar">
                    <input type="text" id="blog-search-input" placeholder="Search posts..." class="blog-search-input">
                </div>
                
                <div id="blog-filters" class="blog-filters">
                    <!-- Filters will be injected by JS -->
                </div>
            </div>
        </section>

        <section class="container">
            <div id="blog-grid" class="blog-grid">
                <!-- Blog cards will be injected by JS -->
                <div class="loading-spinner" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                    <p>✨ Loading amazing stories...</p>
                </div>
            </div>
        </section>
    </main>

    <footer id="main-footer"></footer>
</body>
</html>`;

  return html;
}

/**
 * Generate blog.json metadata file
 */
function generateBlogJSON(posts) {
  return JSON.stringify(posts, null, 2);
}

/**
 * Main build function
 */
function buildBlog() {
  console.log('🚀 Starting SmartGen Blog Build...\n');

  // Read all blog posts
  const posts = readBlogPosts();
  console.log(`✅ Found ${posts.length} blog post(s)\n`);

  if (posts.length === 0) {
    console.log('⚠️  No blog posts found. Create .md files in blog-posts/ directory.');
    console.log('📝 Example: blog-posts/my-first-post.md\n');
  }

  // Generate individual post pages
  posts.forEach(post => {
    const postDir = path.join(BLOG_OUTPUT_DIR, post.slug);
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }

    const postHTML = generatePostHTML(post);
    fs.writeFileSync(path.join(postDir, 'index.html'), postHTML);
    console.log(`✅ Generated: /blog/${post.slug}/index.html`);
  });

  // Generate blog archive page
  const archiveHTML = generateArchiveHTML();
  fs.writeFileSync(path.join(BLOG_OUTPUT_DIR, 'index.html'), archiveHTML);
  console.log(`✅ Generated: /blog/index.html\n`);

  // Generate blog.json
  const blogJSON = generateBlogJSON(posts);
  fs.writeFileSync(path.join(BLOG_OUTPUT_DIR, 'blog.json'), blogJSON);
  console.log(`✅ Generated: /blog/blog.json\n`);

  console.log('🎉 Blog build completed successfully!');
  console.log(`📊 Total posts: ${posts.length}`);
  console.log(`🌐 Blog URL: ${SITE_URL}/blog/\n`);
}

// Run the build
buildBlog();

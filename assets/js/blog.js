/**
 * SmartGen Blog Frontend
 * Handles dynamic blog rendering, filtering, search, and related posts
 */

document.addEventListener('DOMContentLoaded', async () => {
  const blogGrid = document.getElementById('blog-grid');
  const filterContainer = document.getElementById('blog-filters');
  const relatedPostsGrid = document.getElementById('related-posts-grid');
  const blogSearchInput = document.getElementById('blog-search-input');

  // Determine if we're on the archive page or a single post page
  if (blogGrid && filterContainer) {
    await initBlogArchive();
  } else if (relatedPostsGrid) {
    await initRelatedPosts();
  }
});

/**
 * Fetch blog data from blog.json
 */
async function fetchBlogData() {
  try {
    const response = await fetch('/blog/blog.json');
    if (!response.ok) throw new Error('Failed to load blog data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return [];
  }
}

/**
 * Initialize the blog archive page
 */
async function initBlogArchive() {
  const blogGrid = document.getElementById('blog-grid');
  const filterContainer = document.getElementById('blog-filters');
  const blogSearchInput = document.getElementById('blog-search-input');
  const posts = await fetchBlogData();

  if (posts.length === 0) {
    blogGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 3rem;">No blog posts found yet. Check back soon!</p>';
    return;
  }

  // Extract unique tags
  const allTags = new Set(['All']);
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => allTags.add(tag));
    }
  });

  // Render filter buttons
  renderFilters(Array.from(allTags));

  // Render all posts initially
  renderPosts(posts);

  // Filter event listeners
  filterContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-tag')) {
      const selectedTag = e.target.getAttribute('data-tag');

      // Update active state
      document.querySelectorAll('.filter-tag').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');

      // Filter and render
      const filteredPosts = selectedTag === 'All'
        ? posts
        : posts.filter(post => post.tags && post.tags.includes(selectedTag));

      renderPosts(filteredPosts);
    }
  });

  // Search functionality
  if (blogSearchInput) {
    blogSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
      );
      renderPosts(filteredPosts);
    });
  }
}

/**
 * Render filter buttons
 */
function renderFilters(tags) {
  const filterContainer = document.getElementById('blog-filters');
  filterContainer.innerHTML = tags.map(tag => `
    <button class="filter-tag ${tag === 'All' ? 'active' : ''}" data-tag="${tag}">
      ${tag}
    </button>
  `).join('');
}

/**
 * Render blog posts to the grid
 */
function renderPosts(posts) {
  const blogGrid = document.getElementById('blog-grid');

  if (posts.length === 0) {
    blogGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 3rem;">No posts match your search. Try a different query!</p>';
    return;
  }

  blogGrid.innerHTML = posts.map(post => `
    <a href="/blog/${post.slug}/" class="blog-card">
      <img src="${post.image}" alt="${post.title}" class="blog-card-image" onerror="this.src='/assets/images/blog-default.jpg'">
      <div class="blog-card-content">
        <span class="blog-card-tag">${post.tags && post.tags.length > 0 ? post.tags[0] : 'General'}</span>
        <h3 class="blog-card-title">${escapeHtml(post.title)}</h3>
        <p class="blog-card-excerpt">${escapeHtml(post.description)}</p>
        
        <!-- Read Article Button Design -->
        <div style="margin-top: 1.5rem;">
          <span style="display: inline-block; padding: 8px 18px; background: rgba(37, 99, 235, 0.1); color: var(--blog-primary); border-radius: 50px; font-size: 0.85rem; font-weight: 600; border: 1px solid rgba(37, 99, 235, 0.2); transition: all 0.3s ease;">
            Read Article ↗
          </span>
        </div>

      </div>
      <div class="blog-card-footer">
        <span>${escapeHtml(post.author)}</span>
        <span>${formatDate(post.date)}</span>
      </div>
    </a>
  `).join('');
}

/**
 * Initialize related posts on single post page
 */
async function initRelatedPosts() {
  const relatedPostsSection = document.querySelector('.blog-related-posts');
  if (!relatedPostsSection) return;

  const posts = await fetchBlogData();
  const currentSlug = relatedPostsSection.getAttribute('data-post-slug');
  const currentTags = relatedPostsSection.getAttribute('data-post-tags').split(',').filter(t => t);

  // Find related posts
  const relatedPosts = posts
    .filter(p => p.slug !== currentSlug && p.tags && p.tags.some(t => currentTags.includes(t)))
    .slice(0, 3);

  const relatedPostsGrid = document.getElementById('related-posts-grid');

  if (relatedPosts.length === 0) {
    relatedPostsSection.style.display = 'none';
    return;
  }

  relatedPostsGrid.innerHTML = relatedPosts.map(post => `
    <a href="/blog/${post.slug}/" class="blog-card">
      <img src="${post.image}" alt="${post.title}" class="blog-card-image" onerror="this.src='/assets/images/blog-default.jpg'">
      <div class="blog-card-content">
        <h3 class="blog-card-title" style="font-size: 1.1rem;">${escapeHtml(post.title)}</h3>
        <div style="margin-top: 1rem;">
          <span style="font-size: 0.85rem; font-weight: 600; color: var(--blog-primary);">Read Post →</span>
        </div>
      </div>
    </a>
  `).join('');
}

/**
 * Utility: Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Utility: Format date
 */
function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-US', options);
}
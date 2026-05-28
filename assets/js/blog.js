/**
 * SmartGen Blog Engine
 * Handles dynamic blog archive rendering, filtering, and related posts.
 */

document.addEventListener('DOMContentLoaded', () => {
    const blogGrid = document.getElementById('blog-grid');
    const filterContainer = document.getElementById('blog-filters');
    const postContent = document.getElementById('post-content');
    
    // Check if we are on the blog archive page or a single post page
    if (blogGrid) {
        initBlogArchive();
    } else if (postContent) {
        initBlogPost();
    }
});

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

async function initBlogArchive() {
    const blogGrid = document.getElementById('blog-grid');
    const filterContainer = document.getElementById('blog-filters');
    const posts = await fetchBlogData();
    
    if (posts.length === 0) {
        blogGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No blog posts found.</p>';
        return;
    }

    // Extract unique tags
    const allTags = new Set(['All']);
    posts.forEach(post => {
        if (post.tags) {
            post.tags.forEach(tag => allTags.add(tag));
        }
    });

    // Render filters
    filterContainer.innerHTML = Array.from(allTags).map(tag => `
        <button class="filter-tag ${tag === 'All' ? 'active' : ''}" data-tag="${tag}">${tag}</button>
    `).join('');

    // Render posts
    renderPosts(posts);

    // Filter event listeners
    filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-tag')) {
            const selectedTag = e.target.getAttribute('data-tag');
            
            // Update active state
            document.querySelectorAll('.filter-tag').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            // Filter logic
            const filteredPosts = selectedTag === 'All' 
                ? posts 
                : posts.filter(post => post.tags && post.tags.includes(selectedTag));
            
            renderPosts(filteredPosts);
        }
    });
}

function renderPosts(posts) {
    const blogGrid = document.getElementById('blog-grid');
    blogGrid.innerHTML = posts.map(post => `
        <a href="${post.url}" class="blog-card">
            <img src="${post.image || '/assets/images/blog-default.jpg'}" alt="${post.title}" class="blog-card-image">
            <div class="blog-card-content">
                <span class="blog-card-tag">${post.tags ? post.tags[0] : 'General'}</span>
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
            </div>
            <div class="blog-card-footer">
                <span>By ${post.author || 'Sayad Md Bayezid Hosan'}</span>
                <span>${post.date}</span>
            </div>
        </a>
    `).join('');
}

async function initBlogPost() {
    const posts = await fetchBlogData();
    const currentUrl = window.location.pathname;
    const currentPost = posts.find(p => currentUrl.includes(p.url));
    
    if (!currentPost) return;

    // Render Related Posts
    const relatedContainer = document.getElementById('related-posts-grid');
    if (relatedContainer) {
        const relatedPosts = posts
            .filter(p => p.url !== currentPost.url && p.tags.some(t => currentPost.tags.includes(t)))
            .slice(0, 3);
        
        if (relatedPosts.length > 0) {
            relatedContainer.innerHTML = relatedPosts.map(post => `
                <a href="${post.url}" class="blog-card">
                    <img src="${post.image}" alt="${post.title}" class="blog-card-image">
                    <div class="blog-card-content">
                        <h3 class="blog-card-title" style="font-size: 1.1rem;">${post.title}</h3>
                    </div>
                </a>
            `).join('');
        } else {
            document.getElementById('related-posts-section').style.display = 'none';
        }
    }
}

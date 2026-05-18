/**
 * Related Tools Component for SmartGen
 * Dynamically injects related tools into tool pages.
 */

document.addEventListener('DOMContentLoaded', () => {
    renderRelatedTools();
});

function renderRelatedTools() {
    const container = document.getElementById('dynamic-related-tools');
    if (!container || typeof TOOLS_INDEX === 'undefined') return;

    // Get current tool ID from path
    const pathParts = window.location.pathname.split('/').filter(p => p);
    const currentToolId = pathParts[pathParts.length - 1] || '';

    // Find current tool data to get its category
    const currentTool = TOOLS_INDEX.find(t => t.id === currentToolId);
    const category = currentTool ? currentTool.category : '';

    // Filter tools: same category, not current tool, limit to 4
    let related = TOOLS_INDEX.filter(t => t.id !== currentToolId && t.category === category);
    
    // If not enough in same category, add others
    if (related.length < 4) {
        const others = TOOLS_INDEX.filter(t => t.id !== currentToolId && t.category !== category);
        related = [...related, ...others].slice(0, 4);
    } else {
        related = related.slice(0, 4);
    }

    // Determine path prefix for absolute routing
    const isGitHubPages = window.location.hostname.includes('github.io');
    const isCustomDomain = window.location.hostname.includes('smartgentools.com');
    const repoName = (isGitHubPages && !isCustomDomain) ? '/' + window.location.pathname.split('/')[1] + '/' : '/';
    
    const html = `
        <div class="related-tools-section">
            <h3 class="related-title">Related Tools You Might Need</h3>
            <div class="related-grid">
                ${related.map(tool => {
                    const toolUrl = tool.url.startsWith('./') ? tool.url.substring(2) : tool.url;
                    const absoluteUrl = repoName + toolUrl;
                    
                    return `
                        <a href="${absoluteUrl}" class="tool-card compact">
                            <div class="tool-icon">${tool.icon}</div>
                            <div class="tool-info">
                                <h3>${tool.title}</h3>
                                <p>${tool.description}</p>
                            </div>
                        </a>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    container.innerHTML = html;
}

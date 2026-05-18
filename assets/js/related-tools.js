// Dynamic Related Tools Recommendation Engine
// This script automatically generates and injects a "Related Tools" section
// on every tool page based on the current tool's category.

document.addEventListener('DOMContentLoaded', () => {
    initializeRelatedTools();
});

function initializeRelatedTools() {
    const placeholder = document.getElementById('dynamic-related-tools');
    if (!placeholder) return;

    // Get the current page URL to identify the tool
    const currentPath = window.location.pathname;
    const currentToolId = extractToolIdFromPath(currentPath);
    
    // Find the current tool in the TOOLS_INDEX
    const currentTool = TOOLS_INDEX.find(tool => tool.id === currentToolId);
    if (!currentTool) return;

    // Get related tools from the same category
    const relatedTools = getRelatedTools(currentTool, currentToolId);
    
    // Generate and inject the HTML
    if (relatedTools.length > 0) {
        const html = generateRelatedToolsHTML(relatedTools);
        placeholder.innerHTML = html;
    }
}

function extractToolIdFromPath(path) {
    // Extract tool ID from URL path
    // e.g., /qr-generator/ -> qr-generator
    const segments = path.split('/').filter(s => s.length > 0);
    
    // If it's a tool page (not homepage or other pages)
    if (segments.length >= 1) {
        return segments[segments.length - 1];
    }
    return null;
}

function getRelatedTools(currentTool, currentToolId, limit = 4) {
    // Filter tools from the same category, excluding the current tool
    const categoryTools = TOOLS_INDEX.filter(tool => 
        tool.category === currentTool.category && 
        tool.id !== currentToolId
    );

    // If we don't have enough tools in the same category, add tools from other categories
    let relatedTools = [...categoryTools];
    
    if (relatedTools.length < limit) {
        const otherTools = TOOLS_INDEX.filter(tool => 
            tool.category !== currentTool.category && 
            tool.id !== currentToolId &&
            !relatedTools.find(rt => rt.id === tool.id)
        );
        relatedTools = relatedTools.concat(otherTools);
    }

    // Shuffle and limit to the desired number
    relatedTools = shuffleArray(relatedTools).slice(0, limit);
    
    return relatedTools;
}

function shuffleArray(array) {
    // Fisher-Yates shuffle algorithm
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function generateRelatedToolsHTML(tools) {
    const cardsHTML = tools.map(tool => `
        <a href="${tool.url}" class="tool-card">
            <div class="tool-icon">${tool.icon}</div>
            <h3>${tool.title}</h3>
            <p>${tool.description}</p>
        </a>
    `).join('');

    return `
        <section class="related-tools-section">
            <h2 class="related-tools-title">Related Tools You Might Like</h2>
            <div class="tool-grid">
                ${cardsHTML}
            </div>
        </section>
    `;
}

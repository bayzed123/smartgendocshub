const titleTemplates = [
    (keyword) => `${keyword}: The Complete Guide for 2026`,
    (keyword) => `How to Master ${keyword} in 7 Days`,
    (keyword) => `${keyword}: 10 Proven Strategies That Work`,
    (keyword) => `The Ultimate ${keyword} Handbook`,
    (keyword) => `${keyword} for Beginners: Everything You Need to Know`,
    (keyword) => `Why ${keyword} Matters More Than Ever`,
    (keyword) => `${keyword}: Common Mistakes and How to Avoid Them`,
    (keyword) => `The Future of ${keyword}: Trends & Predictions`,
    (keyword) => `${keyword} Explained: A Simple Guide`,
    (keyword) => `How to Get Started with ${keyword}`,
    (keyword) => `${keyword}: Best Practices from Industry Experts`,
    (keyword) => `The Secret to Success with ${keyword}`,
    (keyword) => `${keyword}: What You Need to Know in 2026`,
    (keyword) => `Unlock Your Potential with ${keyword}`,
    (keyword) => `${keyword}: The Definitive Resource`,
    (keyword) => `How ${keyword} Can Transform Your Business`,
    (keyword) => `${keyword}: Advanced Tips and Tricks`,
    (keyword) => `The Science Behind ${keyword}`,
    (keyword) => `${keyword}: Real Results from Real Users`,
    (keyword) => `Mastering ${keyword}: A Step-by-Step Approach`,
];

function generateTitles() {
    const keyword = document.getElementById('keywordInput').value.trim();
    const count = parseInt(document.getElementById('countInput').value) || 10;

    if (!keyword) {
        alert('Please enter a keyword or topic');
        return;
    }

    const loading = document.getElementById('loading');
    const titlesSection = document.getElementById('titlesSection');
    const titlesList = document.getElementById('titlesList');

    loading.classList.add('active');
    titlesSection.classList.remove('active');

    // Simulate processing delay
    setTimeout(() => {
        const titles = generateTitleList(keyword, count);
        displayTitles(titles);
        loading.classList.remove('active');
        titlesSection.classList.add('active');
    }, 800);
}

function generateTitleList(keyword, count) {
    const titles = [];
    const usedIndices = new Set();

    // Capitalize keyword properly
    const formattedKeyword = keyword.charAt(0).toUpperCase() + keyword.slice(1);

    while (titles.length < count && usedIndices.size < titleTemplates.length) {
        const randomIndex = Math.floor(Math.random() * titleTemplates.length);
        
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            const template = titleTemplates[randomIndex];
            const title = template(formattedKeyword);
            titles.push(title);
        }
    }

    // If we need more titles, repeat with variations
    if (titles.length < count) {
        for (let i = titles.length; i < count; i++) {
            const template = titleTemplates[i % titleTemplates.length];
            const title = template(formattedKeyword);
            titles.push(title);
        }
    }

    return titles.slice(0, count);
}

function displayTitles(titles) {
    const titlesList = document.getElementById('titlesList');
    
    titlesList.innerHTML = titles.map((title, index) => `
        <div class="title-item">
            <div class="title-number">#${index + 1}</div>
            <div class="title-text">${escapeHtml(title)}</div>
            <button class="copy-btn-small" onclick="copyTitle('${escapeHtml(title)}')">📋 Copy</button>
        </div>
    `).join('');
}

function copyTitle(title) {
    // Unescape HTML entities for clipboard
    const div = document.createElement('div');
    div.innerHTML = title;
    const unescapedTitle = div.textContent || div.innerText;

    navigator.clipboard.writeText(unescapedTitle).then(() => {
        alert('Title copied to clipboard!');
    }).catch(() => {
        alert('Failed to copy title');
    });
}

function clearGenerator() {
    document.getElementById('keywordInput').value = '';
    document.getElementById('countInput').value = '10';
    document.getElementById('titlesSection').classList.remove('active');
    document.getElementById('loading').classList.remove('active');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Allow Enter key to generate titles
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && document.getElementById('keywordInput') === document.activeElement) {
        generateTitles();
    }
});

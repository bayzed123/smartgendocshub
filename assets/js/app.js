document.addEventListener('DOMContentLoaded', () => {
    injectNavbar();
    injectFooter();
    initTheme();
});

function injectNavbar() {
    const header = document.getElementById('main-header');
    if (!header) return;

    const isRoot = window.location.pathname === '/' || window.location.pathname.endsWith('index.html') && !window.location.pathname.includes('/');
    const prefix = window.location.pathname.split('/').length > 2 ? '../' : './';

    header.innerHTML = `
        <div class="container">
            <div class="header-content">
                <a href="${prefix}" class="logo">
                    <div class="logo-icon">⚡</div>
                    SmartGen
                </a>
                <nav>
                    <a href="${prefix}">Home</a>
                    <a href="${prefix}#tools">Tools</a>
                    <a href="${prefix}updates/">Updates</a>
                    <button id="theme-toggle" style="background:none; border:none; cursor:pointer; font-size:1.2rem;">🌓</button>
                </nav>
            </div>
        </div>
    `;

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

function injectFooter() {
    const footer = document.getElementById('main-footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div>
                    <h3>SmartGen</h3>
                    <p>All-in-one digital utility platform.</p>
                </div>
                <div>
                    <h4>Quick Links</h4>
                    <ul style="list-style:none;">
                        <li><a href="/" style="color:#94a3b8; text-decoration:none;">Home</a></li>
                        <li><a href="/#tools" style="color:#94a3b8; text-decoration:none;">Tools</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Legal</h4>
                    <ul style="list-style:none;">
                        <li><a href="#" style="color:#94a3b8; text-decoration:none;">Privacy Policy</a></li>
                        <li><a href="#" style="color:#94a3b8; text-decoration:none;">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 SmartGen. All Rights Reserved. Developed by Sayad Md Bayezid Hosan</p>
            </div>
        </div>
    `;
}

function initTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// FAQ Accordion Functionality
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Update DOMContentLoaded to include accordion initialization
document.addEventListener('DOMContentLoaded', () => {
    // Existing functions...
    if (document.querySelector('.accordion-header')) {
        initAccordion();
    }
});

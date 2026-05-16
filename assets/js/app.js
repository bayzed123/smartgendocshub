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

    const prefix = window.location.pathname.split('/').length > 2 ? '../' : './';

    footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <!-- Column 1: Brand & About -->
                <div class="footer-column">
                    <div class="footer-brand">
                        <div class="footer-logo">
                            <div class="logo-icon" style="width: 40px; height: 40px; font-size: 1.5rem;">⚡</div>
                            <h3>SmartGen</h3>
                        </div>
                        <p class="footer-description">Fast, secure, and 100% free client-side web utilities for developers, marketers, and everyday users.</p>
                    </div>
                </div>

                <!-- Column 2: Quick Links -->
                <div class="footer-column">
                    <h4>Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="${prefix}">Home</a></li>
                        <li><a href="${prefix}#tools">All Tools</a></li>
                        <li><a href="${prefix}updates/">Updates & Changelog</a></li>
                    </ul>
                </div>

                <!-- Column 3: Top Tools -->
                <div class="footer-column">
                    <h4>Top Tools</h4>
                    <ul class="footer-links">
                        <li><a href="${prefix}qr-generator/">Advanced QR Generator</a></li>
                        <li><a href="${prefix}picture-url-generator/">Picture URL Generator</a></li>
                        <li><a href="${prefix}utm-builder/">UTM Campaign Builder</a></li>
                        <li><a href="${prefix}meta-tag-generator/">SEO Meta Tag Generator</a></li>
                    </ul>
                </div>

                <!-- Column 4: Legal & Support -->
                <div class="footer-column">
                    <h4>Legal & Support</h4>
                    <ul class="footer-links">
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                        <li><a href="#privacy">Privacy Policy</a></li>
                        <li><a href="#terms">Terms of Service</a></li>
                        <li><a href="#disclaimer">Disclaimer</a></li>
                    </ul>
                </div>
            </div>

            <!-- Footer Bottom Bar -->
            <div class="footer-bottom">
                <div class="footer-bottom-left">
                    <p>&copy; 2026 SmartGen. All Rights Reserved. Developed by <a href="https://syedbayzed.com" target="_blank" rel="noopener noreferrer" class="developer-link">Sayad Md Bayezid Hosan</a></p>
                </div>
                <div class="footer-social-icons">
                    <a href="https://github.com/bayzed123" target="_blank" rel="noopener noreferrer" class="social-icon" title="GitHub">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                    </a>
                    <a href="https://linkedin.com/in/bayzed" target="_blank" rel="noopener noreferrer" class="social-icon" title="LinkedIn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.25-.129.599-.129.948v5.419h-3.554s.05-8.736 0-9.646h3.554v1.364c.429-.646 1.199-1.538 2.914-1.538 2.127 0 3.72 1.395 3.72 4.393v5.427zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.704 0-.951.77-1.704 1.963-1.704 1.193 0 1.915.753 1.929 1.704 0 .946-.736 1.704-1.977 1.704zm1.582 11.597H3.635V9.859h3.284v10.593zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                    <a href="https://facebook.com/bayzed123" target="_blank" rel="noopener noreferrer" class="social-icon" title="Facebook">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                    </a>
                </div>
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

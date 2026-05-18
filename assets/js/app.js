document.addEventListener('DOMContentLoaded', () => {
    injectNavbar();
    injectFooter();
    initTheme();
    initAccordion();
});

function injectNavbar() {
    const header = document.getElementById('main-header');
    if (!header) return;

    const prefix = window.location.pathname.split('/').length > 2 ? '../' : './';

    header.innerHTML = `
        <div class="container">
            <div class="header-content">
                <a href="${prefix}" class="logo">
                    <div class="logo-icon">⚡</div>
                    SmartGen
                </a>
                <div class="header-actions">
                    <button id="theme-toggle" class="icon-btn" title="Toggle Theme">🌓</button>
                    <button id="mobile-menu-toggle" class="icon-btn mobile-only" title="Toggle Menu">☰</button>
                </div>
                <nav id="nav-links">
                    <a href="${prefix}">Home</a>
                    <div class="dropdown" id="tools-dropdown">
                        <a href="${prefix}#all-tools" class="dropdown-trigger">Tools</a>
                        <div class="dropdown-content">
                            <div class="dropdown-category">
                                <h4>📈 Marketing</h4>
                                <a href="${prefix}utm-builder/" class="dropdown-item">UTM Builder</a>
                                <a href="${prefix}whatsapp-link/" class="dropdown-item">WhatsApp Link</a>
                                <a href="${prefix}blog-title-generator/" class="dropdown-item">Blog Title</a>
                            </div>
                            <div class="dropdown-category">
                                <h4>💻 Developer</h4>
                                <a href="${prefix}qr-generator/" class="dropdown-item">QR Generator</a>
                                <a href="${prefix}meta-tag-generator/" class="dropdown-item">Meta Tags</a>
                                <a href="${prefix}css-gradient-generator/" class="dropdown-item">CSS Gradient</a>
                            </div>
                            <div class="dropdown-category">
                                <h4>🔍 SEO</h4>
                                <a href="${prefix}keyword-density-checker/" class="dropdown-item">Keyword Density</a>
                                <a href="${prefix}serp-preview-tool/" class="dropdown-item">SERP Preview</a>
                            </div>
                            <div class="dropdown-category">
                                <h4>⚙️ Utilities</h4>
                                <a href="${prefix}age-calculator/" class="dropdown-item">Age Calculator</a>
                                <a href="${prefix}image-compressor/" class="dropdown-item">Image Compressor</a>
                            </div>
                        </div>
                    </div>
                    <a href="${prefix}#all-tools">Top Tools</a>
                    <a href="${prefix}contact/">Request a Tool</a>
                    <a href="${prefix}about/">About</a>
                </nav>
            </div>
        </div>
    `;

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const toolsDropdown = document.getElementById('tools-dropdown');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show-mobile-menu');
        menuToggle.innerText = navLinks.classList.contains('show-mobile-menu') ? '✕' : '☰';
    });

    // Mobile dropdown toggle
    if (window.innerWidth <= 768) {
        const dropdownTrigger = toolsDropdown.querySelector('.dropdown-trigger');
        dropdownTrigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                toolsDropdown.classList.toggle('active');
            }
        });
    }

    // Close menu when clicking a link (except dropdown trigger on mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.classList.contains('dropdown-trigger') && window.innerWidth <= 768) return;
            navLinks.classList.remove('show-mobile-menu');
            menuToggle.innerText = '☰';
        });
    });
}

function injectFooter() {
    const footer = document.getElementById('main-footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="container">
            <div class="footer-top">
                <div class="footer-brand-section">
                    <div class="footer-logo">
                        <div class="logo-icon" style="width: 40px; height: 40px; font-size: 1.5rem;">⚡</div>
                        <h3>SmartGen</h3>
                    </div>
                    <p class="footer-description">Fast, secure, and 100% free client-side web utilities for developers, marketers, and everyday users.</p>
                </div>
                <div class="footer-quick-links-grid">
                    <div class="footer-column">
                        <h4>Developer Tools</h4>
                        <ul class="footer-links">
                            <li><a href="/qr-generator/">QR Generator</a></li>
                            <li><a href="/html-code-preview/">HTML Preview</a></li>
                            <li><a href="/json-formatter-validator/">JSON Formatter</a></li>
                            <li><a href="/uuid-generator/">UUID Generator</a></li>
                            <li><a href="/ip-address-lookup/">IP Lookup</a></li>
                            <li><a href="/url-encoder-decoder/">URL Encoder/Decoder</a></li>
                            <li><a href="/hash-generator/">Hash Generator</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>SEO & Marketing</h4>
                        <ul class="footer-links">
                            <li><a href="/blog-title-generator/">Blog Title Gen</a></li>
                            <li><a href="/utm-builder/">UTM Builder</a></li>
                            <li><a href="/keyword-density-checker/">Keyword Density</a></li>
                            <li><a href="/robots-txt-generator/">Robots.txt Gen</a></li>
                            <li><a href="/serp-preview-tool/">SERP Preview</a></li>
                            <li><a href="/schema-generator/">Schema Gen</a></li>
                            <li><a href="/meta-tag-generator/">Meta Tag Gen</a></li>
                            <li><a href="/youtube-thumbnail-downloader/">YT Thumbnail</a></li>
                            <li><a href="/whatsapp-link/">WhatsApp Link</a></li>
                            <li><a href="/hashtag-generator/">Hashtag Gen</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Daily Utilities</h4>
                        <ul class="footer-links">
                            <li><a href="/age-calculator/">Age Calculator</a></li>
                            <li><a href="/bmi-bmr-calculator/">BMI/BMR Calc</a></li>
                            <li><a href="/emi-calculator/">EMI Calculator</a></li>
                            <li><a href="/percentage-calculator/">Percentage Calc</a></li>
                            <li><a href="/pomodoro-timer/">Pomodoro Timer</a></li>
                            <li><a href="/secure-notepad/">Secure Notepad</a></li>
                            <li><a href="/unit-converter/">Unit Converter</a></li>
                            <li><a href="/image-compressor/">Image Compressor</a></li>
                            <li><a href="/picture-url-generator/">Picture URL</a></li>
                            <li><a href="/fancy-font-generator/">Fancy Font</a></li>
                            <li><a href="/word-counter/">Word Counter</a></li>
                            <li><a href="/text-case-converter/">Text Case</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Legal & Info</h4>
                        <ul class="footer-links">
                            <li><a href="/privacy-policy-generator/">Privacy Gen</a></li>
                            <li><a href="/terms-conditions-generator/">Terms Gen</a></li>
                            <li><a href="/disclaimer-generator/">Disclaimer Gen</a></li>
                            <li><a href="/about/">About Us</a></li>
                            <li><a href="/contact/">Contact Us</a></li>
                            <li><a href="/privacy/">Privacy Policy</a></li>
                            <li><a href="/terms/">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="footer-bottom-left">
                    <p>&copy; 2026 SmartGen. Developed by <a href="https://sayadbayezid.com" target="_blank" rel="noopener noreferrer" class="developer-link">Sayad Md Bayezid Hosan</a></p>
                </div>
                <div class="footer-social-icons">
                    <a href="https://github.com/bayzed123" target="_blank" class="social-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg></a>
                    <a href="https://linkedin.com/in/sayadbayezid" target="_blank" class="social-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.25-.129.599-.129.948v5.419h-3.554s.05-8.736 0-9.646h3.554v1.364c.429-.646 1.199-1.538 2.914-1.538 2.127 0 3.72 1.395 3.72 4.393v5.427zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.704 0-.951.77-1.704 1.963-1.704 1.193 0 1.915.753 1.929 1.704 0 .946-.736 1.704-1.977 1.704zm1.582 11.597H3.635V9.859h3.284v10.593zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
                </div>
            </div>
        </div>
    `;
}

function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other accordion items
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

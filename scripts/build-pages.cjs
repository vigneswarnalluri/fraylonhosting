/* eslint-disable */
// One-shot generator for shared-shell pages.
// Run: node scripts/build-pages.cjs
// All pages share an identical head/header/footer/mobile-drawer/modals shell.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LINKEDIN_URL = "https://www.linkedin.com/company/fraylontechnologies";
const INSTAGRAM_URL = "https://www.instagram.com/fraylon_hosting/";

function head({ title, description, canonical = '', extraHead = '' }) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#146EF5">
    <title>${title}</title>
    <meta name="description" content="${description}">
    ${canonical ? `<link rel="canonical" href="${canonical}">` : ''}
    <link rel="icon" type="image/svg+xml" href="./public/favicon.svg">

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Fraylon Hosting">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="./src/assets/dashboard.avif">

    <link rel="stylesheet" href="./src/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    ${extraHead}
</head>`;
}

function header(activePage) {
    const is = (p) => activePage === p ? ' class="is-active"' : '';
    return `<body>
    <div class="mw-top-bar" id="topOfferBar" role="region" aria-label="Limited-time offer">
        <div class="container">
            <div class="top-bar-content">
                <p>Limited-time savings — ends in <span id="timer" aria-live="polite" aria-atomic="true">--H --M --S</span></p>
                <a href="pricing.html" class="view-plans">View Plans</a>
            </div>
        </div>
    </div>

    <header class="mw-header" id="siteHeader">
        <div class="container mw-nav-container">
            <div class="mw-logo-wrapper">
                <div class="mw-logo">
                    <a href="index.html" aria-label="Fraylon Hosting — home">
                        <img src="logo.png" alt="Fraylon Hosting">
                    </a>
                </div>
            </div>
            <nav class="mw-nav" aria-label="Primary">
                <ul class="mw-nav-ul">
                    <li class="has-submenu">
                        <a href="hosting.html"${is('hosting')}>Hosting <i class="fas fa-chevron-down" aria-hidden="true"></i></a>
                        <div class="mw-mega-menu">
                            <a href="web-hosting.html" class="mega-item">
                                <div class="mega-item-icon-wrap"><i class="fas fa-server" aria-hidden="true"></i></div>
                                <div class="mega-item-body">
                                    <div class="mega-item-header"><span class="mega-item-title">Web Hosting</span><span class="mega-item-badge badge-offer">80% OFF</span></div>
                                    <p class="mega-item-desc">For new and business websites</p>
                                </div>
                            </a>
                            <a href="hosting.html#cloud" class="mega-item">
                                <div class="mega-item-icon-wrap"><i class="fas fa-cloud" aria-hidden="true"></i></div>
                                <div class="mega-item-body">
                                    <div class="mega-item-header"><span class="mega-item-title">Cloud Hosting</span><span class="mega-item-badge badge-premium">PREMIUM</span></div>
                                    <p class="mega-item-desc">For growing and scalable websites</p>
                                </div>
                            </a>
                            <a href="hosting.html#nodejs" class="mega-item">
                                <div class="mega-item-icon-wrap"><i class="fas fa-code" aria-hidden="true"></i></div>
                                <div class="mega-item-body">
                                    <div class="mega-item-header"><span class="mega-item-title">Node.js Hosting</span></div>
                                    <p class="mega-item-desc">Run modern JavaScript apps</p>
                                </div>
                            </a>
                        </div>
                    </li>
                    <li class="has-submenu">
                        <a href="wordpress.html"${is('wordpress')}>WordPress <i class="fas fa-chevron-down" aria-hidden="true"></i></a>
                        <div class="mw-mega-menu">
                            <a href="wordpress.html" class="mega-item">
                                <div class="mega-item-icon-wrap"><i class="fab fa-wordpress" aria-hidden="true"></i></div>
                                <div class="mega-item-body">
                                    <div class="mega-item-header"><span class="mega-item-title">WordPress Hosting</span><span class="mega-item-badge badge-offer">80% OFF</span></div>
                                    <p class="mega-item-desc">Get your website online today</p>
                                </div>
                            </a>
                            <a href="wordpress.html#managed" class="mega-item">
                                <div class="mega-item-icon-wrap"><i class="fas fa-shield-halved" aria-hidden="true"></i></div>
                                <div class="mega-item-body">
                                    <div class="mega-item-header"><span class="mega-item-title">Managed WordPress</span><span class="mega-item-badge badge-premium">PREMIUM</span></div>
                                    <p class="mega-item-desc">Hosting for websites that make money</p>
                                </div>
                            </a>
                        </div>
                    </li>
                    <li class="has-submenu">
                        <a href="vps-hosting.html"${is('vps')}>VPS &amp; Dedicated <i class="fas fa-chevron-down" aria-hidden="true"></i></a>
                        <div class="mw-mega-menu">
                            <a href="vps-hosting.html" class="mega-item">
                                <div class="mega-item-icon-wrap"><i class="fas fa-server" aria-hidden="true"></i></div>
                                <div class="mega-item-body">
                                    <div class="mega-item-header"><span class="mega-item-title">VPS Hosting</span><span class="mega-item-badge badge-offer">57% OFF</span></div>
                                    <p class="mega-item-desc">For more power and control</p>
                                </div>
                            </a>
                            <a href="managed-vps.html" class="mega-item">
                                <div class="mega-item-icon-wrap"><i class="fas fa-sliders" aria-hidden="true"></i></div>
                                <div class="mega-item-body">
                                    <div class="mega-item-header"><span class="mega-item-title">Managed VPS Hosting</span><span class="mega-item-badge badge-offer">50% OFF</span></div>
                                    <p class="mega-item-desc">We manage your VPS for you</p>
                                </div>
                            </a>
                            <a href="windows-vps.html" class="mega-item">
                                <div class="mega-item-icon-wrap"><i class="fab fa-windows" aria-hidden="true"></i></div>
                                <div class="mega-item-body">
                                    <div class="mega-item-header"><span class="mega-item-title">Windows VPS</span><span class="mega-item-badge badge-offer">50% OFF</span></div>
                                    <p class="mega-item-desc">Ideal for ASP.NET and Windows apps</p>
                                </div>
                            </a>
                            <a href="dedicated-server.html" class="mega-item">
                                <div class="mega-item-icon-wrap"><i class="fas fa-database" aria-hidden="true"></i></div>
                                <div class="mega-item-body">
                                    <div class="mega-item-header"><span class="mega-item-title">Dedicated Server</span></div>
                                    <p class="mega-item-desc">Built for large-scale projects</p>
                                </div>
                            </a>
                        </div>
                    </li>
                    <li class="has-submenu">
                        <a href="domain.html"${is('domain')}>Domain &amp; Email <i class="fas fa-chevron-down" aria-hidden="true"></i></a>
                        <div class="mw-mega-menu">
                            <a href="domain.html" class="mega-item">
                                <div class="mega-item-icon-wrap"><i class="fas fa-globe" aria-hidden="true"></i></div>
                                <div class="mega-item-body">
                                    <div class="mega-item-header"><span class="mega-item-title">Domain</span></div>
                                    <p class="mega-item-desc">Register your domain name</p>
                                </div>
                            </a>
                            <a href="business-email.html" class="mega-item">
                                <div class="mega-item-icon-wrap"><i class="fas fa-envelope" aria-hidden="true"></i></div>
                                <div class="mega-item-body">
                                    <div class="mega-item-header"><span class="mega-item-title">Business Email</span><span class="mega-item-badge badge-offer">83% OFF</span></div>
                                    <p class="mega-item-desc">Professional email for startups</p>
                                </div>
                            </a>
                            <a href="ssl-certificate.html" class="mega-item">
                                <div class="mega-item-icon-wrap"><i class="fas fa-lock" aria-hidden="true"></i></div>
                                <div class="mega-item-body">
                                    <div class="mega-item-header"><span class="mega-item-title">SSL Certificate</span></div>
                                    <p class="mega-item-desc">Encrypt data & protect users</p>
                                </div>
                            </a>
                        </div>
                    </li>
                    <li><a href="pricing.html"${is('pricing')}>Pricing</a></li>
                    <li class="has-submenu">
                        <a href="index.html#contact">Support <i class="fas fa-chevron-down" aria-hidden="true"></i></a>
                        <div class="mw-mega-menu">
                            <a href="knowledge-base.html" class="mega-item">
                                <div class="mega-item-icon-wrap"><i class="fas fa-book-open" aria-hidden="true"></i></div>
                                <div class="mega-item-body">
                                    <div class="mega-item-header"><span class="mega-item-title">Knowledge Base</span></div>
                                    <p class="mega-item-desc">Find instant answers and solutions</p>
                                </div>
                            </a>
                            <a href="tutorials.html" class="mega-item">
                                <div class="mega-item-icon-wrap"><i class="fas fa-circle-play" aria-hidden="true"></i></div>
                                <div class="mega-item-body">
                                    <div class="mega-item-header"><span class="mega-item-title">Tutorials</span></div>
                                    <p class="mega-item-desc">Easy how-to guides and videos</p>
                                </div>
                            </a>
                            <a href="index.html#contact" class="mega-item">
                                <div class="mega-item-icon-wrap"><i class="fas fa-headset" aria-hidden="true"></i></div>
                                <div class="mega-item-body">
                                    <div class="mega-item-header"><span class="mega-item-title">Contact Us</span></div>
                                    <p class="mega-item-desc">Reach our support team anytime</p>
                                </div>
                            </a>
                        </div>
                    </li>
                    <li class="has-submenu">
                        <a href="about-us.html"${is('about')}>About Us <i class="fas fa-chevron-down" aria-hidden="true"></i></a>
                        <div class="mw-mega-menu">
                            <a href="about-us.html" class="mega-item">
                                <div class="mega-item-icon-wrap"><i class="fas fa-building" aria-hidden="true"></i></div>
                                <div class="mega-item-body">
                                    <div class="mega-item-header"><span class="mega-item-title">About Fraylon</span></div>
                                    <p class="mega-item-desc">Trusted Indian host since 2025</p>
                                </div>
                            </a>
                            <a href="reviews.html" class="mega-item">
                                <div class="mega-item-icon-wrap"><i class="fas fa-users" aria-hidden="true"></i></div>
                                <div class="mega-item-body">
                                    <div class="mega-item-header"><span class="mega-item-title">Customer Success Stories</span></div>
                                    <p class="mega-item-desc">Real results from our clients</p>
                                </div>
                            </a>
                            <a href="blog.html" class="mega-item">
                                <div class="mega-item-icon-wrap"><i class="fas fa-newspaper" aria-hidden="true"></i></div>
                                <div class="mega-item-body">
                                    <div class="mega-item-header"><span class="mega-item-title">Blog</span></div>
                                    <p class="mega-item-desc">Guides, tips, and hosting updates</p>
                                </div>
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
            <div class="mw-header-actions">
                <button type="button" class="btn btn-outline-account" data-open-modal="accountModal" data-fraylon-action="open-account">My Account</button>
                <button class="mw-hamburger" id="hamburgerBtn" aria-label="Open menu" aria-controls="mobileNav" aria-expanded="false">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </div>
    </header>`;
}

function footer() {
    return `    <footer class="mw-footer">
        <div class="container">
            <div class="footer-main">
                <div class="footer-brand">
                    <img src="logo.png" alt="Fraylon Logo" class="footer-logo-white">
                    <p class="brand-desc">Fraylon Hosting is an Indian web hosting company, incorporated December 2025 and headquartered in Hyderabad, Telangana. We help businesses, developers, and startups host their websites reliably across India.</p>
                    <div class="footer-socials">
                        <a href="${LINKEDIN_URL}" target="_blank" rel="noopener" aria-label="Fraylon on Facebook"><i class="fab fa-facebook-f" aria-hidden="true"></i></a>
                        <a href="${LINKEDIN_URL}" target="_blank" rel="noopener" aria-label="Fraylon on X / Twitter"><i class="fab fa-x-twitter" aria-hidden="true"></i></a>
                        <a href="${LINKEDIN_URL}" target="_blank" rel="noopener" aria-label="Fraylon on LinkedIn"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a>
                        <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener" aria-label="Fraylon on Instagram"><i class="fab fa-instagram" aria-hidden="true"></i></a>
                        <a href="${LINKEDIN_URL}" target="_blank" rel="noopener" aria-label="Fraylon on YouTube"><i class="fab fa-youtube" aria-hidden="true"></i></a>
                    </div>
                </div>

                <div class="footer-links-grid">
                    <div class="footer-col">
                        <h3>HOSTING</h3>
                        <ul>
                            <li><a href="web-hosting.html">Web Hosting</a></li>
                            <li><a href="hosting.html#cloud">Cloud Hosting</a></li>
                            <li><a href="wordpress.html">WordPress Hosting</a></li>
                            <li><a href="wordpress.html#managed">Managed WordPress</a></li>
                            <li><a href="hosting.html#nodejs">Node.js Hosting</a></li>
                            <li><a href="ssl-certificate.html">SSL Certificates</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h3>VPS &amp; SERVERS</h3>
                        <ul>
                            <li><a href="vps-hosting.html">VPS Hosting</a></li>
                            <li><a href="managed-vps.html">Managed VPS</a></li>
                            <li><a href="windows-vps.html">Windows VPS</a></li>
                            <li><a href="dedicated-server.html">Dedicated Server</a></li>
                        </ul>
                        <h3 class="mt-4">DOMAIN &amp; EMAIL</h3>
                        <ul>
                            <li><a href="domain.html">Domain Registration</a></li>
                            <li><a href="business-email.html">Business Email</a></li>
                            <li><a href="ssl-certificate.html">SSL Certificate</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h3>TOOLS</h3>
                        <ul>
                            <li><a href="ai-builder.html">AI Website Builder</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h3>COMPANY</h3>
                        <ul>
                            <li><a href="about-us.html">About Fraylon</a></li>
                            <li><a href="reviews.html">Customer Reviews</a></li>
                            <li><a href="blog.html">Blog</a></li>
                            <li><a href="knowledge-base.html">Knowledge Base</a></li>
                            <li><a href="tutorials.html">Video Tutorials</a></li>
                            <li><a href="index.html#contact">Contact Us</a></li>
                            <li><a href="sitemap.html">Sitemap</a></li>
                        </ul>
                        <h3 class="mt-4">LEGAL</h3>
                        <ul>
                            <li><a href="privacy-policy.html">Privacy Policy</a></li>
                            <li><a href="terms.html">Terms of Service</a></li>
                            <li><a href="sla.html">SLA</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="copyright-row"><p>© Copyright 2025 - 2026 Fraylon Hosting. All rights reserved.</p></div>
                <div class="payment-row">
                    <div class="payment-icons">
                        <img loading="lazy" src="./src/assets/visa_icon.svg" alt="Visa">
                        <img loading="lazy" src="./src/assets/mastercard_icon.svg" alt="Mastercard">
                        <img loading="lazy" src="./src/assets/rupay_icon.svg" alt="RuPay">
                        <img loading="lazy" src="./src/assets/upi_icon.svg" alt="UPI">
                        <img loading="lazy" src="./src/assets/gpay_icon.svg" alt="Google Pay">
                        <img loading="lazy" src="./src/assets/phone-pe.svg" alt="PhonePe">
                    </div>
                    <a href="pricing.html" class="more-payments">Accepted: UPI, NetBanking, RuPay &amp; Cards</a>
                </div>
            </div>
        </div>
    </footer>`;
}

function shellTail() {
    return `
    <button class="mw-chat-bubble" type="button" aria-label="Open support chat" data-open-modal="contactModal" data-fraylon-action="open-chat-bubble">
        <i class="fas fa-comment-dots" aria-hidden="true"></i>
    </button>

    <div class="mw-mobile-overlay" id="mobileOverlay" aria-hidden="true"></div>
    <nav class="mw-mobile-nav" id="mobileNav" aria-label="Mobile navigation" aria-hidden="true">
        <div class="mw-mobile-nav-header">
            <img src="logo.png" alt="Fraylon Hosting" class="mw-mobile-logo">
            <button class="mw-mobile-close" id="mobileClose" type="button" aria-label="Close menu"><i class="fas fa-times" aria-hidden="true"></i></button>
        </div>
        <ul class="mw-mobile-nav-ul">
            <li><a href="index.html">Home</a></li>
            <li class="has-sub">
                <button type="button" class="mw-mobile-sub-toggle" aria-expanded="false">Hosting <i class="fas fa-chevron-down" aria-hidden="true"></i></button>
                <ul class="mw-mobile-sub">
                    <li><a href="hosting.html">Overview</a></li>
                    <li><a href="web-hosting.html">Web Hosting</a></li>
                    <li><a href="hosting.html#cloud">Cloud Hosting</a></li>
                    <li><a href="hosting.html#nodejs">Node.js Hosting</a></li>
                </ul>
            </li>
            <li class="has-sub">
                <button type="button" class="mw-mobile-sub-toggle" aria-expanded="false">VPS &amp; Dedicated <i class="fas fa-chevron-down" aria-hidden="true"></i></button>
                <ul class="mw-mobile-sub">
                    <li><a href="vps-hosting.html">VPS Hosting</a></li>
                    <li><a href="managed-vps.html">Managed VPS</a></li>
                    <li><a href="windows-vps.html">Windows VPS</a></li>
                    <li><a href="dedicated-server.html">Dedicated Server</a></li>
                </ul>
            </li>
            <li class="has-sub">
                <button type="button" class="mw-mobile-sub-toggle" aria-expanded="false">Domain &amp; Email <i class="fas fa-chevron-down" aria-hidden="true"></i></button>
                <ul class="mw-mobile-sub">
                    <li><a href="domain.html">Domain</a></li>
                    <li><a href="business-email.html">Business Email</a></li>
                    <li><a href="ssl-certificate.html">SSL Certificate</a></li>
                </ul>
            </li>
            <li><a href="wordpress.html">WordPress</a></li>
            <li><a href="pricing.html">Pricing</a></li>
            <li><a href="index.html#contact">Support</a></li>
            <li><a href="about-us.html">About Us</a></li>
        </ul>
        <button type="button" class="btn btn-mw-primary mw-mobile-cta" data-open-modal="accountModal">My Account</button>
    </nav>

    <div class="mw-toast" id="toast" role="status" aria-live="polite" aria-atomic="true"></div>

    <div class="mw-modal-root" id="accountModal" role="dialog" aria-modal="true" aria-labelledby="accountModalTitle" aria-hidden="true">
        <div class="mw-modal-backdrop" data-close-modal></div>
        <div class="mw-modal-panel" role="document">
            <button type="button" class="mw-modal-close" data-close-modal aria-label="Close"><i class="fas fa-times" aria-hidden="true"></i></button>
            <div class="mw-modal-head">
                <span class="mw-modal-kicker">Customer area</span>
                <h2 id="accountModalTitle">Sign in to your dashboard</h2>
                <p>Manage sites, billing, backups, and DNS in one place.</p>
            </div>
            <form class="mw-modal-form" id="accountForm" novalidate>
                <div class="form-field"><label for="amEmail">Email</label><input type="email" id="amEmail" name="email" required autocomplete="email" placeholder="you@company.com"></div>
                <div class="form-field"><label for="amPassword">Password</label><input type="password" id="amPassword" name="password" required autocomplete="current-password" placeholder="••••••••"></div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin: 16px 0; font-size: 14px; text-align: left;">
                    <label style="display: flex; align-items: center; gap: 8px; color: #475569; cursor: pointer; text-transform: none; font-weight: normal; margin-bottom: 0;">
                        <input type="checkbox" name="remember" style="width: 16px; height: 16px; margin: 0;"> Stay signed in
                    </label>
                    <a href="forgot-password.html" style="color: #146ef5; font-weight: 600;">Forgot password?</a>
                </div>
                <button type="submit" class="btn btn-mw-primary" data-fraylon-action="submit-login">Sign in</button>
                <p class="form-status" id="accountFormStatus" role="status" aria-live="polite"></p>
                <p class="modal-foot">No account yet? <a href="signup.html">Create one in 60 seconds</a></p>
            </form>
        </div>
    </div>

    <div class="mw-modal-root" id="migrationModal" role="dialog" aria-modal="true" aria-labelledby="migrationModalTitle" aria-hidden="true">
        <div class="mw-modal-backdrop" data-close-modal></div>
        <div class="mw-modal-panel" role="document">
            <button type="button" class="mw-modal-close" data-close-modal aria-label="Close"><i class="fas fa-times" aria-hidden="true"></i></button>
            <div class="mw-modal-head"><span class="mw-modal-kicker">Free site migration</span><h2 id="migrationModalTitle">Tell us about your site</h2><p>Our migrations team will reach out within one business hour.</p></div>
            <form class="mw-modal-form" id="migrationForm" novalidate>
                <div class="form-row two">
                    <div class="form-field"><label for="mfName">Your name</label><input type="text" id="mfName" name="name" required autocomplete="name"></div>
                    <div class="form-field"><label for="mfEmail">Email</label><input type="email" id="mfEmail" name="email" required autocomplete="email"></div>
                </div>
                <div class="form-row two">
                    <div class="form-field"><label for="mfDomain">Domain to migrate</label><input type="text" id="mfDomain" name="domain" placeholder="example.com" required></div>
                    <div class="form-field"><label for="mfCurrentHost">Current host</label><input type="text" id="mfCurrentHost" name="currentHost" placeholder="GoDaddy, Hostinger…"></div>
                </div>
                <div class="form-field"><label for="mfStack">Site type</label>
                    <select id="mfStack" name="stack"><option value="wordpress">WordPress</option><option value="static">Static HTML / Jamstack</option><option value="php">Custom PHP</option><option value="node">Node.js</option><option value="other">Other</option></select>
                </div>
                <div class="form-field"><label for="mfNotes">Anything we should know? <span class="muted">(optional)</span></label><textarea id="mfNotes" name="notes" rows="3" placeholder="DB sizes, custom configs, downtime preferences…"></textarea></div>
                <button type="submit" class="btn btn-mw-primary" data-fraylon-action="submit-migration">Request migration</button>
                <p class="form-status" id="migrationFormStatus" role="status" aria-live="polite"></p>
            </form>
        </div>
    </div>

    <div class="mw-modal-root" id="contactModal" role="dialog" aria-modal="true" aria-labelledby="contactModalTitle" aria-hidden="true">
        <div class="mw-modal-backdrop" data-close-modal></div>
        <div class="mw-modal-panel" role="document">
            <button type="button" class="mw-modal-close" data-close-modal aria-label="Close"><i class="fas fa-times" aria-hidden="true"></i></button>
            <div class="mw-modal-head"><span class="mw-modal-kicker">Live chat</span><h2 id="contactModalTitle">Start a conversation</h2><p>Send us a quick message — average response time is under 30 seconds.</p></div>
            <form class="mw-modal-form" id="quickContactForm" novalidate>
                <div class="form-field"><label for="qcEmail">Your email</label><input type="email" id="qcEmail" name="email" required autocomplete="email"></div>
                <div class="form-field"><label for="qcMessage">What can we help with?</label><textarea id="qcMessage" name="message" rows="4" required></textarea></div>
                <button type="submit" class="btn btn-mw-primary" data-fraylon-action="submit-quick-contact">Send message</button>
                <p class="form-status" id="quickContactStatus" role="status" aria-live="polite"></p>
            </form>
        </div>
    </div>

    <script type="module" src="./src/main.js"></script>
</body>
</html>`;
}

function dashboardHeader() {
    return `<body>
    <header class="mw-header" style="position: sticky; top: 0; background: #ffffff; border-bottom: 1px solid #cbd5e1; z-index: 1000; padding: 12px 0;">
        <div class="container" style="max-width:1200px; display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:20px;">
                <div class="mw-logo" style="margin-right:12px;">
                    <a href="index.html" aria-label="Fraylon Hosting — home">
                        <img src="logo.png" alt="Fraylon Hosting" style="height:32px;">
                    </a>
                </div>
                <a href="index.html" style="display:inline-flex; align-items:center; gap:8px; color:#146ef5; font-weight:700; font-size:14px; padding:6px 12px; border-radius:6px; background:rgba(20,110,245,0.06); transition:all 0.2s; text-decoration:none;"><i class="fas fa-arrow-left"></i> Back to Website</a>
            </div>
            
            <div style="display:flex; align-items:center; gap:16px;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #146ef5 0%, #0ea5e9 100%); color: white; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700;" id="dbHeaderAvatar">U</div>
                    <span style="color:#0f172a; font-weight:700; font-size:14px;" id="dbHeaderName">Customer</span>
                </div>
                <button type="button" class="btn btn-outline-account btn-sm" id="dbHeaderSignOutBtn" style="border-color:#ef4444; color:#ef4444; padding:6px 12px; font-size:13px; font-weight:700; margin:0;"><i class="fas fa-right-from-bracket"></i> Sign Out</button>
            </div>
        </div>
    </header>`;
}

function dashboardFooter() {
    return `<footer style="background:#f8fafc; border-top:1px solid #e2e8f0; padding:24px 0; font-size:13px; color:#64748b; text-align:center; width:100%;">
        <div class="container" style="max-width:1200px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
            <p style="margin:0;">© Copyright 2025 - 2026 Fraylon Hosting. Client Portal.</p>
            <div style="display:flex; gap:16px; margin:0;">
                <a href="privacy-policy.html" style="text-decoration:underline; color:#64748b;">Privacy Policy</a>
                <a href="terms.html" style="text-decoration:underline; color:#64748b;">Terms of Service</a>
                <a href="sla.html" style="text-decoration:underline; color:#64748b;">Uptime SLA</a>
            </div>
        </div>
    </footer>`;
}

function page(t) {
    if (t.file === 'dashboard.html') {
        return `${head({ title: t.title, description: t.description })}
${dashboardHeader()}
    <main style="padding-top:20px; background:#f8fafc; min-height:calc(100vh - 140px);">
${t.bodyHtml}
    </main>
${dashboardFooter()}
${shellTail()}`;
    }
    return `${head({ title: t.title, description: t.description })}
${header(t.activePage)}
    <main>
${t.bodyHtml}
    </main>
${footer()}
${shellTail()}`;
}

// Bodies...
const HOSTING_BODY = `
        <section class="page-hero" aria-labelledby="hostingHero">
            <div class="page-hero-glow" aria-hidden="true"></div>
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse" aria-hidden="true"></span> Hosting plans</span>
                <h1 id="hostingHero">Pick the hosting that <span class="text-blue">fits your build</span>.</h1>
                <p class="page-hero-lede">From a personal blog to a Node.js app serving 5 lakh visitors — every plan runs on the same NVMe-powered Indian backbone, with free migration and the same price at renewal.</p>
                <div class="page-hero-actions">
                    <a href="pricing.html" class="btn btn-mw-primary">See all plans <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
                    <button type="button" class="btn btn-mw-secondary" data-open-modal="migrationModal">Migrate my site for free</button>
                </div>
                <ul class="page-hero-trust">
                    <li><i class="fas fa-circle-check" aria-hidden="true"></i> 99.9% uptime SLA</li>
                    <li><i class="fas fa-circle-check" aria-hidden="true"></i> India-based servers</li>
                    <li><i class="fas fa-circle-check" aria-hidden="true"></i> 24/7 human support</li>
                </ul>
            </div>
        </section>
        <section class="hosting-types" id="web">
            <div class="container py-12">
                <div class="type-card">
                    <div class="type-card-icon type-icon-blue"><i class="fas fa-server"></i></div>
                    <div class="type-card-body">
                        <span class="type-card-badge">Most popular</span>
                        <h2>Web Hosting</h2>
                        <p>Fast, affordable shared hosting for marketing sites, small e-commerce stores, and personal projects. Get a site live in under 10 minutes.</p>
                        <ul class="type-card-features">
                            <li><i class="fas fa-bolt"></i> NVMe SSD + LiteSpeed + page cache</li>
                            <li><i class="fas fa-globe"></i> Free domain for 1 year</li>
                            <li><i class="fas fa-lock"></i> Free SSL on every site</li>
                        </ul>
                        <div class="type-card-actions">
                            <a href="web-hosting.html" class="btn btn-mw-primary">Explore Web Hosting</a>
                            <span class="type-card-price">from <strong>₹69/mo</strong></span>
                        </div>
                    </div>
                </div>
                <div class="type-card type-card-alt" id="cloud">
                    <div class="type-card-icon type-icon-cyan"><i class="fas fa-cloud"></i></div>
                    <div class="type-card-body">
                        <span class="type-card-badge badge-premium">Premium</span>
                        <h2>Cloud Hosting</h2>
                        <p>Dedicated CPU and RAM, isolated container, and 20× the headroom of shared.</p>
                        <div class="type-card-actions">
                            <a href="pricing.html#cloud-pro" class="btn btn-mw-primary">See Cloud plans</a>
                            <span class="type-card-price">from <strong>₹449/mo</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
`;

const WORDPRESS_BODY = `
        <section class="page-hero page-hero-wp" aria-labelledby="wpHero">
            <div class="page-hero-glow" aria-hidden="true"></div>
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse" aria-hidden="true"></span> Managed WordPress</span>
                <h1 id="wpHero">WordPress, the way it should run.</h1>
                <p class="page-hero-lede">LiteSpeed-powered. AI-optimised. One-click install. Updates and security baked in.</p>
                <div class="page-hero-actions">
                    <a href="pricing.html" class="btn btn-mw-primary">Start a WP site <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
                    <button type="button" class="btn btn-mw-secondary" data-open-modal="migrationModal">Migrate from another host</button>
                </div>
            </div>
        </section>
`;

const PRICING_BODY = `
        <section class="page-hero page-hero-pricing" aria-labelledby="pricingHero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse" aria-hidden="true"></span> Transparent pricing</span>
                <h1 id="pricingHero">Same price at renewal. Always.</h1>
                <p class="page-hero-lede">Pick a plan, pick a duration, and that's what you pay — guaranteed.</p>
            </div>
        </section>
        <section class="mw-pricing" id="plans-section">
            <div class="container py-12">
                <div class="mw-pricing-grid" id="plansGrid"></div>
            </div>
        </section>
`;

const ABOUT_BODY = `
        <section class="page-hero page-hero-about" aria-labelledby="aboutHero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse" aria-hidden="true"></span> About Fraylon</span>
                <h1 id="aboutHero">Built in Hyderabad. <span class="text-blue">Built for India.</span></h1>
                <p class="page-hero-lede">Fraylon Hosting is an Indian web hosting company — incorporated in December 2025 and headquartered in Hyderabad, Telangana.</p>
            </div>
        </section>
        <section class="about-tabs-section">
            <div class="container">
                <ul class="about-tabs">
                    <li class="active"><a href="about-us.html">Company</a></li>
                    <li><a href="culture.html">Culture</a></li>
                    <li><a href="founders.html">Founders</a></li>
                    <li><a href="team.html">Our Team</a></li>
                </ul>
            </div>
        </section>
        <section class="container py-12" style="max-width:800px; line-height:1.8; color:#334155;">
            <h2>Our Journey</h2>
            <p class="mt-4">Fraylon Hosting was founded with a singular focus: bringing modern, scalable, and ultra-reliable web hosting infrastructure to India's next generation of developers and businesses. Based out of Hyderabad, our platform runs on top-tier NVMe nodes connected to low-latency Indian network exchanges.</p>
            <p class="mt-4">We are tired of typical industry tactics—introductory prices that skyrocket at renewal, hidden fees, and support queues staffed by bots. Fraylon guarantees completely transparent pricing (your renewal price is identical to your signup price) and 24/7 technical support from genuine system engineers.</p>
        </section>
`;

const NOTFOUND_BODY = `
        <section class="page-404">
            <div class="container py-16">
                <div class="page-404-card">
                    <div class="page-404-code">404</div>
                    <h1>This page took a wrong turn.</h1>
                    <p>The link you followed is broken, retired, or possibly never existed.</p>
                    <a href="index.html" class="btn btn-mw-primary">Back to home</a>
                </div>
            </div>
        </section>
`;

const VPS_HOSTING_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> Cloud VPS Hosting</span>
                <h1>High-Performance <span class="text-blue">KVM VPS Hosting</span> in India</h1>
                <p class="page-hero-lede">Full root access, 100% NVMe storage, dedicated IPv4, and 1Gbps uplink in Tier-4 Indian data centers.</p>
                <div class="page-hero-actions">
                    <a href="#vps-plans" class="btn btn-mw-primary">View VPS Plans <i class="fas fa-arrow-right"></i></a>
                    <button type="button" class="btn btn-mw-secondary" data-open-modal="contactModal">Custom OS / Spec Request</button>
                </div>
            </div>
        </section>

        <section class="mw-pricing" id="vps-plans">
            <div class="container py-12">
                <div class="vps-grid-custom">
                    <div class="plan-card">
                        <h3>VPS 1</h3>
                        <p class="plan-desc">Ideal for VPNs, bots, & test environments</p>
                        <div class="plan-price">₹299<span>/mo</span></div>
                        <ul class="plan-feats">
                            <li><i class="fas fa-microchip"></i> 1 vCPU Core</li>
                            <li><i class="fas fa-memory"></i> 2 GB DDR4 RAM</li>
                            <li><i class="fas fa-hard-drive"></i> 50 GB NVMe Storage</li>
                            <li><i class="fas fa-network-wired"></i> 1 TB Bandwidth @ 1Gbps</li>
                            <li><i class="fas fa-terminal"></i> Full Root Access</li>
                        </ul>
                        <a href="cart.html?plan=vps1" class="btn btn-mw-primary">Deploy Now</a>
                    </div>
                    <div class="plan-card plan-featured">
                        <span class="plan-badge">MOST POPULAR</span>
                        <h3>VPS 2</h3>
                        <p class="plan-desc">For growing web apps & staging servers</p>
                        <div class="plan-price">₹599<span>/mo</span></div>
                        <ul class="plan-feats">
                            <li><i class="fas fa-microchip"></i> 2 vCPU Cores</li>
                            <li><i class="fas fa-memory"></i> 4 GB DDR4 RAM</li>
                            <li><i class="fas fa-hard-drive"></i> 80 GB NVMe Storage</li>
                            <li><i class="fas fa-network-wired"></i> 2 TB Bandwidth @ 1Gbps</li>
                            <li><i class="fas fa-terminal"></i> Full Root Access</li>
                        </ul>
                        <a href="cart.html?plan=vps2" class="btn btn-mw-primary">Deploy Now</a>
                    </div>
                    <div class="plan-card">
                        <h3>VPS 3</h3>
                        <p class="plan-desc">For database-heavy & high-traffic apps</p>
                        <div class="plan-price">₹1,199<span>/mo</span></div>
                        <ul class="plan-feats">
                            <li><i class="fas fa-microchip"></i> 4 vCPU Cores</li>
                            <li><i class="fas fa-memory"></i> 8 GB DDR4 RAM</li>
                            <li><i class="fas fa-hard-drive"></i> 160 GB NVMe Storage</li>
                            <li><i class="fas fa-network-wired"></i> 3 TB Bandwidth @ 1Gbps</li>
                            <li><i class="fas fa-terminal"></i> Full Root Access</li>
                        </ul>
                        <a href="cart.html?plan=vps3" class="btn btn-mw-primary">Deploy Now</a>
                    </div>
                </div>

                <div class="section-divider"></div>

                <div style="margin-top: 64px;">
                    <h2 class="text-center mb-6" style="color:#ffffff;">Why Developers Choose Fraylon VPS</h2>
                    <div class="vps-grid-custom">
                        <div class="plan-card" style="padding: 24px;">
                            <h4><i class="fas fa-gauge-high text-blue"></i> KVM Virtualization</h4>
                            <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">No overselling. Guaranteed allocation of CPU, RAM, and NVMe resources for your projects.</p>
                        </div>
                        <div class="plan-card" style="padding: 24px;">
                            <h4><i class="fas fa-bolt text-blue"></i> Instant Provisioning</h4>
                            <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">Your virtual machine is spun up and active in under 60 seconds from payment completion.</p>
                        </div>
                        <div class="plan-card" style="padding: 24px;">
                            <h4><i class="fas fa-location-dot text-blue"></i> Low Indian Latency</h4>
                            <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">Servers located physically in Mumbai for minimal response times across India.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
`;

const MANAGED_VPS_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> 24/7 Managed Servers</span>
                <h1>Hands-Free <span class="text-blue">Managed VPS Hosting</span></h1>
                <p class="page-hero-lede">We handle OS setup, security patches, firewall hardening, daily off-site backups, and cPanel setup so you focus purely on code.</p>
                <div class="page-hero-actions">
                    <a href="#plans" class="btn btn-mw-primary">View Managed Plans</a>
                </div>
            </div>
        </section>
        <section class="container py-12">
            <div class="vps-grid-custom" id="plans">
                <div class="plan-card">
                    <h3>Managed VPS Starter</h3>
                    <p class="plan-desc">For business sites requiring 100% uptime</p>
                    <div class="plan-price">₹899<span>/mo</span></div>
                    <ul class="plan-feats">
                        <li><i class="fas fa-check"></i> 2 vCPU + 4GB RAM</li>
                        <li><i class="fas fa-check"></i> Free cPanel / CyberPanel setup</li>
                        <li><i class="fas fa-check"></i> 24/7 Proactive Monitoring</li>
                        <li><i class="fas fa-check"></i> Automated Daily Backups</li>
                    </ul>
                    <a href="cart.html?plan=mvps1" class="btn btn-mw-primary">Order Managed VPS</a>
                </div>
                <div class="plan-card plan-featured">
                    <span class="plan-badge">BEST VALUE</span>
                    <h3>Managed VPS Business</h3>
                    <p class="plan-desc">For active e-commerce and SaaS platforms</p>
                    <div class="plan-price">₹1,499<span>/mo</span></div>
                    <ul class="plan-feats">
                        <li><i class="fas fa-check"></i> 4 vCPU + 8GB RAM</li>
                        <li><i class="fas fa-check"></i> Free cPanel License</li>
                        <li><i class="fas fa-check"></i> Dedicated Support Engineer</li>
                        <li><i class="fas fa-check"></i> Security Hardening & WAF</li>
                    </ul>
                    <a href="cart.html?plan=mvps2" class="btn btn-mw-primary">Order Managed VPS</a>
                </div>
            </div>

            <div class="section-divider"></div>

            <div style="margin-top: 64px;">
                <h2 style="text-align:center; margin-bottom:24px;">Managed vs Self-Managed: What We Take Care Of</h2>
                <div class="vps-grid-custom">
                    <div class="plan-card">
                        <h4>Security &amp; Updates</h4>
                        <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">We run system updates, install OS patches, harden SSH access, and configure hardware firewalls regularly.</p>
                    </div>
                    <div class="plan-card">
                        <h4>Monitoring &amp; Alerts</h4>
                        <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">Our automated systems monitor RAM usage, CPU load, and disk health 24/7 to resolve issues proactively.</p>
                    </div>
                </div>
            </div>
        </section>
`;

const WINDOWS_VPS_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> Windows OS VPS</span>
                <h1>Windows Server VPS with <span class="text-blue">RDP Access</span></h1>
                <p class="page-hero-lede">Windows Server 2022/2019 pre-licensed with administrator remote desktop access and MS SQL Server readiness.</p>
                <div class="page-hero-actions">
                    <a href="cart.html?plan=winvps1" class="btn btn-mw-primary">Deploy Windows VPS</a>
                </div>
            </div>
        </section>
        <section class="container py-12">
            <div class="vps-grid-custom">
                <div class="plan-card">
                    <h3>Win-VPS 1</h3>
                    <div class="plan-price">₹799<span>/mo</span></div>
                    <ul class="plan-feats">
                        <li><i class="fab fa-windows"></i> Windows Server 2022</li>
                        <li><i class="fas fa-microchip"></i> 2 vCPU Cores</li>
                        <li><i class="fas fa-memory"></i> 4 GB RAM</li>
                        <li><i class="fas fa-hard-drive"></i> 100 GB NVMe SSD</li>
                    </ul>
                    <a href="cart.html?plan=winvps1" class="btn btn-mw-primary">Order Now</a>
                </div>
                <div class="plan-card plan-featured">
                    <h3>Win-VPS 2</h3>
                    <div class="plan-price">₹1,499<span>/mo</span></div>
                    <ul class="plan-feats">
                        <li><i class="fab fa-windows"></i> Windows Server 2022</li>
                        <li><i class="fas fa-microchip"></i> 4 vCPU Cores</li>
                        <li><i class="fas fa-memory"></i> 8 GB RAM</li>
                        <li><i class="fas fa-hard-drive"></i> 180 GB NVMe SSD</li>
                    </ul>
                    <a href="cart.html?plan=winvps2" class="btn btn-mw-primary">Order Now</a>
                </div>
            </div>

            <div class="section-divider"></div>

            <div style="margin-top: 64px;">
                <h2 style="text-align:center; margin-bottom:24px;">Optimized for Enterprise Applications</h2>
                <div class="vps-grid-custom">
                    <div class="plan-card">
                        <h4>Full RDP Control</h4>
                        <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">Connect securely from any location using official Windows Remote Desktop Protocol (RDP) with administrator privileges.</p>
                    </div>
                    <div class="plan-card">
                        <h4>ASP.NET &amp; MS SQL Support</h4>
                        <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">Highly optimized configuration parameters for .NET Framework, IIS Server, and Microsoft SQL Server databases.</p>
                    </div>
                </div>
            </div>
        </section>
`;

const DEDICATED_SERVER_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> Bare Metal Power</span>
                <h1>Enterprise <span class="text-blue">Dedicated Servers</span> in India</h1>
                <p class="page-hero-lede">100% hardware isolation with AMD EPYC & Intel Xeon processors, IPMI access, and unmetered bandwidth options.</p>
                <div class="page-hero-actions">
                    <button type="button" class="btn btn-mw-primary" data-open-modal="contactModal">Request Custom Quote</button>
                </div>
            </div>
        </section>
        <section class="container py-12">
            <div class="vps-grid-custom">
                <div class="plan-card">
                    <h3>Bare Metal EPYC</h3>
                    <p class="plan-desc">AMD EPYC 7002 series</p>
                    <div class="plan-price">₹7,999<span>/mo</span></div>
                    <ul class="plan-feats">
                        <li><i class="fas fa-server"></i> 16 Cores / 32 Threads</li>
                        <li><i class="fas fa-memory"></i> 64 GB DDR4 ECC RAM</li>
                        <li><i class="fas fa-hard-drive"></i> 2x 1TB NVMe Enterprise RAID</li>
                        <li><i class="fas fa-network-wired"></i> 10 TB Bandwidth @ 1Gbps</li>
                    </ul>
                    <button type="button" class="btn btn-mw-primary" data-open-modal="contactModal">Configure Server</button>
                </div>
            </div>

            <div class="section-divider"></div>

            <div style="margin-top:64px;">
                <h2 style="text-align:center; margin-bottom:24px;">Standard Features on All Dedicated Servers</h2>
                <div class="vps-grid-custom">
                    <div class="plan-card">
                        <h4>Hardware SLA</h4>
                        <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">4-hour hardware replacement guarantee for failed RAM, disks, or server chassis components.</p>
                    </div>
                    <div class="plan-card">
                        <h4>IPMI &amp; iLO Access</h4>
                        <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">Out-of-band management console control to reinstall operating systems and monitor servers remotely.</p>
                    </div>
                </div>
            </div>
        </section>
`;

const DOMAIN_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> Domain Search</span>
                <h1>Find &amp; Register Your <span class="text-blue">Domain Name</span></h1>
                <p class="page-hero-lede">Instant domain search with free WHOIS Privacy, DNS management, and theft protection.</p>
                <div class="domain-search-box mt-6">
                    <input type="text" id="domainSearchInput" placeholder="Type your domain name (e.g. mycompany.in)..." class="domain-input">
                    <button type="button" class="btn btn-mw-primary" id="domainSearchBtn"><i class="fas fa-search"></i> Search Domain</button>
                </div>
                <p id="domainSearchResult" class="mt-4 font-semibold text-blue-400" style="min-height:24px;"></p>
            </div>
        </section>
        <section class="container py-12">
            <h2 class="text-center mb-8">Popular TLD Extensions</h2>
            <div class="vps-grid-custom">
                <div class="plan-card text-center">
                    <h3>.IN</h3>
                    <div class="plan-price">₹399<span>/yr</span></div>
                    <p>India's official identity domain</p>
                </div>
                <div class="plan-card text-center plan-featured">
                    <h3>.COM</h3>
                    <div class="plan-price">₹799<span>/yr</span></div>
                    <p>The global standard domain</p>
                </div>
                <div class="plan-card text-center">
                    <h3>.CO.IN</h3>
                    <div class="plan-price">₹299<span>/yr</span></div>
                    <p>Perfect for Indian commercial sites</p>
                </div>
            </div>

            <div class="section-divider"></div>

            <div style="margin-top:64px;">
                <h2 style="text-align:center; margin-bottom:24px;">Everything Included with Your Domain</h2>
                <div class="vps-grid-custom">
                    <div class="plan-card">
                        <h4>Free WHOIS Privacy</h4>
                        <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">Hides your personal email and telephone number from spammers in the global WHOIS database registry.</p>
                    </div>
                    <div class="plan-card">
                        <h4>DNS Management</h4>
                        <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">Full control to edit A records, CNAME records, TXT verification parameters, and MX mail routes instantly.</p>
                    </div>
                </div>
            </div>
        </section>
`;

const BUSINESS_EMAIL_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> Professional Email</span>
                <h1>Custom Business Email <span class="text-blue">@yourcompany.com</span></h1>
                <p class="page-hero-lede">Ad-free, secure webmail with anti-spam protection, mobile sync, and 99.9% delivery guarantee.</p>
            </div>
        </section>
        <section class="container py-12">
            <div class="vps-grid-custom">
                <div class="plan-card">
                    <h3>Email Starter</h3>
                    <div class="plan-price">₹39<span>/user/mo</span></div>
                    <ul class="plan-feats">
                        <li><i class="fas fa-envelope"></i> 10 GB Storage / account</li>
                        <li><i class="fas fa-mobile-screen"></i> iOS &amp; Android Sync</li>
                        <li><i class="fas fa-shield"></i> Anti-Spam Filter</li>
                    </ul>
                    <a href="cart.html?plan=email1" class="btn btn-mw-primary">Get Business Email</a>
                </div>
                <div class="plan-card plan-featured">
                    <h3>Email Business</h3>
                    <div class="plan-price">₹79<span>/user/mo</span></div>
                    <ul class="plan-feats">
                        <li><i class="fas fa-envelope"></i> 25 GB Storage / account</li>
                        <li><i class="fas fa-mobile-screen"></i> Mobile + Outlook Sync</li>
                        <li><i class="fas fa-shield"></i> Advanced Malware &amp; Spam Shield</li>
                    </ul>
                    <a href="cart.html?plan=email2" class="btn btn-mw-primary">Get Business Email</a>
                </div>
            </div>

            <div class="section-divider"></div>

            <div style="margin-top:64px;">
                <h2 style="text-align:center; margin-bottom:24px;">Professional Email Platform Features</h2>
                <div class="vps-grid-custom">
                    <div class="plan-card">
                        <h4>Secure Webmail Suite</h4>
                        <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">Access calendar, contacts, notes, and mail from any web browser using our fast responsive interface.</p>
                    </div>
                    <div class="plan-card">
                        <h4>Zero Deliverability Worries</h4>
                        <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">Clean IP reputations and relay architecture ensure your emails hit the recipient's inbox, not the junk folder.</p>
                    </div>
                </div>
            </div>
        </section>
`;

const SSL_CERTIFICATE_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> Web Security</span>
                <h1>256-Bit <span class="text-blue">SSL Certificates</span></h1>
                <p class="page-hero-lede">Encrypt site traffic, show the green HTTPS padlock, and rank higher on Google search results.</p>
            </div>
        </section>
        <section class="container py-12">
            <div class="vps-grid-custom">
                <div class="plan-card">
                    <h3>Free Auto-SSL</h3>
                    <div class="plan-price">FREE<span>/forever</span></div>
                    <p>Included automatically with every Fraylon hosting plan.</p>
                </div>
                <div class="plan-card plan-featured">
                    <h3>Wildcard SSL</h3>
                    <div class="plan-price">₹3,499<span>/yr</span></div>
                    <p>Secures main domain + all unlimited subdomains (*.yourdomain.com).</p>
                    <a href="cart.html?plan=wildcard-ssl" class="btn btn-mw-primary">Buy Wildcard SSL</a>
                </div>
            </div>

            <div class="section-divider"></div>

            <div style="margin-top:64px;">
                <h2 style="text-align:center; margin-bottom:24px;">Why You Need an SSL Certificate</h2>
                <div class="vps-grid-custom">
                    <div class="plan-card">
                        <h4>HTTPS Padlock Icon</h4>
                        <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">Ensures web browsers do not show a scary "Not Secure" warning notice to potential customers.</p>
                    </div>
                    <div class="plan-card">
                        <h4>SEO Value Addition</h4>
                        <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">Google ranks secure HTTPS websites higher than non-encrypted websites in organic listings.</p>
                    </div>
                </div>
            </div>
        </section>
`;

const AI_BUILDER_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> AI Tools</span>
                <h1>Build Your Website in 60 Seconds with <span class="text-blue">Fraylon AI</span></h1>
                <p class="page-hero-lede">Type what your business does and our AI generates layouts, images, and SEO content instantly.</p>
                <div class="page-hero-actions">
                    <a href="cart.html" class="btn btn-mw-primary">Start Building with AI <i class="fas fa-bolt"></i></a>
                </div>
            </div>
        </section>
        <section class="container py-12">
            <h2 class="text-center mb-8">How it Works</h2>
            <div class="vps-grid-custom">
                <div class="plan-card">
                    <h4>1. Describe Your Business</h4>
                    <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">Type a short prompt explaining what you sell, who you target, and your preferred theme colors.</p>
                </div>
                <div class="plan-card">
                    <h4>2. Instant Site Generation</h4>
                    <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">The Fraylon AI engine designs custom hero layouts, loads beautiful graphics, and drafts SEO copywriting.</p>
                </div>
                <div class="plan-card">
                    <h4>3. Publish Online</h4>
                    <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">Review, change contents with our visual builder, and hit publish to launch live on NVMe server node structures.</p>
                </div>
            </div>
        </section>
`;

const SIGNUP_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container" style="max-width:550px;">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> Join Fraylon</span>
                <h1>Create your Fraylon account</h1>
                <p class="page-hero-lede">Get your hosting live in under 60 seconds with instant provisioning.</p>
                <form class="mw-modal-form mt-6" id="signupPageForm" novalidate style="text-align:left;">
                    <div class="form-field">
                        <label for="suName">Full Name</label>
                        <input type="text" id="suName" name="name" required placeholder="Siddharth Rao">
                    </div>
                    <div class="form-field">
                        <label for="suEmail">Email Address</label>
                        <input type="email" id="suEmail" name="email" required placeholder="you@company.com">
                    </div>
                    <div class="form-field">
                        <label for="suPhone">Phone Number (+91)</label>
                        <input type="tel" id="suPhone" name="phone" required placeholder="9876543210">
                    </div>
                    <div class="form-field">
                        <label for="suPass">Create Password</label>
                        <input type="password" id="suPass" name="password" required placeholder="••••••••">
                    </div>
                    <div style="display: block; margin: 16px 0; text-align: left;">
                        <label style="display: flex; align-items: flex-start; gap: 8px; color: #475569; font-size: 14px; line-height: 1.5; cursor: pointer; text-transform: none; font-weight: normal; margin-bottom: 0;">
                            <input type="checkbox" required checked style="margin-top: 4px; flex-shrink: 0; width: 16px; height: 16px;">
                            <span>I agree to Fraylon's <a href="terms.html" style="color: #146ef5; text-decoration: underline; font-weight: 600;">Terms of Service</a> &amp; <a href="privacy-policy.html" style="color: #146ef5; text-decoration: underline; font-weight: 600;">Privacy Policy</a></span>
                        </label>
                    </div>
                    <button type="submit" class="btn btn-mw-primary" style="width:100%;">Create Account</button>
                    <p class="modal-foot mt-4 text-center">Already have an account? <a href="#" data-open-modal="accountModal">Sign in here</a></p>
                </form>
            </div>
        </section>
`;

const FORGOT_PASSWORD_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container" style="max-width:500px;">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> Account Recovery</span>
                <h1>Reset your password</h1>
                <p class="page-hero-lede">Enter your registered email address and we'll send password reset instructions.</p>
                <form class="mw-modal-form mt-6" id="forgotPassForm" novalidate style="text-align:left;">
                    <div class="form-field">
                        <label for="fpEmail">Email Address</label>
                        <input type="email" id="fpEmail" name="email" required placeholder="you@company.com">
                    </div>
                    <button type="submit" class="btn btn-mw-primary" style="width:100%;">Send Reset Link</button>
                    <p class="form-status mt-3 text-green-400" id="fpStatus" role="status"></p>
                    <p class="modal-foot mt-4 text-center"><a href="#" data-open-modal="accountModal">Back to Sign In</a></p>
                </form>
            </div>
        </section>
`;

const KNOWLEDGE_BASE_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> Support &amp; Help</span>
                <h1>Knowledge Base &amp; <span class="text-blue">Guides</span></h1>
                <p class="page-hero-lede">Instant solutions, cPanel guides, DNS setup, and troubleshooting steps.</p>
                <div class="domain-search-box mt-6">
                    <input type="text" id="kbSearchInput" placeholder="Search guides e.g. nameservers, WordPress, SSL..." class="domain-input">
                    <button type="button" class="btn btn-mw-primary"><i class="fas fa-search"></i> Search KB</button>
                </div>
            </div>
        </section>
        <section class="container py-12">
            <div class="vps-grid-custom">
                <div class="plan-card">
                    <h3><i class="fas fa-rocket text-blue"></i> Getting Started</h3>
                    <ul class="plan-feats mt-4">
                        <li><a href="tutorials.html">How to point your domain to Fraylon</a></li>
                        <li><a href="tutorials.html">1-Click WordPress Installation Guide</a></li>
                        <li><a href="tutorials.html">Accessing cPanel / Fraylon Dashboard</a></li>
                    </ul>
                </div>
                <div class="plan-card">
                    <h3><i class="fas fa-envelope text-blue"></i> Email &amp; Domains</h3>
                    <ul class="plan-feats mt-4">
                        <li><a href="tutorials.html">Setting up Business Email on iPhone / Android</a></li>
                        <li><a href="tutorials.html">Managing MX and SPF DNS Records</a></li>
                        <li><a href="tutorials.html">Enabling Free Auto-SSL Certificate</a></li>
                    </ul>
                </div>
            </div>

            <div style="margin-top: 64px;">
                <h2 style="text-align:center; margin-bottom:24px;">Popular Guides</h2>
                <div class="vps-grid-custom">
                    <div class="plan-card" style="padding: 24px;">
                        <h4>Nameservers</h4>
                        <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">Point your GoDaddy, Bigrock, or Namecheap domain to Fraylon servers using custom DNS rules.</p>
                        <a href="tutorials.html" style="color:#146ef5; font-size:13px; font-weight:700; margin-top:12px; display:inline-block;">Read Guide →</a>
                    </div>
                    <div class="plan-card" style="padding: 24px;">
                        <h4>1-Click WordPress</h4>
                        <p style="font-size:14px; color:#cbd5e1; margin-top:8px;">Create directories, configure databases, and spin up WordPress in 60 seconds.</p>
                        <a href="tutorials.html" style="color:#146ef5; font-size:13px; font-weight:700; margin-top:12px; display:inline-block;">Read Guide →</a>
                    </div>
                </div>
            </div>
        </section>
`;

const TUTORIALS_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> Visual Learning</span>
                <h1>Step-by-Step <span class="text-blue">Video Tutorials</span></h1>
                <p class="page-hero-lede">Learn how to configure your hosting, domains, and web apps in short 3-minute guides.</p>
            </div>
        </section>
        <section class="container py-12" style="max-width:800px; text-align:center;">
            <div class="plan-card" style="padding: 48px; border: 1px dashed rgba(20,110,245,0.3); background: linear-gradient(180deg, rgba(20,110,245,0.04) 0%, #111827 100%);">
                <div style="font-size: 4rem; color: #146ef5; margin-bottom: 24px;"><i class="fas fa-video-slash"></i></div>
                <h2 style="color: white;">Video Tutorials Coming Soon</h2>
                <p style="color: #cbd5e1; max-width: 500px; margin: 12px auto 24px; line-height: 1.6;">Our team is crafting step-by-step high-definition video walkthroughs to help you manage your hosting, domains, and databases. Enter your email below to get notified once they launch!</p>
                <div class="domain-search-box" style="max-width:480px; margin: 0 auto; display: flex; gap: 8px;">
                    <input type="email" placeholder="Enter your email to get notified..." class="domain-input" id="tutorialNotifyInput" style="flex: 1;">
                    <button type="button" class="btn btn-mw-primary" id="tutorialNotifyBtn">Notify Me</button>
                </div>
                <p id="tutorialNotifyStatus" style="min-height:20px; margin-top:12px; font-weight:600; color: #4ade80;"></p>
            </div>
        </section>
`;

const FAQ_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> FAQ</span>
                <h1>Frequently Asked <span class="text-blue">Questions</span></h1>
                <p class="page-hero-lede">Clear answers about pricing, migration, renewals, and uptime guarantee.</p>
            </div>
        </section>
        <section class="container py-12" style="max-width:800px;">
            <div class="faq-item mb-6" style="background:var(--mw-card-bg); padding:20px; border-radius:12px;">
                <h3><i class="fas fa-question-circle text-blue"></i> Is the renewal price really guaranteed to stay the same?</h3>
                <p class="mt-2 text-gray-300">Yes! Unlike other hosting providers who offer low intro rates and hike prices up to 300% on renewal, Fraylon guarantees your renewal price will be identical to your initial signup price.</p>
            </div>
            <div class="faq-item mb-6" style="background:var(--mw-card-bg); padding:20px; border-radius:12px;">
                <h3><i class="fas fa-question-circle text-blue"></i> How does free site migration work?</h3>
                <p class="mt-2 text-gray-300">Once you sign up, submit your existing site details via our migration request form. Our team will transfer your files, databases, and emails with zero downtime within 1 business hour.</p>
            </div>
            <div class="faq-item mb-6" style="background:var(--mw-card-bg); padding:20px; border-radius:12px;">
                <h3><i class="fas fa-question-circle text-blue"></i> What payment methods do you support?</h3>
                <p class="mt-2 text-gray-300">We support all major Indian payment routes including UPI (Google Pay, PhonePe, Paytm, BHIM), NetBanking from 50+ banks, RuPay cards, Visa, and Mastercard via our Razorpay integration.</p>
            </div>
        </section>
`;

const REVIEWS_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> Client Trust</span>
                <h1>Customer Success <span class="text-blue">Stories</span></h1>
                <p class="page-hero-lede">Read how Indian startups, agencies, and developers rely on Fraylon for speed &amp; uptime.</p>
            </div>
        </section>
        <section class="container py-12">
            <div class="vps-grid-custom">
                <div class="plan-card">
                    <div style="color:#f59e0b;" class="mb-2"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    <p>"Fraylon migrated 14 WordPress client sites for our Hyderabad agency in under 2 hours without a single glitch."</p>
                    <strong class="block mt-4 text-white">Ananya Sharma</strong>
                    <span class="text-sm text-gray-400">Founder, WebSpark Digital</span>
                </div>
                <div class="plan-card">
                    <div style="color:#f59e0b;" class="mb-2"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    <p>"The renewal price transparency is a breath of fresh air. No surprise bills after year 1."</p>
                    <strong class="block mt-4 text-white">Rajesh Kumar</strong>
                    <span class="text-sm text-gray-400">CTO, FinEdge Tech</span>
                </div>
            </div>

            <div class="section-divider"></div>

            <div class="vps-grid-custom">
                <div class="plan-card">
                    <div style="color:#f59e0b;" class="mb-2"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    <p>"Uptime has been 100% since migration. The Hyderabad support team resolves queries in under 30 seconds on live chat."</p>
                    <strong class="block mt-4 text-white">Vikram Malhotra</strong>
                    <span class="text-sm text-gray-400">Founder, FoodFlow App</span>
                </div>
                <div class="plan-card">
                    <div style="color:#f59e0b;" class="mb-2"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    <p>"Fraylon's Node.js servers run our Express backend with zero setup hassle. Git push to deploy works brilliantly."</p>
                    <strong class="block mt-4 text-white">Neha Sen</strong>
                    <span class="text-sm text-gray-400">Lead Dev, FinGo India</span>
                </div>
            </div>
        </section>
`;

const BLOG_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> Blog &amp; Insights</span>
                <h1>Fraylon <span class="text-blue">Engineering &amp; Web Hosting Blog</span></h1>
                <p class="page-hero-lede">Articles on web performance, NVMe infrastructure, WordPress tuning, and scaling startups.</p>
            </div>
        </section>
        <section class="container py-12">
            <div class="vps-grid-custom">
                <div class="plan-card">
                    <span class="badge-offer" style="padding: 4px 10px; font-size:11px; font-weight:800; border-radius:4px; background:#146ef5; color:white; align-self:flex-start;">NEW</span>
                    <h3 class="mt-2">Why Indian Websites Load 3x Faster on Local Hyderabad &amp; Mumbai NVMe Servers</h3>
                    <p class="plan-desc mt-2">A technical deep dive into network latency, ISP peering, and NVMe IOPS benchmarks.</p>
                    <a href="#" class="text-blue font-semibold block mt-4">Read Article →</a>
                </div>
                <div class="plan-card">
                    <span class="badge-premium" style="padding: 4px 10px; font-size:11px; font-weight:800; border-radius:4px; background:#0ea5e9; color:white; align-self:flex-start;">GUIDE</span>
                    <h3 class="mt-2">How to Secure Your WordPress Site Against Brute Force &amp; DDoS Attacks</h3>
                    <p class="plan-desc mt-2">Essential security steps every developer should configure on day one.</p>
                    <a href="#" class="text-blue font-semibold block mt-4">Read Article →</a>
                </div>
            </div>
        </section>
`;

const SITEMAP_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> Directory</span>
                <h1>HTML <span class="text-blue">Sitemap</span></h1>
                <p class="page-hero-lede">Structured overview of all pages, hosting plans, resources, and legal documents.</p>
            </div>
        </section>
        <section class="container py-12">
            <div class="vps-grid-custom">
                <div class="plan-card">
                    <h3>Hosting &amp; VPS</h3>
                    <ul class="plan-feats mt-4">
                        <li><a href="index.html"><i class="fas fa-home"></i> Home</a></li>
                        <li><a href="web-hosting.html"><i class="fas fa-server"></i> Web Hosting</a></li>
                        <li><a href="hosting.html"><i class="fas fa-cloud"></i> Hosting Overview</a></li>
                        <li><a href="wordpress.html"><i class="fab fa-wordpress"></i> WordPress Hosting</a></li>
                        <li><a href="vps-hosting.html"><i class="fas fa-terminal"></i> VPS Hosting</a></li>
                        <li><a href="managed-vps.html"><i class="fas fa-sliders"></i> Managed VPS</a></li>
                        <li><a href="windows-vps.html"><i class="fab fa-windows"></i> Windows VPS</a></li>
                        <li><a href="dedicated-server.html"><i class="fas fa-database"></i> Dedicated Server</a></li>
                    </ul>
                </div>
                <div class="plan-card">
                    <h3>Domains, Tools &amp; Legal</h3>
                    <ul class="plan-feats mt-4">
                        <li><a href="domain.html"><i class="fas fa-globe"></i> Domain Registration</a></li>
                        <li><a href="business-email.html"><i class="fas fa-envelope"></i> Business Email</a></li>
                        <li><a href="ssl-certificate.html"><i class="fas fa-lock"></i> SSL Certificate</a></li>
                        <li><a href="ai-builder.html"><i class="fas fa-robot"></i> AI Website Builder</a></li>
                        <li><a href="privacy-policy.html"><i class="fas fa-shield-halved"></i> Privacy Policy</a></li>
                        <li><a href="terms.html"><i class="fas fa-book"></i> Terms of Service</a></li>
                        <li><a href="sla.html"><i class="fas fa-circle-check"></i> SLA</a></li>
                    </ul>
                </div>
            </div>
        </section>
`;

function legalShell(activePage, documentTitle, contentHtml) {
    return `
        <section class="page-hero">
            <div class="container page-hero-container" style="max-width:850px;">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> Compliance</span>
                <h1>${documentTitle}</h1>
                <p class="page-hero-lede">Last updated: July 2026. Official agreements and policy compliance documents.</p>
            </div>
        </section>
        <section class="container py-12" style="max-width:1050px; padding-bottom: 96px;">
            <div style="display:grid; grid-template-columns: 240px 1fr; gap: 40px; text-align: left; align-items: start;">
                <!-- Left column: Sidebar navigation -->
                <aside style="position: sticky; top: 100px; background: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #cbd5e1; z-index: 10;">
                    <h4 style="color:#0f172a; font-weight:700; margin-bottom:16px; font-size:13px; text-transform:uppercase; letter-spacing:0.05em;">Legal Center</h4>
                    <ul style="display:flex; flex-direction:column; gap:12px; font-size:14px; font-weight:600; color:#64748b; padding:0; margin:0; list-style:none;">
                        <li><a href="privacy-policy.html" style="${activePage === 'privacy' ? 'color:#146ef5;' : 'color:#475569;'}"><i class="fas fa-shield-halved" style="margin-right:8px; width:16px;"></i> Privacy Policy</a></li>
                        <li><a href="terms.html" style="${activePage === 'terms' ? 'color:#146ef5;' : 'color:#475569;'}"><i class="fas fa-file-contract" style="margin-right:8px; width:16px;"></i> Terms of Service</a></li>
                        <li><a href="sla.html" style="${activePage === 'sla' ? 'color:#146ef5;' : 'color:#475569;'}"><i class="fas fa-circle-check" style="margin-right:8px; width:16px;"></i> Uptime SLA</a></li>
                    </ul>
                </aside>
                
                <!-- Right column: Readable Document content -->
                <article style="background: #ffffff; padding: 48px; border-radius: 16px; border: 1px solid #cbd5e1; box-shadow: 0 10px 30px rgba(0,0,0,0.03); color: #334155; font-size: 15px; line-height: 1.8;">
                    ${contentHtml}
                </article>
            </div>
        </section>
    `;
}

const PRIVACY_POLICY_BODY = legalShell('privacy', 'Privacy Policy', `
    <h2 style="color:#0f172a; font-size: 22px; margin-bottom: 12px; font-weight: 700;">1. Information We Collect</h2>
    <p style="margin-bottom: 24px;">Fraylon Hosting collects necessary user information including full name, email address, phone number, billing address, and payment details processed via Razorpay. We do not store full credit/debit card numbers on our servers.</p>
    
    <h2 style="color:#0f172a; font-size: 22px; margin-bottom: 12px; font-weight: 700;">2. Data Usage &amp; Security</h2>
    <p style="margin-bottom: 24px;">Your data is stored securely in Tier-4 Indian data centers. We use SSL encryption, firewall protection, and restricted internal access to ensure your information is safe.</p>

    <h2 style="color:#0f172a; font-size: 22px; margin-bottom: 12px; font-weight: 700;">3. Contact &amp; Grievance Officer</h2>
    <p>For privacy inquiries or data rights requests, contact our Grievance Officer at <a href="mailto:support@fraylon.com" style="color:#146ef5; text-decoration: underline; font-weight:600;">support@fraylon.com</a> (Hyderabad, Telangana, India).</p>
`);

const TERMS_BODY = legalShell('terms', 'Terms of Service', `
    <h2 style="color:#0f172a; font-size: 22px; margin-bottom: 12px; font-weight: 700;">1. Renewal Price Guarantee</h2>
    <p style="margin-bottom: 24px;">Fraylon Hosting guarantees that your renewal price will be identical to your initial purchase rate for the same plan duration without unexpected mandatory hikes.</p>

    <h2 style="color:#0f172a; font-size: 22px; margin-bottom: 12px; font-weight: 700;">2. 30-Day Money-Back Policy</h2>
    <p style="margin-bottom: 24px;">If you are unsatisfied with our hosting service within 30 days of initial purchase, you may request a full refund of hosting fees. Domain registrations and custom software licenses are non-refundable.</p>

    <h2 style="color:#0f172a; font-size: 22px; margin-bottom: 12px; font-weight: 700;">3. Acceptable Use Policy</h2>
    <p>Hosting accounts may not be used to distribute malware, phishing content, illegal materials, or unsolicited bulk email (spam).</p>
`);

const SLA_BODY = legalShell('sla', 'Service Level Agreement', `
    <h2 style="color:#0f172a; font-size: 22px; margin-bottom: 12px; font-weight: 700;">1. 99.9% Uptime SLA Commitment</h2>
    <p style="margin-bottom: 24px;">Fraylon Hosting guarantees 99.9% uptime for all Web, Cloud, WordPress, and VPS hosting servers in any given calendar month.</p>

    <h2 style="color:#0f172a; font-size: 22px; margin-bottom: 12px; font-weight: 700;">2. Service Credit Compensation</h2>
    <p>If server availability falls below 99.9% due to unannounced host node failure, affected customers are eligible for hosting credit added directly to their account balance upon request.</p>
`);

const CULTURE_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> Our Culture</span>
                <h1>The Fraylon Team &amp; Work Culture</h1>
                <p class="page-hero-lede">Driven by collaboration, customer support excellence, and innovative thinking.</p>
            </div>
        </section>
        <section class="about-tabs-section">
            <div class="container">
                <ul class="about-tabs">
                    <li><a href="about-us.html">Company</a></li>
                    <li class="active"><a href="culture.html">Culture</a></li>
                    <li><a href="founders.html">Founders</a></li>
                    <li><a href="team.html">Our Team</a></li>
                </ul>
            </div>
        </section>
        <section class="culture-section container py-12">
            <div class="culture-grid">
                <div class="culture-images">
                    <div class="culture-img-wrapper img-main">
                        <img src="./src/assets/culture_1.png" alt="Fraylon Office Culture" style="width:100%; border-radius:12px;">
                    </div>
                </div>
                <div class="culture-content">
                    <h2 class="culture-title" style="color:white; margin-bottom: 24px;">The Core Values We Live By</h2>
                    <div class="values-grid" style="display:grid; gap:20px;">
                        <div class="value-item" style="display:flex; gap:16px;">
                            <div class="value-icon" style="font-size:1.5rem; color:#146ef5;"><i class="fas fa-users"></i></div>
                            <div class="value-text">
                                <h3 style="color:white;">Teamwork</h3>
                                <p style="color:#cbd5e1;">We believe in teamwork and mutual understanding! Our team is driven by passion and committed to contributing to the company's overall success!</p>
                            </div>
                        </div>
                        <div class="value-item" style="display:flex; gap:16px;">
                            <div class="value-icon" style="font-size:1.5rem; color:#146ef5;"><i class="fas fa-shield-alt"></i></div>
                            <div class="value-text">
                                <h3 style="color:white;">Integrity</h3>
                                <p style="color:#cbd5e1;">Our workplace policies establish a sense of purposefulness and collective responsibility among peers. We endorse integrity and honesty in our organization.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
`;

const FOUNDERS_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> Leadership</span>
                <h1>Meet Our Visionary Founders</h1>
                <p class="page-hero-lede">Years of technical and marketing expertise driving Indian hosting innovation.</p>
            </div>
        </section>
        <section class="about-tabs-section">
            <div class="container">
                <ul class="about-tabs">
                    <li><a href="about-us.html">Company</a></li>
                    <li><a href="culture.html">Culture</a></li>
                    <li class="active"><a href="founders.html">Founders</a></li>
                    <li><a href="team.html">Our Team</a></li>
                </ul>
            </div>
        </section>
        <section class="founders-hero-section container py-12" style="color:#cbd5e1;">
            <div class="founder-section" style="margin-bottom:48px;">
                <div class="founder-grid" style="display:grid; grid-template-columns:1fr; gap:32px;">
                    <div class="founder-content">
                        <h2 class="founder-name" style="color:white;">Chinmay Dingore</h2>
                        <p class="founder-intro" style="font-style:italic; margin: 8px 0 16px;">Technical Director &amp; Co-Founder</p>
                        <p class="founder-bio">Chinmay is skilled at handling every aspect of server operations and its management. He carries a wealth of experience in all facets of networking, server management, administration, and technical operations at the data center.</p>
                        <p class="founder-bio mt-2">He has over 15 years of experience in hosting technologies and worked on various high-profile projects. His ability revolves around critical thinking and analytics that has made him a genius at problem-solving.</p>
                    </div>
                </div>
            </div>
            <div class="founder-section" style="margin-bottom:48px;">
                <div class="founder-grid">
                    <div class="founder-content">
                        <h2 class="founder-name" style="color:white;">Deepak Kori</h2>
                        <p class="founder-intro" style="font-style:italic; margin: 8px 0 16px;">Marketing Director &amp; Co-Founder</p>
                        <p class="founder-bio">With enormous experience in the web hosting and marketing industry, Deepak is a visionary that heads an ingenious marketing team at Fraylon Hosting. A leader par excellence, Deepak drives the marketing strategies in the direction of achieving the business goals.</p>
                        <p class="founder-bio mt-2">Deepak started his career in the web hosting industry back in 2005. Through all the years of experience, he has meticulously explored all the facets of the web hosting industry.</p>
                    </div>
                </div>
            </div>
            <div class="founder-section">
                <div class="founder-grid">
                    <div class="founder-content">
                        <h2 class="founder-name" style="color:white;">Chetan Mahale</h2>
                        <p class="founder-intro" style="font-style:italic; margin: 8px 0 16px;">Sales Tactician &amp; Co-Founder</p>
                        <p class="founder-bio">Chetan formulates the growth strategies for sales. He works out the tactics and drafts the action plan for the team. Ever since he began his professional journey in 2006, Chetan has had the mind for innovation and pixel perfection associated with the IT industry.</p>
                    </div>
                </div>
            </div>
        </section>
`;

const TEAM_BODY = `
        <section class="page-hero">
            <div class="container page-hero-container">
                <span class="page-eyebrow"><span class="eyebrow-pulse"></span> Our Team</span>
                <h1>Happiness Engineers</h1>
                <p class="page-hero-lede">We operating 24/7/365 to give expert solutions to customers with hosting issues.</p>
            </div>
        </section>
        <section class="about-tabs-section">
            <div class="container">
                <ul class="about-tabs">
                    <li><a href="about-us.html">Company</a></li>
                    <li><a href="culture.html">Culture</a></li>
                    <li><a href="founders.html">Founders</a></li>
                    <li class="active"><a href="team.html">Our Team</a></li>
                </ul>
            </div>
        </section>
        <section class="team-hero-section container py-12">
            <p style="color:#cbd5e1; max-width:800px; line-height:1.7; margin-bottom:32px;">We've hand-picked our hosting engineers with practical experience of working with networks and servers. They are friendly and helpful people who form the backbone of Fraylon Hosting. They operate 24/7/365 to give expert solutions to the customers with hosting issues and have 100% satisfaction rates.</p>
            <div class="vps-grid-custom">
                <div class="plan-card text-center" style="padding: 24px;">
                    <h3 style="color:white;">Gaurav J.</h3>
                    <p style="color:#cbd5e1; font-size:14px; margin-top:8px;">Senior Linux Admin</p>
                </div>
                <div class="plan-card text-center" style="padding: 24px;">
                    <h3 style="color:white;">Manish K.</h3>
                    <p style="color:#cbd5e1; font-size:14px; margin-top:8px;">WordPress Support Lead</p>
                </div>
                <div class="plan-card text-center" style="padding: 24px;">
                    <h3 style="color:white;">Rahul M.</h3>
                    <p style="color:#cbd5e1; font-size:14px; margin-top:8px;">Support Engineer</p>
                </div>
                <div class="plan-card text-center" style="padding: 24px;">
                    <h3 style="color:white;">Subham M.</h3>
                    <p style="color:#cbd5e1; font-size:14px; margin-top:8px;">Network Specialist</p>
                </div>
            </div>
        </section>
`;

const DASHBOARD_BODY = `
        <section class="container py-12" style="max-width:1200px; padding-bottom: 96px; padding-top: 32px;">
            <div class="vps-grid-custom" style="grid-template-columns: 260px 1fr; gap: 40px; text-align: left; align-items: start;">
                <!-- Left Sidebar Navigation -->
                <aside style="position: sticky; top: 100px; background: #ffffff; padding: 28px 24px; border-radius: 16px; border: 1px solid #cbd5e1; box-shadow: 0 4px 20px rgba(0,0,0,0.02); z-index: 10;">
                    <div style="margin-bottom: 24px; text-align: center;">
                        <div style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #146ef5 0%, #0ea5e9 100%); color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 700; margin: 0 auto 12px; box-shadow: 0 4px 10px rgba(20, 110, 245, 0.3);" id="dbAvatar">U</div>
                        <h4 style="color:#0f172a; font-weight:700; font-size: 16px; margin: 0;" id="dbUserName">Customer Account</h4>
                        <p style="color:#64748b; font-size: 13px; margin: 4px 0 0;" id="dbUserEmail">user@company.com</p>
                    </div>
                    
                    <ul style="display:flex; flex-direction:column; gap:12px; font-size:14px; font-weight:600; padding:0; margin:0; list-style:none;" id="dbSidebarMenu">
                        <li><button type="button" class="db-tab-btn active" data-tab="overview" style="width:100%; border:none; background:none; text-align:left; cursor:pointer; padding:10px 16px; border-radius:8px; display:flex; align-items:center; gap:12px; font-weight:600; transition:all 0.2s;"><i class="fas fa-chart-line" style="width:16px;"></i> Overview</button></li>
                        <li><button type="button" class="db-tab-btn" data-tab="hosting" style="width:100%; border:none; background:none; text-align:left; cursor:pointer; padding:10px 16px; border-radius:8px; display:flex; align-items:center; gap:12px; font-weight:600; transition:all 0.2s;"><i class="fas fa-server" style="width:16px;"></i> Hosting Services</button></li>
                        <li><button type="button" class="db-tab-btn" data-tab="domains" style="width:100%; border:none; background:none; text-align:left; cursor:pointer; padding:10px 16px; border-radius:8px; display:flex; align-items:center; gap:12px; font-weight:600; transition:all 0.2s;"><i class="fas fa-globe" style="width:16px;"></i> Domain Names</button></li>
                        <li><button type="button" class="db-tab-btn" data-tab="billing" style="width:100%; border:none; background:none; text-align:left; cursor:pointer; padding:10px 16px; border-radius:8px; display:flex; align-items:center; gap:12px; font-weight:600; transition:all 0.2s;"><i class="fas fa-receipt" style="width:16px;"></i> Billing &amp; Invoices</button></li>
                        <li><button type="button" class="db-tab-btn" data-tab="support" style="width:100%; border:none; background:none; text-align:left; cursor:pointer; padding:10px 16px; border-radius:8px; display:flex; align-items:center; gap:12px; font-weight:600; transition:all 0.2s;"><i class="fas fa-headset" style="width:16px;"></i> Support Center</button></li>
                        <li style="margin-top: 16px; border-top: 1px solid #e2e8f0; padding-top: 16px;"><button type="button" id="dbSignOutBtn" style="width:100%; border:none; background:none; text-align:left; cursor:pointer; padding:10px 16px; border-radius:8px; display:flex; align-items:center; gap:12px; font-weight:600; color:#ef4444; transition:all 0.2s;"><i class="fas fa-right-from-bracket" style="width:16px;"></i> Sign Out</button></li>
                    </ul>
                </aside>
                
                <!-- Right Main Panel Workspace -->
                <div style="background: #ffffff; padding: 40px; border-radius: 16px; border: 1px solid #cbd5e1; box-shadow: 0 4px 20px rgba(0,0,0,0.02); min-height: 500px;" id="dbWorkspace">
                    <!-- TAB: Overview (Default) -->
                    <div class="db-tab-content" id="tab-overview" style="display: block;">
                        <div style="background: linear-gradient(135deg, rgba(20, 110, 245, 0.05) 0%, rgba(14, 165, 233, 0.05) 100%); border: 1px solid rgba(20, 110, 245, 0.15); padding: 32px; border-radius: 12px; margin-bottom: 32px;">
                            <h2 style="color:#0f172a; margin: 0; font-size: 22px;">Welcome back, <span id="dbWelcomeName">Customer</span>!</h2>
                            <p style="color:#64748b; margin: 8px 0 0; font-size: 15px;">Manage your premium high-speed NVMe hosting and secure domain registrations from one central dashboard.</p>
                        </div>
                        
                        <!-- Counters Grid -->
                        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px;">
                            <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:20px; border-radius:10px; display:flex; align-items:center; gap:16px;">
                                <div style="width:48px; height:48px; border-radius:8px; background:rgba(20,110,245,0.1); color:#146ef5; display:flex; align-items:center; justify-content:center; font-size:20px;"><i class="fas fa-server"></i></div>
                                <div>
                                    <span style="font-size:12px; color:#64748b; font-weight:700; text-transform:uppercase;">Active Hosting</span>
                                    <h3 style="margin:4px 0 0; font-size:24px; color:#0f172a;" id="cntHosting">0</h3>
                                </div>
                            </div>
                            <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:20px; border-radius:10px; display:flex; align-items:center; gap:16px;">
                                <div style="width:48px; height:48px; border-radius:8px; background:rgba(14,165,233,0.1); color:#0ea5e9; display:flex; align-items:center; justify-content:center; font-size:20px;"><i class="fas fa-globe"></i></div>
                                <div>
                                    <span style="font-size:12px; color:#64748b; font-weight:700; text-transform:uppercase;">Domains</span>
                                    <h3 style="margin:4px 0 0; font-size:24px; color:#0f172a;" id="cntDomains">0</h3>
                                </div>
                            </div>
                            <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:20px; border-radius:10px; display:flex; align-items:center; gap:16px;">
                                <div style="width:48px; height:48px; border-radius:8px; background:rgba(16,185,129,0.1); color:#10b981; display:flex; align-items:center; justify-content:center; font-size:20px;"><i class="fas fa-file-invoice-dollar"></i></div>
                                <div>
                                    <span style="font-size:12px; color:#64748b; font-weight:700; text-transform:uppercase;">Total Orders</span>
                                    <h3 style="margin:4px 0 0; font-size:24px; color:#0f172a;" id="cntOrders">0</h3>
                                </div>
                            </div>
                        </div>
        
                        <!-- Dynamic State Container -->
                        <div id="dbOverviewState"></div>
                    </div>
                    
                    <!-- TAB: Hosting Services -->
                    <div class="db-tab-content" id="tab-hosting" style="display: none;">
                        <h3 style="color:#0f172a; margin-bottom: 24px;">Your Active Web Hosting Services</h3>
                        <div id="dbHostingContainer"></div>
                    </div>
                    
                    <!-- TAB: Domain Names -->
                    <div class="db-tab-content" id="tab-domains" style="display: none;">
                        <h3 style="color:#0f172a; margin-bottom: 8px;">Managed Domains</h3>
                        <p style="color:#64748b; font-size:14px; margin-bottom:24px;">Check domain statuses, change nameservers, or register new domain addresses.</p>
                        <div id="dbDomainsContainer"></div>
                    </div>
                    
                    <!-- TAB: Billing & Invoices -->
                    <div class="db-tab-content" id="tab-billing" style="display: none;">
                        <h3 style="color:#0f172a; margin-bottom: 8px;">Order History &amp; Invoices</h3>
                        <p style="color:#64748b; font-size:14px; margin-bottom:24px;">Your dynamic invoice list pulled straight from our PostgreSQL transaction database.</p>
                        
                        <table style="width:100%; border-collapse:collapse; text-align:left; font-size:14px;" id="dbBillingTable">
                            <thead>
                                <tr style="border-bottom:2px solid #e2e8f0; color:#0f172a; font-weight:700;">
                                    <th style="padding:12px 8px;">Order ID / Receipt</th>
                                    <th style="padding:12px 8px;">Plan</th>
                                    <th style="padding:12px 8px;">Date</th>
                                    <th style="padding:12px 8px;">Amount Paid</th>
                                    <th style="padding:12px 8px;">Status</th>
                                </tr>
                            </thead>
                            <tbody id="dbBillingTbody">
                                <tr>
                                    <td colspan="5" style="padding:32px 0; text-align:center; color:#64748b;">Loading your orders...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- TAB: Support Center -->
                    <div class="db-tab-content" id="tab-support" style="display: none;">
                        <h3 style="color:#0f172a; margin-bottom: 8px;">Support Center</h3>
                        <p style="color:#64748b; font-size:14px; margin-bottom:24px;">Submit a priority ticket or chat live with a systems engineer.</p>
                        
                        <div class="vps-grid-custom" style="gap: 24px;">
                            <div style="border:1px solid #e2e8f0; padding:24px; border-radius:12px;">
                                <h4 style="color:#0f172a; margin-bottom:12px;"><i class="fas fa-pen-to-square text-blue" style="margin-right:8px;"></i> Open a Priority Ticket</h4>
                                <form id="dbTicketForm" novalidate style="display:flex; flex-direction:column; gap:12px;">
                                    <div class="form-field" style="margin-bottom:0;">
                                        <label for="tSubject">Subject</label>
                                        <input type="text" id="tSubject" required placeholder="DNS connection issues..." style="padding:8px 12px; border-radius:6px; border:1px solid #cbd5e1; background:white; color:#0f172a;">
                                    </div>
                                    <div class="form-field" style="margin-bottom:0;">
                                        <label for="tMessage">Message Details</label>
                                        <textarea id="tMessage" required rows="3" placeholder="Explain the problem in detail..." style="padding:8px 12px; border-radius:6px; border:1px solid #cbd5e1; font-family:inherit; background:white; color:#0f172a;"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-mw-primary btn-sm" style="align-self:flex-start;">Submit Ticket</button>
                                    <p id="dbTicketStatus" style="font-weight:600; min-height:20px; font-size:13px; color:#10b981; margin:0;"></p>
                                </form>
                            </div>
                            <div style="border:1px solid #e2e8f0; padding:24px; border-radius:12px; display:flex; flex-direction:column; justify-content:space-between;">
                                <div>
                                    <h4 style="color:#0f172a; margin-bottom:12px;"><i class="fas fa-headset text-blue" style="margin-right:8px;"></i> Proactive Live Support</h4>
                                    <p style="color:#64748b; font-size:14px; line-height:1.6; margin:0;">Our technical helpdesk operates 24/7/365 with average response times under 30 seconds. You can start a live chat conversation instantly by opening the support bubble on the bottom right.</p>
                                </div>
                                <button type="button" class="btn btn-mw-secondary btn-sm" style="margin-top:16px; align-self:flex-start;" data-open-modal="contactModal">Chat with Engineer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
`;

// Targets array
const targets = [
    { file: 'hosting.html', title: 'Hosting Plans — Web, Cloud & Node.js | Fraylon Hosting', description: 'Compare Fraylon Web Hosting, Cloud Hosting and Node.js Hosting.', activePage: 'hosting', bodyHtml: HOSTING_BODY },
    { file: 'wordpress.html', title: 'Managed WordPress Hosting — LiteSpeed + 1-click Install | Fraylon', description: 'Fraylon Managed WordPress Hosting: LiteSpeed, AI speed boost, free SSL.', activePage: 'wordpress', bodyHtml: WORDPRESS_BODY },
    { file: 'pricing.html', title: 'Pricing & Plans — Same Price at Renewal | Fraylon Hosting', description: 'Transparent hosting pricing from ₹69/mo.', activePage: 'pricing', bodyHtml: PRICING_BODY },
    { file: 'about-us.html', title: 'About Fraylon Hosting — Indian Web Host from Hyderabad', description: 'Fraylon Hosting is an Indian web host incorporated in Hyderabad, Telangana.', activePage: 'about', bodyHtml: ABOUT_BODY },
    { file: '404.html', title: 'Page Not Found — Fraylon Hosting', description: 'The page you were looking for does not exist.', activePage: '', bodyHtml: NOTFOUND_BODY },
    { file: 'vps-hosting.html', title: 'Cloud VPS Hosting in India — KVM NVMe | Fraylon Hosting', description: 'Fast KVM Cloud VPS Hosting with root access and NVMe storage in India.', activePage: 'vps', bodyHtml: VPS_HOSTING_BODY },
    { file: 'managed-vps.html', title: 'Fully Managed VPS Hosting — 24/7 Proactive Support | Fraylon', description: '24/7 Managed VPS hosting with cPanel, automated backups, and security hardening.', activePage: 'vps', bodyHtml: MANAGED_VPS_BODY },
    { file: 'windows-vps.html', title: 'Windows Server VPS with RDP Access | Fraylon Hosting', description: 'High-performance Windows VPS hosting with remote desktop admin access.', activePage: 'vps', bodyHtml: WINDOWS_VPS_BODY },
    { file: 'dedicated-server.html', title: 'Enterprise Dedicated Servers in India | Fraylon Hosting', description: 'Bare-metal dedicated servers with AMD EPYC & Intel Xeon processors.', activePage: 'vps', bodyHtml: DEDICATED_SERVER_BODY },
    { file: 'domain.html', title: 'Domain Name Registration & Search | Fraylon Hosting', description: 'Search and register .in, .com, .co.in domains with free WHOIS privacy.', activePage: 'domain', bodyHtml: DOMAIN_BODY },
    { file: 'business-email.html', title: 'Business Email Hosting @yourcompany.com | Fraylon Hosting', description: 'Professional custom business email with webmail and anti-spam filter.', activePage: 'domain', bodyHtml: BUSINESS_EMAIL_BODY },
    { file: 'ssl-certificate.html', title: 'SSL Certificates — 256-Bit HTTPS Encryption | Fraylon', description: 'Secure website traffic with SSL certificates and green padlock.', activePage: 'domain', bodyHtml: SSL_CERTIFICATE_BODY },
    { file: 'ai-builder.html', title: 'AI Website Builder — Launch in 60 Seconds | Fraylon', description: 'Create responsive, professional websites instantly using AI.', activePage: '', bodyHtml: AI_BUILDER_BODY },
    { file: 'signup.html', title: 'Create Account — Fraylon Hosting', description: 'Sign up for Fraylon Hosting in 60 seconds.', activePage: '', bodyHtml: SIGNUP_BODY },
    { file: 'forgot-password.html', title: 'Reset Password — Fraylon Hosting', description: 'Recover and reset your Fraylon Hosting password.', activePage: '', bodyHtml: FORGOT_PASSWORD_BODY },
    { file: 'knowledge-base.html', title: 'Knowledge Base & Help Articles | Fraylon Hosting', description: 'Guides, cPanel tutorials, and DNS setup instructions.', activePage: '', bodyHtml: KNOWLEDGE_BASE_BODY },
    { file: 'tutorials.html', title: 'Video & Illustrated Tutorials | Fraylon Hosting', description: 'Step-by-step setup tutorials for hosting and WordPress.', activePage: '', bodyHtml: TUTORIALS_BODY },
    { file: 'faq.html', title: 'Frequently Asked Questions | Fraylon Hosting', description: 'Answers to hosting, migration, billing, and SLA questions.', activePage: '', bodyHtml: FAQ_BODY },
    { file: 'reviews.html', title: 'Customer Success Stories & Reviews | Fraylon Hosting', description: 'Read client reviews and case studies from Indian businesses.', activePage: 'about', bodyHtml: REVIEWS_BODY },
    { file: 'blog.html', title: 'Web Hosting & Developer Blog | Fraylon Hosting', description: 'Insights on NVMe hosting, performance, and WordPress tuning.', activePage: 'about', bodyHtml: BLOG_BODY },
    { file: 'sitemap.html', title: 'Sitemap — Fraylon Hosting', description: 'Complete structured directory of Fraylon Hosting pages.', activePage: '', bodyHtml: SITEMAP_BODY },
    { file: 'privacy-policy.html', title: 'Privacy Policy | Fraylon Hosting', description: 'Fraylon Hosting Privacy Policy compliant with DPDP Act 2023.', activePage: '', bodyHtml: PRIVACY_POLICY_BODY },
    { file: 'terms.html', title: 'Terms of Service | Fraylon Hosting', description: 'Terms of Service and Acceptable Use Policy.', activePage: '', bodyHtml: TERMS_BODY },
    { file: 'sla.html', title: 'Service Level Agreement (SLA) | Fraylon Hosting', description: '99.9% uptime guarantee and service credit terms.', activePage: '', bodyHtml: SLA_BODY },
    { file: 'culture.html', title: 'Company Culture — Fraylon Hosting', description: 'The values and culture that drive our support teams.', activePage: 'about', bodyHtml: CULTURE_BODY },
    { file: 'founders.html', title: 'Our Founders — Fraylon Hosting', description: 'Meet the people who founded Fraylon Hosting.', activePage: 'about', bodyHtml: FOUNDERS_BODY },
    { file: 'team.html', title: 'Our Hosting Engineers Team — Fraylon Hosting', description: 'Meet the support engineers and technical staff of Fraylon.', activePage: 'about', bodyHtml: TEAM_BODY },
    { file: 'dashboard.html', title: 'Customer Dashboard | Fraylon Hosting', description: 'Manage your Fraylon services and billing records.', activePage: '', bodyHtml: DASHBOARD_BODY },
];

for (const t of targets) {
    const html = page(t);
    fs.writeFileSync(path.join(ROOT, t.file), html, 'utf8');
    console.log('wrote', t.file, '(' + html.length + ' chars)');
}

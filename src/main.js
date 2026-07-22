/**
 * Fraylon Hosting — main bundle
 *
 * Responsibilities:
 *   - Pricing engine + data-driven plan rendering
 *   - Persistent countdown timer (12h offer)
 *   - FAQ accordion (button + ARIA, single-open, keyboard)
 *   - Show/Hide features + nested accordions
 *   - Sticky header scrolled state + active section highlighting
 *   - Smooth scroll for in-page anchors
 *   - Mobile drawer (hamburger anim, submenu toggles, route-then-close)
 *   - Modals (account/login, migration, contact + chat)
 *   - Forms (client-side validation + stub submit + toast)
 *   - Integration hooks on window.fraylonHooks for back-end wiring
 */

import './chatbot.js';

(() => {
    'use strict';

    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
    const fmtINR = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

    // ─────────────────────────────────────────────
    // 1. Plan data + pricing engine
    // ─────────────────────────────────────────────

    /**
     * Each plan has a base monthly price per supported duration.
     * `listPrice` is the crossed-out retail price shown next to the discount badge.
     * Discount % is computed as (1 - chosenMonthly / listPrice) so the UI stays in sync.
     */
    const PLAN_DATA = [
        {
            id: 'starter',
            name: 'Starter',
            blurb: 'Great for first-time users.',
            popular: false,
            ctaStyle: 'outline',
            ctaLabel: 'Choose Plan',
            listPrice: 399,
            bonusMonths: 0,
            durations: { 12: 129, 24: 109, 36: 89, 48: 69 },
            coreFeatures: [
                { label: '1 website', on: true },
                { label: 'Free AI website builder', on: true },
                { label: 'Free AI credits', on: true },
                { label: '10 GB NVMe storage', on: true },
                { label: 'Free domain for 1 year', on: false },
                { label: '1 email account', on: true, tag: 'FREE' },
                { label: 'WordPress ready', on: true },
                { label: 'Free SSL for your website', on: true },
                { label: 'Node.js web apps', on: false },
            ],
            extraFeatures: [
                'Free email marketer tool',
                { label: 'AI WP speed boost', tag: 'NEW' },
                'LiteSpeed Server + CDN',
                'Free website migration',
                'India server location',
                'Daily backups',
                'Instant malware cleanup',
                '24/7 priority expert support',
            ],
            sections: [
                {
                    title: 'Managed WordPress',
                    items: [
                        { label: '1-Click WP install', on: true },
                        { label: 'WP-CLI + SSH', on: true },
                        { label: 'Auto-updates + security scanner', on: true },
                        { label: 'Object caching', on: false },
                        { label: 'WordPress multisite', on: false },
                        { label: 'WooCommerce ready', on: true },
                    ],
                },
                {
                    title: 'Developer Tools',
                    items: [
                        { label: 'Node.js, Python, Django', on: false },
                        { label: 'Laravel, CodeIgniter, PHP', on: true },
                        { label: 'SSH + GIT access', on: true },
                    ],
                },
                {
                    title: 'Technical Specs',
                    items: [
                        '3,00,000 files & directories (inodes)',
                        '20 PHP workers',
                        '~10,000 visits monthly',
                        '2 subdomains',
                        '25 MySQL max user connections',
                        '2 databases',
                        '1 FTP account & 5 cronjobs',
                        'Multiple PHP versions',
                        'mPanel control panel',
                        '756 MB RAM, 1 CPU core',
                        '6 MBPS IO limit',
                    ],
                },
                {
                    title: 'AI tools included',
                    items: [
                        { label: 'AI image & content generator', on: true },
                        { label: 'AI blog generator', on: false },
                    ],
                },
                {
                    title: 'Security Suite',
                    items: [
                        { label: 'Web application firewall', on: true },
                        { label: 'Enhanced DDoS protection', on: false },
                        { label: 'Secure access manager', on: true },
                        { label: 'Anycast nameservers', on: false },
                    ],
                },
                {
                    title: 'Support & Policies',
                    items: [
                        '24/7 priority expert support',
                        '30-day money-back guarantee',
                        '99.9% uptime guarantee',
                    ],
                },
            ],
        },
        {
            id: 'premium',
            name: 'Premium',
            blurb: 'Best for blogs & startup websites.',
            popular: true,
            ctaStyle: 'primary',
            ctaLabel: 'Choose Plan',
            listPrice: 499,
            bonusMonths: 3,
            durations: { 12: 159, 24: 139, 36: 119, 48: 99 },
            coreFeatures: [
                { label: '25 websites', on: true },
                { label: 'Free AI website builder', on: true },
                { label: 'Free AI credits', on: true },
                { label: '50 GB NVMe storage', on: true },
                { label: 'Free domain for 1 year', on: true },
                { label: '50 email accounts', on: true, tag: 'FREE' },
                { label: 'WordPress ready', on: true },
                { label: 'Free SSL for every website', on: true },
                { label: 'Node.js web apps', on: false },
            ],
            extraFeatures: [
                'Free email marketer tool',
                { label: 'AI WP speed boost', tag: 'NEW' },
                'LiteSpeed Server + CDN',
                'Free website migration',
                'India server location',
                'Daily backups',
                'Instant malware cleanup',
                '24/7 priority expert support',
            ],
            sections: [
                {
                    title: 'Managed WordPress',
                    items: [
                        { label: '1-Click WP install', on: true },
                        { label: 'WP-CLI + SSH', on: true },
                        { label: 'Auto-updates + security scanner', on: true },
                        { label: 'Object caching', on: true },
                        { label: 'WordPress multisite', on: true },
                        { label: 'WooCommerce ready', on: true },
                    ],
                },
                {
                    title: 'Developer Tools',
                    items: [
                        { label: 'Node.js, Python, Django', on: false },
                        { label: 'Laravel, CodeIgniter, PHP', on: true },
                        { label: 'SSH + GIT access', on: true },
                    ],
                },
                {
                    title: 'Technical Specs',
                    items: [
                        '5,00,000 files & directories (inodes)',
                        '40 PHP workers',
                        '~30,000 visits monthly',
                        '100 subdomains',
                        '50 MySQL max user connections',
                        '350 databases',
                        'Unlimited FTP accounts & cronjobs',
                        'Multiple PHP versions',
                        'mPanel control panel',
                        '2 GB RAM, 2 CPU cores',
                        '12 MBPS IO limit',
                    ],
                },
                {
                    title: 'AI tools included',
                    items: [
                        { label: 'AI image & content generator', on: true },
                        { label: 'AI blog generator', on: true },
                    ],
                },
                {
                    title: 'Security Suite',
                    items: [
                        { label: 'Web application firewall', on: true },
                        { label: 'Enhanced DDoS protection', on: true },
                        { label: 'Secure access manager', on: true },
                        { label: 'Anycast nameservers', on: false },
                    ],
                },
                {
                    title: 'Support & Policies',
                    items: [
                        '24/7 priority expert support',
                        '30-day money-back guarantee',
                        '99.9% uptime guarantee',
                    ],
                },
            ],
        },
        {
            id: 'max',
            name: 'Max',
            blurb: 'Built for growing online projects.',
            popular: false,
            ctaStyle: 'outline',
            ctaLabel: 'Choose Plan',
            listPrice: 599,
            bonusMonths: 3,
            durations: { 12: 269, 24: 239, 36: 209, 48: 189 },
            coreFeatures: [
                { label: '50 websites', on: true },
                { label: 'Free AI website builder', on: true },
                { label: 'Free AI credits', on: true },
                { label: '100 GB NVMe storage', on: true },
                { label: 'Free domain for 1 year', on: true },
                { label: '150 email accounts', on: true, tag: 'FREE' },
                { label: 'WordPress ready', on: true },
                { label: 'Free SSL for every website', on: true },
                { label: '20 Node.js web apps', on: true, tag: 'NEW' },
            ],
            extraFeatures: [
                'Free email marketer tool',
                'Built-in WP staging',
                'LiteSpeed Server + CDN',
                'Free website migration',
                'India server location',
                'Daily backups',
                'Instant malware cleanup',
                '24/7 priority expert support',
            ],
            sections: [
                {
                    title: 'Managed WordPress',
                    items: [
                        { label: '1-Click WP install', on: true },
                        { label: 'WP-CLI + SSH', on: true },
                        { label: 'Auto-updates + security scanner', on: true },
                        { label: 'Object caching', on: true },
                        { label: 'WordPress multisite', on: true },
                        { label: 'WooCommerce ready', on: true },
                    ],
                },
                {
                    title: 'Developer Tools',
                    items: [
                        { label: 'Node.js, Python, Django', on: true },
                        { label: 'Laravel, CodeIgniter, PHP', on: true },
                        { label: 'SSH + GIT access', on: true },
                    ],
                },
                {
                    title: 'Technical Specs',
                    items: [
                        '7,00,000 files & directories (inodes)',
                        '100 PHP workers',
                        '~1,25,000 visits monthly',
                        '200 subdomains',
                        '75 MySQL max user connections',
                        '350 databases',
                        'Unlimited FTP accounts & cronjobs',
                        'Multiple PHP versions',
                        'cPanel + 1-click installer',
                        '3 GB RAM, 3 CPU cores',
                        '20 MBPS IO limit',
                    ],
                },
                {
                    title: 'AI tools included',
                    items: [
                        { label: 'AI image & content generator', on: true },
                        { label: 'AI blog generator', on: true },
                    ],
                },
                {
                    title: 'Security Suite',
                    items: [
                        { label: 'Web application firewall', on: true },
                        { label: 'Enhanced DDoS protection', on: true },
                        { label: 'Secure access manager', on: true },
                        { label: 'Anycast nameservers', on: false },
                    ],
                },
                {
                    title: 'Support & Policies',
                    items: [
                        '24/7 priority expert support',
                        '30-day money-back guarantee',
                        '99.9% uptime guarantee',
                    ],
                },
            ],
        },
        {
            id: 'cloud-pro',
            name: 'Cloud Pro',
            blurb: '20x more power with cloud hosting.',
            popular: false,
            ctaStyle: 'outline',
            ctaLabel: 'Choose Plan',
            listPrice: 1499,
            bonusMonths: 3,
            durations: { 12: 599, 24: 549, 36: 499, 48: 449 },
            coreFeatures: [
                { label: '100 websites', on: true },
                { label: 'Free AI website builder', on: true },
                { label: 'Free AI credits', on: true },
                { label: '150 GB NVMe storage', on: true },
                { label: 'Free domain for 1 year', on: true },
                { label: '150 email accounts', on: true, tag: 'FREE' },
                { label: 'WordPress ready', on: true },
                { label: 'Free SSL for every website', on: true },
                { label: '40 Node.js web apps', on: true, tag: 'NEW' },
            ],
            extraFeatures: [
                'Free email marketer tool',
                'Built-in WP staging',
                'LiteSpeed Server + CDN',
                'Free website migration',
                'India server location',
                'Daily backups',
                'Instant malware cleanup',
                '24/7 priority expert support',
            ],
            sections: [
                {
                    title: 'Managed WordPress',
                    items: [
                        { label: '1-Click WP install', on: true },
                        { label: 'WP-CLI + SSH', on: true },
                        { label: 'Auto-updates + security scanner', on: true },
                        { label: 'Object caching', on: true },
                        { label: 'WordPress multisite', on: true },
                        { label: 'WooCommerce ready', on: true },
                    ],
                },
                {
                    title: 'Developer Tools',
                    items: [
                        { label: 'Node.js, Python, Django', on: true },
                        { label: 'Laravel, CodeIgniter, PHP', on: true },
                        { label: 'SSH + GIT access', on: true },
                    ],
                },
                {
                    title: 'Technical Specs',
                    items: [
                        '30,00,000 files & directories (inodes)',
                        '300 PHP workers',
                        '~5,00,000 visits monthly',
                        '500 subdomains',
                        '150 MySQL max user connections',
                        'Unlimited databases',
                        'Unlimited FTP accounts & cronjobs',
                        'Multiple PHP versions',
                        'cPanel + 1-click installer',
                        '6 GB RAM, 6 CPU cores',
                        '50 MBPS IO limit',
                    ],
                },
                {
                    title: 'AI tools included',
                    items: [
                        { label: 'AI image & content generator', on: true },
                        { label: 'AI blog generator', on: true },
                    ],
                },
                {
                    title: 'Security Suite',
                    items: [
                        { label: 'Web application firewall', on: true },
                        { label: 'Enhanced DDoS protection', on: true },
                        { label: 'Secure access manager', on: true },
                        { label: 'Anycast nameservers', on: true },
                    ],
                },
                {
                    title: 'Support & Policies',
                    items: [
                        '24/7 priority expert support',
                        '30-day money-back guarantee',
                        '99.9% uptime guarantee',
                    ],
                },
            ],
        },
    ];

    const SUPPORTED_DURATIONS = [12, 24, 36, 48];

    let currentDuration = 48;

    function priceFor(plan, months) {
        const m = plan.durations[months] || plan.durations[48];
        const list = plan.listPrice;
        const total = m * months;
        const discountPct = Math.max(0, Math.round((1 - m / list) * 100));
        return { monthly: m, list, total, discountPct };
    }

    function cheapestPlanAt(months) {
        return PLAN_DATA.reduce((cheapest, plan) => {
            const p = priceFor(plan, months);
            if (!cheapest || p.monthly < cheapest.price.monthly) return { plan, price: p };
            return cheapest;
        }, null);
    }

    // ─────────────────────────────────────────────
    // 2. Plan card rendering
    // ─────────────────────────────────────────────

    function liFeature(feature) {
        const off = typeof feature === 'object' && feature.on === false;
        const label = typeof feature === 'string' ? feature : feature.label;
        const tag = typeof feature === 'object' && feature.tag
            ? ` <span class="${feature.tag === 'NEW' ? 'badge-new' : ''}">${feature.tag}</span>`
            : '';
        return `<li${off ? ' class="disabled"' : ''}>${label}${tag}</li>`;
    }

    function renderAccordionSection(section, idx, planId) {
        const headerId = `acc-h-${planId}-${idx}`;
        const panelId = `acc-p-${planId}-${idx}`;
        return `
            <div class="accordion-item">
                <button type="button" class="accordion-header" id="${headerId}" aria-expanded="false" aria-controls="${panelId}">
                    <span>${section.title}</span>
                    <i class="fas fa-plus" aria-hidden="true"></i>
                </button>
                <ul class="sub-features" id="${panelId}" role="region" aria-labelledby="${headerId}">
                    ${section.items.map(liFeature).join('')}
                </ul>
            </div>`;
    }

    function renderPlanCard(plan) {
        const p = priceFor(plan, currentDuration);
        const isPopular = plan.popular;
        const ctaClass = plan.ctaStyle === 'primary' ? 'btn-mw-primary' : 'btn-outline-blue';
        const extrasId = `extras-${plan.id}`;
        const seeAllId = `seeall-${plan.id}`;

        return `
        <article class="mw-pricing-card${isPopular ? ' popular' : ''}" data-plan-id="${plan.id}">
            ${isPopular ? '<div class="popular-badge">MOST POPULAR</div>' : ''}
            <div class="card-header">
                <h3>${plan.name}</h3>
                <p>${plan.blurb}</p>
                <div class="discount-row">
                    <span class="badge-orange" data-discount>${p.discountPct}% OFF</span>
                    <span class="old-price" data-old-price>₹${p.list}</span>
                </div>
                <div class="price">₹<span class="price-value" data-price-monthly>${p.monthly}</span><span class="price-mo">/mo</span></div>
                <p class="pay-today" data-pay-today>For ${currentDuration} months, you pay ${fmtINR(p.total)} today — same price at renewal.</p>
                <p class="card-gst-note"><i class="fas fa-info-circle" aria-hidden="true"></i> + 18% GST at checkout</p>
                ${plan.bonusMonths ? `
                <div class="deal-row">
                    <span class="plus-mo">+${plan.bonusMonths} mo free<span class="tooltip">Pay for ${currentDuration} months — use for ${currentDuration + plan.bonusMonths} months.</span></span>
                    ${isPopular ? '<span class="limited-deal">Limited-Time Deal</span>' : ''}
                </div>` : ''}
            </div>
            <button type="button" class="btn ${ctaClass}" data-plan-cta data-plan-id="${plan.id}" data-fraylon-action="select-plan">${plan.ctaLabel}</button>
            <div class="renewal-guarantee">Same Price at Renewal — Guaranteed</div>
            <ul class="card-features">
                ${plan.coreFeatures.map(f => {
                    const off = f.on === false;
                    const tag = f.tag ? ` <span${f.tag === 'NEW' ? ' class="badge-new"' : ''}>${f.tag}</span>` : '';
                    return `<li${off ? ' class="disabled"' : ''}>${f.label}${tag}</li>`;
                }).join('')}
            </ul>
            <div class="mw-extra-features" id="${extrasId}" aria-hidden="true">
                <ul class="card-features">
                    ${plan.extraFeatures.map(liFeature).join('')}
                </ul>
                <div class="card-accordions">
                    ${plan.sections.map((s, i) => renderAccordionSection(s, i, plan.id)).join('')}
                </div>
            </div>
            <button type="button" class="see-all" id="${seeAllId}" aria-expanded="false" aria-controls="${extrasId}">
                <span class="see-all-label">Show features</span>
                <i class="fas fa-chevron-down" aria-hidden="true"></i>
            </button>
        </article>`;
    }

    function renderPlans() {
        const grid = $('#plansGrid');
        if (!grid) return;
        grid.setAttribute('aria-busy', 'true');
        grid.innerHTML = PLAN_DATA.map(renderPlanCard).join('');
        grid.setAttribute('aria-busy', 'false');
        wirePlanInteractions();
        updateHeroAndStickyPrice();
        applyRevealToNewNodes();
    }

    function updatePlanPrices() {
        $$('.mw-pricing-card').forEach(card => {
            const id = card.dataset.planId;
            const plan = PLAN_DATA.find(p => p.id === id);
            if (!plan) return;
            const p = priceFor(plan, currentDuration);
            const priceEl = card.querySelector('[data-price-monthly]');
            const oldEl = card.querySelector('[data-old-price]');
            const discountEl = card.querySelector('[data-discount]');
            const payEl = card.querySelector('[data-pay-today]');
            const tooltipEl = card.querySelector('.plus-mo .tooltip');
            if (priceEl) priceEl.textContent = p.monthly;
            if (oldEl) oldEl.textContent = '₹' + p.list;
            if (discountEl) discountEl.textContent = p.discountPct + '% OFF';
            if (payEl) payEl.textContent = `For ${currentDuration} months, you pay ${fmtINR(p.total)} today — same price at renewal.`;
            if (tooltipEl && plan.bonusMonths) tooltipEl.textContent = `Pay for ${currentDuration} months — use for ${currentDuration + plan.bonusMonths} months.`;
        });
        updateHeroAndStickyPrice();
    }

    function updateHeroAndStickyPrice() {
        const cheapest = cheapestPlanAt(currentDuration);
        if (!cheapest) return;
        const { plan, price } = cheapest;
        const heroV = $('#heroPriceValue');
        const heroDur = $('#heroDurationLabel');
        const heroTotal = $('#heroTotalLabel');
        if (heroV) heroV.textContent = price.monthly;
        if (heroDur) heroDur.textContent = `${currentDuration} mo`;
        if (heroTotal) heroTotal.textContent = fmtINR(price.total);
        // Expose for any consumer
        window.fraylonCheapest = { planId: plan.id, ...price, durationMonths: currentDuration };
    }

    // ─────────────────────────────────────────────
    // 3. Per-card interactions (show/hide, accordion, CTA)
    // ─────────────────────────────────────────────

    function wirePlanInteractions() {
        $$('.see-all').forEach(btn => {
            const target = $('#' + btn.getAttribute('aria-controls'));
            if (!target) return;
            // Initialize collapsed
            target.style.maxHeight = '0px';
            target.style.overflow = 'hidden';

            btn.addEventListener('click', () => {
                const expanded = btn.getAttribute('aria-expanded') === 'true';
                // Toggle this one
                setExtrasOpen(btn, target, !expanded);
            });
        });

        $$('.accordion-header').forEach(header => {
            const panel = $('#' + header.getAttribute('aria-controls'));
            const icon = header.querySelector('i');
            if (!panel) return;
            panel.style.maxHeight = '0px';
            panel.style.overflow = 'hidden';

            const toggle = () => {
                const expanded = header.getAttribute('aria-expanded') === 'true';
                header.setAttribute('aria-expanded', String(!expanded));
                if (!expanded) {
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                    if (icon) icon.className = 'fas fa-minus';
                } else {
                    panel.style.maxHeight = '0px';
                    if (icon) icon.className = 'fas fa-plus';
                }
                bubbleResizeUp(panel);
            };
            header.addEventListener('click', toggle);
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
            });
        });

        $$('[data-plan-cta]').forEach(btn => {
            btn.addEventListener('click', () => {
                // Natural navigation to the cart page — never launch Razorpay
                // directly from the plan CTA. cart.html collects details and
                // starts checkout itself via cart.js → payment.js.
                const id = btn.dataset.planId;
                window.location.href = `cart.html?plan=${encodeURIComponent(id)}&duration=${currentDuration}`;
            });
        });
    }

    function setExtrasOpen(btn, target, open) {
        btn.setAttribute('aria-expanded', String(open));
        target.setAttribute('aria-hidden', String(!open));
        const labelEl = btn.querySelector('.see-all-label');
        const icon = btn.querySelector('i');
        if (open) {
            target.style.maxHeight = target.scrollHeight + 'px';
            if (labelEl) labelEl.textContent = 'Hide features';
            if (icon) icon.className = 'fas fa-chevron-up';
        } else {
            target.style.maxHeight = '0px';
            if (labelEl) labelEl.textContent = 'Show features';
            if (icon) icon.className = 'fas fa-chevron-down';
        }
    }

    function bubbleResizeUp(panel) {
        // When a nested accordion changes size, recompute the enclosing extras region height
        const extras = panel.closest('.mw-extra-features');
        if (extras && extras.getAttribute('aria-hidden') === 'false') {
            // Wait one frame so children settle, then recompute
            requestAnimationFrame(() => {
                extras.style.maxHeight = extras.scrollHeight + 'px';
            });
        }
    }

    // ─────────────────────────────────────────────
    // 4. Countdown timer (persistent across reloads)
    // ─────────────────────────────────────────────

    function initCountdown() {
        const el = $('#timer');
        const bar = $('#topOfferBar');
        if (!el) return;

        const STORAGE_KEY = 'fraylon_offer_ends_at';
        const DURATION_MS = 12 * 60 * 60 * 1000 + 44 * 60 * 1000 + 45 * 1000; // 12h 44m 45s default
        const stored = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
        let endsAt = stored;
        if (!endsAt || endsAt < Date.now()) {
            endsAt = Date.now() + DURATION_MS;
            localStorage.setItem(STORAGE_KEY, String(endsAt));
        }

        function tick() {
            const remaining = endsAt - Date.now();
            if (remaining <= 0) {
                el.textContent = 'Offer ended';
                bar?.classList.add('offer-ended');
                clearInterval(handle);
                // Hide the bar after a moment so it doesn't shout
                setTimeout(() => { if (bar) bar.style.display = 'none'; }, 4000);
                return;
            }
            const h = Math.floor(remaining / 3600000);
            const m = Math.floor((remaining % 3600000) / 60000);
            const s = Math.floor((remaining % 60000) / 1000);
            el.textContent = `${h}H ${String(m).padStart(2, '0')}M ${String(s).padStart(2, '0')}S`;
        }
        tick();
        const handle = setInterval(tick, 1000);
    }

    // ─────────────────────────────────────────────
    // 5. FAQ (data + ARIA buttons)
    // ─────────────────────────────────────────────

    const FAQ_DATA = [
        { q: 'Is Fraylon Hosting an Indian company?', a: 'Yes, Fraylon Hosting is an Indian web hosting company incorporated in December 2025, headquartered in Hyderabad, Telangana. We provide affordable and reliable hosting solutions to businesses across India and worldwide.' },
        { q: 'What features do I get with web hosting?', a: 'With Fraylon Hosting web hosting, you get NVMe SSD storage, free SSL certificate, free domain, LiteSpeed web servers, cPanel control panel, one-click WordPress installation, daily backups, and 24/7 expert support.' },
        { q: 'How is Fraylon Hosting technical support?', a: 'Fraylon Hosting provides 24/7 technical support via live chat and email. Our expert support team is always ready to help you resolve any issues quickly and efficiently.' },
        { q: 'Can I migrate my website to Fraylon Hosting?', a: 'Yes — Fraylon Hosting offers free website migration. Our experts will migrate your website from your existing host to Fraylon without downtime and at no extra cost.' },
        { q: 'Why choose Fraylon Hosting?', a: 'Fraylon combines performance, price, and support: 99.9% uptime guarantee, LiteSpeed servers, free SSL, free migration and 24/7 expert humans — without renewal surprises.' },
        { q: 'Can I upgrade my web hosting plan later?', a: 'Absolutely. You can upgrade your hosting plan at any time as your website grows — from shared hosting to VPS or dedicated servers with zero downtime.' },
    ];

    function renderFaq() {
        const list = $('#faqList');
        if (!list) return;
        list.innerHTML = FAQ_DATA.map((item, idx) => {
            const qid = `faq-q-${idx}`;
            const aid = `faq-a-${idx}`;
            return `
            <div class="faq-item">
                <button type="button" class="faq-question" id="${qid}" aria-expanded="false" aria-controls="${aid}">
                    <span>${item.q}</span>
                    <i class="fas fa-chevron-down faq-icon" aria-hidden="true"></i>
                </button>
                <div class="faq-answer" id="${aid}" role="region" aria-labelledby="${qid}">
                    <p>${item.a}</p>
                </div>
            </div>`;
        }).join('');
        wireFaq();
    }

    function wireFaq() {
        const buttons = $$('#faqList .faq-question');
        buttons.forEach((btn, i) => {
            const panel = $('#' + btn.getAttribute('aria-controls'));
            btn.addEventListener('click', () => toggleFaq(btn));
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFaq(btn); return; }
                if (e.key === 'ArrowDown') { e.preventDefault(); buttons[(i + 1) % buttons.length].focus(); }
                if (e.key === 'ArrowUp') { e.preventDefault(); buttons[(i - 1 + buttons.length) % buttons.length].focus(); }
                if (e.key === 'Home') { e.preventDefault(); buttons[0].focus(); }
                if (e.key === 'End') { e.preventDefault(); buttons[buttons.length - 1].focus(); }
            });
        });
    }

    function toggleFaq(btn) {
        const open = btn.getAttribute('aria-expanded') === 'true';
        // Collapse all
        $$('#faqList .faq-question').forEach(b => {
            b.setAttribute('aria-expanded', 'false');
            b.parentElement.classList.remove('open');
        });
        if (!open) {
            btn.setAttribute('aria-expanded', 'true');
            btn.parentElement.classList.add('open');
        }
    }
    // Back-compat: web-hosting.html still calls window.toggleFaq(buttonOrEl)
    window.toggleFaq = function (el) {
        const btn = el?.classList?.contains('faq-question') ? el : el?.querySelector?.('.faq-question');
        if (btn) toggleFaq(btn);
    };

    // ─────────────────────────────────────────────
    // 6. Duration dropdown
    // ─────────────────────────────────────────────

    function initDurationDropdown() {
        const root = $('#durationDropdown');
        if (!root) return;
        const selected = root.querySelector('.dropdown-selected');
        const optionsContainer = root.querySelector('.dropdown-options');
        const options = $$('.option', optionsContainer);
        const label = root.querySelector('.selected-text');

        const open = () => { root.classList.add('active'); root.setAttribute('aria-expanded', 'true'); };
        const close = () => { root.classList.remove('active'); root.setAttribute('aria-expanded', 'false'); };

        selected.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = root.classList.contains('active');
            isOpen ? close() : open();
        });
        root.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); root.classList.contains('active') ? close() : open(); }
            if (e.key === 'Escape') { close(); selected.focus(); }
        });
        options.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                selectDuration(parseInt(opt.dataset.value, 10), opt);
            });
            opt.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectDuration(parseInt(opt.dataset.value, 10), opt); }
            });
        });
        document.addEventListener('click', (e) => {
            if (!root.contains(e.target)) close();
        });

        function selectDuration(months, optEl) {
            if (!SUPPORTED_DURATIONS.includes(months)) return;
            currentDuration = months;
            options.forEach(o => { o.classList.remove('selected'); o.setAttribute('aria-selected', 'false'); });
            optEl.classList.add('selected');
            optEl.setAttribute('aria-selected', 'true');
            label.textContent = `${months} months`;
            close();
            updatePlanPrices();
            window.fraylonHooks.onDurationChange(months);
        }
    }

    // ─────────────────────────────────────────────
    // 7. Sticky header + active section + smooth scroll
    // ─────────────────────────────────────────────

    function initStickyHeader() {
        const header = $('#siteHeader');
        if (!header) return;
        const onScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 8);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    function initSmoothScroll() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-scroll], a[href^="#"]');
            if (!link) return;
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#') || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const headerH = ($('#siteHeader')?.offsetHeight || 0) + 8;
            const y = target.getBoundingClientRect().top + window.scrollY - headerH;
            window.scrollTo({ top: y, behavior: 'smooth' });
            // Close mobile nav if open
            closeMobileNav();
        });
    }

    function initActiveSection() {
        const sectionIds = ['plans-section', 'faq', 'contact'];
        const sections = sectionIds.map(id => $('#' + id)).filter(Boolean);
        if (!sections.length) return;
        const navLinks = $$('a[data-nav-section]');
        const setActive = (id) => {
            navLinks.forEach(l => {
                l.classList.toggle('is-active', l.dataset.navSection === id);
            });
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
        sections.forEach(s => observer.observe(s));
    }

    // ─────────────────────────────────────────────
    // 8. Mobile nav (hamburger + submenu + close-on-route)
    // ─────────────────────────────────────────────

    function initMobileNav() {
        const btn = $('#hamburgerBtn');
        const drawer = $('#mobileNav');
        const overlay = $('#mobileOverlay');
        const closeBtn = $('#mobileClose');
        if (!btn || !drawer || !overlay) return;

        const open = () => {
            drawer.classList.add('open');
            overlay.classList.add('open');
            btn.classList.add('is-open');
            btn.setAttribute('aria-expanded', 'true');
            drawer.setAttribute('aria-hidden', 'false');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            // Focus first interactive
            setTimeout(() => closeBtn?.focus(), 80);
        };
        const close = () => {
            drawer.classList.remove('open');
            overlay.classList.remove('open');
            btn.classList.remove('is-open');
            btn.setAttribute('aria-expanded', 'false');
            drawer.setAttribute('aria-hidden', 'true');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            // Shift focus back to the hamburger button so it doesn't get trapped in a hidden drawer
            setTimeout(() => btn.focus(), 50);
        };
        window.__fraylonCloseMobileNav = close;

        btn.addEventListener('click', open);
        closeBtn?.addEventListener('click', close);
        overlay.addEventListener('click', close);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && drawer.classList.contains('open')) close();
        });

        // Submenu toggles
        $$('.mw-mobile-sub-toggle', drawer).forEach(t => {
            t.addEventListener('click', () => {
                const expanded = t.getAttribute('aria-expanded') === 'true';
                t.setAttribute('aria-expanded', String(!expanded));
                t.parentElement.classList.toggle('open', !expanded);
            });
        });
    }
    function closeMobileNav() { if (typeof window.__fraylonCloseMobileNav === 'function') window.__fraylonCloseMobileNav(); }

    // ─────────────────────────────────────────────
    // 9. Modals (account, migration, contact)
    // ─────────────────────────────────────────────

    let lastFocusedBeforeModal = null;

    function openModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        closeMobileNav();
        lastFocusedBeforeModal = document.activeElement;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        const focusable = modal.querySelector('input, select, textarea, button:not([data-close-modal])');
        setTimeout(() => focusable?.focus(), 60);
        modal.addEventListener('keydown', trapFocus);
    }
    function closeModal(modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        modal.removeEventListener('keydown', trapFocus);
        lastFocusedBeforeModal?.focus?.();
    }
    function trapFocus(e) {
        if (e.key !== 'Tab' && e.key !== 'Escape') return;
        const modal = e.currentTarget;
        if (e.key === 'Escape') { e.preventDefault(); closeModal(modal); return; }
        const focusables = Array.from(modal.querySelectorAll('a, button, input, select, textarea')).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    function initModals() {
        document.addEventListener('click', (e) => {
            const opener = e.target.closest('[data-open-modal]');
            if (opener) {
                e.preventDefault();
                openModal(opener.dataset.openModal);
                return;
            }
            const closer = e.target.closest('[data-close-modal]');
            if (closer) {
                const modal = closer.closest('.mw-modal-root');
                if (modal) closeModal(modal);
            }
        });
    }

    // ─────────────────────────────────────────────
    // 10. Forms + toast
    // ─────────────────────────────────────────────

    function showToast(msg, kind = 'info') {
        const toast = $('#toast');
        if (!toast) { console.log('[fraylon toast]', kind, msg); return; }
        toast.textContent = msg;
        toast.className = 'mw-toast show ' + kind;
        clearTimeout(toast._t);
        toast._t = setTimeout(() => toast.classList.remove('show'), 3600);
    }

    function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

    function attachFormHandler(form, onSubmit, statusEl) {
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(form).entries());
            const result = onSubmit(data);
            if (result.error) {
                if (statusEl) { statusEl.textContent = result.error; statusEl.className = 'form-status error'; }
                showToast(result.error, 'error');
                return;
            }
            if (statusEl) { statusEl.textContent = result.success || 'Done.'; statusEl.className = 'form-status success'; }
            showToast(result.success || 'Done.', 'success');
            form.reset();
            const modal = form.closest('.mw-modal-root');
            if (modal) setTimeout(() => closeModal(modal), 1100);
        });
    }

    function initForms() {
        attachFormHandler($('#accountForm'), (data) => {
            if (!isEmail(data.email)) return { error: 'Please enter a valid email address.' };
            if (!data.password || data.password.length < 4) return { error: 'Please enter your password.' };
            const ok = window.fraylonHooks.onLogin(data);
            return { success: ok || 'Welcome back! Routing you to your dashboard…' };
        }, $('#accountFormStatus'));

        attachFormHandler($('#migrationForm'), (data) => {
            if (!data.name) return { error: 'Please tell us your name.' };
            if (!isEmail(data.email)) return { error: 'Please enter a valid email.' };
            if (!data.domain) return { error: 'Please add the domain you want to migrate.' };
            const ok = window.fraylonHooks.onStartMigration(data);
            return { success: ok || 'Migration request received — we\'ll email you within an hour.' };
        }, $('#migrationFormStatus'));

        attachFormHandler($('#contactForm'), (data) => {
            if (!data.name) return { error: 'Please tell us your name.' };
            if (!isEmail(data.email)) return { error: 'Please enter a valid email.' };
            if (!data.message || data.message.trim().length < 8) return { error: 'A few more details would help us help you.' };
            const ok = window.fraylonHooks.onSubmitContact(data);
            return { success: ok || 'Message sent. We\'ll reply within one business hour.' };
        }, $('#contactFormStatus'));

        attachFormHandler($('#quickContactForm'), (data) => {
            if (!isEmail(data.email)) return { error: 'Please enter a valid email.' };
            if (!data.message || data.message.trim().length < 4) return { error: 'What can we help with?' };
            const ok = window.fraylonHooks.onSubmitContact({ ...data, source: 'chat-modal' });
            return { success: ok || 'Sent — a human will reply shortly.' };
        }, $('#quickContactStatus'));
    }

    // ─────────────────────────────────────────────
    // 11. Mobile carousel for stack cards (Everything you need...)
    // ─────────────────────────────────────────────

    function initMobileStackCardsCarousel() {
        const container = $('.cards-stack-container');
        const section = $('.mw-parallax-cards-section');
        if (!container || !section) return;

        const controls = section.querySelector('.mw-stack-controls');
        const dotsHost = section.querySelector('.mw-stack-dots');
        const prevBtn = section.querySelector('[data-stack-nav="prev"]');
        const nextBtn = section.querySelector('[data-stack-nav="next"]');
        const cards = $$('.stack-card', container);
        if (!controls || !dotsHost || cards.length < 2) return;

        const mq = window.matchMedia('(max-width: 768px)');
        let dots = [];

        const cardStep = () => {
            const first = cards[0]?.getBoundingClientRect();
            const second = cards[1]?.getBoundingClientRect();
            if (!first) return 320;
            if (second) return Math.max(280, Math.round(second.left - first.left));
            return Math.max(280, Math.round(first.width) + 16);
        };

        const setActive = (idx) => {
            dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
        };

        const activeIndexFromScroll = () => {
            const left = container.scrollLeft;
            const step = cardStep();
            return Math.max(0, Math.min(cards.length - 1, Math.round(left / step)));
        };

        const rebuildDots = () => {
            dotsHost.innerHTML = '';
            dots = cards.map((_, i) => {
                const d = document.createElement('span');
                d.className = 'dot' + (i === 0 ? ' is-active' : '');
                dotsHost.appendChild(d);
                return d;
            });
        };

        const scrollToIndex = (idx) => {
            const step = cardStep();
            container.scrollTo({ left: idx * step, behavior: 'smooth' });
        };

        const onScroll = () => setActive(activeIndexFromScroll());

        const enable = () => {
            controls.style.display = '';
            rebuildDots();
            container.addEventListener('scroll', onScroll, { passive: true });
            prevBtn?.addEventListener('click', () => scrollToIndex(Math.max(0, activeIndexFromScroll() - 1)));
            nextBtn?.addEventListener('click', () => scrollToIndex(Math.min(cards.length - 1, activeIndexFromScroll() + 1)));
            onScroll();
        };

        const disable = () => {
            controls.style.display = 'none';
            dotsHost.innerHTML = '';
            container.removeEventListener('scroll', onScroll);
        };

        const sync = () => {
            if (mq.matches) enable();
            else disable();
        };

        sync();
        mq.addEventListener?.('change', sync);
    }

    // ─────────────────────────────────────────────
    // 12. Scroll-reveal (preserved from previous version)
    // ─────────────────────────────────────────────

    let revealObserver;
    function initReveal() {
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('mw-visible');
                    revealObserver.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
        applyRevealToNewNodes();
    }
    function applyRevealToNewNodes() {
        if (!revealObserver) return;
        const targets = $$(
            '.mw-pricing-card, .guarantee-card, .testimonial-card, .why-feature-item, .why-grid-item, .faq-item, .support-card, .feature-card, .parallax-card, .mw-hero-text, .mw-hero-visual'
        );
        const delays = ['', 'mw-reveal-d1', 'mw-reveal-d2', 'mw-reveal-d3'];
        targets.forEach((el, i) => {
            if (el.classList.contains('mw-reveal')) return;
            el.classList.add('mw-reveal');
            const d = delays[i % 4];
            if (d) el.classList.add(d);
            revealObserver.observe(el);
        });
    }

    // ─────────────────────────────────────────────
    // 13. Testimonial slider (preserved)
    // ─────────────────────────────────────────────

    function initTestimonialSlider() {
        const track = $('.testimonial-track');
        if (!track) return;
        const cards = $$('.testimonial-card', track);
        if (!cards.length) return;
        const prev = $('.slider-nav .nav-btn:first-child');
        const next = $('.slider-nav .nav-btn:last-child');
        let i = 0;
        const update = () => { track.style.transform = `translateX(${i * -100}%)`; };
        next?.addEventListener('click', () => { i = (i + 1) % cards.length; update(); });
        prev?.addEventListener('click', () => { i = (i - 1 + cards.length) % cards.length; update(); });
    }

    // ─────────────────────────────────────────────
    // 14. Audience carousel (used by web-hosting.html — preserved)
    // ─────────────────────────────────────────────

    window.scrollAudience = function (direction) {
        const grid = document.getElementById('audienceGrid');
        if (!grid) return;
        const card = grid.querySelector('.audience-card');
        const step = card ? card.getBoundingClientRect().width + 24 : 320;
        grid.scrollBy({ left: direction * step, behavior: 'smooth' });
    };

    // ─────────────────────────────────────────────
    // 15. Integration hooks
    // ─────────────────────────────────────────────

    /**
     * Back-end-ready hooks. Override any of these from product or analytics code:
     *   window.fraylonHooks.onPlanSelect = (planId, months) => { ... }
     * Return a string from a hook to display a custom success message in the UI.
     */
    window.fraylonHooks = window.fraylonHooks || {
        onPlanSelect(planId, months) {
            console.log('[fraylon] onPlanSelect', planId, months);
            // Route through the cart page — checkout is started from cart.html
            // (cart.js → payment.js), never directly from a plan CTA.
            window.location.href = `cart.html?plan=${encodeURIComponent(planId)}&duration=${months}`;
        },
        onDurationChange(months) {
            console.log('[fraylon] onDurationChange', months);
        },
        onLogin(data) {
            console.log('[fraylon] onLogin', { email: data.email });
            const name = data.email.split('@')[0];
            const cleanName = name.charAt(0).toUpperCase() + name.slice(1);
            localStorage.setItem('fraylon_user', JSON.stringify({ name: cleanName, email: data.email }));
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
            return 'Welcome back! Routing you to your dashboard…';
        },
        onStartMigration(data) {
            console.log('[fraylon] onStartMigration (stub)', data);
            return null;
        },
        onSubmitContact(data) {
            console.log('[fraylon] onSubmitContact (stub)', data);
            return null;
        },
    };

    function initNavbarActiveHighlights() {
        let path = window.location.pathname;
        let page = path.substring(path.lastIndexOf('/') + 1);
        if (!page || page === '') {
            page = 'index.html';
        }

        // Loop through all anchor elements inside the desktop navigation
        $$('.mw-nav-ul a').forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            
            const linkPage = href.split('#')[0].split('?')[0];
            if (linkPage === page) {
                if (link.classList.contains('mega-item')) {
                    link.classList.add('active');
                } else {
                    link.classList.add('is-active');
                }
                
                const parentLi = link.closest('.has-submenu');
                if (parentLi) {
                    parentLi.classList.add('active');
                    const triggerLink = parentLi.querySelector('a');
                    if (triggerLink) triggerLink.classList.add('is-active');
                }
            }
        });
        
        // Loop through mobile nav links too
        $$('.mw-mobile-nav-ul a').forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            const linkPage = href.split('#')[0].split('?')[0];
            if (linkPage === page) {
                link.classList.add('is-active');
                const parentLi = link.closest('.has-sub');
                if (parentLi) {
                    parentLi.classList.add('active');
                    const subToggle = parentLi.querySelector('.mw-mobile-sub-toggle');
                    if (subToggle) subToggle.classList.add('is-active');
                }
            }
        });
    }

    function initCustomPageHandlers() {
        // Domain search handler
        const domainBtn = $('#domainSearchBtn');
        const domainInput = $('#domainSearchInput');
        const domainResult = $('#domainSearchResult');
        if (domainBtn && domainInput && domainResult) {
            domainBtn.addEventListener('click', () => {
                const val = domainInput.value.trim();
                if (!val) {
                    domainResult.textContent = 'Please enter a domain name to search.';
                    domainResult.style.color = '#ef4444';
                    return;
                }
                const clean = val.toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
                domainResult.style.color = '#38bdf8';
                domainResult.textContent = `Searching availability for ${clean}...`;
                setTimeout(() => {
                    domainResult.style.color = '#4ade80';
                    domainResult.innerHTML = `<i class="fas fa-check-circle"></i> <strong>${clean}</strong> is available for instant registration at ₹399/yr! <a href="cart.html?domain=${encodeURIComponent(clean)}" class="btn btn-mw-primary btn-sm ml-3">Register Now</a>`;
                }, 800);
            });
        }

        // Signup form handler
        const signupForm = $('#signupPageForm');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const nameInput = $('#suName');
                const emailInput = $('#suEmail');
                const name = nameInput ? nameInput.value.trim() : 'Customer';
                const email = emailInput ? emailInput.value.trim() : 'user@company.com';
                
                const btn = signupForm.querySelector('button[type="submit"]');
                if (btn) btn.textContent = 'Creating Account...';
                setTimeout(() => {
                    localStorage.setItem('fraylon_user', JSON.stringify({ name, email }));
                    showToast('Account created successfully! Welcome to Fraylon.');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                }, 1000);
            });
        }

        // Forgot password form handler
        const fpForm = $('#forgotPassForm');
        const fpStatus = $('#fpStatus');
        if (fpForm && fpStatus) {
            fpForm.addEventListener('submit', (e) => {
                e.preventDefault();
                fpStatus.textContent = 'Sending password reset email...';
                setTimeout(() => {
                    fpStatus.textContent = 'Reset link has been sent to your email address. Please check your inbox.';
                }, 1000);
            });
        }

        // Tutorials coming soon notification handler
        const notifyBtn = $('#tutorialNotifyBtn');
        const notifyInput = $('#tutorialNotifyInput');
        const notifyStatus = $('#tutorialNotifyStatus');
        if (notifyBtn && notifyInput && notifyStatus) {
            notifyBtn.addEventListener('click', () => {
                const val = notifyInput.value.trim();
                if (!val || !val.includes('@')) {
                    notifyStatus.style.color = '#ef4444';
                    notifyStatus.textContent = 'Please enter a valid email address.';
                    return;
                }
                notifyStatus.style.color = '#4ade80';
                notifyStatus.textContent = 'Saving email...';
                setTimeout(() => {
                    notifyStatus.textContent = 'Thank you! We will notify you once our video tutorials are live.';
                    notifyInput.value = '';
                }, 800);
            });
        }
    }

    function checkAuthSession() {
        const userStr = localStorage.getItem('fraylon_user');
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1);
        
        // Trigger login modal if query parameter ?login=1 is present
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('login') === '1') {
            setTimeout(() => openModal('accountModal'), 400);
        }
        
        if (userStr) {
            let userObj = null;
            try {
                userObj = JSON.parse(userStr);
            } catch (e) {
                console.error('[auth] Failed to parse user session:', e);
            }
            
            if (userObj && userObj.email) {
                // Change "My Account" buttons to Dashboard
                const accountBtns = $$('[data-fraylon-action="open-account"], [data-open-modal="accountModal"], .btn-outline-account, .mw-mobile-cta');
                accountBtns.forEach(btn => {
                    if (btn.textContent.trim().toLowerCase() === 'my account') {
                        btn.textContent = 'Dashboard';
                    }
                    btn.removeAttribute('data-open-modal');
                    btn.removeAttribute('data-fraylon-action');
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.location.href = 'dashboard.html';
                    });
                });
                
                // Populate Dashboard portal header details if on dashboard page
                if (page === 'dashboard.html') {
                    const hAvatar = $('#dbHeaderAvatar');
                    const hName = $('#dbHeaderName');
                    const hSignOut = $('#dbHeaderSignOutBtn');
                    
                    if (hAvatar && userObj.name) hAvatar.textContent = userObj.name.charAt(0).toUpperCase();
                    if (hName) hName.textContent = userObj.name;
                    if (hSignOut) {
                        hSignOut.addEventListener('click', () => {
                            localStorage.removeItem('fraylon_user');
                            showToast('Signed out successfully.', 'info');
                            setTimeout(() => {
                                window.location.href = 'index.html';
                            }, 1000);
                        });
                    }
                }
                
                if (page === 'signup.html' || page === 'forgot-password.html') {
                    window.location.href = 'dashboard.html';
                }
                
                if (page === 'dashboard.html') {
                    populateDashboard(userObj);
                }
            }
        } else {
            if (page === 'dashboard.html') {
                window.location.href = 'index.html?login=1';
            }
        }
    }

    function populateDashboard(user) {
        const nameEl = $('#dbUserName');
        const emailEl = $('#dbUserEmail');
        const welcomeEl = $('#dbWelcomeName');
        const avatarEl = $('#dbAvatar');
        
        if (nameEl) nameEl.textContent = user.name;
        if (emailEl) emailEl.textContent = user.email;
        if (welcomeEl) welcomeEl.textContent = user.name;
        if (avatarEl && user.name) avatarEl.textContent = user.name.charAt(0).toUpperCase();
        
        const tabs = $$('.db-tab-btn');
        const contents = $$('.db-tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                contents.forEach(c => {
                    c.style.display = c.id === `tab-${target}` ? 'block' : 'none';
                });
                if (target === 'billing') {
                    fetchBillingInvoices(user.email);
                }
            });
        });
        
        const signOutBtn = $('#dbSignOutBtn');
        if (signOutBtn) {
            signOutBtn.addEventListener('click', () => {
                localStorage.removeItem('fraylon_user');
                showToast('Signed out successfully.', 'info');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            });
        }

        // Fetch real purchases from database to show real details OR empty states
        fetchDashboardServices(user);
        
        const ticketForm = $('#dbTicketForm');
        const ticketStatus = $('#dbTicketStatus');
        if (ticketForm && ticketStatus) {
            ticketForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const subj = $('#tSubject');
                const msg = $('#tMessage');
                if (!subj.value.trim() || !msg.value.trim()) {
                    ticketStatus.style.color = '#ef4444';
                    ticketStatus.textContent = 'Please fill out all fields.';
                    return;
                }
                ticketStatus.style.color = '#10b981';
                ticketStatus.textContent = 'Submitting support ticket...';
                setTimeout(() => {
                    ticketStatus.textContent = 'Support ticket submitted successfully! A systems engineer will respond shortly.';
                    subj.value = '';
                    msg.value = '';
                }, 1000);
            });
        }
    }

    function wireDomainSearchElements() {
        const searchBtn = $('#dbDomainSearchBtn');
        const searchInput = $('#dbDomainSearchInput');
        const searchResult = $('#dbDomainSearchResult');
        if (searchBtn && searchInput && searchResult) {
            const newBtn = searchBtn.cloneNode(true);
            searchBtn.parentNode.replaceChild(newBtn, searchBtn);
            
            newBtn.addEventListener('click', () => {
                const val = searchInput.value.trim();
                if (!val) {
                    searchResult.textContent = 'Please enter a domain name.';
                    searchResult.style.color = '#ef4444';
                    return;
                }
                const clean = val.toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
                searchResult.style.color = '#146ef5';
                searchResult.textContent = `Checking availability for ${clean}...`;
                setTimeout(() => {
                    searchResult.style.color = '#10b981';
                    searchResult.innerHTML = `<i class="fas fa-check-circle"></i> <strong>${clean}</strong> is available! <a href="cart.html?domain=${encodeURIComponent(clean)}" class="btn btn-mw-primary btn-sm ml-3">Register</a>`;
                }, 800);
            });
        }
    }

    function wireCpanelSsoHandlers() {
        const btns = $$('.btn-cpanel-sso');
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                showCpanelSsoOverlay();
            });
        });
    }

    function showCpanelSsoOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'cpanelSsoOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #0f172a;
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            font-family: inherit;
            transition: all 0.3s ease;
        `;
        
        overlay.innerHTML = `
            <div style="text-align: center;">
                <div style="width: 50px; height: 50px; border: 4px solid rgba(255,255,255,0.1); border-top-color: #ff6c2c; border-radius: 50%; animation: spinSso 1s linear infinite; margin: 0 auto 24px;"></div>
                <h3 style="color: white; margin: 0 0 8px; font-size: 20px; font-weight:700;">cPanel Single Sign-On</h3>
                <p id="ssoStatusText" style="color: #94a3b8; font-size: 14px; margin: 0;">Securing session handshake...</p>
            </div>
            <style>
                @keyframes spinSso {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        document.body.appendChild(overlay);
        
        const statusText = document.getElementById('ssoStatusText');
        const steps = [
            'Fetching secure SSO tokens from Node.js core...',
            'Validating database authorization keys...',
            'Establishing remote SSH connection handshake...',
            'Redirecting to cPanel Control Panel...'
        ];
        
        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                statusText.textContent = steps[currentStep];
                currentStep++;
            } else {
                clearInterval(interval);
                showMockCpanelScreen();
            }
        }, 600);
    }

    function showMockCpanelScreen() {
        const overlay = document.getElementById('cpanelSsoOverlay');
        if (!overlay) return;
        
        overlay.style.background = '#f3f4f6';
        overlay.style.color = '#1f2937';
        overlay.style.display = 'block';
        overlay.style.overflowY = 'auto';
        overlay.style.padding = '40px 20px';
        
        const userStr = localStorage.getItem('fraylon_user');
        const user = userStr ? JSON.parse(userStr) : { name: 'Customer', email: 'user@company.com' };
        
        overlay.innerHTML = `
            <div style="max-width: 1100px; margin: 0 auto;">
                <header style="background: #ffffff; border-radius: 12px; padding: 20px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 30px;">
                    <div style="display:flex; align-items:center; gap:16px;">
                        <img src="logo.png" alt="Fraylon cPanel" style="height: 28px;">
                        <span style="font-weight: 700; color: #ff6c2c; font-size: 18px; border-left: 2px solid #e5e7eb; padding-left: 16px;">cPanel control panel</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:16px;">
                        <span style="font-size: 14px; color:#4b5563;">Logged in as: <strong style="color:#111827;">${user.name.toLowerCase()}</strong></span>
                        <button type="button" id="closeCpanelBtn" style="background:#ff6c2c; color:white; border:none; padding:8px 16px; border-radius:6px; font-weight:700; font-size:13px; cursor:pointer; margin:0;">Return to Dashboard</button>
                    </div>
                </header>
                
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px; text-align: left; align-items: start;">
                    <div>
                        <div style="background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; margin-bottom: 24px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                            <div style="background: #f9fafb; padding: 12px 20px; border-bottom: 1px solid #e5e7eb; font-weight: 700; color: #374151; font-size: 14px;">FILES</div>
                            <div style="padding: 24px; display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 20px;">
                                <div style="text-align: center; cursor: pointer;" onclick="alert('File Manager: Connecting to remote storage cluster...')">
                                    <i class="fas fa-folder-open" style="font-size: 32px; color: #ff6c2c;"></i>
                                    <div style="font-size: 12px; margin-top: 8px; font-weight: 600;">File Manager</div>
                                </div>
                                <div style="text-align: center; cursor: pointer;" onclick="alert('Images directory configuration is ready.')">
                                    <i class="fas fa-images" style="font-size: 32px; color: #ff6c2c;"></i>
                                    <div style="font-size: 12px; margin-top: 8px; font-weight: 600;">Images</div>
                                </div>
                                <div style="text-align: center; cursor: pointer;" onclick="alert('Disk usage parameters are normal (1.2 GB used).')">
                                    <i class="fas fa-hard-drive" style="font-size: 32px; color: #ff6c2c;"></i>
                                    <div style="font-size: 12px; margin-top: 8px; font-weight: 600;">Disk Usage</div>
                                </div>
                                <div style="text-align: center; cursor: pointer;" onclick="alert('FTP accounts connection details: host: SFTP, port: 22')">
                                    <i class="fas fa-network-wired" style="font-size: 32px; color: #ff6c2c;"></i>
                                    <div style="font-size: 12px; margin-top: 8px; font-weight: 600;">FTP Accounts</div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; margin-bottom: 24px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                            <div style="background: #f9fafb; padding: 12px 20px; border-bottom: 1px solid #e5e7eb; font-weight: 700; color: #374151; font-size: 14px;">DATABASES</div>
                            <div style="padding: 24px; display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 20px;">
                                <div style="text-align: center; cursor: pointer;" onclick="alert('Launching phpMyAdmin...')">
                                    <i class="fas fa-database" style="font-size: 32px; color: #ff6c2c;"></i>
                                    <div style="font-size: 12px; margin-top: 8px; font-weight: 600;">phpMyAdmin</div>
                                </div>
                                <div style="text-align: center; cursor: pointer;" onclick="alert('MySQL Database Wizard started.')">
                                    <i class="fas fa-wand-magic-sparkles" style="font-size: 32px; color: #ff6c2c;"></i>
                                    <div style="font-size: 12px; margin-top: 8px; font-weight: 600;">MySQL Wizard</div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                            <div style="background: #f9fafb; padding: 12px 20px; border-bottom: 1px solid #e5e7eb; font-weight: 700; color: #374151; font-size: 14px;">EMAIL</div>
                            <div style="padding: 24px; display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 20px;">
                                <div style="text-align: center; cursor: pointer;" onclick="alert('Email Accounts: creating new accounts is fully active.')">
                                    <i class="fas fa-envelope-open-text" style="font-size: 32px; color: #ff6c2c;"></i>
                                    <div style="font-size: 12px; margin-top: 8px; font-weight: 600;">Email Accounts</div>
                                </div>
                                <div style="text-align: center; cursor: pointer;" onclick="alert('Forwarders: configure automatic mail forwarding.')">
                                    <i class="fas fa-share" style="font-size: 32px; color: #ff6c2c;"></i>
                                    <div style="font-size: 12px; margin-top: 8px; font-weight: 600;">Forwarders</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                        <h4 style="margin: 0 0 16px; color:#111827; font-size: 15px; font-weight: 700; border-bottom: 2px solid #ff6c2c; padding-bottom: 8px;">GENERAL INFORMATION</h4>
                        <div style="display:flex; flex-direction:column; gap:12px; font-size: 13px;">
                            <div style="display:flex; justify-content:space-between; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">
                                <span style="color:#6b7280;">Server IP</span>
                                <strong style="font-family:monospace;">103.14.120.88</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">
                                <span style="color:#6b7280;">Operating System</span>
                                <strong>CloudLinux 8.9</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">
                                <span style="color:#6b7280;">cPanel Version</span>
                                <strong>118.0.11</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">
                                <span style="color:#6b7280;">PHP Version</span>
                                <strong>8.2.14</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between; padding-bottom: 8px;">
                                <span style="color:#6b7280;">MySQL Version</span>
                                <strong>8.0.35</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('closeCpanelBtn').addEventListener('click', () => {
            overlay.remove();
        });
    }

    async function fetchDashboardServices(user) {
        const overviewStateEl = $('#dbOverviewState');
        const hostingContainer = $('#dbHostingContainer');
        const domainsContainer = $('#dbDomainsContainer');
        
        const cntHostingEl = $('#cntHosting');
        const cntDomainsEl = $('#cntDomains');
        const cntOrdersEl = $('#cntOrders');
        
        try {
            const res = await fetch(`/api/user/orders?email=${encodeURIComponent(user.email)}`);
            if (!res.ok) throw new Error('API query failure');
            const data = await res.json();
            
            const paidOrders = (data.orders || []).filter(o => o.status === 'paid');
            if (cntOrdersEl) cntOrdersEl.textContent = data.orders.length;
            
            const planMetadata = {
                starter: { name: 'Starter Web Hosting Plan', price: '₹69' },
                premium: { name: 'WordPress Premium Hosting Plan', price: '₹99' },
                max: { name: 'Business Max Hosting Plan', price: '₹189' },
                'cloud-pro': { name: 'Cloud Pro Node.js Hosting', price: '₹449' }
            };
            
            const hostingOrders = paidOrders.filter(o => ['starter', 'premium', 'max', 'cloud-pro'].includes(o.planId));
            if (cntHostingEl) cntHostingEl.textContent = hostingOrders.length;
            
            const domainCount = hostingOrders.length;
            if (cntDomainsEl) cntDomainsEl.textContent = domainCount;
            
            if (paidOrders.length === 0) {
                if (overviewStateEl) {
                    overviewStateEl.innerHTML = `
                        <div style="background:#ffffff; border:1px dashed #cbd5e1; border-radius:12px; padding:48px 32px; text-align:center;">
                            <div style="width:72px; height:72px; border-radius:50%; background:rgba(20,110,245,0.06); color:#146ef5; display:flex; align-items:center; justify-content:center; font-size:32px; margin:0 auto 20px;"><i class="fas fa-cubes-stacked"></i></div>
                            <h3 style="color:#0f172a; font-size:20px; margin:0 0 8px;">No Active Services Yet</h3>
                            <p style="color:#64748b; font-size:15px; max-width:500px; margin:0 auto 24px; line-height:1.6;">You don't have any active hosting plans or registered domain names. Make your first purchase to get your site online in minutes!</p>
                            <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
                                <a href="pricing.html" class="btn btn-mw-primary btn-sm"><i class="fas fa-shopping-cart" style="margin-right:6px;"></i> Start Web Hosting</a>
                                <a href="domain.html" class="btn btn-mw-secondary btn-sm"><i class="fas fa-search" style="margin-right:6px;"></i> Search Domains</a>
                                <button type="button" class="btn btn-outline-account btn-sm" style="color:#475569; border-color:#cbd5e1; margin:0;" id="dbEmptyConsultBtn"><i class="fas fa-comments" style="margin-right:6px;"></i> Consult Requirements</button>
                            </div>
                        </div>
                    `;
                    setTimeout(() => {
                        const consultBtn = $('#dbEmptyConsultBtn');
                        if (consultBtn) {
                            consultBtn.addEventListener('click', () => {
                                const chatToggle = $('.chatbot-toggle-btn') || $('#chat-window');
                                if (chatToggle) {
                                    chatToggle.click();
                                } else {
                                    openModal('contactModal');
                                }
                            });
                        }
                    }, 50);
                }
                
                if (hostingContainer) {
                    hostingContainer.innerHTML = `
                        <div style="border:1px dashed #cbd5e1; border-radius:12px; padding:40px; text-align:center; background:#f8fafc;">
                            <h4 style="color:#0f172a; margin:0 0 8px; font-size:16px;">No Active Hosting Plan</h4>
                            <p style="color:#64748b; font-size:14px; margin-bottom:20px;">Deploy high-speed LiteSpeed SSD WordPress or Node.js hosting today.</p>
                            <a href="pricing.html" class="btn btn-mw-primary btn-sm">Explore Hosting Plans</a>
                        </div>
                    `;
                }
                
                if (domainsContainer) {
                    domainsContainer.innerHTML = `
                        <div style="border:1px dashed #cbd5e1; border-radius:12px; padding:40px; text-align:center; background:#f8fafc;">
                            <h4 style="color:#0f172a; margin:0 0 8px; font-size:16px;">No Domain Registrations</h4>
                            <p style="color:#64748b; font-size:14px; margin-bottom:20px;">Search and register .in, .com, or .org names starting from ₹299/yr.</p>
                            <div class="domain-search-box" style="max-width:500px; margin: 0 auto 20px; display:flex; gap:8px;">
                                <input type="text" placeholder="Search your dream domain..." class="domain-input" id="dbDomainSearchInput" style="flex:1;">
                                <button type="button" class="btn btn-mw-primary btn-sm" id="dbDomainSearchBtn"><i class="fas fa-search"></i> Search</button>
                            </div>
                            <p id="dbDomainSearchResult" style="min-height:20px; font-weight:600; color:#146ef5; font-size:14px;"></p>
                        </div>
                    `;
                    setTimeout(() => wireDomainSearchElements(), 50);
                }
                
            } else {
                if (overviewStateEl) {
                    overviewStateEl.innerHTML = `
                        <h3 style="color:#0f172a; margin-bottom: 16px;">Quick Operations</h3>
                        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                            <div style="border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px; display: flex; flex-direction: column; justify-content: space-between; background:#ffffff;">
                                <div>
                                    <h4 style="margin: 0; color:#0f172a;"><i class="fab fa-wordpress text-blue" style="margin-right:8px;"></i> Manage WordPress Site</h4>
                                    <p style="color:#64748b; font-size:14px; margin-top:8px; line-height:1.5;">Check speed parameters, clear cache, configure updates, and access database tables directly.</p>
                                </div>
                                <button type="button" class="btn btn-mw-primary btn-sm" style="margin-top:16px; align-self:flex-start;" onclick="document.querySelector('[data-tab=hosting]').click();">Open Manager</button>
                            </div>
                            <div style="border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px; display: flex; flex-direction: column; justify-content: space-between; background:#ffffff;">
                                <div>
                                    <h4 style="margin: 0; color:#0f172a;"><i class="fas fa-truck-ramp-box text-blue" style="margin-right:8px;"></i> Request Free Site Migration</h4>
                                    <p style="color:#64748b; font-size:14px; margin-top:8px; line-height:1.5;">Moving your website from GoDaddy, Hostinger, or Bluehost? Our migration agents handle everything in 60 minutes.</p>
                                </div>
                                <button type="button" class="btn btn-mw-secondary btn-sm" style="margin-top:16px; align-self:flex-start;" data-open-modal="migrationModal">Start Migration</button>
                            </div>
                        </div>
                    `;
                }
                
                if (hostingContainer) {
                    hostingContainer.innerHTML = hostingOrders.map(order => {
                        const meta = planMetadata[order.planId] || { name: 'Hosting Plan', price: '₹99' };
                        const customerDomain = user.email.includes('@') ? user.email.split('@')[0] + '.com' : 'fraylonhosting.com';
                        
                        return `
                            <div style="border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; background:#ffffff; margin-bottom:24px;">
                                <div style="background:#f8fafc; padding:20px; border-bottom:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center;">
                                    <div>
                                        <span style="font-size:11px; font-weight:800; background:#4ade80; color:#064e3b; padding:4px 8px; border-radius:4px; text-transform:uppercase;">Active</span>
                                        <h4 style="margin:6px 0 0; color:#0f172a; font-size:18px;">${meta.name}</h4>
                                        <p style="margin:2px 0 0; color:#64748b; font-size:13px;">Domain: <strong>${customerDomain}</strong></p>
                                    </div>
                                    <div style="text-align:right;">
                                        <span style="font-size:12px; color:#64748b;">Locked Renewal Price</span>
                                        <h4 style="margin:2px 0 0; color:#0f172a; font-size:18px;">${meta.price}<span style="font-size:13px; font-weight:normal;">/mo</span></h4>
                                    </div>
                                </div>
                                <div style="padding:24px; display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px;">
                                    <div>
                                        <span style="font-size:12px; color:#64748b;">Datacenter Location</span>
                                        <p style="margin:4px 0 0; color:#0f172a; font-weight:700;"><i class="fas fa-location-dot" style="color:#ef4444; margin-right:6px;"></i> Mumbai, India</p>
                                    </div>
                                    <div>
                                        <span style="font-size:12px; color:#64748b;">Dedicated Server IP</span>
                                        <p style="margin:4px 0 0; color:#0f172a; font-weight:700; font-family:monospace;">103.14.120.88</p>
                                    </div>
                                    <div>
                                        <span style="font-size:12px; color:#64748b;">SSL Certificate</span>
                                        <p style="margin:4px 0 0; color:#10b981; font-weight:700;"><i class="fas fa-lock" style="margin-right:6px;"></i> Active (AutoSSL)</p>
                                    </div>
                                    <div>
                                        <span style="font-size:12px; color:#64748b;">Disk Space NVMe</span>
                                        <p style="margin:4px 0 0; color:#0f172a; font-weight:700;">1.2 GB / 50 GB</p>
                                    </div>
                                </div>
                                <div style="background:#f8fafc; padding:16px 24px; border-top:1px solid #e2e8f0; display:flex; gap:12px;">
                                    <button type="button" class="btn btn-mw-primary btn-sm btn-cpanel-sso" style="display:inline-flex; align-items:center; gap:8px; margin:0;"><i class="fas fa-sign-in-alt"></i> Log in to cPanel</button>
                                    <button type="button" class="btn btn-outline-account btn-sm" onclick="alert('Starting backup generation... Check back in 5 minutes.')" style="margin:0;"><i class="fas fa-rotate-left"></i> Run Backup</button>
                                </div>
                            </div>
                        `;
                    }).join('');
                    setTimeout(() => wireCpanelSsoHandlers(), 50);
                }
                
                if (domainsContainer) {
                    domainsContainer.innerHTML = hostingOrders.map(order => {
                        const customerDomain = user.email.includes('@') ? user.email.split('@')[0] + '.com' : 'fraylonhosting.com';
                        return `
                            <div style="border:1px solid #e2e8f0; border-radius:12px; padding:20px; display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; background:#ffffff;">
                                <div>
                                    <h4 style="margin:0; color:#0f172a; font-size:16px;">${customerDomain}</h4>
                                    <p style="color:#64748b; font-size:12px; margin-top:4px;">Nameservers: <strong style="font-family:monospace;">ns1.fraylondns.com</strong>, <strong style="font-family:monospace;">ns2.fraylondns.com</strong></p>
                                </div>
                                <div style="display:flex; align-items:center; gap:20px;">
                                    <div style="text-align:right;">
                                        <span style="font-size:11px; font-weight:800; background:#dbeafe; color:#1e40af; padding:4px 8px; border-radius:4px;">Auto Renew: ON</span>
                                        <p style="color:#64748b; font-size:12px; margin-top:4px;">Expires: Dec 15, 2026</p>
                                    </div>
                                    <button type="button" class="btn btn-outline-account btn-sm" onclick="alert('DNS settings are locked. Contact support to unlock.')" style="margin:0;">Manage DNS</button>
                                </div>
                            </div>
                        `;
                    }).join('') + `
                        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:12px; padding:32px; text-align:center; margin-top:32px;">
                            <h4 style="color:#0f172a; margin-bottom:8px;">Need a new domain?</h4>
                            <p style="color:#64748b; font-size:14px; margin-bottom:20px;">Search and register instantly. Pricing starts from ₹299/yr.</p>
                            <div class="domain-search-box" style="max-width:550px; margin: 0 auto; display:flex; gap:8px;">
                                <input type="text" placeholder="Type your domain name (e.g. mycompany.in)..." class="domain-input" id="dbDomainSearchInput" style="flex:1;">
                                <button type="button" class="btn btn-mw-primary" id="dbDomainSearchBtn"><i class="fas fa-search"></i> Search</button>
                            </div>
                            <p id="dbDomainSearchResult" style="min-height:20px; margin-top:12px; font-weight:600; color:#146ef5;"></p>
                        </div>
                    `;
                    setTimeout(() => wireDomainSearchElements(), 50);
                }
            }
        } catch (e) {
            console.error('[dashboard] DB fetch failed', e);
        }
    }

    async function fetchBillingInvoices(email) {
        const tbody = $('#dbBillingTbody');
        const countOrdersEl = $('#cntOrders');
        if (!tbody) return;
        
        tbody.innerHTML = `<tr><td colspan="5" style="padding:32px 0; text-align:center; color:#64748b;"><i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i> Querying database...</td></tr>`;
        
        try {
            const res = await fetch(`/api/user/orders?email=${encodeURIComponent(email)}`);
            if (!res.ok) throw new Error('API query failure');
            const data = await res.json();
            
            if (countOrdersEl) countOrdersEl.textContent = data.orders.length;
            
            if (!data.orders || data.orders.length === 0) {
                tbody.innerHTML = `<tr><td colspan="5" style="padding:32px 0; text-align:center; color:#64748b;">No completed orders found for this email. Check out a hosting plan to see transaction invoices listed here.</td></tr>`;
                return;
            }
            
            tbody.innerHTML = data.orders.map(order => {
                const dateStr = order.createdAt ? order.createdAt.split(' ')[0] : 'N/A';
                const formattedPrice = fmtINR(order.amountPaise / 100);
                const statusColor = order.status === 'paid' ? '#10b981' : '#f59e0b';
                
                return `
                    <tr style="border-bottom:1px solid #e2e8f0;">
                        <td style="padding:12px 8px; font-family:monospace; color:#0f172a;">${order.id} / ${order.receipt}</td>
                        <td style="padding:12px 8px; font-weight:600; color:#0f172a;">${order.planId.toUpperCase()} (${order.durationMonths}mo)</td>
                        <td style="padding:12px 8px; color:#64748b;">${dateStr}</td>
                        <td style="padding:12px 8px; font-weight:700; color:#0f172a;">${formattedPrice}</td>
                        <td style="padding:12px 8px;"><span style="background:${statusColor}15; color:${statusColor}; font-size:11px; font-weight:800; padding:4px 8px; border-radius:4px; text-transform:uppercase;">${order.status}</span></td>
                    </tr>
                `;
            }).join('');
            
        } catch (e) {
            console.error('[dashboard] Billing fetch error:', e);
            tbody.innerHTML = `<tr><td colspan="5" style="padding:32px 0; text-align:center; color:#ef4444;">Failed to fetch invoice history from database. Please reload to try again.</td></tr>`;
        }
    }

    // ─────────────────────────────────────────────
    // Boot
    // ─────────────────────────────────────────────

    document.addEventListener('DOMContentLoaded', () => {
        initNavbarActiveHighlights();
        initReveal();
        renderPlans();
        renderFaq();
        initDurationDropdown();
        initCountdown();
        initStickyHeader();
        initSmoothScroll();
        initActiveSection();
        initMobileNav();
        initModals();
        initForms();
        initMobileStackCardsCarousel();
        initTestimonialSlider();
        initCustomPageHandlers();
        checkAuthSession();
    });
})();

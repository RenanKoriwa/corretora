import { animate, scroll, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

// ── Properties Database ───────────────────────
const properties = [
    {
        id: 1,
        title: "Mansão Contemporânea",
        type: "casa",
        location: "Jardins, São Paulo",
        price: "R$ 12.500.000",
        image: "assets/modern_luxury_house_1779907077817.png",
        features: ["4 Suítes", "6 Vagas", "Piscina", "850m²"],
        badge: "Destaque"
    },
    {
        id: 2,
        title: "Cobertura Duplex Luxuosa",
        type: "predio",
        location: "Vila Nova Conceição, SP",
        price: "R$ 15.800.000",
        image: "assets/contemporary_building_1779907092441.png",
        features: ["3 Suítes", "4 Vagas", "Vista Parque", "450m²"],
        badge: "Exclusivo"
    },
    {
        id: 3,
        title: "Casa de Campo Sofisticada",
        type: "casa",
        location: "Fazenda Boa Vista, SP",
        price: "R$ 8.900.000",
        image: "assets/cozy_suburban_house_1779907105947.png",
        features: ["5 Suítes", "Jardim", "Lareira", "1200m²"],
        badge: "Novo"
    },
    {
        id: 4,
        title: "Corporate Class A+",
        type: "predio",
        location: "Faria Lima, São Paulo",
        price: "R$ 25.000.000",
        image: "assets/minimalist_glass_building_1779907119969.png",
        features: ["Laje Corporativa", "LEED", "Heliponto", "1000m²"],
        badge: "Comercial"
    }
];

// ── State ─────────────────────────────────────
let favorites = JSON.parse(localStorage.getItem('joaoramos_favorites')) || [];

// ── DOM Refs ──────────────────────────────────
const propertiesGrid   = document.getElementById('properties-grid');
const searchForm       = document.getElementById('search-form');
const searchInput      = document.getElementById('search-input');
const typeFilter       = document.getElementById('type-filter');
const resultsInfo      = document.getElementById('results-info');
const mobileToggle     = document.getElementById('mobile-toggle');
const mainNav          = document.getElementById('main-nav');
const favCount         = document.getElementById('fav-count');
const navFavBtn        = document.getElementById('nav-fav-btn');
const favoritesSection = document.getElementById('favoritos');
const favoritesGrid    = document.getElementById('favorites-grid');
const noFavoritesMsg   = document.getElementById('no-favorites-msg');
const backToPortfolio  = document.getElementById('back-to-portfolio');
const imoveisSection   = document.getElementById('imoveis');


// ── Counter Animation ─────────────────────────
function animateCounter(el, target, duration = 2000) {
    let start = null;
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
    };
    requestAnimationFrame(step);
}

// ── Hero Animations ───────────────────────────
function initHeroAnimations() {
    // Parallax on scroll
    scroll(animate("#hero-bg", { y: [0, 220] }), {
        target: document.querySelector(".hero"),
        offset: ["start start", "end start"]
    });

    // Title reveal
    animate(".hero-title", { y: ["110%", "0%"] }, {
        duration: 1.4,
        easing: [0.19, 1.0, 0.22, 1.0],
        delay: 0.2
    });

    // Subtitle reveal
    animate(".hero-subtitle", { y: ["100%", "0%"] }, {
        duration: 1.2,
        easing: [0.19, 1.0, 0.22, 1.0],
        delay: 0.5
    });

    // Search box
    animate("#hero-search", { opacity: [0, 1], y: [50, 0] }, {
        duration: 1.0,
        easing: [0.25, 0.46, 0.45, 0.94],
        delay: 0.7
    });

    // Stats entrance
    animate("#hero-stats", { opacity: [0, 1], x: [40, 0] }, {
        duration: 1.0,
        easing: [0.19, 1.0, 0.22, 1.0],
        delay: 0.9
    });

    // Counter numbers
    setTimeout(() => {
        document.querySelectorAll('.stat-number[data-target]').forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            animateCounter(el, target, 2200);
        });
    }, 1000);
}

// ── Card Reveal ───────────────────────────────
function animateCardsReveal(container) {
    const cards    = container.querySelectorAll('.property-card');
    const wrappers = container.querySelectorAll('.property-img-wrapper');
    if (!cards.length) return;

    animate(cards, { opacity: [0, 1], y: [60, 0] }, {
        duration: 0.9,
        delay: stagger(0.12),
        easing: [0.25, 0.46, 0.45, 0.94]
    });

    animate(wrappers, {
        clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]
    }, {
        duration: 1.2,
        delay: stagger(0.12),
        easing: [0.19, 1.0, 0.22, 1.0]
    });
}

// ── Scroll-based Reveals ──────────────────────
function initScrollAnimations() {
    // Generic fade ups
    inView(".fade-up-element", (info) => {
        animate(info.target, { opacity: [0, 1], y: [40, 0] }, {
            duration: 0.9,
            easing: [0.25, 0.46, 0.45, 0.94]
        });
    }, { margin: "-80px" });

    // Section headers
    inView(".section-header h3", (info) => {
        animate(info.target, { opacity: [0, 1], y: [30, 0] }, {
            duration: 1.1,
            easing: [0.19, 1.0, 0.22, 1.0],
            delay: 0.1
        });
    }, { margin: "-50px" });

    // Neighborhoods stagger (slide up + fade)
    inView(".neighborhoods-grid", () => {
        animate(".neighborhood-item", {
            opacity: [0, 1],
            y: [40, 0]
        }, {
            duration: 0.8,
            delay: stagger(0.1),
            easing: [0.25, 0.46, 0.45, 0.94]
        });
    }, { margin: "-60px" });

    // Footer brand
    inView(".footer-brand", (info) => {
        animate(info.target, { opacity: [0, 1], y: [30, 0] }, {
            duration: 1.0, easing: [0.25, 0.46, 0.45, 0.94]
        });
    }, { margin: "-40px" });
}

// ── Magnetic Buttons ──────────────────────────
function initMagneticButtons() {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width  / 2) * 0.35;
            const y = (e.clientY - rect.top  - rect.height / 2) * 0.35;
            animate(btn, { x, y }, { type: "spring", stiffness: 180, damping: 14, mass: 0.1 });
            const span = btn.querySelector('span');
            if (span) animate(span, { x: x * 0.15, y: y * 0.15 }, { type: "spring", stiffness: 180, damping: 14, mass: 0.1 });
        });

        btn.addEventListener('mouseleave', () => {
            animate(btn, { x: 0, y: 0 }, { type: "spring", stiffness: 180, damping: 14 });
            const span = btn.querySelector('span');
            if (span) animate(span, { x: 0, y: 0 }, { type: "spring", stiffness: 180, damping: 14 });
        });
    });
}

// ── Render Properties ─────────────────────────
function renderProperties(props, container) {
    container.innerHTML = '';

    if (props.length === 0 && container === propertiesGrid) {
        container.innerHTML = `<div style="width:100%;text-align:center;padding:4rem;color:var(--muted-foreground);grid-column:1/-1"><p style="font-family:var(--font-display);font-size:1.5rem;font-style:italic;">Nenhum imóvel encontrado.</p></div>`;
        if (resultsInfo) resultsInfo.textContent = '0 propriedades encontradas';
        return;
    }

    if (container === propertiesGrid && resultsInfo) {
        resultsInfo.textContent = `${props.length} propriedade${props.length !== 1 ? 's' : ''} encontrada${props.length !== 1 ? 's' : ''}`;
    }

    props.forEach((prop) => {
        const featuresHtml = prop.features.map(f => `
            <div class="feature">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ${f}
            </div>`).join('');

        const isFav     = favorites.includes(prop.id);
        const cardCls   = isFav ? 'property-card is-favorite' : 'property-card';
        const heartCls  = isFav ? 'fav-btn active' : 'fav-btn';

        const card = `
        <article class="${cardCls}" role="listitem" onclick="window.location.href='produto.html'">
            <div class="property-img-wrapper">
                ${prop.badge ? `<span class="property-badge">${prop.badge}</span>` : ''}
                <button class="${heartCls}" data-id="${prop.id}" aria-label="Salvar imóvel ${prop.title}">
                    <svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
                <img src="${prop.image}" alt="${prop.title} — ${prop.location}" class="property-image" loading="lazy" width="800" height="600">
            </div>
            <div class="property-content">
                <h4 class="property-title">${prop.title}</h4>
                <p class="property-location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    ${prop.location}
                </p>
                <div class="property-price">${prop.price}</div>
                <div class="property-features">${featuresHtml}</div>
            </div>
        </article>`;

        container.insertAdjacentHTML('beforeend', card);
    });

    // Wire up heart buttons
    container.querySelectorAll('.fav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(parseInt(btn.getAttribute('data-id')), btn);
        });
    });

    // Re-init magnetic on new buttons
    setTimeout(() => {
        initMagneticButtons();
        animateCardsReveal(container);
    }, 50);
}

// ── Favorites ─────────────────────────────────
function toggleFavorite(id, btnEl) {
    const idx = favorites.indexOf(id);
    const cardEl = btnEl.closest('.property-card');
    
    if (idx === -1) {
        favorites.push(id);
        btnEl.classList.add('active');
        if (cardEl) cardEl.classList.add('is-favorite');
        animate(btnEl.querySelector('svg'), {
            scale: [1, 1.6, 1]
        }, { type: "spring", stiffness: 350, damping: 10 });
    } else {
        favorites.splice(idx, 1);
        btnEl.classList.remove('active');
        if (cardEl) cardEl.classList.remove('is-favorite');
        if (favoritesSection.style.display === 'block') showFavoritesSection();
    }
    localStorage.setItem('joaoramos_favorites', JSON.stringify(favorites));
    updateFavCount();
}

function updateFavCount() {
    const count = favorites.length;
    favCount.textContent = count;
    if (count > 0) {
        animate(favCount, { scale: [1, 1.3, 1] }, { type: "spring", stiffness: 300, damping: 12 });
    }
}

function showFavoritesSection() {
    imoveisSection.style.display = 'none';
    favoritesSection.style.display = 'block';
    const favoriteProps = properties.filter(p => favorites.includes(p.id));
    if (favoriteProps.length === 0) {
        favoritesGrid.innerHTML = '';
        noFavoritesMsg.style.display = 'block';
    } else {
        noFavoritesMsg.style.display = 'none';
        renderProperties(favoriteProps, favoritesGrid);
    }
    window.scrollTo({ top: favoritesSection.offsetTop - 80, behavior: 'smooth' });
}

function showPortfolioSection() {
    favoritesSection.style.display = 'none';
    imoveisSection.style.display   = 'block';
    applyFilters();
    window.scrollTo({ top: imoveisSection.offsetTop - 80, behavior: 'smooth' });
}

// ── Search & Filter ───────────────────────────
function applyFilters() {
    const term = searchInput.value.toLowerCase();
    const type = typeFilter.value;
    const filtered = properties.filter(p =>
        (p.title.toLowerCase().includes(term) || p.location.toLowerCase().includes(term)) &&
        (type === 'all' || p.type === type)
    );
    animate(propertiesGrid, { opacity: 0, y: 20 }, { duration: 0.25 }).then(() => {
        renderProperties(filtered, propertiesGrid);
        animate(propertiesGrid, { opacity: 1, y: 0 }, { duration: 0.3 });
    });
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showPortfolioSection();
    window.scrollTo({ top: imoveisSection.offsetTop - 80, behavior: 'smooth' });
});

typeFilter.addEventListener('change', () => showPortfolioSection());

// ── Neighborhoods Filter ──────────────────────
function initNeighborhoodClicks() {
    document.querySelectorAll('.neighborhood-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            searchInput.value = item.getAttribute('data-bairro');
            showPortfolioSection();
            window.scrollTo({ top: imoveisSection.offsetTop - 80, behavior: 'smooth' });
        });
    });
}

// ── Header Scroll ─────────────────────────────
function initHeaderScroll() {
    let lastY = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        const y = window.scrollY;
        if (y > 60) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
        lastY = y;
    }, { passive: true });
}

// ── Mobile Menu ───────────────────────────────
function initMobileMenu() {
    mobileToggle.addEventListener('click', () => {
        const isOpen = mobileToggle.classList.toggle('open');
        mainNav.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on nav link click
    mainNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            mobileToggle.classList.remove('open');
            mainNav.classList.remove('open');
            mobileToggle.setAttribute('aria-expanded', false);
        });
    });
}

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    updateFavCount();
    renderProperties(properties, propertiesGrid);

    initHeaderScroll();
    initMobileMenu();
    initNeighborhoodClicks();

    navFavBtn.addEventListener('click', (e) => { e.preventDefault(); showFavoritesSection(); });
    backToPortfolio.addEventListener('click', () => showPortfolioSection());

    // Animations after first paint
    setTimeout(() => {
        initHeroAnimations();
        initScrollAnimations();
        initMagneticButtons();
    }, 100);
});

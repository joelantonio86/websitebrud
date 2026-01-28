// =========================================================
// ANALYTICS MODULE - Google Analytics / Plausible
// =========================================================

// Configuração de Analytics
const ANALYTICS_CONFIG = {
    // Escolha um: 'google' ou 'plausible'
    provider: 'google', // ou 'plausible'
    
    // Google Analytics 4
    googleId: 'G-XXXXXXXXXX', // Substituir pelo ID real
    
    // Plausible
    plausibleDomain: 'bandaracional.com.br' // Substituir pelo domínio real
};

// Inicializar Google Analytics
function initGoogleAnalytics() {
    if (ANALYTICS_CONFIG.provider !== 'google' || !ANALYTICS_CONFIG.googleId) {
        return;
    }
    
    // Google Analytics 4
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.googleId}`;
    document.head.appendChild(script1);
    
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', ANALYTICS_CONFIG.googleId, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
    });
    
    window.gtag = gtag;
}

// Inicializar Plausible
function initPlausible() {
    if (ANALYTICS_CONFIG.provider !== 'plausible' || !ANALYTICS_CONFIG.plausibleDomain) {
        return;
    }
    
    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = ANALYTICS_CONFIG.plausibleDomain;
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);
}

// Track eventos customizados
export function trackEvent(category, action, label) {
    if (ANALYTICS_CONFIG.provider === 'google' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Plausible tracking
    if (ANALYTICS_CONFIG.provider === 'plausible' && window.plausible) {
        window.plausible(action, {
            props: {
                category: category,
                label: label
            }
        });
    }
}

// Track page views
export function trackPageView(path) {
    if (ANALYTICS_CONFIG.provider === 'google' && window.gtag) {
        window.gtag('config', ANALYTICS_CONFIG.googleId, {
            page_path: path
        });
    }
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initGoogleAnalytics();
        initPlausible();
    });
} else {
    initGoogleAnalytics();
    initPlausible();
}

// Track eventos importantes
document.addEventListener('DOMContentLoaded', () => {
    // Track formulário enviado
    const form = document.getElementById('contatoForm');
    if (form) {
        form.addEventListener('submit', () => {
            trackEvent('Form', 'Submit', 'Contato');
        });
    }
    
    // Track downloads
    document.querySelectorAll('a[download]').forEach(link => {
        link.addEventListener('click', () => {
            const fileName = link.getAttribute('href').split('/').pop();
            trackEvent('Download', 'File', fileName);
        });
    });
    
    // Track links externos
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('Outbound', 'Click', link.href);
        });
    });
});

export { ANALYTICS_CONFIG };

// =========================================================
// NAVIGATION MODULE
// =========================================================

// Navigation Toggle
let hamburger = null;
let navMenu = null;
let navLinks = null;

// Função para obter referências atualizadas
function getNavElements() {
    hamburger = document.getElementById('hamburger');
    navMenu = document.getElementById('navMenu');
    return { hamburger, navMenu };
}

// Inicializar referências
getNavElements();

// Garantir que hamburger sempre fique visível no mobile
function ensureHamburgerVisible() {
    const elements = getNavElements();
    if (elements.hamburger && window.innerWidth <= 768) {
        elements.hamburger.style.display = 'flex';
        elements.hamburger.style.visibility = 'visible';
        elements.hamburger.style.opacity = '1';
        elements.hamburger.style.position = 'relative';
        elements.hamburger.style.setProperty('display', 'flex', 'important');
        elements.hamburger.style.setProperty('visibility', 'visible', 'important');
        elements.hamburger.style.setProperty('opacity', '1', 'important');
    }
}

// Verificar na inicialização
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        ensureHamburgerVisible();
        setTimeout(ensureHamburgerVisible, 100);
    });
} else {
    ensureHamburgerVisible();
    setTimeout(ensureHamburgerVisible, 100);
}

// Verificar ao redimensionar a janela
window.addEventListener('resize', function() {
    ensureHamburgerVisible();
});

// Verificar periodicamente no mobile (fallback)
if (window.innerWidth <= 768) {
    setInterval(function() {
        const elements = getNavElements();
        if (elements.hamburger && window.innerWidth <= 768) {
            const computedStyle = window.getComputedStyle(elements.hamburger);
            if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {
                ensureHamburgerVisible();
            }
        }
    }, 500);
}

// Função para fechar todos os submenus
function closeAllSubmenus() {
    document.querySelectorAll('.has-submenu').forEach(li => {
        li.classList.remove('active');
        const link = li.querySelector('.nav-link');
        if (link) {
            link.setAttribute('aria-expanded', 'false');
        }
    });
}

// Função para fechar o menu
function closeMenu() {
    const elements = getNavElements();
    if (elements.hamburger) elements.hamburger.classList.remove('active');
    if (elements.navMenu) elements.navMenu.classList.remove('active');
    // Fechar todos os submenus também
    closeAllSubmenus();
}

// Função para abrir/fechar o menu
function toggleMenu() {
    const elements = getNavElements();
    if (elements.hamburger && elements.navMenu) {
        elements.hamburger.classList.toggle('active');
        elements.navMenu.classList.toggle('active');
        
        // Se está fechando o menu, fechar todos os submenus também
        if (!elements.navMenu.classList.contains('active')) {
            closeAllSubmenus();
        }
    }
}

// Toggle do menu hamburger - Garantir que funcione mesmo após DOM carregar
let hamburgerClickHandler = null;

function initHamburger() {
    const elements = getNavElements();
    const hamburgerEl = elements.hamburger;
    
    if (!hamburgerEl) {
        return false;
    }
    
    // Remover listener antigo se existir
    if (hamburgerClickHandler) {
        hamburgerEl.removeEventListener('click', hamburgerClickHandler);
        hamburgerEl.onclick = null;
    }
    
    // Criar novo handler
    hamburgerClickHandler = function(e) {
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();
        
        // Prevenir qualquer comportamento de arrastar
        if (e.type === 'touchstart' || e.type === 'touchmove') {
            e.preventDefault();
        }
        
        toggleMenu();
        return false;
    };
    
    // Adicionar múltiplos tipos de eventos para garantir
    hamburgerEl.addEventListener('click', hamburgerClickHandler, { passive: false, capture: true });
    hamburgerEl.addEventListener('touchend', hamburgerClickHandler, { passive: false, capture: true });
    
    // Também adicionar via onclick como fallback
    hamburgerEl.onclick = hamburgerClickHandler;
    
    // Prevenir arrastar
    hamburgerEl.addEventListener('touchstart', function(e) {
        e.stopPropagation();
    }, { passive: false });
    
    hamburgerEl.addEventListener('touchmove', function(e) {
        e.preventDefault();
        e.stopPropagation();
    }, { passive: false });
    
    // Garantir que está visível no mobile
    ensureHamburgerVisible();
    
    return true;
}

// Inicializar quando DOM estiver pronto
function setupHamburgerMenu() {
    let initialized = false;
    
    // Tentar inicializar imediatamente
    initialized = initHamburger();
    
    // Se não inicializou, tentar novamente
    if (!initialized) {
        setTimeout(() => {
            initHamburger();
        }, 100);
        setTimeout(() => {
            initHamburger();
        }, 300);
        setTimeout(() => {
            initHamburger();
        }, 500);
        setTimeout(() => {
            initHamburger();
        }, 1000);
    }
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setupHamburgerMenu();
        // Tentar novamente após um pequeno delay
        setTimeout(setupHamburgerMenu, 200);
    });
} else {
    setupHamburgerMenu();
    setTimeout(setupHamburgerMenu, 200);
}

// Também tentar inicializar após um pequeno delay (fallback)
setTimeout(setupHamburgerMenu, 2000);

// Submenu Toggle para Mobile e Desktop
document.querySelectorAll('.has-submenu > .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const parentLi = this.closest('li');
        const href = this.getAttribute('href');
        
        if (href === '#' || !href) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = parentLi.classList.contains('active');
            
            // Fechar todos os outros submenus primeiro
            closeAllSubmenus();
            
            // Toggle do submenu atual
            if (!isActive) {
                parentLi.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            } else {
                parentLi.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
            }
        } else {
            // Se tem href válido, fecha todos os submenus e o menu
            closeAllSubmenus();
            setTimeout(() => {
                closeMenu();
            }, 100);
        }
    });
});

// Fechar menu ao clicar em links de navegação
document.addEventListener('DOMContentLoaded', function() {
    navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const parentLi = this.closest('li');
            const isSubmenuToggle = parentLi && parentLi.classList.contains('has-submenu') && (href === '#' || !href);
            
            if (!isSubmenuToggle && href && href !== '#') {
                setTimeout(() => {
                    closeMenu();
                }, 100);
            }
        });
    });
});

// Fechar menu e submenus ao clicar fora
document.addEventListener('click', function(e) {
    const elements = getNavElements();
    if (!elements.navMenu || !elements.hamburger) return;
    
    const isClickInsideMenu = elements.navMenu.contains(e.target);
    const isClickOnHamburger = elements.hamburger.contains(e.target);
    const isClickOnSubmenuToggle = e.target.closest('.has-submenu > .nav-link[href="#"]');
    const isClickOnSubmenu = e.target.closest('.submenu, .sub-submenu');
    
    // Se clicou fora do menu e não é o hamburger ou toggle de submenu
    if (!isClickInsideMenu && !isClickOnHamburger && !isClickOnSubmenuToggle && !isClickOnSubmenu) {
        // Fechar todos os submenus (mesmo se o menu hamburger não estiver aberto)
        closeAllSubmenus();
        
        // Fechar menu hamburger se estiver aberto
        if (elements.navMenu.classList.contains('active')) {
            closeMenu();
        }
    }
}, true);

// Navbar scroll effect - NÃO esconder o navbar ao rolar
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Apenas adicionar classe scrolled para mudanças visuais, mas SEMPRE manter visível
    if (navbar) {
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Garantir que navbar sempre fique visível
        navbar.style.display = 'block';
        navbar.style.visibility = 'visible';
        navbar.style.opacity = '1';
        navbar.style.transform = 'translateY(0)';
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
    }
    
    ensureHamburgerVisible();
    
    lastScroll = currentScroll;
}, { passive: true });

// Smooth scroll for navigation links - apenas para links de âncora na mesma página
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignorar se o link contém index.html ou aponta para outra página
        if (href.includes('index.html') || href.includes('.html')) {
            return;
        }
        
        // Verificar se o elemento alvo existe na página atual
        const target = document.querySelector(href);
        
        // Se o target não existe, deixar o comportamento padrão (não fazer nada)
        if (!target) {
            return;
        }
        
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        closeMenu();
    });
});

// Fechar submenus ao pressionar ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Fechar submenus abertos
        const openSubmenus = document.querySelectorAll('.has-submenu.active');
        if (openSubmenus.length > 0) {
            closeAllSubmenus();
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        
        // Se não há submenus abertos, fechar menu hamburger
        const elements = getNavElements();
        if (elements.navMenu && elements.navMenu.classList.contains('active')) {
            closeMenu();
            e.preventDefault();
        }
    }
});

// Exportar funções e variáveis para uso em outros módulos
export { closeMenu, toggleMenu, ensureHamburgerVisible, closeAllSubmenus, navLinks };

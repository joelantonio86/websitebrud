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
    
    // Também fechar sub-submenus
    document.querySelectorAll('.submenu .has-submenu').forEach(li => {
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
        
        // Se está abrindo o menu, garantir que submenus estão configurados
        if (elements.navMenu.classList.contains('active')) {
            setTimeout(() => {
                setupSubmenus();
            }, 100);
        } else {
            // Se está fechando o menu, fechar todos os submenus também
            closeAllSubmenus();
        }
    }
}

// Toggle do menu hamburger - Garantir que funcione mesmo após DOM carregar
let hamburgerClickHandler = null;
let hamburgerInitialized = false;

function initHamburger() {
    const elements = getNavElements();
    const hamburgerEl = elements.hamburger;
    
    if (!hamburgerEl) {
        return false;
    }
    
    // Se já foi inicializado neste elemento, não reinicializar
    if (hamburgerEl.dataset.initialized === 'true' && hamburgerInitialized) {
        return true;
    }
    
    // Remover listeners antigos se existirem
    if (hamburgerClickHandler) {
        hamburgerEl.removeEventListener('click', hamburgerClickHandler);
        hamburgerEl.removeEventListener('touchend', hamburgerClickHandler);
        hamburgerEl.onclick = null;
    }
    
    // Criar novo handler
    hamburgerClickHandler = function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        // Prevenir qualquer comportamento de arrastar
        if (e.type === 'touchstart' || e.type === 'touchmove') {
            e.preventDefault();
        }
        
        toggleMenu();
        return false;
    };
    
    // Adicionar múltiplos tipos de eventos para garantir
    hamburgerEl.addEventListener('click', hamburgerClickHandler, { passive: false });
    hamburgerEl.addEventListener('touchend', hamburgerClickHandler, { passive: false });
    
    // Também adicionar via onclick como fallback
    hamburgerEl.onclick = hamburgerClickHandler;
    
    // Prevenir arrastar
    const touchStartHandler = function(e) {
        e.stopPropagation();
    };
    
    const touchMoveHandler = function(e) {
        e.preventDefault();
        e.stopPropagation();
    };
    
    hamburgerEl.addEventListener('touchstart', touchStartHandler, { passive: false });
    hamburgerEl.addEventListener('touchmove', touchMoveHandler, { passive: false });
    
    // Marcar como inicializado
    hamburgerEl.dataset.initialized = 'true';
    hamburgerInitialized = true;
    
    // Garantir que está visível no mobile
    ensureHamburgerVisible();
    
    return true;
}

// Inicializar quando DOM estiver pronto
function setupHamburgerMenu() {
    // Resetar flag quando tentar inicializar novamente (útil após navegação)
    const elements = getNavElements();
    if (elements.hamburger && !elements.hamburger.dataset.initialized) {
        hamburgerInitialized = false;
    }
    
    let initialized = initHamburger();
    
    // Se não inicializou, tentar novamente múltiplas vezes
    if (!initialized) {
        const attempts = [100, 300, 500, 1000, 2000];
        attempts.forEach(delay => {
            setTimeout(() => {
                initHamburger();
            }, delay);
        });
    }
}

// Função para reinicializar após navegação
function reinitHamburgerAfterNavigation() {
    hamburgerInitialized = false;
    const elements = getNavElements();
    if (elements.hamburger) {
        elements.hamburger.dataset.initialized = 'false';
    }
    setupHamburgerMenu();
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setupHamburgerMenu();
        setTimeout(setupHamburgerMenu, 200);
        setTimeout(setupHamburgerMenu, 500);
    });
} else {
    setupHamburgerMenu();
    setTimeout(setupHamburgerMenu, 200);
    setTimeout(setupHamburgerMenu, 500);
}

// Reinicializar após navegação (quando a página carrega)
window.addEventListener('load', function() {
    setTimeout(() => {
        reinitHamburgerAfterNavigation();
    }, 100);
});

// Também tentar inicializar após um pequeno delay (fallback)
setTimeout(setupHamburgerMenu, 2000);

// Observar mudanças no DOM para reinicializar se necessário
if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function(mutations) {
        const elements = getNavElements();
        if (elements.hamburger && !elements.hamburger.dataset.initialized) {
            setTimeout(() => {
                initHamburger();
            }, 100);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Escutar evento customizado para reinicializar
window.addEventListener('reinitHamburger', function() {
    reinitHamburgerAfterNavigation();
});

// Reinicializar quando a página fica visível novamente (útil para navegação)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        setTimeout(() => {
            reinitHamburgerAfterNavigation();
        }, 100);
    }
});

// Verificar periodicamente se o hamburger precisa ser reinicializado
setInterval(function() {
    const elements = getNavElements();
    if (elements.hamburger) {
        // Se o hamburger existe mas não tem o handler anexado, reinicializar
        if (!elements.hamburger.dataset.initialized || elements.hamburger.dataset.initialized === 'false') {
            initHamburger();
        }
        
        // Testar se o clique funciona (verificar se há listeners)
        const hasClickHandler = elements.hamburger.onclick !== null;
        if (!hasClickHandler && elements.hamburger.dataset.initialized === 'true') {
            // Se marcado como inicializado mas não tem handler, reinicializar
            reinitHamburgerAfterNavigation();
        }
    }
}, 2000);

// Submenu Toggle para Mobile e Desktop
function setupSubmenus() {
    // Configurar listeners para submenus principais
    document.querySelectorAll('.has-submenu > .nav-link').forEach(link => {
        // Verificar se já tem listener configurado
        if (!link.dataset.submenuConfigured) {
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
            
            link.dataset.submenuConfigured = 'true';
        }
    });
    
    // Configurar sub-submenus também (Sibelius dentro de Repertório)
    document.querySelectorAll('.submenu .has-submenu > .nav-link').forEach(link => {
        // Verificar se já tem listener configurado
        if (!link.dataset.subsubmenuConfigured) {
            link.addEventListener('click', function(e) {
                e.stopPropagation(); // Importante: não propagar para o submenu pai
                
                const parentLi = this.closest('li');
                const href = this.getAttribute('href');
                
                if (href === '#' || !href) {
                    e.preventDefault();
                    
                    const isActive = parentLi.classList.contains('active');
                    
                    // Toggle do sub-submenu atual (não fechar outros submenus, apenas este)
                    if (!isActive) {
                        parentLi.classList.add('active');
                        this.setAttribute('aria-expanded', 'true');
                    } else {
                        parentLi.classList.remove('active');
                        this.setAttribute('aria-expanded', 'false');
                    }
                } else {
                    // Se tem href válido, fecha apenas este sub-submenu e navega
                    parentLi.classList.remove('active');
                    this.setAttribute('aria-expanded', 'false');
                    setTimeout(() => {
                        closeMenu();
                    }, 100);
                }
            });
            
            link.dataset.subsubmenuConfigured = 'true';
        }
    });
}

// Inicializar submenus quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setupSubmenus();
        setTimeout(setupSubmenus, 300);
    });
} else {
    setupSubmenus();
    setTimeout(setupSubmenus, 300);
}

// Reinicializar submenus após navegação
window.addEventListener('load', function() {
    setTimeout(() => {
        setupSubmenus();
    }, 200);
});

// Observar mudanças no DOM para reinicializar submenus
if (typeof MutationObserver !== 'undefined') {
    const submenuObserver = new MutationObserver(function(mutations) {
        const hasSubmenuLinks = document.querySelectorAll('.has-submenu > .nav-link');
        if (hasSubmenuLinks.length > 0) {
            // Verificar se algum link não tem listener
            let needsReinit = false;
            hasSubmenuLinks.forEach(link => {
                if (!link.dataset.submenuConfigured) {
                    needsReinit = true;
                }
            });
            
            if (needsReinit) {
                setTimeout(() => {
                    setupSubmenus();
                }, 100);
            }
        }
    });
    
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        submenuObserver.observe(navMenu, {
            childList: true,
            subtree: true
        });
    }
}

// Verificar periodicamente se os submenus precisam ser configurados
setInterval(function() {
    const hasSubmenuLinks = document.querySelectorAll('.has-submenu > .nav-link');
    let needsSetup = false;
    
    hasSubmenuLinks.forEach(link => {
        if (!link.dataset.submenuConfigured) {
            needsSetup = true;
        }
    });
    
    if (needsSetup) {
        setupSubmenus();
    }
}, 3000);

// Fechar menu ao clicar em links de navegação
function setupNavLinks() {
    navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Não remover listeners de links com submenu (eles são tratados separadamente)
        const parentLi = link.closest('li');
        const isSubmenuToggle = parentLi && parentLi.classList.contains('has-submenu');
        const isSubmenuLink = link.closest('.submenu, .sub-submenu');
        
        // Apenas configurar listeners para links que não são submenu toggles e não estão dentro de submenus
        if (!isSubmenuToggle && !isSubmenuLink) {
            // Verificar se já tem listener configurado
            if (!link.dataset.navLinkConfigured) {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    if (href && href !== '#') {
                        // Fechar menu antes de navegar
                        closeMenu();
                        
                        // Se é um link para outra página, reinicializar o hamburger após navegação
                        if (href.includes('.html') || href.startsWith('http')) {
                            // Marcar para reinicialização
                            setTimeout(() => {
                                window.dispatchEvent(new Event('reinitHamburger'));
                            }, 500);
                        }
                    }
                });
                
                link.dataset.navLinkConfigured = 'true';
            }
        }
    });
    
    // Após configurar links, garantir que submenus também estão configurados
    setTimeout(() => {
        setupSubmenus();
    }, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    setupNavLinks();
    
    // Reinicializar links após um delay para garantir
    setTimeout(setupNavLinks, 500);
});

// Também configurar quando novos links são adicionados ao DOM
if (typeof MutationObserver !== 'undefined') {
    const navLinksObserver = new MutationObserver(function(mutations) {
        const currentNavLinks = document.querySelectorAll('.nav-link');
        if (currentNavLinks.length > 0 && (!navLinks || currentNavLinks.length !== navLinks.length)) {
            setTimeout(() => {
                setupNavLinks();
                setupSubmenus(); // Garantir que submenus também sejam configurados
            }, 100);
        }
    });
    
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navLinksObserver.observe(navMenu, {
            childList: true,
            subtree: true
        });
    }
}

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

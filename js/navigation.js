// =========================================================
// NAVIGATION MODULE - VERSÃO SIMPLES E FUNCIONAL
// =========================================================

(function() {
    'use strict';

    // Variáveis
    let hamburger = null;
    let navMenu = null;
    let overlay = null;

    // Obter elementos
    function getElements() {
        hamburger = document.getElementById('hamburger');
        navMenu = document.getElementById('navMenu');
        overlay = document.querySelector('.menu-overlay');
    }

    // Criar overlay
    function createOverlay() {
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'menu-overlay';
            document.body.appendChild(overlay);
        }
        return overlay;
    }

    // Verificar se é mobile
    function isMobile() {
        return window.innerWidth <= 968;
    }

    // Fechar todos os submenus
    function closeAllSubmenus() {
        document.querySelectorAll('.has-submenu').forEach(li => {
            li.classList.remove('active');
            const link = li.querySelector('.nav-link');
            if (link) {
                link.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Toggle do menu hambúrguer
    function toggleMenu() {
        getElements();
        
        if (!hamburger || !navMenu) return;

        const isOpen = navMenu.classList.contains('active');
        
        if (isOpen) {
            // Fechar
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            if (overlay) {
                overlay.classList.remove('active');
            }
            document.body.style.overflow = '';
            closeAllSubmenus();
        } else {
            // Abrir
            navMenu.classList.add('active');
            hamburger.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            const overlayEl = createOverlay();
            overlayEl.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Configurar submenus principais (Repertório, Eventos)
    function setupMainSubmenus() {
        const links = document.querySelectorAll('.nav-menu > .has-submenu > .nav-link');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Se tem link válido, permitir navegação
                if (href && href !== '#') {
                    if (isMobile()) {
                        setTimeout(() => toggleMenu(), 100);
                    }
                    return;
                }
                
                // Se é link vazio, fazer toggle do submenu
                e.preventDefault();
                e.stopPropagation();
                
                const parentLi = this.closest('li.has-submenu');
                if (!parentLi) return;
                
                const isActive = parentLi.classList.contains('active');
                
                // No mobile, fazer toggle
                if (isMobile()) {
                    // Fechar outros submenus
                    document.querySelectorAll('.nav-menu > .has-submenu').forEach(sibling => {
                        if (sibling !== parentLi) {
                            sibling.classList.remove('active');
                            const siblingLink = sibling.querySelector('.nav-link');
                            if (siblingLink) {
                                siblingLink.setAttribute('aria-expanded', 'false');
                            }
                            // Fechar sub-submenus também
                            sibling.querySelectorAll('.has-submenu').forEach(subLi => {
                                subLi.classList.remove('active');
                                const subLink = subLi.querySelector('.nav-link');
                                if (subLink) {
                                    subLink.setAttribute('aria-expanded', 'false');
                                }
                            });
                        }
                    });
                    
                    // Toggle do submenu atual
                    if (isActive) {
                        parentLi.classList.remove('active');
                        this.setAttribute('aria-expanded', 'false');
                    } else {
                        parentLi.classList.add('active');
                        this.setAttribute('aria-expanded', 'true');
                    }
                }
            });
        });
    }

    // Configurar sub-submenus (Sibelius)
    function setupSubSubmenus() {
        const links = document.querySelectorAll('.submenu .has-submenu > .nav-link');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Se tem link válido, permitir navegação
                if (href && href !== '#') {
                    if (isMobile()) {
                        setTimeout(() => toggleMenu(), 100);
                    }
                    return;
                }
                
                // Se é link vazio, fazer toggle do sub-submenu
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                const parentLi = this.closest('li.has-submenu');
                if (!parentLi) return;
                
                const isActive = parentLi.classList.contains('active');
                
                // No mobile, fazer toggle
                if (isMobile()) {
                    if (isActive) {
                        parentLi.classList.remove('active');
                        this.setAttribute('aria-expanded', 'false');
                    } else {
                        parentLi.classList.add('active');
                        this.setAttribute('aria-expanded', 'true');
                    }
                }
            }, true);
        });
    }

    // Configurar eventos
    function setupEvents() {
        getElements();
        
        // Hambúrguer
        if (hamburger) {
            hamburger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleMenu();
            });
            
            hamburger.addEventListener('touchend', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleMenu();
            });
        }
        
        // Overlay
        const overlayEl = createOverlay();
        overlayEl.addEventListener('click', function() {
            toggleMenu();
        });
        
        // Links normais (sem submenu)
        const regularLinks = document.querySelectorAll('.nav-link:not(.has-submenu > .nav-link):not(.submenu .has-submenu > .nav-link)');
        regularLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (isMobile() && navMenu && navMenu.classList.contains('active')) {
                    setTimeout(() => toggleMenu(), 100);
                }
            });
        });
        
        // ESC para fechar
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
        
        // Resize - fechar no desktop
        window.addEventListener('resize', function() {
            if (!isMobile() && navMenu && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Scroll effect
    function setupScrollEffect() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // Inicializar
    function init() {
        getElements();
        createOverlay();
        setupEvents();
        setupMainSubmenus();
        setupSubSubmenus();
        setupScrollEffect();
    }

    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Reinicializar após load
    window.addEventListener('load', function() {
        setTimeout(init, 100);
    });

    // Exportar para uso global
    window.Navigation = {
        toggleMenu: toggleMenu,
        closeMenu: toggleMenu,
        openMenu: toggleMenu
    };
})();

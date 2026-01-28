// =========================================================
// NAVIGATION MODULE - VERSÃO REFATORADA E LIMPA
// =========================================================

(function() {
    'use strict';

    // =========================================================
    // VARIÁVEIS GLOBAIS DO MÓDULO
    // =========================================================
    let hamburger = null;
    let navMenu = null;
    let overlay = null;
    let isInitialized = false;
    let escHandler = null;
    let resizeHandler = null;
    let mutationObserver = null;

    // =========================================================
    // FUNÇÕES AUXILIARES
    // =========================================================

    /**
     * Obtém referências atualizadas dos elementos do menu
     */
    function getElements() {
        hamburger = document.getElementById('hamburger');
        navMenu = document.getElementById('navMenu');
        overlay = document.querySelector('.menu-overlay');
        return { hamburger, navMenu, overlay };
    }

    /**
     * Cria o overlay (fundo escuro) se não existir
     */
    function createOverlay() {
        // Verificar se já existe no DOM
        overlay = document.querySelector('.menu-overlay');
        
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'menu-overlay';
            overlay.setAttribute('aria-hidden', 'true');
            document.body.appendChild(overlay);
        }
        
        return overlay;
    }

    /**
     * Verifica se está em modo mobile
     */
    function isMobile() {
        return window.innerWidth <= 968;
    }

    /**
     * Fecha todos os submenus
     */
    function closeAllSubmenus() {
        document.querySelectorAll('.has-submenu').forEach(li => {
            li.classList.remove('active');
            const link = li.querySelector('.nav-link');
            if (link) {
                link.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // =========================================================
    // FUNÇÃO PRINCIPAL: TOGGLE DO MENU
    // =========================================================

    /**
     * Abre ou fecha o menu hambúrguer
     * @param {boolean} forceClose - Se true, força o fechamento
     */
    function toggleMenu(forceClose = false) {
        const elements = getElements();
        if (!elements.hamburger || !elements.navMenu) return;

        // Se forceClose for true, sempre fechar
        if (forceClose) {
            // Fechar menu
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            
            // Esconder overlay
            if (overlay) {
                overlay.classList.remove('active');
                overlay.setAttribute('aria-hidden', 'true');
            }
            
            // Liberar scroll do body
            document.body.style.overflow = '';
            
            // Fechar todos os submenus
            closeAllSubmenus();
            return;
        }

        // Caso contrário, fazer toggle normal
        const isOpen = navMenu.classList.contains('active');
        
        if (isOpen) {
            // Fechar menu
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            
            // Esconder overlay
            if (overlay) {
                overlay.classList.remove('active');
                overlay.setAttribute('aria-hidden', 'true');
            }
            
            // Liberar scroll do body
            document.body.style.overflow = '';
            
            // Fechar todos os submenus
            closeAllSubmenus();
        } else {
            // Abrir menu
            navMenu.classList.add('active');
            hamburger.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            
            // Criar e mostrar overlay
            const overlayEl = createOverlay();
            overlayEl.classList.add('active');
            overlayEl.setAttribute('aria-hidden', 'false');
            
            // Travar scroll do body
            document.body.style.overflow = 'hidden';
        }
    }

    // =========================================================
    // CONFIGURAÇÃO DE SUBMENUS
    // =========================================================

    /**
     * Configura os event listeners para submenus principais (Repertório, Eventos)
     * No mobile: funciona com clique
     * No desktop: funciona com hover (CSS)
     */
    function setupMainSubmenus() {
        const mainSubmenuLinks = document.querySelectorAll('.nav-menu > .has-submenu > .nav-link');
        
        mainSubmenuLinks.forEach(link => {
            // Remover listeners antigos se existirem
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Adicionar novo listener (funciona tanto no mobile quanto no desktop)
            newLink.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Se não for link vazio, permitir navegação normal
                if (href && href !== '#') {
                    // No mobile, fechar menu após navegação
                    if (isMobile()) {
                        setTimeout(() => toggleMenu(true), 100);
                    }
                    return; // Deixar navegação normal acontecer
                }
                
                // Prevenir comportamento padrão de links vazios (evitar scroll para topo)
                // No desktop, o hover CSS já cuida da visualização
                // No mobile, fazer toggle do submenu
                e.preventDefault();
                
                if (!isMobile()) {
                    // No desktop, apenas prevenir scroll, hover CSS já funciona
                    e.stopPropagation();
                    return;
                }
                
                // No mobile, fazer toggle
                e.stopPropagation();
                
                const parentLi = this.closest('li.has-submenu');
                if (!parentLi) return;
                
                const isActive = parentLi.classList.contains('active');
                
                // Fechar outros submenus principais no mesmo nível (apenas no mobile)
                if (isMobile()) {
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
                }
                
                // Toggle do submenu atual (apenas no mobile)
                if (isMobile()) {
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

    /**
     * Configura os event listeners para sub-submenus (Sibelius > Computador/iOS/Android)
     * No mobile: funciona com clique
     * No desktop: funciona com hover (CSS)
     */
    function setupSubSubmenus() {
        const subSubmenuLinks = document.querySelectorAll('.submenu .has-submenu > .nav-link');
        
        subSubmenuLinks.forEach(link => {
            // Remover listeners antigos se existirem
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Adicionar novo listener
            newLink.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Se não for link vazio, permitir navegação normal
                if (href && href !== '#') {
                    // Fechar menu após navegação no mobile
                    if (isMobile()) {
                        setTimeout(() => toggleMenu(true), 100);
                    }
                    return;
                }
                
                // Prevenir comportamento padrão de links vazios (evitar scroll para topo)
                // No desktop, o hover CSS já cuida da visualização
                // No mobile, fazer toggle do sub-submenu
                e.preventDefault();
                
                if (!isMobile()) {
                    // No desktop, apenas prevenir scroll, hover CSS já funciona
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    return;
                }
                
                // No mobile, fazer toggle
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                const parentLi = this.closest('li.has-submenu');
                if (!parentLi) return;
                
                const isActive = parentLi.classList.contains('active');
                
                // Toggle do sub-submenu atual (apenas no mobile)
                if (isMobile()) {
                    if (isActive) {
                        parentLi.classList.remove('active');
                        this.setAttribute('aria-expanded', 'false');
                    } else {
                        parentLi.classList.add('active');
                        this.setAttribute('aria-expanded', 'true');
                    }
                }
            }, true); // Usar capture phase para garantir prioridade
        });
    }

    /**
     * Configura todos os submenus
     */
    function setupSubmenus() {
        setupSubSubmenus(); // Configurar primeiro para ter prioridade
        setupMainSubmenus(); // Depois configurar submenus principais
    }

    // =========================================================
    // CONFIGURAÇÃO DE EVENTOS
    // =========================================================

    /**
     * Configura todos os event listeners
     */
    function setupEvents() {
        const elements = getElements();
        
        // Event listener do hambúrguer
        if (elements.hamburger) {
            // Remover listeners antigos
            const newHamburger = elements.hamburger.cloneNode(true);
            elements.hamburger.parentNode.replaceChild(newHamburger, elements.hamburger);
            hamburger = newHamburger;
            
            // Adicionar novos listeners
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
        
        // Event listener do overlay
        const overlayEl = createOverlay();
        overlayEl.addEventListener('click', function() {
            toggleMenu(true);
        });
        
        // Fechar menu ao clicar em links normais (sem submenu)
        // Remover listeners antigos primeiro para evitar duplicação
        const regularLinks = document.querySelectorAll('.nav-link:not(.has-submenu > .nav-link):not(.submenu .has-submenu > .nav-link)');
        regularLinks.forEach(link => {
            // Clonar para remover listeners antigos
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Adicionar novo listener
            newLink.addEventListener('click', function() {
                if (isMobile() && navMenu && navMenu.classList.contains('active')) {
                    setTimeout(() => toggleMenu(true), 100);
                }
            });
        });
        
        // Fechar menu com tecla ESC (usar uma função nomeada para poder remover depois)
        if (!escHandler) {
            escHandler = function(e) {
                if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
                    toggleMenu(true);
                }
            };
            document.addEventListener('keydown', escHandler);
        }
        
        // Fechar menu ao redimensionar para desktop (usar uma função nomeada)
        if (!resizeHandler) {
            resizeHandler = function() {
                if (!isMobile() && navMenu && navMenu.classList.contains('active')) {
                    toggleMenu(true);
                }
            };
            window.addEventListener('resize', resizeHandler);
        }
    }

    // =========================================================
    // SCROLL DA NAVBAR
    // =========================================================

    /**
     * Adiciona efeito visual ao scroll
     */
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

    // =========================================================
    // INICIALIZAÇÃO
    // =========================================================

    /**
     * Inicializa o módulo de navegação
     */
    function init() {
        if (isInitialized) return;
        
        getElements();
        createOverlay();
        setupEvents();
        setupSubmenus();
        setupScrollEffect();
        
        isInitialized = true;
    }

    // =========================================================
    // REINICIALIZAÇÃO APÓS NAVEGAÇÃO
    // =========================================================

    /**
     * Reinicializa o menu após mudanças no DOM
     */
    function reinit() {
        isInitialized = false;
        init();
    }

    // =========================================================
    // EVENT LISTENERS DE INICIALIZAÇÃO
    // =========================================================

    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Reinicializar após carregamento completo
    window.addEventListener('load', function() {
        setTimeout(reinit, 100);
    });

    // Reinicializar quando visibilidade da página mudar
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            setTimeout(reinit, 100);
        }
    });

    // Observar mudanças no DOM para reinicializar se necessário
    if ('MutationObserver' in window && !mutationObserver) {
        mutationObserver = new MutationObserver(function(mutations) {
            let shouldReinit = false;
            mutations.forEach(function(mutation) {
                // Só reinicializar se elementos importantes foram adicionados/removidos
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1 && (
                            node.id === 'hamburger' || 
                            node.id === 'navMenu' || 
                            node.querySelector && (node.querySelector('#hamburger') || node.querySelector('#navMenu'))
                        )) {
                            shouldReinit = true;
                        }
                    });
                }
            });
            if (shouldReinit) {
                setTimeout(reinit, 100);
            }
        });
        
        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // =========================================================
    // EXPORTS
    // =========================================================

    // Exportar funções para uso global se necessário
    window.Navigation = {
        toggleMenu: toggleMenu,
        closeMenu: function() { toggleMenu(true); },
        openMenu: function() { toggleMenu(false); },
        reinit: reinit
    };
})();

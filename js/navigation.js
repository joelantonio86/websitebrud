// =========================================================
// NAVIGATION MODULE - VERSÃO FINAL OTIMIZADA
// =========================================================

document.addEventListener('DOMContentLoaded', function() {
    // 1. REFERÊNCIAS TOTAIS
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    let overlay = document.querySelector('.menu-overlay');

    // 2. CRIAÇÃO DO OVERLAY (Fundo Escuro)
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }

    // 3. FUNÇÃO PRINCIPAL: TOGGLE MENU
    function toggleMenu(forceClose = false) {
        const isOpen = forceClose ? false : !navMenu.classList.contains('active');
        
        if (isOpen) {
            navMenu.classList.add('active');
            hamburger.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Trava o scroll do site
        } else {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = ''; // Libera o scroll
            closeAllSubmenus();
        }
    }

    // 4. FUNÇÃO: FECHAR SUBMENUS
    function closeAllSubmenus() {
        document.querySelectorAll('.has-submenu').forEach(li => {
            li.classList.remove('active');
            const link = li.querySelector('.nav-link');
            if (link) link.setAttribute('aria-expanded', 'false');
        });
    }

    // 5. CONFIGURAÇÃO DE SUBMENUS (MOBILE)
    function setupSubmenus() {
        const submenuLinks = document.querySelectorAll('.has-submenu > .nav-link');
        
        submenuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const isMobile = window.innerWidth <= 968;
                const href = this.getAttribute('href');

                if (isMobile || href === '#' || !href) {
                    const parentLi = this.parentElement;
                    const isActive = parentLi.classList.contains('active');

                    // Se for link vazio ou se o menu estiver fechado, impede a navegação
                    if (href === '#' || !isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                    }

                    // Efeito Acordeão: Fecha outros submenus no mesmo nível
                    const siblings = parentLi.parentElement.querySelectorAll(':scope > .has-submenu');
                    siblings.forEach(sib => {
                        if (sib !== parentLi) sib.classList.remove('active');
                    });

                    parentLi.classList.toggle('active');
                }
            });
        });
    }

    // 6. EVENTOS DE CLIQUE
    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    overlay.addEventListener('click', () => toggleMenu(true));

    // Fechar ao clicar em links normais (que não têm submenus)
    const singleLinks = document.querySelectorAll('.nav-link:not(.has-submenu > .nav-link)');
    singleLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 968) toggleMenu(true);
        });
    });

    // 7. SCROLL DA NAVBAR (EFEITO VISUAL)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // 8. TECLA ESC PARA FECHAR
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') toggleMenu(true);
    });

    // INICIALIZAÇÃO
    setupSubmenus();
});
// =========================================================
// NAVIGATION MODULE
// =========================================================

// Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
export let navLinks = null;

// Garantir que hamburger sempre fique visível no mobile
function ensureHamburgerVisible() {
    if (hamburger && window.innerWidth <= 768) {
        hamburger.style.display = 'flex';
        hamburger.style.visibility = 'visible';
        hamburger.style.opacity = '1';
        hamburger.style.position = 'relative';
        hamburger.style.setProperty('display', 'flex', 'important');
        hamburger.style.setProperty('visibility', 'visible', 'important');
        hamburger.style.setProperty('opacity', '1', 'important');
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
        if (hamburger && window.innerWidth <= 768) {
            const computedStyle = window.getComputedStyle(hamburger);
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
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
    // Fechar todos os submenus também
    closeAllSubmenus();
}

// Função para abrir/fechar o menu
function toggleMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Se está fechando o menu, fechar todos os submenus também
        if (!navMenu.classList.contains('active')) {
            closeAllSubmenus();
        }
    }
}

// Toggle do menu hamburger
if (hamburger) {
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
}

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
    if (!navMenu || !hamburger) return;
    
    const isClickInsideMenu = navMenu.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);
    const isClickOnSubmenuToggle = e.target.closest('.has-submenu > .nav-link[href="#"]');
    const isClickOnSubmenu = e.target.closest('.submenu, .sub-submenu');
    
    // Se clicou fora do menu e não é o hamburger ou toggle de submenu
    if (!isClickInsideMenu && !isClickOnHamburger && !isClickOnSubmenuToggle && !isClickOnSubmenu) {
        // Fechar todos os submenus (mesmo se o menu hamburger não estiver aberto)
        closeAllSubmenus();
        
        // Fechar menu hamburger se estiver aberto
        if (navMenu.classList.contains('active')) {
            closeMenu();
        }
    }
}, true);

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
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
        if (navMenu && navMenu.classList.contains('active')) {
            closeMenu();
            e.preventDefault();
        }
    }
});

// Exportar funções e variáveis para uso em outros módulos
export { closeMenu, toggleMenu, ensureHamburgerVisible, closeAllSubmenus, navLinks };

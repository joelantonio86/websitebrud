// Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
let navLinks = null;

// Garantir que hamburger sempre fique visível no mobile
function ensureHamburgerVisible() {
    if (hamburger && window.innerWidth <= 768) {
        hamburger.style.display = 'flex';
        hamburger.style.visibility = 'visible';
        hamburger.style.opacity = '1';
        hamburger.style.position = 'relative';
        // Forçar com !important via setProperty
        hamburger.style.setProperty('display', 'flex', 'important');
        hamburger.style.setProperty('visibility', 'visible', 'important');
        hamburger.style.setProperty('opacity', '1', 'important');
    }
}

// Verificar na inicialização
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        ensureHamburgerVisible();
        // Verificar novamente após um pequeno delay para garantir
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

// Toggle do menu hamburger - Garantir que funcione mesmo após DOM carregar
let hamburgerInitialized = false;

function initHamburger() {
    const hamburgerEl = document.getElementById('hamburger');
    if (hamburgerEl && !hamburgerInitialized) {
        hamburgerInitialized = true;
        
        // Adicionar event listener
        hamburgerEl.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            toggleMenu();
        });
        
        // Também adicionar via onclick como fallback
        hamburgerEl.onclick = function(e) {
            e.stopPropagation();
            e.preventDefault();
            toggleMenu();
        };
    }
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initHamburger();
        setTimeout(initHamburger, 100);
    });
} else {
    initHamburger();
    setTimeout(initHamburger, 100);
}

// Também tentar inicializar após um pequeno delay (fallback)
setTimeout(initHamburger, 500);

// Submenu Toggle para Mobile e Desktop
document.querySelectorAll('.has-submenu > .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const parentLi = this.closest('li');
        const href = this.getAttribute('href');
        
        // Se o link é apenas #, faz toggle do submenu
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

// Fechar menu ao clicar em links de navegação (exceto submenu toggle)
document.addEventListener('DOMContentLoaded', function() {
    navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const parentLi = this.closest('li');
            const isSubmenuToggle = parentLi && parentLi.classList.contains('has-submenu') && (href === '#' || !href);
            
            // Se não é um toggle de submenu e tem href válido, fecha o menu
            if (!isSubmenuToggle && href && href !== '#') {
                // Pequeno delay para permitir navegação
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
    
    // Garantir que o hamburger sempre fique visível no mobile
    ensureHamburgerVisible();
    
    lastScroll = currentScroll;
}, { passive: true });

// Otimização de carregamento da imagem hero
const heroImage = document.querySelector('.hero-background-image');
if (heroImage) {
    // Forçar visibilidade inicial
    heroImage.style.opacity = '1';
    heroImage.style.display = 'block';
    
    // Se a imagem já está carregada (cache do navegador)
    if (heroImage.complete && heroImage.naturalHeight !== 0) {
        heroImage.classList.add('loaded');
        heroImage.style.opacity = '1';
    } else {
        // Aguardar carregamento
        heroImage.addEventListener('load', function() {
            this.classList.add('loaded');
            this.style.opacity = '1';
        });
        // Fallback caso o evento load não dispare
        heroImage.addEventListener('error', function() {
            this.style.opacity = '1'; // Mostrar mesmo se houver erro
        });
    }
}

// Smooth scroll for navigation links (apenas para links internos)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Se o link contém index.html, é um link externo, não prevenir default
        if (href.includes('index.html')) {
            return; // Deixa o navegador seguir o link normalmente
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animated counter for stats - Melhorado com easing e efeito suave
const animateCounter = (element, target, duration = 2500, delay = 0) => {
    // Garantir que começa em 0
    element.textContent = '0';
    
    setTimeout(() => {
        let start = 0;
        const startTime = Date.now();
        let lastValue = 0;
        
        // Função de easing (ease-out)
        const easeOutQuart = (t) => {
            return 1 - Math.pow(1 - t, 4);
        };
        
        const updateCounter = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Aplicar easing
            const easedProgress = easeOutQuart(progress);
            const current = Math.floor(start + (target - start) * easedProgress);
            
            // Só atualizar se o valor mudou (melhora performance)
            if (current !== lastValue) {
                element.textContent = current;
                lastValue = current;
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Garantir que termina no valor exato
                element.textContent = target;
                // Adicionar classe para efeito final
                element.classList.add('finished');
                // Remover classe após animação
                setTimeout(() => {
                    element.classList.remove('finished');
                }, 600);
            }
        };
        
        updateCounter();
    }, delay);
};

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    if (!stat.classList.contains('animated')) {
                        stat.classList.add('animated');
                        // Adicionar delay progressivo para efeito cascata (100ms entre cada)
                        const delay = index * 150;
                        animateCounter(stat, target, 2500, delay);
                    }
                });
            }
        }
    });
}, observerOptions);

// Observe all fade-in elements and sections
document.addEventListener('DOMContentLoaded', () => {
    // Observar seções para scroll animations
    document.querySelectorAll('section.fade-in-section').forEach(section => {
        observer.observe(section);
    });
    
    // Observar elementos individuais
    const fadeElements = document.querySelectorAll('.sobre-content, .musica-card, .show-card, .galeria-item, .contato-content, .stats');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Iniciar animação dos contadores se a seção já estiver visível
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        // Verificar se a seção já está visível na viewport
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            // Se já estiver visível, iniciar animação imediatamente
            const statNumbers = statsSection.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                const target = parseInt(stat.getAttribute('data-target'));
                if (!stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    // Pequeno delay para garantir que a página carregou completamente
                    const delay = index * 150 + 300;
                    animateCounter(stat, target, 2500, delay);
                }
            });
        } else {
            // Se não estiver visível, observar normalmente
            observer.observe(statsSection);
        }
    }
    
    // Botão Voltar ao Topo
    const backToTopButton = document.createElement('a');
    backToTopButton.href = '#home';
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.setAttribute('aria-label', 'Voltar ao topo');
    backToTopButton.setAttribute('title', 'Voltar ao topo');
    document.body.appendChild(backToTopButton);
    
    // Mostrar/ocultar botão ao rolar
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll suave ao clicar
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Filter functionality for repertório
const filterButtons = document.querySelectorAll('.filter-btn');
const musicCards = document.querySelectorAll('.musica-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        musicCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                const category = card.getAttribute('data-category');
                if (category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Form submission
const contatoForm = document.getElementById('contatoForm');

contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        assunto: document.getElementById('assunto').value,
        mensagem: document.getElementById('mensagem').value
    };
    
    // Simulate form submission
    const submitButton = contatoForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contatoForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// Music card play button
document.querySelectorAll('.play-overlay').forEach(overlay => {
    overlay.addEventListener('click', function() {
        const card = this.closest('.musica-card');
        const audio = card.querySelector('.audio-player');
        if (audio) {
            if (audio.paused) {
                audio.play();
                this.querySelector('i').classList.remove('fa-play');
                this.querySelector('i').classList.add('fa-pause');
            } else {
                audio.pause();
                this.querySelector('i').classList.remove('fa-pause');
                this.querySelector('i').classList.add('fa-play');
            }
        }
    });
});

// Audio player controls
document.querySelectorAll('.audio-player').forEach(audio => {
    audio.addEventListener('play', function() {
        // Pause all other audio players
        document.querySelectorAll('.audio-player').forEach(otherAudio => {
            if (otherAudio !== this && !otherAudio.paused) {
                otherAudio.pause();
            }
        });
    });
});

// Gallery lightbox effect
document.querySelectorAll('.galeria-item').forEach(item => {
    item.addEventListener('click', function() {
        const image = this.querySelector('.image-placeholder');
        // Simulate lightbox
        // In a real implementation, you would show a modal with the full image
        console.log('Galeria item clicked - implementar lightbox aqui');
    });
});

// Download all partituras button
document.querySelectorAll('.download-all-btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.musica-card');
        const partituras = card.querySelectorAll('.partitura-link');
        const musicName = card.querySelector('h3').textContent;
        
        // Simulate download
        alert(`Baixando todas as partituras de "${musicName}"...\n\n(Em produção, isso baixaria todos os arquivos PDF)`);
        
        // In a real implementation, you would trigger downloads for all PDFs
        partituras.forEach(link => {
            console.log('Download:', link.href);
        });
    });
});

// Active navigation link highlighting (apenas na página principal)
const sections = document.querySelectorAll('section[id]');

if (sections.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');
            // Verifica se é link interno (#) ou se está na página atual
            if (href === `#${current}` || (href.includes(current) && !href.includes('index.html'))) {
                link.classList.add('active');
            }
        });
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Parallax effect para imagem destacada
    const parallaxImage = document.querySelector('.parallax-image');
    if (parallaxImage) {
        const rect = parallaxImage.closest('section').getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.3;
            const yPos = -(rect.top * speed);
            parallaxImage.style.transform = `translateY(${yPos}px)`;
        }
    }
});

// Add active class to nav links on page load
window.addEventListener('load', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const hash = window.location.hash;
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Se o link aponta para a página atual, marca como ativo
        if (href.includes(currentPage) || (currentPage === 'index.html' && href.startsWith('#'))) {
            link.classList.add('active');
        }
    });
    
    // Se houver hash na URL, rola até a seção
    if (hash) {
        setTimeout(() => {
            const target = document.querySelector(hash);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});

// Keyboard navigation support - ESC fecha submenus e menu
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

// Performance optimization: Lazy load images (when real images are added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    // This will work when real images are added with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Phone number formatting
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            }
            e.target.value = value;
        }
    });
}

// Console message
console.log('%c🎵 Banda Racional - Cultura Racional 🎵', 'color: #FFD700; font-size: 20px; font-weight: bold;');
console.log('%cSite desenvolvido com dedicação para a Cultura Racional', 'color: #3B82F6; font-size: 14px;');
console.log('%cA verdadeira origem de tudo e de todos', 'color: #FFD700; font-size: 12px; font-style: italic;');

// =========================================================
// MAIN MODULE - Ponto de entrada principal
// =========================================================

// Importar módulos
import { closeMenu, toggleMenu, ensureHamburgerVisible, navLinks } from './navigation.js';
import { animateCounter, observer } from './animations.js';
import { setupFormValidation } from './forms.js';
import { log } from './utils.js';
import './analytics.js'; // Inicializar analytics

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Log de inicialização
    log('🎵 Banda Racional - Cultura Racional 🎵', 'color: #FFD700; font-size: 20px; font-weight: bold;');
    log('Site desenvolvido com dedicação para a Cultura Racional', 'color: #3B82F6; font-size: 14px;');
    log('A verdadeira origem de tudo e de todos', 'color: #FFD700; font-size: 12px; font-style: italic;');
    
    // Music card play button
    document.querySelectorAll('.play-overlay').forEach(overlay => {
        overlay.addEventListener('click', function() {
            const card = this.closest('.musica-card');
            const audio = card.querySelector('.audio-player');
            if (audio) {
                if (audio.paused) {
                    audio.play();
                    this.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    audio.pause();
                    this.innerHTML = '<i class="fas fa-play"></i>';
                }
            }
        });
    });
    
    // Galeria item click
    document.querySelectorAll('.galeria-item').forEach(item => {
        item.addEventListener('click', function() {
            // Implementar lightbox aqui no futuro
            log('Galeria item clicked - implementar lightbox aqui');
        });
    });
    
    // Filter functionality for repertório
    const filterButtons = document.querySelectorAll('.filter-btn');
    const musicCards = document.querySelectorAll('.musica-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
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
                        const cardCategory = card.getAttribute('data-category');
                        if (cardCategory === filter) {
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
    }
    
    // Audio player controls - pausar outros quando um toca
    document.querySelectorAll('.audio-player').forEach(audio => {
        audio.addEventListener('play', function() {
            document.querySelectorAll('.audio-player').forEach(otherAudio => {
                if (otherAudio !== this && !otherAudio.paused) {
                    otherAudio.pause();
                }
            });
        });
    });
    
    // Download all partituras button
    document.querySelectorAll('.download-all-btn').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.musica-card');
            const partituras = card.querySelectorAll('.partitura-link');
            const musicName = card.querySelector('h3').textContent;
            
            log(`Baixando todas as partituras de "${musicName}"...`);
            partituras.forEach(link => {
                log('Download:', link.href);
            });
        });
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const currentNavLinks = document.querySelectorAll('.nav-link');
    if (sections.length > 0 && currentNavLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            currentNavLinks.forEach(link => {
                const href = link.getAttribute('href');
                link.classList.remove('active');
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
        
        const currentNavLinks = document.querySelectorAll('.nav-link');
        if (currentNavLinks.length > 0) {
            currentNavLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href.includes(currentPage) || (currentPage === 'index.html' && href.startsWith('#'))) {
                    link.classList.add('active');
                }
            });
        }
        
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
    
    // Keyboard navigation support (já tratado em navigation.js)
    // Mantido para compatibilidade, mas a lógica principal está em navigation.js
    
    // Hero image - garantir que apareça imediatamente
    const heroImage = document.querySelector('.hero-background-image');
    if (heroImage) {
        // Forçar visibilidade
        heroImage.style.opacity = '1';
        heroImage.style.display = 'block';
        
        // Se já está carregada
        if (heroImage.complete && heroImage.naturalHeight !== 0) {
            heroImage.classList.add('loaded');
            heroImage.style.opacity = '1';
        } else {
            // Quando carregar
            heroImage.addEventListener('load', function() {
                this.classList.add('loaded');
                this.style.opacity = '1';
            });
            // Fallback
            heroImage.addEventListener('error', function() {
                this.style.opacity = '1';
            });
        }
    }
    
    // Lazy load images with IntersectionObserver
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
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
});

// Exportar para uso global se necessário
window.BandaRacional = {
    closeMenu,
    toggleMenu,
    ensureHamburgerVisible
};

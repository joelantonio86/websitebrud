// =========================================================
// ANIMATIONS MODULE
// =========================================================

// Animated counter for stats
const animateCounter = (element, target, duration = 2500, delay = 0) => {
    if (!element || !target || isNaN(target)) return;
    
    element.textContent = '0';
    
    setTimeout(() => {
        let start = 0;
        const startTime = Date.now();
        let lastValue = 0;
        
        const easeOutQuart = (t) => {
            return 1 - Math.pow(1 - t, 4);
        };
        
        const updateCounter = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easedProgress = easeOutQuart(progress);
            const current = Math.floor(start + (target - start) * easedProgress);
            
            if (current !== lastValue) {
                element.textContent = current;
                lastValue = current;
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
                element.classList.add('finished');
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
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer específico para estatísticas (contadores)
const statsObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statsSection = entry.target;
            const statNumbers = statsSection.querySelectorAll('.stat-number');
            
            statNumbers.forEach((stat, index) => {
                const targetAttr = stat.getAttribute('data-target');
                const target = parseInt(targetAttr);
                
                if (!stat.classList.contains('animated') && target && !isNaN(target) && target > 0) {
                    stat.classList.add('animated');
                    const delay = index * 150 + 300;
                    animateCounter(stat, target, 2500, delay);
                }
            });
        }
    });
}, statsObserverOptions);

// Função para inicializar contadores de estatísticas
const initStatsCounters = () => {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;
    
    const statNumbers = statsSection.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;
    
    // Função para animar os contadores
    const animateStats = () => {
        statNumbers.forEach((stat, index) => {
            const targetAttr = stat.getAttribute('data-target');
            const target = parseInt(targetAttr);
            
            if (!stat.classList.contains('animated') && target && !isNaN(target) && target > 0) {
                stat.classList.add('animated');
                const delay = index * 150 + 300;
                animateCounter(stat, target, 2500, delay);
            }
        });
    };
    
    // Sempre observar com o observer específico
    try {
        statsObserver.observe(statsSection);
    } catch (e) {
        // Se já estiver observando, ignorar erro
    }
    
    // Verificar se já está visível e animar imediatamente
    const checkVisibility = () => {
        const rect = statsSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const isVisible = rect.top < viewportHeight && rect.bottom > 0;
        
        if (isVisible) {
            animateStats();
        }
    };
    
    // Verificar múltiplas vezes para garantir
    setTimeout(checkVisibility, 100);
    setTimeout(checkVisibility, 500);
    setTimeout(checkVisibility, 1000);
    
    // Fallback agressivo: forçar animação após 1.5s se ainda não animou
    setTimeout(() => {
        const allAnimated = Array.from(statNumbers).every(stat => stat.classList.contains('animated'));
        if (!allAnimated) {
            animateStats();
        }
    }, 1500);
};

// Observar elementos com classe fade-in-section
const initAnimations = () => {
    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
    
    // Inicializar contadores
    initStatsCounters();
};

// Executar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    // DOM já está pronto
    initAnimations();
}

// Também executar no evento load como fallback adicional
window.addEventListener('load', () => {
    setTimeout(() => {
        initStatsCounters();
    }, 300);
});

// Fallback final: executar após um delay maior caso nada funcione
setTimeout(() => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statNumbers = statsSection.querySelectorAll('.stat-number');
        const allAnimated = Array.from(statNumbers).every(stat => stat.classList.contains('animated'));
        
        if (!allAnimated && statNumbers.length > 0) {
            // Se nenhum contador foi animado ainda, forçar animação
            statNumbers.forEach((stat, index) => {
                const targetAttr = stat.getAttribute('data-target');
                const target = parseInt(targetAttr);
                
                if (!stat.classList.contains('animated') && target && !isNaN(target) && target > 0) {
                    stat.classList.add('animated');
                    const delay = index * 150 + 300;
                    animateCounter(stat, target, 2500, delay);
                }
            });
        }
    }
}, 2000);

// Inicialização adicional quando a página estiver completamente carregada
window.addEventListener('load', () => {
    setTimeout(() => {
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            const statNumbers = statsSection.querySelectorAll('.stat-number');
            
            statNumbers.forEach((stat, index) => {
                const targetAttr = stat.getAttribute('data-target');
                const target = parseInt(targetAttr);
                const currentValue = parseInt(stat.textContent) || 0;
                
                // Se ainda não foi animado E o valor ainda é 0
                if (!stat.classList.contains('animated') && target && !isNaN(target) && target > 0 && currentValue === 0) {
                    stat.classList.add('animated');
                    const delay = index * 150 + 300;
                    animateCounter(stat, target, 2500, delay);
                }
            });
        }
    }, 500);
});

// Botão Voltar ao Topo
const initBackToTop = () => {
    // Verificar se o botão já existe
    if (document.querySelector('.back-to-top')) return;
    
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
};

// Inicializar botão voltar ao topo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackToTop);
} else {
    initBackToTop();
}

// Otimização de carregamento da imagem hero
const heroImage = document.querySelector('.hero-background-image');
if (heroImage) {
    if (heroImage.complete && heroImage.naturalHeight !== 0) {
        heroImage.classList.add('loaded');
    } else {
        heroImage.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        heroImage.addEventListener('error', function() {
            this.style.opacity = '1';
        });
    }
}

// Exportar funções
export { animateCounter, observer, statsObserver };

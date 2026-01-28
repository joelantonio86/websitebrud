// =========================================================
// ANIMATIONS MODULE
// =========================================================

// Animated counter for stats
const animateCounter = (element, target, duration = 2500, delay = 0) => {
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

// Observar elementos com classe fade-in-section
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
    
    // Observar seção de estatísticas para animar contadores
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            const statNumbers = statsSection.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                const target = parseInt(stat.getAttribute('data-target'));
                if (!stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    const delay = index * 150 + 300;
                    animateCounter(stat, target, 2500, delay);
                }
            });
        } else {
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
export { animateCounter, observer };

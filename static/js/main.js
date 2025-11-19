// Menu Mobile
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    mobileMenuBtn.addEventListener('click', function () {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Accordion FAQ
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Fechar todos os itens
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Abrir o item clicado se não estava ativo
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // CORREÇÃO DOS CONTADORES - Versão melhorada
    function initCounters() {
        const statNumbers = document.querySelectorAll('.statistics-grid .stat-number');

        if (statNumbers.length === 0) return;

        let countersAnimated = false;

        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000;
            let start = null;

            // Garantir que começa em 0
            element.textContent = '0';

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);

                // Usar easing para animação mais suave
                const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
                const current = Math.floor(easeOutQuart * target);

                element.textContent = current.toLocaleString('pt-BR');

                if (percentage < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    element.textContent = target.toLocaleString('pt-BR');
                }
            }

            window.requestAnimationFrame(step);
        }

        function checkIfCountersShouldAnimate() {
            const statisticsSection = document.querySelector('.statistics');
            if (!statisticsSection) return false;

            const rect = statisticsSection.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            // Verificar se a seção está visível (pelo menos 30% dela)
            const isVisible = (
                rect.top <= windowHeight * 0.7 &&
                rect.bottom >= windowHeight * 0.3
            );

            return isVisible;
        }

        function startCountersAnimation() {
            if (!countersAnimated) {
                statNumbers.forEach(animateCounter);
                countersAnimated = true;
            }
        }

        // Verificar se já está visível ao carregar
        if (checkIfCountersShouldAnimate()) {
            startCountersAnimation();
        }

        // Observer para quando ficar visível durante o scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    startCountersAnimation();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        const statisticsSection = document.querySelector('.statistics');
        if (statisticsSection) {
            observer.observe(statisticsSection);
        }

        // Fallback: animar após 4 segundos se nada acontecer
        setTimeout(() => {
            if (!countersAnimated) {
                startCountersAnimation();
            }
        }, 4000);
    }

    // Inicializar contadores
    initCounters();

    // Gráfico de estatísticas
    const ctx = document.getElementById('statisticsChart');

    if (ctx) {
        new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Casos estimados (2023-2025)', 'Posição entre cânceres', 'Chance de cura (%)', 'Homens afetados (1 em cada)'],
                datasets: [{
                    label: 'Estatísticas do Câncer de Próstata',
                    data: [71730, 2, 90, 9],
                    backgroundColor: [
                        'rgba(74, 144, 226, 0.7)',
                        'rgba(42, 112, 194, 0.7)',
                        'rgba(26, 60, 92, 0.7)',
                        'rgba(44, 90, 138, 0.7)'
                    ],
                    borderColor: [
                        'rgb(74, 144, 226)',
                        'rgb(42, 112, 194)',
                        'rgb(26, 60, 92)',
                        'rgb(44, 90, 138)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Estatísticas do Câncer de Próstata no Brasil',
                        font: {
                            size: 16,
                            family: 'Montserrat'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                if (value >= 1000) {
                                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                }
                                return value;
                            }
                        }
                    }
                }
            }
        });
    }

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação de entrada para elementos
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.card, .stat-card, .accordion-item');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Configurar elementos para animação
    document.querySelectorAll('.card, .stat-card, .accordion-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    // Executar uma vez no carregamento para elementos já visíveis
    animateOnScroll();
});

// Lazy Loading para imagens
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Chamar no DOMContentLoaded
initLazyLoading();
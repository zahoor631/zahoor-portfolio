import { onMounted, onUnmounted } from 'vue';

export function useScrollAnimation() {
    let observer = null;

    const initObserver = () => {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated-in');
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        document.querySelectorAll('.scroll-animate').forEach((el) => {
            observer.observe(el);
        });
    };

    onMounted(() => {
        setTimeout(initObserver, 100);
    });

    onUnmounted(() => {
        if (observer) observer.disconnect();
    });
}

export function countUp(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    const isDecimal = target.toString().includes('.');

    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * eased;

        element.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = isDecimal ? target.toFixed(2) : target;
        }
    };

    requestAnimationFrame(update);
}
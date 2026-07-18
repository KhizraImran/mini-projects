import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

export function useParticles(containerId: string) {
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    const count = 7;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.classList.add('particle');

      const size = Math.random() * 5 + 3;
      const left = Math.random() * 90 + 5;
      const duration = Math.random() * 8 + 8;
      const delay = Math.random() * -14;
      const drift = (Math.random() - 0.5) * 80;
      const opacity = (Math.random() * 0.2 + 0.3).toFixed(2);

      dot.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        bottom: 0;
        --dur: ${duration}s;
        --delay: ${delay}s;
        --drift: ${drift}px;
        --max-opacity: ${opacity};
      `;

      container.appendChild(dot);
    }

    return () => {
      if (container) container.innerHTML = '';
    };
  }, [containerId]);
}

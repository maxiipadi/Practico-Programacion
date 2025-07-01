document.addEventListener('DOMContentLoaded', () => {
    const elementosAnimados = document.querySelectorAll('.animar-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Deja de observarlo una vez animado
            }
        });
    }, {
        threshold: 0.1 // La animación se activa cuando el 10% del elemento es visible
    });

    elementosAnimados.forEach(el => {
        observer.observe(el);
    });
});
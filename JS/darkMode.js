

// -------------------------------
// 🌓 MODO OSCURO / CLARO
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById('darkModeToggle');
    const body = document.body;
    const moonIcon = 'fa-moon'; // Ícono para modo claro
    const sunIcon = 'fa-sun';  // Ícono para modo oscuro

    // Función para aplicar el tema guardado
    const applyTheme = () => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        body.classList.toggle('dark-mode', isDarkMode);
        const icon = toggleButton.querySelector('i');
        if (icon) {
            icon.classList.toggle(sunIcon, isDarkMode);
            icon.classList.toggle(moonIcon, !isDarkMode);
        }
    };

    toggleButton.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDarkMode); // Guarda la preferencia

        const icon = toggleButton.querySelector('i');
        if (icon) {
            icon.classList.toggle(sunIcon, isDarkMode);
            icon.classList.toggle(moonIcon, !isDarkMode);
        }
    });

    // Aplicar el tema al cargar la página
    applyTheme();
});

document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    // <-- ¡NUEVO! Seleccionamos el elemento <span> que contendrá el ícono.
    const flagIcon = langToggle.querySelector('.flag-icon');
    let currentLang = localStorage.getItem('lang') || 'es'; // 'es' por defecto

    const traducciones = {
        es: {
            // Menú de navegación
            nav_inicio: "INICIO",
            nav_artistas: "ARTISTAS",
            nav_cronograma: "CRONOGRAMA",
            nav_entradas: "ENTRADAS",
            nav_ubicacion: "UBICACIÓN",
            nav_contacto: "CONTACTO",
            // Títulos
            main_title: "Sonidos de Mi Ciudad",
            main_title_a: "Artistas",
            main_title_b: "Cronograma",
            main_title_c: "Ubicación",
            main_title_d: "Contacto",
        },
        en: {
            // Navigation Menu
            nav_inicio: "HOME",
            nav_artistas: "ARTISTS",
            nav_cronograma: "SCHEDULE",
            nav_entradas: "TICKETS",
            nav_ubicacion: "LOCATION",
            nav_contacto: "CONTACT",
            // Titles
            main_title: "Sounds of My City",
            main_title_a: "Artists",
            main_title_b: "Schedule",
            main_title_c: "Location",
            main_title_d: "Contact",
        }
    };

    const changeLanguage = (lang) => {
        // Esta parte, que traduce los textos, se queda igual.
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (traducciones[lang] && traducciones[lang][key]) {
                el.textContent = traducciones[lang][key];
            }
        });

        // <-- ¡NUEVO! Agregamos la lógica para cambiar la bandera.
        if (lang === 'es') {
            flagIcon.className = 'flag-icon flag-icon-es'; // Pone la bandera de España
        } else {
            flagIcon.className = 'flag-icon flag-icon-gb'; // Pone la bandera de Reino Unido
        }

        localStorage.setItem('lang', lang); // Guarda la preferencia
    };

    langToggle.addEventListener('click', () => {
        currentLang = (currentLang === 'es') ? 'en' : 'es';
        changeLanguage(currentLang);
    });

    // Carga el idioma y la bandera correctos al iniciar la página
    changeLanguage(currentLang);
});
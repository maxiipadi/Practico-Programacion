document.addEventListener('DOMContentLoaded', () => {

    // Cargar noticias dinámicamente
    const noticiasContainer = document.getElementById('noticias-container');

    fetch('/noticias.json') // La ruta a tu archivo JSON
        .then(response => response.json())
        .then(data => {
            data.forEach(noticia => {
                // Crear un elemento <article> para cada noticia
                const article = document.createElement('article');
                article.classList.add('noticia-item');

                // Crear y añadir el título
                const h3 = document.createElement('h3');
                h3.textContent = noticia.titulo;
                article.appendChild(h3);

                // Crear y añadir la fecha
                const pFecha = document.createElement('p');
                pFecha.classList.add('fecha-noticia');
                pFecha.textContent = noticia.fecha;
                article.appendChild(pFecha);

                // Crear y añadir el contenido
                const pContenido = document.createElement('p');
                pContenido.textContent = noticia.contenido;
                article.appendChild(pContenido);

                // Añadir el artículo completo al contenedor
                noticiasContainer.appendChild(article);
            });
        })
        .catch(error => {
            console.error('Error al cargar las noticias:', error);
            noticiasContainer.innerHTML = "<p>No se pudieron cargar las noticias en este momento.</p>";
        });
});
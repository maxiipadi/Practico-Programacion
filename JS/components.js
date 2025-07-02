document.addEventListener("DOMContentLoaded", function () {
  // Cargar Footer
  const footerDiv = document.getElementById("footer-component");
  if (footerDiv) {
    fetch("/templates/components/footer.html")
      .then(response => response.text())
      .then(data => {
        footerDiv.innerHTML = data;
        const yearSpan = document.getElementById("currentYear");
        if (yearSpan) {
          yearSpan.textContent = new Date().getFullYear();
        }
      })
      .catch(error => console.error("Error al cargar el footer:", error));
  }

});

// -------------------------------
// Botón "Volver arriba" con ícono personalizado
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // 1️⃣ Crear el botón
  const btnTop = document.createElement("button");
  btnTop.id = "btn-top";
  btnTop.title = "Volver arriba";

  // 2️⃣ Insertar la imagen dentro del botón
  const img = document.createElement("img");
  img.src = "/img/volver-arriba.png"; // o .png
  img.alt = "Volver arriba";
  img.classList.add("icono-volver");
  btnTop.appendChild(img);

  // 3️⃣ Añadir el botón al body
  document.body.appendChild(btnTop);

  // 4️⃣ Mostrar/ocultar botón según scroll
  window.addEventListener("scroll", () => {
    btnTop.style.display = window.scrollY > 150 ? "block" : "none";
  });

  // 5️⃣ Volver arriba al hacer clic
  btnTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});


// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slider-track");
  const prevBtn = document.querySelector(".slider-container .prev");
  const nextBtn = document.querySelector(".slider-container .next");
  const slides = document.querySelectorAll(".slider-track img");
  let currentIndex = 0;

  function updateSlider() {
    const width = slides[0].clientWidth;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  window.addEventListener("resize", updateSlider);
});

// ==============================
// Galería de artistas – info emergente
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-artista]").forEach(card => {
    card.addEventListener("click", () => {
      // 1. Cerrar cualquier otra tarjeta abierta
      document.querySelectorAll("[data-artista].activa")
        .forEach(activa => activa !== card && activa.classList.remove("activa"));
      // 2. Abrir/cerrar la seleccionada
      card.classList.toggle("activa");
    });
  });
});

// ==============================

document.addEventListener('DOMContentLoaded', () => {
  const tipo = document.getElementById('tipo');
  const cantidad = document.getElementById('cantidad');
  const total = document.getElementById('total');

  function actualizarTotal() {
    const precio = parseInt(tipo.selectedOptions[0].dataset.precio);
    const cant = parseInt(cantidad.value);
    total.textContent = `$${precio * cant}`;
  }

  tipo.addEventListener('change', actualizarTotal);
  cantidad.addEventListener('input', actualizarTotal);
});


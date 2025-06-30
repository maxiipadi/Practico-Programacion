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


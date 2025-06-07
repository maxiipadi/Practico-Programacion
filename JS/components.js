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

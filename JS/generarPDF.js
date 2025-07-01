document.addEventListener("DOMContentLoaded", () => {
  const btnDescargar = document.getElementById("btnDescargarPDF");

  if (!window.jspdf || !btnDescargar) return;

  const { jsPDF } = window.jspdf;

  btnDescargar.addEventListener("click", () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(" SONIDOS DE MI CIUDAD - ENTRADAS", 20, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(` Fecha: ${new Date().toLocaleDateString()}`, 20, y);
    y += 10;

    doc.text(" Entradas compradas:", 20, y);
    y += 10;

    document.querySelectorAll("#listaResumen li").forEach((li) => {
      doc.text("- " + li.textContent, 25, y);
      y += 8;
    });

    const total = document.getElementById("totalResumen").textContent;
    y += 5;
    doc.setFont("helvetica", "bold");
    doc.text(`Total pagado: ${total}`, 20, y);

    y += 15;
    doc.setFont("helvetica", "normal");
    doc.text("Gracias por tu compra!", 20, y);

    doc.save("Entradas_Sonidos_Mi_Ciudad.pdf");
  });
});

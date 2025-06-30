document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".entrada-checkbox");
  const totalDisplay = document.getElementById("total");
  const btnConfirmar = document.getElementById("btnConfirmar");
  const resumenCompra = document.getElementById("resumenCompra");
  const listaResumen = document.getElementById("listaResumen");
  const totalResumen = document.getElementById("totalResumen");

  function actualizarTotal() {
    let total = 0;

    document.querySelectorAll(".entrada-item").forEach((item) => {
      const checkbox = item.querySelector(".entrada-checkbox");
      const inputCantidad = item.querySelector(".entrada-cantidad");

      if (checkbox.checked) {
        const precio = parseInt(checkbox.dataset.precio);
        const cantidad = parseInt(inputCantidad.value) || 1;
        total += precio * cantidad;
      }
    });

    totalDisplay.textContent = `$${total.toLocaleString("es-AR")}`;
  }

  document.querySelectorAll(".entrada-item").forEach((item) => {
    const checkbox = item.querySelector(".entrada-checkbox");
    const input = item.querySelector(".entrada-cantidad");
    const select = item.querySelector(".entrada-dia");
    const esAbono = checkbox.dataset.abono === "true";

    checkbox.addEventListener("change", () => {
      input.disabled = !checkbox.checked;

      if (!esAbono && select) {
        select.disabled = !checkbox.checked;
        if (!checkbox.checked) select.value = "";
      }

      actualizarTotal();
    });

    input.addEventListener("input", () => {
      if (input.value < 1) input.value = 1;
      if (input.value > 10) input.value = 10;
      actualizarTotal();
    });

    if (select) {
      select.addEventListener("change", actualizarTotal);
    }
  });

  btnConfirmar.addEventListener("click", () => {
    listaResumen.innerHTML = "";
    let total = 0;

    document.querySelectorAll(".entrada-item").forEach((item) => {
      const checkbox = item.querySelector(".entrada-checkbox");
      const inputCantidad = item.querySelector(".entrada-cantidad");
      const selectDia = item.querySelector(".entrada-dia");
      const esAbono = checkbox.dataset.abono === "true";

      if (checkbox.checked) {
        const nombre = checkbox.value;
        const precio = parseInt(checkbox.dataset.precio);
        const cantidad = parseInt(inputCantidad.value);

        let diaTexto = "";

        if (!esAbono && selectDia) {
          if (!selectDia.value) {
            alert(`Debes seleccionar un día para la entrada "${nombre}".`);
            selectDia.focus();
            return;
          }
          diaTexto = ` - Día: ${selectDia.value}`;
        }

        const subtotal = precio * cantidad;
        total += subtotal;

        const li = document.createElement("li");
        li.textContent = `${nombre} - Cantidad: ${cantidad}${diaTexto} - Subtotal: $${subtotal.toLocaleString("es-AR")}`;
        listaResumen.appendChild(li);
      }
    });

    totalResumen.textContent = `$${total.toLocaleString("es-AR")}`;
    resumenCompra.style.display = "block";
    resumenCompra.scrollIntoView({ behavior: "smooth" });
    document.getElementById("btnDescargarPDF").style.display = "inline-block";
  });

  actualizarTotal();
});

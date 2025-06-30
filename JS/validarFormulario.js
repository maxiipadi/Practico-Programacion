// --- validarFormulario.js (VERSIÓN FINAL LIMPIA) ---

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("mi-formulario-de-contacto");
    if (!form) return;
    
    const nombreInput = document.getElementById("nombre");
    const apellidoInput = document.getElementById("apellido");
    const emailInput = document.getElementById("email");
    const mensajeInput = document.getElementById("mensaje");
    const globalError = document.getElementById("form-error-global");

    const errorMessages = {
        nombre: "⚠️ El nombre es obligatorio.",
        apellido: "⚠️ El apellido es obligatorio.",
        email: "⚠️ Ingresá un correo electrónico válido.",
        mensaje: "⚠️ El mensaje no puede estar vacío."
    };

    const toggleError = (input, message) => {
        const errorTag = document.getElementById(`error-${input.id}`);
        if (errorTag) {
            input.classList.toggle("input-error", !!message);
            errorTag.textContent = message;
        }
    };

    const validarFormularioCompleto = () => {
        let esValido = true;
        
        if (!nombreInput.value.trim()) { esValido = false; toggleError(nombreInput, errorMessages.nombre); } else { toggleError(nombreInput, ""); }
        if (!apellidoInput.value.trim()) { esValido = false; toggleError(apellidoInput, errorMessages.apellido); } else { toggleError(apellidoInput, ""); }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) { esValido = false; toggleError(emailInput, errorMessages.email); } else { toggleError(emailInput, ""); }
        if (!mensajeInput.value.trim()) { esValido = false; toggleError(mensajeInput, errorMessages.mensaje); } else { toggleError(mensajeInput, ""); }
        
        return esValido;
    };

    form.addEventListener("submit", (e) => {
        const esFormularioValido = validarFormularioCompleto();
        if (!esFormularioValido) {
            e.preventDefault(); 
            globalError.style.display = "block";
            const primerError = form.querySelector(".input-error");
            if (primerError) primerError.focus();
        } else {
            globalError.style.display = "none";
        }
    });

    const contadorMensaje = document.getElementById("contador-mensaje");
    if (mensajeInput && contadorMensaje) {
        mensajeInput.addEventListener("input", () => {
            const max = mensajeInput.getAttribute("maxlength");
            const actual = mensajeInput.value.length;
            contadorMensaje.textContent = `${actual} / ${max}`;
        });
        contadorMensaje.textContent = `0 / ${mensajeInput.getAttribute("maxlength")}`;
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("mi-formulario-de-contacto");
    if (!form) return;

    // 1. Seleccionamos todos los campos que vamos a validar
    const campos = {
        nombre: document.getElementById("nombre"),
        apellido: document.getElementById("apellido"),
        asunto: document.getElementById("asunto"),
        email: document.getElementById("email"),
        mensaje: document.getElementById("mensaje")
    };
    const globalError = document.getElementById("form-error-global");

    const errorMessages = {
        nombre: "⚠️ El nombre es obligatorio.",
        apellido: "⚠️ El apellido es obligatorio.",
        asunto: "⚠️ El asunto no puede estar vacío.",
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
    
    // 2. Nueva función para validar un campo individual
    const validarCampo = (campo) => {
        let esValido = true;
        const valor = campo.value.trim();

        switch (campo.id) {
            case 'nombre':
            case 'apellido':
            case 'asunto':
            case 'mensaje':
                if (!valor) {
                    toggleError(campo, errorMessages[campo.id]);
                    esValido = false;
                } else {
                    toggleError(campo, "");
                }
                break;
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
                    toggleError(campo, errorMessages.email);
                    esValido = false;
                } else {
                    toggleError(campo, "");
                }
                break;
        }
        return esValido;
    };

    // 3. Modificamos el evento 'submit' para usar la nueva función
    form.addEventListener("submit", (e) => {
        let esFormularioValido = true;
        // Validamos todos los campos uno por uno
        for (const key in campos) {
            if (!validarCampo(campos[key])) {
                esFormularioValido = false;
            }
        }
        
        if (!esFormularioValido) {
            e.preventDefault();
            globalError.style.display = "block";
            const primerError = form.querySelector(".input-error");
            if (primerError) primerError.focus();
        } else {
            globalError.style.display = "none";
            // Aquí iría el código para enviar el formulario, por ahora solo un alert
            alert("¡Formulario enviado con éxito!");
        }
    });

    // 4. LA MAGIA: Añadimos un listener a cada campo para la validación en vivo
    for (const key in campos) {
        campos[key].addEventListener('input', () => {
            validarCampo(campos[key]);
        });
    }

    // El contador de caracteres se mantiene igual
    const contadorMensaje = document.getElementById("contador-mensaje");
    if (campos.mensaje && contadorMensaje) {
        campos.mensaje.addEventListener("input", () => {
            const max = campos.mensaje.getAttribute("maxlength");
            const actual = campos.mensaje.value.length;
            contadorMensaje.textContent = `${actual} / ${max}`;
        });
        contadorMensaje.textContent = `0 / ${campos.mensaje.getAttribute("maxlength")}`;
    }
});
// juego-preguntas.js

const preguntas = [
  {
    pregunta: "¿De qué provincia son originarios Los Manseros Santiagueños?",
    opciones: ["Córdoba", "Tucumán", "Santiago del Estero"],
    correcta: 2
  },
  {
    pregunta: "¿Qué instrumento caracteriza al malambo?",
    opciones: ["Guitarra", "Zapateo", "Violín"],
    correcta: 1
  },
  {
    pregunta: "¿Cuál de estos ritmos es típico del Litoral argentino?",
    opciones: ["Chamamé", "Cueca", "Chacarera"],
    correcta: 0
  },
  {
    pregunta: "¿Qué ritmo folklórico se baila con pañuelo?",
    opciones: ["Malambo", "Zamba", "Huayno"],
    correcta: 1
  }
];

let indice = 0;

function mostrarPregunta() {
  const p = preguntas[indice];
  document.getElementById("pregunta").textContent = p.pregunta;
  const opcionesDiv = document.getElementById("opciones");
  opcionesDiv.innerHTML = "";
  p.opciones.forEach((op, i) => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.onclick = () => verificarRespuesta(i);
    opcionesDiv.appendChild(btn);
  });
  document.getElementById("feedback").textContent = "";
}

function verificarRespuesta(seleccion) {
  const correcta = preguntas[indice].correcta;
  const feedback = document.getElementById("feedback");
  if (seleccion === correcta) {
    feedback.textContent = "✅ ¡Correcto!";
  } else {
    feedback.textContent = "❌ Incorrecto. La respuesta era: " + preguntas[indice].opciones[correcta];
  }
  setTimeout(() => {
    indice++;
    if (indice < preguntas.length) {
      mostrarPregunta();
    } else {
      document.getElementById("juego").innerHTML = "<h2>🎉 ¡Terminaste el juego!</h2>";
    }
  }, 2000);
}

window.onload = mostrarPregunta;

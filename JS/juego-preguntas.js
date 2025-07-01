document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------  CONFIGURACIÓN  ----------------------- */
  const MAX_RECORDS = 5; // top N puntajes que guardamos
  const TOTAL_PREGUNTAS = 10;

  const bancoPreguntas = [
    { p:"¿En qué lugar se realiza el festival?", o:["Parque Aguirre","Plaza Añoranzas","Teatro 25 de Mayo"], r:1 },
    { p:"¿En qué mes se celebra?", o:["Marzo","Abril","Mayo"], r:2 },
    { p:"¿Cuál de estos artistas participa?", o:["Los Manseros","Bizarrap","Tini"], r:0 },
    { p:"¿Qué género musical representa el evento?", o:["Folklore","Reggaetón","Rock"], r:0 },
    { p:"¿Qué dúo santiagueño es protagonista?", o:["Pimpinela","Dúo Coplanacu","Los Tekis"], r:1 },
    { p:"¿Cuántos días dura el festival 2025?", o:["1","2","3"], r:2 },
    { p:"¿Cuál NO es un artista folklórico?", o:["Abel Pintos","Chaqueño Palavecino","Luis Fonsi"], r:2 },
    { p:"¿Qué instrumento es típico en una chacarera?", o:["Batería","Bombo legüero","Saxofón"], r:1 },
    { p:"¿Qué provincia es famosa por la chacarera?", o:["Santiago del Estero","Mendoza","Misiones"], r:0 },
    { p:"¿Cuál es el nombre del evento?", o:["Sonidos del Norte","Sonidos de Mi Ciudad","Cultura Viva"], r:1 }
  ];
  /* --------------------------------------------------------------- */

  const juego = document.getElementById("juego");

  /* ---------- 1. FORMULARIO DE NOMBRE ---------- */
  const formNombre = `
    <h2>Ingresá tu nombre para jugar</h2>
    <input id="nombreInput" type="text" placeholder="Tu nombre" />
    <button id="empezarBtn">Empezar</button>
  `;
  juego.innerHTML = formNombre;

  document.getElementById("empezarBtn").onclick = () => {
    const nombre = document.getElementById("nombreInput").value.trim();
    if (nombre.length < 4) {
      alert("Ingresá un nombre válido (mínimo 4 letras).");
      return;
    }
    iniciarTrivia(nombre);
  };

  /* ---------- 2. TRIVIA ---------- */
  function iniciarTrivia(jugador) {
    let indice = 0;
    let puntaje = 0;

    mostrarPregunta();

    function mostrarPregunta() {
      const { p, o, r } = bancoPreguntas[indice];
      juego.innerHTML = `
        <h2>Pregunta ${indice + 1} de ${TOTAL_PREGUNTAS}</h2>
        <h3>${p}</h3>
        <div class="opciones">
          ${o.map((texto, i) => `<button data-i="${i}">${texto}</button>`).join("")}
        </div>
        <p class="resultado" id="resultado"></p>
      `;

      document.querySelectorAll(".opciones button").forEach(btn => {
        btn.onclick = () => {
          const elegido = Number(btn.dataset.i);
          const esCorrecto = elegido === r;
          document.getElementById("resultado").textContent =
            esCorrecto ? "✅ ¡Correcto!" : "❌ Incorrecto";
          if (esCorrecto) puntaje++;
          setTimeout(() => {
            indice++;
            indice < TOTAL_PREGUNTAS ? mostrarPregunta() : finalizar(jugador, puntaje);
          }, 800);
        };
      });
    }
  }

  /* ---------- 3. FINALIZAR Y RANKING ---------- */
  function finalizar(nombre, puntaje) {
    guardarRecord(nombre, puntaje);
    const records = obtenerRecords();

    juego.innerHTML = `
      <h2>🎉 ¡Trivia terminada!</h2>
      <p>Obtuviste <strong>${puntaje}/${TOTAL_PREGUNTAS}</strong>.</p>
      <h3>🏆 Ranking</h3>
      <ol class="ranking">
        ${records.map(r => `<li>${r.nombre} – ${r.puntaje} pts</li>`).join("")}
      </ol>
      <button id="volverBtn">Volver a jugar</button>
    `;
    document.getElementById("volverBtn").onclick = () => location.reload();
  }

  /* ---------- 4. LOCAL STORAGE ---------- */
  function obtenerRecords() {
    return JSON.parse(localStorage.getItem("triviaRecords") || "[]");
  }

  function guardarRecord(nombre, puntaje) {
    const records = obtenerRecords();
    records.push({ nombre, puntaje });
    records.sort((a, b) => b.puntaje - a.puntaje);       // ordena desc.
    if (records.length > MAX_RECORDS) records.pop();      // mantiene top 5
    localStorage.setItem("triviaRecords", JSON.stringify(records));
  }
});

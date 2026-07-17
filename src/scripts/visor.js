// El visor del Mapa: arrastrar y acercar el castro. Sin librerias, como manda el stack.
//
// El lienzo va en % dentro de un visor con overflow oculto, y esto solo le toca el
// transform. Los hitos viven DENTRO del lienzo, asi que se mueven y escalan con el sin
// que haya que recalcular ni una coordenada: es justo por eso que estan en % y no en px.
//
// La regla que lo sujeta todo: el lienzo NUNCA deja de cubrir el visor. Sin eso, al
// arrastrar aparece el fondo por un lado y el castro se despega del borde.

const ZOOM_MIN = 1;    // a 1 el lienzo ya cubre el visor: por debajo asomaria el fondo
const ZOOM_MAX = 3.2;
const PASO = 0.35;     // lo que mueve un boton de zoom
const PASO_TECLA = 60; // lo que corre una flecha del teclado, en px de pantalla

export function montarVisor() {
  const visor = document.querySelector('[data-visor]');
  const lienzo = document.querySelector('[data-lienzo]');
  if (!visor || !lienzo) return;

  let escala = 1;
  let x = 0;
  let y = 0;

  // Los limites salen de cuanto sobra del lienzo por fuera del visor. Si no sobra nada
  // (el lienzo cabe justo), el margen es 0 y ese eje no se mueve: asi no hay tiron.
  const limites = () => {
    const v = visor.getBoundingClientRect();
    const anchoL = lienzo.offsetWidth * escala;
    const altoL = lienzo.offsetHeight * escala;
    return {
      minX: Math.min(0, v.width - anchoL),
      minY: Math.min(0, v.height - altoL),
    };
  };

  const pintar = () => {
    const { minX, minY } = limites();
    x = Math.min(0, Math.max(minX, x));
    y = Math.min(0, Math.max(minY, y));
    lienzo.style.transform = `translate(${x}px, ${y}px) scale(${escala})`;
  };

  // Acerca o aleja SIN que se escape lo que estas mirando: el punto bajo el raton (o el
  // centro, si viene de un boton) se queda donde esta. Sin esto, el zoom tira del mapa
  // hacia la esquina y pierdes de vista lo que ibas a mirar.
  const zoomA = (nueva, cx, cy) => {
    const antes = escala;
    escala = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, nueva));
    if (escala === antes) return;
    const v = visor.getBoundingClientRect();
    const px = (cx ?? v.width / 2);
    const py = (cy ?? v.height / 2);
    // El punto del lienzo que estaba bajo el cursor, antes y despues
    x = px - ((px - x) / antes) * escala;
    y = py - ((py - y) / antes) * escala;
    pintar();
  };

  // ARRASTRE. Con pointer events vale para raton y para lapiz sin escribirlo dos veces.
  let agarrado = false;
  let ultX = 0;
  let ultY = 0;
  let idPuntero = null;

  visor.addEventListener('pointerdown', (e) => {
    // Lo que es pulsable (los hitos, los mandos, los desplegables) no arrastra el mapa
    if (e.target.closest('a, button, summary, details')) return;
    agarrado = true;
    idPuntero = e.pointerId;
    ultX = e.clientX;
    ultY = e.clientY;
    visor.classList.add('is-agarrado');
    visor.setPointerCapture(e.pointerId);
  });

  visor.addEventListener('pointermove', (e) => {
    if (!agarrado || e.pointerId !== idPuntero) return;
    x += e.clientX - ultX;
    y += e.clientY - ultY;
    ultX = e.clientX;
    ultY = e.clientY;
    pintar();
  });

  const soltar = (e) => {
    if (!agarrado) return;
    agarrado = false;
    idPuntero = null;
    visor.classList.remove('is-agarrado');
    if (e && visor.hasPointerCapture?.(e.pointerId)) visor.releasePointerCapture(e.pointerId);
  };
  visor.addEventListener('pointerup', soltar);
  visor.addEventListener('pointercancel', soltar);

  // RUEDA. Solo con ctrl/cmd o si ya estas dentro del mapa: robarle la rueda a la pagina
  // sin avisar es de las cosas que mas molestan de un mapa metido en un sitio.
  visor.addEventListener('wheel', (e) => {
    e.preventDefault();
    const v = visor.getBoundingClientRect();
    zoomA(escala - Math.sign(e.deltaY) * PASO * 0.6, e.clientX - v.left, e.clientY - v.top);
  }, { passive: false });

  // LOS MANDOS
  visor.querySelectorAll('[data-zoom]').forEach((b) => {
    b.addEventListener('click', () => zoomA(escala + Number(b.dataset.zoom) * PASO));
  });
  visor.querySelector('[data-centrar]')?.addEventListener('click', () => {
    escala = 1; x = 0; y = 0; pintar();
  });

  // TECLADO. El visor no es focusable a proposito (no es un control): las flechas mueven
  // el mapa solo cuando el foco NO esta en algo que ya las usa.
  addEventListener('keydown', (e) => {
    const a = document.activeElement;
    if (a && a.closest('input, textarea, summary, [contenteditable]')) return;
    const teclas = { ArrowLeft: [1, 0], ArrowRight: [-1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] };
    if (teclas[e.key]) {
      e.preventDefault();
      x += teclas[e.key][0] * PASO_TECLA;
      y += teclas[e.key][1] * PASO_TECLA;
      pintar();
    } else if (e.key === '+' || e.key === '=') { zoomA(escala + PASO); }
    else if (e.key === '-') { zoomA(escala - PASO); }
  });

  // Al cambiar la ventana, el lienzo cambia de tamano y los limites con el: si no se
  // repinta, el mapa se queda despegado de un borde.
  addEventListener('resize', pintar);
  pintar();
}

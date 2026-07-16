// El cursor es una mota de luz de la fortaleza, con su estela.
// Mismo lenguaje que las motas que desprenden las placas: no es un elemento nuevo,
// es el mismo material. Al pasar por algo pulsable, crece y se enciende.
//
// Solo con raton (pointer: fine) y solo si no se ha pedido menos movimiento:
// con prefers-reduced-motion se deja el cursor del sistema y no se monta nada.

const ESTELA = 5; // motas que van detras
const PERSECUCION = 0.34; // cuanto alcanza cada mota a la de delante

export function montarCursor() {
  const finoYConMovimiento =
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finoYConMovimiento) return;

  document.documentElement.classList.add('con-mota'); // esconde el cursor del sistema

  const capa = document.createElement('div');
  capa.className = 'mota-cursor';
  capa.setAttribute('aria-hidden', 'true');

  const punta = document.createElement('span');
  punta.className = 'mota-cursor__punta';
  capa.appendChild(punta);

  const cola = [];
  for (let i = 0; i < ESTELA; i++) {
    const s = document.createElement('span');
    s.className = 'mota-cursor__cola';
    // las de atras, mas pequenas y mas apagadas
    const k = 1 - i / ESTELA;
    s.style.cssText = `--k:${k.toFixed(2)}`;
    capa.appendChild(s);
    cola.push({ el: s, x: 0, y: 0 });
  }
  document.body.appendChild(capa);

  let x = innerWidth / 2, y = innerHeight / 2;
  let px = x, py = y;
  let visible = false;

  // El pointermove dispara a mas de 60Hz: aqui solo se apunta el estado y el trabajo
  // (closest sobre el DOM) se hace UNA vez por frame, en el mismo paso que ya corre.
  let objetivo = null;
  addEventListener('pointermove', (e) => {
    x = e.clientX; y = e.clientY;
    objetivo = e.target;
    if (!visible) { visible = true; capa.classList.add('is-viva'); px = x; py = y; cola.forEach((c) => { c.x = x; c.y = y; }); }
  }, { passive: true });

  addEventListener('pointerdown', () => capa.classList.add('is-pulsa'));
  addEventListener('pointerup', () => capa.classList.remove('is-pulsa'));
  document.addEventListener('pointerleave', () => { visible = false; capa.classList.remove('is-viva'); });

  const paso = () => {
    // La punta va PEGADA al raton: con retardo, todo el sitio se leia como con lag.
    // La sensacion de luz la pone la estela, que si persigue.
    px = x; py = y;
    punta.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`;

    if (objetivo) {
      capa.classList.toggle('is-sobre', !!objetivo.closest('a, button, .sala, [role="button"]'));
      capa.classList.toggle('is-texto', !!objetivo.closest('input, textarea'));
      objetivo = null;
    }

    let ax = px, ay = py;
    for (const c of cola) {
      c.x += (ax - c.x) * PERSECUCION;
      c.y += (ay - c.y) * PERSECUCION;
      c.el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) translate(-50%, -50%)`;
      ax = c.x; ay = c.y;
    }
    requestAnimationFrame(paso);
  };
  requestAnimationFrame(paso);
}

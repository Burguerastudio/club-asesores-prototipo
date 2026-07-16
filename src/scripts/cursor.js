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

  addEventListener('pointermove', (e) => {
    x = e.clientX; y = e.clientY;
    if (!visible) { visible = true; capa.classList.add('is-viva'); px = x; py = y; cola.forEach((c) => { c.x = x; c.y = y; }); }
    // sobre algo pulsable, la mota crece
    const pulsable = e.target.closest('a, button, .sala, [role="button"]');
    capa.classList.toggle('is-sobre', !!pulsable);
    // sobre un campo de texto la mota se aparta: manda el caret, y dos cursores a la vez confunden
    capa.classList.toggle('is-texto', !!e.target.closest('input, textarea'));
  }, { passive: true });

  addEventListener('pointerdown', () => capa.classList.add('is-pulsa'));
  addEventListener('pointerup', () => capa.classList.remove('is-pulsa'));
  document.addEventListener('pointerleave', () => { visible = false; capa.classList.remove('is-viva'); });

  const paso = () => {
    // la punta va un pelin por detras del raton: eso es lo que da la sensacion de luz
    px += (x - px) * 0.6;
    py += (y - py) * 0.6;
    punta.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`;

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

// El calibrador del mapa. Andamio interno, NO es producto: se retira en la Fase 9.
//
// Arrastra las chinchetas sobre el castro y escupe el bloque sitiosDelMapa listo para
// pegar en demo.js. Medir ampliando el asset a mano funciona, pero el ultimo 2% se queda
// a ojo de quien mide, y ese 2% es justo el que se nota.
//
// La conversion a % NO necesita saber nada del transform del lienzo: el rect del lienzo
// ya viene con el translate y el scale aplicados, asi que basta con la regla de tres.
// Por eso las coordenadas son en % y no en px, y por eso esto sigue valiendo con el mapa
// arrastrado o con zoom.

export function montarCalibrador() {
  const lienzo = document.querySelector('[data-lienzo]');
  const capa = document.querySelector('[data-hitos]');
  const lista = document.querySelector('[data-lista]');
  if (!lienzo || !capa || !lista) return;

  const hitos = [...capa.querySelectorAll('[data-hito]')];
  const tocadas = new Set();

  // --- El icono, que se puede cambiar en caliente para elegirlo viendolo puesto ---
  const iconos = window.__ICONOS || [];
  const pintarIcono = (id) => {
    const ico = iconos.find((i) => i.id === id);
    if (!ico) return;
    capa.querySelectorAll('.hito__ico').forEach((svg) => {
      svg.innerHTML = ico.d.map((d) => `<path d="${d}" />`).join('');
    });
    document.querySelectorAll('[data-ico]').forEach((b) => b.classList.toggle('is-on', b.dataset.ico === id));
  };
  document.querySelectorAll('[data-ico]').forEach((b) => {
    b.addEventListener('click', () => pintarIcono(b.dataset.ico));
  });
  pintarIcono(iconos[0]?.id);

  // --- La lista de coordenadas, siempre al dia ---
  const pintarLista = () => {
    lista.innerHTML = hitos
      .map((h) => {
        const eti = h.querySelector('.hito__eti')?.textContent ?? h.dataset.hito;
        return `<li class="${tocadas.has(h.dataset.hito) ? 'is-tocada' : ''}">
          <b>${eti}</b><code>${Number(h.dataset.x).toFixed(1)} , ${Number(h.dataset.y).toFixed(1)}</code>
        </li>`;
      })
      .join('');
  };

  const colocar = (h, x, y) => {
    // Topado al lienzo: una chincheta fuera del mapa no significa nada
    h.dataset.x = String(Math.min(100, Math.max(0, x)));
    h.dataset.y = String(Math.min(100, Math.max(0, y)));
    h.style.left = `${h.dataset.x}%`;
    h.style.top = `${h.dataset.y}%`;
  };

  // --- Arrastrar la chincheta ---
  hitos.forEach((h) => {
    const asa = h.querySelector('.hito');
    let moviendo = false;
    let id = null;

    asa.addEventListener('pointerdown', (e) => {
      // Que no lo coja tambien el visor y se lleve el mapa entero
      e.stopPropagation();
      e.preventDefault();
      moviendo = true;
      id = e.pointerId;
      asa.classList.add('is-movida');
      asa.setPointerCapture(e.pointerId);
    });

    asa.addEventListener('pointermove', (e) => {
      if (!moviendo || e.pointerId !== id) return;
      const r = lienzo.getBoundingClientRect(); // ya trae el translate y el scale dentro
      colocar(h, ((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100);
      tocadas.add(h.dataset.hito);
      pintarLista();
    });

    const soltar = (e) => {
      if (!moviendo) return;
      moviendo = false;
      id = null;
      asa.classList.remove('is-movida');
      if (e && asa.hasPointerCapture?.(e.pointerId)) asa.releasePointerCapture(e.pointerId);
    };
    asa.addEventListener('pointerup', soltar);
    asa.addEventListener('pointercancel', soltar);

    // Con el teclado, para el ultimo pixel: las flechas mueven 0.1% y con Shift 1%
    asa.addEventListener('keydown', (e) => {
      const t = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
      if (!t) return;
      e.preventDefault();
      e.stopPropagation(); // si no, el visor mueve el mapa a la vez
      const paso = e.shiftKey ? 1 : 0.1;
      colocar(h, Number(h.dataset.x) + t[0] * paso, Number(h.dataset.y) + t[1] * paso);
      tocadas.add(h.dataset.hito);
      pintarLista();
    });
  });

  // --- Copiar, ya en la forma exacta que espera demo.js ---
  document.querySelector('[data-copiar]')?.addEventListener('click', async () => {
    const filas = hitos.map((h) => {
      const slug = h.dataset.hito;
      const x = Number(h.dataset.x).toFixed(1);
      const y = Number(h.dataset.y).toFixed(1);
      const sala = slug !== 'puerta';
      const cola = sala
        ? ''
        : `, nombre: 'Puerta Principal', nota: 'Se abre mal: los visitantes entran sin orientación.', estado: 'desconectada'`;
      return `  { slug: '${slug}', x: ${x}, y: ${y}, sala: ${sala}${cola} },`;
    });
    const texto = `export const sitiosDelMapa = [\n${filas.join('\n')}\n];`;
    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      // Sin permiso de portapapeles (pasa fuera de https): al menos que se pueda leer
      console.log(texto);
    }
    const dicho = document.querySelector('[data-dicho]');
    if (dicho) {
      dicho.hidden = false;
      setTimeout(() => { dicho.hidden = true; }, 2600);
    }
  });

  // El panel se pliega: cae justo encima de El Consejo y de la Puerta
  const panel = document.querySelector('[data-panel]');
  document.querySelector('[data-pliega]')?.addEventListener('click', (e) => {
    const plegado = panel.classList.toggle('is-plegado');
    e.currentTarget.setAttribute('aria-expanded', String(!plegado));
    e.currentTarget.setAttribute('aria-label', plegado ? 'Desplegar el panel' : 'Plegar el panel');
  });

  pintarLista();
}

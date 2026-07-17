// Las pestanas de El asesor. Sin librerias, y con el patron de accesibilidad que toca:
// role=tablist / tab / tabpanel, aria-selected, y las flechas para moverse entre ellas,
// que es lo que espera quien navega con teclado y lo que un puñado de botones no da.
//
// Va por delegacion sobre el tablist: si manana hay una pestana mas, no hay que tocar
// nada aqui.

export function montarPestanas() {
  const lista = document.querySelector('[role="tablist"]');
  if (!lista) return;

  const tabs = [...lista.querySelectorAll('[role="tab"]')];
  if (!tabs.length) return;

  const abrir = (tab, mover = true) => {
    tabs.forEach((t) => {
      const suya = t === tab;
      t.classList.toggle('is-on', suya);
      t.setAttribute('aria-selected', String(suya));
      // Solo la pestana abierta entra en el orden de tabulacion: dentro se navega con
      // las flechas, que es como funciona un tablist de verdad.
      t.tabIndex = suya ? 0 : -1;
      const panel = document.querySelector(`[data-panel="${t.dataset.tab}"]`);
      if (panel) panel.hidden = !suya;
    });
    if (mover) tab.focus();
  };

  lista.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const tab = t.closest('[role="tab"]');
    if (tab) abrir(tab, false);
  });

  lista.addEventListener('keydown', (e) => {
    const i = tabs.indexOf(document.activeElement);
    if (i === -1) return;
    const salto = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (salto) {
      e.preventDefault();
      abrir(tabs[(i + salto + tabs.length) % tabs.length]);
    } else if (e.key === 'Home') {
      e.preventDefault();
      abrir(tabs[0]);
    } else if (e.key === 'End') {
      e.preventDefault();
      abrir(tabs[tabs.length - 1]);
    }
  });

  // El estado inicial lo pinta el HTML, pero los tabIndex hay que sembrarlos
  tabs.forEach((t) => { t.tabIndex = t.getAttribute('aria-selected') === 'true' ? 0 : -1; });
}

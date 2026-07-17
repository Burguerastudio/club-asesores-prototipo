// El velo del cruce: cierra sobre la pagina, salta, y la siguiente lo retira.
// Estandar del sistema Sepia (ver docs/DESIGN.md). El componente es Velo.astro.

const CIERRE = 420; // lo que tarda el velo en tapar antes de saltar

const quieto = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// Cmd/ctrl/shift/alt o boton central: el usuario quiere otra pestana, no cruzar
const modificado = (e) => e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;

const cruzable = (a) => {
  if (!a || !a.href) return false;
  if (a.origin !== location.origin) return false; // fuera de la fortaleza
  if (a.target && a.target !== '_self') return false;
  if (a.hasAttribute('download')) return false;
  // Contrato con desarrollo: lo que resuelve el plugin no navega, avisa (ver DESIGN.md)
  if (a.hasAttribute('data-integracion')) return false;
  const url = new URL(a.href);
  // Anclas y enlaces a la pagina en la que ya estas: no hay cruce que velar
  if (url.pathname === location.pathname && url.search === location.search) return false;
  return true;
};

// Echa el velo y salta. La espera se puede forzar (el Login la alarga para que el
// velo acompane al golpe de puerta; con la espera a 0 el golpe se cortaria al saltar).
export function cruzar(destino, espera) {
  // is-quieto corta la animacion de llegada si aun corre: mientras corra, gana a
  // is-cerrando y el cruce se iria sin velo (ver Velo.astro).
  document.querySelector('.velo')?.classList.add('is-quieto', 'is-cerrando');
  const t = espera ?? (quieto() ? 0 : CIERRE);
  setTimeout(() => { location.href = destino; }, t);
}

export function montarVelo() {
  const velo = document.querySelector('.velo');
  if (!velo) return;

  // Con el boton atras la pagina sale de la cache tal como se dejo: con el velo echado.
  addEventListener('pageshow', (e) => { if (e.persisted) velo.classList.remove('is-cerrando'); });

  document.addEventListener('click', (e) => {
    if (modificado(e)) return;
    const t = e.target;
    if (!(t instanceof Element)) return;
    const a = t.closest('a');
    if (!cruzable(a)) return;
    e.preventDefault();
    cruzar(a.href);
  });
}

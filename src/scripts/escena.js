// La escena que respira. El webm arranca al acercarte y se calma al salir o al terminar:
// no van en loop a proposito, la sala se asienta sola y al volver arranca de cero.
//
// Con prefers-reduced-motion no se monta nada y queda el estatico, que es lo que ya sirve
// el poster. Y el video no se descarga hasta el primer hover (preload="none" en el HTML):
// los webm pesan 300-450KB cada uno y no puede pagarlos quien no los va a ver.
//
// Nace el 2026-07-17 al montar la Torre, copiado del <script> del Patio, porque las salas
// que faltan lo van a pedir igual. OJO: el Patio sigue con SU copia inline; no se toca
// ahora porque Conchi ya lo valido y esto no le cambia nada al usuario. Cuando haya que
// entrar en dashboard.astro por otra cosa, que pase por aqui. Esta es la casa: `montarEscenas('.sala')`.

export function montarEscenas(selector = '[data-escena]') {
  if (!matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

  document.querySelectorAll(selector).forEach((caja) => {
    const vid = caja.querySelector('video');
    if (!(vid instanceof HTMLVideoElement)) return;

    const vivir = () => { caja.classList.add('is-viva'); vid.play().catch(() => {}); };
    const calmar = () => {
      caja.classList.remove('is-viva');
      // Se deja acabar el fundido antes de parar: cortar en seco da un salto de frame
      setTimeout(() => { if (!caja.classList.contains('is-viva')) vid.pause(); }, 320);
    };

    caja.addEventListener('mouseenter', vivir);
    caja.addEventListener('mouseleave', calmar);
    caja.addEventListener('focusin', vivir);
    caja.addEventListener('focusout', calmar);
    vid.addEventListener('ended', () => caja.classList.remove('is-viva'));
  });
}

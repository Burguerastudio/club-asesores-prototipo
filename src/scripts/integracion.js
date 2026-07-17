// El contrato con desarrollo (docs/DESIGN.md): todo CTA cuya logica real vive en el
// plugin NO navega ni envia. Responde con un aviso y queda marcado con data-integracion.
// Buscar ese atributo da el inventario exacto de puntos a cablear:
//
//   grep -rn "data-integracion" src/
//
// El valor dice que tiene que resolver el backend (plugin:accion). El texto del aviso
// va en data-aviso, y se dice en la pildora del propio elemento (.pista), que es la
// pieza que ya tiene la casa para hablar sin sacar un dialogo.
//
// Va por delegacion sobre el document, como el sonido: asi cualquier pantalla nueva que
// marque un CTA con data-integracion queda cableada sin tocar nada aqui.

const DICHO = 2600; // lo que el aviso se queda a la vista
const SALIDA = 220; // lo que tarda la pildora en irse (la transicion de .pista)

export function montarIntegracion() {
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const el = t.closest('[data-integracion]');
    if (!el) return;

    // Lo primero y pase lo que pase: esto no navega ni envia. Lo resuelve el plugin.
    e.preventDefault();

    // La pildora suele vivir FUERA del elemento, en su caja: si el elemento va recortado
    // con augmented-ui, dentro quedaria encerrada (ver docs/DESIGN.md). Se busca dentro
    // primero, y si no, al lado.
    const pista = el.querySelector('.pista') || el.parentElement?.querySelector('.pista');
    const aviso = el.dataset.aviso;
    if (!pista || !aviso) return;

    // La etiqueta de reposo se guarda la primera vez, antes de pisarla con el aviso
    if (!pista.dataset.etiqueta) pista.dataset.etiqueta = pista.textContent.trim();

    clearTimeout(Number(pista.dataset.reloj));
    pista.textContent = aviso;
    pista.classList.add('is-dicha');

    const reloj = setTimeout(() => {
      pista.classList.remove('is-dicha');
      // El texto vuelve cuando la pildora ya se ha ido: si no, se lee el cambio
      setTimeout(() => { pista.textContent = pista.dataset.etiqueta; }, SALIDA);
    }, DICHO);
    pista.dataset.reloj = String(reloj);
  });
}

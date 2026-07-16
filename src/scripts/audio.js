// Sonido de La Fortaleza: efectos de interfaz y musica de fondo.
//
// Efectos: Kenney "Interface Sounds" (CC0, sin atribucion obligatoria).
// Musica:  "Cathedral in the forest" de congusbongus, OpenGameArt (CC0).
//          Alternativa en /audio/musica/fortaleza-celta.mp3 (Celtic Loop, CC0):
//          es melodica y de 43 s, asi que cansa antes y compite con la lectura.
//
// La musica NO puede sonar sola al abrir: los navegadores la bloquean hasta que hay
// un gesto. Se intenta, y si la bloquean queda armada para el primer clic o tecla.
// El gesto que la enciende de verdad es el boton Entrar del Login.

const LLAVE = 'fortaleza-audio'; // 'on' | 'off', se recuerda entre visitas
const VOL_MUSICA = 0.3;
const VOL_EFECTOS = 0.32;

const silenciado = () => localStorage.getItem(LLAVE) === 'off';

// --- Efectos ---
// Se precargan y se clonan al sonar, para que dos clics seguidos no se corten.
const efectos = {};
const cargar = (nombre) => {
  const a = new Audio(`/audio/ui/${nombre}.mp3`);
  a.preload = 'auto';
  a.volume = VOL_EFECTOS;
  efectos[nombre] = a;
};
['hover', 'click', 'accion', 'entrar'].forEach(cargar);

export function sonar(nombre, volumen = VOL_EFECTOS) {
  if (silenciado() || !efectos[nombre]) return;
  const a = efectos[nombre].cloneNode();
  a.volume = volumen;
  a.play().catch(() => {}); // si el navegador aun no deja, no pasa nada
}

// --- Musica ---
let musica = null;
const LLAVE_T = 'fortaleza-musica-t'; // posicion de la pieza, para que sobreviva a la navegacion

function crearMusica() {
  if (musica) return musica;
  musica = new Audio('/audio/musica/fortaleza.mp3');
  musica.loop = true;
  musica.volume = 0;

  // El sitio es MPA: cada pagina crea este Audio de cero. Sin retomar la posicion,
  // la pieza de 137s reinicia en cada navegacion y nunca pasa de su intro.
  const t = Number(sessionStorage.getItem(LLAVE_T) || 0);
  if (t > 0) musica.currentTime = t;
  addEventListener('pagehide', () => {
    if (!musica || musica.paused) return;
    sessionStorage.setItem(LLAVE_T, String(musica.currentTime));
    fundir(musica, 0, 150); // que la salida no sea un hachazo
  });

  // Tras dos vueltas completas baja a la mitad: en sesiones largas, a 0.3 constante
  // la musica compite con la lectura. El bucle envuelve currentTime, de ahi el salto atras.
  let previo = 0;
  let vueltas = 0;
  let bajada = false;
  musica.addEventListener('timeupdate', () => {
    if (musica.currentTime < previo - 5 && ++vueltas >= 2 && !bajada) {
      bajada = true;
      fundir(musica, VOL_MUSICA / 2);
    }
    previo = musica.currentTime;
  });

  return musica;
}

// Entra subiendo despacio: aparecer de golpe asusta
function fundir(a, hasta, ms = 1600) {
  const desde = a.volume;
  const t0 = performance.now();
  const paso = (t) => {
    const k = Math.min(1, (t - t0) / ms);
    // El redondeo flotante puede pasarse una decima de milesima y volume lanza fuera de [0,1]
    a.volume = Math.min(1, Math.max(0, desde + (hasta - desde) * k));
    if (k < 1) requestAnimationFrame(paso);
    else if (hasta === 0) a.pause();
  };
  requestAnimationFrame(paso);
}

export function arrancarMusica() {
  if (silenciado()) return;
  const a = crearMusica();
  a.play().then(() => fundir(a, VOL_MUSICA)).catch(() => {
    // Bloqueada: queda armada para el primer gesto real
    const alGesto = () => {
      if (silenciado()) return;
      a.play().then(() => fundir(a, VOL_MUSICA)).catch(() => {});
    };
    document.addEventListener('pointerdown', alGesto, { once: true });
    document.addEventListener('keydown', alGesto, { once: true });
  });
}

export function alternarSonido() {
  const apagar = !silenciado();
  localStorage.setItem(LLAVE, apagar ? 'off' : 'on');
  if (apagar) { if (musica) fundir(musica, 0, 400); }
  else arrancarMusica();
  return !apagar;
}

export const estaSilenciado = silenciado;

// --- Cableado comun ---
// Por delegacion: asi vale para lo que ya hay y para lo que venga.
export function cablearInterfaz() {
  const esAccion = (el) => el.closest('.btn:not(.btn--linea)');

  document.addEventListener('pointerover', (e) => {
    const el = e.target.closest('a, button, .sala');
    if (!el || el.dataset.sonando) return;
    el.dataset.sonando = '1';
    sonar('hover', 0.2);
    setTimeout(() => delete el.dataset.sonando, 120); // sin ametralladora al barrer
  });

  document.addEventListener('pointerdown', (e) => {
    const el = e.target.closest('a, button');
    if (!el) return;
    // data-sonido manda: sin el, Entrar disparaba su golpe de puerta Y el generico a la vez
    const cual = el.dataset.sonido || (esAccion(el) ? 'accion' : 'click');
    sonar(cual, cual === 'entrar' ? 0.4 : VOL_EFECTOS);
  });
}

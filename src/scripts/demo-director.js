// EL CONMUTADOR DE DEMO. Andamio del prototipo, NO producto (docs/DESIGN.md): deja saltar
// entre los cinco rangos sin rebuildar, para que la demo se defienda sola en una reunion.
// Cada rango arrastra fortalecidas, PF, skin del avatar, rango y estado de la fortaleza.
//
// El build es estatico y renderiza SIEMPRE el rango 3 (Marta, 4 fortalecidas). Este modulo
// reescribe ese estado al cargar cada pagina, sobre el DOM ya pintado, igual que hace la
// personalizacion de nombre/figura. Lo global (HUD, barra de avance, nombre y rango) se
// aplica aqui; lo especifico de cada pantalla (que insignias arden, estados vacios, endgame)
// lo hace cada pagina leyendo document.documentElement.dataset.fortalecidas.

// Los cinco rangos (CONTENIDO 4.2). fortalecidas es el numero representativo de cada uno;
// de ahi salen las insignias encendidas, la barra y el rango. El PF es un valor plausible
// y creciente, no el calculo exacto: en la demo lo que cuenta es que sube con el rango.
export const RANGOS = [
  { r: 1, fortalecidas: 0,  pf: 90,   sufM: 'Base',        sufF: 'Base' },
  { r: 2, fortalecidas: 2,  pf: 320,  sufM: 'en Guardia',  sufF: 'en Guardia' },
  { r: 3, fortalecidas: 4,  pf: 725,  sufM: 'Constructor', sufF: 'Constructora' },
  { r: 4, fortalecidas: 8,  pf: 1240, sufM: 'Estratega',   sufF: 'Estratega' },
  { r: 5, fortalecidas: 12, pf: 1610, sufM: 'Fortalecido', sufF: 'Fortalecida' },
];

const LLAVE_DEMO = 'fortaleza-demo';          // { rango: 1..5 }
const LLAVE_YO = 'fortaleza-onboarding';      // { nombre, figura } (lo comparte con onboarding)

export function leerRango() {
  try { return JSON.parse(localStorage.getItem(LLAVE_DEMO) || '{}')?.rango || 3; } catch { return 3; }
}
export function guardarRango(rango) {
  localStorage.setItem(LLAVE_DEMO, JSON.stringify({ rango }));
}
export function leerFigura() {
  try { return JSON.parse(localStorage.getItem(LLAVE_YO) || '{}')?.figura === 'asesor' ? 'asesor' : 'asesora'; }
  catch { return 'asesora'; }
}
export function guardarFigura(figura) {
  let d = {}; try { d = JSON.parse(localStorage.getItem(LLAVE_YO) || '{}') || {}; } catch {}
  d.figura = figura; localStorage.setItem(LLAVE_YO, JSON.stringify(d));
}
export function leerNombre() {
  try { return (JSON.parse(localStorage.getItem(LLAVE_YO) || '{}')?.nombre || '').trim(); } catch { return ''; }
}

// Estado de una intervencion (n = 1..12) para un numero de fortalecidas dado. Misma regla
// que el build, parametrizada por el conmutador: n<=F fortalecida, n=F+1 activa, resto
// bloqueada. Es la fuente de verdad que usan TODAS las pantallas para re-derivar su estado.
export function estadoIntervencion(n, fortalecidas) {
  if (n <= fortalecidas) return 'fortalecida';
  if (n === fortalecidas + 1 && fortalecidas < 12) return 'activa';
  return 'bloqueada';
}
// Los pasos ganados de una intervencion (progresion / reto / evolucion) segun su estado.
export function pasosGanados(n, fortalecidas) {
  const e = estadoIntervencion(n, fortalecidas);
  if (e === 'fortalecida') return ['progresion', 'reto', 'evolucion'];
  if (e === 'activa') return ['progresion'];
  return [];
}

export function estadoDemo() {
  const r = leerRango();
  const info = RANGOS.find((x) => x.r === r) || RANGOS[2];
  const figura = leerFigura();
  const esAsesor = figura === 'asesor';
  const suf = esAsesor ? info.sufM : info.sufF;
  const sig = RANGOS.find((x) => x.r === Math.min(r + 1, 5)) || info;
  const sufSig = esAsesor ? sig.sufM : sig.sufF;
  return {
    ...info, figura, esAsesor,
    articulo: esAsesor ? 'Asesor' : 'Asesora',
    rangoTxt: `${esAsesor ? 'Asesor' : 'Asesora'} ${suf}`,
    rangoSigTxt: `${esAsesor ? 'Asesor' : 'Asesora'} ${sufSig}`,
    faltan: Math.max(0, sig.fortalecidas - info.fortalecidas),
    esMax: r === 5,
  };
}

// Aplica lo GLOBAL: clases de raiz, HUD (skin, rango, PF), barra de avance y contadores.
// Se llama en el layout, en cada pagina, antes de que se vea nada.
export function aplicarDemo() {
  const e = estadoDemo();
  const root = document.documentElement;

  for (let i = 1; i <= 5; i++) root.classList.remove('demo-r' + i);
  root.classList.remove('demo-vacio', 'demo-completo');
  root.classList.add('demo-r' + e.r);
  if (e.r === 1) root.classList.add('demo-vacio');
  if (e.r === 5) root.classList.add('demo-completo');
  root.dataset.fortalecidas = String(e.fortalecidas);
  root.dataset.rango = String(e.r);

  // Skin del avatar: misma figura, la r del rango (asesora-r3 -> asesor-r5, etc.).
  const skin = `${e.figura}-r${e.r}`;
  document.querySelectorAll('[data-yo-cara]').forEach((el) => {
    el.setAttribute('src', (el.getAttribute('src') || '').replace(/asesora?-r\d/, skin));
  });
  // Nombre (si el alumno lo eligio en el onboarding).
  const nombre = leerNombre();
  if (nombre) {
    const corto = nombre.split(' ')[0];
    document.querySelectorAll('[data-yo-nombre]').forEach((el) => {
      el.textContent = el.getAttribute('data-yo-nombre') === 'corto' ? corto : nombre;
    });
    const sinTilde = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '');
    document.querySelectorAll('[data-yo-mail]').forEach((el) => {
      el.textContent = `${sinTilde(corto).toLowerCase()}@suasesoria.com`;
    });
  }
  // Rango actual y siguiente.
  document.querySelectorAll('[data-yo-rango]').forEach((el) => { el.textContent = e.rangoTxt; });
  document.querySelectorAll('[data-yo-rango-sig]').forEach((el) => { el.textContent = e.rangoSigTxt; });
  // PF y contadores de fortalecidas.
  document.querySelectorAll('[data-yo-pf]').forEach((el) => { el.textContent = e.pf.toLocaleString('es-ES'); });
  document.querySelectorAll('[data-yo-fort]').forEach((el) => { el.textContent = String(e.fortalecidas); });
  document.querySelectorAll('[data-yo-faltan]').forEach((el) => { el.textContent = String(e.faltan); });

  // La barra de avance (componente compartido .barra): enciende las fortalecidas, marca la
  // del mes en la siguiente, apaga el resto.
  document.querySelectorAll('.barra').forEach((barra) => {
    [...barra.children].forEach((s, idx) => {
      s.classList.remove('is-on', 'is-toca');
      if (idx < e.fortalecidas) s.classList.add('is-on');
      else if (idx === e.fortalecidas && !e.esMax) s.classList.add('is-toca');
    });
  });
}

// Estado de la asesora de la demo del prototipo.
// Los numeros salen de la economia real de inputs/mecanicas-sistema.md, no son inventados:
//   Por intervencion fortalecida: Progresion +40, Accion +100, Sello de Fortaleza +150 = 290
//   4 fortalecidas = 1160
//   Logros globales ya conseguidos: Entrada +20, Mapa Revelado +50, Primera Reparacion +50,
//     Primera Grieta Sellada +100, Primer Tramo en Marcha +300 = 520
//   Lecciones sueltas (24 x 5) +120
//   Total = 1800 PF
// Rango por intervenciones fortalecidas (no por puntos): 3 a 5 = Constructora.
//
// 2026-07-17, reunion de equipo: eran 1950 y bajan a 1800. El proyecto NO tiene test de
// diagnostico ni directos, asi que caen dos partidas:
//   -50  el diagnostico inicial, que ya no existe.
//   -100 la participacion (4 x 25). Su fila de mecanicas es "participar en sesion, Consejo
//        o revision", y Marta tiene el Consejo desconectado y el Mirador cerrado: sus
//        cuatro participaciones solo podian ser sesiones, y sesiones ya no hay.
// El logro Mapa Revelado sobrevive y mantiene sus +50: se disparaba con el diagnostico y
// pasa a dispararse en el onboarding, cuando Nara te entrega el mapa. Ver docs/CONTENIDO.md.
// OJO: inputs/mecanicas-sistema.md sigue diciendo que el diagnostico existe. Es un input
// del cliente y esta desfasado; lo repone Sepia, no nosotros.

export const asesora = {
  nombre: 'Marta',
  rango: 'Asesora Constructora',
  rangoSiguiente: 'Asesora Estratega',
  avatar: '/assets/avatares/ui/asesora-r3.webp',
  retrato: '/assets/retratos/asesora-r3.webp',
  pf: 1800,
  fortalecidas: 4,
  totalIntervenciones: 12,
  faltanParaSiguiente: 2, // Estratega arranca en 6 fortalecidas
};

// Las tres sendas del triskel (CONTENIDO 5.2)
export const sendas = {
  Orden: { color: 'var(--silver)', intervenciones: [4, 7, 8] },
  Valor: { color: 'var(--amber)', intervenciones: [1, 2, 3] },
  Crecimiento: { color: 'var(--cyan)', intervenciones: [5, 6, 9, 10, 11] },
};

// Estado: fortalecida | activa | bloqueada
export const intervenciones = [
  { n: 1, titulo: 'Sube tus precios', senda: 'Valor', estado: 'fortalecida' },
  { n: 2, titulo: 'Reestructura tus servicios', senda: 'Valor', estado: 'fortalecida' },
  { n: 3, titulo: 'Escala la rentabilidad', senda: 'Valor', estado: 'activa' },
  { n: 4, titulo: 'Organiza tu despacho', senda: 'Orden', estado: 'fortalecida' },
  { n: 5, titulo: 'Hazte visible', senda: 'Crecimiento', estado: 'fortalecida' },
  { n: 6, titulo: 'Convierte y retén', senda: 'Crecimiento', estado: 'bloqueada' },
  { n: 7, titulo: 'Delega y desconecta', senda: 'Orden', estado: 'bloqueada' },
  { n: 8, titulo: 'Conoce tus números', senda: 'Orden', estado: 'bloqueada' },
  { n: 9, titulo: 'Gestiona la percepción de valor', senda: 'Crecimiento', estado: 'bloqueada' },
  { n: 10, titulo: 'Posiciónate como referente', senda: 'Crecimiento', estado: 'bloqueada' },
  { n: 11, titulo: 'Consigue clientes activamente', senda: 'Crecimiento', estado: 'bloqueada' },
  { n: 12, titulo: 'Cierra y planifica', senda: 'Orden', estado: 'bloqueada' },
];

// La intervencion del mes. Ya tiene la Progresion; le toca la Accion.
export const activa = {
  n: 3,
  titulo: 'Escala la rentabilidad',
  senda: 'Valor',
  sabotaje: 'El Rebelde ha escondido los registros de rentabilidad entre los libros. Hay una fuga bajo los cimientos.',
  accion: 'Detecta la fuga y define una acción concreta para cerrarla.',
  cta: 'Ejecutar la maniobra',
  // En produccion esto sera "seguir donde lo dejaste" de LearnDash (lo cablea la
  // plantilla). En el prototipo, ruta con nombre del universo: /mis-cursos era el
  // unico rincon del producto en idioma SaaS.
  ctaHref: '/intervencion',
  tiers: [
    { nombre: 'Progresión', insignia: 'Explorador de los Cimientos del Margen', pf: 40, hecho: true,
      img: '/assets/emblemas-insignias/ui/insignias-intervencion/progresion/insignia-i03-progresion.webp' },
    { nombre: 'Acción', insignia: 'Maniobra del Margen Ejecutada', pf: 100, hecho: false, toca: true,
      img: '/assets/emblemas-insignias/ui/insignias-intervencion/accion/insignia-i03-accion.webp' },
    { nombre: 'Sello de Fortaleza', insignia: 'Cimientos del Margen Fortalecidos', pf: 150, hecho: false,
      img: '/assets/emblemas-insignias/ui/insignias-intervencion/sellos/insignia-i03-sello.webp' },
  ],
};

// La guia no repite lo que ya dice la placa: cuenta COMO opera el villano y dirige
// hacia una sala desconectada. El Consejo es la que lleva mas tiempo sin pisarse.
export const avisoNara = 'El Rebelde no tira muros: deja que el tiempo trabaje para él. El Consejo lleva semanas sin oír tu voz. No le regales otro mes.';

// La linea de estado bajo el saludo del Patio. Sale del estado real de la demo:
// una intervencion activa (la grieta) y dos salas desconectadas (a oscuras).
export const estadoFortaleza = 'La fortaleza resiste: una grieta abierta y dos salas a oscuras.';

// Estados de sala: fortalecida | reparacion | desconectada
export const salas = [
  { slug: 'sala-mandos', nombre: 'Sala de Mandos', href: '/sala-mandos', img: '/assets/mapa-escenas/ui/sala-mandos.webp', estado: 'fortalecida', nota: 'Tus decisiones estructurales, tomadas.' },
  { slug: 'biblioteca', nombre: 'Biblioteca de Recursos', href: '/biblioteca', img: '/assets/mapa-escenas/ui/biblioteca.webp', estado: 'reparacion', nota: 'Los registros del margen siguen escondidos.' },
  { slug: 'torre-retos', nombre: 'Torre de Retos', href: '/torre-retos', img: '/assets/mapa-escenas/ui/torre-retos.webp', estado: 'reparacion', nota: 'Un tramo encendido, cuatro apagados.' },
  { slug: 'consejo', nombre: 'El Consejo', href: '/consejo', img: '/assets/mapa-escenas/ui/consejo.webp', estado: 'desconectada', nota: 'La puerta sigue pesando. Aún no has preguntado.' },
  { slug: 'mirador', nombre: 'Mirador de la Fortaleza', href: '/mirador', img: '/assets/mapa-escenas/ui/mirador.webp', estado: 'desconectada', nota: 'Las ventanas siguen cerradas.' },
];

export const logrosRecientes = [
  { img: '/assets/emblemas-insignias/ui/insignias-intervencion/sellos/insignia-i05-sello.webp', nombre: 'Torre Encendida', pie: 'Sello de Fortaleza, Hazte visible' },
  { img: '/assets/emblemas-insignias/ui/logros-generales/logro-global-primer-tramo.webp', nombre: 'Primer Tramo en Marcha', pie: 'Logro global, 3 intervenciones validadas' },
  { img: '/assets/emblemas-insignias/ui/insignias-intervencion/progresion/insignia-i03-progresion.webp', nombre: 'Explorador de los Cimientos', pie: 'Progresión, Escala la rentabilidad' },
];

// Aqui vivia proximoEvento (el directo mensual con Conchi). Fuera el 2026-07-17: el
// proyecto no tiene directos, ni talleres, ni sesiones. Con el se fue el modulo de la
// convocatoria del Patio y la pagina de Calendario (P11). Ver docs/CONTENIDO.md.

// Los avisos de la campana. Voz de Nara: guia, nunca alarma (CONTENIDO 7), y los tipos
// que ese apartado documenta (sabotaje detectado, nueva intervencion disponible, reto
// pendiente, recordatorio de accion).
//
// NINGUNO es inventado: todos salen del estado de arriba, y por eso la campana no miente.
//   1 y 4 -> la intervencion 3 (activa, Senda del Valor) y su sabotaje
//   2     -> su tier de Accion, pendiente y el que toca (+100 PF)
//   3     -> la Torre en reparacion: "Un tramo encendido, cuatro apagados"
// Si cambia el estado de arriba, estos avisos hay que rehacerlos con el.
//
// Eran cinco: el quinto era el directo del jueves en El Consejo, y cayo con los directos
// (2026-07-17). No se repone con otro: no hay mas estado real que contar sin inventarlo.
export const avisos = [
  {
    nueva: true, cuando: 'Hoy', tipo: 'sabotaje',
    texto: 'Sabotaje en los cimientos: el Rebelde ha escondido los registros de rentabilidad entre los libros.',
    img: '/assets/emblemas-insignias/ui/insignias-intervencion/sellos/insignia-i03-sello.webp',
  },
  {
    nueva: true, cuando: 'Hoy', tipo: 'accion',
    texto: 'Ya exploraste los cimientos. Falta la maniobra: sin la Acción, la grieta sigue abierta.',
    img: '/assets/emblemas-insignias/ui/insignias-intervencion/accion/insignia-i03-accion.webp',
  },
  {
    nueva: true, cuando: 'Ayer', tipo: 'reto',
    texto: 'La Torre tiene un tramo encendido y cuatro apagados. Cada reto que cierras enciende el siguiente.',
    img: '/assets/emblemas-insignias/ui/logros-generales/logro-global-primer-tramo.webp',
  },
  {
    nueva: false, cuando: '12 de julio', tipo: 'intervencion',
    texto: 'Se ha abierto tu intervención del mes en la Senda del Valor: Escala la rentabilidad.',
    img: '/assets/emblemas-insignias/ui/insignias-intervencion/progresion/insignia-i03-progresion.webp',
  },
];

export const avisosSinLeer = avisos.filter((a) => a.nueva).length;

export const ETIQUETA_ESTADO = {
  fortalecida: 'Fortalecida',
  reparacion: 'En reparación',
  desconectada: 'Desconectada',
};

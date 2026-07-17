// Estado de la asesora de la demo del prototipo.
// Los numeros salen de la economia real de inputs/mecanicas-sistema.md, no son inventados:
//   Por intervencion fortalecida: Progresion +40, Accion +100, Sello de Fortaleza +150 = 290
//   4 fortalecidas = 1160
//   Logros globales ya conseguidos: Entrada +20, Mapa Revelado +50, Primera Reparacion +50,
//     Primera Grieta Sellada +100, Primer Tramo en Marcha +300 = 520
//   Progresion de la 3 (la activa, ya recorrida) +40
//   Lecciones sueltas (24 x 5) +120
//   Total = 1840 PF
//
// 2026-07-18: eran 1800 y se dejaban fuera los +40 de la Progresion de la intervencion 3.
// La suma cuadraba consigo misma, pero contradecia al Patio, que pinta esa Progresion como
// hecha (activa.tiers). Lo destapo El asesor al listar las insignias con sus puntos.
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
  // El del chip del HUD, que lo pinta a 34px. Iba al master (512x512, 48KB) en TODAS las
  // paginas: diez veces mas grande de lo que se ve. El ui/ son 160x160 y 8KB.
  retrato: '/assets/retratos/ui/asesora-r3.webp',
  pf: 1840,
  fortalecidas: 4,
  totalIntervenciones: 12,
  faltanParaSiguiente: 2, // Estratega arranca en 6 fortalecidas
};

// Las tres sendas del triskel (CONTENIDO 5.2), mas el cierre, que no es una senda:
// la 12 es transversal a las tres y cierra el ciclo.
//
// 2026-07-17: la 12 decia senda 'Orden' y Orden no la incluia ([4, 7, 8]). Quedaba
// huerfana: se reclamaba de una senda que no la reclamaba. CONTENIDO 5.2 dice
// "Cierre del ciclo | Transversal a las tres sendas | 12". El Mapa lo destapo.
export const sendas = {
  Orden: { nombre: 'Senda del Orden', foco: 'Organización del despacho', color: 'var(--silver)', intervenciones: [4, 7, 8] },
  Valor: { nombre: 'Senda del Valor', foco: 'Servicios estratégicos y rentabilidad', color: 'var(--amber)', intervenciones: [1, 2, 3] },
  Crecimiento: { nombre: 'Senda del Crecimiento', foco: 'Crecimiento de negocio, marketing y ventas', color: 'var(--cyan)', intervenciones: [5, 6, 9, 10, 11] },
};

// La senda que la asesora tiene abierta este mes (la de la intervencion activa)
export const sendaDelMes = 'Valor';

// Estado: fortalecida | activa | bloqueada
export const intervenciones = [
  { n: 1, titulo: 'Sube tus precios', senda: 'Valor', estado: 'fortalecida',
    insignias: { progresion: 'Explorador de la Tabla de Honorarios', accion: 'Ajuste de Honorarios Ejecutado', sello: 'Tabla de Honorarios Recuperada' },
    habilidad: { nombre: 'Defensa del valor', slug: 'defensa-valor' } },
  { n: 2, titulo: 'Reestructura tus servicios', senda: 'Valor', estado: 'fortalecida',
    insignias: { progresion: 'Explorador del Mapa de Servicios', accion: 'Reordenación de Servicios Ejecutada', sello: 'Mapa de Servicios Fortalecido' },
    habilidad: { nombre: 'Arquitectura de oferta', slug: 'arquitectura-oferta' } },
  { n: 3, titulo: 'Escala la rentabilidad', senda: 'Valor', estado: 'activa',
    insignias: { progresion: 'Explorador de los Cimientos del Margen', accion: 'Maniobra del Margen Ejecutada', sello: 'Cimientos del Margen Fortalecidos' },
    habilidad: { nombre: 'Gobierno del margen', slug: 'gobierno-margen' } },
  { n: 4, titulo: 'Organiza tu despacho', senda: 'Orden', estado: 'fortalecida',
    insignias: { progresion: 'Explorador de los Pasillos Internos', accion: 'Proceso Prioritario Ordenado', sello: 'Pasillos Internos Fortalecidos' },
    habilidad: { nombre: 'Orden operativo', slug: 'orden-operativo' } },
  { n: 5, titulo: 'Hazte visible', senda: 'Crecimiento', estado: 'fortalecida',
    insignias: { progresion: 'Explorador de la Torre', accion: 'Señal Exterior Ejecutada', sello: 'Torre Encendida' },
    habilidad: { nombre: 'Visibilidad estratégica', slug: 'visibilidad-estrategica' } },
  { n: 6, titulo: 'Convierte y retén', senda: 'Crecimiento', estado: 'bloqueada',
    insignias: { progresion: 'Explorador de la Puerta Principal', accion: 'Recorrido de Entrada Ejecutado', sello: 'Puerta Principal Fortalecida' },
    habilidad: { nombre: 'Experiencia de entrada', slug: 'experiencia-entrada' } },
  { n: 7, titulo: 'Delega y desconecta', senda: 'Orden', estado: 'bloqueada',
    insignias: { progresion: 'Explorador de las Puertas Laterales', accion: 'Relevo Activado', sello: 'Puertas Laterales Abiertas' },
    habilidad: { nombre: 'Delegación consciente', slug: 'delegacion-consciente' } },
  { n: 8, titulo: 'Conoce tus números', senda: 'Orden', estado: 'bloqueada',
    insignias: { progresion: 'Explorador de los Registros', accion: 'Lectura de Indicadores Ejecutada', sello: 'Registros Liberados' },
    habilidad: { nombre: 'Dirección por datos', slug: 'direccion-datos' } },
  { n: 9, titulo: 'Gestiona la percepción de valor', senda: 'Crecimiento', estado: 'bloqueada',
    insignias: { progresion: 'Explorador de los Estandartes', accion: 'Comunicación de Valor Ejecutada', sello: 'Estandarte Desplegado' },
    habilidad: { nombre: 'Valor visible', slug: 'valor-visible' } },
  { n: 10, titulo: 'Posiciónate como referente', senda: 'Crecimiento', estado: 'bloqueada',
    insignias: { progresion: 'Explorador de la Lente', accion: 'Señal de Autoridad Ejecutada', sello: 'Lente Alineada' },
    habilidad: { nombre: 'Autoridad de mercado', slug: 'autoridad-mercado' } },
  { n: 11, titulo: 'Consigue clientes activamente', senda: 'Crecimiento', estado: 'bloqueada',
    insignias: { progresion: 'Explorador de los Caminos de Acceso', accion: 'Ruta Comercial Ejecutada', sello: 'Camino Iluminado' },
    habilidad: { nombre: 'Iniciativa comercial', slug: 'iniciativa-comercial' } },
  // Transversal a las tres, no de ninguna: es el cierre del ciclo (CONTENIDO 5.2)
  { n: 12, titulo: 'Cierra y planifica', senda: 'Cierre', estado: 'bloqueada',
    insignias: { progresion: 'Explorador del Mapa del Ciclo', accion: 'Revisión de Ciclo Ejecutada', sello: 'Mapa del Ciclo Iluminado' },
    habilidad: { nombre: 'Dirección estratégica', slug: 'direccion-estrategica' } },
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

// EL MAPA DE LA FORTALEZA (P1b). Donde esta LA PUERTA de cada sitio sobre
// mapa-fortaleza.webp, en % del ancho y del alto de la imagen.
//
// Se guarda la PUERTA y no el edificio: el marcador apunta a ella con la punta y se
// planta encima, como una chincheta. Asi dice "se entra por aqui" en vez de "este
// edificio es este". Medido ampliando el asset edificio a edificio (2026-07-17); antes
// los puntos caian en los tejados, que es donde no se entra.
//
// El asset se genero como key visual (prompt B1: "wide establishing aerial cinematic
// shot"), asi que sus edificios no venian asignados a salas. La lectura la cerro Mati
// mirando las formas contra lo que pide cada sala en CONTENIDO 2.2:
//   la torre alta con la luz ambar     -> Torre de Retos ("torre alta, senal exterior").
//                                         Su puerta esta en la BASE, no en el pebetero:
//                                         la luz de arriba es su senal, no su entrada.
//   la cupula circular                 -> El Consejo ("sala circular, luz en el centro").
//                                         Puerta: el arco iluminado del lateral izquierdo.
//   la terraza con escalera            -> Mirador ("ventanales y balcon"). OJO: no tiene
//                                         puerta ni ventanas, es una terraza abierta. Su
//                                         acceso es la escalera, y ahi va la chincheta.
//   la casa redonda mayor, techo conico-> Sala de Mandos ("mesa central de mapas").
//                                         Puerta: el arco con escalones, abajo a la dcha.
//   el rectangulo con el arbol seco    -> Biblioteca (su prompt pide "arbol de la vida
//                                         integrado": ahi esta, seco). Su puerta es el
//                                         arco APAGADO del lateral, y encaja con que la
//                                         sala este en reparacion.
//   el porton con faroles              -> Puerta Principal (intervencion 6)
//
// Castro confirmado por Conchi el 2026-07-17: estas coordenadas ya no corren peligro.
//
// COLOCADAS POR MATI en /calibrar (el andamio interno), no medidas aqui. Y la diferencia
// enseña algo: mis seis medidas estaban desviadas hacia ARRIBA en el mismo sentido, +3,7%
// de media (las cinco primeras entre +2,6 y +4,3). No era ruido, era sesgo: yo apuntaba al
// ARCO de la puerta y el pie de la chincheta va en el UMBRAL, que es donde se pisa. Un
// asset nuevo se calibra en /calibrar, no midiendo a mano.
//
// El Mirador es el unico que se sale del patron (+10,6): lo tenia arriba de la escalera y
// va abajo, en la terraza. Se entiende: la terraza ES el Mirador, y la escalera solo lleva.
export const sitiosDelMapa = [
  { slug: 'torre-retos', x: 32.6, y: 31.2, sala: true },
  { slug: 'sala-mandos', x: 51.8, y: 40.4, sala: true },
  { slug: 'biblioteca', x: 62.1, y: 35.7, sala: true },
  { slug: 'consejo', x: 69.6, y: 60.2, sala: true },
  { slug: 'mirador', x: 27.8, y: 62.9, sala: true },
  // La Puerta no es una sala: es lo que se repara en la intervencion 6, y de momento
  // no tiene pagina. Va como pieza del mapa, no como acceso.
  { slug: 'puerta', x: 69.1, y: 84.6, sala: false, nombre: 'Puerta Principal', nota: 'Se abre mal: los visitantes entran sin orientación.', estado: 'desconectada' },
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

// RECOMPENSAS (P10). El Shop del sistema. SI ES una tienda: el umbral es un PRECIO y al
// reclamar se gastan los PF (Mati, 2026-07-18).
//
// Y lo demuestra la propia economia, no una opinion:
//   ganable en el ciclo entero = 12 x 290 + 820 de logros + 120 de lecciones = 4420 PF
//   las seis recompensas cuestan                                             = 6850 PF
// Cuestan 2430 MAS de lo que existe en todo el ano, o sea que la economia esta hecha para
// que haya que ELEGIR. Si el umbral fuese solo una marca que se alcanza, con 2500 PF
// tendrias las seis, y 2500 se alcanzan sobre la intervencion 6 de 12: media membresia
// sin nada que conseguir. Eso no se sostiene.
//
// EL RANGO NO REGALA NADA (Mati, 2026-07-18). Subir de rango desbloquea la POSIBILIDAD de
// reclamar, no la recompensa: pagar, se paga igual. Por eso el "o rango Asesor Estratega"
// de la Sesion Premium NO se cuenta en pantalla: decirlo prometia que llegar a Estratega
// te la daba, y es falso. Solo cambiaria algo para una Estratega con menos de 2500 PF, que
// no es el caso de la demo, asi que no hay nada que ensenar.
export const recompensas = [
  { slug: 'recompensa-kit-entrada', nombre: 'Kit de Entrada a la Fortaleza', precio: 150 },
  { slug: 'recompensa-plantilla-reparacion', nombre: 'Plantilla de Reparación', precio: 400 },
  { slug: 'recompensa-mapa-prioridades', nombre: 'Mapa de Prioridades de la Fortaleza', precio: 800 },
  { slug: 'recompensa-caso-consejo', nombre: 'Caso de Consejo Ampliado', precio: 1200 },
  { slug: 'recompensa-biblioteca-herramientas', nombre: 'Biblioteca de Herramientas Avanzadas', precio: 1800 },
  { slug: 'recompensa-sesion-premium', nombre: 'Sesión / Taller Premium', precio: 2500 },
];

// La asesora no ha reclamado ninguna todavia, y por eso su saldo (1840) es exactamente lo
// que ha GANADO, que es lo que suma El asesor pieza a pieza. En cuanto reclame una, saldo
// y ganado dejan de ser el mismo numero y habra que separarlos.
export const recompensasReclamadas = [];

// El rango sale de las intervenciones fortalecidas, no de un numero suelto (CONTENIDO
// 5.4). Derivado y no escrito: asi no puede contradecir a asesora.rango.
export const rangoDe = (fortalecidas) =>
  fortalecidas === 0 ? 1 : fortalecidas <= 2 ? 2 : fortalecidas <= 5 ? 3 : fortalecidas <= 8 ? 4 : 5;

// EL ASESOR (P8). Lo que la asesora colecciona.

// Que insignias tiene ganadas de cada intervencion. Se DERIVA del estado en vez de
// escribirse a mano: con una lista aparte, la 3 podria decir aqui una cosa y en
// activa.tiers otra, y ya ha pasado (la 12 huerfana, los +40 que faltaban en los PF).
// activa.tiers manda para la intervencion del mes, que es donde vive su verdad.
export const ganadasDe = (i) => {
  if (i.estado === 'fortalecida') return ['progresion', 'accion', 'sello'];
  if (i.n !== activa.n) return [];
  const clave = { 'Progresión': 'progresion', 'Acción': 'accion', 'Sello de Fortaleza': 'sello' };
  return activa.tiers.filter((t) => t.hecho).map((t) => clave[t.nombre]);
};

// Los seis hitos del ciclo (CONTENIDO 4.3 B). Cinco ganados: el sexto cierra el ano.
export const logrosGlobales = [
  { slug: 'logro-global-entrada', nombre: 'Entrada en la Fortaleza', pf: 20, comoSeGana: 'Inicio de la membresía', ganado: true },
  { slug: 'logro-global-mapa-revelado', nombre: 'Mapa de la Fortaleza Revelado', pf: 50, comoSeGana: 'Nara te entrega el mapa en el onboarding', ganado: true },
  { slug: 'logro-global-primera-reparacion', nombre: 'Primera Reparación Ejecutada', pf: 50, comoSeGana: 'Primera acción o reto ejecutado', ganado: true },
  { slug: 'logro-global-primera-grieta', nombre: 'Primera Grieta Sellada', pf: 100, comoSeGana: 'Primera implementación declarada', ganado: true },
  { slug: 'logro-global-primer-tramo', nombre: 'Primer Tramo de Fortaleza en Marcha', pf: 300, comoSeGana: '3 intervenciones fortalecidas', ganado: true },
  { slug: 'logro-global-cierre-ciclo', nombre: 'Cierre del Primer Ciclo', pf: 300, comoSeGana: 'Revisión final de los 12 meses', ganado: false },
];

// El arquetipo del Test de Player. Solo uno es tuyo: el test no es nuestro, solo
// mostramos el resultado (CONTENIDO 4.3 C). Los nombres del universo salen de
// inputs/test-de-players.md; entre parentesis, el arquetipo de Bartle del que vienen.
//
// Marta es de Avance, y no al azar: es lo unico que cuadra con su estado. Tiene 4
// intervenciones fortalecidas (ejecuta), pero el Consejo desconectado (no pregunta) y el
// Mirador cerrado (no comparte). Eso es una conseguidora, no una socializadora.
export const arquetipos = [
  { slug: 'conseguidor', nombre: 'Asesor de Avance', bartle: 'Conseguidor', linea: 'Avanzas cerrando cosas. Te mueve terminar lo que empiezas y verlo en marcha.', tuyo: true },
  { slug: 'explorador', nombre: 'Asesor Rastreador', bartle: 'Explorador', linea: 'Avanzas entendiendo. Antes de decidir quieres ver el mapa entero.', tuyo: false },
  { slug: 'socializador', nombre: 'Asesor de Alianza', bartle: 'Socializador', linea: 'Avanzas con otros. Lo que aprendes lo pones en común.', tuyo: false },
  { slug: 'killer', nombre: 'Asesor del Desafío', bartle: 'Killer', linea: 'Avanzas midiéndote. El reto es lo que te pone en marcha.', tuyo: false },
];

export const ETIQUETA_ESTADO = {
  fortalecida: 'Fortalecida',
  reparacion: 'En reparación',
  desconectada: 'Desconectada',
};

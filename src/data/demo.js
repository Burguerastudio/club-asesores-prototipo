// Estado de la asesora de la demo del prototipo.
//
// ECONOMIA REHECHA EL 2026-07-20. Sepia entrego una version nueva del sistema de
// gamificacion (inputs/mecanicas-gamificacion.md) que sustituye a la anterior. Los
// importes de antes (+40/+100/+150 = 290 por intervencion, 36 insignias, 1840 PF) YA NO
// VALEN: eran de inputs/mecanicas-sistema.md, que queda marcado como desfasado.
//
// Lo que cuenta una intervencion ahora, segun la tabla de puntos (seccion 2) repartida en
// los tres pasos de la Logica de Ejecucion (seccion 9):
//   Progresion  contenido principal +10, recurso de Biblioteca +15   =  25
//   Accion      el Reto de Torre                                     =  40
//   Evolucion   modulo completo +25, insignia de intervencion +25    =  50
//                                                          TOTAL     = 115 PF
//
// El saldo de Marta, pieza a pieza:
//   4 intervenciones fortalecidas x 115                    = 460
//   La 3 (activa), con la Progresion hecha y el Reto no    =  25
//   Entrada en la Fortaleza (onboarding)                   =  30
//   Primer Mecanismo Activado (su primera insignia)        =  40
//   Hito de puntos: completar 4 intervenciones             =  50
//   Recursos sueltos de Biblioteca aplicados (8 x 15)      = 120
//                                                    TOTAL = 725 PF
//
// Y 725 cae en un sitio bueno para ensenar: tiene tres recompensas a su alcance y la
// cuarta a 25 PF. No esta elegido al azar.
//
// SE CAE EL SELLO DE FORTALEZA, y con el el test de compromiso: el documento nuevo dice
// "no incluir validacion manual, formularios obligatorios". El tercer paso pasa a llamarse
// Evolucion y se gana solo, al completar el modulo.
//
// El rango depende de INSIGNIAS conseguidas, no de puntos (seccion 4): 1, 4, 8 y 12.
export const asesora = {
  nombre: 'Marta',
  rango: 'Asesora Constructora',
  rangoSiguiente: 'Asesora Estratega',
  avatar: '/assets/avatares/ui/asesora-r3.webp',
  // El del chip del HUD, que lo pinta a 34px. Iba al master (512x512, 48KB) en TODAS las
  // paginas: diez veces mas grande de lo que se ve. El ui/ son 160x160 y 8KB.
  retrato: '/assets/retratos/ui/asesora-r3.webp',
  pf: 725,
  fortalecidas: 4,
  totalIntervenciones: 12,
  faltanParaSiguiente: 4, // Estratega pide 8 insignias y tiene 4
};

// Lo que vale cada paso, en un solo sitio. Las paginas leen de aqui en vez de escribir
// "+40" a mano, que es como se acumulan las contradicciones.
export const PF = {
  progresion: 25,   // contenido principal +10, recurso de Biblioteca +15
  reto: 40,         // el Reto de Torre
  evolucion: 50,    // modulo completo +25, insignia +25
  porIntervencion: 115,
  recursoSuelto: 15,
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
export const sendaDelMes = 'Crecimiento';

// LAS DOCE INTERVENCIONES.
//
// UNA insignia por intervencion, no tres (mecanicas-gamificacion 3.1). El documento lo
// razona: "no recomiendo crear tres insignias por cada intervencion, porque eso llevaria a
// 36 insignias y generaria ruido". Con los 3 logros globales son 15 en total.
//
// Y los 36 assets NO se tiran, porque resulta que los tres juegos son la MISMA insignia
// con tres cargas: piedra apagada (progresion/), plata encendida (accion/) y oro con
// laurel (sellos/). O sea que son 12 insignias x 3 estados, y el arte que el cliente
// valido en el deck sigue vivo entero. Lo pinta insigniaDe() aqui abajo.
//
//   nombre    de mecanicas-gamificacion 3.1 (las 12 insignias con su trigger)
//   reto      el Reto de Torre, columna "Accion" de la Matriz de Sistema (seccion 8)
//   cambio    lo que le pasa a la fortaleza, de CONTENIDO 5.2
//   mensaje   el email de desbloqueo de 3.1, tal cual lo escribio Sepia
//   habilidad columna "Habilidad desbloqueada" de la Matriz de Sistema
//
// OJO con habilidad: el NOMBRE es el del documento nuevo, pero el SLUG sigue siendo el del
// asset ya generado, que en nueve de las doce no coincide (defensa-valor pasa a llamarse
// "Criterio de valor", gobierno-margen a "Lectura de rentabilidad"...). No es un descuido:
// el documento renombra las etiquetas pero la habilidad es la misma, asi que el emblema
// vale tal cual y no hay que pedirle a Mati nueve piezas identicas con otro nombre.
//
// Estado: fortalecida | activa | bloqueada
export const intervenciones = [
  { n: 1, titulo: 'Sube tus precios', senda: 'Valor', estado: 'fortalecida',
    insignia: 'Defensor del Valor',
    sinopsis: 'Cómo subir lo que cobras con metodología y sin perder clientes en el proceso. Dejas de justificar tus tarifas y empiezas a cobrar lo que tu trabajo vale.',
    reto: 'Revisar precios y definir subida, ajuste o nueva estructura de honorarios.',
    cambio: 'La tabla vuelve a ser legible; la Sala de Mandos recupera estabilidad.',
    mensaje: 'La tabla de honorarios vuelve a ser legible. Has dado el primer paso para proteger el valor que sostiene tu fortaleza.',
    habilidad: { nombre: 'Criterio de valor', slug: 'defensa-valor' } },
  { n: 2, titulo: 'Reestructura tus servicios', senda: 'Valor', estado: 'fortalecida',
    insignia: 'Arquitecto de Servicios',
    sinopsis: 'Ordena lo que ofreces para que tenga sentido, sea rentable y el cliente lo entienda. Menos caos, más claridad en lo que vendes y a quién.',
    reto: 'Reordenar servicios, límites, paquetes o categorías de oferta.',
    cambio: 'El mapa de servicios vuelve a estar claro; las puertas internas recuperan función.',
    mensaje: 'Los planos vuelven a tener sentido. Cada servicio empieza a ocupar su lugar dentro de la fortaleza.',
    habilidad: { nombre: 'Claridad de oferta', slug: 'arquitectura-oferta' } },
  { n: 3, titulo: 'Escala la rentabilidad', senda: 'Valor', estado: 'fortalecida',
    insignia: 'Guardián del Margen',
    sinopsis: 'Cómo crecer sin que todo dependa de ti. Identificas dónde se escapa el dinero y construyes una asesoría que produce más con el mismo esfuerzo.',
    reto: 'Detectar una fuga de rentabilidad y definir una acción concreta para corregirla.',
    cambio: 'Se ilumina el estante del margen; los cimientos recuperan solidez.',
    mensaje: 'Has encontrado una fuga bajo los cimientos. La fortaleza recupera fuerza desde dentro.',
    habilidad: { nombre: 'Lectura de rentabilidad', slug: 'gobierno-margen' } },
  { n: 4, titulo: 'Organiza tu despacho', senda: 'Orden', estado: 'fortalecida',
    insignia: 'Maestro del Orden',
    sinopsis: 'Pon orden en el día a día. Procesos, recogida de documentación, gestión del tiempo. La base sin la que todo lo demás se construye sobre arena.',
    reto: 'Ordenar o documentar un proceso prioritario del despacho.',
    cambio: 'Los pasillos internos recuperan señalización y circulación.',
    mensaje: 'Los pasillos internos vuelven a estar señalizados. Tu fortaleza depende un poco menos de la improvisación.',
    habilidad: { nombre: 'Orden operativo', slug: 'orden-operativo' } },
  { n: 5, titulo: 'Hazte visible', senda: 'Crecimiento', estado: 'activa',
    insignia: 'Primer Faro Encendido',
    sinopsis: 'Dónde tiene que estar tu asesoría para que te encuentren los clientes que quieres. Google, directorios, presencia en buscadores de IA. Sin publicidad, sin redes sociales obligatorias.',
    reto: 'Optimizar un canal o punto de visibilidad concreto.',
    cambio: 'La Torre emite una primera señal exterior.',
    mensaje: 'La Torre ha encendido su primera señal. Ahora tu fortaleza se distingue un poco mejor desde fuera.',
    habilidad: { nombre: 'Visibilidad estratégica', slug: 'visibilidad-estrategica' } },
  { n: 6, titulo: 'Convierte y retén', senda: 'Crecimiento', estado: 'bloqueada',
    insignia: 'Custodio de la Entrada',
    sinopsis: 'Que el cliente que te contacta acabe contratando. Que el que ya tienes quiera quedarse. Primera impresión, propuesta, bienvenida y fidelización sin bajar precios.',
    reto: 'Mejorar una propuesta, onboarding, seguimiento o experiencia inicial.',
    cambio: 'La Puerta Principal se ilumina y ordena su recorrido.',
    mensaje: 'La Puerta Principal vuelve a guiar a quien entra. Tu fortaleza recibe con más claridad.',
    habilidad: { nombre: 'Experiencia inicial', slug: 'experiencia-entrada' } },
  { n: 7, titulo: 'Delega y desconecta', senda: 'Orden', estado: 'bloqueada',
    insignia: 'Llave de Relevo',
    sinopsis: 'Protocolos, delegación y sistemas para que tu despacho funcione cuando tú no estás. Vacaciones sin el móvil en la mano.',
    reto: 'Delegar, sistematizar o transferir una tarea para reducir la dependencia del titular.',
    cambio: 'Se abre una puerta lateral; el Mirador recupera visibilidad.',
    mensaje: 'Has abierto una puerta lateral. La fortaleza ya no concentra todo el peso en un único punto.',
    habilidad: { nombre: 'Delegación segura', slug: 'delegacion-consciente' } },
  { n: 8, titulo: 'Conoce tus números', senda: 'Orden', estado: 'bloqueada',
    insignia: 'Lector de Registros',
    sinopsis: 'Los indicadores que todo asesor debería tener controlados. Coste real por cliente, clasificación de cartera y plan para tomar decisiones con datos, no con intuición.',
    reto: 'Revisar indicadores clave: clientes, costes, rentabilidad, capacidad o margen.',
    cambio: 'Los registros se liberan; el mapa gana una capa de lectura estratégica.',
    mensaje: 'Los registros se han liberado. Ahora el mapa muestra una nueva capa de lectura estratégica.',
    habilidad: { nombre: 'Decisión basada en datos', slug: 'direccion-datos' } },
  { n: 9, titulo: 'Gestiona la percepción de valor', senda: 'Crecimiento', estado: 'bloqueada',
    insignia: 'Portador del Estandarte',
    sinopsis: 'Haz visible lo que haces para que el cliente lo valore. Comunicación proactiva, momentos de contacto planificados y cómo evitar que te comparen solo por precio.',
    reto: 'Crear una acción de comunicación proactiva del valor entregado.',
    cambio: 'Aparece un estandarte visible en la muralla.',
    mensaje: 'Un nuevo estandarte se despliega en la muralla. Tu valor empieza a verse con más claridad.',
    habilidad: { nombre: 'Comunicación de valor', slug: 'valor-visible' } },
  { n: 10, titulo: 'Posiciónate como referente', senda: 'Crecimiento', estado: 'bloqueada',
    insignia: 'Vigía del Criterio',
    sinopsis: 'De asesor técnico a asesor de referencia. Cómo diferenciarte de verdad, construir autoridad en tu mercado y ser el que eligen, no el que aceptan.',
    reto: 'Definir o reforzar posicionamiento, especialidad o criterio diferencial.',
    cambio: 'La Torre emite una señal estable y reconocible.',
    mensaje: 'La lente de la Torre vuelve a estar alineada. Tu señal de autoridad gana claridad.',
    habilidad: { nombre: 'Autoridad profesional', slug: 'autoridad-mercado' } },
  { n: 11, titulo: 'Consigue clientes activamente', senda: 'Crecimiento', estado: 'bloqueada',
    insignia: 'Abridor de Caminos',
    sinopsis: 'Captación sin depender de que te lleguen solos. Red de prescriptores, alianzas con otros profesionales y cómo activar a tus clientes actuales para que te refieran.',
    reto: 'Activar una colaboración, prescriptor, contacto, recomendación o acción comercial.',
    cambio: 'Aparece un camino de acceso iluminado.',
    mensaje: 'Un nuevo camino de acceso se ilumina. Tu fortaleza ya no depende solo de esperar.',
    habilidad: { nombre: 'Iniciativa comercial', slug: 'iniciativa-comercial' } },
  // Transversal a las tres, no de ninguna: es el cierre del ciclo (CONTENIDO 5.2)
  { n: 12, titulo: 'Cierra y planifica', senda: 'Cierre', estado: 'bloqueada',
    insignia: 'Consejero del Ciclo',
    sinopsis: 'Revisa el año con datos, toma decisiones para el siguiente y arranca enero con un plan concreto. Precios, servicios, equipo, clientes. Todo en orden.',
    reto: 'Revisar avances, cerrar el ciclo y planificar las siguientes prioridades.',
    cambio: 'El mapa del primer ciclo queda iluminado y aparecen nuevas áreas futuras.',
    mensaje: 'La niebla se retira del mapa. Has cerrado el ciclo con más criterio y nuevas rutas por delante.',
    habilidad: { nombre: 'Dirección del siguiente ciclo', slug: 'direccion-estrategica' } },
];

// La insignia de una intervencion, con la carga que le toca por su estado. Los tres
// juegos de assets son el mismo emblema apagado, encendido y sellado en oro.
const CARGA = {
  bloqueada: { dir: 'progresion', suf: 'progresion' }, // piedra apagada
  activa: { dir: 'accion', suf: 'accion' },            // plata, encendida en cian
  fortalecida: { dir: 'sellos', suf: 'sello' },        // oro con laurel
};
export const insigniaDe = (i) => {
  const c = CARGA[i.estado];
  const nn = String(i.n).padStart(2, '0');
  return `/assets/emblemas-insignias/ui/insignias-intervencion/${c.dir}/insignia-i${nn}-${c.suf}.webp`;
};

// Las 36 insignias, con nombre propio: cada intervencion tiene TRES pasos (Progresion,
// Reto de Torre, Evolucion), y cada paso su medalla. Restaurado el 2026-07-21 a peticion
// de Mati: el cliente quiere las 36 ya generadas, no 12 (queda anotado en
// inputs/mecanicas-gamificacion.md que este punto se aparta del doc). El nombre del sello
// (evolucion) NO se guarda aqui: es intervencion.insignia, el mismo que usa la Torre, para
// que no haya dos verdades. Aqui solo viven los nombres de Progresion y Reto.
export const NOMBRES_INSIGNIA = {
  1:  { progresion: 'Explorador de la Tabla de Honorarios', reto: 'Ajuste de Honorarios Ejecutado' },
  2:  { progresion: 'Explorador del Mapa de Servicios',     reto: 'Reordenación de Servicios Ejecutada' },
  3:  { progresion: 'Explorador de los Cimientos del Margen', reto: 'Maniobra del Margen Ejecutada' },
  4:  { progresion: 'Explorador de los Pasillos Internos',  reto: 'Proceso Prioritario Ordenado' },
  5:  { progresion: 'Explorador de la Torre',               reto: 'Señal Exterior Ejecutada' },
  6:  { progresion: 'Explorador de la Puerta Principal',    reto: 'Recorrido de Entrada Ejecutado' },
  7:  { progresion: 'Explorador de las Puertas Laterales',  reto: 'Relevo Activado' },
  8:  { progresion: 'Explorador de los Registros',          reto: 'Lectura de Indicadores Ejecutada' },
  9:  { progresion: 'Explorador de los Estandartes',        reto: 'Comunicación de Valor Ejecutada' },
  10: { progresion: 'Explorador de la Lente',              reto: 'Señal de Autoridad Ejecutada' },
  11: { progresion: 'Explorador de los Caminos de Acceso', reto: 'Ruta Comercial Ejecutada' },
  12: { progresion: 'Explorador del Mapa del Ciclo',       reto: 'Revisión de Ciclo Ejecutada' },
};

// La intervencion del mes. Ya tiene la Progresion; le toca la Accion.
//
// 2026-07-21: es la 5, no la 3. El club es LINEAL (el cliente: "cada mes se le desbloquearia
// uno"), asi que Marta va 1,2,3,4 fortalecidas y esta en la 5. Antes la demo tenia la 3
// activa con la 4 y 5 ya hechas (saltando peldanos), que no es lineal: la escalera de la
// Torre lo destapo. Sigue siendo Constructora (4 insignias) y 725 PF: solo cambia CUAL es
// la del mes, no cuantas lleva.
export const activa = {
  n: 5,
  titulo: 'Hazte visible',
  senda: 'Crecimiento',
  sabotaje: 'El Rebelde ha apagado las luces de la Torre y ha girado los espejos: tu señal exterior se pierde en la niebla.',
  accion: 'Optimiza un canal o un punto de visibilidad concreto.',
  cta: 'Encender la señal',
  // La intervencion vive en El Patio (fundida el 2026-07-21). El CTA no lleva a "ver la
  // intervencion" (ya la ves aqui): es la ACCION, el Reto, que se ejecuta en la Torre.
  ctaHref: '/torre-retos',
  // Los tres pasos de la Logica de Ejecucion (mecanicas-gamificacion 9). Ya no son tres
  // insignias: es UNA insignia (Primer Faro Encendido) que se gana al final, en Evolucion.
  tiers: [
    { nombre: 'Progresión', que: 'Contenido principal y recurso de Biblioteca', pf: 25, hecho: true,
      img: '/assets/emblemas-insignias/ui/insignias-intervencion/progresion/insignia-i05-progresion.webp' },
    { nombre: 'Reto de Torre', que: 'Optimizar un canal o punto de visibilidad concreto', pf: 40, hecho: false, toca: true,
      img: '/assets/emblemas-insignias/ui/insignias-intervencion/accion/insignia-i05-accion.webp' },
    { nombre: 'Evolución', que: 'La intervención queda reparada', insignia: 'Primer Faro Encendido', pf: 50, hecho: false,
      img: '/assets/emblemas-insignias/ui/insignias-intervencion/sellos/insignia-i05-sello.webp' },
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
  { slug: 'torre-retos', nombre: 'Torre de Retos', href: '/torre-retos', img: '/assets/mapa-escenas/ui/torre-retos.webp', estado: 'reparacion', nota: 'Cuatro tramos encendidos, ocho apagados.' },
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

// Los tres ultimos. Con el modelo lineal (2026-07-21) Marta tiene fortalecidas la 1,2,3,4:
// su ultima insignia es la 4 (Maestro del Orden), no la 5, que ahora esta activa (aun no
// ganada). Son de los 15 logros que hay.
export const logrosRecientes = [
  { img: '/assets/emblemas-insignias/ui/insignias-intervencion/sellos/insignia-i04-sello.webp', nombre: 'Maestro del Orden', pie: 'Insignia, Organiza tu despacho' },
  { img: '/assets/emblemas-insignias/ui/insignias-intervencion/sellos/insignia-i03-sello.webp', nombre: 'Guardián del Margen', pie: 'Insignia, Escala la rentabilidad' },
  { img: '/assets/emblemas-insignias/ui/logros-generales/logro-global-primera-reparacion.webp', nombre: 'Primer Mecanismo Activado', pie: 'Logro global, tu primera insignia' },
];

// Aqui vivia proximoEvento (el directo mensual con Conchi). Fuera el 2026-07-17: el
// proyecto no tiene directos, ni talleres, ni sesiones. Con el se fue el modulo de la
// convocatoria del Patio y la pagina de Calendario (P11). Ver docs/CONTENIDO.md.

// Los avisos de la campana. Voz de Nara: guia, nunca alarma (CONTENIDO 7), y los tipos
// que ese apartado documenta (sabotaje detectado, nueva intervencion disponible, reto
// pendiente, recordatorio de accion).
//
// NINGUNO es inventado: todos salen del estado de arriba, y por eso la campana no miente.
//   1 y 4 -> la intervencion 5 (activa, Senda del Crecimiento) y su sabotaje
//   2     -> su tier de Accion (el Reto de Torre), pendiente y el que toca (+40 PF)
//   3     -> los 25 PF que le faltan para el siguiente umbral de Recompensas
// Si cambia el estado de arriba, estos avisos hay que rehacerlos con el.
//
// Eran cinco: el quinto era el directo del jueves en El Consejo, y cayo con los directos
// (2026-07-17). No se repone con otro: no hay mas estado real que contar sin inventarlo.
export const avisos = [
  {
    nueva: true, cuando: 'Hoy', tipo: 'sabotaje',
    texto: 'Sabotaje en la Torre: el Rebelde ha apagado las luces y girado los espejos para que tu señal se pierda en la niebla.',
    img: '/assets/emblemas-insignias/ui/insignias-intervencion/sellos/insignia-i05-sello.webp',
  },
  {
    nueva: true, cuando: 'Hoy', tipo: 'accion',
    texto: 'Ya recorriste el contenido. Falta el Reto de Torre: sin ejecutarlo, la señal no vuelve a salir.',
    img: '/assets/emblemas-insignias/ui/insignias-intervencion/accion/insignia-i05-accion.webp',
  },
  {
    nueva: true, cuando: 'Ayer', tipo: 'reto',
    texto: 'Estás a 25 PF de abrir el Mapa de Fortalecimiento Mensual. Ese umbral no se gasta: una vez cruzado, queda abierto.',
    img: '/assets/recompensas/ui/recompensa-mapa-prioridades.webp',
  },
  {
    nueva: false, cuando: '12 de julio', tipo: 'intervencion',
    texto: 'Se ha abierto tu intervención del mes en la Senda del Crecimiento: Hazte visible.',
    img: '/assets/emblemas-insignias/ui/insignias-intervencion/progresion/insignia-i05-progresion.webp',
  },
];

export const avisosSinLeer = avisos.filter((a) => a.nueva).length;

// RECOMPENSAS (P10). El Shop del sistema.
//
// NO ES UNA TIENDA (mecanicas-gamificacion 6, 2026-07-20). Es un desbloqueo por umbral:
// al llegar a los puntos, la recompensa se abre y los PF NO se gastan. El documento lo
// dice dos veces: "Recomiendo un sistema de desbloqueo por umbral de puntos, no una tienda
// de canje", y en la tabla del MVP, "Tienda de canje: No".
//
// Esto REVIERTE lo que decidimos el 2026-07-18, y con razon. Aquel dia argumente que tenia
// que ser tienda porque las recompensas costaban 6850 y en el ciclo solo se ganaban 4420:
// sin gasto, con 2500 PF las tendrias las seis. Pero esos numeros eran de la economia
// vieja. Con la nueva se ganan ~1845 en el ciclo y las seis suman 4000, con la ultima en
// 1300: la escalera sube contigo y la de arriba cae justo al final del ano. Cuadra sin
// tienda, que era lo que Sepia queria desde el principio.
//
// Las descripciones vienen del documento (columnas "Que es exactamente" y "Sentido
// narrativo"). Eran un cabo suelto de PLAN-PANTALLAS: ya no lo son.
//
// LOS ASSETS los he reasignado por lo que DIBUJAN, no por como se llama el archivo: los
// nombres viejos ya no existen. Mati, si alguno canta, se cambia la linea img y ya.
export const recompensas = [
  { slug: 'kit-nara', nombre: 'Kit de Entrada de Nara', umbral: 150,
    img: '/assets/recompensas/ui/recompensa-kit-entrada.webp',
    que: 'PDF breve con el mapa de la fortaleza, la explicación de las salas y una guía de primeros pasos.',
    porque: 'Nara te entrega tu primer mapa útil.' },
  { slug: 'plantilla-mandos', nombre: 'Plantilla de Sala de Mandos', umbral: 300,
    img: '/assets/recompensas/ui/recompensa-caso-consejo.webp',
    que: 'Plantilla para ordenar las decisiones pendientes del despacho.',
    porque: 'Convierte el caos en decisiones visibles.' },
  { slug: 'pack-biblioteca', nombre: 'Pack Biblioteca Aplicada', umbral: 500,
    img: '/assets/recompensas/ui/recompensa-sesion-premium.webp',
    que: 'Mini pack de plantillas y checklists de implementación rápida.',
    porque: 'Refuerza la idea de usar los recursos, no acumularlos.' },
  { slug: 'mapa-fortalecimiento', nombre: 'Mapa de Fortalecimiento Mensual', umbral: 750,
    img: '/assets/recompensas/ui/recompensa-mapa-prioridades.webp',
    que: 'Documento para revisar qué sala se ha fortalecido cada mes.',
    porque: 'Ayuda a mantener la fortaleza en movimiento.' },
  { slug: 'registro-grietas', nombre: 'Registro de Grietas Pendientes', umbral: 1000,
    img: '/assets/recompensas/ui/recompensa-plantilla-reparacion.webp',
    que: 'Plantilla de auditoría para detectar qué sigue desordenado.',
    porque: 'Convierte la continuidad en mantenimiento consciente.' },
  { slug: 'cofre-avanzados', nombre: 'Cofre de Recursos Avanzados', umbral: 1300,
    img: '/assets/recompensas/ui/recompensa-biblioteca-herramientas.webp',
    que: 'Selección de recursos premium y bonus para asesores avanzados.',
    porque: 'Recompensa a quien sostiene el avance durante todo el ciclo.' },
];

// Con umbral no hay saldo que gastar: una recompensa esta abierta o no, y se sabe mirando
// los puntos. Por eso esto se DERIVA y no hay lista de reclamadas que mantener.
export const abierta = (r) => asesora.pf >= r.umbral;

// La primera que aun no llega, para poder decir cuanto falta. undefined si estan todas.
export const siguienteRecompensa = recompensas.find((r) => !abierta(r));

// El rango sale de las INSIGNIAS conseguidas, no de los puntos (mecanicas-gamificacion 4):
// Base al entrar, en Guardia con 1, Constructor con 4, Estratega con 8, Fortalecido con 12.
// Derivado y no escrito: asi no puede contradecir a asesora.rango.
export const rangoDe = (insignias) =>
  insignias === 0 ? 1 : insignias < 4 ? 2 : insignias < 8 ? 3 : insignias < 12 ? 4 : 5;

// EL ASESOR (P8). Lo que la asesora colecciona.

// Que pasos lleva hechos de una intervencion. Se DERIVA del estado en vez de escribirse a
// mano: con una lista aparte, la 3 podria decir aqui una cosa y en activa.tiers otra, y ya
// ha pasado (la 12 huerfana, los PF que no cuadraban). activa.tiers manda para la
// intervencion del mes, que es donde vive su verdad.
export const pasosDe = (i) => {
  if (i.estado === 'fortalecida') return ['progresion', 'reto', 'evolucion'];
  if (i.n !== activa.n) return [];
  const clave = { 'Progresión': 'progresion', 'Reto de Torre': 'reto', 'Evolución': 'evolucion' };
  return activa.tiers.filter((t) => t.hecho).map((t) => clave[t.nombre]);
};

// Tiene ganada la insignia de esta intervencion? Solo con la Evolucion, que es el paso
// que la entrega (mecanicas-gamificacion 9.3).
export const tieneInsignia = (i) => pasosDe(i).includes('evolucion');

// LOS SEIS LOGROS GLOBALES (CONTENIDO 4.3 B). Restaurados el 2026-07-21 a peticion de
// Mati: los seis assets ya estan generados y el cliente los quiere todos. Cinco ganados;
// el sexto cierra el ano. Cada uno lleva su mensaje, que es lo que la fortaleza te dice al
// cruzarlo, para la carta de la pestana de Hitos.
export const logrosGlobales = [
  { slug: 'logro-global-entrada', nombre: 'Entrada en la Fortaleza', pf: 20,
    comoSeGana: 'Inicio de la membresía', ganado: true,
    mensaje: 'Has cruzado la puerta. La fortaleza ya es tuya, pero ahora empieza el verdadero trabajo: aprender a dirigirla desde dentro.' },
  { slug: 'logro-global-mapa-revelado', nombre: 'Mapa de la Fortaleza Revelado', pf: 50,
    comoSeGana: 'Nara te entrega el mapa en el onboarding', ganado: true,
    mensaje: 'Nara despliega el mapa del castro. Ya ves las tres sendas y hacia dónde llevan tus próximos meses.' },
  { slug: 'logro-global-primera-reparacion', nombre: 'Primera Reparación Ejecutada', pf: 50,
    comoSeGana: 'Primera acción o reto ejecutado', ganado: true,
    mensaje: 'El primer mecanismo vuelve a moverse. Ya no estás mirando la fortaleza: has empezado a activarla.' },
  { slug: 'logro-global-primera-grieta', nombre: 'Primera Grieta Sellada', pf: 100,
    comoSeGana: 'Primera implementación declarada', ganado: true,
    mensaje: 'La primera grieta queda sellada. Lo que reparaste no vuelve a abrirse: tu fortaleza gana solidez.' },
  { slug: 'logro-global-primer-tramo', nombre: 'Primer Tramo de Fortaleza en Marcha', pf: 300,
    comoSeGana: '3 intervenciones fortalecidas', ganado: true,
    mensaje: 'Tres intervenciones fortalecidas. Un tramo entero de tu fortaleza vuelve a estar en marcha.' },
  { slug: 'logro-global-cierre-ciclo', nombre: 'Cierre del Primer Ciclo', pf: 300,
    comoSeGana: 'Revisión final de los 12 meses', ganado: false,
    mensaje: 'Al cerrar los doce meses revisas el ciclo entero con criterio y trazas el mapa del siguiente.' },
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

// La etiqueta VISIBLE de una sala. Ojo: una sala se "Activa", no se "Fortaleza". Fortalecido
// es palabra de TEMA (una intervencion cerrada); activada es palabra de SALA (un espacio que
// vuelve a funcionar). El brief lo separa a proposito (CONTENIDO 4.2: "desconectada -> en
// reparacion -> activada"), y usar "Fortalecida" aqui pisaba los dos niveles y confundia:
// al pasar por una sala en el Mapa parecia que te hablaba del tema. La clave interna sigue
// siendo 'fortalecida' (cambiarla tocaria CSS y datos); solo cambia lo que se lee.
export const ETIQUETA_ESTADO = {
  fortalecida: 'Activada',
  reparacion: 'En reparación',
  desconectada: 'Desconectada',
};

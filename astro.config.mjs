import { defineConfig } from 'astro/config';

// Prototipo Club de Asesores (La Fortaleza del Asesor).
// La home es, de momento, la presentacion de las dos direcciones visuales (Fase 3).
// Cuando lleguemos al Dashboard (Fase 4) se reorganizan las rutas.
export default defineConfig({
  // La barra de desarrollo de Astro tapa la esquina inferior y estorba al verificar el
  // responsive (la barra de navegacion movil vive justo ahi). No afecta a produccion.
  devToolbar: { enabled: false },
});

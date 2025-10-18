# Diseño Visual para Seonergy.es - Agencia Digital

## Enfoque de Diseño: Vanguardista Creativo

**Inspiración de Referencia:** Combinación de Apple (minimalismo), Awwwards showcase sites (creatividad), y agencias boutique como Fantasy Interactive o Active Theory. El objetivo es crear una experiencia inmersiva que demuestre las capacidades técnicas y creativas de Seonergy.

## Paleta de Color

**Modo Oscuro Predominante** (profesional y sofisticado):
- **Base Dark:** 220 15% 8% (fondo principal casi negro)
- **Surface:** 220 12% 12% (tarjetas y elementos elevados)
- **Primary Brand:** 280 85% 65% (púrpura vibrante, no gradiente)
- **Accent Tech:** 180 75% 55% (cyan/turquesa tecnológico)
- **Text Primary:** 0 0% 98% (blanco puro para títulos)
- **Text Secondary:** 220 10% 70% (gris claro para descripciones)

## Tipografía

**Fuentes:** Google Fonts vía CDN
- **Display/Títulos:** "Space Grotesk" - Bold 700, ExtraBold 800 (futurista y técnica)
- **Body:** "Inter" - Regular 400, Medium 500 (legibilidad óptima)
- **Accents:** "JetBrains Mono" - Regular 400 (detalles de código/tech)

**Jerarquía:**
- Hero Title: 4xl-6xl (móvil-desktop), font-bold, tracking-tight
- Section Headings: 3xl-5xl, font-extrabold
- Subheadings: xl-2xl, font-medium
- Body: base-lg, leading-relaxed

## Sistema de Espaciado

**Unidades Tailwind Consistentes:** 4, 8, 12, 16, 20, 24, 32
- Componentes internos: p-4, p-8
- Secciones verticales: py-20 (móvil), py-32 (desktop)
- Gaps entre elementos: gap-8, gap-12

## Componentes Principales

### 1. Hero Video Fullscreen (100vh)
- Video de fondo a pantalla completa con overlay oscuro (bg-black/40)
- Contenido centrado verticalmente con animación de fade-in escalonada
- Título principal ultra-bold con efecto de typing o glitch sutil
- Subtítulo descriptivo con fade-in delayed
- CTA dual: botón primario filled + botón outline con backdrop-blur-md
- Scroll indicator animado en la parte inferior

### 2. Menú Fullscreen Expandible
**Estado Cerrado:**
- Header fixed top con backdrop-blur-lg, bg-dark/80
- Logo izquierda, hamburger derecha (3 líneas que transforman en X)
- Altura: h-16 o h-20

**Estado Expandido (100vw x 100vh):**
- Overlay completo con bg-base-dark
- Navegación centrada verticalmente con enlaces gigantes (text-5xl-7xl)
- Cada enlace con hover que revela imagen de preview o número grande
- Animación stagger para cada item (GSAP/Framer Motion)
- Enlaces dispuestos asimétricamente, no centrados verticalmente
- Información de contacto pequeña en esquina inferior
- Transición fluida de 0.6-0.8s con cubic-bezier personalizado

### 3. Estructura de Secciones Innovadora

**Sección 1 - Servicios Fragmentados:**
- Grid asimétrico con 3 tarjetas de servicios principales
- Layout: 1 tarjeta grande izquierda, 2 medianas apiladas derecha (desktop)
- Cada tarjeta con hover 3D tilt effect
- Iconos custom tech en esquinas
- Fondos con gradiente sutil o video loop en hover

**Sección 2 - Showcase Proyectos Horizontal Scroll:**
- Contenedor con scroll horizontal (overflow-x-scroll)
- Tarjetas de proyectos amplias (w-[80vw] md:w-[40vw])
- Imágenes grandes con overlay de información al hover
- Efecto parallax en scroll horizontal

**Sección 3 - Proceso/Metodología Timeline Vertical:**
- Timeline con línea vertical animada
- Items alternados izquierda-derecha (desktop), stack (móvil)
- Números grandes background con z-index bajo
- Scroll-triggered animations para revelar cada paso

**Sección 4 - CTA Final Inmersivo:**
- Altura 70vh con fondo gradient púrpura-cyan
- Título gigante con efecto de texto partido
- Formulario de contacto inline minimal (nombre, email, mensaje, submit)
- Botón CTA de alto contraste

### 4. Footer Completo
- Background Surface oscuro
- Multi-columna: Logo + descripción | Servicios | Contacto | Social
- Newsletter signup con input y botón inline
- Copyright y enlaces legales
- Social icons con hover effects

## Animaciones y Microinteracciones

**Principio:** Estratégicas, no excesivas
- Scroll-triggered fade-in para secciones (Intersection Observer)
- Hover 3D tilt en tarjetas (transform: perspective)
- Transición suave de menú fullscreen con backdrop blur
- Video hero con ken burns effect sutil si es imagen fallback
- Cursor custom trail effect (opcional, solo desktop)

## Imágenes

**Hero Section:**
- Video MP4 autoplay loop muted en desktop (placeholder: paisaje urbano nocturno tech/moderno)
- Imagen estática fallback mobile (mismo frame del video)
- Dimensiones: Full viewport (100vw x 100vh)

**Proyectos Showcase:**
- 3-4 imágenes de proyectos web modernos
- Formato: 16:9 landscape
- Resolución: 1200x675px mínimo
- Contenido: Screenshots de webs/apps impresionantes

**Servicios Cards:**
- Iconos tech abstractos o videos loops sutiles de 3-5s
- Sin imágenes estáticas grandes, más enfoque en diseño tipográfico

## Responsive Strategy

**Mobile (< 768px):**
- Hero video replaced por imagen estática
- Menú fullscreen con enlaces text-4xl
- Secciones stack verticalmente
- Scroll horizontal projects con snap-scroll

**Desktop (≥ 768px):**
- Hero video fullscreen
- Menú fullscreen con navegación text-7xl asimétrica
- Grids asimétricos multi-columna
- Efectos parallax y 3D habilitados

## Accesibilidad Dark Mode
Todos los inputs, formularios y campos de texto mantienen el esquema oscuro consistente con bg-surface y text-primary/secondary.
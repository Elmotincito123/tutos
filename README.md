# Tutorías Wawita - Proyecto Web Completo

## Descripción del Proyecto
**Tema:** Plataforma de tutorías en línea "Wawita" (Website for Advanced Wonderful Intelligence, Technology, and Adaptive Learning)

**Justificación:** En la era digital actual, la educación personalizada y accesible es fundamental. Wawita surge como una solución integral que conecta tutores y estudiantes, ofreciendo herramientas modernas para el aprendizaje efectivo, incluyendo gestión de cursos, materiales de estudio, reuniones virtuales y un sistema de seguimiento del progreso del usuario.

## Estructura del Proyecto

### Páginas Principales
1. **index.html** - Página de inicio con presentación de la plataforma
2. **galeria.html** - Galería de cursos disponibles
3. **postula.html** - Formulario para postular como tutor
4. **postulaAlumno.html** - Formulario de inscripción para estudiantes
5. **cursos.html** - Creación de nuevos cursos
6. **materiales.html** - Gestión de materiales de estudio
7. **verreuniones.html** - Visualización de reuniones programadas
8. **pagos.html** - Sistema de pagos
9. **Notificaciones.html** - Sistema de reportes y notificaciones

### Características Técnicas Implementadas

#### HTML + CSS (Semanas 5-10) ✅
- ✅ Estructura completa con navegación básica
- ✅ Diseño responsive con menú fijo
- ✅ Tipografía personalizada (Courier New)
- ✅ Esquema de colores definido (#00796b como color principal)
- ✅ Inserción de tablas, imágenes y videos
- ✅ CSS organizado por módulos

#### JavaScript (Semana 15) ✅
- ✅ Formularios funcionales con validación
- ✅ LocalStorage para persistencia de datos
- ✅ Interacciones dinámicas (mostrar/ocultar elementos)
- ✅ Manipulación del DOM
- ✅ Sistema de alertas y notificaciones
- ✅ Chat en tiempo real (modal)
- ✅ Sistema de logos dinámicos basado en días

#### Funcionalidades Avanzadas ✅
- ✅ Gestión completa de cursos (CRUD)
- ✅ Sistema de materiales de estudio
- ✅ Integración con Jitsi Meet para reuniones
- ✅ Sistema de notificaciones
- ✅ Galería interactiva de cursos
- ✅ Formularios de registro para tutores y alumnos

## Decisiones de Diseño

### Paleta de Colores
- **Principal:** #00796b (Verde azulado) - Transmite confianza y profesionalismo
- **Secundario:** #f4f4f4 (Gris claro) - Para fondos y espacios en blanco
- **Acento:** #5151FF (Azul) - Para enlaces y elementos interactivos
- **Alertas:** Rojo para errores, verde para éxito

### Tipografía
- **Fuente principal:** Courier New - Evoca tecnología y modernidad
- **Jerarquía:** Títulos grandes (78px), subtítulos (39px), texto normal (19.5px)

### Layout
- **Diseño responsive:** Adaptable a dispositivos móviles y desktop
- **Navegación fija:** Menú hamburguesa en móviles
- **Cards:** Para mostrar cursos y materiales de forma organizada
- **Modales:** Para interacciones complejas como chat y detalles

## Funciones JavaScript Principales

### Gestión de Datos
- `localStorage` para persistencia de cursos, materiales, tutores y alumnos
- Funciones CRUD completas para todas las entidades

### Interactividad
- Sistema de logos dinámicos que cambia según los días de uso
- Chat modal con funcionalidad básica
- Validación de formularios en tiempo real
- Navegación entre páginas con contexto preservado

### Integración Externa
- Jitsi Meet para videoconferencias
- Sistema de archivos para materiales de estudio

## Estructura de Archivos

```
proyecto/
├── index.html (Página principal)
├── galeria.html (Galería de cursos)
├── cursos.html (Crear cursos)
├── materiales.html (Gestión de materiales)
├── verreuniones.html (Reuniones virtuales)
├── postula.html (Registro de tutores)
├── postulaAlumno.html (Registro de alumnos)
├── pagos.html (Sistema de pagos)
├── Notificaciones.html (Reportes)
├── CSS/
│   ├── estilosI.css (Estilos principales)
│   ├── galeria.css (Estilos de galería)
│   ├── cursos.css (Estilos de cursos)
│   ├── materiales.css (Estilos de materiales)
│   └── [otros archivos CSS específicos]
├── JS/
│   ├── Racha.js (Sistema de logos y chat)
│   ├── galeria.js (Funcionalidad de galería)
│   ├── cursos.js (Gestión de cursos)
│   ├── materiales.js (Gestión de materiales)
│   └── [otros archivos JS específicos]
├── img/ (Imágenes del proyecto)
├── gif/ (Animaciones)
└── vid/ (Videos)
```

## Cumplimiento de Requisitos

### ✅ Semana 5 - Boceto y estructura
- Tema definido con justificación
- Estructura HTML completa
- Navegación funcional entre páginas

### ✅ Semana 10 - Maquetado completo
- Diseño CSS completo y responsive
- Tipografía personalizada implementada
- Menú fijo y responsive
- Tablas, imágenes y videos integrados

### ✅ Semana 15 - Funcionalidades JavaScript
- Formularios con validación completa
- Interacciones dinámicas implementadas
- Manipulación del DOM extensiva
- LocalStorage para persistencia

### ✅ Semana 18 - Proyecto Final
- Proyecto completamente funcional
- Documentación completa
- Código organizado y comentado
- Funcionalidades avanzadas implementadas

## Innovaciones Adicionales

1. **Sistema de Progreso Visual:** Los logos cambian según los días de uso
2. **Chat en Tiempo Real:** Modal de chat integrado
3. **Gestión Completa de Cursos:** CRUD completo con materiales y reuniones
4. **Integración de Videoconferencias:** Jitsi Meet integrado
5. **Persistencia de Datos:** Sistema robusto con localStorage
6. **Diseño Modular:** CSS y JS organizados por funcionalidad

## Conclusión

El proyecto "Tutorías Wawita" representa una plataforma educativa completa que va más allá de los requisitos mínimos, implementando funcionalidades avanzadas como gestión de cursos, materiales de estudio, reuniones virtuales y un sistema de seguimiento del usuario. El diseño responsive y la experiencia de usuario cuidadosamente diseñada hacen de esta una solución profesional para la educación en línea.
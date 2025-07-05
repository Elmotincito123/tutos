# Documentación Técnica - Tutorías Wawita

## Arquitectura del Proyecto

### Estructura de Datos (LocalStorage)

#### Cursos
```javascript
{
  id: number,
  tutorID: string,
  nombreCurso: string,
  descripcionCurso: string,
  nivelCurso: string,
  fondoCurso: string (base64),
  duracionCurso: number,
  sesionesPorSemana: number,
  fechaInicio: string (ISO),
  reuniones: Array,
  materiales: Array
}
```

#### Materiales
```javascript
{
  id: number,
  cursoID: number,
  semana: number,
  sesion: number,
  titulo: string,
  descripcion: string,
  archivos: Array<{name: string, url: string}>
}
```

#### Tutores
```javascript
{
  id: number,
  nombre: string,
  asignatura: string,
  disponibilidad: string,
  idioma: string,
  nivel: string,
  duracion: string,
  notas: string
}
```

#### Alumnos
```javascript
{
  nombre: string,
  apellido: string,
  nacionalidad: string,
  telefono: string,
  cursos: Array<string>
}
```

## Funciones Principales

### Sistema de Logos Dinámicos (Racha.js)
- Cambia el logo según los días de uso
- 6 niveles diferentes de logos
- Información contextual en modal

### Gestión de Cursos (cursos.js)
- Creación de cursos con validación
- Generación automática de reuniones
- Integración con Jitsi Meet

### Sistema de Materiales (materiales.js)
- Upload de archivos múltiples
- Organización por semanas y sesiones
- Descarga de materiales

### Chat en Tiempo Real (Racha.js)
- Modal de chat integrado
- Interfaz de usuario intuitiva
- Preparado para integración con WebSockets

## Integración con APIs Externas

### Jitsi Meet
- Generación automática de salas
- URLs únicas por sesión
- Integración iframe para reuniones embebidas

## Responsive Design

### Breakpoints
- Desktop: > 858px
- Tablet: 768px - 858px
- Mobile: < 768px

### Características Responsive
- Menú hamburguesa en móviles
- Grid adaptativo para cards
- Tipografía escalable
- Imágenes responsive

## Validación de Formularios

### Campos Requeridos
- Validación en tiempo real
- Mensajes de error específicos
- Prevención de envío con datos inválidos

### Tipos de Validación
- Campos de texto no vacíos
- Formatos de email y teléfono
- Selección de archivos
- Fechas válidas

## Optimización y Performance

### Carga de Recursos
- CSS modular por página
- JavaScript específico por funcionalidad
- Imágenes optimizadas

### Gestión de Memoria
- Limpieza de event listeners
- Gestión eficiente del localStorage
- Optimización de DOM queries

## Seguridad

### Validación Client-Side
- Sanitización de inputs
- Validación de tipos de archivo
- Límites de tamaño de archivo

### Gestión de Datos
- Encriptación básica para datos sensibles
- Validación de integridad de datos
- Backup automático en localStorage

## Testing y Debugging

### Herramientas Utilizadas
- Console.log para debugging
- LocalStorage inspector
- Responsive design testing

### Casos de Prueba
- Formularios con datos válidos/inválidos
- Navegación entre páginas
- Persistencia de datos
- Responsive design en diferentes dispositivos

## Futuras Mejoras

### Backend Integration
- API REST para persistencia
- Base de datos real
- Autenticación de usuarios

### Funcionalidades Adicionales
- Sistema de calificaciones
- Notificaciones push
- Integración con sistemas de pago reales
- Analytics y reportes

### Performance
- Lazy loading de imágenes
- Minificación de CSS/JS
- CDN para recursos estáticos
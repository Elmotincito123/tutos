# Guía de Instalación y Uso - Tutorías Wawita

## Requisitos del Sistema

### Navegadores Compatibles
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Requisitos Técnicos
- JavaScript habilitado
- LocalStorage disponible
- Conexión a internet (para Jitsi Meet)

## Instalación

### Opción 1: Descarga Directa
1. Descargar el archivo ZIP del proyecto
2. Extraer en la carpeta deseada
3. Abrir `index.html` en el navegador

### Opción 2: Servidor Local
1. Instalar un servidor web local (Live Server, XAMPP, etc.)
2. Colocar los archivos en la carpeta del servidor
3. Acceder via `http://localhost/proyecto`

## Estructura de Navegación

### Página Principal (index.html)
- Presentación de la plataforma
- Acceso al chat
- Navegación a todas las secciones

### Gestión de Cursos
1. **Galería** → Ver todos los cursos
2. **Crear Curso** → Formulario de creación
3. **Ver Materiales** → Gestión de contenido
4. **Ver Reuniones** → Acceso a videoconferencias

### Registro de Usuarios
1. **Postular Tutor** → Registro de profesores
2. **Inscribir Alumno** → Registro de estudiantes

## Funcionalidades Principales

### Para Tutores
1. Crear cursos con información detallada
2. Subir materiales de estudio
3. Programar reuniones automáticamente
4. Gestionar estudiantes inscritos

### Para Estudiantes
1. Explorar galería de cursos
2. Inscribirse en cursos
3. Acceder a materiales
4. Unirse a reuniones virtuales

### Para Administradores
1. Gestionar tutores y estudiantes
2. Monitorear reportes de errores
3. Administrar contenido de la plataforma

## Uso del Sistema

### Crear un Curso
1. Ir a "Galería" → "Agregar Curso"
2. Completar formulario con:
   - ID del tutor
   - Información del curso
   - Duración y frecuencia
   - Imagen de fondo
3. El sistema genera automáticamente las reuniones

### Agregar Materiales
1. Desde la galería, seleccionar "Ver Material"
2. Elegir semana y sesión
3. Subir archivos (PDF, DOC, imágenes)
4. Agregar título y descripción

### Unirse a Reuniones
1. Ir a "Ver Reuniones" desde un curso
2. Hacer clic en "Unirse a la reunión"
3. Se abre Jitsi Meet en nueva pestaña

### Sistema de Chat
1. Hacer clic en "Chat" en el menú
2. Escribir mensaje y enviar
3. Los mensajes se muestran en tiempo real

## Solución de Problemas

### Problemas Comunes

#### Los datos no se guardan
- Verificar que JavaScript esté habilitado
- Comprobar que LocalStorage esté disponible
- Limpiar caché del navegador

#### Las reuniones no cargan
- Verificar conexión a internet
- Permitir pop-ups en el navegador
- Comprobar que Jitsi Meet esté accesible

#### El diseño no se ve correctamente
- Actualizar el navegador
- Verificar que CSS esté cargando
- Comprobar resolución de pantalla

### Limpiar Datos
Para resetear la aplicación:
```javascript
// Ejecutar en consola del navegador
localStorage.clear();
location.reload();
```

## Personalización

### Cambiar Colores
Editar variables CSS en los archivos de estilo:
```css
/* Color principal */
background-color: #00796b;

/* Color secundario */
background-color: #f4f4f4;
```

### Modificar Logos
Reemplazar archivos en la carpeta `img/` y `gif/`:
- logo.jpeg (logo principal)
- logo2.gif - logo6.gif (logos dinámicos)

### Ajustar Funcionalidades
Modificar archivos JavaScript correspondientes:
- `Racha.js` - Sistema de logos y chat
- `galeria.js` - Gestión de galería
- `cursos.js` - Creación de cursos

## Backup y Restauración

### Exportar Datos
```javascript
// Exportar todos los datos
const backup = {
  cursos: localStorage.getItem('cursos'),
  materiales: localStorage.getItem('materials'),
  tutores: localStorage.getItem('tutores'),
  alumnos: localStorage.getItem('alumnos')
};
console.log(JSON.stringify(backup));
```

### Importar Datos
```javascript
// Importar datos desde backup
const backup = /* datos del backup */;
Object.keys(backup).forEach(key => {
  if(backup[key]) localStorage.setItem(key, backup[key]);
});
location.reload();
```

## Soporte

Para reportar errores o solicitar ayuda:
1. Usar el formulario en "Reportar error"
2. Incluir descripción detallada del problema
3. Especificar navegador y sistema operativo
document.addEventListener('DOMContentLoaded', function () {
    const coursesContainer = document.getElementById('coursesContainer');
    const courses = JSON.parse(localStorage.getItem('cursos')) || [];
  
    // Función para mostrar los cursos en la galería
    function renderCourses() {
        coursesContainer.innerHTML = '';
  
        if (courses.length === 0) {
            coursesContainer.innerHTML = '<p>No hay cursos registrados.</p>';
            return;
        }
  
        courses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.classList.add('course-card');
            courseDiv.innerHTML = `
                <img src="${course.fondoCurso}" alt="Fondo del curso">
                <h3>${course.nombreCurso}</h3>
                <p>${course.descripcionCurso}</p>
                <button onclick="irAMateriales(${course.id})">Ver Material</button>
                <button onclick="irAReuniones(${course.id})">Ver Reuniones</button>
                <button onclick="eliminarCurso(${course.id})">Eliminar Curso</button>
            `;
            coursesContainer.appendChild(courseDiv);
        });
    }
  
    // Función para redirigir al formulario de materiales
    window.irAMateriales = function (courseID) {
        localStorage.setItem('cursoSeleccionado', courseID);  // Guardar el ID del curso
        window.location.href = 'vermaterial.html';  // Redirigir a la página de materiales
    }
  
    // Función para redirigir a la página de reuniones
    window.irAReuniones = function (courseID) {
        localStorage.setItem('cursoSeleccionado', courseID);  // Guardar el ID del curso
        window.location.href = 'verreuniones.html';  // Redirigir a la página de reuniones
    }
  
    // Función para eliminar un curso
    window.eliminarCurso = function (courseID) {
        if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
            // Filtrar el curso que queremos eliminar
            const updatedCourses = courses.filter(course => course.id !== courseID);
            localStorage.setItem('cursos', JSON.stringify(updatedCourses)); // Guardar los cursos actualizados
  
            // También eliminar los materiales asociados a este curso
            const updatedMaterials = JSON.parse(localStorage.getItem('materials')) || [];
            const materialsToKeep = updatedMaterials.filter(material => material.cursoID !== courseID);
            localStorage.setItem('materials', JSON.stringify(materialsToKeep)); // Guardar los materiales actualizados
  
            // Recargar los cursos después de eliminar
            renderCourses();
        }
    }
  
    // Cargar los cursos al iniciar
    renderCourses();
  });
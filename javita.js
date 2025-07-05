document.getElementById('alumnoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let nacionalidad = document.getElementById('nacionalidad').value;
    let telefono = document.getElementById('telefono').value;

    // Obtener los cursos seleccionados con checkboxes
    let cursosSeleccionados = [];
    document.querySelectorAll('input[name="cursos"]:checked').forEach(function(checkbox) {
        cursosSeleccionados.push(checkbox.value);
    });

    // Crear un objeto para el alumno
    let alumno = {
        nombre: nombre,
        apellido: apellido,
        nacionalidad: nacionalidad,
        telefono: telefono,
        cursos: cursosSeleccionados
    };

    // Obtener los datos actuales de los alumnos desde el localStorage
    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

    // Agregar el nuevo alumno a la lista
    alumnos.push(alumno);

    // Guardar los datos actualizados en el localStorage
    localStorage.setItem('alumnos', JSON.stringify(alumnos));

    // Limpiar el formulario
    document.getElementById('alumnoForm').reset();

    // Actualizar la tabla de alumnos
    actualizarTabla();
});

// Función para actualizar la tabla de alumnos
function actualizarTabla() {
    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    let tabla = document.getElementById('tablaAlumnos').getElementsByTagName('tbody')[0];

    // Limpiar la tabla antes de agregar los nuevos datos
    tabla.innerHTML = '';

    alumnos.forEach(function(alumno, index) {
        let fila = tabla.insertRow();
        fila.innerHTML = `
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.nacionalidad}</td>
            <td>${alumno.telefono}</td>
            <td>${alumno.cursos.join(', ')}</td>
            <td><button onclick="eliminarAlumno(${index})">Eliminar</button></td>
        `;
    });
}

// Función para eliminar un alumno
function eliminarAlumno(index) {
    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    alumnos.splice(index, 1);  // Eliminar el alumno con el índice especificado
    localStorage.setItem('alumnos', JSON.stringify(alumnos));  // Guardar la lista actualizada

    actualizarTabla();  // Actualizar la tabla después de eliminar
}

// Actualizar la tabla al cargar la página
window.onload = actualizarTabla;

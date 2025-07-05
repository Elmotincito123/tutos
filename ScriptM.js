// Variables globales
let tutores = [];
let nextId = 1;
let editMode = false;  // Para saber si estamos editando un tutor

// Cargar datos del localStorage al iniciar
document.addEventListener('DOMContentLoaded', cargarDatos);

function cargarDatos() {
    const tutoresGuardados = localStorage.getItem('tutores');
    const lastIdGuardado = localStorage.getItem('lastId');
  
    if (tutoresGuardados) {
        tutores = JSON.parse(tutoresGuardados);
        actualizarTabla();
    }
  
    if (lastIdGuardado) {
        nextId = parseInt(lastIdGuardado);
    }
}

// Guardar datos en localStorage
function guardarDatos() {
    localStorage.setItem('tutores', JSON.stringify(tutores));
    localStorage.setItem('lastId', nextId.toString());
}

// Obtener el siguiente ID disponible
function obtenerSiguienteId() {
    if (tutores.length === 0) {
        return 1;
    }
  
    const idsEnUso = tutores.map(t => t.id).sort((a, b) => a - b);
  
    for (let i = 1; i <= idsEnUso.length; i++) {
        if (!idsEnUso.includes(i)) {
            return i;
        }
    }
  
    return idsEnUso[idsEnUso.length - 1] + 1;
}

// Manejar el envío del formulario
document.getElementById('tutorForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const nombre = document.getElementById('nombre').value.trim();
    const asignatura = document.getElementById('asignatura').value;
    const disponibilidad = document.getElementById('disponibilidad').value;
    const idioma = document.getElementById('idioma').value;
    const nivel = document.getElementById('nivel').value;
    const duracion = document.getElementById('duracion').value;
    const notas = document.getElementById('notas').value;

    if (!nombre) {
        showAlert('error', 'Por favor ingrese un nombre.');
        return;
    }
    if (!asignatura) {
        showAlert('error', 'Por favor seleccione una asignatura.');
        return;
    }
    if (!disponibilidad) {
        showAlert('error', 'Por favor seleccione una opción de disponibilidad.');
        return;
    }
    if (!idioma) {
        showAlert('error', 'Por favor seleccione un idioma.');
        return;
    }
    if (!nivel) {
        showAlert('error', 'Por favor seleccione el nivel de dificultad.');
        return;
    }
    if (!duracion) {
        showAlert('error', 'Por favor ingrese la duración del curso.');
        return;
    }
    if (!notas) {
        showAlert('error', 'Por favor ingrese las notas del tutor.');
        return;
    }

    const id = editMode ? nextId : obtenerSiguienteId();

    // Crear nuevo tutor
    const nuevoTutor = {
        id,
        nombre,
        asignatura,
        disponibilidad,
        idioma,
        nivel,
        duracion,
        notas
    };

    if (editMode) {
        const index = tutores.findIndex(t => t.id === id);
        tutores[index] = nuevoTutor;
        editMode = false;
    } else {
        tutores.push(nuevoTutor);
    }

    guardarDatos();
    limpiarFormulario();
    actualizarTabla();
    showAlert('success', 'Tutor guardado correctamente');
});

function actualizarTabla() {
    const tutorList = document.getElementById('tutorList');
    tutorList.innerHTML = '';

    tutores.forEach(tutor => {
        const row = document.createElement('tr');
      
        row.innerHTML = `
            <td>${tutor.id}</td>
            <td>${tutor.nombre}</td>
            <td>${tutor.asignatura}</td>
            <td>${tutor.disponibilidad}</td>
            <td>${tutor.idioma}</td>
            <td>${tutor.nivel}</td>
            <td>${tutor.duracion}</td>
            <td>${tutor.notas}</td>
            <td>
                <button class="action-btn" onclick="editarTutor(${tutor.id})">Editar</button>
                <button class="delete-btn" onclick="eliminarTutor(${tutor.id})">Eliminar</button>
            </td>
        `;
      
        tutorList.appendChild(row);
    });
}

function editarTutor(id) {
    const tutor = tutores.find(t => t.id === id);
  
    document.getElementById('nombre').value = tutor.nombre;
    document.getElementById('asignatura').value = tutor.asignatura;
    document.getElementById('disponibilidad').value = tutor.disponibilidad;
    document.getElementById('idioma').value = tutor.idioma;
    document.getElementById('nivel').value = tutor.nivel;
    document.getElementById('duracion').value = tutor.duracion;
    document.getElementById('notas').value = tutor.notas;
  
    editMode = true;
    nextId = id;
    showAlert('info', 'Editando tutor...');
}

function eliminarTutor(id) {
    tutores = tutores.filter(t => t.id !== id);
    guardarDatos();
    actualizarTabla();
    showAlert('success', 'Tutor eliminado correctamente');
}

function limpiarFormulario() {
    document.getElementById('tutorForm').reset();
}

function showAlert(tipo, mensaje) {
    const alertBox = tipo === 'error' ? document.getElementById('alertError') : document.getElementById('alertSuccess');
    alertBox.textContent = mensaje;
    alertBox.style.display = 'block';
  
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

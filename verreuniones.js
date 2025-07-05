document.addEventListener('DOMContentLoaded', function () {
    const meetingsList = document.getElementById('meetingsList');
    const cursoID = localStorage.getItem('cursoSeleccionado');
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    const curso = cursos.find(c => c.id === parseInt(cursoID));

    if (!curso) {
        alert('Curso no encontrado.');
        return;
    }

    function mostrarReuniones() {
        const reuniones = curso.reuniones || [];

        if (reuniones.length === 0) {
            meetingsList.innerHTML = '<p>No hay reuniones registradas para este curso.</p>';
            return;
        }

        meetingsList.innerHTML = reuniones.map(reunion => `
            <div class="meeting-card">
                <h4>Semana ${reunion.semana} - Sesión ${reunion.sesion}</h4>
                <p><strong>Fecha:</strong> ${new Date(reunion.fecha).toLocaleString()}</p>
                <a href="${reunion.url}" target="_blank" class="join-btn">Unirse a la reunión</a>
            </div>
        `).join('');
    }

    mostrarReuniones();
});


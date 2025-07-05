document.addEventListener('DOMContentLoaded', function () {
    const cursoForm = document.getElementById('cursoForm');
    const cursoList = document.getElementById('cursoList');

    // Función para cargar los cursos existentes
    function cargarCursos() {
        const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
        cursoList.innerHTML = '';

        if (cursos.length === 0) {
            cursoList.innerHTML = '<tr><td colspan="5">No hay cursos registrados.</td></tr>';
            return;
        }

        cursos.forEach(curso => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${curso.id}</td>
                <td>${curso.nombreCurso}</td>
                <td>${curso.descripcionCurso}</td>
                <td>${curso.nivelCurso}</td>
                <td>
                    <button onclick="irAReuniones(${curso.id})">Ver Reuniones</button>
                    <button onclick="irAMateriales(${curso.id})">Agregar Material</button>
                </td>
            `;
            cursoList.appendChild(tr);
        });
    }

    // Redirigir a materiales
    window.irAMateriales = function (courseID) {
        localStorage.setItem('cursoSeleccionado', courseID);
        window.location.href = 'materiales.html';
    };

    // Redirigir a reuniones
    window.irAReuniones = function (courseID) {
        localStorage.setItem('cursoSeleccionado', courseID);
        window.location.href = 'verreuniones.html';
    };

    // Manejo del formulario de creación de cursos
    cursoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const tutorID = document.getElementById('tutorID').value.trim();
        const nombreCurso = document.getElementById('nombreCurso').value.trim();
        const descripcionCurso = document.getElementById('descripcionCurso').value.trim();
        const nivelCurso = document.getElementById('nivelCurso').value;
        const fondoCurso = document.getElementById('fondoCurso').files[0];
        const duracionCurso = parseInt(document.getElementById('duracionCurso').value);
        const sesionesPorSemana = parseInt(document.getElementById('sesionesPorSemana').value);
        const fechaInicio = new Date(document.getElementById('fechaInicio').value);

        if (!fondoCurso) {
            alert('Por favor, selecciona un fondo para el curso.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function () {
            const curso = {
                id: Date.now(),
                tutorID,
                nombreCurso,
                descripcionCurso,
                nivelCurso,
                fondoCurso: reader.result,
                duracionCurso,
                sesionesPorSemana,
                fechaInicio: fechaInicio.toISOString(),
                reuniones: [] // Lista de reuniones
            };

            // Generar las reuniones basadas en la fecha de inicio
            for (let semana = 0; semana < duracionCurso; semana++) {
                for (let sesion = 1; sesion <= sesionesPorSemana; sesion++) {
                    const fechaReunion = new Date(fechaInicio);
                    fechaReunion.setDate(fechaInicio.getDate() + semana * 7 + (sesion - 1) * 2); // Ejemplo: 2 días entre sesiones
                    const roomName = `Curso-${curso.id}-Semana${semana + 1}-Sesion${sesion}`;

                    curso.reuniones.push({
                        semana: semana + 1,
                        sesion,
                        fecha: fechaReunion.toISOString(),
                        roomName,
                        url: `https://meet.jit.si/${roomName}`
                    });
                }
            }

            const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
            cursos.push(curso);
            localStorage.setItem('cursos', JSON.stringify(cursos));
            cursoForm.reset();
            cargarCursos();
            alert('Curso creado con éxito.');
        };

        reader.readAsDataURL(fondoCurso);
    });

    cargarCursos();
});

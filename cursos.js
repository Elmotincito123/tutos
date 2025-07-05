document.addEventListener('DOMContentLoaded', function () {
    const cursoForm = document.getElementById('cursoForm');
    
    // Inicializar validaciones
    initializeValidation('cursoForm');
    
    // Verificar autenticación
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }
    
    // Verificar que sea tutor o admin
    const currentUser = getCurrentUser();
    if (!['tutor', 'admin'].includes(currentUser.type)) {
        auth.showAccessDenied();
        return;
    }
    
    // Pre-llenar el ID del tutor si es un tutor
    if (currentUser.type === 'tutor') {
        document.getElementById('tutorID').value = currentUser.id || 1;
        document.getElementById('tutorID').readOnly = true;
    }

    // Función para cargar los cursos existentes
    function cargarCursos() {
        const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
        const cursoList = document.getElementById('cursoList');
        
        if (!cursoList) return; // Si no existe la tabla, no hacer nada

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
                    <button onclick="irAReuniones(${curso.id})" class="btn-action">Ver Reuniones</button>
                    <button onclick="irAMateriales(${curso.id})" class="btn-action">Agregar Material</button>
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

        // Validar formulario
        if (!validateFormBeforeSubmit('cursoForm')) {
            showNotification('Por favor, corrige los errores en el formulario', 'error');
            return;
        }

        const tutorID = document.getElementById('tutorID').value.trim();
        const nombreCurso = document.getElementById('nombreCurso').value.trim();
        const descripcionCurso = document.getElementById('descripcionCurso').value.trim();
        const nivelCurso = document.getElementById('nivelCurso').value;
        const fondoCurso = document.getElementById('fondoCurso').files[0];
        const duracionCurso = parseInt(document.getElementById('duracionCurso').value);
        const sesionesPorSemana = parseInt(document.getElementById('sesionesPorSemana').value);
        const fechaInicio = new Date(document.getElementById('fechaInicio').value);

        // Mostrar loading
        const submitBtn = cursoForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creando curso...';
        submitBtn.disabled = true;

        const reader = new FileReader();
        reader.onload = function () {
            const curso = {
                id: Date.now(),
                tutorID,
                tutorName: currentUser.name,
                nombreCurso,
                descripcionCurso,
                nivelCurso,
                fondoCurso: reader.result,
                duracionCurso,
                sesionesPorSemana,
                fechaInicio: fechaInicio.toISOString(),
                fechaCreacion: new Date().toISOString(),
                reuniones: [],
                materiales: []
            };

            // Generar las reuniones basadas en la fecha de inicio
            for (let semana = 0; semana < duracionCurso; semana++) {
                for (let sesion = 1; sesion <= sesionesPorSemana; sesion++) {
                    const fechaReunion = new Date(fechaInicio);
                    fechaReunion.setDate(fechaInicio.getDate() + semana * 7 + (sesion - 1) * 2);
                    const roomName = `Curso-${curso.id}-Semana${semana + 1}-Sesion${sesion}`;

                    curso.reuniones.push({
                        id: `${curso.id}-${semana + 1}-${sesion}`,
                        semana: semana + 1,
                        sesion,
                        fecha: fechaReunion.toISOString(),
                        roomName,
                        url: `https://meet.jit.si/${roomName}`,
                        activa: fechaReunion >= new Date()
                    });
                }
            }

            const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
            cursos.push(curso);
            localStorage.setItem('cursos', JSON.stringify(cursos));
            
            // Resetear formulario
            cursoForm.reset();
            
            // Restaurar botón
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Cargar cursos si existe la tabla
            cargarCursos();
            
            showNotification('¡Curso creado con éxito! Se han generado automáticamente las reuniones.', 'success');
            
            // Redirigir a la galería después de 2 segundos
            setTimeout(() => {
                window.location.href = 'galeria.html';
            }, 2000);
        };

        reader.onerror = function() {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            showNotification('Error al procesar la imagen. Inténtalo de nuevo.', 'error');
        };

        reader.readAsDataURL(fondoCurso);
    });

    // Función para mostrar notificaciones
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; font-size: 18px; cursor: pointer; margin-left: 10px;">&times;</button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            max-width: 400px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            animation: slideInRight 0.3s ease-out;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            display: flex;
            align-items: center;
            justify-content: space-between;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Agregar estilos de animación
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
            
            .btn-action {
                background: #00796b;
                color: white;
                border: none;
                padding: 8px 12px;
                border-radius: 4px;
                cursor: pointer;
                margin: 2px;
                font-size: 12px;
                transition: background-color 0.3s ease;
            }
            
            .btn-action:hover {
                background: #004d40;
            }
        `;
        document.head.appendChild(styles);
    }

    cargarCursos();
});
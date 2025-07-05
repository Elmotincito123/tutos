document.addEventListener('DOMContentLoaded', function () {
    const materialsList = document.getElementById('materialsList');
    
    // Obtener el ID del curso desde el localStorage
    const cursoID = localStorage.getItem('cursoSeleccionado');
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    const curso = cursos.find(c => c.id === parseInt(cursoID));

    if (!curso) {
        alert('Curso no encontrado.');
        return;
    }

    // Mostrar los materiales del curso
    function mostrarMateriales() {
        const materiales = curso.materiales || [];
        
        if (materiales.length === 0) {
            materialsList.innerHTML = '<p>No hay materiales registrados para este curso.</p>';
            return;
        }

        // Ordenar los materiales por semana y sesión
        materiales.sort((a, b) => {
            if (a.semana !== b.semana) return a.semana - b.semana; // Ordenar por semana
            return a.sesion - b.sesion; // Si son de la misma semana, ordenar por sesión
        });

        materialsList.innerHTML = materiales.map(material => `
            <div class="material-card">
                <h4>${material.titulo}</h4>
                <p>${material.descripcion}</p>
                <p><strong>Semana:</strong> ${material.semana}, <strong>Sesión:</strong> ${material.sesion}</p>
                <p><strong>Archivos:</strong></p>
                <ul>
                    ${material.archivos.map(file => `
                        <li>
                            <a href="${file.url}" download="${file.name}">${file.name}</a>
                            <button onclick="eliminarMaterial(${material.id})">Eliminar</button>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');
    }

    // Eliminar el material
    window.eliminarMaterial = function (materialID) {
        const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este material?');
        if (!confirmDelete) return;

        // Filtrar los materiales en la lista global de materiales
        const materials = JSON.parse(localStorage.getItem('materials')) || [];
        const updatedMaterials = materials.filter(material => material.id !== materialID);

        // Filtrar los materiales en la lista de materiales del curso
        const updatedCourse = cursos.map(c => {
            if (c.id === parseInt(cursoID)) {
                c.materiales = c.materiales.filter(material => material.id !== materialID);
            }
            return c;
        });

        // Guardar los datos actualizados en localStorage
        localStorage.setItem('materials', JSON.stringify(updatedMaterials));
        localStorage.setItem('cursos', JSON.stringify(updatedCourse));

        // Volver a cargar los materiales
        mostrarMateriales();
    }

    // Función para redirigir al formulario de materiales
    window.agregarMaterial = function () {
        window.location.href = 'materiales.html';  // Redirige a la página de agregar materiales
    }

    // Cargar los materiales al iniciar
    mostrarMateriales();
});

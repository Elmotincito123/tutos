document.addEventListener('DOMContentLoaded', function () {
  const materialForm = document.getElementById('materialForm');
  
  // Obtener el ID del curso desde el localStorage
  const cursoID = localStorage.getItem('cursoSeleccionado');
  const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
  const curso = cursos.find(c => c.id === parseInt(cursoID));

  if (!curso) {
      alert('Curso no encontrado.');
      return;
  }

  // Mostrar el nombre del curso para el que se está agregando material
  document.querySelector('h1').textContent = `Agregar Material para el Curso: ${curso.nombreCurso}`;

  // Llenar las opciones de semana y sesión basadas en la duración del curso
  const semanaSelect = document.getElementById('semana');
  const sesionSelect = document.getElementById('sesion');

  // Llenar las semanas (de 1 a la duración del curso)
  for (let i = 1; i <= curso.duracionCurso; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `Semana ${i}`;
      semanaSelect.appendChild(option);
  }

  // Llenar las sesiones para cada semana (2 sesiones por semana como ejemplo)
  semanaSelect.addEventListener('change', function () {
      const selectedSemana = parseInt(semanaSelect.value);
      sesionSelect.innerHTML = ''; // Limpiar las sesiones previas

      // Crear las sesiones (puedes ajustar el número de sesiones por semana si es necesario)
      const sesionesPorSemana = 2; // Por ejemplo, 2 sesiones por semana
      for (let sesion = 1; sesion <= sesionesPorSemana; sesion++) {
          const option = document.createElement('option');
          option.value = sesion;
          option.textContent = `Sesión ${sesion}`;
          sesionSelect.appendChild(option);
      }
  });

  // Inicializar el evento para cargar las sesiones de la primera semana por defecto
  semanaSelect.dispatchEvent(new Event('change'));

  // Manejar el envío del formulario para registrar un nuevo material
  materialForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const semana = parseInt(document.getElementById('semana').value);
      const sesion = parseInt(document.getElementById('sesion').value);
      const titulo = document.getElementById('titulo').value.trim();
      const descripcion = document.getElementById('descripcion').value.trim();
      const archivos = Array.from(document.getElementById('archivo').files).map(file => ({
          name: file.name,
          url: URL.createObjectURL(file), // Crear URL de objeto para cada archivo
      }));

      const material = {
          id: Date.now(),
          cursoID: curso.id,  // Asociamos el material al curso
          semana,
          sesion,
          titulo,
          descripcion,
          archivos,
      };

      // Guardar el material en la lista global de materiales
      const materials = JSON.parse(localStorage.getItem('materials')) || [];
      materials.push(material);
      localStorage.setItem('materials', JSON.stringify(materials));

      // Agregar el material dentro de la lista de materiales del curso
      curso.materiales = curso.materiales || []; // Asegurarse que la propiedad "materiales" exista
      curso.materiales.push(material);
      localStorage.setItem('cursos', JSON.stringify(cursos)); // Guardar el curso actualizado

      alert('Material guardado exitosamente');
      materialForm.reset();
  });
});

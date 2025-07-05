document.addEventListener('DOMContentLoaded', function () {
    let startDate = new Date();
    let startDay = 2; 
    let currentDay = startDay + Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24));

    const logos = document.querySelectorAll('.logo');

    function changeLogo(day) {
        logos.forEach(logo => {
            if (day >= 1 && day <= 2) {
                logo.src = "img/logo.jpeg"; // Logo 1
                logo.setAttribute('data-info', 'Logo: Comienzo<br>Día: ' + day + '<br>Descripción: Este logo representa el comienzo de tu nueva etapa de aprendizaje, simbolizando el nacimiento de tu viaje hacia el conocimiento.');
            } else if (day >= 3 && day <= 9) {
                logo.src = "gif/logo2.gif"; // Logo 2
                logo.setAttribute('data-info', 'Logo: Resiliencia Cristalina<br>Día: ' + day + '<br>Descripción: Este logo simboliza tu capacidad para adaptarte y recomponerte, representando la evolución constante de tu conocimiento.');
            } else if (day >= 10 && day <= 29) {
                logo.src = "gif/logo3.gif"; // Logo 3
                logo.setAttribute('data-info', 'Logo: Llama del Conocimiento<br>Día: ' + day + '<br>Descripción: Esta llama azul en tus manos simboliza la chispa de tu curiosidad y el poder del conocimiento que posees.');
            } else if (day >= 30 && day <= 99) {
                logo.src = "gif/logo4.gif"; // Logo 4
                logo.setAttribute('data-info', 'Logo: Cielo Infinito<br>Día: ' + day + '<br>Descripción: Este cielo en movimiento representa la vastedad de tu conocimiento y tu capacidad de elevarte y expandirte sin límites.');
            } else if (day >= 100 && day <= 199) {
                logo.src = "gif/logo5.gif"; // Logo 5
                logo.setAttribute('data-info', 'Logo: Exploración Galáctica<br>Día: ' + day + '<br>Descripción: Este logo simboliza tu exploración constante y tu búsqueda de nuevos horizontes en el aprendizaje.');
            } else if (day >= 200) {
                logo.src = "gif/logo6.gif"; // Logo 6
                logo.setAttribute('data-info', 'Logo: Dragón de Sabiduría<br>Día: ' + day + '<br>Descripción: Este dragón representa tu sabiduría, tu fuerza y tu dominio de grandes conocimientos.');
            }
        });
    }
    

    // Seleccionamos elementos del DOM
const openChatBtn = document.getElementById('openChatBtn');
const chatModal = document.getElementById('chatModal');
const closeChatBtn = document.getElementById('closeChatBtn');
const sendBtn = document.getElementById('sendBtn');
const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');

// Abrir el modal
openChatBtn.addEventListener('click', () => {
  chatModal.style.display = 'block';
});

// Cerrar el modal
closeChatBtn.addEventListener('click', () => {
  chatModal.style.display = 'none';
});

// Enviar mensaje
sendBtn.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    // Mostrar el mensaje en el chat
    const newMessage = document.createElement('div');
    newMessage.textContent = `Alumno: ${message}`;
    newMessage.style.margin = '10px 0';
    chatBox.appendChild(newMessage);

    // Aquí deberías enviar el mensaje al servidor Pusher
    // Ejemplo: socket.trigger('message', { text: message });

    // Limpiar el campo de texto
    messageInput.value = '';
  }
});

// Cerrar el modal si se hace clic fuera de él
window.addEventListener('click', (event) => {
  if (event.target === chatModal) {
    chatModal.style.display = 'none';
  }
});

    
    changeLogo(currentDay);

    // Método para hacer clic en el logo y mostrar el box con el logo ampliado y la información
    logos.forEach(logo => {
        logo.addEventListener('click', function () {

            // Crear el fondo oscuro
            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            document.body.appendChild(overlay);

            // Crear el box que contiene el logo ampliado y la información
            const overlayBox = document.createElement('div');
            overlayBox.classList.add('overlay-box');
            overlay.appendChild(overlayBox);

            // Crear la imagen ampliada del logo
            const fullScreenLogo = document.createElement('img');
            fullScreenLogo.src = logo.src;
            fullScreenLogo.classList.add('fullscreen-logo');
            overlayBox.appendChild(fullScreenLogo);

            // Crear la información adicional sobre el logo, obtenida de 'data-info'
            const info = document.createElement('div');
            info.classList.add('info');
            info.innerHTML = logo.getAttribute('data-info'); // Usar innerHTML en lugar de textContent
            overlayBox.appendChild(info);

            // Funcionalidad para cerrar el box al hacer clic fuera de él
            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) {
                    document.body.removeChild(overlay);
                }
            });
        });
    });

    // Verificar la hora cada minuto y actualizar el día si es necesario
    setInterval(function () {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
            currentDay++;
            changeLogo(currentDay);
        }
    }, 60000); 
});

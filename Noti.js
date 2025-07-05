// Cargar notificaciones desde LocalStorage
function loadNotifications() {
  const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
  return notifications;
}

// Guardar notificaciones en LocalStorage
function saveNotifications(notifications) {
  localStorage.setItem('notifications', JSON.stringify(notifications));
}

// Mostrar las notificaciones
function displayNotifications() {
  const notifications = loadNotifications();
  const notificationsContainer = document.getElementById('notifications');
  notificationsContainer.innerHTML = '';

  notifications.forEach(notification => {
    const notificationElement = document.createElement('div');
    notificationElement.classList.add('notification');
    if (notification.type === 'error') {
      notificationElement.classList.add('error');
    } else {
      notificationElement.classList.add('success');
    }
    notificationElement.textContent = `${notification.timestamp} - ${notification.user}: ${notification.message}`;
    notificationsContainer.appendChild(notificationElement);
  });
}

// Función para enviar una nueva notificación
function sendNotification() {
  const message = document.getElementById('message').value;
  const user = document.getElementById('user').value;

  if (!message || !user) {
    alert('Por favor, ingresa un mensaje y un usuario.');
    return;
  }

  // Crear una notificación
  const newNotification = {
    message: message,
    user: user,
    timestamp: new Date().toLocaleString(),
    type: 'success',
  };

  // Obtener notificaciones almacenadas y agregar la nueva
  const notifications = loadNotifications();
  notifications.push(newNotification);

  // Guardar las notificaciones actualizadas en LocalStorage
  saveNotifications(notifications);

  // Mostrar notificaciones
  displayNotifications();

  // Limpiar campos
  document.getElementById('message').value = '';
  document.getElementById('user').value = '';
}

// Inicializar mostrando las notificaciones
displayNotifications();

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const userTypeSelect = document.getElementById('userType');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    
    // Usuarios predefinidos para demo
    const users = {
        'admin@wawita.com': {
            password: 'admin123',
            type: 'admin',
            name: 'Administrador'
        },
        'tutor@wawita.com': {
            password: 'tutor123',
            type: 'tutor',
            name: 'Juan Pérez'
        },
        'estudiante@wawita.com': {
            password: 'estudiante123',
            type: 'estudiante',
            name: 'María García'
        }
    };
    
    // Cargar datos recordados
    loadRememberedData();
    
    // Validación en tiempo real
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    userTypeSelect.addEventListener('change', validateUserType);
    
    // Envío del formulario
    loginForm.addEventListener('submit', handleLogin);
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        
        if (!email) {
            showError(emailError, 'El correo electrónico es requerido');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError(emailError, 'Ingresa un correo electrónico válido');
            return false;
        }
        
        hideError(emailError);
        return true;
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        const passwordError = document.getElementById('passwordError');
        
        if (!password) {
            showError(passwordError, 'La contraseña es requerida');
            return false;
        }
        
        if (password.length < 6) {
            showError(passwordError, 'La contraseña debe tener al menos 6 caracteres');
            return false;
        }
        
        hideError(passwordError);
        return true;
    }
    
    function validateUserType() {
        const userType = userTypeSelect.value;
        const userTypeError = document.getElementById('userTypeError');
        
        if (!userType) {
            showError(userTypeError, 'Selecciona un tipo de usuario');
            return false;
        }
        
        hideError(userTypeError);
        return true;
    }
    
    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        errorElement.parentElement.querySelector('input, select').style.borderColor = '#e74c3c';
    }
    
    function hideError(errorElement) {
        errorElement.classList.remove('show');
        errorElement.parentElement.querySelector('input, select').style.borderColor = '#e0e0e0';
    }
    
    function handleLogin(e) {
        e.preventDefault();
        
        // Validar todos los campos
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isUserTypeValid = validateUserType();
        
        if (!isEmailValid || !isPasswordValid || !isUserTypeValid) {
            showNotification('Por favor, corrige los errores en el formulario', 'error');
            return;
        }
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const userType = userTypeSelect.value;
        
        // Mostrar estado de carga
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
        
        // Simular delay de autenticación
        setTimeout(() => {
            // Verificar credenciales
            if (users[email] && users[email].password === password && users[email].type === userType) {
                // Login exitoso
                const userData = {
                    email: email,
                    name: users[email].name,
                    type: userType,
                    loginTime: new Date().toISOString()
                };
                
                // Guardar sesión
                localStorage.setItem('currentUser', JSON.stringify(userData));
                localStorage.setItem('isLoggedIn', 'true');
                
                // Guardar datos si "recordarme" está marcado
                if (rememberMeCheckbox.checked) {
                    localStorage.setItem('rememberedEmail', email);
                    localStorage.setItem('rememberedUserType', userType);
                } else {
                    localStorage.removeItem('rememberedEmail');
                    localStorage.removeItem('rememberedUserType');
                }
                
                showNotification('¡Inicio de sesión exitoso! Redirigiendo...', 'success');
                
                // Redirigir según tipo de usuario
                setTimeout(() => {
                    switch(userType) {
                        case 'admin':
                            window.location.href = 'admin-dashboard.html';
                            break;
                        case 'tutor':
                            window.location.href = 'tutor-dashboard.html';
                            break;
                        case 'estudiante':
                            window.location.href = 'index.html';
                            break;
                        default:
                            window.location.href = 'index.html';
                    }
                }, 1500);
                
            } else {
                // Login fallido
                showNotification('Credenciales incorrectas. Verifica tu email, contraseña y tipo de usuario.', 'error');
                
                // Mostrar credenciales de demo
                setTimeout(() => {
                    showDemoCredentials();
                }, 2000);
            }
            
            // Remover estado de carga
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
            
        }, 1500);
    }
    
    function loadRememberedData() {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        const rememberedUserType = localStorage.getItem('rememberedUserType');
        
        if (rememberedEmail) {
            emailInput.value = rememberedEmail;
            rememberMeCheckbox.checked = true;
        }
        
        if (rememberedUserType) {
            userTypeSelect.value = rememberedUserType;
        }
    }
    
    function showNotification(message, type) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        // Agregar estilos
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
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
    
    function showDemoCredentials() {
        const demoModal = document.createElement('div');
        demoModal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 2000; display: flex; align-items: center; justify-content: center;">
                <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; margin: 20px;">
                    <h3 style="color: #00796b; margin-bottom: 20px;">Credenciales de Demo</h3>
                    <div style="margin-bottom: 15px;">
                        <strong>Administrador:</strong><br>
                        Email: admin@wawita.com<br>
                        Contraseña: admin123
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong>Tutor:</strong><br>
                        Email: tutor@wawita.com<br>
                        Contraseña: tutor123
                    </div>
                    <div style="margin-bottom: 20px;">
                        <strong>Estudiante:</strong><br>
                        Email: estudiante@wawita.com<br>
                        Contraseña: estudiante123
                    </div>
                    <button onclick="this.closest('div').parentElement.remove()" style="background: #00796b; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Cerrar</button>
                </div>
            </div>
        `;
        document.body.appendChild(demoModal);
    }
});

// Función para mostrar/ocultar contraseña
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleIcon.textContent = '👁️';
    }
}

// Verificar si el usuario ya está logueado
if (localStorage.getItem('isLoggedIn') === 'true') {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        // Redirigir según tipo de usuario
        switch(currentUser.type) {
            case 'admin':
                window.location.href = 'admin-dashboard.html';
                break;
            case 'tutor':
                window.location.href = 'tutor-dashboard.html';
                break;
            case 'estudiante':
                window.location.href = 'index.html';
                break;
        }
    }
}
// Sistema de autenticación para Wawita

class WawitaAuth {
    constructor() {
        this.currentUser = null;
        this.sessionTimeout = 24 * 60 * 60 * 1000; // 24 horas
        this.init();
    }
    
    init() {
        this.loadSession();
        this.setupSessionCheck();
        this.updateNavigation();
    }
    
    // Cargar sesión existente
    loadSession() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userData = localStorage.getItem('currentUser');
        const loginTime = localStorage.getItem('loginTime');
        
        if (isLoggedIn === 'true' && userData && loginTime) {
            const timeDiff = Date.now() - parseInt(loginTime);
            
            if (timeDiff < this.sessionTimeout) {
                this.currentUser = JSON.parse(userData);
                return true;
            } else {
                this.logout();
            }
        }
        return false;
    }
    
    // Iniciar sesión
    login(email, password, userType) {
        // Usuarios predefinidos para demo
        const users = {
            'admin@wawita.com': {
                password: 'admin123',
                type: 'admin',
                name: 'Administrador Wawita',
                permissions: ['all']
            },
            'tutor@wawita.com': {
                password: 'tutor123',
                type: 'tutor',
                name: 'Juan Pérez',
                permissions: ['create_courses', 'manage_materials', 'view_students']
            },
            'estudiante@wawita.com': {
                password: 'estudiante123',
                type: 'estudiante',
                name: 'María García',
                permissions: ['view_courses', 'join_meetings', 'download_materials']
            }
        };
        
        const user = users[email];
        
        if (user && user.password === password && user.type === userType) {
            this.currentUser = {
                email: email,
                name: user.name,
                type: userType,
                permissions: user.permissions,
                loginTime: Date.now()
            };
            
            // Guardar en localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            localStorage.setItem('loginTime', this.currentUser.loginTime.toString());
            
            this.updateNavigation();
            return { success: true, user: this.currentUser };
        }
        
        return { success: false, message: 'Credenciales incorrectas' };
    }
    
    // Cerrar sesión
    logout() {
        this.currentUser = null;
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedUserType');
        
        this.updateNavigation();
        
        // Redirigir al login si no está en páginas públicas
        const publicPages = ['index.html', 'login.html', 'registro.html', ''];
        const currentPage = window.location.pathname.split('/').pop();
        
        if (!publicPages.includes(currentPage)) {
            window.location.href = 'login.html';
        }
    }
    
    // Verificar si el usuario está autenticado
    isAuthenticated() {
        return this.currentUser !== null;
    }
    
    // Verificar permisos
    hasPermission(permission) {
        if (!this.currentUser) return false;
        return this.currentUser.permissions.includes('all') || 
               this.currentUser.permissions.includes(permission);
    }
    
    // Obtener usuario actual
    getCurrentUser() {
        return this.currentUser;
    }
    
    // Verificar tipo de usuario
    isUserType(type) {
        return this.currentUser && this.currentUser.type === type;
    }
    
    // Proteger página (requiere autenticación)
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
    
    // Proteger página por tipo de usuario
    requireUserType(allowedTypes) {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
        
        if (!allowedTypes.includes(this.currentUser.type)) {
            this.showAccessDenied();
            return false;
        }
        
        return true;
    }
    
    // Mostrar mensaje de acceso denegado
    showAccessDenied() {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 2000; display: flex; align-items: center; justify-content: center;">
                <div style="background: white; padding: 30px; border-radius: 15px; text-align: center; max-width: 400px;">
                    <h3 style="color: #e74c3c; margin-bottom: 15px;">🚫 Acceso Denegado</h3>
                    <p style="margin-bottom: 20px;">No tienes permisos para acceder a esta página.</p>
                    <button onclick="window.location.href='index.html'" style="background: #00796b; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Volver al Inicio</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Configurar verificación de sesión
    setupSessionCheck() {
        // Verificar sesión cada 5 minutos
        setInterval(() => {
            if (this.isAuthenticated()) {
                const loginTime = parseInt(localStorage.getItem('loginTime'));
                const timeDiff = Date.now() - loginTime;
                
                if (timeDiff >= this.sessionTimeout) {
                    this.showSessionExpired();
                    this.logout();
                }
            }
        }, 5 * 60 * 1000);
    }
    
    // Mostrar mensaje de sesión expirada
    showSessionExpired() {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 2000; display: flex; align-items: center; justify-content: center;">
                <div style="background: white; padding: 30px; border-radius: 15px; text-align: center; max-width: 400px;">
                    <h3 style="color: #f39c12; margin-bottom: 15px;">⏰ Sesión Expirada</h3>
                    <p style="margin-bottom: 20px;">Tu sesión ha expirado por seguridad. Por favor, inicia sesión nuevamente.</p>
                    <button onclick="window.location.href='login.html'" style="background: #00796b; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Iniciar Sesión</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Actualizar navegación según estado de autenticación
    updateNavigation() {
        const navElements = document.querySelectorAll('nav ul');
        
        navElements.forEach(nav => {
            // Remover elementos de autenticación existentes
            const authElements = nav.querySelectorAll('.auth-element');
            authElements.forEach(el => el.remove());
            
            if (this.isAuthenticated()) {
                // Usuario autenticado - mostrar perfil y logout
                const userMenu = document.createElement('li');
                userMenu.className = 'auth-element user-menu';
                userMenu.innerHTML = `
                    <div class="user-dropdown">
                        <a href="#" class="user-toggle">
                            👤 ${this.currentUser.name} ▼
                        </a>
                        <div class="dropdown-content">
                            <a href="#" onclick="auth.showProfile()">Mi Perfil</a>
                            <a href="#" onclick="auth.logout()">Cerrar Sesión</a>
                        </div>
                    </div>
                `;
                nav.appendChild(userMenu);
                
                // Agregar estilos para el dropdown
                this.addDropdownStyles();
                
            } else {
                // Usuario no autenticado - mostrar login
                const loginLink = document.createElement('li');
                loginLink.className = 'auth-element';
                loginLink.innerHTML = '<a href="login.html">Iniciar Sesión</a>';
                nav.appendChild(loginLink);
            }
        });
    }
    
    // Agregar estilos para el dropdown del usuario
    addDropdownStyles() {
        if (!document.getElementById('user-dropdown-styles')) {
            const styles = document.createElement('style');
            styles.id = 'user-dropdown-styles';
            styles.textContent = `
                .user-dropdown {
                    position: relative;
                    display: inline-block;
                }
                
                .dropdown-content {
                    display: none;
                    position: absolute;
                    right: 0;
                    background-color: white;
                    min-width: 160px;
                    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                    border-radius: 5px;
                    z-index: 1000;
                    top: 100%;
                    margin-top: 5px;
                }
                
                .dropdown-content a {
                    color: #333 !important;
                    padding: 12px 16px;
                    text-decoration: none;
                    display: block;
                    font-size: 14px;
                    transition: background-color 0.3s;
                }
                
                .dropdown-content a:hover {
                    background-color: #f1f1f1;
                    transform: none;
                    box-shadow: none;
                }
                
                .user-dropdown:hover .dropdown-content {
                    display: block;
                }
                
                .user-toggle {
                    cursor: pointer;
                }
            `;
            document.head.appendChild(styles);
        }
    }
    
    // Mostrar perfil del usuario
    showProfile() {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 2000; display: flex; align-items: center; justify-content: center;">
                <div style="background: white; padding: 30px; border-radius: 15px; max-width: 400px; width: 90%;">
                    <h3 style="color: #00796b; margin-bottom: 20px; text-align: center;">👤 Mi Perfil</h3>
                    <div style="margin-bottom: 15px;">
                        <strong>Nombre:</strong> ${this.currentUser.name}
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong>Email:</strong> ${this.currentUser.email}
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong>Tipo de Usuario:</strong> ${this.currentUser.type.charAt(0).toUpperCase() + this.currentUser.type.slice(1)}
                    </div>
                    <div style="margin-bottom: 20px;">
                        <strong>Sesión iniciada:</strong> ${new Date(this.currentUser.loginTime).toLocaleString()}
                    </div>
                    <div style="text-align: center;">
                        <button onclick="this.closest('div').parentElement.remove()" style="background: #00796b; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-right: 10px;">Cerrar</button>
                        <button onclick="auth.logout()" style="background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Cerrar Sesión</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

// Instancia global de autenticación
const auth = new WawitaAuth();

// Funciones de utilidad para proteger páginas
function requireAuth() {
    return auth.requireAuth();
}

function requireUserType(...allowedTypes) {
    return auth.requireUserType(allowedTypes);
}

function isAuthenticated() {
    return auth.isAuthenticated();
}

function getCurrentUser() {
    return auth.getCurrentUser();
}

function hasPermission(permission) {
    return auth.hasPermission(permission);
}

// Exportar para uso global
window.WawitaAuth = WawitaAuth;
window.auth = auth;
window.requireAuth = requireAuth;
window.requireUserType = requireUserType;
window.isAuthenticated = isAuthenticated;
window.getCurrentUser = getCurrentUser;
window.hasPermission = hasPermission;
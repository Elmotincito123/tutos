class WawitaChatbot {
    constructor() {
        this.isOpen = false;
        this.isMinimized = false;
        this.responses = {
            // Saludos
            'hola': '¡Hola! 👋 Bienvenido a Wawita. ¿En qué puedo ayudarte hoy?',
            'buenos días': '¡Buenos días! ☀️ ¿Cómo puedo asistirte?',
            'buenas tardes': '¡Buenas tardes! 🌅 ¿En qué te puedo ayudar?',
            'buenas noches': '¡Buenas noches! 🌙 ¿Necesitas ayuda con algo?',
            
            // Cursos
            '¿cómo crear un curso?': `Para crear un curso sigue estos pasos:
            1. Ve a la Galería de Cursos
            2. Haz clic en "Agregar Curso"
            3. Completa la información requerida
            4. Sube una imagen de fondo
            5. ¡Listo! Tu curso se creará automáticamente 📚`,
            
            'crear curso': `¡Perfecto! Para crear un curso:
            • Necesitas ser un tutor registrado
            • Ve a Galería → Agregar Curso
            • Completa todos los campos obligatorios
            • El sistema generará las reuniones automáticamente 🎯`,
            
            // Reuniones
            '¿cómo unirme a una reunión?': `Para unirte a una reunión:
            1. Ve a la galería de cursos
            2. Selecciona "Ver Reuniones" en tu curso
            3. Haz clic en "Unirse a la reunión"
            4. Se abrirá Jitsi Meet automáticamente 🎥`,
            
            'reunión': `Las reuniones en Wawita son súper fáciles:
            • Se generan automáticamente al crear un curso
            • Cada reunión tiene su propia sala virtual
            • Solo haz clic y únete instantáneamente 📹`,
            
            // Materiales
            'materiales': `Para gestionar materiales de estudio:
            • Ve a tu curso en la galería
            • Selecciona "Ver Material"
            • Puedes subir PDFs, documentos e imágenes
            • Organiza por semanas y sesiones 📖`,
            
            // Soporte técnico
            'problemas técnicos': `¿Tienes problemas técnicos? Te ayudo:
            • Verifica tu conexión a internet
            • Actualiza tu navegador
            • Limpia el caché si es necesario
            • Si persiste, usa "Reportar error" en el menú 🔧`,
            
            'error': `Para reportar errores:
            1. Ve a "Reportar error" en el menú
            2. Describe el problema detalladamente
            3. Incluye tu nombre de usuario
            4. Nuestro equipo lo revisará pronto ⚠️`,
            
            // Registro
            'registro': `Para registrarte en Wawita:
            • Como estudiante: "Inscríbete alumno"
            • Como tutor: "Postula"
            • Completa toda la información
            • ¡Bienvenido a la comunidad Wawita! 🎓`,
            
            // Pagos
            'pagos': `Nuestros planes de pago:
            • Plan Básico: 4 sesiones - $15
            • Plan Intermedio: 8 sesiones - $30
            • Plan Avanzado: 12 sesiones - $50
            Ve a la sección "Pagos" para más detalles 💳`,
            
            // Información general
            'qué es wawita': `Wawita es una plataforma de tutorías en línea que significa:
            "Website for Advanced Wonderful Intelligence, Technology, and Adaptive Learning"
            
            Conectamos tutores y estudiantes con herramientas modernas para un aprendizaje efectivo 🚀`,
            
            'ayuda': `¡Estoy aquí para ayudarte! Puedo asistirte con:
            • Crear y gestionar cursos
            • Unirte a reuniones
            • Subir materiales
            • Resolver problemas técnicos
            • Información sobre pagos
            • ¡Y mucho más! 💪`,
            
            // Despedidas
            'gracias': '¡De nada! 😊 Si necesitas más ayuda, estaré aquí.',
            'adiós': '¡Hasta luego! 👋 Que tengas un excelente día aprendiendo.',
            'chao': '¡Nos vemos! 🌟 Recuerda que siempre estoy aquí para ayudarte.'
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadChatHistory();
    }
    
    bindEvents() {
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        
        // Enter para enviar mensaje
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Botón enviar
        sendButton.addEventListener('click', () => this.sendMessage());
        
        // Auto-resize del input
        messageInput.addEventListener('input', () => {
            const isEmpty = messageInput.value.trim() === '';
            sendButton.disabled = isEmpty;
        });
    }
    
    sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (!message) return;
        
        // Agregar mensaje del usuario
        this.addMessage(message, 'user');
        messageInput.value = '';
        
        // Mostrar indicador de escritura
        this.showTypingIndicator();
        
        // Simular delay de respuesta
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
            this.saveChatHistory();
        }, 1000 + Math.random() * 1000);
    }
    
    sendQuickMessage(message) {
        document.getElementById('messageInput').value = message;
        this.sendMessage();
    }
    
    addMessage(content, sender) {
        const messagesContainer = document.getElementById('messagesContainer');
        const messageDiv = document.createElement('div');
        const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
            <div class="message-time">${currentTime}</div>
        `;
        
        // Remover botones rápidos si existen
        const quickActions = messagesContainer.querySelector('.quick-actions');
        if (quickActions && sender === 'user') {
            quickActions.remove();
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    generateResponse(message) {
        const normalizedMessage = message.toLowerCase().trim();
        
        // Buscar respuesta exacta
        if (this.responses[normalizedMessage]) {
            return this.responses[normalizedMessage];
        }
        
        // Buscar por palabras clave
        for (const [key, response] of Object.entries(this.responses)) {
            if (normalizedMessage.includes(key) || key.includes(normalizedMessage)) {
                return response;
            }
        }
        
        // Respuestas por categorías
        if (this.containsWords(normalizedMessage, ['curso', 'clase', 'materia'])) {
            return `Te ayudo con los cursos 📚. Puedes:
            • Explorar la galería de cursos
            • Crear un nuevo curso (si eres tutor)
            • Ver materiales de estudio
            • Unirte a reuniones programadas
            
            ¿Qué te gustaría hacer específicamente?`;
        }
        
        if (this.containsWords(normalizedMessage, ['reunión', 'jitsi', 'video', 'llamada'])) {
            return `Para las reuniones virtuales 🎥:
            • Todas las reuniones usan Jitsi Meet
            • Se generan automáticamente al crear un curso
            • Solo necesitas hacer clic para unirte
            • No requiere instalación adicional
            
            ¿Necesitas ayuda para unirte a una reunión específica?`;
        }
        
        if (this.containsWords(normalizedMessage, ['problema', 'error', 'bug', 'falla'])) {
            return `Lamento que tengas problemas 😔. Te sugiero:
            1. Refrescar la página (F5)
            2. Verificar tu conexión a internet
            3. Limpiar caché del navegador
            4. Usar "Reportar error" en el menú
            
            ¿Puedes describir qué problema específico tienes?`;
        }
        
        if (this.containsWords(normalizedMessage, ['precio', 'costo', 'pago', 'plan'])) {
            return `Nuestros planes son muy accesibles 💰:
            
            🥉 **Plan Básico**: $15 (4 sesiones)
            🥈 **Plan Intermedio**: $30 (8 sesiones)  
            🥇 **Plan Avanzado**: $50 (12 sesiones)
            
            ¡Todos incluyen materiales y reuniones ilimitadas!`;
        }
        
        // Respuesta por defecto con sugerencias
        return `No estoy seguro de cómo ayudarte con eso 🤔. 

        Puedo asistirte con:
        • ❓ Información sobre Wawita
        • 📚 Crear y gestionar cursos
        • 🎥 Unirse a reuniones
        • 📖 Subir materiales de estudio
        • 💳 Información de pagos
        • 🔧 Soporte técnico
        
        ¿Podrías ser más específico sobre lo que necesitas?`;
    }
    
    containsWords(text, words) {
        return words.some(word => text.includes(word));
    }
    
    showTypingIndicator() {
        document.getElementById('typingIndicator').style.display = 'flex';
        const messagesContainer = document.getElementById('messagesContainer');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    hideTypingIndicator() {
        document.getElementById('typingIndicator').style.display = 'none';
    }
    
    saveChatHistory() {
        const messages = Array.from(document.querySelectorAll('.message')).map(msg => ({
            content: msg.querySelector('.message-content').textContent,
            sender: msg.classList.contains('user-message') ? 'user' : 'bot',
            time: msg.querySelector('.message-time').textContent
        }));
        
        localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
    
    loadChatHistory() {
        const history = localStorage.getItem('chatHistory');
        if (history) {
            const messages = JSON.parse(history);
            const messagesContainer = document.getElementById('messagesContainer');
            
            // Limpiar mensajes existentes excepto el de bienvenida
            const welcomeMessage = messagesContainer.querySelector('.message');
            messagesContainer.innerHTML = '';
            messagesContainer.appendChild(welcomeMessage);
            
            // Cargar historial
            messages.slice(-10).forEach(msg => { // Solo últimos 10 mensajes
                if (msg.content !== '¡Hola! 👋 Soy el asistente virtual de Wawita. ¿En qué puedo ayudarte hoy?') {
                    const messageDiv = document.createElement('div');
                    messageDiv.className = `message ${msg.sender}-message`;
                    messageDiv.innerHTML = `
                        <div class="message-content">${msg.content}</div>
                        <div class="message-time">${msg.time}</div>
                    `;
                    messagesContainer.appendChild(messageDiv);
                }
            });
        }
    }
}

// Funciones globales
function toggleChatbot() {
    const container = document.querySelector('.chatbot-container');
    const toggle = document.querySelector('.chatbot-toggle');
    
    if (container.style.display === 'none' || !container.style.display) {
        container.style.display = 'flex';
        toggle.style.display = 'none';
        
        // Focus en el input
        setTimeout(() => {
            document.getElementById('messageInput').focus();
        }, 300);
    } else {
        container.style.display = 'none';
        toggle.style.display = 'flex';
    }
}

function clearChat() {
    if (confirm('¿Estás seguro de que quieres limpiar el historial del chat?')) {
        localStorage.removeItem('chatHistory');
        location.reload();
    }
}

// Inicializar chatbot cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new WawitaChatbot();
    
    // Auto-abrir chatbot en primera visita
    if (!localStorage.getItem('chatbotVisited')) {
        setTimeout(() => {
            toggleChatbot();
            localStorage.setItem('chatbotVisited', 'true');
        }, 3000);
    }
});
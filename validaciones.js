// Sistema de validaciones mejorado para Wawita

class WawitaValidator {
    constructor() {
        this.rules = {
            required: (value) => value.trim() !== '',
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            phone: (value) => /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, '')),
            minLength: (value, min) => value.length >= min,
            maxLength: (value, max) => value.length <= max,
            number: (value) => !isNaN(value) && !isNaN(parseFloat(value)),
            positiveNumber: (value) => this.rules.number(value) && parseFloat(value) > 0,
            date: (value) => !isNaN(Date.parse(value)),
            futureDate: (value) => new Date(value) > new Date(),
            fileSize: (file, maxSizeMB) => file.size <= maxSizeMB * 1024 * 1024,
            fileType: (file, allowedTypes) => allowedTypes.includes(file.type),
            strongPassword: (value) => {
                const hasUpper = /[A-Z]/.test(value);
                const hasLower = /[a-z]/.test(value);
                const hasNumber = /\d/.test(value);
                const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
                const isLongEnough = value.length >= 8;
                return hasUpper && hasLower && hasNumber && hasSpecial && isLongEnough;
            }
        };
        
        this.messages = {
            required: 'Este campo es obligatorio',
            email: 'Ingresa un correo electrónico válido',
            phone: 'Ingresa un número de teléfono válido',
            minLength: (min) => `Debe tener al menos ${min} caracteres`,
            maxLength: (max) => `No puede exceder ${max} caracteres`,
            number: 'Debe ser un número válido',
            positiveNumber: 'Debe ser un número positivo',
            date: 'Ingresa una fecha válida',
            futureDate: 'La fecha debe ser futura',
            fileSize: (maxSizeMB) => `El archivo no puede exceder ${maxSizeMB}MB`,
            fileType: (allowedTypes) => `Tipos permitidos: ${allowedTypes.join(', ')}`,
            strongPassword: 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y símbolos'
        };
    }
    
    validateField(field, validations) {
        const errors = [];
        const value = field.type === 'file' ? field.files[0] : field.value;
        
        for (const validation of validations) {
            const { rule, params = [], message } = validation;
            
            if (rule === 'required' && field.type === 'file') {
                if (!value) {
                    errors.push(message || this.messages.required);
                }
                continue;
            }
            
            if (rule === 'required' && !this.rules.required(value)) {
                errors.push(message || this.messages.required);
                break; // Si es requerido y está vacío, no validar otras reglas
            }
            
            if (value && this.rules[rule]) {
                if (field.type === 'file') {
                    if (!this.rules[rule](value, ...params)) {
                        errors.push(message || this.messages[rule](...params));
                    }
                } else {
                    if (!this.rules[rule](value, ...params)) {
                        errors.push(message || (typeof this.messages[rule] === 'function' ? this.messages[rule](...params) : this.messages[rule]));
                    }
                }
            }
        }
        
        return errors;
    }
    
    showFieldError(field, errors) {
        const errorContainer = field.parentElement.querySelector('.error-message') || 
                              this.createErrorContainer(field);
        
        if (errors.length > 0) {
            errorContainer.textContent = errors[0];
            errorContainer.classList.add('show');
            field.classList.add('error');
            return false;
        } else {
            errorContainer.textContent = '';
            errorContainer.classList.remove('show');
            field.classList.remove('error');
            field.classList.add('valid');
            return true;
        }
    }
    
    createErrorContainer(field) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        field.parentElement.appendChild(errorDiv);
        return errorDiv;
    }
    
    validateForm(formId, validationRules) {
        const form = document.getElementById(formId);
        if (!form) return false;
        
        let isValid = true;
        
        for (const [fieldId, rules] of Object.entries(validationRules)) {
            const field = form.querySelector(`#${fieldId}`);
            if (!field) continue;
            
            const errors = this.validateField(field, rules);
            const fieldValid = this.showFieldError(field, errors);
            
            if (!fieldValid) {
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    setupRealTimeValidation(formId, validationRules) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        for (const [fieldId, rules] of Object.entries(validationRules)) {
            const field = form.querySelector(`#${fieldId}`);
            if (!field) continue;
            
            // Validación en tiempo real
            const validateRealTime = () => {
                const errors = this.validateField(field, rules);
                this.showFieldError(field, errors);
            };
            
            if (field.type === 'file') {
                field.addEventListener('change', validateRealTime);
            } else {
                field.addEventListener('blur', validateRealTime);
                field.addEventListener('input', () => {
                    // Limpiar errores mientras escribe
                    field.classList.remove('error');
                    const errorContainer = field.parentElement.querySelector('.error-message');
                    if (errorContainer) {
                        errorContainer.classList.remove('show');
                    }
                });
            }
        }
    }
}

// Instancia global del validador
const validator = new WawitaValidator();

// Configuraciones de validación para diferentes formularios
const validationConfigs = {
    // Formulario de login
    loginForm: {
        email: [
            { rule: 'required' },
            { rule: 'email' }
        ],
        password: [
            { rule: 'required' },
            { rule: 'minLength', params: [6] }
        ],
        userType: [
            { rule: 'required' }
        ]
    },
    
    // Formulario de cursos
    cursoForm: {
        tutorID: [
            { rule: 'required' },
            { rule: 'positiveNumber' }
        ],
        nombreCurso: [
            { rule: 'required' },
            { rule: 'minLength', params: [3] },
            { rule: 'maxLength', params: [100] }
        ],
        descripcionCurso: [
            { rule: 'required' },
            { rule: 'minLength', params: [10] },
            { rule: 'maxLength', params: [500] }
        ],
        nivelCurso: [
            { rule: 'required' }
        ],
        fechaInicio: [
            { rule: 'required' },
            { rule: 'date' },
            { rule: 'futureDate' }
        ],
        duracionCurso: [
            { rule: 'required' },
            { rule: 'positiveNumber' }
        ],
        sesionesPorSemana: [
            { rule: 'required' },
            { rule: 'positiveNumber' }
        ],
        fondoCurso: [
            { rule: 'required' },
            { rule: 'fileType', params: [['image/jpeg', 'image/png', 'image/gif']] },
            { rule: 'fileSize', params: [5] }
        ]
    },
    
    // Formulario de materiales
    materialForm: {
        semana: [
            { rule: 'required' }
        ],
        sesion: [
            { rule: 'required' }
        ],
        titulo: [
            { rule: 'required' },
            { rule: 'minLength', params: [3] },
            { rule: 'maxLength', params: [100] }
        ],
        descripcion: [
            { rule: 'required' },
            { rule: 'minLength', params: [10] },
            { rule: 'maxLength', params: [300] }
        ],
        archivo: [
            { rule: 'required' },
            { rule: 'fileSize', params: [10] }
        ]
    },
    
    // Formulario de tutores
    tutorForm: {
        nombre: [
            { rule: 'required' },
            { rule: 'minLength', params: [2] },
            { rule: 'maxLength', params: [50] }
        ],
        asignatura: [
            { rule: 'required' }
        ],
        disponibilidad: [
            { rule: 'required' }
        ],
        idioma: [
            { rule: 'required' }
        ],
        nivel: [
            { rule: 'required' }
        ],
        duracion: [
            { rule: 'required' }
        ],
        notas: [
            { rule: 'required' },
            { rule: 'minLength', params: [10] },
            { rule: 'maxLength', params: [500] }
        ]
    },
    
    // Formulario de alumnos
    alumnoForm: {
        nombre: [
            { rule: 'required' },
            { rule: 'minLength', params: [2] },
            { rule: 'maxLength', params: [50] }
        ],
        apellido: [
            { rule: 'required' },
            { rule: 'minLength', params: [2] },
            { rule: 'maxLength', params: [50] }
        ],
        nacionalidad: [
            { rule: 'required' },
            { rule: 'minLength', params: [2] },
            { rule: 'maxLength', params: [50] }
        ],
        telefono: [
            { rule: 'required' },
            { rule: 'phone' }
        ]
    }
};

// Función para inicializar validaciones en una página
function initializeValidation(formId) {
    if (validationConfigs[formId]) {
        validator.setupRealTimeValidation(formId, validationConfigs[formId]);
    }
}

// Función para validar formulario antes del envío
function validateFormBeforeSubmit(formId) {
    if (validationConfigs[formId]) {
        return validator.validateForm(formId, validationConfigs[formId]);
    }
    return true;
}

// Estilos CSS para las validaciones (agregar al CSS principal)
const validationStyles = `
.error-message {
    color: #e74c3c;
    font-size: 12px;
    margin-top: 5px;
    min-height: 16px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.error-message.show {
    opacity: 1;
}

input.error,
select.error,
textarea.error {
    border-color: #e74c3c !important;
    box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;
}

input.valid,
select.valid,
textarea.valid {
    border-color: #27ae60 !important;
    box-shadow: 0 0 0 2px rgba(39, 174, 96, 0.2) !important;
}

.form-group {
    position: relative;
    margin-bottom: 20px;
}

/* Indicador de campo requerido */
.required::after {
    content: ' *';
    color: #e74c3c;
}

/* Tooltip de ayuda */
.field-help {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    cursor: help;
    font-size: 14px;
}

.field-help:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    right: 0;
    background: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    white-space: nowrap;
    z-index: 1000;
    font-size: 12px;
}
`;

// Inyectar estilos de validación
if (!document.getElementById('validation-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'validation-styles';
    styleSheet.textContent = validationStyles;
    document.head.appendChild(styleSheet);
}

// Exportar para uso global
window.WawitaValidator = WawitaValidator;
window.validator = validator;
window.initializeValidation = initializeValidation;
window.validateFormBeforeSubmit = validateFormBeforeSubmit;
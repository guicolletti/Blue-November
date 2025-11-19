// Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (validateForm()) {
                // Simulação de envio
                showSuccessMessage();
                contactForm.reset();
            }
        });

        // Validação em tempo real
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    }

    function validateForm() {
        const fields = [
            { id: 'name', type: 'text', required: true },
            { id: 'email', type: 'email', required: true },
            { id: 'subject', type: 'select', required: true },
            { id: 'message', type: 'textarea', required: true }
        ];

        let isValid = true;

        fields.forEach(field => {
            const element = document.getElementById(field.id);
            if (!validateField(element)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.previousElementSibling.textContent;
        let isValid = true;
        let errorMessage = '';

        if (field.hasAttribute('required') && value === '') {
            errorMessage = `${fieldName} é obrigatório`;
            isValid = false;
        }

        if (isValid && value !== '') {
            switch (field.type) {
                case 'email':
                    if (!isValidEmail(value)) {
                        errorMessage = 'Por favor, insira um email válido';
                        isValid = false;
                    }
                    break;
                case 'tel':
                    if (!isValidPhone(value)) {
                        errorMessage = 'Por favor, insira um telefone válido';
                        isValid = false;
                    }
                    break;
            }

            // Validação para selects
            if (field.tagName === 'SELECT' && value === '') {
                errorMessage = `${fieldName} é obrigatório`;
                isValid = false;
            }
        }

        // Exibir ou limpar mensagem de erro
        if (!isValid) {
            showError(field, errorMessage);
        } else {
            clearError(field);
        }

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        // Remover caracteres não numéricos
        const cleanPhone = phone.replace(/\D/g, '');
        return cleanPhone.length >= 10 && cleanPhone.length <= 11;
    }

    function showError(field, message) {
        // Remover erro anterior
        clearError(field);

        // Adicionar classe de erro
        field.classList.add('error');

        // Criar elemento de mensagem de erro
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;

        // Inserir após o campo
        field.parentNode.appendChild(errorElement);
    }

    function clearError(field) {
        field.classList.remove('error');

        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    function showSuccessMessage() {
        // Criar elemento de sucesso
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.innerHTML = `
            <div class="success-content">
                <span class="success-icon">✓</span>
                <h3>Mensagem Enviada com Sucesso!</h3>
                <p>Obrigado pelo seu contato. Responderemos em breve.</p>
            </div>
        `;

        // Estilos para a mensagem de sucesso
        successElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
            z-index: 10000;
            max-width: 400px;
            width: 90%;
        `;

        const successContent = successElement.querySelector('.success-content');
        successContent.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
        `;

        const successIcon = successElement.querySelector('.success-icon');
        successIcon.style.cssText = `
            width: 60px;
            height: 60px;
            background: #4CAF50;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            font-weight: bold;
        `;

        // Adicionar ao body
        document.body.appendChild(successElement);

        // Remover após 3 segundos
        setTimeout(() => {
            successElement.remove();
        }, 3000);
    }
});

// Adicionar estilos CSS para validação
const style = document.createElement('style');
style.textContent = `
    .form-group {
        position: relative;
        margin-bottom: 25px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: var(--azul-escuro);
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 12px 15px;
        border: 2px solid var(--cinza-medio);
        border-radius: 8px;
        font-size: 1rem;
        transition: var(--transicao);
        font-family: 'Open Sans', sans-serif;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        border-color: var(--azul-claro);
        outline: none;
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #e74c3c;
    }
    
    .error-message {
        display: block;
        color: #e74c3c;
        font-size: 0.85rem;
        margin-top: 5px;
    }
    
    .contact-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px;
        align-items: start;
    }
    
    .contact-details {
        margin: 30px 0;
    }
    
    .contact-item {
        display: flex;
        align-items: flex-start;
        gap: 15px;
        margin-bottom: 25px;
    }
    
    .contact-icon {
        flex-shrink: 0;
        width: 50px;
        height: 50px;
        background: var(--azul-claro);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .contact-text h3 {
        margin-bottom: 5px;
        font-size: 1.1rem;
    }
    
    .social-contact {
        margin-top: 40px;
    }
    
    .social-contact h3 {
        margin-bottom: 15px;
    }
    
    .objectives-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 30px;
    }
    
    .objective-card {
        background: white;
        padding: 30px;
        border-radius: var(--borda-radius);
        text-align: center;
        box-shadow: 0 5px 15px var(--sombra);
        transition: var(--transicao);
    }
    
    .objective-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px var(--sombra-escura);
    }
    
    .objective-icon {
        font-size: 3rem;
        margin-bottom: 20px;
    }
    
    .objective-card h3 {
        margin-bottom: 15px;
        font-size: 1.3rem;
    }
    
    .history-content,
    .importance-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px;
        align-items: center;
    }
    
    .importance-stats {
        display: flex;
        gap: 40px;
        margin-top: 30px;
    }
    
    .importance-stat {
        text-align: center;
    }
    
    .importance-stat .stat-number {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--azul-claro);
        display: block;
    }
    
    .importance-stat .stat-label {
        font-size: 0.9rem;
        color: var(--cinza-texto);
        margin-top: 5px;
    }
    
    .exams-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
    }
    
    .exam-card {
        background: white;
        padding: 30px;
        border-radius: var(--borda-radius);
        box-shadow: 0 5px 15px var(--sombra);
        transition: var(--transicao);
    }
    
    .exam-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px var(--sombra-escura);
    }
    
    .exam-card h3 {
        color: var(--azul-claro);
        margin-bottom: 15px;
        font-size: 1.3rem;
    }
    
    .exam-details {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid var(--cinza-medio);
    }
    
    .exam-details h4 {
        font-size: 1rem;
        margin-bottom: 5px;
        color: var(--azul-escuro);
    }
    
    .page-header {
        background: var(--gradiente-azul);
        color: white;
        text-align: center;
    }
    
    .page-header h1 {
        color: white;
        font-size: 3rem;
        margin-bottom: 15px;
    }
    
    .page-header p {
        font-size: 1.2rem;
        opacity: 0.9;
    }
    
    @media (max-width: 768px) {
        .contact-content {
            grid-template-columns: 1fr;
        }
        
        .history-content,
        .importance-content {
            grid-template-columns: 1fr;
        }
        
        .importance-stats {
            flex-direction: column;
            gap: 20px;
        }
        
        .page-header h1 {
            font-size: 2.2rem;
        }
    }
`;
document.head.appendChild(style);
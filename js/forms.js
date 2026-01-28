// =========================================================
// FORMS MODULE - Validação Melhorada
// =========================================================

// Validação em tempo real com feedback visual
function setupFormValidation() {
    const contatoForm = document.getElementById('contatoForm');
    if (!contatoForm) return;
    
    const formFields = contatoForm.querySelectorAll('input, textarea, select');
    
    formFields.forEach(field => {
        // Criar elemento de erro se não existir
        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
            const errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            errorMsg.setAttribute('role', 'alert');
            errorMsg.setAttribute('aria-live', 'polite');
            field.parentNode.appendChild(errorMsg);
        }
        
        // Validação em tempo real
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Validação no submit
    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            submitForm(contatoForm);
        } else {
            // Focar no primeiro campo com erro
            const firstError = contatoForm.querySelector('.error');
            if (firstError) {
                firstError.focus();
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// Validar campo individual
function validateField(field) {
    const errorMsg = field.parentNode.querySelector('.error-message');
    let isValid = true;
    let errorText = '';
    
    // Remover estados anteriores
    field.classList.remove('error', 'success');
    
    // Validações específicas
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorText = getRequiredMessage(field);
    } else if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorText = 'Por favor, insira um email válido.';
        }
    } else if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[\d\s\(\)\-\+]+$/;
        if (!phoneRegex.test(field.value) || field.value.replace(/\D/g, '').length < 10) {
            isValid = false;
            errorText = 'Por favor, insira um telefone válido.';
        }
    } else if (field.tagName === 'TEXTAREA' && field.value.trim().length < 10) {
        isValid = false;
        errorText = 'A mensagem deve ter pelo menos 10 caracteres.';
    }
    
    // Atualizar UI
    if (isValid) {
        field.classList.add('success');
        if (errorMsg) {
            errorMsg.textContent = '';
            errorMsg.style.display = 'none';
        }
    } else {
        field.classList.add('error');
        if (errorMsg) {
            errorMsg.textContent = errorText;
            errorMsg.style.display = 'block';
        }
    }
    
    return isValid;
}

// Mensagens de erro personalizadas
function getRequiredMessage(field) {
    const messages = {
        'nome': 'Por favor, insira seu nome.',
        'email': 'Por favor, insira seu email.',
        'assunto': 'Por favor, selecione um assunto.',
        'mensagem': 'Por favor, escreva sua mensagem.'
    };
    return messages[field.name] || 'Este campo é obrigatório.';
}

// Submeter formulário
function submitForm(form) {
    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        assunto: document.getElementById('assunto').value,
        mensagem: document.getElementById('mensagem').value
    };
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    // Simular envio (substituir por chamada real de API)
    setTimeout(() => {
        showSuccessMessage(form);
        form.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Remover classes de validação
        form.querySelectorAll('.error, .success').forEach(field => {
            field.classList.remove('error', 'success');
        });
        form.querySelectorAll('.error-message').forEach(msg => {
            msg.style.display = 'none';
        });
    }, 1500);
}

// Mostrar mensagem de sucesso
function showSuccessMessage(form) {
    // Criar ou atualizar mensagem de sucesso
    let successMsg = form.querySelector('.success-message');
    if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.setAttribute('role', 'alert');
        successMsg.setAttribute('aria-live', 'polite');
        form.insertBefore(successMsg, form.firstChild);
    }
    
    successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.';
    successMsg.style.display = 'block';
    
    // Remover após 5 segundos
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 5000);
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupFormValidation);
} else {
    setupFormValidation();
}

// Exportar funções
export { setupFormValidation, validateField, submitForm };

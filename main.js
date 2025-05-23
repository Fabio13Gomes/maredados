// Funções JavaScript para o site MareDados

// Toggle do menu mobile
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  // Botão do menu mobile
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  
  // Fechar menu ao clicar em um link (mobile)
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const mobileMenu = document.querySelector('.nav-links');
      if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
      }
    });
  });
  
  // Destacar link ativo no menu
  const currentLocation = window.location.pathname;
  const menuLinks = document.querySelectorAll('.nav-links a');
  
  menuLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentLocation.includes(linkPath) && linkPath !== '/') {
      link.classList.add('active');
    } else if (currentLocation === '/' && linkPath === '/') {
      link.classList.add('active');
    }
  });
  
  // Animação de scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Validação do formulário de contato
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Validação simples
      if (!nameInput.value.trim()) {
        isValid = false;
        showError(nameInput, 'Por favor, informe seu nome');
      } else {
        clearError(nameInput);
      }
      
      if (!emailInput.value.trim()) {
        isValid = false;
        showError(emailInput, 'Por favor, informe seu e-mail');
      } else if (!isValidEmail(emailInput.value)) {
        isValid = false;
        showError(emailInput, 'Por favor, informe um e-mail válido');
      } else {
        clearError(emailInput);
      }
      
      if (!messageInput.value.trim()) {
        isValid = false;
        showError(messageInput, 'Por favor, escreva sua mensagem');
      } else {
        clearError(messageInput);
      }
      
      if (isValid) {
        // Simulação de envio bem-sucedido
        contactForm.reset();
        showSuccessMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      }
    });
  }
});

// Funções auxiliares para validação de formulário
function showError(input, message) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
  
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  
  if (!formGroup.querySelector('.error-message')) {
    formGroup.appendChild(errorElement);
  }
  
  input.classList.add('error');
}

function clearError(input) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector('.error-message');
  
  if (errorElement) {
    formGroup.removeChild(errorElement);
  }
  
  input.classList.remove('error');
}

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function showSuccessMessage(message) {
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.createElement('div');
  
  successMessage.className = 'success-message';
  successMessage.textContent = message;
  
  contactForm.parentElement.insertBefore(successMessage, contactForm);
  
  // Remover a mensagem após 5 segundos
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
}

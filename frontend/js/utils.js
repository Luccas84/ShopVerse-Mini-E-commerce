// Função para mostrar toast notification
function mostrarToast(mensagem, tipo = 'info') {
  // Remover toasts anteriores
  const toastsAnteriores = document.querySelectorAll('.toast');
  toastsAnteriores.forEach(toast => toast.remove());

  // Criar elemento toast
  const toast = document.createElement('div');
  toast.className = `toast toast-${tipo}`;
  toast.textContent = mensagem;

  // Adicionar ao body
  document.body.appendChild(toast);

  // Animar entrada
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // Remover após 3 segundos
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Função para mostrar erro em elementos
function mostrarErro(elemento, mensagem) {
  if (elemento) {
    elemento.textContent = mensagem;
    elemento.style.display = 'block';
    
    // Remover após 5 segundos
    setTimeout(() => {
      elemento.style.display = 'none';
      elemento.textContent = '';
    }, 5000);
  }
}

// Função para formatar preço
function formatarPreco(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

// Função para formatar data
function formatarData(data) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(data));
}

// Função para obter estrelas HTML
function obterEstrelasHTML(nota) {
  const notaInt = Math.round(nota);
  let html = '<div class="estrelas">';
  
  for (let i = 1; i <= 5; i++) {
    if (i <= notaInt) {
      html += '<i class="bx bxs-star"></i>';
    } else {
      html += '<i class="bx bx-star"></i>';
    }
  }
  
  html += '</div>';
  return html;
}

// Função para debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Exportar funções
window.mostrarToast = mostrarToast;
window.mostrarErro = mostrarErro;
window.formatarPreco = formatarPreco;
window.formatarData = formatarData;
window.obterEstrelasHTML = obterEstrelasHTML;
window.debounce = debounce;



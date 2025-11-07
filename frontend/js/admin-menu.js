// Menu Flutuante Admin
let adminMenuAberto = false;

// Inicializar menu flutuante admin
function inicializarAdminMenu() {
  const { autenticado, usuario } = verificarAutenticacao();
  
  if (autenticado && usuario && usuario.admin) {
    mostrarAdminMenu();
    atualizarBadgeAdmin();
  } else {
    esconderAdminMenu();
  }
}

// Mostrar menu admin
function mostrarAdminMenu() {
  const trigger = document.getElementById('adminFloatTrigger');
  const menu = document.getElementById('adminFloatMenu');
  
  if (trigger) {
    trigger.style.display = 'flex';
  }
  
  if (menu) {
    menu.style.display = 'block';
  }
}

// Esconder menu admin
function esconderAdminMenu() {
  const trigger = document.getElementById('adminFloatTrigger');
  const menu = document.getElementById('adminFloatMenu');
  
  if (trigger) {
    trigger.style.display = 'none';
  }
  
  if (menu) {
    menu.style.display = 'none';
    menu.classList.remove('active');
    adminMenuAberto = false;
  }
}

// Toggle menu admin
function toggleAdminMenu() {
  const menu = document.getElementById('adminFloatMenu');
  
  if (!menu) return;
  
  adminMenuAberto = !adminMenuAberto;
  
  if (adminMenuAberto) {
    menu.classList.add('active');
  } else {
    menu.classList.remove('active');
  }
}

// Fechar menu ao clicar fora
function fecharAdminMenuAoClicarFora(event) {
  const trigger = document.getElementById('adminFloatTrigger');
  const menu = document.getElementById('adminFloatMenu');
  
  if (!trigger || !menu) return;
  
  if (!trigger.contains(event.target) && !menu.contains(event.target)) {
    menu.classList.remove('active');
    adminMenuAberto = false;
  }
}

// Atualizar badge com número de pedidos pendentes
async function atualizarBadgeAdmin() {
  try {
    const pedidos = await api.pedidos.listar();
    const pedidosPendentes = pedidos.filter(p => p.status === 'pendente').length;
    
    const badge = document.querySelector('.admin-float-trigger .badge');
    if (badge) {
      if (pedidosPendentes > 0) {
        badge.textContent = pedidosPendentes;
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    }
  } catch (error) {
    console.error('Erro ao atualizar badge admin:', error);
  }
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    inicializarAdminMenu();
    
    // Event listeners
    const trigger = document.getElementById('adminFloatTrigger');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAdminMenu();
      });
    }
    
    // Fechar ao clicar fora
    document.addEventListener('click', fecharAdminMenuAoClicarFora);
  });
} else {
  inicializarAdminMenu();
  
  const trigger = document.getElementById('adminFloatTrigger');
  if (trigger) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAdminMenu();
    });
  }
  
  document.addEventListener('click', fecharAdminMenuAoClicarFora);
}

// Exportar funções
window.inicializarAdminMenu = inicializarAdminMenu;
window.mostrarAdminMenu = mostrarAdminMenu;
window.esconderAdminMenu = esconderAdminMenu;



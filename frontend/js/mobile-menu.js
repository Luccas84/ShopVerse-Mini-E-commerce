// Menu Mobile Hamburger
let mobileMenuAberto = false;

// Toggle menu mobile
function toggleMobileMenu() {
  mobileMenuAberto = !mobileMenuAberto;
  
  const mobileNav = document.getElementById('mobileNav');
  const menuToggle = document.getElementById('menuToggle');
  
  if (mobileNav) {
    if (mobileMenuAberto) {
      mobileNav.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      mobileNav.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
  
  // Animar ícone hamburger
  if (menuToggle) {
    const icon = menuToggle.querySelector('i');
    if (icon) {
      if (mobileMenuAberto) {
        icon.classList.remove('bx-menu');
        icon.classList.add('bx-x');
      } else {
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
      }
    }
  }
}

// Fechar menu ao clicar em link
function fecharMobileMenu() {
  mobileMenuAberto = false;
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav) {
    mobileNav.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.classList.remove('bx-x');
      icon.classList.add('bx-menu');
    }
  }
}

// Fechar menu ao clicar fora
function fecharMobileMenuAoClicarFora(event) {
  const mobileNav = document.getElementById('mobileNav');
  const menuToggle = document.getElementById('menuToggle');
  
  if (!mobileNav || !menuToggle) return;
  
  if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target) && mobileMenuAberto) {
    fecharMobileMenu();
  }
}

// Fechar menu ao redimensionar para desktop
function verificarLarguraTela() {
  if (window.innerWidth > 1024 && mobileMenuAberto) {
    fecharMobileMenu();
  }
}

// Inicializar menu mobile
function inicializarMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }
  
  // Fechar ao clicar em links
  const mobileLinks = document.querySelectorAll('.mobile-nav-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(fecharMobileMenu, 300);
    });
  });
  
  // Fechar ao clicar fora
  document.addEventListener('click', fecharMobileMenuAoClicarFora);
  
  // Verificar largura da tela
  window.addEventListener('resize', verificarLarguraTela);
}

// Exportar funções
window.toggleMobileMenu = toggleMobileMenu;
window.fecharMobileMenu = fecharMobileMenu;

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarMobileMenu);
} else {
  inicializarMobileMenu();
}



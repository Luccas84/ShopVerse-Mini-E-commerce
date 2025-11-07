// Função para abrir modal de login
function abrirModalLogin() {
  const modal = document.getElementById('modalLogin');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// Função para fechar modal de login
function fecharModalLogin() {
  const modal = document.getElementById('modalLogin');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Função para fazer login
async function fazerLogin(event) {
  if (event) {
    event.preventDefault();
  }

  const email = document.getElementById('loginEmail').value;
  const senha = document.getElementById('loginSenha').value;
  const erroElement = document.getElementById('loginErro');

  if (!email || !senha) {
    mostrarErro(erroElement, 'Por favor, preencha todos os campos');
    return;
  }

  try {
    const resposta = await api.auth.login({ email, senha });
    
    localStorage.setItem('token', resposta.token);
    localStorage.setItem('usuario', JSON.stringify(resposta.usuario));
    
    mostrarToast('Login realizado com sucesso!', 'sucesso');
    
    fecharModalLogin();
    
    // Atualizar interface imediatamente antes de recarregar
    atualizarInterfaceLogin();
    
    // Inicializar menu admin se disponível
    if (typeof inicializarAdminMenu === 'function') {
      inicializarAdminMenu();
    }
    
    // Recarregar página para atualizar interface completamente
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    mostrarErro(erroElement, error.message || 'Email ou senha inválidos');
  }
}

// Função para fazer logout
function fazerLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  mostrarToast('Logout realizado com sucesso!', 'sucesso');
  
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 500);
}

// Verificar se usuário está logado
function verificarAutenticacao() {
  const token = localStorage.getItem('token');
  const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
  
  return { autenticado: !!token, usuario };
}

// Atualizar interface baseado no login
function atualizarInterfaceLogin() {
  const { autenticado, usuario } = verificarAutenticacao();
  const btnLogin = document.getElementById('btnLogin');
  const btnLogout = document.getElementById('btnLogout');
  const usuarioInfo = document.getElementById('usuarioInfo');
  const linkDashboard = document.getElementById('linkDashboard');
  
  if (btnLogin) {
    btnLogin.style.display = autenticado ? 'none' : 'block';
  }
  
  if (btnLogout) {
    btnLogout.style.display = autenticado ? 'block' : 'none';
  }
  
  if (usuarioInfo && autenticado) {
    usuarioInfo.textContent = `Olá, ${usuario?.nome || ''}`;
    usuarioInfo.style.display = 'block';
  }
  
  // Mostrar link do dashboard se for admin
  if (linkDashboard) {
    if (autenticado && usuario && usuario.admin) {
      linkDashboard.style.display = 'inline-block';
    } else {
      linkDashboard.style.display = 'none';
    }
  }
  
  // Atualizar menu mobile
  const mobileLinkDashboard = document.getElementById('mobileLinkDashboard');
  const mobileBtnLogout = document.getElementById('mobileBtnLogout');
  
  if (mobileLinkDashboard) {
    if (autenticado && usuario && usuario.admin) {
      mobileLinkDashboard.style.display = 'block';
    } else {
      mobileLinkDashboard.style.display = 'none';
    }
  }
  
  if (mobileBtnLogout) {
    mobileBtnLogout.style.display = autenticado ? 'block' : 'none';
  }
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    atualizarInterfaceLogin();
    
    // Event listeners
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
      formLogin.addEventListener('submit', fazerLogin);
    }
    
    const btnFecharLogin = document.getElementById('fecharLogin');
    if (btnFecharLogin) {
      btnFecharLogin.addEventListener('click', fecharModalLogin);
    }
    
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
      btnLogout.addEventListener('click', fazerLogout);
    }
    
    // Fechar modal ao clicar fora
    const modal = document.getElementById('modalLogin');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          fecharModalLogin();
        }
      });
    }
  });
} else {
  atualizarInterfaceLogin();
}

// Exportar funções
window.abrirModalLogin = abrirModalLogin;
window.fazerLogin = fazerLogin;
window.fazerLogout = fazerLogout;
window.verificarAutenticacao = verificarAutenticacao;


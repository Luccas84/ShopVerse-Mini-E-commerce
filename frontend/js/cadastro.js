// Função para abrir modal de cadastro
function abrirModalCadastro() {
  const modal = document.getElementById('modalCadastro');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// Função para fechar modal de cadastro
function fecharModalCadastro() {
  const modal = document.getElementById('modalCadastro');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Função para fazer cadastro
async function fazerCadastro(event) {
  if (event) {
    event.preventDefault();
  }

  const nome = document.getElementById('cadastroNome').value;
  const email = document.getElementById('cadastroEmail').value;
  const senha = document.getElementById('cadastroSenha').value;
  const confirmarSenha = document.getElementById('cadastroConfirmarSenha').value;
  const erroElement = document.getElementById('cadastroErro');

  if (!nome || !email || !senha || !confirmarSenha) {
    mostrarErro(erroElement, 'Por favor, preencha todos os campos');
    return;
  }

  if (senha !== confirmarSenha) {
    mostrarErro(erroElement, 'As senhas não coincidem');
    return;
  }

  if (senha.length < 6) {
    mostrarErro(erroElement, 'A senha deve ter no mínimo 6 caracteres');
    return;
  }

  try {
    const resposta = await api.auth.cadastro({ nome, email, senha });
    
    mostrarToast('Cadastro realizado com sucesso! Faça login para continuar.', 'sucesso');
    
    fecharModalCadastro();
    
    // Abrir modal de login após cadastro
    setTimeout(() => {
      abrirModalLogin();
      // Preencher email no login
      const loginEmail = document.getElementById('loginEmail');
      if (loginEmail) {
        loginEmail.value = email;
      }
    }, 500);
  } catch (error) {
    mostrarErro(erroElement, error.message || 'Erro ao realizar cadastro');
  }
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Event listeners
    const formCadastro = document.getElementById('formCadastro');
    if (formCadastro) {
      formCadastro.addEventListener('submit', fazerCadastro);
    }
    
    const btnFecharCadastro = document.getElementById('fecharCadastro');
    if (btnFecharCadastro) {
      btnFecharCadastro.addEventListener('click', fecharModalCadastro);
    }
    
    // Fechar modal ao clicar fora
    const modal = document.getElementById('modalCadastro');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          fecharModalCadastro();
        }
      });
    }
  });
}

// Exportar funções
window.abrirModalCadastro = abrirModalCadastro;
window.fazerCadastro = fazerCadastro;



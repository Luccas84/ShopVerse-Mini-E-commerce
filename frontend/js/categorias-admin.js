let categoriaEditando = null;

// Verificar admin
async function verificarAdmin() {
  try {
    const { usuario } = verificarAutenticacao();
    
    if (!usuario || !usuario.admin) {
      mostrarToast('Acesso restrito a administradores', 'erro');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
      return false;
    }
    
    return true;
  } catch (error) {
    window.location.href = 'index.html';
    return false;
  }
}

// Carregar categorias
async function carregarCategorias() {
  try {
    const categorias = await api.categorias.listar();
    const tabela = document.getElementById('categoriasTable');
    
    if (!tabela) return;
    
    if (categorias.length === 0) {
      tabela.innerHTML = '<tr><td colspan="4" class="empty-state">Nenhuma categoria cadastrada</td></tr>';
      return;
    }
    
    tabela.innerHTML = categorias.map(categoria => `
      <tr>
        <td>${categoria.id}</td>
        <td><strong>${categoria.nome}</strong></td>
        <td>${categoria._count?.produtos || 0}</td>
        <td class="acoes-tabela">
          <button class="btn-icon editar" onclick="editarCategoria(${categoria.id})" title="Editar">
            <i class='bx bx-edit'></i>
          </button>
          <button class="btn-icon excluir" onclick="deletarCategoria(${categoria.id})" title="Excluir">
            <i class='bx bx-trash'></i>
          </button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
    mostrarToast('Erro ao carregar categorias', 'erro');
  }
}

// Abrir modal de categoria
function abrirModalCategoria() {
  categoriaEditando = null;
  document.getElementById('modalCategoriaTitulo').textContent = 'Nova Categoria';
  document.getElementById('formCategoria').reset();
  document.getElementById('categoriaId').value = '';
  
  const modal = document.getElementById('modalCategoria');
  if (modal) {
    modal.classList.add('active');
  }
}

// Fechar modal de categoria
function fecharModalCategoria() {
  const modal = document.getElementById('modalCategoria');
  if (modal) {
    modal.classList.remove('active');
  }
  categoriaEditando = null;
}

// Editar categoria
async function editarCategoria(id) {
  try {
    const categoria = await api.categorias.buscarPorId(id);
    categoriaEditando = categoria;
    
    document.getElementById('modalCategoriaTitulo').textContent = 'Editar Categoria';
    document.getElementById('categoriaId').value = categoria.id;
    document.getElementById('categoriaNome').value = categoria.nome;
    
    const modal = document.getElementById('modalCategoria');
    if (modal) {
      modal.classList.add('active');
    }
  } catch (error) {
    console.error('Erro ao carregar categoria:', error);
    mostrarToast('Erro ao carregar categoria', 'erro');
  }
}

// Salvar categoria
async function salvarCategoria(event) {
  if (event) {
    event.preventDefault();
  }
  
  const dados = {
    nome: document.getElementById('categoriaNome').value
  };
  
  const erroEl = document.getElementById('categoriaErro');
  
  try {
    if (categoriaEditando) {
      await api.categorias.atualizar(categoriaEditando.id, dados);
      mostrarToast('Categoria atualizada com sucesso!', 'sucesso');
    } else {
      await api.categorias.criar(dados);
      mostrarToast('Categoria criada com sucesso!', 'sucesso');
    }
    
    fecharModalCategoria();
    await carregarCategorias();
  } catch (error) {
    mostrarErro(erroEl, error.message || 'Erro ao salvar categoria');
  }
}

// Deletar categoria
async function deletarCategoria(id) {
  if (!confirm('Tem certeza que deseja deletar esta categoria? Produtos associados não serão deletados.')) {
    return;
  }
  
  try {
    await api.categorias.deletar(id);
    mostrarToast('Categoria deletada com sucesso!', 'sucesso');
    await carregarCategorias();
  } catch (error) {
    mostrarToast(error.message || 'Erro ao deletar categoria', 'erro');
  }
}

// Inicializar
async function inicializar() {
  const isAdmin = await verificarAdmin();
  if (!isAdmin) return;
  
  await carregarCategorias();
  
  // Event listeners
  const formCategoria = document.getElementById('formCategoria');
  if (formCategoria) {
    formCategoria.addEventListener('submit', salvarCategoria);
  }
  
  const modal = document.getElementById('modalCategoria');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        fecharModalCategoria();
      }
    });
  }
}

// Exportar funções
window.abrirModalCategoria = abrirModalCategoria;
window.fecharModalCategoria = fecharModalCategoria;
window.editarCategoria = editarCategoria;
window.deletarCategoria = deletarCategoria;

// Executar quando página carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializar);
} else {
  inicializar();
}



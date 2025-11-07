let produtoEditando = null;

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

// Carregar categorias no select
async function carregarCategoriasSelect() {
  try {
    const categorias = await api.categorias.listar();
    const select = document.getElementById('produtoCategoria');
    
    if (select) {
      select.innerHTML = '<option value="">Selecione...</option>' + 
        categorias.map(cat => `<option value="${cat.id}">${cat.nome}</option>`).join('');
    }
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
  }
}

// Carregar produtos
async function carregarProdutos() {
  try {
    const produtos = await api.produtos.listar();
    const tabela = document.getElementById('produtosTable');
    
    if (!tabela) return;
    
    if (produtos.length === 0) {
      tabela.innerHTML = '<tr><td colspan="6" class="empty-state">Nenhum produto cadastrado</td></tr>';
      return;
    }
    
    tabela.innerHTML = produtos.map(produto => `
      <tr>
        <td><img src="${produto.imagem}" alt="${produto.nome}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px;"></td>
        <td><strong>${produto.nome}</strong></td>
        <td>${produto.categoria.nome}</td>
        <td>${formatarPreco(produto.preco)}</td>
        <td>${produto.estoque || 0}</td>
        <td class="acoes-tabela">
          <button class="btn-icon editar" onclick="editarProduto(${produto.id})" title="Editar">
            <i class='bx bx-edit'></i>
          </button>
          <button class="btn-icon excluir" onclick="deletarProduto(${produto.id})" title="Excluir">
            <i class='bx bx-trash'></i>
          </button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    mostrarToast('Erro ao carregar produtos', 'erro');
  }
}

// Abrir modal de produto
function abrirModalProduto() {
  produtoEditando = null;
  document.getElementById('modalProdutoTitulo').textContent = 'Novo Produto';
  document.getElementById('formProduto').reset();
  document.getElementById('produtoId').value = '';
  
  const modal = document.getElementById('modalProduto');
  if (modal) {
    modal.classList.add('active');
  }
}

// Fechar modal de produto
function fecharModalProduto() {
  const modal = document.getElementById('modalProduto');
  if (modal) {
    modal.classList.remove('active');
  }
  produtoEditando = null;
}

// Editar produto
async function editarProduto(id) {
  try {
    const produto = await api.produtos.buscarPorId(id);
    produtoEditando = produto;
    
    document.getElementById('modalProdutoTitulo').textContent = 'Editar Produto';
    document.getElementById('produtoId').value = produto.id;
    document.getElementById('produtoNome').value = produto.nome;
    document.getElementById('produtoDescricao').value = produto.descricao;
    document.getElementById('produtoPreco').value = produto.preco;
    document.getElementById('produtoImagem').value = produto.imagem;
    document.getElementById('produtoCategoria').value = produto.categoriaId;
    document.getElementById('produtoEstoque').value = produto.estoque || 0;
    
    const modal = document.getElementById('modalProduto');
    if (modal) {
      modal.classList.add('active');
    }
  } catch (error) {
    console.error('Erro ao carregar produto:', error);
    mostrarToast('Erro ao carregar produto', 'erro');
  }
}

// Salvar produto
async function salvarProduto(event) {
  if (event) {
    event.preventDefault();
  }
  
  const dados = {
    nome: document.getElementById('produtoNome').value,
    descricao: document.getElementById('produtoDescricao').value,
    preco: parseFloat(document.getElementById('produtoPreco').value),
    imagem: document.getElementById('produtoImagem').value,
    categoriaId: parseInt(document.getElementById('produtoCategoria').value),
    estoque: parseInt(document.getElementById('produtoEstoque').value) || 0
  };
  
  const erroEl = document.getElementById('produtoErro');
  
  try {
    if (produtoEditando) {
      await api.produtos.atualizar(produtoEditando.id, dados);
      mostrarToast('Produto atualizado com sucesso!', 'sucesso');
    } else {
      await api.produtos.criar(dados);
      mostrarToast('Produto criado com sucesso!', 'sucesso');
    }
    
    fecharModalProduto();
    await carregarProdutos();
  } catch (error) {
    mostrarErro(erroEl, error.message || 'Erro ao salvar produto');
  }
}

// Deletar produto
async function deletarProduto(id) {
  if (!confirm('Tem certeza que deseja deletar este produto?')) {
    return;
  }
  
  try {
    await api.produtos.deletar(id);
    mostrarToast('Produto deletado com sucesso!', 'sucesso');
    await carregarProdutos();
  } catch (error) {
    mostrarToast(error.message || 'Erro ao deletar produto', 'erro');
  }
}

// Inicializar
async function inicializar() {
  const isAdmin = await verificarAdmin();
  if (!isAdmin) return;
  
  await carregarCategoriasSelect();
  await carregarProdutos();
  
  // Event listeners
  const formProduto = document.getElementById('formProduto');
  if (formProduto) {
    formProduto.addEventListener('submit', salvarProduto);
  }
  
  const modal = document.getElementById('modalProduto');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        fecharModalProduto();
      }
    });
  }
}

// Exportar funções
window.abrirModalProduto = abrirModalProduto;
window.fecharModalProduto = fecharModalProduto;
window.editarProduto = editarProduto;
window.deletarProduto = deletarProduto;

// Executar quando página carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializar);
} else {
  inicializar();
}



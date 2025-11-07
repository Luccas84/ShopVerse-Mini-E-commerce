let produtosCarregados = [];
let categoriasCarregadas = [];

// Carregar categorias
async function carregarCategorias() {
  try {
    const categorias = await api.categorias.listar();
    categoriasCarregadas = categorias;
    
    const select = document.getElementById('filtroCategoria');
    if (select) {
      select.innerHTML = '<option value="">Todas</option>' + 
        categorias.map(cat => `<option value="${cat.id}">${cat.nome}</option>`).join('');
    }
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
  }
}

// Carregar produtos
async function carregarProdutos() {
  const loading = document.getElementById('loading');
  const grid = document.getElementById('produtosGrid');
  const semResultados = document.getElementById('semResultados');
  
  try {
    // Obter parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaId = urlParams.get('categoria') || document.getElementById('filtroCategoria')?.value || '';
    const busca = urlParams.get('busca') || '';
    
    // Aplicar busca no campo se vier da URL
    if (busca && document.getElementById('buscaHeader')) {
      document.getElementById('buscaHeader').value = busca;
    }
    
    const params = {};
    if (categoriaId) params.categoria = categoriaId;
    if (busca) params.busca = busca;
    
    produtosCarregados = await api.produtos.listar(params);
    
    if (loading) loading.style.display = 'none';
    if (grid) grid.style.display = 'grid';
    if (semResultados) semResultados.style.display = 'none';
    
    if (produtosCarregados.length === 0) {
      if (grid) grid.style.display = 'none';
      if (semResultados) semResultados.style.display = 'block';
      return;
    }
    
    // Aplicar ordenação
    aplicarOrdenacao();
    
    // Renderizar produtos
    renderizarProdutos(produtosCarregados);
    
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    if (loading) loading.style.display = 'none';
    if (grid) grid.style.display = 'none';
    if (semResultados) {
      semResultados.innerHTML = '<p style="font-size: 1.2rem; color: var(--cor-erro);">Erro ao carregar produtos. Tente novamente.</p>';
      semResultados.style.display = 'block';
    }
  }
}

// Aplicar ordenação
function aplicarOrdenacao() {
  const ordenacao = document.getElementById('ordenacao')?.value || 'recente';
  
  switch (ordenacao) {
    case 'preco-asc':
      produtosCarregados.sort((a, b) => a.preco - b.preco);
      break;
    case 'preco-desc':
      produtosCarregados.sort((a, b) => b.preco - a.preco);
      break;
    case 'nome':
      produtosCarregados.sort((a, b) => a.nome.localeCompare(b.nome));
      break;
    case 'recente':
    default:
      produtosCarregados.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
  }
}

// Renderizar produtos
function renderizarProdutos(produtos) {
  const grid = document.getElementById('produtosGrid');
  if (!grid) return;
  
  grid.innerHTML = produtos.map(produto => `
    <div class="produto-card" onclick="window.location.href='produto.html?id=${produto.id}'">
      <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem">
      <div class="produto-info">
        <div class="produto-categoria">${produto.categoria.nome}</div>
        <h3 class="produto-nome">${produto.nome}</h3>
        <div class="produto-preco">${formatarPreco(produto.preco)}</div>
        ${produto.mediaAvaliacoes > 0 ? `
          <div class="produto-avaliacao">
            ${obterEstrelasHTML(produto.mediaAvaliacoes)}
            <span>(${produto.totalAvaliacoes})</span>
          </div>
        ` : ''}
        <button class="btn-adicionar-carrinho" onclick="event.stopPropagation(); adicionarAoCarrinho(${produto.id})">
          <i class='bx bx-cart'></i> Adicionar ao Carrinho
        </button>
      </div>
    </div>
  `).join('');
}

// Inicializar página
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    inicializarProdutos();
  });
} else {
  inicializarProdutos();
}

function inicializarProdutos() {
  carregarCategorias();
  carregarProdutos();
  
  // Event listeners
  const filtroCategoria = document.getElementById('filtroCategoria');
  if (filtroCategoria) {
    filtroCategoria.addEventListener('change', carregarProdutos);
  }
  
  const ordenacao = document.getElementById('ordenacao');
  if (ordenacao) {
    ordenacao.addEventListener('change', () => {
      aplicarOrdenacao();
      renderizarProdutos(produtosCarregados);
    });
  }
  
  const buscaHeader = document.getElementById('buscaHeader');
  if (buscaHeader) {
    const buscaDebounced = debounce(() => {
      const termo = buscaHeader.value;
      if (termo) {
        window.location.href = `produtos.html?busca=${encodeURIComponent(termo)}`;
      } else {
        window.location.href = 'produtos.html';
      }
    }, 500);
    
    buscaHeader.addEventListener('input', buscaDebounced);
  }
}



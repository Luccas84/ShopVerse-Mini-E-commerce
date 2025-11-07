// Função para obter carrinho do localStorage
function obterCarrinho() {
  const carrinho = localStorage.getItem('carrinho');
  return carrinho ? JSON.parse(carrinho) : [];
}

// Função para salvar carrinho no localStorage
function salvarCarrinho(carrinho) {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarCarrinhoBadge();
}

// Função para adicionar produto ao carrinho
async function adicionarAoCarrinho(produtoId, quantidade = 1) {
  try {
    const produto = await api.produtos.buscarPorId(produtoId);
    const carrinho = obterCarrinho();
    
    // Verificar se produto já está no carrinho
    const itemIndex = carrinho.findIndex(item => item.produtoId === produtoId);
    
    if (itemIndex >= 0) {
      // Atualizar quantidade
      carrinho[itemIndex].quantidade += quantidade;
    } else {
      // Adicionar novo item
      carrinho.push({
        produtoId: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        imagem: produto.imagem,
        quantidade: quantidade
      });
    }
    
    salvarCarrinho(carrinho);
    mostrarToast('Produto adicionado ao carrinho!', 'sucesso');
    
    // Disparar evento personalizado
    window.dispatchEvent(new CustomEvent('carrinhoAtualizado'));
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
    mostrarToast('Erro ao adicionar produto ao carrinho', 'erro');
  }
}

// Função para remover produto do carrinho
function removerDoCarrinho(produtoId) {
  const carrinho = obterCarrinho();
  const novoCarrinho = carrinho.filter(item => item.produtoId !== produtoId);
  salvarCarrinho(novoCarrinho);
  mostrarToast('Produto removido do carrinho', 'info');
  
  // Disparar evento
  window.dispatchEvent(new CustomEvent('carrinhoAtualizado'));
  
  // Recarregar página do carrinho se estiver nela
  if (window.location.pathname.includes('carrinho.html')) {
    setTimeout(() => window.location.reload(), 500);
  }
}

// Função para atualizar quantidade no carrinho
function atualizarQuantidadeCarrinho(produtoId, novaQuantidade) {
  if (novaQuantidade <= 0) {
    removerDoCarrinho(produtoId);
    return;
  }
  
  const carrinho = obterCarrinho();
  const itemIndex = carrinho.findIndex(item => item.produtoId === produtoId);
  
  if (itemIndex >= 0) {
    carrinho[itemIndex].quantidade = novaQuantidade;
    salvarCarrinho(carrinho);
    
    // Disparar evento
    window.dispatchEvent(new CustomEvent('carrinhoAtualizado'));
    
    // Recarregar página do carrinho se estiver nela
    if (window.location.pathname.includes('carrinho.html')) {
      setTimeout(() => window.location.reload(), 500);
    }
  }
}

// Função para atualizar badge do carrinho
function atualizarCarrinhoBadge() {
  const carrinho = obterCarrinho();
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  
  const badge = document.getElementById('carrinhoBadge');
  if (badge) {
    badge.textContent = totalItens;
    badge.style.display = totalItens > 0 ? 'flex' : 'none';
  }
}

// Função para calcular total do carrinho
function calcularTotalCarrinho() {
  const carrinho = obterCarrinho();
  return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

// Função para limpar carrinho
function limparCarrinho() {
  salvarCarrinho([]);
  mostrarToast('Carrinho limpo', 'info');
}

// Exportar funções
window.adicionarAoCarrinho = adicionarAoCarrinho;
window.removerDoCarrinho = removerDoCarrinho;
window.atualizarQuantidadeCarrinho = atualizarQuantidadeCarrinho;
window.atualizarCarrinhoBadge = atualizarCarrinhoBadge;
window.calcularTotalCarrinho = calcularTotalCarrinho;
window.obterCarrinho = obterCarrinho;

// Atualizar badge quando página carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', atualizarCarrinhoBadge);
} else {
  atualizarCarrinhoBadge();
}

// Atualizar badge quando carrinho mudar
window.addEventListener('carrinhoAtualizado', atualizarCarrinhoBadge);



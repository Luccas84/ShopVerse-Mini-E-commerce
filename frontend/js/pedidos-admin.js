// Gerenciamento de Pedidos - Admin
let pedidoAtualId = null;
let todosPedidos = [];
let pedidosFiltrados = [];

// Verificar se é admin
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

// Carregar estatísticas de pedidos
async function carregarEstatisticasPedidos() {
  try {
    const pedidos = await api.pedidos.listar();
    
    const stats = {
      total: pedidos.length,
      pendente: pedidos.filter(p => p.status === 'pendente').length,
      processando: pedidos.filter(p => p.status === 'processando').length,
      enviado: pedidos.filter(p => p.status === 'enviado').length,
      entregue: pedidos.filter(p => p.status === 'entregue').length,
      cancelado: pedidos.filter(p => p.status === 'cancelado').length,
      totalReceita: pedidos
        .filter(p => p.status !== 'cancelado')
        .reduce((sum, p) => sum + p.total, 0)
    };
    
    const statsGrid = document.getElementById('statsPedidos');
    if (statsGrid) {
      statsGrid.innerHTML = `
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-valor">${stats.total}</div>
              <div class="stat-card-label">Total de Pedidos</div>
            </div>
            <div class="stat-card-icon azul">
              <i class='bx bxs-cart'></i>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-valor">${stats.pendente}</div>
              <div class="stat-card-label">Pendentes</div>
            </div>
            <div class="stat-card-icon laranja">
              <i class='bx bx-time'></i>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-valor">${stats.entregue}</div>
              <div class="stat-card-label">Entregues</div>
            </div>
            <div class="stat-card-icon verde">
              <i class='bx bx-check-circle'></i>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-valor">${formatarPreco(stats.totalReceita)}</div>
              <div class="stat-card-label">Receita Total</div>
            </div>
            <div class="stat-card-icon roxo">
              <i class='bx bxs-dollar-circle'></i>
            </div>
          </div>
        </div>
      `;
    }
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error);
  }
}

// Carregar pedidos
async function carregarPedidos() {
  try {
    todosPedidos = await api.pedidos.listar();
    aplicarFiltros();
  } catch (error) {
    console.error('Erro ao carregar pedidos:', error);
    mostrarToast('Erro ao carregar pedidos', 'erro');
  }
}

// Aplicar filtros
function aplicarFiltros() {
  const statusFiltro = document.getElementById('filtroStatus').value;
  const dataFiltro = document.getElementById('filtroData').value;
  
  pedidosFiltrados = [...todosPedidos];
  
  // Filtrar por status
  if (statusFiltro) {
    pedidosFiltrados = pedidosFiltrados.filter(p => p.status === statusFiltro);
  }
  
  // Filtrar por data
  if (dataFiltro !== 'todos') {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    pedidosFiltrados = pedidosFiltrados.filter(p => {
      const dataPedido = new Date(p.createdAt);
      dataPedido.setHours(0, 0, 0, 0);
      
      if (dataFiltro === 'hoje') {
        return dataPedido.getTime() === hoje.getTime();
      } else if (dataFiltro === 'semana') {
        const semanaAtras = new Date(hoje);
        semanaAtras.setDate(semanaAtras.getDate() - 7);
        return dataPedido >= semanaAtras;
      } else if (dataFiltro === 'mes') {
        const mesAtras = new Date(hoje);
        mesAtras.setMonth(mesAtras.getMonth() - 1);
        return dataPedido >= mesAtras;
      }
      return true;
    });
  }
  
  exibirPedidos();
}

// Limpar filtros
function limparFiltros() {
  document.getElementById('filtroStatus').value = '';
  document.getElementById('filtroData').value = 'todos';
  aplicarFiltros();
}

// Exibir pedidos na tabela
function exibirPedidos() {
  const tabela = document.getElementById('pedidosTable');
  
  if (!tabela) return;
  
  if (pedidosFiltrados.length === 0) {
    tabela.innerHTML = `
      <tr>
        <td colspan="7" class="empty-state">
          <i class='bx bx-package'></i>
          <p>Nenhum pedido encontrado</p>
        </td>
      </tr>
    `;
    return;
  }
  
  // Ordenar por data (mais recentes primeiro)
  const pedidosOrdenados = [...pedidosFiltrados].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
  
  tabela.innerHTML = pedidosOrdenados.map(pedido => {
    const totalItens = pedido.itens.reduce((sum, item) => sum + item.quantidade, 0);
    const produtosLista = pedido.itens.slice(0, 2).map(item => item.produto.nome).join(', ');
    const maisItens = pedido.itens.length > 2 ? ` +${pedido.itens.length - 2} mais` : '';
    
    return `
      <tr>
        <td><strong>#${pedido.id}</strong></td>
        <td>${pedido.usuario.nome}</td>
        <td>
          <div style="max-width: 300px;">
            <div>${produtosLista}${maisItens}</div>
            <small style="color: #999;">${totalItens} ${totalItens === 1 ? 'item' : 'itens'}</small>
          </div>
        </td>
        <td><strong>${formatarPreco(pedido.total)}</strong></td>
        <td><span class="status-badge status-${pedido.status}">${pedido.status}</span></td>
        <td>${formatarData(pedido.createdAt)}</td>
        <td class="acoes-tabela">
          <button class="btn-icon editar" onclick="verDetalhesPedido(${pedido.id})" title="Ver Detalhes">
            <i class='bx bx-show'></i>
          </button>
          <button class="btn-icon editar" onclick="abrirModalStatus(${pedido.id}, '${pedido.status}')" title="Alterar Status">
            <i class='bx bx-edit'></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Ver detalhes do pedido
async function verDetalhesPedido(pedidoId) {
  try {
    const pedido = await api.pedidos.buscarPorId(pedidoId);
    
    document.getElementById('pedidoIdModal').textContent = pedido.id;
    
    const detalhes = document.getElementById('pedidoDetalhes');
    detalhes.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h3 style="color: var(--cor-primaria); margin-bottom: 1rem;">Informações do Cliente</h3>
        <p><strong>Nome:</strong> ${pedido.usuario.nome}</p>
        <p><strong>Email:</strong> ${pedido.usuario.email}</p>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h3 style="color: var(--cor-primaria); margin-bottom: 1rem;">Itens do Pedido</h3>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço Unitário</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${pedido.itens.map(item => `
                <tr>
                  <td>${item.produto.nome}</td>
                  <td>${item.quantidade}</td>
                  <td>${formatarPreco(item.preco)}</td>
                  <td><strong>${formatarPreco(item.preco * item.quantidade)}</strong></td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr style="border-top: 2px solid var(--cor-borda); font-weight: bold;">
                <td colspan="3" style="text-align: right;">Total:</td>
                <td>${formatarPreco(pedido.total)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      
      <div>
        <h3 style="color: var(--cor-primaria); margin-bottom: 1rem;">Status e Datas</h3>
        <p><strong>Status:</strong> <span class="status-badge status-${pedido.status}">${pedido.status}</span></p>
        <p><strong>Data do Pedido:</strong> ${formatarData(pedido.createdAt)}</p>
        <p><strong>Última Atualização:</strong> ${formatarData(pedido.updatedAt)}</p>
      </div>
    `;
    
    const modal = document.getElementById('modalPedido');
    if (modal) {
      modal.classList.add('active');
    }
  } catch (error) {
    console.error('Erro ao carregar detalhes do pedido:', error);
    mostrarToast('Erro ao carregar detalhes do pedido', 'erro');
  }
}

// Fechar modal de detalhes
function fecharModalPedido() {
  const modal = document.getElementById('modalPedido');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Abrir modal de status
function abrirModalStatus(pedidoId, statusAtual) {
  pedidoAtualId = pedidoId;
  const select = document.getElementById('selectStatus');
  if (select) {
    select.value = statusAtual;
  }
  
  const modal = document.getElementById('modalStatus');
  if (modal) {
    modal.classList.add('active');
  }
}

// Fechar modal de status
function fecharModalStatus() {
  const modal = document.getElementById('modalStatus');
  if (modal) {
    modal.classList.remove('active');
  }
  pedidoAtualId = null;
}

// Atualizar status do pedido
async function atualizarStatusPedido(event) {
  if (event) {
    event.preventDefault();
  }
  
  if (!pedidoAtualId) return;
  
  const status = document.getElementById('selectStatus').value;
  
  try {
    await api.pedidos.atualizarStatus(pedidoAtualId, status);
    mostrarToast('Status atualizado com sucesso!', 'sucesso');
    fecharModalStatus();
    await carregarPedidos();
    await carregarEstatisticasPedidos();
    
    // Atualizar badge do admin menu
    if (typeof atualizarBadgeAdmin === 'function') {
      atualizarBadgeAdmin();
    }
  } catch (error) {
    mostrarToast(error.message || 'Erro ao atualizar status', 'erro');
  }
}

// Inicializar página
async function inicializar() {
  const isAdmin = await verificarAdmin();
  if (!isAdmin) return;
  
  await carregarPedidos();
  await carregarEstatisticasPedidos();
  
  // Event listeners
  const formStatus = document.getElementById('formStatus');
  if (formStatus) {
    formStatus.addEventListener('submit', atualizarStatusPedido);
  }
  
  const modalStatus = document.getElementById('modalStatus');
  if (modalStatus) {
    modalStatus.addEventListener('click', (e) => {
      if (e.target === modalStatus) {
        fecharModalStatus();
      }
    });
  }
  
  const modalPedido = document.getElementById('modalPedido');
  if (modalPedido) {
    modalPedido.addEventListener('click', (e) => {
      if (e.target === modalPedido) {
        fecharModalPedido();
      }
    });
  }
}

// Exportar funções
window.aplicarFiltros = aplicarFiltros;
window.limparFiltros = limparFiltros;
window.verDetalhesPedido = verDetalhesPedido;
window.fecharModalPedido = fecharModalPedido;
window.abrirModalStatus = abrirModalStatus;
window.fecharModalStatus = fecharModalStatus;

// Executar quando página carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializar);
} else {
  inicializar();
}



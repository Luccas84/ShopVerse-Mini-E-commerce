let pedidoAtualId = null;
let graficoVendas = null;

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

// Carregar estatísticas
async function carregarEstatisticas() {
  try {
    const stats = await api.dashboard.estatisticas();
    
    const statsGrid = document.getElementById('statsGrid');
    if (statsGrid) {
      statsGrid.innerHTML = `
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-valor">${stats.totalProdutos}</div>
              <div class="stat-card-label">Produtos</div>
            </div>
            <div class="stat-card-icon azul">
              <i class='bx bxs-package'></i>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-valor">${stats.totalPedidos}</div>
              <div class="stat-card-label">Pedidos</div>
            </div>
            <div class="stat-card-icon verde">
              <i class='bx bxs-cart'></i>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-valor">${formatarPreco(stats.receitaTotal)}</div>
              <div class="stat-card-label">Receita Total</div>
            </div>
            <div class="stat-card-icon laranja">
              <i class='bx bxs-dollar-circle'></i>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-valor">${stats.totalUsuarios}</div>
              <div class="stat-card-label">Usuários</div>
            </div>
            <div class="stat-card-icon roxo">
              <i class='bx bxs-user'></i>
            </div>
          </div>
        </div>
      `;
    }
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error);
  }
}

// Carregar gráfico de vendas
async function carregarGraficoVendas() {
  try {
    const vendas = await api.dashboard.vendas('7');
    
    const ctx = document.getElementById('graficoVendas');
    if (!ctx) return;
    
    if (graficoVendas) {
      graficoVendas.destroy();
    }
    
    graficoVendas = new Chart(ctx, {
      type: 'line',
      data: {
        labels: vendas.map(v => new Date(v.data).toLocaleDateString('pt-BR')),
        datasets: [{
          label: 'Vendas (R$)',
          data: vendas.map(v => v.valor),
          borderColor: '#f26b38',
          backgroundColor: 'rgba(242, 107, 56, 0.15)',
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: '#f26b38',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(26, 31, 54, 0.9)',
            titleFont: {
              family: 'Poppins',
              size: 14,
              weight: '600'
            },
            bodyFont: {
              family: 'Poppins',
              size: 13
            },
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return 'Vendas: ' + formatarPreco(context.parsed.y);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              font: {
                family: 'Poppins',
                size: 12
              },
              callback: function(value) {
                return formatarPreco(value);
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                family: 'Poppins',
                size: 12
              }
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Erro ao carregar gráfico:', error);
  }
}

// Carregar categorias
async function carregarCategorias() {
  try {
    const categorias = await api.categorias.listar();
    const container = document.getElementById('categoriasContainer');
    
    if (!container) return;
    
    if (categorias.length === 0) {
      container.innerHTML = '<div class="empty-state"><i class="bx bx-package"></i><p>Nenhuma categoria cadastrada ainda</p></div>';
      return;
    }
    
    // Criar cards visuais para cada categoria
    container.innerHTML = `
      <div class="categorias-grid">
        ${categorias.map(categoria => `
          <div class="categoria-card">
            <div class="categoria-icon">
              <i class='bx bxs-category'></i>
            </div>
            <div class="categoria-info">
              <h3 class="categoria-nome">${categoria.nome}</h3>
              <p class="categoria-produtos">
                <i class='bx bx-package'></i>
                ${categoria._count?.produtos || 0} ${categoria._count?.produtos === 1 ? 'produto' : 'produtos'}
              </p>
            </div>
            <div class="categoria-action">
              <a href="produtos.html?categoria=${categoria.id}" class="btn-link" title="Ver produtos">
                <i class='bx bx-right-arrow-alt'></i>
              </a>
            </div>
          </div>
        `).join('')}
      </div>
      <div style="margin-top: 1.5rem; text-align: center;">
        <a href="categorias-admin.html" class="btn btn-primario">
          <i class='bx bx-cog'></i> Gerenciar Categorias
        </a>
      </div>
    `;
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
    const container = document.getElementById('categoriasContainer');
    if (container) {
      container.innerHTML = '<div class="empty-state"><p>Erro ao carregar categorias</p></div>';
    }
  }
}

// Carregar produtos populares
async function carregarProdutosPopulares() {
  try {
    const produtos = await api.dashboard.produtosPopulares();
    const tabela = document.getElementById('produtosPopularesTable');
    
    if (!tabela) return;
    
    if (produtos.length === 0) {
      tabela.innerHTML = '<tr><td colspan="4" class="empty-state">Nenhum produto vendido ainda</td></tr>';
      return;
    }
    
    tabela.innerHTML = produtos.map(item => `
      <tr>
        <td>${item.produto.nome}</td>
        <td>${item.produto.categoria.nome}</td>
        <td>${item.quantidadeVendida}</td>
        <td>${item.vezesPedido}</td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Erro ao carregar produtos populares:', error);
  }
}

// Carregar pedidos recentes
async function carregarPedidos() {
  try {
    const pedidos = await api.pedidos.listar();
    const tabela = document.getElementById('pedidosTable');
    
    if (!tabela) return;
    
    if (pedidos.length === 0) {
      tabela.innerHTML = '<tr><td colspan="6" class="empty-state">Nenhum pedido encontrado</td></tr>';
      return;
    }
    
    // Mostrar apenas os 10 mais recentes
    const pedidosRecentes = pedidos.slice(0, 10);
    
    tabela.innerHTML = pedidosRecentes.map(pedido => `
      <tr>
        <td>#${pedido.id}</td>
        <td>${pedido.usuario.nome}</td>
        <td>${formatarPreco(pedido.total)}</td>
        <td><span class="status-badge status-${pedido.status}">${pedido.status}</span></td>
        <td>${formatarData(pedido.createdAt)}</td>
        <td class="acoes-tabela">
          <button class="btn-icon editar" onclick="abrirModalStatus(${pedido.id}, '${pedido.status}')" title="Alterar Status">
            <i class='bx bx-edit'></i>
          </button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Erro ao carregar pedidos:', error);
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
    carregarPedidos();
  } catch (error) {
    mostrarToast(error.message || 'Erro ao atualizar status', 'erro');
  }
}

// Inicializar dashboard
async function inicializarDashboard() {
  const isAdmin = await verificarAdmin();
  if (!isAdmin) return;
  
  await carregarEstatisticas();
  await carregarGraficoVendas();
  await carregarCategorias();
  await carregarProdutosPopulares();
  await carregarPedidos();
  
  // Event listeners
  const formStatus = document.getElementById('formStatus');
  if (formStatus) {
    formStatus.addEventListener('submit', atualizarStatusPedido);
  }
  
  const modal = document.getElementById('modalStatus');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        fecharModalStatus();
      }
    });
  }
}

// Exportar funções
window.abrirModalStatus = abrirModalStatus;
window.fecharModalStatus = fecharModalStatus;

// Executar quando página carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarDashboard);
} else {
  inicializarDashboard();
}


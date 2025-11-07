// Menu Dropdown de Categorias
let categoriasMenuAberto = false;
let categorias = [];

// Carregar categorias para o menu
async function carregarCategoriasMenu() {
  try {
    categorias = await api.categorias.listar();
    atualizarMenuCategorias();
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
  }
}

// Atualizar menu de categorias
function atualizarMenuCategorias() {
  const menu = document.getElementById('categoriasDropdownMenu');
  
  if (!menu) return;
  
  if (categorias.length === 0) {
    menu.innerHTML = '<div class="categorias-dropdown-item" style="padding: 1rem; text-align: center; color: #999;">Nenhuma categoria cadastrada</div>';
    return;
  }
  
  menu.innerHTML = categorias.map(categoria => `
    <a href="produtos.html?categoria=${categoria.id}" class="categorias-dropdown-item">
      <i class='bx bx-category'></i>
      ${categoria.nome}
    </a>
  `).join('');
}

// Toggle menu categorias
function toggleCategoriasMenu() {
  const menu = document.getElementById('categoriasDropdownMenu');
  
  if (!menu) return;
  
  categoriasMenuAberto = !categoriasMenuAberto;
  
  if (categoriasMenuAberto) {
    menu.classList.add('active');
  } else {
    menu.classList.remove('active');
  }
}

// Fechar menu ao clicar fora
function fecharCategoriasMenuAoClicarFora(event) {
  const btn = document.getElementById('categoriasDropdownBtn');
  const menu = document.getElementById('categoriasDropdownMenu');
  
  if (!btn || !menu) return;
  
  if (!btn.contains(event.target) && !menu.contains(event.target)) {
    menu.classList.remove('active');
    categoriasMenuAberto = false;
  }
}

// Inicializar menu de categorias
function inicializarCategoriasMenu() {
  carregarCategoriasMenu();
  
  const btn = document.getElementById('categoriasDropdownBtn');
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCategoriasMenu();
    });
  }
  
  // Fechar ao clicar fora
  document.addEventListener('click', fecharCategoriasMenuAoClicarFora);
}

// Exportar funções
window.inicializarCategoriasMenu = inicializarCategoriasMenu;
window.carregarCategoriasMenu = carregarCategoriasMenu;



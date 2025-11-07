const API_URL = 'http://localhost:3000/api';

// Função auxiliar para fazer requisições
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.erro || 'Erro na requisição');
    }

    return data;
  } catch (error) {
    console.error('Erro na API:', error);
    throw error;
  }
}

// API de Autenticação
const authAPI = {
  cadastro: (dados) => apiRequest('/auth/cadastro', {
    method: 'POST',
    body: JSON.stringify(dados)
  }),
  
  login: (dados) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(dados)
  }),
  
  verificar: () => apiRequest('/auth/verificar')
};

// API de Produtos
const produtosAPI = {
  listar: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/produtos${query ? `?${query}` : ''}`);
  },
  
  buscarPorId: (id) => apiRequest(`/produtos/${id}`),
  
  criar: (dados) => apiRequest('/produtos', {
    method: 'POST',
    body: JSON.stringify(dados)
  }),
  
  atualizar: (id, dados) => apiRequest(`/produtos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados)
  }),
  
  deletar: (id) => apiRequest(`/produtos/${id}`, {
    method: 'DELETE'
  })
};

// API de Categorias
const categoriasAPI = {
  listar: () => apiRequest('/categorias'),
  
  buscarPorId: (id) => apiRequest(`/categorias/${id}`),
  
  criar: (dados) => apiRequest('/categorias', {
    method: 'POST',
    body: JSON.stringify(dados)
  }),
  
  atualizar: (id, dados) => apiRequest(`/categorias/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados)
  }),
  
  deletar: (id) => apiRequest(`/categorias/${id}`, {
    method: 'DELETE'
  })
};

// API de Pedidos
const pedidosAPI = {
  listar: () => apiRequest('/pedidos'),
  
  buscarPorId: (id) => apiRequest(`/pedidos/${id}`),
  
  criar: (dados) => apiRequest('/pedidos', {
    method: 'POST',
    body: JSON.stringify(dados)
  }),
  
  atualizarStatus: (id, status) => apiRequest(`/pedidos/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  })
};

// API de Avaliações
const avaliacoesAPI = {
  listarPorProduto: (produtoId) => apiRequest(`/avaliacoes/produto/${produtoId}`),
  
  criar: (dados) => apiRequest('/avaliacoes', {
    method: 'POST',
    body: JSON.stringify(dados)
  })
};

// API de Dashboard
const dashboardAPI = {
  estatisticas: () => apiRequest('/dashboard/estatisticas'),
  
  vendas: (periodo = '7') => apiRequest(`/dashboard/vendas?periodo=${periodo}`),
  
  produtosPopulares: () => apiRequest('/dashboard/produtos-populares')
};

// Exportar para uso global
window.api = {
  auth: authAPI,
  produtos: produtosAPI,
  categorias: categoriasAPI,
  pedidos: pedidosAPI,
  avaliacoes: avaliacoesAPI,
  dashboard: dashboardAPI
};



# 🛍️ ShopVerse - Mini E-commerce Profissional

# Meu Projeto

Bem-vindo ao meu projeto!

![Logo do Projeto](https://github.com/Luccas84/ShopVerse-Mini-E-commerce/blob/main/Projeto_18.png)

**Um e-commerce completo e profissional, inspirado no Mercado Livre e Tray, com design moderno, responsivo e focado em conversão.**

[Funcionalidades](#-funcionalidades) • [Tecnologias](#-tecnologias) • [Instalação](#-instalação) • [Uso](#-uso) • [Estrutura](#-estrutura-do-projeto)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Uso do Sistema](#-uso-do-sistema)
- [API Endpoints](#-api-endpoints)
- [Responsividade](#-responsividade)
- [Screenshots](#-screenshots)
- [Desenvolvimento](#-desenvolvimento)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

**ShopVerse** é um e-commerce completo desenvolvido com tecnologias modernas, oferecendo uma experiência de compra profissional e intuitiva. O projeto foi desenvolvido com foco em:

- ✨ **Design Moderno**: Interface inspirada em grandes e-commerces (Mercado Livre, Tray)
- 📱 **100% Responsivo**: Mobile-first, otimizado para todos os dispositivos
- 🎨 **UX Profissional**: Animações suaves, feedback visual e navegação intuitiva
- 🔐 **Sistema Completo**: Autenticação, carrinho, checkout, dashboard administrativo
- 📊 **Analytics**: Dashboard com gráficos interativos e estatísticas em tempo real

---

## ✨ Funcionalidades

### 🏠 **Frontend - Vitrine**

#### Home Page
- ✅ **Hero Section** com carrossel animado e CTAs destacados
- ✅ **Seção de Categorias** com cards visuais e navegação rápida
- ✅ **Vitrine de Produtos** com badges de desconto e hover effects
- ✅ **Seção de Benefícios** (Frete Grátis, Troca Fácil, Suporte 24h, Garantia)
- ✅ **Prova Social** com testemunhos de clientes
- ✅ **Newsletter** com CTA de desconto
- ✅ **Footer Completo** com links, redes sociais e formas de pagamento

#### Página de Produto (PDP)
- ✅ **Galeria de Imagens** com zoom interativo e thumbnails
- ✅ **Informações Detalhadas** (preço, avaliações, especificações)
- ✅ **Variações** (tamanho, cor) com seleção visual
- ✅ **CTAs de Compra** (Adicionar ao Carrinho / Comprar Agora)
- ✅ **Calculadora de Frete** por CEP
- ✅ **Avaliações e Comentários** com seletor de estrelas interativo
- ✅ **Produtos Relacionados** em carrossel

#### Outras Páginas
- ✅ **Lista de Produtos** com filtros e ordenação
- ✅ **Carrinho de Compras** animado e responsivo
- ✅ **Checkout** com resumo e simulação de pagamento
- ✅ **Login/Cadastro** em modais animados

### 🔧 **Backend - Administração**

#### Dashboard Administrativo
- ✅ **Cards de Estatísticas** (Produtos, Pedidos, Receita, Usuários)
- ✅ **Gráficos Interativos** (Chart.js) - Vendas por período
- ✅ **Gestão de Categorias** com cards visuais
- ✅ **Lista de Produtos Mais Vendidos**
- ✅ **Pedidos Recentes** com atualização de status

#### Menu Flutuante Admin
- ✅ **Acesso Rápido** em qualquer página (botão flutuante)
- ✅ **Badge de Notificações** (pedidos pendentes)
- ✅ **Links Diretos** para Dashboard, Produtos, Categorias, Pedidos

#### CRUD Completo
- ✅ **Produtos**: Criar, editar, deletar, visualizar
- ✅ **Categorias**: Gerenciamento completo
- ✅ **Pedidos**: Visualização, alteração de status, detalhes
- ✅ **Avaliações**: Sistema de reviews com notas e comentários

### 🎨 **Design e UX**

- ✅ **Branding Consistente**: Cores (Azul #1a1f36, Laranja #f26b38)
- ✅ **Tipografia**: Montserrat (títulos) + Poppins (texto)
- ✅ **Animações Suaves**: Hover effects, fade-ins, transições
- ✅ **Toast Notifications**: Feedback visual para todas as ações
- ✅ **Modais Responsivos**: Bottom sheet em mobile, centralizado em desktop
- ✅ **Menu Mobile**: Hamburger menu com navegação deslizante

### 📱 **Responsividade**

- ✅ **Mobile** (320px - 480px): Layout otimizado, menu hamburger, 1 coluna
- ✅ **Tablet** (481px - 1024px): 2-3 colunas, layout intermediário
- ✅ **Desktop** (1025px+) : Layout completo, 4-5 colunas, busca centralizada

---

## 🛠️ Tecnologias

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Flexbox, Grid, Media Queries, Animações
- **JavaScript (ES6+)** - Modular e responsivo
- **Boxicons** - Ícones vetoriais
- **Google Fonts** - Montserrat + Poppins
- **Chart.js** - Gráficos interativos

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma ORM** - Gerenciamento de banco de dados
- **SQLite** - Banco de dados
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas

### Ferramentas
- **Nodemon** - Auto-reload em desenvolvimento
- **CORS** - Cross-Origin Resource Sharing

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**
- **Git** (opcional)

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/shopverse.git
cd shopverse
```

### 2. Instale as dependências do backend

```bash
cd backend
npm install
```

### 3. Configure o banco de dados

```bash
# Gerar o Prisma Client
npm run prisma:generate

# Executar migrações
npm run prisma:migrate
```

### 4. Crie um usuário administrador

```bash
node scripts/criar-admin.js
```

Você será solicitado a inserir:
- Nome
- Email
- Senha

### 5. (Opcional) Popule o banco com produtos de exemplo

```bash
node scripts/popular-produtos.js
```

### 6. Inicie o servidor

```bash
npm start
# ou para desenvolvimento com auto-reload:
npm run dev
```

O servidor estará rodando em: **http://localhost:3000**

### 7. Acesse o frontend

Abra o arquivo `frontend/index.html` no navegador ou configure um servidor local:

```bash
# Usando Python (se instalado)
cd frontend
python -m http.server 8080

# Ou usando Node.js http-server
npx http-server frontend -p 8080
```

---

## 📁 Estrutura do Projeto

```
shopverse/
├── backend/
│   ├── controllers/          # Lógica de negócio
│   │   ├── authController.js
│   │   ├── produtoController.js
│   │   ├── categoriaController.js
│   │   ├── pedidoController.js
│   │   ├── avaliacaoController.js
│   │   └── dashboardController.js
│   ├── middleware/           # Middlewares
│   │   └── auth.js           # Autenticação JWT
│   ├── routes/               # Rotas da API
│   │   ├── auth.js
│   │   ├── produtos.js
│   │   ├── categorias.js
│   │   ├── pedidos.js
│   │   ├── avaliacoes.js
│   │   └── dashboard.js
│   ├── prisma/
│   │   ├── schema.prisma     # Schema do banco
│   │   ├── dev.db            # Banco SQLite
│   │   └── migrations/        # Migrações
│   ├── scripts/              # Scripts auxiliares
│   │   ├── criar-admin.js    # Criar usuário admin
│   │   └── popular-produtos.js # Popular com dados exemplo
│   ├── server.js             # Servidor Express
│   └── package.json
│
├── frontend/
│   ├── index.html            # Home Page
│   ├── produtos.html         # Lista de produtos
│   ├── produto.html          # Página de detalhe
│   ├── carrinho.html         # Carrinho de compras
│   ├── checkout.html         # Finalização de compra
│   ├── login.html            # Login (modal)
│   ├── cadastro.html         # Cadastro (modal)
│   ├── dashboard.html        # Dashboard admin
│   ├── produtos-admin.html   # CRUD produtos
│   ├── categorias-admin.html # CRUD categorias
│   ├── pedidos-admin.html    # Gestão de pedidos
│   ├── css/
│   │   ├── main.css          # Estilos principais
│   │   ├── login.css         # Estilos de login
│   │   └── dashboard.css     # Estilos do dashboard
│   └── js/
│       ├── api.js            # Cliente API
│       ├── utils.js           # Funções utilitárias
│       ├── login.js           # Autenticação
│       ├── cadastro.js        # Cadastro
│       ├── produtos.js        # Lista de produtos
│       ├── carrinho.js        # Gerenciamento do carrinho
│       ├── checkout.js        # Finalização
│       ├── dashboard.js      # Dashboard admin
│       ├── produtos-admin.js  # CRUD produtos
│       ├── categorias-admin.js # CRUD categorias
│       ├── pedidos-admin.js   # Gestão pedidos
│       ├── admin-menu.js      # Menu flutuante admin
│       ├── categorias-menu.js # Menu dropdown categorias
│       └── mobile-menu.js     # Menu mobile hamburger
│
├── README.md                 # Este arquivo
├── SETUP.md                  # Guia de configuração
└── QUICKSTART.md             # Guia rápido
```

---

## 💻 Uso do Sistema

### 👤 Como Usuário Comum

1. **Navegar Produtos**
   - Acesse a home page e explore as categorias
   - Use a barra de busca para encontrar produtos específicos
   - Filtre por categoria e ordene por preço/nome

2. **Adicionar ao Carrinho**
   - Clique em um produto para ver detalhes
   - Selecione variações (tamanho, cor) se disponível
   - Escolha a quantidade e clique em "Adicionar ao Carrinho"

3. **Finalizar Compra**
   - Acesse o carrinho pelo ícone no header
   - Revise os itens e clique em "Finalizar Compra"
   - Preencha os dados no checkout
   - Simule o pagamento

4. **Avaliar Produtos**
   - Faça login na sua conta
   - Acesse um produto e role até "Avaliações"
   - Selecione uma nota (1-5 estrelas) e deixe um comentário

### 👨‍💼 Como Administrador

1. **Login Admin**
   - Faça login com uma conta de administrador
   - O menu flutuante aparecerá no canto superior direito

2. **Dashboard**
   - Acesse o Dashboard para ver estatísticas gerais
   - Visualize gráficos de vendas, produtos populares e pedidos recentes

3. **Gerenciar Produtos**
   - Clique em "Produtos" no menu admin
   - Crie, edite ou delete produtos
   - Configure preço, estoque, categoria e imagem

4. **Gerenciar Categorias**
   - Acesse "Categorias" no menu admin
   - Crie novas categorias para organizar produtos

5. **Gerenciar Pedidos**
   - Acesse "Pedidos" no menu admin
   - Visualize todos os pedidos
   - Altere o status (Pendente → Processando → Enviado → Entregue)
   - Veja detalhes completos de cada pedido

---

## 🔌 API Endpoints

### Autenticação
```
POST   /api/auth/cadastro    - Cadastrar novo usuário
POST   /api/auth/login        - Fazer login
GET    /api/auth/verificar    - Verificar token
```

### Produtos
```
GET    /api/produtos          - Listar produtos (com query params)
GET    /api/produtos/:id      - Buscar produto por ID
POST   /api/produtos          - Criar produto (admin)
PUT    /api/produtos/:id      - Atualizar produto (admin)
DELETE /api/produtos/:id      - Deletar produto (admin)
```

### Categorias
```
GET    /api/categorias        - Listar categorias
GET    /api/categorias/:id    - Buscar categoria por ID
POST   /api/categorias        - Criar categoria (admin)
PUT    /api/categorias/:id    - Atualizar categoria (admin)
DELETE /api/categorias/:id    - Deletar categoria (admin)
```

### Pedidos
```
GET    /api/pedidos           - Listar pedidos (admin) ou do usuário
GET    /api/pedidos/:id       - Buscar pedido por ID
POST   /api/pedidos           - Criar novo pedido
PUT    /api/pedidos/:id/status - Atualizar status do pedido (admin)
```

### Avaliações
```
GET    /api/avaliacoes/produto/:produtoId - Listar avaliações de um produto
POST   /api/avaliacoes        - Criar avaliação (autenticado)
```

### Dashboard
```
GET    /api/dashboard/estatisticas - Estatísticas gerais (admin)
GET    /api/dashboard/vendas       - Vendas por período (admin)
GET    /api/dashboard/produtos-populares - Produtos mais vendidos (admin)
```

---

## 🗄️ Estrutura do Banco de Dados

### Modelos Prisma

```prisma
Usuario {
  id, nome, email, senha, admin, createdAt, updatedAt
  Relações: pedidos[], avaliacoes[]
}

Categoria {
  id, nome, createdAt, updatedAt
  Relações: produtos[]
}

Produto {
  id, nome, descricao, preco, imagem, categoriaId, estoque, createdAt, updatedAt
  Relações: categoria, avaliacoes[], itens[]
}

Pedido {
  id, usuarioId, total, status, createdAt, updatedAt
  Relações: usuario, itens[]
}

PedidoItem {
  id, pedidoId, produtoId, quantidade, preco
  Relações: pedido, produto
}

Avaliacao {
  id, produtoId, usuarioId, nota, comentario, createdAt, updatedAt
  Relações: produto, usuario
}
```

---

## 📱 Responsividade

O projeto foi desenvolvido com abordagem **mobile-first**, garantindo experiência perfeita em todos os dispositivos:

### Breakpoints
- **Mobile**: 320px - 480px
- **Tablet**: 481px - 1024px
- **Desktop**: 1025px - 1399px
- **Large Desktop**: 1400px+

### Adaptações por Tela

| Componente | Mobile | Tablet | Desktop |
|------------|--------|--------|---------|
| Grid Produtos | 1 col | 2 cols | 4-5 cols |
| Header | Menu hamburger | Menu hamburger | Menu completo |
| Hero Section | 350px | 400px | 500px |
| Dashboard Cards | 1 col | 2 cols | 4 cols |
| Footer | Stack vertical | 2 cols | 4 cols |

---

## 🎨 Branding e Design

### Cores
- **Primária**: `#1a1f36` (Azul escuro)
- **Secundária**: `#f26b38` (Laranja)
- **Texto**: `#ffffff` / `#333333`
- **Fundo Claro**: `#f5f5f5`
- **Sucesso**: `#4caf50`
- **Erro**: `#f44336`

### Tipografia
- **Títulos**: Montserrat (600, 700)
- **Corpo**: Poppins (400, 500, 600)

### Ícones
- **Boxicons** - Biblioteca completa de ícones vetoriais

---

## 📸 Screenshots

### Home Page
- Hero section com carrossel animado
- Seção de categorias com cards visuais
- Vitrine de produtos com badges de desconto
- Benefícios e prova social
- Newsletter com CTA

### Página de Produto
- Galeria com zoom interativo
- Informações detalhadas e variações
- Calculadora de frete
- Avaliações interativas
- Produtos relacionados

### Dashboard Admin
- Cards de estatísticas
- Gráficos de vendas (Chart.js)
- Gestão completa de produtos, categorias e pedidos

---

## 🔧 Desenvolvimento

### Scripts Disponíveis

```bash
# Backend
npm start              # Iniciar servidor
npm run dev            # Modo desenvolvimento (nodemon)
npm run prisma:generate # Gerar Prisma Client
npm run prisma:migrate  # Executar migrações
npm run prisma:studio   # Abrir Prisma Studio (GUI do banco)
```

### Estrutura de Código

- **Modular**: Cada funcionalidade em arquivo separado
- **Reutilizável**: Funções utilitárias compartilhadas
- **Responsivo**: CSS mobile-first
- **Acessível**: HTML semântico e ARIA labels

---

## 🚀 Deploy

### Backend (Node.js + Express)
- Pode ser deployado em: Heroku, Vercel, Railway, DigitalOcean
- Configure variáveis de ambiente:
  - `PORT` (opcional, padrão: 3000)
  - `JWT_SECRET` (para produção)

### Frontend
- Pode ser servido como arquivos estáticos
- Compatível com: Netlify, Vercel, GitHub Pages
- Configure a URL da API no arquivo `js/api.js`

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

---

## 👨‍💻 Autor

Desenvolvido com ❤️ para demonstrar habilidades em desenvolvimento full-stack.

---

## 🎯 Roadmap Futuro

- [ ] Integração com gateway de pagamento real
- [ ] Sistema de cupons de desconto
- [ ] Wishlist/Favoritos
- [ ] Histórico de pedidos para usuários
- [ ] Busca avançada com filtros múltiplos
- [ ] Sistema de notificações em tempo real
- [ ] Modo escuro (Dark Mode)
- [ ] PWA (Progressive Web App)
- [ ] Internacionalização (i18n)

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela! ⭐**

Feito com ❤️ e muito ☕

</div>

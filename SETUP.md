# 🚀 Guia Completo de Configuração - ShopVerse

Guia passo a passo para configurar e executar o Mini E-commerce ShopVerse.

---

## 📋 Pré-requisitos

Antes de começar, verifique se você tem:

1. **Node.js** instalado (versão 16 ou superior)
   - Verifique: `node --version`
   - Download: https://nodejs.org/

2. **npm** instalado (vem com Node.js)
   - Verifique: `npm --version`

3. **Python** (opcional, mas recomendado para servir o frontend)
   - Verifique: `python --version`

---

## 🔧 PARTE 1: Configuração do Backend

### Passo 1: Abrir o Terminal e Navegar

Abra um terminal (PowerShell, CMD, ou Git Bash no Windows) e navegue até a pasta do projeto:

```bash
cd "D:\Locks\Programação\4-Testes\Mini E-commerce"
```

### Passo 2: Entrar na Pasta Backend

```bash
cd backend
```

### Passo 3: Instalar Dependências

```bash
npm install
```

**⏱️ Aguarde alguns minutos** enquanto as dependências são instaladas.

Você verá mensagens como:
```
added 150 packages, and audited 151 packages in 30s
```

### Passo 4: Configurar o Banco de Dados

Execute este comando para gerar o cliente Prisma:

```bash
npx prisma generate
```

Você verá:
```
✔ Generated Prisma Client
```

### Passo 5: Criar o Banco de Dados

Execute a migração:

```bash
npx prisma migrate dev --name init
```

Você verá:
```
✔ Applied migration: init
```

Isso cria o arquivo `backend/prisma/dev.db` (banco SQLite).

### Passo 6: Criar Usuário Administrador

Execute o script interativo:

```bash
node scripts/criar-admin.js
```

**O script vai perguntar:**

1. **Nome:** Digite qualquer nome (ex: `Admin`)
2. **Email:** Digite um email (ex: `admin@shopverse.com`)
3. **Senha:** Digite uma senha (ex: `admin123`)

**⚠️ IMPORTANTE: ANOTE ESSAS CREDENCIAIS!**

Você verá:
```
✅ Administrador criado com sucesso!
ID: 1
Nome: Admin
Email: admin@shopverse.com
```

### Passo 7: Popular Banco com Produtos (Opcional mas Recomendado)

Para ter produtos de exemplo no sistema:

```bash
node scripts/popular-produtos.js
```

Você verá:
```
✅ Categoria "Moda" criada/verificada
✅ Produto "Camiseta Premium Básica" criado
...
✨ Concluído! X produtos criados
```

### Passo 8: Iniciar o Servidor Backend

```bash
node server.js
```

**Você deve ver:**

```
🚀 Servidor rodando em http://localhost:3000
📊 API disponível em http://localhost:3000/api
```

**⚠️ MANTENHA ESTE TERMINAL ABERTO!** O servidor precisa continuar rodando.

**✅ Backend está pronto!**

---

## 🎨 PARTE 2: Configuração do Frontend

### Passo 9: Abrir um Novo Terminal

Abra **um segundo terminal** (deixe o primeiro rodando o backend).

### Passo 10: Navegar para a Pasta Frontend

No novo terminal:

```bash
cd "D:\Locks\Programação\4-Testes\Mini E-commerce\frontend"
```

### Passo 11: Escolher Método para Servir o Frontend

**Escolha UMA das opções abaixo:**

#### 🌟 Opção A: Python (Mais Simples)

Se você tem Python instalado:

```bash
python -m http.server 8080
```

Ou se o comando acima não funcionar:

```bash
python3 -m http.server 8080
```

**Você verá:**
```
Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ...
```

#### 📦 Opção B: Node.js http-server

Se preferir usar Node.js:

**Primeiro instale (uma única vez):**
```bash
npm install -g http-server
```

**Depois execute:**
```bash
http-server -p 8080
```

#### 🎯 Opção C: Live Server (VSCode)

Se você usa Visual Studio Code:

1. Instale a extensão "Live Server"
2. Clique com botão direito em `frontend/index.html`
3. Selecione **"Open with Live Server"**

**⚠️ MANTENHA ESTE TERMINAL ABERTO TAMBÉM!**

**✅ Frontend está pronto!**

---

## ✅ PARTE 3: Verificar se Tudo Funciona

### Passo 12: Verificar Backend

Abra seu navegador e acesse:

```
http://localhost:3000/api/health
```

**Deve aparecer:**
```json
{"status":"ok","message":"API ShopVerse funcionando!"}
```

✅ Se apareceu isso, o backend está funcionando!

### Passo 13: Verificar Frontend

Acesse:

```
http://localhost:8080
```

**Deve aparecer:**
- A página inicial do ShopVerse
- Menu com Home, Produtos
- Banner animado
- Produtos em destaque (se você executou o script de popular)

✅ Se apareceu isso, o frontend está funcionando!

---

## 🔐 PARTE 4: Primeiro Acesso

### Passo 14: Criar Conta de Cliente (Opcional)

1. Clique em **"Login"** no header
2. Clique no link **"Cadastre-se"** no modal
3. Preencha os dados
4. Clique em **"Cadastrar"**

### Passo 15: Fazer Login como Administrador

1. Clique em **"Login"** no header
2. Digite o **email** que você criou no Passo 6
3. Digite a **senha** que você criou no Passo 6
4. Clique em **"Entrar"**

### Passo 16: Acessar o Dashboard

**Opção 1: Pelo Menu**
- Após fazer login como admin, o link **"Dashboard"** deve aparecer no menu
- Clique nele

**Opção 2: Acesso Direto**
- Acesse: `http://localhost:8080/dashboard.html`

**Você verá:**
- Dashboard com estatísticas
- Gráficos de vendas
- Tabelas de produtos e pedidos

✅ **Tudo funcionando!**

---

## 🐛 Solução de Problemas Comuns

### ❌ Erro: "Cannot find module"

**Solução:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### ❌ Erro: "Prisma Client hasn't been generated"

**Solução:**
```bash
cd backend
npx prisma generate
```

### ❌ Erro: "Port 3000 already in use"

Alguém está usando a porta 3000. **Soluções:**

**Opção A:** Pare o processo que está usando a porta

**Opção B:** Mude a porta do backend

1. Abra `backend/server.js`
2. Altere a linha 13:
```javascript
const PORT = process.env.PORT || 3001; // Mudou de 3000 para 3001
```

3. Abra `frontend/js/api.js`
4. Altere a linha 1:
```javascript
const API_URL = 'http://localhost:3001/api'; // Mudou de 3000 para 3001
```

### ❌ Erro: "Port 8080 already in use"

**Solução:** Use outra porta no frontend:

```bash
python -m http.server 8081
```

E acesse: `http://localhost:8081`

### ❌ Dashboard não aparece no menu

**Solução:**

1. Certifique-se de que criou um admin: `node scripts/criar-admin.js`
2. Faça logout (se estiver logado)
3. Faça login novamente com o email/senha do admin
4. Ou acesse diretamente: `http://localhost:8080/dashboard.html`

**Para debug:** Acesse `http://localhost:8080/debug-admin.html`

### ❌ Erro: "CORS"

O backend já está configurado com CORS. Se ainda houver problemas:

1. Verifique se o backend está rodando em `http://localhost:3000`
2. Verifique se o frontend está em `http://localhost:8080`
3. Verifique se não há firewall bloqueando

### ❌ Produtos não aparecem

Execute:
```bash
cd backend
node scripts/popular-produtos.js
```

---

## 📊 Resumo das URLs

### Frontend (Porta 8080)
- 🏠 **Home:** `http://localhost:8080/`
- 🛍️ **Produtos:** `http://localhost:8080/produtos.html`
- 📦 **Carrinho:** `http://localhost:8080/carrinho.html`
- 💳 **Checkout:** `http://localhost:8080/checkout.html`
- 📊 **Dashboard:** `http://localhost:8080/dashboard.html` (admin)
- 🔧 **Gerenciar Produtos:** `http://localhost:8080/produtos-admin.html` (admin)
- 📁 **Gerenciar Categorias:** `http://localhost:8080/categorias-admin.html` (admin)
- 🐛 **Debug Admin:** `http://localhost:8080/debug-admin.html`

### Backend API (Porta 3000)
- ❤️ **Health Check:** `http://localhost:3000/api/health`
- 🔐 **Login:** `http://localhost:3000/api/auth/login`
- 📝 **Cadastro:** `http://localhost:3000/api/auth/cadastro`
- 📦 **Produtos:** `http://localhost:3000/api/produtos`
- 📁 **Categorias:** `http://localhost:3000/api/categorias`

---

## 🎯 Checklist de Inicialização

Use este checklist toda vez que for iniciar o projeto:

### Backend:
- [ ] Terminal aberto na pasta `backend`
- [ ] Executado: `npm install` (só na primeira vez)
- [ ] Executado: `npx prisma generate` (só na primeira vez)
- [ ] Executado: `npx prisma migrate dev --name init` (só na primeira vez)
- [ ] Executado: `node scripts/criar-admin.js` (só na primeira vez)
- [ ] Executado: `node scripts/popular-produtos.js` (opcional, só na primeira vez)
- [ ] Executado: `node server.js`
- [ ] Mensagem: "🚀 Servidor rodando em http://localhost:3000"

### Frontend:
- [ ] Novo terminal aberto na pasta `frontend`
- [ ] Executado: `python -m http.server 8080` (ou outro método)
- [ ] Mensagem: "Serving HTTP on..."

### Verificação:
- [ ] Backend responde: `http://localhost:3000/api/health`
- [ ] Frontend carrega: `http://localhost:8080`
- [ ] Login funciona com credenciais do admin
- [ ] Dashboard acessível

---

## 💡 Dicas Úteis

### Visualizar o Banco de Dados

Para ver os dados do banco de forma visual:

```bash
cd backend
npx prisma studio
```

Isso abre uma interface web em `http://localhost:5555` onde você pode ver e editar os dados.

### Comandos Rápidos

**Iniciar tudo rapidamente:**

Terminal 1 (Backend):
```bash
cd backend && node server.js
```

Terminal 2 (Frontend):
```bash
cd frontend && python -m http.server 8080
```

### Estrutura de Dados

- **Banco SQLite:** `backend/prisma/dev.db`
- **Dados do usuário:** Armazenados no localStorage do navegador
- **Token de autenticação:** Armazenado no localStorage

---

## 🎉 Pronto!

Agora você pode:

1. ✅ Explorar a interface do cliente
2. ✅ Adicionar produtos ao carrinho
3. ✅ Fazer login como admin
4. ✅ Acessar o dashboard
5. ✅ Gerenciar produtos e categorias
6. ✅ Visualizar estatísticas e gráficos

**Bom desenvolvimento! 🚀**

---

**Problemas?** Verifique:
- Logs do terminal do backend
- Console do navegador (F12)
- Arquivo `SOLUCAO-DASHBOARD.md` para problemas específicos do dashboard

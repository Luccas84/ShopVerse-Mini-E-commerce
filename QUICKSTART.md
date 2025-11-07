# ⚡ Guia Rápido - ShopVerse

**Referência rápida para iniciar o projeto**

---

## 🚀 Início Rápido (Primeira Vez)

### Backend (Terminal 1)
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
node scripts/criar-admin.js
node scripts/popular-produtos.js
node server.js
```

### Frontend (Terminal 2)
```bash
cd frontend
python -m http.server 8080
```

### Acessar
- Frontend: http://localhost:8080
- Backend API: http://localhost:3000/api/health

---

## 🔄 Início Rápido (Próximas Vezes)

### Backend (Terminal 1)
```bash
cd backend
node server.js
```

### Frontend (Terminal 2)
```bash
cd frontend
python -m http.server 8080
```

---

## 🔑 Credenciais Admin

Use as credenciais que você criou com:
```bash
node scripts/criar-admin.js
```

Se não lembrar, crie novamente:
```bash
cd backend
node scripts/criar-admin.js
```

---

## 📍 URLs Principais

- 🏠 Home: http://localhost:8080
- 📊 Dashboard: http://localhost:8080/dashboard.html
- 🔧 Produtos Admin: http://localhost:8080/produtos-admin.html
- 📁 Categorias Admin: http://localhost:8080/categorias-admin.html

---

## ⚠️ Problemas?

1. **Porta ocupada?** Mude a porta no código
2. **Dashboard não aparece?** Faça logout e login novamente
3. **Erro no backend?** Verifique se o banco existe: `npx prisma migrate dev`

---

**Para guia completo, veja: `SETUP.md`**



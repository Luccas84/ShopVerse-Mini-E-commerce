# 🛠️ Solução: Dashboard Não Aparece no Menu

## 🔍 Diagnosticar o Problema

### Passo 1: Verificar se você está logado como admin

Abra no navegador:
```
http://localhost:8080/debug-admin.html
```

Esta página mostrará:
- ✅ Se você está logado
- ✅ Se seus dados estão salvos
- ✅ Se você é administrador
- ✅ Informações detalhadas

### Passo 2: Verificar no Console do Navegador

1. Abra o DevTools (F12)
2. Vá na aba "Console"
3. Digite:
```javascript
JSON.parse(localStorage.getItem('usuario'))
```

Isso deve mostrar algo como:
```json
{
  "id": 1,
  "nome": "Admin",
  "email": "admin@shopverse.com",
  "admin": true  // ← IMPORTANTE: deve ser true
}
```

## ✅ Soluções

### Solução 1: Recriar o Usuário Admin

Se você não tem certeza se criou o admin corretamente:

```bash
cd backend
node scripts/criar-admin.js
```

Forneça:
- **Nome**: Admin
- **Email**: admin@shopverse.com (ou qualquer email)
- **Senha**: admin123 (ou qualquer senha)

**IMPORTANTE**: Anote essas credenciais!

### Solução 2: Fazer Login Novamente

1. Vá para `http://localhost:8080`
2. Clique em "Sair" (se estiver logado)
3. Faça login novamente com o email e senha do administrador
4. Após o login, a página será recarregada
5. O link "Dashboard" deve aparecer no menu

### Solução 3: Acessar Diretamente

Mesmo sem o link no menu, você pode acessar:

```
http://localhost:8080/dashboard.html
```

O sistema vai verificar se você é admin:
- ✅ Se for admin: Dashboard abre normalmente
- ❌ Se não for: Redireciona para home com mensagem de erro

### Solução 4: Limpar Cache e Tentar Novamente

1. Abra o DevTools (F12)
2. Vá na aba "Application" (Chrome) ou "Storage" (Firefox)
3. Encontre "Local Storage" → `http://localhost:8080`
4. Delete `token` e `usuario`
5. Recarregue a página
6. Faça login novamente como admin

### Solução 5: Verificar se o Backend Está Retornando Admin

No console do navegador (F12), teste:

```javascript
// Verificar se a API retorna admin
fetch('http://localhost:3000/api/auth/verificar', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
})
.then(r => r.json())
.then(data => {
  console.log('Resposta da API:', data);
  console.log('É admin?', data.usuario?.admin);
});
```

Se `admin` for `false`, o problema está no backend - você precisa recriar o usuário admin.

## 🎯 Passos Recomendados (Solução Completa)

1. **Pare o backend** (Ctrl+C no terminal)

2. **Crie/Recrie o admin**:
   ```bash
   cd backend
   node scripts/criar-admin.js
   ```
   
   Use credenciais simples para teste:
   - Email: `admin@teste.com`
   - Senha: `admin123`

3. **Inicie o backend**:
   ```bash
   node server.js
   ```

4. **Limpe o localStorage**:
   - F12 → Console → Digite:
   ```javascript
   localStorage.clear()
   ```

5. **Recarregue a página** (F5)

6. **Faça login** com as credenciais do admin

7. **Verifique o menu** - O link "Dashboard" deve aparecer

8. **Ou acesse diretamente**: `http://localhost:8080/dashboard.html`

## 🐛 Se Nada Funcionar

### Verificar o Banco de Dados

```bash
cd backend
npx prisma studio
```

Isso abre uma interface visual do banco:
1. Vá em "Usuario"
2. Verifique se existe um usuário com `admin = true`
3. Se não existir, crie usando o script `criar-admin.js`

### Verificar o Código do Backend

Confirme que o script está criando com `admin: true`:

```bash
cat backend/scripts/criar-admin.js | grep "admin: true"
```

Deve mostrar:
```javascript
admin: true
```

## 📝 Checklist

- [ ] Backend está rodando (`http://localhost:3000`)
- [ ] Frontend está servindo (`http://localhost:8080`)
- [ ] Criei um usuário admin com `node scripts/criar-admin.js`
- [ ] Fiz login com o email/senha do admin
- [ ] Verifiquei no console: `localStorage.getItem('usuario')` mostra `"admin": true`
- [ ] Tentei acessar `http://localhost:8080/dashboard.html` diretamente

Se todos os itens estão marcados e ainda não funciona, verifique:
- Console do navegador para erros JavaScript
- Console do backend para erros de API
- Network tab no DevTools para ver requisições falhando

---

**Dica**: Use `http://localhost:8080/debug-admin.html` para diagnosticar o problema rapidamente!



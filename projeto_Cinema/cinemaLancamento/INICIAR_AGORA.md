# 🚨 INICIAR API DE POLTRONAS

## ❌ **ERRO ATUAL:**
```
Failed to fetch
ERR_CONNECTION_REFUSED
```

**Motivo:** A API de Poltronas (porta 3001) **NÃO está rodando!**

---

## ✅ **SOLUÇÃO - ABRIR NOVO TERMINAL:**

### **1. Abra um NOVO terminal/PowerShell**

### **2. Navegue até a pasta api:**
```bash
cd "C:\Users\Devyd Silva\Documents\GitHub\-Alunos_SENAI\projeto_Cinema\cinemaLancamento\api"
```

### **3. Inicie a API de Poltronas:**
```bash
node poltronas-api.js
```

### **4. Deve aparecer:**
```
✅ Banco de Poltronas conectado!
🎬 API de Poltronas rodando na porta 3001
```

---

## 📋 **VOCÊ DEVE TER 3 TERMINAIS ABERTOS:**

### **Terminal 1 - API de Filmes (3000):**
```
Banco conectado e modelos sincronizados.
API de Filmes rodando na porta 3000
```
✅ **JÁ ESTÁ RODANDO!**

### **Terminal 2 - API de Poltronas (3001):**
```
✅ Banco de Poltronas conectado!
🎬 API de Poltronas rodando na porta 3001
```
❌ **PRECISA INICIAR!**

### **Terminal 3 - App Expo:**
```
Metro waiting on exp://...
Web is waiting on http://localhost:8081
```
✅ **JÁ ESTÁ RODANDO!**

---

## 🎯 **DEPOIS DE INICIAR:**

1. **Recarregue o navegador** (Ctrl + R)
2. **Vá para um filme**
3. **Clique em poltronas** → Devem ficar verdes
4. **Confirme** → Devem ficar vermelhas

---

## 🐛 **SE DER ERRO:**

### **Erro: "porta 3001 já em uso"**
```bash
# No PowerShell (como admin):
netstat -ano | findstr :3001
taskkill /PID <número> /F
```

### **Erro: "arquivo não encontrado"**
Verifique se o arquivo existe:
```bash
dir poltronas-api.js
```

---

## 💡 **ATALHO RÁPIDO:**

**Duplo clique no arquivo:**
```
api/start-poltronas.bat
```

Isso vai iniciar automaticamente!

---

## ✅ **CHECKLIST:**

- [ ] Terminal 1: API Filmes (porta 3000) ✅
- [ ] Terminal 2: API Poltronas (porta 3001) ❌ **← INICIAR AGORA!**
- [ ] Terminal 3: App Expo (porta 8081) ✅
- [ ] Navegador aberto ✅

---

## 🚀 **AÇÃO IMEDIATA:**

1. **Abra NOVO terminal**
2. **Cole isso:**
   ```bash
   cd "C:\Users\Devyd Silva\Documents\GitHub\-Alunos_SENAI\projeto_Cinema\cinemaLancamento\api"
   node poltronas-api.js
   ```
3. **Pressione Enter**
4. **Veja a mensagem de sucesso**
5. **Recarregue o navegador**
6. **Teste o sistema!**

---

## 🎉 **PRONTO!**

Depois de iniciar, o erro vai sumir e o sistema vai funcionar! 🚀✨


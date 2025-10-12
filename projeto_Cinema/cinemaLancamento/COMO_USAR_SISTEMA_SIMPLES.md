# 🎬 SISTEMA SIMPLES DE RESERVA - GUIA COMPLETO

## ✅ **O QUE FOI IMPLEMENTADO:**

### **Sistema de Reserva Simplificado:**
- ✅ **Sem formulário de pagamento** complexo
- ✅ **Confirmação direta** na tela de poltronas
- ✅ **Poltronas visuais** (cinza → verde → vermelha)
- ✅ **Banco de dados** com tabelas `filmes` e `reservas`
- ✅ **API REST** funcionando na porta 3000

---

## 🚀 **COMO INICIAR O SISTEMA:**

### **1. Iniciar a API (PRIMEIRO PASSO!):**

#### **Opção A: Script Automático (Windows)**
```bash
# Duplo clique no arquivo:
api/start-api.bat
```

#### **Opção B: Terminal**
```bash
cd api
node index.js
```

**A API deve mostrar:**
```
Banco conectado e modelos sincronizados.
API de Filmes rodando na porta 3000
```

### **2. Iniciar o App (SEGUNDO PASSO):**

**Em outro terminal:**
```bash
npx expo start --clear
```

**Pressione `w` para abrir no navegador**

---

## 🎯 **FLUXO DE USO:**

### **1. Tela Home:**
- ✅ Mostra filmes em carrossel
- ✅ **Cliente** vê badge "DISPONÍVEL" ou "ESGOTADO"
- ✅ **Admin** vê switch para mudar disponibilidade

### **2. Selecionar Filme:**
- ✅ Clique no pôster de um filme **DISPONÍVEL**
- ✅ Abre a tela de poltronas

### **3. Escolher Poltronas:**
- ⚪ **Cinza:** Disponível
- 🟢 **Verde:** Selecionada (você clicou)
- 🔴 **Vermelha:** Ocupada (já reservada)

### **4. Confirmar Reserva:**
1. Clique no botão **"Confirmar (X poltronas)"**
2. Aparece alert com resumo:
   - Poltronas selecionadas
   - Nome do filme
   - Total a pagar
3. Clique **"Confirmar"**
4. Sistema salva no banco de dados
5. Poltronas ficam **VERMELHAS** ✅
6. Alert de sucesso
7. Clique "OK" → Volta para Home

---

## 💾 **BANCO DE DADOS:**

### **Tabelas Criadas:**

#### **1. Tabela `filmes`:**
```sql
- codigo (PK)
- Title, Year, Genre, Director, etc.
- disponivel (BOOLEAN) ← NOVO!
- ComingSoon (BOOLEAN)
```

#### **2. Tabela `reservas`:** ← **NOVA!**
```sql
- id (PK)
- filmeId (VARCHAR)
- filmeTitulo (VARCHAR)
- poltronas (TEXT JSON)
- total (DECIMAL)
- dataReserva (DATETIME)
```

---

## 🔧 **FUNCIONALIDADES ADMIN:**

### **Login como Admin:**
1. Vá para aba **"Sobre"**
2. Clique **"Fazer Login como Admin"**
3. Digite senha: **`admin123`**
4. Clique **"Entrar"**

### **Mudar Disponibilidade do Filme:**
1. Na tela Home (como admin)
2. Veja o **switch** no card do filme
3. Toggle ON/OFF para disponibilizar ou esgotar

### **Desocupar Sala:**
1. Entre na tela de poltronas
2. Clique **"🔧 Desocupar Sala"** (botão laranja)
3. Confirme
4. Todas as poltronas ficam disponíveis novamente

---

## 📡 **API ENDPOINTS:**

### **Filmes:**
- `GET /filmes` - Listar todos os filmes
- `GET /filmes/:codigo` - Buscar filme por código
- `POST /filmes` - Criar novo filme
- `PUT /filmes/:codigo` - Atualizar filme
- `PATCH /filmes/:codigo/disponibilidade` - Mudar disponibilidade
- `DELETE /filmes/:codigo` - Remover filme

### **Reservas:** ← **NOVO!**
- `GET /reservas` - Listar todas as reservas
- `POST /reservas` - Criar nova reserva
- `GET /reservas/filme/:filmeId` - Buscar reservas por filme

---

## 🐛 **PROBLEMAS COMUNS:**

### **1. "API Request Error: Erro ao buscar filmes"**
**Solução:** A API não está rodando!
```bash
cd api
node index.js
```

### **2. "SQLITE_ERROR: no such column: disponivel"**
**Solução:** Banco desatualizado. A API agora atualiza automaticamente com `sync({ alter: true })`
- Reinicie a API
- Ou delete `api/database.sqlite` e reinicie

### **3. Filmes não aparecem**
**Solução:** 
- Verifique se a API está rodando: `http://localhost:3000`
- Limpe o cache: `npx expo start --clear`
- O app usa **TMDB** se a API local falhar

### **4. Poltronas não ficam vermelhas**
**Solução:**
- As poltronas só persistem durante a sessão
- Para persistência real, precisaria carregar do banco ao abrir a tela

---

## 🎨 **VISUAL:**

### **Estados das Poltronas:**
| Cor | Estado | Significado |
|-----|--------|-------------|
| ⚪ Cinza | Disponível | Pode selecionar |
| 🟢 Verde | Selecionada | Você escolheu |
| 🔴 Vermelha | Ocupada | Já reservada |

### **Badges dos Filmes:**
- **🎟️ DISPONÍVEL** (verde): Tem sessão
- **🚫 ESGOTADO** (cinza): Sem vagas

---

## 📝 **EXEMPLO DE RESERVA:**

### **Cenário:**
- Filme: "Demon Slayer: Kimetsu no Yaiba"
- Poltronas: D1, D2, D3
- Total: R$ 75,00

### **Dados Salvos no Banco:**
```json
{
  "id": 1,
  "filmeId": "639721",
  "filmeTitulo": "Demon Slayer: Kimetsu no Yaiba",
  "poltronas": "[\"D1\",\"D2\",\"D3\"]",
  "total": 75.00,
  "dataReserva": "2025-10-10T17:30:00.000Z"
}
```

---

## ✅ **CHECKLIST DE FUNCIONAMENTO:**

- [ ] API iniciada na porta 3000
- [ ] Expo rodando no navegador
- [ ] Filmes aparecem na Home
- [ ] Posso clicar em um filme disponível
- [ ] Tela de poltronas abre
- [ ] Posso selecionar poltronas (ficam verdes)
- [ ] Botão "Confirmar" aparece
- [ ] Clico "Confirmar" → Alert aparece
- [ ] Clico "Confirmar" no alert → Poltronas ficam vermelhas
- [ ] Alert de sucesso aparece
- [ ] Volto para Home

---

## 🎉 **SISTEMA PRONTO!**

**Características:**
- 🚫 Sem formulários complexos
- ✅ Confirmação visual (cores)
- ✅ Banco de dados real
- ✅ API REST completa
- ✅ Admin/Cliente separados
- ✅ Simples e funcional

**Perfeito para demonstração!** 🎬✨

---

## 📞 **SUPORTE:**

Se algo não funcionar:
1. Reinicie a API
2. Limpe o cache: `npx expo start --clear`
3. Verifique se a porta 3000 está livre
4. Leia a seção "Problemas Comuns" acima




# 🎉 SISTEMA UNIFICADO - UMA SÓ API!

## ✅ **O QUE FOI FEITO:**

### **1. API Unificada (porta 3000):**
- ✅ **Filmes** + **Reservas** + **Poltronas** = TUDO EM UM!
- ✅ Um só banco de dados: `database.sqlite`
- ✅ Uma só porta: **3000**
- ✅ Organizado e profissional

### **2. Tabelas no Banco:**

#### **`filmes`** - Catálogo de filmes
- Title, Year, Genre, Director, etc.
- disponivel (boolean)
- ComingSoon (boolean)

#### **`reservas`** - Histórico de reservas
- filmeId, filmeTitulo
- poltronas (JSON)
- total, dataReserva

#### **`poltronas`** - Controle individual de cada poltrona
- filmeId, filmeTitulo, poltrona (ex: "D5")
- status (disponivel/reservada)
- clienteNome, clienteEmail
- total, dataReserva
- **Índice único:** (filmeId + poltrona)

### **3. Frontend Atualizado:**
- ✅ Serviço `poltronas.ts` apontando para porta 3000
- ✅ Tela de poltronas integrada
- ✅ Tudo funcionando!

---

## 🚀 **COMO USAR:**

### **1. Iniciar API (APENAS UMA!):**
```bash
cd api
node index.js
```

**Deve aparecer:**
```
Banco conectado e modelos sincronizados.
API de Filmes rodando na porta 3000
```

### **2. Iniciar App:**
```bash
npx expo start --clear
```

**Pressione `w` para abrir no navegador**

---

## 📡 **ENDPOINTS DISPONÍVEIS:**

### **Base URL:** `http://localhost:3000`

#### **FILMES:**
```
GET    /filmes
GET    /filmes/:codigo
POST   /filmes
PUT    /filmes/:codigo
PATCH  /filmes/:codigo/disponibilidade
DELETE /filmes/:codigo
```

#### **RESERVAS:**
```
GET  /reservas
POST /reservas
GET  /reservas/filme/:filmeId
```

#### **POLTRONAS:** ← **NOVO!**
```
GET    /poltronas                          - Listar todas
GET    /poltronas/filme/:filmeId           - Poltronas de um filme
GET    /poltronas/:id                      - Poltrona específica
POST   /poltronas/reservar                 - Reservar poltronas
DELETE /poltronas/cancelar/:filmeId/:pol   - Cancelar uma poltrona
DELETE /poltronas/filme/:filmeId           - Limpar sala (admin)
```

---

## 🎯 **FUNCIONALIDADES:**

### **CLIENTE:**

#### **1. Selecionar Poltronas:**
- Clique na poltrona → **Verde** 🟢
- Clique de novo → **Cinza** (desselecionou)
- Poltronas vermelhas = ocupadas

#### **2. Confirmar Reserva:**
- Botão "Confirmar (X poltronas)"
- Alert de confirmação
- Clique "Confirmar"
- **Poltronas ficam VERMELHAS** 🔴
- Salva na API (tabela `poltronas`)
- Alert de sucesso

### **ADMIN:**

#### **1. Desocupar Sala:**
- Botão "🔧 Desocupar Sala"
- Libera TODAS as poltronas do filme
- Apaga do banco
- Sala pronta para próxima sessão

---

## 💾 **EXEMPLO DE DADOS:**

### **Reservar Poltronas:**
```bash
POST http://localhost:3000/poltronas/reservar

Body:
{
  "filmeId": "639721",
  "filmeTitulo": "Demon Slayer",
  "poltronas": ["D5", "D6", "D7"],
  "clienteNome": "João Silva",
  "clienteEmail": "joao@email.com"
}

Response:
{
  "message": "3 poltrona(s) reservada(s) com sucesso!",
  "poltronas": [...],
  "totalPago": 75
}
```

### **Listar Poltronas de um Filme:**
```bash
GET http://localhost:3000/poltronas/filme/639721

Response:
[
  {
    "id": 1,
    "filmeId": "639721",
    "filmeTitulo": "Demon Slayer",
    "poltrona": "D5",
    "status": "reservada",
    "clienteNome": "João Silva",
    "clienteEmail": "joao@email.com",
    "total": "25.00",
    "dataReserva": "2025-10-10T19:00:00.000Z"
  }
]
```

### **Limpar Sala (Admin):**
```bash
DELETE http://localhost:3000/poltronas/filme/639721

Response:
{
  "message": "3 poltrona(s) liberada(s)!",
  "filmeId": "639721"
}
```

---

## 🎨 **FLUXO VISUAL:**

```
1. Poltrona CINZA ⚪
   ↓ (cliente clica)

2. Poltrona VERDE 🟢
   ↓ (clica "Confirmar")

3. Alert de Confirmação 📱
   ↓ (clica "Confirmar")

4. API salva na tabela `poltronas` 💾
   
5. Poltrona VERMELHA 🔴 + Alert de Sucesso 📱
   ↓ (clica "OK")

6. Volta para Home 🏠
```

---

## ✅ **VANTAGENS DO SISTEMA UNIFICADO:**

### **1. Simplicidade:**
- ✅ **Uma só API** para tudo
- ✅ **Uma só porta** (3000)
- ✅ **Um só banco** (database.sqlite)
- ✅ **Um só terminal** para iniciar

### **2. Organização:**
- ✅ Tabelas separadas (filmes, reservas, poltronas)
- ✅ Endpoints organizados por contexto
- ✅ Fácil manutenção

### **3. Performance:**
- ✅ Menos conexões
- ✅ Menos overhead
- ✅ Mais rápido

### **4. Desenvolvimento:**
- ✅ Menos confusão
- ✅ Fácil depurar
- ✅ Código limpo

---

## 📋 **CHECKLIST DE FUNCIONAMENTO:**

- [ ] API iniciada (porta 3000)
- [ ] App iniciado (porta 8081)
- [ ] Navegador aberto
- [ ] Consigo selecionar filme
- [ ] Poltronas ficam verdes ao clicar
- [ ] Clicar de novo desseleciona
- [ ] Confirmar funciona
- [ ] Poltronas ficam vermelhas
- [ ] Dados salvos no banco
- [ ] Admin pode limpar sala

---

## 🗑️ **ARQUIVOS QUE PODEM SER DELETADOS:**

Agora que tudo está unificado, estes arquivos **NÃO são mais necessários**:

- ❌ `api/poltronas-api.js` (integrado no index.js)
- ❌ `api/start-poltronas.bat` (não precisa mais)
- ❌ `api/poltronas.sqlite` (se existir)

**Mantenha apenas:**
- ✅ `api/index.js` (API unificada)
- ✅ `api/database.sqlite` (banco unificado)

---

## 🎉 **SISTEMA COMPLETO E UNIFICADO!**

**Agora você tem:**
- ✅ Uma só API (porta 3000)
- ✅ Três tabelas organizadas
- ✅ Sistema completo de poltronas
- ✅ CRUD de filmes
- ✅ Histórico de reservas
- ✅ Controle individual de poltronas
- ✅ Admin pode gerenciar
- ✅ Cliente pode reservar/cancelar
- ✅ Simples, organizado e profissional!

**Inicie a API e teste!** 🚀✨


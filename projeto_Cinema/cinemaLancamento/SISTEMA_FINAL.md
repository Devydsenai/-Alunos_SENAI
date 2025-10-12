# 🎬 SISTEMA FINAL - COMO FUNCIONA

## ✅ **ARQUITETURA DO SISTEMA:**

### **1. FILMES (TMDB API):**
- 🌐 **Fonte:** The Movie Database (TMDB)
- 📡 **API Externa:** https://api.themoviedb.org/3
- 🎬 **Fornece:** Filmes em cartaz, lançamentos, trailers, imagens
- ✅ **Não precisa de API local**

### **2. POLTRONAS (API Local):**
- 🏠 **Fonte:** Sua API local
- 📡 **Porta:** 3000
- 💾 **Banco:** poltronas.sqlite
- 🎫 **Gerencia:** Reservas de poltronas

---

## 🚀 **COMO INICIAR:**

### **1. Iniciar API de Poltronas:**
```bash
cd api
node index.js
```

**Deve aparecer:**
```
✅ Banco de Poltronas conectado!
🎬 API de Poltronas rodando na porta 3000
📡 http://localhost:3000
```

### **2. Iniciar App:**
```bash
npx expo start --clear
```

**Pressione `w` para abrir no navegador**

---

## 🎯 **FLUXO DO SISTEMA:**

### **1. HOME (Filmes do TMDB):**
- ✅ Carrega filmes do TMDB
- ✅ Mostra em cartaz e lançamentos
- ✅ Badges: Disponível/Esgotado

### **2. SELECIONAR FILME:**
- ✅ Clique no pôster
- ✅ Abre tela de poltronas

### **3. SELECIONAR POLTRONAS:**
- ⚪ **Cinza** = Disponível
- 🟢 **Verde** = Selecionada (você agora)
- 🔴 **Vermelha** = Ocupada (já reservada)

**FUNCIONALIDADES:**
- Clique para selecionar → Verde
- Clique de novo → Desseleciona (cinza)

### **4. CONFIRMAR RESERVA:**
1. Clique "Confirmar (X poltronas)"
2. Alert aparece
3. Clique "Confirmar"
4. **Poltronas ficam VERMELHAS** 🔴
5. Salva na API
6. Alert de sucesso
7. Clique "OK" → Volta para Home

---

## 📡 **ENDPOINTS DA API (porta 3000):**

### **Listar Poltronas de um Filme:**
```
GET /poltronas/filme/:filmeId
Exemplo: GET http://localhost:3000/poltronas/filme/639721
```

### **Reservar Poltronas:**
```
POST /poltronas/reservar
Body: {
  "filmeId": "639721",
  "filmeTitulo": "Demon Slayer",
  "poltronas": ["D5", "D6"],
  "clienteNome": "Cliente",
  "clienteEmail": "cliente@cinema.com"
}
```

### **Cancelar Reserva:**
```
DELETE /poltronas/cancelar/:filmeId/:poltrona
Exemplo: DELETE http://localhost:3000/poltronas/cancelar/639721/D5
```

### **Limpar Sala (Admin):**
```
DELETE /poltronas/filme/:filmeId
Exemplo: DELETE http://localhost:3000/poltronas/filme/639721
```

### **Listar Todas:**
```
GET /poltronas
```

---

## 💾 **BANCO DE DADOS:**

### **Arquivo:** `api/poltronas.sqlite`

### **Tabela: `poltronas`**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INTEGER | Chave primária |
| filmeId | STRING | ID do filme (do TMDB) |
| filmeTitulo | STRING | Nome do filme |
| poltrona | STRING | Ex: "D5" |
| status | STRING | disponivel/reservada |
| clienteNome | STRING | Nome do cliente |
| clienteEmail | STRING | Email do cliente |
| total | DECIMAL | Valor (R$ 25/poltrona) |
| dataReserva | DATE | Data da reserva |

---

## 🎨 **VISUAL DO SISTEMA:**

### **CLIENTE:**

```
1. Home (TMDB) 🎬
   ↓ (clica no filme)

2. Tela de Poltronas 🪑
   ↓ (clica em poltronas)

3. Poltronas VERDES 🟢
   ↓ (clica "Confirmar")

4. Alert de Confirmação 📱
   ↓ (clica "Confirmar")

5. API Salva 💾
   Poltronas VERMELHAS 🔴
   Alert de Sucesso 📱
   ↓ (clica "OK")

6. Volta para Home 🏠
```

### **ADMIN:**

```
1. Desocupar Sala 🔧
   ↓

2. Confirmação 📱
   ↓ (clica "Desocupar")

3. API Limpa 🗑️
   Todas CINZAS ⚪
   ↓

4. Sala Liberada ✅
```

---

## 🔧 **FUNCIONALIDADES:**

### **CLIENTE:**
- ✅ Ver filmes do TMDB
- ✅ Selecionar poltronas (verde)
- ✅ Desselecionar (clique de novo)
- ✅ Confirmar reserva
- ✅ Poltronas ficam vermelhas
- ✅ Dados salvos na API

### **ADMIN:**
- ✅ Mudar disponibilidade dos filmes
- ✅ Desocupar sala completa
- ✅ Liberar poltronas

---

## 📋 **TESTE PASSO A PASSO:**

### **1. Verifique a API:**
```bash
curl http://localhost:3000
```
**Resposta esperada:**
```json
{
  "status": "ok",
  "message": "API de Poltronas rodando!"
}
```

### **2. Recarregue o App:**
```
Ctrl + R no navegador
```

### **3. Teste a Reserva:**
1. Home → Clique em filme
2. Clique em D5 → Verde
3. Clique em D6 → Verde
4. Clique "Confirmar (2 poltronas)"
5. Alert aparece
6. Clique "Confirmar"
7. **D5 e D6 ficam VERMELHAS**
8. Alert de sucesso
9. Clique "OK"

### **4. Verifique no Banco:**
```bash
curl http://localhost:3000/poltronas/filme/639721
```

**Deve mostrar as poltronas reservadas!**

---

## ✅ **SISTEMA COMPLETO:**

**FONTES DE DADOS:**
- 🌐 **TMDB** → Filmes (gratuito, sem limite)
- 🏠 **API Local** → Poltronas (seu banco)

**VANTAGENS:**
- ✅ Não precisa cadastrar filmes manualmente
- ✅ Sempre atualizado com TMDB
- ✅ Foco apenas nas reservas
- ✅ Simples e eficiente

---

## 🎉 **PRONTO!**

**Sistema funcionando:**
- ✅ Filmes do TMDB
- ✅ Poltronas na API local
- ✅ Reservas funcionando
- ✅ Visual intuitivo
- ✅ Admin pode gerenciar

**Recarregue o navegador e teste agora!** 🚀✨




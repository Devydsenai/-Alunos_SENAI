# 🎬 SISTEMA COMPLETO - CINEMA COM RESERVAS

## ✅ **COMO FUNCIONA:**

### **ARQUITETURA:**

#### **1. FILMES:**
- 🌐 **TMDB API** (The Movie Database)
- ✅ Filmes populares, em cartaz, lançamentos
- ✅ Sem necessidade de cadastro manual
- ✅ Gratuito e sempre atualizado

#### **2. POLTRONAS:**
- 🏠 **API Local** (porta 3000)
- 💾 **Banco:** `poltronas.sqlite`
- ✅ Salva todas as reservas
- ✅ Persistência permanente

---

## 🎯 **FLUXO COMPLETO:**

### **CLIENTE - FAZER RESERVA:**

```
1. HOME (Filmes do TMDB)
   ↓ (clica no filme)

2. TELA DE POLTRONAS
   ↓ (clica em D5, D6)

3. Poltronas VERDES 🟢
   ↓ (clica "Confirmar")

4. API SALVA NO BANCO 💾
   {
     "filmeId": "639721",
     "filmeTitulo": "Demon Slayer",
     "poltronas": ["D5", "D6"],
     "total": 50.00
   }

5. Poltronas VERMELHAS 🔴
   Alert de Sucesso 📱
   ↓ (clica "OK")

6. Volta para HOME 🏠
```

### **ADMIN - LIMPAR SALA:**

```
1. TELA DE POLTRONAS
   (vê poltronas vermelhas)
   ↓ (clica "Desocupar Sala")

2. Confirmação 📱
   ↓ (clica "Desocupar")

3. API DELETA DO BANCO 🗑️
   DELETE /poltronas/filme/639721

4. Todas CINZAS ⚪
   Sala pronta para próxima sessão ✅
```

---

## 💾 **BANCO DE DADOS:**

### **Tabela: `poltronas`**

Quando você confirma D5 e D6, salva assim:

```json
[
  {
    "id": 1,
    "filmeId": "639721",
    "filmeTitulo": "Demon Slayer",
    "poltrona": "D5",
    "status": "reservada",
    "clienteNome": "Cliente",
    "clienteEmail": "cliente@cinema.com",
    "total": "25.00",
    "dataReserva": "2025-10-10T19:30:00.000Z"
  },
  {
    "id": 2,
    "filmeId": "639721",
    "filmeTitulo": "Demon Slayer",
    "poltrona": "D6",
    "status": "reservada",
    "clienteNome": "Cliente",
    "clienteEmail": "cliente@cinema.com",
    "total": "25.00",
    "dataReserva": "2025-10-10T19:30:00.000Z"
  }
]
```

---

## 📡 **TESTAR O BANCO:**

### **1. Ver poltronas reservadas de um filme:**
```bash
curl http://localhost:3000/poltronas/filme/639721
```

### **2. Ver todas as reservas:**
```bash
curl http://localhost:3000/poltronas
```

### **3. Limpar sala (admin):**
```bash
curl -X DELETE http://localhost:3000/poltronas/filme/639721
```

---

## 🎨 **CICLO DE VIDA DA POLTRONA:**

### **CLIENTE RESERVA:**

```
⚪ CINZA (disponível)
↓ Cliente clica
🟢 VERDE (selecionada)
↓ Cliente confirma
💾 SALVA NO BANCO
🔴 VERMELHA (reservada)
```

### **PRÓXIMA VEZ QUE ABRIR:**

```
🔴 VERMELHA
↑
💾 Carrega do banco
↑
useEffect carrega poltronas ocupadas
```

### **ADMIN LIMPA SALA:**

```
🔴 VERMELHA (reservada)
↓ Admin clica "Desocupar Sala"
🗑️ DELETA DO BANCO
⚪ CINZA (disponível)
```

---

## 🔧 **FUNCIONALIDADES IMPLEMENTADAS:**

### **1. Persistência:**
- ✅ Poltronas salvas no banco
- ✅ Carrega poltronas ao abrir tela
- ✅ Permanece entre sessões

### **2. Admin:**
- ✅ Botão "Desocupar Sala"
- ✅ Limpa todas as poltronas
- ✅ Deleta do banco
- ✅ Prepara para próxima sessão

### **3. Visual:**
- ✅ Cinza = Disponível
- ✅ Verde = Selecionando agora
- ✅ Vermelho = Já reservada (do banco)

---

## 🚀 **COMO USAR:**

### **1. Iniciar API:**
```bash
cd api
node index.js
```

### **2. Teste Completo:**

#### **CLIENTE:**
1. Selecione filme
2. Clique em poltronas (verdes)
3. Confirme
4. Poltronas ficam vermelhas
5. **Salvo no banco!** 💾

#### **ADMIN:**
1. Faça login como admin
2. Entre na tela de poltronas
3. Clique "🔧 Desocupar Sala"
4. Confirme
5. Todas ficam cinzas
6. **Deletado do banco!** 🗑️

#### **PRÓXIMA SESSÃO:**
1. Abra a tela de poltronas de novo
2. Poltronas vermelhas ainda estão lá!
3. **Carregado do banco!** 📥

---

## 📊 **VERIFICAR DADOS:**

### **Ver reservas no navegador:**
```
http://localhost:3000/poltronas/filme/639721
```

### **Ver todas as reservas:**
```
http://localhost:3000/poltronas
```

---

## 🎉 **SISTEMA COMPLETO!**

**Agora você tem:**
- ✅ Filmes do TMDB (sempre atualizados)
- ✅ Poltronas no banco (persistentes)
- ✅ Reservas salvas (não some ao recarregar)
- ✅ Admin pode limpar sala
- ✅ Sistema profissional e funcional!

**Funcionalidades:**
1. ✅ **Reservar:** Poltronas → Salva no banco → Vermelhas
2. ✅ **Persistir:** Fecha e abre → Vermelhas continuam
3. ✅ **Limpar:** Admin → Deleta do banco → Cinzas

**Perfeito para demonstração e uso real!** 🚀✨




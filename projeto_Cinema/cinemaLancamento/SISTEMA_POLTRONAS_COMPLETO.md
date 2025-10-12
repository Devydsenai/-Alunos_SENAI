# 🎬 SISTEMA COMPLETO DE POLTRONAS

## ✅ **O QUE FOI CRIADO:**

### **1. API REST de Poltronas** (`api/poltronas-api.js`)
- Banco de dados SQLite independente
- CRUD completo de poltronas
- Sistema igual ao de clientes
- Porta 3001

### **2. Serviço Frontend** (`app/src/services/poltronas.ts`)
- Integração com a API
- TypeScript completo
- Funções para todas as operações

### **3. Tela de Poltronas Atualizada**
- Carrega poltronas ocupadas da API
- Salva reservas na API
- Permite desselecionar (clicar de novo)
- Admin pode limpar sala

---

## 🎯 **FUNCIONALIDADES:**

### **CLIENTE:**

#### **1. Selecionar Poltronas:**
- Clique na poltrona → Fica **VERDE** 🟢
- Clique de novo → **DESSELECIONA** (volta cinza)
- Poltronas vermelhas = ocupadas (não pode clicar)

#### **2. Confirmar Reserva:**
- Clique "Confirmar (X poltronas)"
- Alert de confirmação aparece
- Clique "Confirmar"
- **Poltronas ficam VERMELHAS** 🔴
- Salva na API
- Alert de sucesso

#### **3. Visualizar Poltronas:**
- ⚪ **Cinza** = Disponível
- 🟢 **Verde** = Selecionada (você agora)
- 🔴 **Vermelha** = Ocupada/Reservada

### **ADMIN:**

#### **1. Desocupar Sala:**
- Botão "🔧 Desocupar Sala"
- Libera TODAS as poltronas
- Apaga do banco de dados
- Sala fica pronta para próxima sessão

---

## 🚀 **COMO USAR:**

### **1. Iniciar API de Filmes (porta 3000):**
```bash
cd api
node index.js
```

### **2. Iniciar API de Poltronas (porta 3001):**
```bash
cd api
node poltronas-api.js
```

**OU duplo clique em:**
- `api/start-poltronas.bat`

### **3. Iniciar App:**
```bash
npx expo start --clear
```

---

## 📡 **ENDPOINTS DA API:**

### **Base URL:** `http://localhost:3001`

#### **1. Listar Poltronas de um Filme:**
```
GET /poltronas/filme/:filmeId

Exemplo:
GET http://localhost:3001/poltronas/filme/639721

Response:
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
    "dataReserva": "2025-10-10T18:45:00.000Z"
  }
]
```

#### **2. Reservar Poltronas:**
```
POST /poltronas/reservar

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

#### **3. Cancelar Reserva:**
```
DELETE /poltronas/cancelar/:filmeId/:poltrona

Exemplo:
DELETE http://localhost:3001/poltronas/cancelar/639721/D5

Response:
{
  "message": "Reserva cancelada com sucesso!",
  "poltrona": "D5"
}
```

#### **4. Limpar Sala (Admin):**
```
DELETE /poltronas/filme/:filmeId

Exemplo:
DELETE http://localhost:3001/poltronas/filme/639721

Response:
{
  "message": "3 poltrona(s) liberada(s)!",
  "filmeId": "639721"
}
```

#### **5. Listar Todas as Reservas:**
```
GET /poltronas
GET /poltronas?status=reservada
GET /poltronas?clienteEmail=joao@email.com
```

---

## 💾 **BANCO DE DADOS:**

### **Arquivo:** `api/poltronas.sqlite`

### **Tabela: `poltronas`**
```sql
CREATE TABLE poltronas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filmeId VARCHAR NOT NULL,
  filmeTitulo VARCHAR NOT NULL,
  poltrona VARCHAR NOT NULL,
  status VARCHAR NOT NULL DEFAULT 'disponivel',
  clienteNome VARCHAR,
  clienteEmail VARCHAR,
  total DECIMAL(10,2),
  dataReserva DATETIME,
  createdAt DATETIME,
  updatedAt DATETIME,
  UNIQUE(filmeId, poltrona)
);
```

---

## 🎨 **FLUXO VISUAL:**

### **CLIENTE:**

```
1. Poltrona CINZA ⚪
   ↓ (clica)
2. Poltrona VERDE 🟢
   ↓ (clica "Confirmar")
3. Alert de Confirmação 📱
   ↓ (clica "Confirmar")
4. Poltrona VERMELHA 🔴
   + Salva na API 💾
   + Alert de Sucesso 📱
   ↓ (clica "OK")
5. Volta para Home 🏠
```

### **DESSELECIONAR:**

```
1. Poltrona VERDE 🟢 (selecionada)
   ↓ (clica de novo)
2. Poltrona CINZA ⚪ (desselecionada)
```

### **ADMIN - LIMPAR SALA:**

```
1. Poltronas VERMELHAS 🔴🔴🔴
   ↓ (admin clica "Desocupar Sala")
2. Confirmação 📱
   ↓ (clica "Desocupar")
3. Todas CINZAS ⚪⚪⚪
   + Apaga do banco 🗑️
   + Sala liberada ✅
```

---

## 🧪 **TESTAR O SISTEMA:**

### **Teste 1: Reservar Poltronas**
1. Inicie ambas as APIs (3000 e 3001)
2. Abra o app
3. Selecione um filme
4. Clique em 3 poltronas (ficam verdes)
5. Clique "Confirmar (3 poltronas)"
6. Clique "Confirmar" no alert
7. **Resultado:**
   - Poltronas ficam vermelhas
   - Alert de sucesso aparece
   - Banco salvo

### **Teste 2: Verificar no Banco**
```
GET http://localhost:3001/poltronas/filme/639721
```

### **Teste 3: Desselecionar**
1. Clique em uma poltrona (fica verde)
2. Clique de novo na mesma
3. **Resultado:** Fica cinza novamente

### **Teste 4: Admin Limpar Sala**
1. Faça login como admin
2. Vá para poltronas
3. Clique "Desocupar Sala"
4. Confirme
5. **Resultado:** Todas as poltronas ficam cinzas

---

## ✅ **VANTAGENS DO SISTEMA:**

### **1. Banco de Dados Separado:**
- `database.sqlite` → Filmes
- `poltronas.sqlite` → Poltronas
- Organização melhor
- Fácil limpar poltronas sem afetar filmes

### **2. API REST Completa:**
- CRUD completo
- Endpoints claros
- Fácil integração
- Igual sistema de clientes

### **3. Funcionalidades:**
- ✅ Selecionar/Desselecionar
- ✅ Reservar
- ✅ Cancelar
- ✅ Limpar sala (admin)
- ✅ Persistência real
- ✅ Consultas por filme
- ✅ Consultas por cliente

### **4. Visual Intuitivo:**
- Cores claras (cinza/verde/vermelho)
- Clicar de novo = desselecionar
- Mensagens na tela
- Feedback imediato

---

## 🎉 **SISTEMA PRONTO!**

**Agora você tem:**
- ✅ API de Filmes (porta 3000)
- ✅ API de Poltronas (porta 3001)
- ✅ Sistema completo de reservas
- ✅ Admin pode gerenciar
- ✅ Cliente pode reservar/cancelar
- ✅ Tudo salvo no banco
- ✅ Organizado e profissional

**Inicie as 2 APIs e teste!** 🚀✨




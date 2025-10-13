# 📡 Documentação da API

## Base URL
```
http://localhost:3000
```

## Autenticação
Atualmente a API não requer autenticação (CORS aberto).

---

## 📌 Endpoints - Clientes/Fornecedores

### GET /clientes
Lista todos os clientes/fornecedores cadastrados.

**Query Parameters:**
- `limit` (number, opcional): Limite de resultados (max: 1000, default: 100)
- `offset` (number, opcional): Offset para paginação (default: 0)
- `nome` (string, opcional): Filtrar por nome (busca parcial)
- `email` (string, opcional): Filtrar por email (busca exata)
- `ativo` (boolean, opcional): Filtrar por status

**Response 200:**
```json
[
  {
    "codigo": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "11999999999",
    "ativo": true,
    "foto": "file:///path/to/photo.jpg",
    "createdAt": "2025-10-13T10:00:00.000Z",
    "updatedAt": "2025-10-13T10:00:00.000Z"
  }
]
```

**Exemplo:**
```bash
GET /clientes?limit=10&ativo=true
```

---

### GET /clientes/:codigo
Busca um cliente específico por código.

**Path Parameters:**
- `codigo` (number, required): Código do cliente

**Response 200:**
```json
{
  "codigo": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "11999999999",
  "ativo": true,
  "foto": "file:///path/to/photo.jpg",
  "createdAt": "2025-10-13T10:00:00.000Z",
  "updatedAt": "2025-10-13T10:00:00.000Z"
}
```

**Response 404:**
```json
{
  "error": "Cliente não encontrado"
}
```

---

### POST /clientes
Cria um novo cliente/fornecedor.

**Request Body:**
```json
{
  "nome": "Maria Santos",
  "email": "maria@email.com",
  "telefone": "11888888888",
  "ativo": true,
  "foto": "file:///path/to/photo.jpg"
}
```

**Campos:**
- `nome` (string, required): Nome completo
- `email` (string, required): Email válido
- `telefone` (string, opcional): Telefone
- `ativo` (boolean, opcional): Status (default: true)
- `foto` (string, opcional): URI da foto

**Response 201:**
```json
{
  "codigo": 2,
  "nome": "Maria Santos",
  "email": "maria@email.com",
  "telefone": "11888888888",
  "ativo": true,
  "foto": "file:///path/to/photo.jpg",
  "createdAt": "2025-10-13T11:00:00.000Z",
  "updatedAt": "2025-10-13T11:00:00.000Z"
}
```

**Response 400:**
```json
{
  "error": ["Validation error message"]
}
```

**Response 409:**
```json
{
  "error": "E-mail já cadastrado"
}
```

---

### PUT /clientes/:codigo
Atualiza todos os campos de um cliente.

**Path Parameters:**
- `codigo` (number, required): Código do cliente

**Request Body:**
```json
{
  "nome": "João Silva Santos",
  "email": "joao.silva@email.com",
  "telefone": "11977777777",
  "ativo": true,
  "foto": "file:///path/to/new-photo.jpg"
}
```

**Response 200:**
```json
{
  "codigo": 1,
  "nome": "João Silva Santos",
  "email": "joao.silva@email.com",
  "telefone": "11977777777",
  "ativo": true,
  "foto": "file:///path/to/new-photo.jpg",
  "createdAt": "2025-10-13T10:00:00.000Z",
  "updatedAt": "2025-10-13T12:00:00.000Z"
}
```

---

### PATCH /clientes/:codigo
Atualiza campos específicos de um cliente.

**Path Parameters:**
- `codigo` (number, required): Código do cliente

**Request Body (exemplo - apenas ativo):**
```json
{
  "ativo": false
}
```

**Response 200:**
```json
{
  "codigo": 1,
  "nome": "João Silva Santos",
  "email": "joao.silva@email.com",
  "telefone": "11977777777",
  "ativo": false,
  "foto": "file:///path/to/new-photo.jpg",
  "createdAt": "2025-10-13T10:00:00.000Z",
  "updatedAt": "2025-10-13T12:30:00.000Z"
}
```

---

### DELETE /clientes/:codigo
Remove um cliente do sistema.

**Path Parameters:**
- `codigo` (number, required): Código do cliente

**Response 200:**
```json
{
  "message": "Cliente removido"
}
```

**Response 404:**
```json
{
  "error": "Cliente não encontrado"
}
```

---

## 📦 Endpoints - Produtos (Em Desenvolvimento)

### GET /produtos
Lista todos os produtos.

### GET /produtos/:codigo
Busca produto por código.

### POST /produtos
Cria novo produto.

### PUT /produtos/:codigo
Atualiza produto.

### DELETE /produtos/:codigo
Remove produto.

---

## 📊 Endpoints - Estoque (Em Desenvolvimento)

### GET /estoque
Lista estoque atual.

### GET /estoque/baixo
Lista produtos com estoque abaixo do mínimo.

### PATCH /estoque/:produto_id
Atualiza quantidade em estoque.

---

## 📝 Endpoints - Movimentações (Em Desenvolvimento)

### GET /movimentacoes
Lista movimentações.

### GET /movimentacoes/produto/:produto_id
Histórico de um produto.

### POST /movimentacoes
Registra nova movimentação (entrada/saída).

---

## 🏷️ Endpoints - Categorias (Em Desenvolvimento)

### GET /categorias
Lista todas as categorias.

### POST /categorias
Cria nova categoria.

### PUT /categorias/:codigo
Atualiza categoria.

### DELETE /categorias/:codigo
Remove categoria.

---

## 🔍 Códigos de Status HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado |
| 400 | Bad Request - Erro de validação |
| 404 | Not Found - Recurso não encontrado |
| 409 | Conflict - Conflito (ex: email duplicado) |
| 500 | Internal Server Error - Erro no servidor |

---

## 🧪 Exemplos de Uso

### cURL

**Criar cliente:**
```bash
curl -X POST http://localhost:3000/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Pedro Costa",
    "email": "pedro@email.com",
    "telefone": "11966666666",
    "ativo": true
  }'
```

**Listar clientes ativos:**
```bash
curl http://localhost:3000/clientes?ativo=true
```

**Buscar cliente específico:**
```bash
curl http://localhost:3000/clientes/1
```

**Desativar cliente:**
```bash
curl -X PATCH http://localhost:3000/clientes/1 \
  -H "Content-Type: application/json" \
  -d '{"ativo": false}'
```

**Deletar cliente:**
```bash
curl -X DELETE http://localhost:3000/clientes/1
```

### JavaScript/Fetch

**Criar cliente:**
```javascript
const response = await fetch('http://localhost:3000/clientes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nome: 'Ana Silva',
    email: 'ana@email.com',
    telefone: '11955555555',
    ativo: true,
    foto: 'file:///path/to/photo.jpg'
  })
});

const data = await response.json();
console.log(data);
```

**Listar clientes:**
```javascript
const response = await fetch('http://localhost:3000/clientes');
const clientes = await response.json();
console.log(clientes);
```

---

## 🗄️ Modelo de Dados

### Cliente
```typescript
interface Cliente {
  codigo: number;          // PK, auto-increment
  nome: string;           // required
  email: string;          // required, email válido
  telefone?: string;      // opcional
  ativo: boolean;         // default: true
  foto?: string;          // opcional, URI
  createdAt: Date;        // automático
  updatedAt: Date;        // automático
}
```

### Produto (Planejado)
```typescript
interface Produto {
  codigo: number;
  nome: string;
  descricao?: string;
  categoria_id: number;
  fornecedor_id: number;  // FK -> Cliente
  foto?: string;
  codigo_barras?: string;
  preco_custo: number;
  preco_venda: number;
  estoque_minimo: number;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Estoque (Planejado)
```typescript
interface Estoque {
  produto_id: number;     // FK -> Produto
  quantidade_atual: number;
  localizacao?: string;
  data_ultima_mov: Date;
}
```

### Movimentação (Planejado)
```typescript
interface Movimentacao {
  codigo: number;
  tipo: 'entrada' | 'saida';
  produto_id: number;     // FK -> Produto
  quantidade: number;
  data: Date;
  usuario?: string;
  observacao?: string;
  createdAt: Date;
}
```

---

## 🚀 Executando a API

### Desenvolvimento
```bash
cd api
npm run dev
```

### Produção
```bash
cd api
npm start
```

### Testando
```bash
# Health check
curl http://localhost:3000/

# Resposta esperada:
# {"status":"ok"}
```

---

## 🔧 Configuração

A API usa as seguintes configurações:

- **Porta:** 3000 (configurável via `process.env.PORT`)
- **Banco:** SQLite (`database.sqlite`)
- **CORS:** Aberto para todas as origens
- **Body Limit:** JSON ilimitado
- **Logging:** Desabilitado em produção

---

## 📝 Notas

- A API preserva dados entre reinicializações
- Use `force: true` no Sequelize para resetar o banco (cuidado!)
- Fotos são armazenadas como URI (string) no banco
- Timestamps são UTC
- IDs são auto-incrementais


# API de Clientes - SENAI

API REST para gerenciar clientes com suporte a fotos 3x4.

## 🚀 Como rodar a API

### Desenvolvimento (com auto-reload)
```bash
npm run dev
```
A API reinicia automaticamente quando você faz alterações no código!

### Produção
```bash
npm start
```

## 📦 Instalação

```bash
npm install
```

## 🔧 Funcionalidades

- ✅ CRUD completo de clientes
- ✅ Suporte para fotos 3x4
- ✅ Validação de e-mail
- ✅ Status ativo/inativo
- ✅ Auto-reload em desenvolvimento

## 📡 Endpoints

- `GET /` - Health check
- `GET /clientes` - Listar todos os clientes
- `GET /clientes/:codigo` - Buscar cliente por código
- `POST /clientes` - Criar novo cliente
- `PUT /clientes/:codigo` - Atualizar cliente completo
- `PATCH /clientes/:codigo` - Atualizar campos específicos
- `DELETE /clientes/:codigo` - Deletar cliente

## 📄 Estrutura do Cliente

```json
{
  "codigo": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "11999999999",
  "ativo": true,
  "foto": "file:///path/to/photo.jpg"
}
```

## 🗄️ Banco de Dados

- SQLite (arquivo `database.sqlite`)
- Os dados são preservados entre reinicializações
- Para resetar o banco, delete o arquivo `database.sqlite`

## ⚙️ Configurações

- Porta padrão: `3000`
- CORS: habilitado para todas as origens
- Auto-reload: ativado em modo `dev`

## 🛠️ Tecnologias

- Node.js
- Express
- Sequelize
- SQLite3
- Nodemon (desenvolvimento)

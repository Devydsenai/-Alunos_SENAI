# API REST - Sistema de Clientes SENAI

Esta é uma API REST simples desenvolvida para alunos iniciantes do SENAI.

## Como usar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar a API:**
   ```bash
   npm start
   ```

3. **A API estará rodando em:** `http://localhost:3000`

## Endpoints disponíveis

- `GET /` - Health check (verificar se a API está funcionando)
- `GET /clientes` - Listar todos os clientes
- `GET /clientes/:codigo` - Buscar cliente por código
- `POST /clientes` - Criar novo cliente
- `PUT /clientes/:codigo` - Atualizar cliente completo
- `PATCH /clientes/:codigo` - Atualizar campos específicos do cliente
- `DELETE /clientes/:codigo` - Excluir cliente

## Exemplo de uso

### Criar um cliente:
```bash
curl -X POST http://localhost:3000/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva","email":"joao@email.com","telefone":"11999999999","ativo":true}'
```

### Listar clientes:
```bash
curl http://localhost:3000/clientes
```

## Banco de dados

A API usa SQLite como banco de dados. O arquivo `database.sqlite` será criado automaticamente quando você executar a API pela primeira vez.

## Estrutura do Cliente

```json
{
  "codigo": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "11999999999",
  "ativo": true
}
```

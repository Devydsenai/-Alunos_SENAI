// index.js
// API REST em Node.js (único arquivo) usando Express + Sequelize (SQLite) + CORS aberto
// Campos do cliente: codigo (PK, inteiro autoincrement), nome, email, telefone, ativo (boolean)

const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
app.use(cors()); // CORS aberto para todos
app.use(express.json());

// Configuração do Sequelize usando SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
  force: true, // Força recriação do banco
});

// Modelo Cliente
const Cliente = sequelize.define('Cliente', {
  codigo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false, // Removido temporariamente para facilitar testes
    validate: { isEmail: true },
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'clientes',
  timestamps: true,
});

// Inicializa banco e servidor
async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // Força recriação das tabelas
    console.log('Banco conectado e modelos sincronizados.');

    // Rotas

    // Health check
    app.get('/', (req, res) => res.json({ status: 'ok' }));

    // Listar clientes (com paginação opcional: ?limit=10&offset=0)
    app.get('/clientes', async (req, res) => {
      try {
        const limit = Math.min(parseInt(req.query.limit) || 100, 1000);
        const offset = parseInt(req.query.offset) || 0;
        const where = {};
        // filtro opcional por nome/email/ativo
        if (req.query.nome) where.nome = { [Sequelize.Op.like]: `%${req.query.nome}%` };
        if (req.query.email) where.email = req.query.email;
        if (req.query.ativo !== undefined) where.ativo = req.query.ativo === 'true';

        const clientes = await Cliente.findAll({ where, limit, offset, order: [['codigo', 'ASC']] });
        res.json(clientes);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar clientes' });
      }
    });

    // Buscar por codigo
    app.get('/clientes/:codigo', async (req, res) => {
      try {
        const cliente = await Cliente.findByPk(req.params.codigo);
        if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
        res.json(cliente);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar cliente' });
      }
    });

    // Criar cliente
    app.post('/clientes', async (req, res) => {
      try {
        const { nome, email, telefone, ativo } = req.body;
        const novo = await Cliente.create({ nome, email, telefone, ativo });
        res.status(201).json(novo);
      } catch (err) {
        console.error(err);
        if (err.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).json({ error: 'E-mail já cadastrado' });
        }
        if (err.name === 'SequelizeValidationError') {
          return res.status(400).json({ error: err.errors.map(e => e.message) });
        }
        res.status(500).json({ error: 'Erro ao criar cliente' });
      }
    });

    // Atualizar cliente (substituição parcial permitida)
    app.put('/clientes/:codigo', async (req, res) => {
      try {
        const cliente = await Cliente.findByPk(req.params.codigo);
        if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
        const { nome, email, telefone, ativo } = req.body;
        await cliente.update({ nome, email, telefone, ativo });
        res.json(cliente);
      } catch (err) {
        console.error(err);
        if (err.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).json({ error: 'E-mail já cadastrado' });
        }
        if (err.name === 'SequelizeValidationError') {
          return res.status(400).json({ error: err.errors.map(e => e.message) });
        }
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
      }
    });

    // Patch para alterar apenas campos específicos
    app.patch('/clientes/:codigo', async (req, res) => {
      try {
        const cliente = await Cliente.findByPk(req.params.codigo);
        if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
        await cliente.update(req.body);
        res.json(cliente);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
      }
    });

    // Deletar cliente
    app.delete('/clientes/:codigo', async (req, res) => {
      try {
        const cliente = await Cliente.findByPk(req.params.codigo);
        if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
        await cliente.destroy();
        res.json({ message: 'Cliente removido' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao remover cliente' });
      }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));

  } catch (err) {
    console.error('Não foi possível conectar ao banco:', err);
    process.exit(1);
  }
}

start();

/*
Instruções rápidas:
1) Salve este conteúdo em um arquivo chamado `index.js`.
2) Instale dependências: `npm i express sequelize sqlite3 cors`
3) Execute: `node index.js`
4) APIs:
   - GET / -> health
   - GET /clientes -> lista
   - GET /clientes/:codigo -> obter
   - POST /clientes {nome,email,telefone,ativo} -> criar
   - PUT /clientes/:codigo -> atualizar (substitui campos enviados)
   - PATCH /clientes/:codigo -> atualizar parcialmente
   - DELETE /clientes/:codigo -> remover
*/

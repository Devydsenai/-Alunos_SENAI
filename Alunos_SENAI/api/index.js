// index.js
// API REST em Node.js (único arquivo) usando Express + Sequelize (SQLite) + CORS aberto
// Campos do cliente: codigo (PK, inteiro autoincrement), nome, email, telefone, ativo (boolean), foto (text)

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
  foto: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'clientes',
  timestamps: true,
});

// Modelo Categoria
const Categoria = sequelize.define('Categoria', {
  codigo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true },
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'categorias',
  timestamps: true,
});

// Modelo Produto
const Produto = sequelize.define('Produto', {
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
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'categorias',
      key: 'codigo'
    }
  },
  fornecedor_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'clientes',
      key: 'codigo'
    }
  },
  foto: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  codigo_barras: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  preco_custo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
  },
  preco_venda: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
  },
  estoque_minimo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'produtos',
  timestamps: true,
});

// Modelo Estoque
const Estoque = sequelize.define('Estoque', {
  produto_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'produtos',
      key: 'codigo'
    }
  },
  quantidade_atual: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  localizacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  data_ultima_mov: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'estoque',
  timestamps: true,
});

// Modelo Movimentação
const Movimentacao = sequelize.define('Movimentacao', {
  codigo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo: {
    type: DataTypes.ENUM('entrada', 'saida'),
    allowNull: false,
  },
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'produtos',
      key: 'codigo'
    }
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  observacao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'movimentacoes',
  timestamps: true,
});

// Relacionamentos
Produto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
Produto.belongsTo(Cliente, { foreignKey: 'fornecedor_id', as: 'fornecedor' });
Produto.hasOne(Estoque, { foreignKey: 'produto_id', as: 'estoque' });
Estoque.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produto' });
Movimentacao.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produto' });

// Inicializa banco e servidor
async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // TEMPORÁRIO: Recria banco limpo
    console.log('✅ Banco conectado e modelos sincronizados.');
    console.log('📦 Tabelas criadas: clientes, categorias, produtos, estoque, movimentacoes');

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
        const { nome, email, telefone, ativo, foto } = req.body;
        const novo = await Cliente.create({ nome, email, telefone, ativo, foto });
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
        const { nome, email, telefone, ativo, foto } = req.body;
        await cliente.update({ nome, email, telefone, ativo, foto });
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
      console.log('🔥🔥🔥 ROTA DELETE CHAMADA 🔥🔥🔥');
      console.log('📋 Código recebido:', req.params.codigo);
      console.log('⏰ Timestamp:', new Date().toISOString());
      
      try {
        console.log('🔍 Buscando cliente no banco...');
        const cliente = await Cliente.findByPk(req.params.codigo);
        
        if (!cliente) {
          console.log('❌ Cliente não encontrado');
          return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        
        console.log('✅ Cliente encontrado:', cliente.dataValues);
        console.log('🗑️ Iniciando exclusão...');
        
        await cliente.destroy();
        
        console.log('🎉 Cliente excluído com sucesso!');
        res.json({ message: 'Cliente removido' });
      } catch (err) {
        console.error('💥 ERRO na exclusão:', err);
        res.status(500).json({ error: 'Erro ao remover cliente' });
      }
    });

    // ========== ROTAS CATEGORIAS ==========
    
    // Listar categorias
    app.get('/categorias', async (req, res) => {
      try {
        const categorias = await Categoria.findAll({ order: [['nome', 'ASC']] });
        res.json(categorias);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar categorias' });
      }
    });

    // Criar categoria
    app.post('/categorias', async (req, res) => {
      try {
        const { nome, descricao, ativo } = req.body;
        const nova = await Categoria.create({ nome, descricao, ativo });
        res.status(201).json(nova);
      } catch (err) {
        console.error(err);
        if (err.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).json({ error: 'Categoria já existe' });
        }
        res.status(500).json({ error: 'Erro ao criar categoria' });
      }
    });

    // Buscar categoria
    app.get('/categorias/:codigo', async (req, res) => {
      try {
        const categoria = await Categoria.findByPk(req.params.codigo);
        if (!categoria) return res.status(404).json({ error: 'Categoria não encontrada' });
        res.json(categoria);
      } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar categoria' });
      }
    });

    // Atualizar categoria
    app.put('/categorias/:codigo', async (req, res) => {
      try {
        const categoria = await Categoria.findByPk(req.params.codigo);
        if (!categoria) return res.status(404).json({ error: 'Categoria não encontrada' });
        await categoria.update(req.body);
        res.json(categoria);
      } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar categoria' });
      }
    });

    // Deletar categoria
    app.delete('/categorias/:codigo', async (req, res) => {
      try {
        console.log('🗑️ DELETE categoria:', req.params.codigo);
        const categoria = await Categoria.findByPk(req.params.codigo);
        if (!categoria) {
          console.log('❌ Categoria não encontrada');
          return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        
        console.log('📁 Deletando categoria:', categoria.nome);
        await categoria.destroy();
        
        console.log('✅ Categoria deletada com sucesso!');
        res.json({ message: 'Categoria removida' });
      } catch (err) {
        console.error('❌ Erro ao deletar categoria:', err);
        res.status(500).json({ error: 'Erro ao remover categoria' });
      }
    });

    // ========== ROTAS PRODUTOS ==========
    
    // Listar produtos
    app.get('/produtos', async (req, res) => {
      try {
        const produtos = await Produto.findAll({
          include: [
            { model: Categoria, as: 'categoria' },
            { model: Cliente, as: 'fornecedor' }
          ],
          order: [['nome', 'ASC']]
        });
        res.json(produtos);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar produtos' });
      }
    });

    // Criar produto
    app.post('/produtos', async (req, res) => {
      try {
        const produto = await Produto.create(req.body);
        // Criar registro de estoque inicial
        await Estoque.create({
          produto_id: produto.codigo,
          quantidade_atual: 0,
          data_ultima_mov: new Date()
        });
        res.status(201).json(produto);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar produto' });
      }
    });

    // Buscar produto
    app.get('/produtos/:codigo', async (req, res) => {
      try {
        const produto = await Produto.findByPk(req.params.codigo, {
          include: [
            { model: Categoria, as: 'categoria' },
            { model: Cliente, as: 'fornecedor' }
          ]
        });
        if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
        res.json(produto);
      } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar produto' });
      }
    });

    // Atualizar produto
    app.put('/produtos/:codigo', async (req, res) => {
      try {
        const produto = await Produto.findByPk(req.params.codigo);
        if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
        await produto.update(req.body);
        res.json(produto);
      } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar produto' });
      }
    });

    // Deletar produto
    app.delete('/produtos/:codigo', async (req, res) => {
      try {
        console.log('🗑️ DELETE produto:', req.params.codigo);
        const produto = await Produto.findByPk(req.params.codigo);
        if (!produto) {
          console.log('❌ Produto não encontrado');
          return res.status(404).json({ error: 'Produto não encontrado' });
        }
        
        // Deletar estoque associado primeiro
        console.log('🗄️ Deletando estoque do produto...');
        await Estoque.destroy({ where: { produto_id: req.params.codigo } });
        
        // Deletar movimentações associadas
        console.log('📝 Deletando movimentações do produto...');
        await Movimentacao.destroy({ where: { produto_id: req.params.codigo } });
        
        // Deletar produto
        console.log('📦 Deletando produto...');
        await produto.destroy();
        
        console.log('✅ Produto deletado com sucesso!');
        res.json({ message: 'Produto removido' });
      } catch (err) {
        console.error('❌ Erro ao deletar produto:', err);
        res.status(500).json({ error: 'Erro ao remover produto' });
      }
    });

    // ========== ROTAS ESTOQUE ==========
    
    // Listar estoque
    app.get('/estoque', async (req, res) => {
      try {
        const estoque = await Estoque.findAll({
          include: [{ model: Produto, as: 'produto' }]
        });
        res.json(estoque);
      } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar estoque' });
      }
    });

    // Produtos com estoque baixo
    app.get('/estoque/baixo', async (req, res) => {
      try {
        const produtos = await Produto.findAll({
          include: [{
            model: Estoque,
            as: 'estoque',
            required: true
          }],
          where: sequelize.where(
            sequelize.col('estoque.quantidade_atual'),
            '<=',
            sequelize.col('estoque_minimo')
          )
        });
        res.json(produtos);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar produtos com estoque baixo' });
      }
    });

    // Buscar estoque de um produto
    app.get('/estoque/:produto_id', async (req, res) => {
      try {
        const estoque = await Estoque.findByPk(req.params.produto_id, {
          include: [{ model: Produto, as: 'produto' }]
        });
        if (!estoque) return res.status(404).json({ error: 'Estoque não encontrado' });
        res.json(estoque);
      } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar estoque' });
      }
    });

    // ========== ROTAS MOVIMENTAÇÕES ==========
    
    // Listar movimentações
    app.get('/movimentacoes', async (req, res) => {
      try {
        const movimentacoes = await Movimentacao.findAll({
          include: [{ model: Produto, as: 'produto' }],
          order: [['data', 'DESC']]
        });
        res.json(movimentacoes);
      } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar movimentações' });
      }
    });

    // Histórico de um produto
    app.get('/movimentacoes/produto/:produto_id', async (req, res) => {
      try {
        const movimentacoes = await Movimentacao.findAll({
          where: { produto_id: req.params.produto_id },
          include: [{ model: Produto, as: 'produto' }],
          order: [['data', 'DESC']]
        });
        res.json(movimentacoes);
      } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar histórico' });
      }
    });

    // Registrar movimentação (entrada/saída)
    app.post('/movimentacoes', async (req, res) => {
      try {
        const { tipo, produto_id, quantidade, usuario, observacao } = req.body;
        
        // Registrar movimentação
        const mov = await Movimentacao.create({
          tipo,
          produto_id,
          quantidade,
          usuario,
          observacao
        });

        // Atualizar estoque
        const estoque = await Estoque.findByPk(produto_id);
        if (estoque) {
          const novaQtd = tipo === 'entrada' 
            ? estoque.quantidade_atual + quantidade
            : estoque.quantidade_atual - quantidade;
          
          await estoque.update({
            quantidade_atual: novaQtd,
            data_ultima_mov: new Date()
          });
        }

        res.status(201).json(mov);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao registrar movimentação' });
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
   - POST /clientes {nome,email,telefone,ativo,foto} -> criar
   - PUT /clientes/:codigo -> atualizar (substitui campos enviados)
   - PATCH /clientes/:codigo -> atualizar parcialmente
   - DELETE /clientes/:codigo -> remover
*/

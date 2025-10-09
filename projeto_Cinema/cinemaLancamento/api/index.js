// index.js
// API REST em Node.js (único arquivo) usando Express + Sequelize (SQLite) + CORS aberto
// Campos do filme: todos os campos do JSON fornecido

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

// Modelo Filme
const Filme = sequelize.define('Filme', {
  codigo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  Year: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Rated: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Released: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Runtime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Genre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Director: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Writer: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
  Actors: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  Plot: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Language: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Awards: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  Poster: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  Metascore: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imdbRating: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imdbVotes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imdbID: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  Type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Response: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Images: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('Images');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('Images', JSON.stringify(value));
    }
  },
  ComingSoon: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  totalSeasons: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'filmes',
  timestamps: true,
});

// Inicializa banco e servidor
async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Banco conectado e modelos sincronizados.');

    // Rotas

    // Health check
    app.get('/', (req, res) => res.json({ status: 'ok', message: 'API de Filmes rodando!' }));

    // Listar filmes (com paginação opcional: ?limit=10&offset=0)
    app.get('/filmes', async (req, res) => {
      try {
        const limit = Math.min(parseInt(req.query.limit) || 100, 1000);
        const offset = parseInt(req.query.offset) || 0;
        const where = {};
        
        // filtro opcional por titulo, genero, tipo, etc
        if (req.query.title) where.Title = { [Sequelize.Op.like]: `%${req.query.title}%` };
        if (req.query.genre) where.Genre = { [Sequelize.Op.like]: `%${req.query.genre}%` };
        if (req.query.type) where.Type = req.query.type;
        if (req.query.comingSoon !== undefined) where.ComingSoon = req.query.comingSoon === 'true';
        if (req.query.year) where.Year = { [Sequelize.Op.like]: `%${req.query.year}%` };

        const filmes = await Filme.findAll({ 
          where, 
          limit, 
          offset, 
          order: [['codigo', 'ASC']] 
        });
        
        res.json(filmes);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar filmes' });
      }
    });

    // Buscar filmes em cartaz (não ComingSoon)
    app.get('/filmes/em-cartaz', async (req, res) => {
      try {
        const limit = Math.min(parseInt(req.query.limit) || 100, 1000);
        const offset = parseInt(req.query.offset) || 0;
        
        const filmes = await Filme.findAll({ 
          where: { ComingSoon: false },
          limit, 
          offset, 
          order: [['codigo', 'ASC']] 
        });
        
        res.json(filmes);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar filmes em cartaz' });
      }
    });

    // Buscar filmes em lançamento (ComingSoon)
    app.get('/filmes/lancamentos', async (req, res) => {
      try {
        const limit = Math.min(parseInt(req.query.limit) || 100, 1000);
        const offset = parseInt(req.query.offset) || 0;
        
        const filmes = await Filme.findAll({ 
          where: { ComingSoon: true },
          limit, 
          offset, 
          order: [['codigo', 'ASC']] 
        });
        
        res.json(filmes);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar filmes em lançamento' });
      }
    });

    // Buscar por codigo
    app.get('/filmes/:codigo', async (req, res) => {
      try {
        const filme = await Filme.findByPk(req.params.codigo);
        if (!filme) return res.status(404).json({ error: 'Filme não encontrado' });
        res.json(filme);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar filme' });
      }
    });

    // Criar filme
    app.post('/filmes', async (req, res) => {
      try {
        const novo = await Filme.create(req.body);
        res.status(201).json(novo);
      } catch (err) {
        console.error(err);
        if (err.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).json({ error: 'imdbID já cadastrado' });
        }
        if (err.name === 'SequelizeValidationError') {
          return res.status(400).json({ error: err.errors.map(e => e.message) });
        }
        res.status(500).json({ error: 'Erro ao criar filme' });
      }
    });

    // Atualizar filme (substituição parcial permitida)
    app.put('/filmes/:codigo', async (req, res) => {
      try {
        const filme = await Filme.findByPk(req.params.codigo);
        if (!filme) return res.status(404).json({ error: 'Filme não encontrado' });
        await filme.update(req.body);
        res.json(filme);
      } catch (err) {
        console.error(err);
        if (err.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).json({ error: 'imdbID já cadastrado' });
        }
        if (err.name === 'SequelizeValidationError') {
          return res.status(400).json({ error: err.errors.map(e => e.message) });
        }
        res.status(500).json({ error: 'Erro ao atualizar filme' });
      }
    });

    // Patch para alterar apenas campos específicos
    app.patch('/filmes/:codigo', async (req, res) => {
      try {
        const filme = await Filme.findByPk(req.params.codigo);
        if (!filme) return res.status(404).json({ error: 'Filme não encontrado' });
        await filme.update(req.body);
        res.json(filme);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar filme' });
      }
    });

    // Deletar filme
    app.delete('/filmes/:codigo', async (req, res) => {
      try {
        const filme = await Filme.findByPk(req.params.codigo);
        if (!filme) return res.status(404).json({ error: 'Filme não encontrado' });
        await filme.destroy();
        res.json({ message: 'Filme removido' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao remover filme' });
      }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`API de Filmes rodando na porta ${PORT}`));

  } catch (err) {
    console.error('Não foi possível conectar ao banco:', err);
    process.exit(1);
  }
}

start();

/*
Instruções rápidas:
1) Navegue até a pasta api: `cd api`
2) Instale dependências: `npm install`
3) Execute: `node index.js`
4) (Opcional) Popule o banco com dados iniciais: `node seed.js`
5) APIs:
   - GET / -> health check
   - GET /filmes -> lista todos os filmes
   - GET /filmes/em-cartaz -> lista filmes em cartaz (não são lançamentos)
   - GET /filmes/lancamentos -> lista filmes em lançamento (ComingSoon)
   - GET /filmes/:codigo -> obter filme específico
   - POST /filmes {campos do filme} -> criar
   - PUT /filmes/:codigo -> atualizar (substitui campos enviados)
   - PATCH /filmes/:codigo -> atualizar parcialmente
   - DELETE /filmes/:codigo -> remover
   
Filtros disponíveis na listagem:
   - ?title=Avatar -> busca por título
   - ?genre=Action -> busca por gênero
   - ?type=movie -> busca por tipo (movie ou series)
   - ?year=2009 -> busca por ano
   - ?comingSoon=true -> busca lançamentos
   - ?limit=10&offset=0 -> paginação
*/


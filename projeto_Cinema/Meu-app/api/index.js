// API REST em Node.js usando Express + Sequelize (SQLite) + CORS aberto
// Recursos: Autenticação (cadastro/login) e CRUD de Filmes
// Porta do servidor: 3001 (para não conflitar com Expo Web em 3000)

const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes, Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

// Banco SQLite via Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

// Modelo de Usuário (para cadastro/login)
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'users',
  timestamps: true,
});

// Modelo de Filme
const Filme = sequelize.define('Filme', {
  codigo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titulo: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
  descricao: { type: DataTypes.TEXT, allowNull: true },
  posterUrl: { type: DataTypes.STRING, allowNull: true },
  duracaoMin: { type: DataTypes.INTEGER, allowNull: true },
  classificacao: { type: DataTypes.STRING, allowNull: true }, // ex: "12", "16"
  dataLancamento: { type: DataTypes.DATEONLY, allowNull: true },
  ativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, {
  tableName: 'filmes',
  timestamps: true,
});

// Health check
app.get('/', (_req, res) => res.json({ status: 'ok' }));

// Auth: Cadastro
app.post('/auth/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'Preencha todos os campos' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'As senhas não conferem' });
    }
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ error: 'Usuário já cadastrado' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    return res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro no cadastro' });
  }
});

// Auth: Login
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Informe e-mail e senha' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Credenciais inválidas' });

    // Sem JWT para manter simples; retorno básico do usuário
    return res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro no login' });
  }
});

// Filmes: listar com filtros/paginação
app.get('/filmes', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const offset = parseInt(req.query.offset) || 0;
    const where = {};
    if (req.query.titulo) where.titulo = { [Op.like]: `%${req.query.titulo}%` };
    if (req.query.ativo !== undefined) where.ativo = req.query.ativo === 'true';

    const filmes = await Filme.findAll({ where, limit, offset, order: [['codigo', 'ASC']] });
    res.json(filmes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
});

// Filmes: obter por codigo
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

// Filmes: criar
app.post('/filmes', async (req, res) => {
  try {
    const { titulo, descricao, posterUrl, duracaoMin, classificacao, dataLancamento, ativo } = req.body;
    const novo = await Filme.create({ titulo, descricao, posterUrl, duracaoMin, classificacao, dataLancamento, ativo });
    res.status(201).json(novo);
  } catch (err) {
    console.error(err);
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: err.errors.map(e => e.message) });
    }
    res.status(500).json({ error: 'Erro ao criar filme' });
  }
});

// Filmes: atualizar (put)
app.put('/filmes/:codigo', async (req, res) => {
  try {
    const filme = await Filme.findByPk(req.params.codigo);
    if (!filme) return res.status(404).json({ error: 'Filme não encontrado' });
    const { titulo, descricao, posterUrl, duracaoMin, classificacao, dataLancamento, ativo } = req.body;
    await filme.update({ titulo, descricao, posterUrl, duracaoMin, classificacao, dataLancamento, ativo });
    res.json(filme);
  } catch (err) {
    console.error(err);
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: err.errors.map(e => e.message) });
    }
    res.status(500).json({ error: 'Erro ao atualizar filme' });
  }
});

// Filmes: patch (atualização parcial)
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

// Filmes: deletar
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

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Banco conectado e modelos sincronizados.');
    const PORT = process.env.PORT || 3001; // 3001 para não conflitar com Expo (3000)
    app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
  } catch (err) {
    console.error('Não foi possível conectar ao banco:', err);
    process.exit(1);
  }
}

start();

/*
Instruções rápidas:
1) Dentro de `api/`, instale dependências:
   npm i express sequelize sqlite3 cors bcryptjs
2) Execute:
   node index.js
3) Endpoints:
   - GET / -> health
   - POST /auth/signup {name,email,password,confirmPassword}
   - POST /auth/login {email,password}
   - GET /filmes?titulo=...&ativo=true&limit=10&offset=0
   - GET /filmes/:codigo
   - POST /filmes {titulo,descricao,posterUrl,duracaoMin,classificacao,dataLancamento,ativo}
   - PUT /filmes/:codigo
   - PATCH /filmes/:codigo
   - DELETE /filmes/:codigo
*/

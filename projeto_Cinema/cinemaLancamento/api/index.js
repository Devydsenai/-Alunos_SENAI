// API de Poltronas - Sistema de Reservas de Cinema
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do Sequelize usando SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './poltronas.sqlite',
  logging: false,
});

// Modelo FilmeDisponibilidade (controla quais filmes TMDB estão disponíveis)
const FilmeDisponibilidade = sequelize.define('FilmeDisponibilidade', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  filmeId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  filmeTitulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  disponivel: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'filmes_disponibilidade',
  timestamps: true,
});

// Modelo Poltrona
const Poltrona = sequelize.define('Poltrona', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  filmeId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filmeTitulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  poltrona: {
    type: DataTypes.STRING, // Ex: "D5"
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING, // 'disponivel', 'selecionada', 'reservada'
    allowNull: false,
    defaultValue: 'disponivel',
  },
  clienteNome: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  clienteEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  dataReserva: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'poltronas',
  timestamps: true,
});

// Inicializar banco e servidor
async function start() {
  try {
    await sequelize.authenticate();
    
    // Atualizar estrutura do banco
    await sequelize.sync({ alter: true });
    console.log('✅ Banco de Poltronas conectado!');

    // ==================== ROTAS ====================

    // Health check
    app.get('/', (req, res) => res.json({ 
      status: 'ok', 
      message: 'API de Poltronas rodando!' 
    }));

    // 1. LISTAR POLTRONAS DE UM FILME
    app.get('/poltronas/filme/:filmeId', async (req, res) => {
      try {
        const poltronas = await Poltrona.findAll({
          where: { filmeId: req.params.filmeId },
          order: [['poltrona', 'ASC']]
        });
        res.json(poltronas);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar poltronas' });
      }
    });

    // 2. BUSCAR POLTRONA ESPECÍFICA
    app.get('/poltronas/:id', async (req, res) => {
      try {
        const poltrona = await Poltrona.findByPk(req.params.id);
        if (!poltrona) return res.status(404).json({ error: 'Poltrona não encontrada' });
        res.json(poltrona);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar poltrona' });
      }
    });

    // 3. RESERVAR POLTRONAS (criar/atualizar múltiplas)
    app.post('/poltronas/reservar', async (req, res) => {
      try {
        const { filmeId, filmeTitulo, poltronas, clienteNome, clienteEmail } = req.body;
        
        if (!filmeId || !filmeTitulo || !poltronas || !Array.isArray(poltronas)) {
          return res.status(400).json({ 
            error: 'Dados obrigatórios: filmeId, filmeTitulo, poltronas (array)' 
          });
        }

        const reservadas = [];
        const total = poltronas.length * 25; // R$ 25 por poltrona
        const dataReserva = new Date();

        for (const poltronaNome of poltronas) {
          const [poltrona, created] = await Poltrona.findOrCreate({
            where: { filmeId, poltrona: poltronaNome },
            defaults: {
              filmeId,
              filmeTitulo,
              poltrona: poltronaNome,
              status: 'reservada',
              clienteNome,
              clienteEmail,
              total: 25,
              dataReserva
            }
          });

          if (!created) {
            // Se já existe, atualizar
            await poltrona.update({
              status: 'reservada',
              clienteNome,
              clienteEmail,
              total: 25,
              dataReserva
            });
          }

          reservadas.push(poltrona);
        }

        res.status(201).json({
          message: `${poltronas.length} poltrona(s) reservada(s) com sucesso!`,
          poltronas: reservadas,
          totalPago: total
        });

      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao reservar poltronas' });
      }
    });

    // 4. CANCELAR RESERVA DE POLTRONA
    app.delete('/poltronas/cancelar/:filmeId/:poltrona', async (req, res) => {
      try {
        const { filmeId, poltrona } = req.params;
        
        const poltronaObj = await Poltrona.findOne({
          where: { filmeId, poltrona }
        });

        if (!poltronaObj) {
          return res.status(404).json({ error: 'Poltrona não encontrada' });
        }

        await poltronaObj.destroy();

        res.json({ 
          message: 'Reserva cancelada com sucesso!',
          poltrona: poltrona 
        });

      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao cancelar reserva' });
      }
    });

    // 5. LIMPAR TODAS AS POLTRONAS DE UM FILME (admin)
    app.delete('/poltronas/filme/:filmeId', async (req, res) => {
      try {
        const deletadas = await Poltrona.destroy({
          where: { filmeId: req.params.filmeId }
        });

        res.json({ 
          message: `${deletadas} poltrona(s) liberada(s)!`,
          filmeId: req.params.filmeId
        });

      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao limpar poltronas' });
      }
    });

    // 6. LISTAR TODAS AS POLTRONAS
    app.get('/poltronas', async (req, res) => {
      try {
        const limit = Math.min(parseInt(req.query.limit) || 100, 1000);
        const offset = parseInt(req.query.offset) || 0;
        const where = {};

        if (req.query.status) where.status = req.query.status;
        if (req.query.clienteEmail) where.clienteEmail = req.query.clienteEmail;

        const poltronas = await Poltrona.findAll({ 
          where, 
          limit, 
          offset, 
          order: [['createdAt', 'DESC']] 
        });

        res.json(poltronas);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao listar poltronas' });
      }
    });

    // ==================== ROTAS - DISPONIBILIDADE DE FILMES ====================

    // GET: Verificar disponibilidade de um filme
    app.get('/filmes/:filmeId/disponibilidade', async (req, res) => {
      try {
        const filme = await FilmeDisponibilidade.findOne({
          where: { filmeId: req.params.filmeId }
        });
        
        // Se não está no banco, é disponível por padrão
        res.json({ 
          filmeId: req.params.filmeId,
          disponivel: filme ? filme.disponivel : true 
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao verificar disponibilidade' });
      }
    });

    // POST: Definir disponibilidade de um filme
    app.post('/filmes/:filmeId/disponibilidade', async (req, res) => {
      try {
        const { filmeTitulo, disponivel } = req.body;
        const { filmeId } = req.params;
        
        if (!filmeTitulo || typeof disponivel !== 'boolean') {
          return res.status(400).json({ error: 'Dados obrigatórios: filmeTitulo, disponivel (boolean)' });
        }

        const [filme, created] = await FilmeDisponibilidade.findOrCreate({
          where: { filmeId },
          defaults: { filmeId, filmeTitulo, disponivel }
        });

        if (!created) {
          await filme.update({ disponivel, filmeTitulo });
        }

        res.json({
          message: `Filme ${disponivel ? 'disponibilizado' : 'marcado como esgotado'}!`,
          filme
        });

      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar disponibilidade' });
      }
    });

    // GET: Listar todos os filmes com disponibilidade
    app.get('/filmes/disponibilidade', async (req, res) => {
      try {
        const filmes = await FilmeDisponibilidade.findAll({
          order: [['updatedAt', 'DESC']]
        });
        res.json(filmes);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao listar disponibilidade' });
      }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🎬 API de Poltronas rodando na porta ${PORT}`);
      console.log(`📡 http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Erro ao conectar ao banco:', err);
    process.exit(1);
  }
}

start();

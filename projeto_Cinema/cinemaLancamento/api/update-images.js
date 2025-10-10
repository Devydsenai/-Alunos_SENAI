// Script para atualizar as URLs das imagens de HTTP para HTTPS

const { Sequelize, DataTypes } = require('sequelize');

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
  Poster: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
}, {
  tableName: 'filmes',
  timestamps: true,
});

async function updateImages() {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados.');
    
    const filmes = await Filme.findAll();
    console.log(`Encontrados ${filmes.length} filmes.`);
    
    let updated = 0;
    for (const filme of filmes) {
      if (filme.Poster && filme.Poster.startsWith('http://ia.media-imdb.com')) {
        const newPoster = filme.Poster.replace('http://ia.media-imdb.com', 'https://m.media-amazon.com');
        await filme.update({ Poster: newPoster });
        console.log(`✓ Atualizado: ${filme.getDataValue('Title')}`);
        updated++;
      }
    }
    
    console.log(`\n✓ ${updated} imagens atualizadas de HTTP para HTTPS!`);
    process.exit(0);
  } catch (error) {
    console.error('Erro ao atualizar imagens:', error);
    process.exit(1);
  }
}

updateImages();



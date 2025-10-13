// Script para resetar o banco de dados completamente
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');

console.log('🗑️ Deletando banco de dados...');

if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('✅ Banco deletado!');
} else {
  console.log('⚠️ Banco não existe');
}

console.log('');
console.log('✅ Pronto! Execute: npm run dev');
console.log('📦 Um novo banco será criado automaticamente');


# 📘 Guia Técnico Completo - Sistema Alunos SENAI

**Documento:** Explicação Técnica Detalhada  
**Objetivo:** Estudo completo do sistema para apresentação  
**Nível:** Detalhado e didático

---

## 📚 ÍNDICE

1. [Visão Geral do Sistema](#visão-geral)
2. [Dependências Explicadas](#dependências)
3. [Backend Detalhado](#backend)
4. [Frontend Detalhado](#frontend)
5. [Fluxo de Dados](#fluxo-de-dados)
6. [Arquitetura Styled Components](#styled-components)
7. [Banco de Dados](#banco-de-dados)
8. [APIs Externas](#apis-externas)
9. [Sistema de Testes](#testes)

---

## 🎯 VISÃO GERAL DO SISTEMA <a name="visão-geral"></a>

### O que o Sistema Faz?

É um **Sistema de Gerenciamento Empresarial** completo que controla:

1. **Fornecedores/Clientes**
   - Cadastro com dados completos
   - Fotos formato 3x4
   - Status ativo/inativo
   - Busca e filtros

2. **Categorias de Produtos**
   - Organização do catálogo
   - Nome e descrição
   - Ativar/desativar

3. **Produtos**
   - Catálogo completo
   - Código de barras
   - Preços (custo e venda)
   - Vínculo com categoria e fornecedor

4. **Controle de Estoque**
   - Quantidade em tempo real
   - Localização física
   - Alertas de estoque mínimo
   - Histórico de movimentações

5. **Movimentações**
   - Entradas (compras, devoluções)
   - Saídas (vendas, perdas)
   - Rastreabilidade completa

---

### Quem Usaria Este Sistema?

- **Lojas** - Controle de produtos e fornecedores
- **Distribuidoras** - Gestão de estoque e movimentações
- **Almoxarifados** - Controle de materiais e localização
- **Pequenas Empresas** - Sistema completo gratuito

---

### Arquitetura em 3 Camadas:

```
┌───────────────────────────────────────────────┐
│ CAMADA 1: APRESENTAÇÃO (Frontend)             │
│ - React Native (interface mobile)             │
│ - Styled Components (estilos)                 │
│ - 5 telas principais                          │
│ - Validações de formulário                    │
└─────────────────┬─────────────────────────────┘
                  │
         HTTP/REST (fetch API)
         JSON: { nome: "...", email: "..." }
                  │
                  ▼
┌───────────────────────────────────────────────┐
│ CAMADA 2: LÓGICA DE NEGÓCIO (Backend)        │
│ - Node.js + Express (API REST)                │
│ - Validações de dados                         │
│ - Regras de negócio                           │
│ - Relacionamentos                             │
└─────────────────┬─────────────────────────────┘
                  │
         Sequelize ORM
         SQL: SELECT * FROM produtos...
                  │
                  ▼
┌───────────────────────────────────────────────┐
│ CAMADA 3: PERSISTÊNCIA (Banco de Dados)      │
│ - SQLite (database.sqlite)                    │
│ - 5 tabelas relacionadas                      │
│ - Integridade referencial                     │
└───────────────────────────────────────────────┘
```

---

## 📦 DEPENDÊNCIAS EXPLICADAS <a name="dependências"></a>

### FRONTEND - package.json Principal

#### **Dependências de Produção:**

##### 1. **react (19.1.0)**
```
O que é: Biblioteca JavaScript para interfaces
Tamanho: ~6 KB
Uso: Base do React Native
Por que: Framework principal
```

##### 2. **react-native (0.81.4)**
```
O que é: Framework para apps nativos
Tamanho: ~700 KB
Uso: Componentes nativos (View, Text, Image, etc)
Por que: Criar app mobile multiplataforma
```

##### 3. **expo (~54.0)** + expo-router (~6.0)
```
O que é: Suite de ferramentas React Native
Tamanho: ~2 MB
Uso: Desenvolvimento, build, publicação
Por que: Simplifica muito o desenvolvimento
Inclui: Câmera, Galeria, Fontes, etc
```

##### 4. **styled-components (^6.x)** ⭐ NOVO
```
O que é: CSS-in-JS para React Native
Tamanho: ~300 KB
Uso: Estilização de componentes
Por que: Organização, tematização, componentização
Exemplo:
  const Button = styled.TouchableOpacity`
    background-color: blue;
    padding: 10px;
  `;
```

##### 5. **@expo/vector-icons (^15.0)**
```
O que é: Biblioteca de ícones
Tamanho: ~2 MB
Uso: Ionicons (ícones do app)
Inclui: Material Icons, FontAwesome, etc
Exemplo: <Ionicons name="home" size={24} />
```

##### 6. **expo-image-picker (^17.0)**
```
O que é: Acesso a câmera e galeria
Uso: Tirar foto e selecionar imagem
Por que: Fotos dos fornecedores e produtos
Pede permissões automaticamente
```

##### 7. **@react-navigation** (^7.x)
```
O que é: Sistema de navegação
Uso: Navegação entre telas, tabs
Por que: Expo Router usa internamente
```

##### 8. **react-native-safe-area-context**
```
O que é: Gerencia áreas seguras da tela
Uso: Evita notch, barra de status
Por que: Layout correto em todos os dispositivos
```

---

#### **Dependências de Desenvolvimento:**

##### 9. **typescript (~5.9.2)**
```
O que é: JavaScript com tipos
Uso: Compilador TS → JS
Por que: Detectar erros em desenvolvimento
Exemplo:
  interface Cliente {
    nome: string;  // Tipo definido
    codigo: number;
  }
```

##### 10. **jest (^30.2)** + **@testing-library/react-native**
```
O que é: Framework de testes
Uso: Testes automatizados
Por que: Garantir qualidade do código
68 testes implementados
```

##### 11. **@types/styled-components** ⭐ NOVO
```
O que é: Tipos TypeScript para styled-components
Uso: Autocomplete e validação
Por que: Integração perfeita TS + Styled Components
```

##### 12. **eslint (^9.25)**
```
O que é: Analisador de código
Uso: Encontrar erros e problemas
Por que: Manter padrão de código
```

---

### BACKEND - api/package.json

#### **Dependências de Produção:**

##### 1. **express (^4.18)**
```
O que é: Framework web minimalista
Tamanho: ~200 KB
Uso: Criar rotas HTTP (GET, POST, etc)
Por que: Padrão da indústria, simples e rápido

Exemplo:
  app.get('/clientes', (req, res) => {
    res.json([...]);
  });
```

##### 2. **sequelize (^6.35)**
```
O que é: ORM (Object-Relational Mapping)
Tamanho: ~1 MB
Uso: Trabalhar com banco sem SQL direto
Por que: Produtividade e segurança

Exemplo:
  const Cliente = sequelize.define('Cliente', {
    nome: DataTypes.STRING
  });
  
  // Sequelize gera SQL:
  // CREATE TABLE clientes (nome VARCHAR(255));
```

##### 3. **sqlite3 (^5.1)**
```
O que é: Driver SQLite para Node.js
Tamanho: ~5 MB
Uso: Conectar Node.js ao SQLite
Por que: Banco simples em arquivo único
```

##### 4. **cors (^2.8)**
```
O que é: Middleware CORS
Tamanho: ~10 KB
Uso: Permitir requisições do frontend
Por que: Segurança - controla quem acessa API

Código:
  app.use(cors()); // Permite todas origens
```

---

#### **Dependências de Desenvolvimento:**

##### 5. **nodemon (^3.1)**
```
O que é: Monitor de arquivos
Uso: Reinicia servidor ao salvar código
Por que: Desenvolvimento mais rápido
Comando: npm run dev (usa nodemon)
```

---

## 🔧 BACKEND DETALHADO <a name="backend"></a>

### Arquivo api/index.js - Linha por Linha

#### **Linhas 1-18: Configuração Inicial**

```javascript
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
app.use(cors());              // Permite CORS
app.use(express.json());      // Parse JSON automático
```

**O que faz:**
- Importa bibliotecas necessárias
- Cria app Express
- Configura middlewares (CORS e JSON)

---

#### **Linhas 14-18: Conexão com Banco**

```javascript
const sequelize = new Sequelize({
  dialect: 'sqlite',              // Tipo de banco
  storage: './database.sqlite',   // Arquivo do banco
  logging: false,                 // Sem logs SQL
});
```

**O que faz:**
- Cria conexão com SQLite
- Define onde salvar banco
- Desativa logs para limpar console

---

#### **Linhas 21-54: Modelo Cliente**

```javascript
const Cliente = sequelize.define('Cliente', {
  codigo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,         // Auto incrementa
  },
  nome: {
    type: DataTypes.STRING,      // VARCHAR(255)
    allowNull: false,            // NOT NULL
    validate: { notEmpty: true },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true }, // Valida formato email
  },
  // ... outros campos
}, {
  tableName: 'clientes',         // Nome da tabela
  timestamps: true,              // Adiciona createdAt, updatedAt
});
```

**O que faz:**
- Define estrutura da tabela clientes
- Configura validações
- Sequelize cria tabela automaticamente

**Equivalente SQL:**
```sql
CREATE TABLE clientes (
  codigo INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(255),
  ativo BOOLEAN DEFAULT TRUE,
  foto TEXT,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

---

#### **Linhas 200-213: Relacionamentos**

```javascript
// Produto pertence a Categoria
Produto.belongsTo(Categoria, {
  foreignKey: 'categoria_id',
  as: 'categoria'
});

// Produto pertence a Fornecedor (Cliente)
Produto.belongsTo(Cliente, {
  foreignKey: 'fornecedor_id',
  as: 'fornecedor'
});
```

**O que faz:**
- Define relacionamentos entre tabelas
- Permite fazer joins automáticos
- Quando busca produto, já traz categoria e fornecedor

**Resultado:**
```javascript
// Sequelize gera automaticamente:
SELECT p.*, c.nome as categoria_nome, f.nome as fornecedor_nome
FROM produtos p
LEFT JOIN categorias c ON p.categoria_id = c.codigo
LEFT JOIN clientes f ON p.fornecedor_id = f.codigo
```

---

#### **Linhas 236-245: Health Check**

```javascript
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});
```

**O que faz:**
- Rota básica para verificar se API está viva
- Teste: abra `http://localhost:3000` no browser
- Deve mostrar: `{"status":"ok"}`

---

#### **Linhas 248-259: GET /clientes**

```javascript
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

**O que faz:**
1. `Cliente.findAll()` busca todos clientes
2. Sequelize gera: `SELECT * FROM clientes`
3. Retorna array JSON
4. Se erro, retorna status 500

**Usado em:** Telas index.tsx e about.tsx

---

#### **Linhas 276-293: POST /clientes**

```javascript
app.post('/clientes', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      res.status(400).json({ 
        error: err.errors[0].message 
      });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});
```

**O que faz:**
1. Recebe dados no body da requisição
2. `Cliente.create()` insere no banco
3. Retorna cliente criado (com código gerado)
4. Se validação falhar, retorna erro 400
5. Se outro erro, retorna 500

**Validações automáticas:**
- Email deve ser válido
- Nome não pode ser vazio

**req.body recebe:**
```json
{
  "nome": "Fornecedor X",
  "email": "x@email.com",
  "telefone": "11999999999",
  "ativo": true,
  "foto": "file:///..."
}
```

---

#### **Linhas 320-346: DELETE /clientes/:codigo**

```javascript
app.delete('/clientes/:codigo', async (req, res) => {
  console.log('ROTA DELETE CHAMADA');
  console.log('Código recebido:', req.params.codigo);
  
  try {
    console.log('Buscando cliente no banco...');
    const cliente = await Cliente.findByPk(req.params.codigo);
    
    if (!cliente) {
      console.log('Cliente não encontrado');
      return res.status(404).json({ 
        error: 'Cliente não encontrado' 
      });
    }
    
    console.log('Cliente encontrado:', cliente.dataValues);
    console.log('Iniciando exclusão...');
    
    await cliente.destroy();
    
    console.log('Cliente excluído com sucesso!');
    res.json({ message: 'Cliente removido' });
  } catch (err) {
    console.error('ERRO na exclusão:', err);
    res.status(500).json({ error: 'Erro ao remover cliente' });
  }
});
```

**O que faz (passo a passo):**

1. **Log inicial:** Registra que rota foi chamada
2. **findByPk:** Busca cliente por primary key
3. **Verifica existência:** Se não existe, retorna 404
4. **Destrói:** Remove do banco (DELETE FROM...)
5. **Confirma:** Retorna sucesso
6. **Catch:** Captura erros e retorna 500

**Console logs:** Ajudam debug durante desenvolvimento

**Usado em:** Botão "Deletar" da tela about.tsx

---

#### **Linhas 485-512: DELETE /produtos/:codigo (Especial)**

```javascript
app.delete('/produtos/:codigo', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.codigo);
    
    if (!produto) {
      console.log('Produto não encontrado');
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    // ORDEM IMPORTANTE!
    // 1. Deletar estoque associado primeiro
    console.log('Deletando estoque do produto...');
    await Estoque.destroy({ 
      where: { produto_id: req.params.codigo } 
    });
    
    // 2. Deletar movimentações associadas
    console.log('Deletando movimentações do produto...');
    await Movimentacao.destroy({ 
      where: { produto_id: req.params.codigo } 
    });
    
    // 3. Finalmente deletar produto
    console.log('Deletando produto...');
    await produto.destroy();
    
    console.log('Produto deletado com sucesso!');
    res.json({ message: 'Produto removido' });
  } catch (err) {
    console.error('Erro ao deletar produto:', err);
    res.status(500).json({ error: 'Erro ao remover produto' });
  }
});
```

**Por que essa ordem?**

Se tentar deletar produto primeiro:
- **ERRO!** Foreign Key constraint
- Estoque tem `produto_id` apontando para produto
- Movimentações também

**Solução:** Deletar dependências primeiro (estoque, movimentações), depois o produto.

**Operações SQL geradas:**
```sql
-- 1. Remove estoque
DELETE FROM estoque WHERE produto_id = 5;

-- 2. Remove histórico
DELETE FROM movimentacoes WHERE produto_id = 5;

-- 3. Remove produto
DELETE FROM produtos WHERE codigo = 5;
```

---

#### **Linhas 570-615: POST /movimentacoes**

```javascript
app.post('/movimentacoes', async (req, res) => {
  try {
    const { tipo, produto_id, quantidade } = req.body;
    
    // VALIDAÇÃO 1: Tipo deve ser 'entrada' ou 'saida'
    if (!['entrada', 'saida'].includes(tipo)) {
      return res.status(400).json({ 
        error: 'Tipo inválido' 
      });
    }
    
    // VALIDAÇÃO 2: Produto deve existir
    const produto = await Produto.findByPk(produto_id);
    if (!produto) {
      return res.status(404).json({ 
        error: 'Produto não encontrado' 
      });
    }
    
    // VALIDAÇÃO 3: Quantidade deve ser positiva
    if (quantidade <= 0) {
      return res.status(400).json({ 
        error: 'Quantidade inválida' 
      });
    }
    
    // Busca ou cria estoque
    let estoque = await Estoque.findOne({ 
      where: { produto_id } 
    });
    
    if (!estoque) {
      estoque = await Estoque.create({ 
        produto_id, 
        quantidade_atual: 0 
      });
    }
    
    // LÓGICA PRINCIPAL: Atualiza quantidade
    if (tipo === 'entrada') {
      estoque.quantidade_atual += quantidade;  // SOMA
    } else {
      estoque.quantidade_atual -= quantidade;  // SUBTRAI
    }
    
    // Atualiza última movimentação
    estoque.data_ultima_mov = new Date();
    await estoque.save();
    
    // Registra no histórico
    const movimentacao = await Movimentacao.create(req.body);
    
    res.status(201).json({ 
      movimentacao, 
      estoque_atualizado: estoque 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

**Fluxo Completo:**

**Entrada de 50 unidades:**
```
1. Frontend envia:
   POST /movimentacoes
   {
     tipo: "entrada",
     produto_id: 3,
     quantidade: 50,
     usuario: "Sistema",
     observacao: "Compra fornecedor"
   }

2. Backend valida:
   - Tipo OK? (entrada ou saida)
   - Produto existe? (SELECT produto)
   - Quantidade > 0? (50 > 0)

3. Backend busca estoque:
   SELECT * FROM estoque WHERE produto_id = 3
   Atual: 20

4. Backend atualiza:
   quantidade_atual = 20 + 50 = 70
   data_ultima_mov = agora()
   UPDATE estoque SET quantidade_atual = 70...

5. Backend registra:
   INSERT INTO movimentacoes (tipo, produto_id, quantidade...)

6. Retorna:
   {
     movimentacao: {...},
     estoque_atualizado: { quantidade_atual: 70 }
   }

7. Frontend atualiza tela automaticamente
```

---

## 📱 FRONTEND DETALHADO <a name="frontend"></a>

### Estrutura de uma Tela (Exemplo: products.tsx)

#### **1. Imports (Linhas 1-7)**

```typescript
import { Ionicons } from '@expo/vector-icons';      // Ícones
import { useFocusEffect } from '@react-navigation/native'; // Hook navegação
import * as ImagePicker from 'expo-image-picker';   // Fotos
import React, { useEffect, useState } from 'react'; // React
import { Alert, Modal, ScrollView } from 'react-native'; // Componentes
import { buscarProdutoPorCodigoBarras } from '../services/codigoBarras'; // Service
import * as S from './products.styles';             // Estilos (NOVO!)
```

---

#### **2. Interfaces TypeScript (Linhas 9-43)**

```typescript
interface Categoria {
  codigo: number;
  nome: string;
}

interface Fornecedor {
  codigo: number;
  nome: string;
}

interface Produto {
  codigo: number;
  nome: string;
  descricao?: string;           // ? = opcional
  categoria_id?: number;
  fornecedor_id?: number;
  foto?: string;
  codigo_barras?: string;
  preco_custo: number;
  preco_venda: number;
  estoque_minimo: number;
  ativo: boolean;
  categoria?: Categoria;        // Relacionamento
  fornecedor?: Fornecedor;      // Relacionamento
}
```

**Por que interfaces?**
- TypeScript sabe formato dos dados
- Autocomplete funciona
- Erros detectados antes de rodar

**Exemplo de erro detectado:**
```typescript
produto.nme  // ERRO! Propriedade 'nme' não existe
             // TypeScript sugere 'nome'
```

---

#### **3. Estado do Componente (Linhas 45-63)**

```typescript
export default function ProductsScreen() {
  // Lista de produtos
  const [produtos, setProdutos] = useState<Produto[]>([]);
  
  // Listas auxiliares
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  
  // Estados da UI
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<number | null>(null);
  
  // Formulário
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    descricao: '',
    categoria_id: 0,
    fornecedor_id: 0,
    foto: '',
    codigo_barras: '',
    preco_custo: '0',
    preco_venda: '0',
    estoque_minimo: '0',
    ativo: true,
  });
  
  const API_URL = 'http://localhost:3000';
}
```

**useState:** Hook que cria estado reativo

**Quando chama `setProdutos([...])`, React re-renderiza a tela automaticamente!**

---

#### **4. Funções de Busca (Linhas 68-107)**

```typescript
const buscarProdutos = async () => {
  try {
    setLoading(true);                              // Mostra "Carregando..."
    const response = await fetch(`${API_URL}/produtos`);
    
    if (response.ok) {                             // Status 200-299
      const data = await response.json();          // Parse JSON
      setProdutos(data);                           // Atualiza estado
    }
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  } finally {
    setLoading(false);                             // Remove "Carregando..."
  }
};
```

**Fluxo:**
1. Ativa loading (spinner aparece)
2. Faz requisição HTTP
3. Converte resposta para JSON
4. Atualiza estado (setProdutos)
5. React re-renderiza mostrando produtos
6. Desativa loading

**async/await:** Espera resposta antes de continuar

---

#### **5. Função Salvar (Linhas 193-244)**

```typescript
const salvarProduto = async () => {
  // VALIDAÇÃO
  if (!novoProduto.nome) {
    Alert.alert('Erro', 'Nome é obrigatório');
    return;
  }

  try {
    // Editando ou criando?
    const isEditando = produtoEditando !== null;
    const url = isEditando
      ? `${API_URL}/produtos/${produtoEditando}`
      : `${API_URL}/produtos`;
    const method = isEditando ? 'PUT' : 'POST';

    // Prepara dados (converte strings para números)
    const dados = {
      ...novoProduto,
      categoria_id: novoProduto.categoria_id || null,
      fornecedor_id: novoProduto.fornecedor_id || null,
      preco_custo: parseFloat(novoProduto.preco_custo) || 0,
      preco_venda: parseFloat(novoProduto.preco_venda) || 0,
      estoque_minimo: parseInt(novoProduto.estoque_minimo) || 0,
    };

    // Faz requisição
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    if (response.ok) {
      Alert.alert('Sucesso', isEditando ? 'Atualizado!' : 'Criado!');
      
      // Limpa formulário
      setNovoProduto({
        nome: '', descricao: '', /* ... */ ativo: true,
      });
      
      // Fecha modal
      setModalVisible(false);
      
      // Recarrega lista
      buscarProdutos();
    } else {
      Alert.alert('Erro', 'Não foi possível salvar');
    }
  } catch (error) {
    Alert.alert('Erro', 'Erro ao salvar produto');
  }
};
```

**Detalhes importantes:**

**parseFloat/parseInt:**
```typescript
preco_custo: '50.00' (string do input)
parseFloat('50.00') = 50.00 (number)
```
**Por que?** Inputs retornam string, banco precisa number

**Operador spread (...):**
```typescript
dados = { ...novoProduto, preco_custo: 50 }
// Copia todas propriedades de novoProduto
// E sobrescreve preco_custo com valor convertido
```

---

#### **6. useEffect - Carregar Dados (Linhas 309-313)**

```typescript
useEffect(() => {
  buscarProdutos();
  buscarCategorias();
  buscarFornecedores();
}, []);
```

**O que faz:**
- Executa quando componente monta
- `[]` (array vazio) = executa 1x só
- Carrega dados necessários

**Sem isso:** Tela abriria vazia!

---

#### **7. useFocusEffect - Atualizar ao Voltar (Linhas 315-319)**

```typescript
useFocusEffect(
  React.useCallback(() => {
    buscarProdutos();
  }, [])
);
```

**O que faz:**
- Executa sempre que volta para a tela
- Garante dados atualizados

**Cenário:**
1. Está em Produtos
2. Vai para Categorias
3. Cria nova categoria
4. Volta para Produtos
5. `useFocusEffect` recarrega produtos
6. Nova categoria já aparece no seletor!

---

#### **8. Renderização (Linhas 321-362)**

```typescript
const renderProduto = ({ item }: { item: Produto }) => (
  <S.Card inativo={!item.ativo}>
    <S.CardContent>
      {item.foto ? (
        <S.ProdutoFoto source={{ uri: item.foto }} />
      ) : (
        <S.ProdutoSemFoto>
          <Ionicons name="cube-outline" size={40} color="#ccc" />
        </S.ProdutoSemFoto>
      )}
      
      <S.ProdutoInfo>
        <S.ProdutoNome inativo={!item.ativo}>
          {item.nome}
        </S.ProdutoNome>
        
        {item.categoria && (
          <S.ProdutoCategoria>
            Categoria: {item.categoria.nome}
          </S.ProdutoCategoria>
        )}
        
        <S.Preco>R$ {item.preco_venda?.toFixed(2)}</S.Preco>
      </S.ProdutoInfo>
      
      <S.StatusBadge ativo={item.ativo}>
        <S.StatusText>
          {item.ativo ? 'Ativo' : 'Inativo'}
        </S.StatusText>
      </S.StatusBadge>
    </S.CardContent>
    
    <S.BotoesContainer>
      <S.BotaoEditar onPress={() => editarProduto(item.codigo)}>
        <Ionicons name="pencil" size={14} color="#fff" />
        <S.BotaoTexto>Editar</S.BotaoTexto>
      </S.BotaoEditar>
      
      <S.BotaoDeletar onPress={() => deletarProduto(item.codigo, item.nome)}>
        <Ionicons name="trash" size={14} color="#fff" />
        <S.BotaoTexto>Excluir</S.BotaoTexto>
      </S.BotaoDeletar>
    </S.BotoesContainer>
  </S.Card>
);
```

**Componentes Styled (S.*):**
- `S.Card` = View estilizado
- `S.ProdutoNome` = Text estilizado
- `S.BotaoEditar` = TouchableOpacity estilizado

**Conditional Rendering:**
```typescript
{item.foto ? (                    // Se tem foto
  <S.ProdutoFoto ... />          // Mostra foto
) : (                             // Se não
  <S.ProdutoSemFoto>             // Mostra ícone
    <Ionicons ... />
  </S.ProdutoSemFoto>
)}
```

**Props dinâmicas:**
```typescript
<S.Card inativo={!item.ativo}>
// Se inativo=true, componente fica opaco (no .styles.tsx)
```

**Optional Chaining (?.):**
```typescript
{item.categoria?.nome}
// Se categoria existir, mostra nome
// Se for null/undefined, não quebra
```

---

#### **9. Return - JSX (Linhas 364-560)**

```typescript
return (
  <S.Container>
    <S.Header>
      <S.Title>Produtos</S.Title>
      <S.BotaoAdicionar onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle" size={24} color="#fff" />
        <S.BotaoAdicionarTexto>Novo</S.BotaoAdicionarTexto>
      </S.BotaoAdicionar>
    </S.Header>

    {loading ? (
      <S.LoadingContainer>
        <S.LoadingText>Carregando...</S.LoadingText>
      </S.LoadingContainer>
    ) : produtos.length === 0 ? (
      <S.EmptyContainer>
        <Ionicons name="cube-outline" size={64} color="#ccc" />
        <S.EmptyText>Nenhum produto cadastrado</S.EmptyText>
      </S.EmptyContainer>
    ) : (
      <S.Lista
        data={produtos}
        renderItem={renderProduto}
        keyExtractor={(item: Produto) => item.codigo.toString()}
      />
    )}
    
    {/* Modal de Cadastro/Edição */}
    <Modal visible={modalVisible}>
      {/* Formulário completo */}
    </Modal>
  </S.Container>
);
```

**Renderização Condicional:**
```typescript
{loading ? (
  <Loading />       // Se carregando
) : lista.length === 0 ? (
  <Empty />         // Se vazio
) : (
  <Lista />         // Se tem dados
)}
```

**FlatList:**
- Componente otimizado para listas
- Renderiza apenas itens visíveis (virtualização)
- Performance em listas grandes

---

## 🎨 STYLED COMPONENTS DETALHADO <a name="styled-components"></a>

### Arquivo products.styles.tsx

#### **Imports:**

```typescript
import styled from 'styled-components/native';
import { colors, spacing, borderRadius, fontSize, fontWeight } 
  from '../../constants/theme';
```

**styled-components/native:** Versão para React Native  
**theme:** Importa constantes centralizadas

---

#### **Componente Simples:**

```typescript
export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;
```

**Equivalente a:**
```typescript
// StyleSheet
container: {
  flex: 1,
  backgroundColor: '#f5f5f5'
}

// Uso
<View style={styles.container}>
```

**Com Styled:**
```typescript
<S.Container>  // Mais limpo!
```

---

#### **Componente com Props:**

```typescript
export const Card = styled.View<{ inativo?: boolean }>`
  background-color: ${colors.backgroundLight};
  padding: ${spacing.md}px;
  opacity: ${(props: { inativo?: boolean }) => 
    props.inativo ? 0.6 : 1
  };
`;
```

**Como usar:**
```typescript
<S.Card inativo={!item.ativo}>
  {/* Se inativo, opacity = 0.6 */}
</S.Card>
```

**TypeScript:**
- `<{ inativo?: boolean }>` define tipo da prop
- `(props: { inativo?: boolean })` usa a prop

---

#### **Componente Estendido:**

```typescript
export const ModalButton = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 25px;
`;

export const SaveButton = styled(ModalButton)`
  background-color: ${colors.success};
`;

export const CancelButton = styled(ModalButton)`
  background-color: ${colors.background};
  border: 1px solid ${colors.border};
`;
```

**Herança de estilos:**
- `SaveButton` herda tudo de `ModalButton`
- Adiciona/sobrescreve background-color
- Reutilização de código!

---

### Sistema de Temas (constants/theme.ts)

```typescript
export const colors = {
  // Cores Principais
  primary: '#4CAF50',      // Verde (sucesso, criar, confirmar)
  secondary: '#2196F3',    // Azul (info, editar)
  tertiary: '#9C27B0',     // Roxo (fornecedores)
  
  // Cores de Estado
  success: '#4CAF50',      // Operações bem-sucedidas
  error: '#F44336',        // Erros, deletar, inativo
  warning: '#FF9800',      // Alertas, estoque baixo
  info: '#2196F3',         // Informações, links
  
  // Fundos
  background: '#f5f5f5',   // Fundo geral (cinza claro)
  backgroundLight: '#fff', // Cards, modais (branco)
  
  // Textos
  textPrimary: '#333',     // Texto principal (quase preto)
  textSecondary: '#666',   // Texto secundário (cinza)
  textDisabled: '#999',    // Texto desabilitado (cinza claro)
  textLight: '#fff',       // Texto em fundos escuros (branco)
  
  // Bordas
  border: '#e0e0e0',       // Bordas padrão
  borderDark: '#ddd',      // Bordas mais escuras
};

export const spacing = {
  xs: 4,    // Extra small - gaps pequenos
  sm: 8,    // Small - espaços pequenos
  md: 12,   // Medium - espaços médios
  lg: 16,   // Large - padding padrão
  xl: 20,   // Extra large - padding grande
  xxl: 30,  // Extra extra large - margens maiores
};

export const fontSize = {
  xs: 10,   // Badges, labels pequenos
  sm: 12,   // Textos secundários
  md: 14,   // Textos normais
  lg: 16,   // Inputs, botões
  xl: 18,   // Subtítulos
  xxl: 20,  // Títulos modais
  title: 24, // Títulos principais
  largeTitle: 28, // Títulos grandes
};

export const borderRadius = {
  sm: 4,    // Checkboxes
  md: 8,    // Imagens
  lg: 10,   // Cards
  xl: 15,   // Modais
  xxl: 20,  // Containers
  round: 25, // Botões
  circle: 50, // Círculos completos
};
```

**Como usar:**

```typescript
// Antes (hardcoded)
container: {
  padding: 20,
  backgroundColor: '#f5f5f5'
}

// Depois (tema)
export const Container = styled.View`
  padding: ${spacing.xl}px;
  background-color: ${colors.background};
`;
```

**Benefício:**
```typescript
// Mudar tema em 1 lugar:
colors.background = '#121212'; // Tema escuro!

// Atualiza TUDO automaticamente!
```

---

## 🗄️ BANCO DE DADOS EXPLICADO <a name="banco-de-dados"></a>

### Arquivo: database.sqlite

**O que é:** Arquivo binário com todas as tabelas e dados

**Localização:** `api/database.sqlite`

**Como ver dados:**
```bash
# Instalar SQLite Browser
# Abrir database.sqlite no programa
# Ver tabelas, dados, executar queries
```

**Ou via Sequelize:**
```javascript
const clientes = await Cliente.findAll();
console.log(clientes); // Mostra todos
```

---

### As 5 Tabelas:

#### 1. **clientes** (Fornecedores)

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| codigo | INTEGER | Chave primária, auto incrementa |
| nome | VARCHAR(255) | Nome do fornecedor, obrigatório |
| email | VARCHAR(255) | Email, obrigatório, validado |
| telefone | VARCHAR(255) | Telefone opcional |
| ativo | BOOLEAN | true=ativo, false=inativo |
| foto | TEXT | URI da foto (file:///) |
| createdAt | TIMESTAMP | Data de criação automática |
| updatedAt | TIMESTAMP | Data atualização automática |

**Índices:** Primary key em codigo

---

#### 2. **categorias**

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| codigo | INTEGER | PK auto increment |
| nome | VARCHAR(255) | Nome único, obrigatório |
| descricao | TEXT | Descrição opcional |
| ativo | BOOLEAN | Status |
| createdAt | TIMESTAMP | Auto |
| updatedAt | TIMESTAMP | Auto |

**Constraint:** nome UNIQUE (não pode repetir)

---

#### 3. **produtos**

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| codigo | INTEGER | PK auto increment |
| nome | VARCHAR(255) | Obrigatório |
| descricao | TEXT | Opcional |
| **categoria_id** | INTEGER | **FK → categorias.codigo** |
| **fornecedor_id** | INTEGER | **FK → clientes.codigo** |
| foto | TEXT | URI da foto |
| codigo_barras | VARCHAR(255) | Código EAN |
| preco_custo | DECIMAL | Preço que comprou |
| preco_venda | DECIMAL | Preço que vende |
| estoque_minimo | INTEGER | Alerta quando abaixo |
| ativo | BOOLEAN | Status |
| createdAt | TIMESTAMP | Auto |
| updatedAt | TIMESTAMP | Auto |

**Relacionamentos (Foreign Keys):**
- `categoria_id` → aponta para `categorias.codigo`
- `fornecedor_id` → aponta para `clientes.codigo`

**Joins automáticos:**
```javascript
const produto = await Produto.findOne({
  where: { codigo: 1 },
  include: ['categoria', 'fornecedor']
});

// Resultado:
{
  codigo: 1,
  nome: "Mouse Gamer",
  categoria: {
    codigo: 2,
    nome: "Eletrônicos"
  },
  fornecedor: {
    codigo: 3,
    nome: "Distribuidora XYZ"
  }
}
```

---

#### 4. **estoque** (1:1 com produtos)

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| **produto_id** | INTEGER | PK + FK → produtos.codigo |
| quantidade_atual | INTEGER | Quantidade disponível |
| localizacao | VARCHAR(255) | Ex: "Prateleira A-2" |
| data_ultima_mov | TIMESTAMP | Última entrada/saída |
| createdAt | TIMESTAMP | Auto |
| updatedAt | TIMESTAMP | Auto |

**Relação 1:1:**
- 1 produto = 1 registro de estoque
- `produto_id` é chave primária E estrangeira

**Criação automática:**
```javascript
// Quando cria produto, cria estoque também:
await Produto.create({ nome: "Mouse" });
await Estoque.create({ 
  produto_id: produto.codigo,
  quantidade_atual: 0 
});
```

---

#### 5. **movimentacoes** (Histórico)

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| codigo | INTEGER | PK auto increment |
| tipo | VARCHAR(50) | 'entrada' ou 'saida' |
| **produto_id** | INTEGER | **FK → produtos.codigo** |
| quantidade | INTEGER | Quanto movimentou |
| usuario | VARCHAR(255) | Quem fez |
| observacao | TEXT | Motivo, notas |
| createdAt | TIMESTAMP | Quando aconteceu (auto) |
| updatedAt | TIMESTAMP | Auto |

**Tipo ENUM:**
- Só aceita: 'entrada' ou 'saida'
- Validado no backend

**Auditoria:**
```javascript
// Toda movimentação fica registrada:
{
  codigo: 15,
  tipo: 'entrada',
  produto_id: 5,
  quantidade: 100,
  usuario: 'João',
  observacao: 'Compra fornecedor ABC',
  createdAt: '2024-10-15 14:30:00'
}

// Histórico completo de um produto:
SELECT * FROM movimentacoes 
WHERE produto_id = 5 
ORDER BY createdAt DESC;
```

---

### Diagrama de Relacionamentos:

```
┌──────────────┐
│   CLIENTES   │
│   (codigo)   │◄──────┐
└──────────────┘       │
                       │ fornecedor_id
┌──────────────┐       │
│  CATEGORIAS  │       │
│   (codigo)   │◄──┐   │
└──────────────┘   │   │
                   │   │
        categoria_id   │
                   │   │
              ┌────┴───┴────┐
              │   PRODUTOS   │
              │   (codigo)   │
              └────┬─────────┘
                   │
                   │ produto_id
          ┌────────┴────────┐
          │                 │
    ┌─────▼──────┐   ┌─────▼─────────┐
    │  ESTOQUE   │   │ MOVIMENTACOES │
    │(produto_id)│   │    (codigo)   │
    └────────────┘   └───────────────┘
       1:1              1:N
```

**Leitura:**
- 1 Produto tem 1 Estoque (relação 1:1)
- 1 Produto tem N Movimentações (relação 1:N)
- 1 Produto pertence a 1 Categoria
- 1 Produto tem 1 Fornecedor (Cliente)

---

## 🔗 FLUXO DE DADOS COMPLETO <a name="fluxo-de-dados"></a>

### Exemplo Real: Criar Produto com Código de Barras

**PASSO 1: Usuário na Tela**
```
1. Abre app no celular
2. Vai para aba "Produtos"
3. Clica em "+ Novo"
4. Modal abre
```

**PASSO 2: Preenche Código de Barras**
```
5. Digite: 7891000100103
6. Clica na lupa laranja (buscar)
```

**PASSO 3: Frontend Busca API Externa**
```typescript
// app/services/codigoBarras.ts
const buscarProdutoPorCodigoBarras = async (codigo: string) => {
  const url = `https://world.openfoodfacts.org/api/v0/product/${codigo}.json`;
  
  const response = await fetch(url);  // Vai para internet!
  const data = await response.json();
  
  return {
    product_name: data.product.product_name,  // "Coca-Cola"
    brands: data.product.brands,              // "Coca-Cola Company"
    categories: data.product.categories       // "Bebidas > Refrigerantes"
  };
};
```

**PASSO 4: Mostra Confirmação**
```
7. Alert aparece: "Coca-Cola 2L encontrada!"
8. Botões: [Cancelar] [Usar Nome]
9. Usuário clica "Usar Nome"
```

**PASSO 5: Preenche Automaticamente**
```typescript
setNovoProduto({
  ...novoProduto,
  nome: "Coca-Cola 2L",           // Preenchido!
  descricao: "Bebidas > Refrigerantes"
});
```

**PASSO 6: Completa Formulário**
```
10. Seleciona categoria: Bebidas
11. Seleciona fornecedor: Distribuidora ABC
12. Preenche preço custo: 3.50
13. Preenche preço venda: 5.00
14. Estoque mínimo: 24
15. Clica "Salvar"
```

**PASSO 7: Frontend Envia para API**
```typescript
const response = await fetch('http://localhost:3000/produtos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nome: "Coca-Cola 2L",
    descricao: "Bebidas > Refrigerantes",
    categoria_id: 4,
    fornecedor_id: 2,
    codigo_barras: "7891000100103",
    preco_custo: 3.50,
    preco_venda: 5.00,
    estoque_minimo: 24,
    ativo: true
  })
});
```

**PASSO 8: Backend Recebe (api/index.js)**
```javascript
app.post('/produtos', async (req, res) => {
  try {
    // req.body = dados JSON recebidos
    
    // Cria produto no banco
    const produto = await Produto.create(req.body);
    
    // Sequelize gera e executa:
    // INSERT INTO produtos (nome, categoria_id, ...)
    // VALUES ('Coca-Cola 2L', 4, ...)
    
    // Retorna produto com código gerado
    res.status(201).json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

**PASSO 9: Backend Cria Estoque Automaticamente**
```javascript
// Hook afterCreate do Sequelize
Produto.afterCreate(async (produto) => {
  await Estoque.create({
    produto_id: produto.codigo,
    quantidade_atual: 0,
    localizacao: null
  });
});

// SQL gerado:
// INSERT INTO estoque (produto_id, quantidade_atual)
// VALUES (5, 0)
```

**PASSO 10: Resposta Volta**
```javascript
// Backend responde:
{
  codigo: 5,
  nome: "Coca-Cola 2L",
  categoria_id: 4,
  fornecedor_id: 2,
  preco_venda: 5.00,
  // ... outros campos
}
```

**PASSO 11: Frontend Atualiza**
```typescript
if (response.ok) {
  Alert.alert('Sucesso', 'Produto criado!');
  setModalVisible(false);      // Fecha modal
  buscarProdutos();            // Recarrega lista
}
```

**PASSO 12: Lista Atualiza**
```
16. Modal fecha
17. Lista recarrega
18. "Coca-Cola 2L" aparece na lista!
```

**Tempo total:** ~500ms-1s (incluindo busca externa)

---

## 🌐 APIS EXTERNAS DETALHADAS <a name="apis-externas"></a>

### 1. ViaCEP (app/services/viaCep.ts)

**URL:** `https://viacep.com.br/ws/{cep}/json/`

**Função completa:**
```typescript
export async function buscarEnderecoPorCEP(cep: string) {
  try {
    // Remove caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, '');
    
    // Valida formato (8 dígitos)
    if (cepLimpo.length !== 8) {
      throw new Error('CEP inválido');
    }
    
    // Faz requisição
    const response = await fetch(
      `https://viacep.com.br/ws/${cepLimpo}/json/`
    );
    
    const data = await response.json();
    
    // Verifica erro
    if (data.erro) {
      throw new Error('CEP não encontrado');
    }
    
    return {
      cep: data.cep,           // "01310-100"
      logradouro: data.logradouro, // "Avenida Paulista"
      bairro: data.bairro,     // "Bela Vista"
      localidade: data.localidade, // "São Paulo"
      uf: data.uf,             // "SP"
      complemento: data.complemento
    };
  } catch (error) {
    throw error;
  }
}
```

**Exemplo de Uso Futuro:**
```typescript
// Na tela de fornecedor:
const handleBuscarCEP = async () => {
  const endereco = await buscarEnderecoPorCEP('01310100');
  setNovoCliente({
    ...novoCliente,
    rua: endereco.logradouro,
    bairro: endereco.bairro,
    cidade: endereco.localidade,
    estado: endereco.uf
  });
};
```

**Testes (100% coverage):**
- Testa CEP válido
- Testa CEP inválido
- Testa formato errado
- Testa erro de rede

---

### 2. Open Food Facts (app/services/codigoBarras.ts)

**URL:** `https://world.openfoodfacts.org/api/v0/product/{codigo}.json`

**Função completa:**
```typescript
export async function buscarProdutoPorCodigoBarras(codigo: string) {
  try {
    // Remove caracteres não numéricos
    const codigoLimpo = codigo.replace(/\D/g, '');
    
    // Valida código EAN (8 ou 13 dígitos)
    if (codigoLimpo.length !== 8 && codigoLimpo.length !== 13) {
      throw new Error('Código de barras inválido');
    }
    
    // Busca na API
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${codigoLimpo}.json`
    );
    
    const data = await response.json();
    
    // Verifica se encontrou
    if (data.status === 0) {
      return null; // Não encontrado
    }
    
    // Extrai dados úteis
    const product = data.product;
    
    return {
      product_name: product.product_name || '',      // Nome do produto
      brands: product.brands || '',                   // Marca
      categories: product.categories || '',           // Categorias
      image_url: product.image_url || '',            // Foto do produto
      quantity: product.quantity || '',              // Quantidade/Tamanho
      nutriscore_grade: product.nutriscore_grade,    // Nota nutricional
    };
  } catch (error) {
    throw error;
  }
}
```

**Exemplos Reais:**

```typescript
// Coca-Cola 2L
buscarProdutoPorCodigoBarras('7891000100103')
→ {
    product_name: "Coca-Cola",
    brands: "Coca-Cola",
    categories: "Beverages, Carbonated drinks",
    image_url: "https://..."
  }

// Leite Ninho
buscarProdutoPorCodigoBarras('7891000105108')
→ {
    product_name: "Leite Ninho",
    brands: "Nestlé",
    categories: "Dairy, Milk"
  }
```

**Uso no App:**
```typescript
// products.tsx - Linha ~158
const buscarCodigoBarras = async () => {
  const produto = await buscarProdutoPorCodigoBarras(
    novoProduto.codigo_barras
  );
  
  if (produto && produto.product_name) {
    Alert.alert(
      'Produto Encontrado',
      `${produto.product_name}\n${produto.brands || ''}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Usar Nome',
          onPress: () => {
            setNovoProduto({
              ...novoProduto,
              nome: produto.product_name || '',
              descricao: produto.categories || '',
            });
          },
        },
      ]
    );
  } else {
    Alert.alert('Não encontrado', 'Produto não encontrado na base de dados');
  }
};
```

**Testes (100% coverage):**
- Testa código válido
- Testa código inválido
- Testa produto não encontrado
- Testa erro de rede
- Testa diferentes formatos (EAN-8, EAN-13)

---

## 🧪 SISTEMA DE TESTES <a name="testes"></a>

### Framework: Jest + React Native Testing Library

#### **Configuração (jest.config.js):**

```javascript
module.exports = {
  preset: 'jest-expo',           // Preset para Expo
  
  transformIgnorePatterns: [     // O que NÃO transformar
    'node_modules/(?!((jest-)?react-native|...))'
  ],
  
  collectCoverageFrom: [         // O que incluir no coverage
    'app/**/*.{js,jsx,ts,tsx}',  // Todos arquivos em app/
    '!app/**/*.d.ts',            // Menos arquivos de tipo
    '!app/_layout.tsx',          // Menos layouts
    '!app/**/_layout.tsx',
  ],
  
  setupFilesAfterEnv: [          // Setup antes dos testes
    '<rootDir>/jest-setup.js'
  ],
  
  moduleNameMapper: {            // Aliases
    '^@/(.*)$': '<rootDir>/app/$1' // @ = app/
  },
};
```

---

#### **Exemplo de Teste - viaCep.test.ts:**

```typescript
import { buscarEnderecoPorCEP } from '../app/services/viaCep';

describe('buscarEnderecoPorCEP', () => {
  
  // TESTE 1: CEP válido
  test('deve buscar endereço por CEP válido', async () => {
    const resultado = await buscarEnderecoPorCEP('01310-100');
    
    expect(resultado).toBeDefined();
    expect(resultado.cep).toBe('01310-100');
    expect(resultado.localidade).toBe('São Paulo');
    expect(resultado.uf).toBe('SP');
  });
  
  // TESTE 2: CEP inválido
  test('deve lançar erro para CEP inválido', async () => {
    await expect(
      buscarEnderecoPorCEP('123')
    ).rejects.toThrow('CEP inválido');
  });
  
  // TESTE 3: CEP não encontrado
  test('deve lançar erro para CEP não encontrado', async () => {
    await expect(
      buscarEnderecoPorCEP('99999-999')
    ).rejects.toThrow('CEP não encontrado');
  });
});
```

**O que testa:**
- Função funciona com entrada válida?
- Rejeita entrada inválida?
- Trata erros corretamente?

---

#### **Coverage (Cobertura):**

**4 Métricas:**

1. **Statements** (Instruções)
   - Quantas linhas de código foram executadas
   - Exemplo: 50/100 linhas = 50%

2. **Branches** (Ramificações)
   - Quantos caminhos do código foram testados
   - Exemplo: `if/else` - testou ambos?

3. **Functions** (Funções)
   - Quantas funções foram chamadas
   - Exemplo: 5/10 funções = 50%

4. **Lines** (Linhas)
   - Similar a Statements
   - Porcentagem de linhas cobertas

**Resultado Atual:**
```
Services:
- codigoBarras.ts: 100% em todas métricas
- viaCep.ts: 100% em todas métricas
```

**HTML Interativo:**
- Abre `coverage/lcov-report/index.html`
- Verde = linha testada
- Vermelho = linha não testada
- Clica em arquivo para ver código

---

## 💡 CONCEITOS IMPORTANTES

### 1. **Async/Await vs Promises**

**Promises (antigo):**
```javascript
fetch('/clientes')
  .then(response => response.json())
  .then(data => setClientes(data))
  .catch(error => console.error(error));
```

**Async/Await (moderno):**
```javascript
const buscarClientes = async () => {
  try {
    const response = await fetch('/clientes');
    const data = await response.json();
    setClientes(data);
  } catch (error) {
    console.error(error);
  }
};
```

**Por que async/await?**
- Mais fácil de ler (parece código síncrono)
- try/catch para erros
- Padrão atual da indústria

---

### 2. **REST API - Verbos HTTP**

| Verbo | Uso | Exemplo |
|-------|-----|---------|
| GET | Buscar dados | GET /produtos (listar) |
| POST | Criar novo | POST /produtos (criar) |
| PUT | Atualizar completo | PUT /produtos/5 (atualizar tudo) |
| PATCH | Atualizar parcial | PATCH /clientes/2 (só status) |
| DELETE | Remover | DELETE /categorias/3 |

**Idempotência:**
- GET: Sempre retorna mesmo resultado
- DELETE: Deletar 2x = mesmo efeito que 1x
- POST: Criar 2x = cria 2 registros diferentes

---

### 3. **ORM vs SQL Direto**

**SQL Direto (sem ORM):**
```javascript
db.query('SELECT * FROM produtos WHERE categoria_id = ?', [2], (err, results) => {
  if (err) throw err;
  console.log(results);
});
```

**Com Sequelize (ORM):**
```javascript
const produtos = await Produto.findAll({
  where: { categoria_id: 2 }
});
```

**Vantagens ORM:**
- Mais legível
- Previne SQL Injection
- Funciona em vários bancos (SQLite, MySQL, PostgreSQL)
- Validações automáticas

---

### 4. **State Management no React**

```typescript
// Declarar estado
const [produtos, setProdutos] = useState<Produto[]>([]);

// Ler estado
console.log(produtos); // Array atual

// Atualizar estado
setProdutos([...produtos, novoProduto]); // Adiciona
setProdutos(produtos.filter(p => p.codigo !== 5)); // Remove
setProdutos([]); // Limpa

// React RE-RENDERIZA quando estado muda!
```

**Importante:** NUNCA modifique estado diretamente!
```typescript
// ERRADO:
produtos.push(novoProduto);  // Não re-renderiza!

// CERTO:
setProdutos([...produtos, novoProduto]); // Re-renderiza!
```

---

### 5. **Componentes Controlados (Formulários)**

```typescript
// Input controlado
const [nome, setNome] = useState('');

<S.Input
  value={nome}                           // React controla valor
  onChangeText={(text: string) => setNome(text)} // Atualiza estado
/>
```

**Fluxo:**
1. Usuário digita "A"
2. onChangeText chama setNome("A")
3. Estado atualiza
4. React re-renderiza
5. Input mostra "A"

**Por que?**
- React é única fonte da verdade
- Fácil validar/formatar input
- Fácil resetar formulário: `setNome('')`

---

## 📊 ESTATÍSTICAS DO PROJETO

### Linhas de Código:

| Arquivo/Pasta | Linhas |
|---------------|--------|
| api/index.js | ~650 |
| app/(tabs)/*.tsx (5 telas) | ~2.500 |
| app/(tabs)/*.styles.tsx (5) | ~1.500 |
| app/services/*.ts (2) | ~260 |
| constants/theme.ts | ~100 |
| __tests__/*.ts (5 arquivos) | ~400 |
| **TOTAL** | **~5.400 linhas** |

---

### Arquivos do Projeto:

| Tipo | Quantidade |
|------|------------|
| Telas (.tsx) | 5 |
| Estilos (.styles.tsx) | 5 |
| Services (.ts) | 2 |
| Testes (.test.ts/tsx) | 5 |
| API (.js) | 2 |
| Documentação (.md) | 20 |
| Configuração | 8 |
| **TOTAL** | **47 arquivos** |

---

### Complexidade por Tela:

| Tela | Linhas | Funções | Estados | Complexidade |
|------|--------|---------|---------|--------------|
| index.tsx | ~390 | 7 | 8 | Média |
| about.tsx | ~390 | 6 | 7 | Média |
| categories.tsx | ~280 | 5 | 4 | Baixa |
| products.tsx | ~560 | 8 | 10 | Alta |
| stock.tsx | ~300 | 6 | 7 | Média |

---

## 🎯 DECISÕES TÉCNICAS E POR QUÊS

### Por que SQLite e não MySQL?

**Vantagens:**
- Arquivo único, fácil backup
- Sem servidor separado
- Ideal para desenvolvimento
- Rápido para projetos pequenos/médios
- Usado no Android, iOS nativamente

**Desvantagens:**
- Não ideal para muitos acessos simultâneos
- Menos recursos que PostgreSQL/MySQL

**Solução:** Para produção, migrar para PostgreSQL (Sequelize facilita isso)

---

### Por que Expo e não React Native puro?

**Vantagens:**
- Desenvolvimento muito mais rápido
- Ferramentas prontas (câmera, galeria, etc)
- Teste no celular via Expo Go
- Build simplificado
- Atualização OTA (Over The Air)

**Desvantagens:**
- App um pouco maior
- Algumas libs nativas não funcionam

**Para este projeto:** Expo é perfeito!

---

### Por que TypeScript?

**Vantagens:**
- Detecta erros em desenvolvimento
- Autocomplete excelente
- Refatoração segura
- Documenta código (interfaces)
- Padrão em empresas grandes

**Exemplo de erro evitado:**
```typescript
interface Cliente {
  nome: string;
  email: string;
}

const cliente: Cliente = {
  nome: "João",
  emal: "joao@test.com"  // ERRO! 'emal' não existe
};
// TypeScript avisa antes de rodar!
```

---

### Por que Styled Components?

**Alternativas consideradas:**
1. StyleSheet (nativo) - Mistura estilos com lógica
2. CSS Modules - Não funciona em React Native
3. Tailwind - Usa classes, não styled
4. Emotion - Similar ao Styled Components

**Escolhemos Styled Components porque:**
- Separa estilos da lógica
- Componentes reutilizáveis
- Temas fáceis
- TypeScript integrado
- Usado em produção por empresas grandes
- Grande comunidade

---

## 🎓 GLOSSÁRIO DE TERMOS

### Frontend:

- **Component:** Peça reutilizável de UI (botão, card, input)
- **State:** Dados que mudam e causam re-renderização
- **Props:** Dados passados de pai para filho
- **Hook:** Função especial do React (useState, useEffect)
- **JSX:** Sintaxe que parece HTML mas é JavaScript
- **Render:** Processo de criar elementos na tela

### Backend:

- **Endpoint:** URL da API (ex: /clientes)
- **Route:** Caminho + método HTTP (GET /clientes)
- **Middleware:** Função que processa requisição (CORS, JSON parser)
- **ORM:** Biblioteca que abstrai SQL
- **Model:** Definição de uma tabela no ORM
- **Migration:** Script que altera estrutura do banco

### Banco:

- **PK (Primary Key):** Chave primária, identifica registro único
- **FK (Foreign Key):** Chave estrangeira, aponta para outra tabela
- **Index:** Estrutura para busca rápida
- **Constraint:** Regra (UNIQUE, NOT NULL, etc)
- **Join:** Unir dados de tabelas relacionadas

### HTTP:

- **Request:** Requisição do cliente para servidor
- **Response:** Resposta do servidor para cliente
- **Status Code:** Número que indica resultado (200=OK, 404=Not Found, 500=Error)
- **Header:** Metadados da requisição/resposta
- **Body:** Dados enviados/recebidos (JSON)

---

## 📝 CHECKLIST PARA APRESENTAÇÃO

### Preparação (Hoje):

- [ ] Ler este guia completamente
- [ ] Ler ROTEIRO_APRESENTACAO_COMPLETO.md
- [ ] Testar sistema localmente
- [ ] Verificar se API inicia
- [ ] Verificar se app abre no celular
- [ ] Preparar dados de exemplo
- [ ] Carregar bateria do celular
- [ ] Testar WiFi

### Durante Apresentação:

- [ ] Mostrar arquitetura (diagrama camadas)
- [ ] Explicar tecnologias principais
- [ ] Mostrar código do backend (api/index.js)
- [ ] Mostrar código do frontend (uma tela)
- [ ] Mostrar styled components e tema
- [ ] Demonstrar funcionando no celular
- [ ] Rodar testes (npm test)
- [ ] Mostrar coverage HTML
- [ ] Responder perguntas

---

## 🚀 COMANDOS ESSENCIAIS

### Desenvolvimento:

```bash
# Iniciar API
cd api
npm run dev
# Aguardar: "API rodando na porta 3000"

# Iniciar App (outro terminal)
npm start
# Escanear QR Code

# Rodar Testes
npm test

# Coverage
npm run test:coverage
```

### Troubleshooting:

```bash
# Limpar cache
npx expo start --clear

# Resetar banco
cd api
node reset-db.js
npm run dev

# Reinstalar dependências
rm -rf node_modules
npm install
```

---

## 🎯 CONCLUSÃO

Você agora tem conhecimento completo sobre:

- ✅ Todas as tecnologias usadas
- ✅ Como funciona cada parte
- ✅ Fluxo completo de dados
- ✅ Decisões técnicas e por quês
- ✅ Banco de dados e relacionamentos
- ✅ APIs externas e integrações
- ✅ Sistema de testes

**Você está 100% preparado para apresentar!**

**Boa sorte! 🎓**

---

**Documentos Relacionados:**
- [ROTEIRO_APRESENTACAO_COMPLETO.md](ROTEIRO_APRESENTACAO_COMPLETO.md) - Roteiro de falas
- [ORGANIZACAO_CODIGO.md](ORGANIZACAO_CODIGO.md) - Arquitetura Styled Components
- [API.md](API.md) - Referência rápida da API
- [COMO_USAR.md](COMO_USAR.md) - Manual de uso

**Leia tudo e estará 100% preparado! 💪**


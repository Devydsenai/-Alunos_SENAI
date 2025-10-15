# 📖 Roteiro Completo para Apresentação - Sistema Alunos SENAI

**Preparado para:** Apresentação em Sala de Aula  
**Data:** ${new Date().toLocaleDateString('pt-BR')}  
**Duração Estimada:** 15-20 minutos

---

## 🎯 VISÃO GERAL DO PROJETO

### O que é o Sistema?

É um **Sistema Completo de Gerenciamento** desenvolvido em React Native + Node.js que permite gerenciar:

1. **Fornecedores/Clientes** - Cadastro completo com fotos
2. **Categorias** - Organização de produtos
3. **Produtos** - Controle de catálogo com código de barras
4. **Estoque** - Controle de quantidades e movimentações

### Por que foi desenvolvido?

- Atender necessidades reais de empresas (almoxarifados, lojas, distribuidoras)
- Aplicar conhecimentos de React Native na prática
- Demonstrar integração Frontend + Backend
- Implementar arquitetura profissional

---

## 🏗️ ARQUITETURA DO SISTEMA

### Estrutura Geral (3 Camadas):

```
┌─────────────────────────────────────────┐
│   FRONTEND (React Native + Expo)       │
│   - 5 Telas principais                  │
│   - Styled Components                   │
│   - Sistema de Temas                    │
└──────────────┬──────────────────────────┘
               │ HTTP/REST
               │ (fetch API)
┌──────────────▼──────────────────────────┐
│   BACKEND (Node.js + Express)          │
│   - API REST                            │
│   - 5 Entidades principais              │
│   - Validações e Regras                 │
└──────────────┬──────────────────────────┘
               │ Sequelize ORM
               │
┌──────────────▼──────────────────────────┐
│   BANCO DE DADOS (SQLite)               │
│   - database.sqlite                     │
│   - 5 Tabelas                           │
└─────────────────────────────────────────┘
```

---

## 📱 PARTE 1: FRONTEND (React Native)

### Tecnologias Utilizadas:

#### 1. **React Native (v0.81.4)**
**O que é:** Framework para criar apps mobile nativos usando JavaScript/TypeScript  
**Por que usar:** 
- Um código roda em iOS e Android
- Performance nativa
- Grande comunidade

#### 2. **Expo (~54.0)**
**O que é:** Plataforma que facilita desenvolvimento React Native  
**Por que usar:**
- Desenvolvimento rápido
- Teste direto no celular (Expo Go)
- Ferramentas prontas (câmera, galeria, etc)

#### 3. **TypeScript (5.9)**
**O que é:** JavaScript com tipagem estática  
**Por que usar:**
- Detecta erros antes de executar
- Autocomplete melhor
- Código mais seguro

#### 4. **Styled Components** (NOVO!)
**O que é:** Biblioteca para estilizar componentes com CSS-in-JS  
**Por que usar:**
- Estilos organizados e separados
- Reutilização de componentes
- Temas centralizados
- Padrão usado em empresas grandes

#### 5. **Expo Router**
**O que é:** Sistema de navegação baseado em arquivos  
**Como funciona:**
- Pasta `app/(tabs)/` = Telas com abas
- Cada arquivo `.tsx` = Uma rota
- Navegação automática

---

### ESTRUTURA DO FRONTEND:

```
app/
├── (tabs)/                        # Telas principais
│   ├── index.tsx                  # Tela 1: Cadastro de Fornecedores
│   ├── about.tsx                  # Tela 2: Lista de Fornecedores
│   ├── categories.tsx             # Tela 3: Categorias
│   ├── products.tsx               # Tela 4: Produtos
│   ├── stock.tsx                  # Tela 5: Estoque
│   └── *.styles.tsx (5 arquivos)  # Estilos separados
│
├── services/                      # Integrações com APIs Externas
│   ├── viaCep.ts                  # Busca CEP
│   └── codigoBarras.ts            # Busca produtos por código
│
└── _layout.tsx                    # Configuração da navegação
```

---

### AS 5 TELAS DO SISTEMA:

#### TELA 1: **index.tsx** - Cadastro de Fornecedores

**Funcionalidade:** Criar novos fornecedores

**Campos:**
- Nome (obrigatório)
- Email (obrigatório, validado)
- Telefone (opcional)
- Foto 3x4 (câmera ou galeria)
- Status Ativo/Inativo (checkbox)

**Recursos Especiais:**
- Busca em tempo real (dropdown de sugestões)
- Captura de foto (Expo Image Picker)
- Validação de email duplicado

**Fluxo:**
1. Usuário preenche dados
2. Clica em "Tirar Foto" ou "Galeria"
3. Seleciona/tira foto
4. Clica em "Criar Fornecedor"
5. App envia POST para API
6. Mostra mensagem de sucesso

---

#### TELA 2: **about.tsx** - Lista de Fornecedores

**Funcionalidade:** Visualizar e gerenciar todos os fornecedores

**Recursos:**
- Lista completa com fotos grandes (200x200)
- Busca por nome, email ou telefone
- Botões: Editar, Ativar/Desativar, Deletar
- Badge visual de status (verde=ativo, vermelho=inativo)

**Fluxo Editar:**
1. Clica em "Editar"
2. Abre modal preenchido
3. Altera dados
4. Clica em "Atualizar"
5. PUT para API

**Fluxo Deletar:**
1. Clica em "Deletar"
2. DELETE para API
3. Atualiza lista automaticamente

---

#### TELA 3: **categories.tsx** - Gestão de Categorias

**Funcionalidade:** Organizar produtos em categorias

**Campos do Modal:**
- Nome da categoria (obrigatório)
- Descrição (opcional, multiline)
- Status Ativo/Inativo

**Recursos:**
- Botão "Nova" abre modal
- Lista todas as categorias em cards
- Editar e Excluir
- Categorias inativas ficam opacas

**Por que ter categorias?**
- Organiza produtos (ex: Eletrônicos, Alimentos, Higiene)
- Facilita busca e filtros
- Relatórios por categoria

---

#### TELA 4: **products.tsx** - Gestão de Produtos

**Funcionalidade:** Cadastro completo de produtos do estoque

**Campos do Modal:**
- Nome do produto (obrigatório)
- Descrição (opcional)
- Foto do produto
- **Código de barras** (com busca automática!)
- Categoria (seleção horizontal)
- Fornecedor (seleção horizontal)
- Preço de custo
- Preço de venda
- Estoque mínimo

**Recurso Destaque: Código de Barras**
1. Digite o código (ex: 7891234567890)
2. Clique no botão de busca (lupa laranja)
3. Sistema busca na API Open Food Facts
4. Preenche automaticamente nome e descrição!

**Seletores Horizontais:**
- Categorias aparecem como chips clicáveis
- Fornecedores aparecem como chips clicáveis
- Seleção visual (chip fica verde quando selecionado)

---

#### TELA 5: **stock.tsx** - Controle de Estoque

**Funcionalidade:** Gerenciar quantidades de produtos

**Seções da Tela:**

**1. Resumo (Dashboard):**
- Total de produtos
- Produtos com estoque baixo (alerta laranja)
- Total de itens no estoque

**2. Filtro:**
- Botão "Baixo" mostra só produtos abaixo do mínimo
- Ajuda identificar o que precisa repor

**3. Lista de Estoque:**
Cada card mostra:
- Foto do produto
- Nome
- Localização no almoxarifado
- Quantidade atual (verde ou laranja se baixo)
- Estoque mínimo
- Última movimentação
- Ícone de alerta (se estoque baixo)

**4. Movimentações:**
- Botão "Entrada": adiciona ao estoque
- Botão "Saída": remove do estoque
- Modal mostra estoque atual antes de confirmar
- Valida se tem quantidade suficiente para saída

**Fluxo de Entrada:**
1. Clica "Entrada" no produto
2. Modal pergunta quantidade
3. Digite (ex: 50)
4. Confirma
5. POST para `/movimentacoes` com tipo='entrada'
6. Estoque atualiza automaticamente

---

## 🎨 SISTEMA DE STYLED COMPONENTS (NOVO!)

### O que mudou?

**ANTES (StyleSheet):**
```javascript
// Estilos misturados com código
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  }
});

// Uso
<View style={styles.container}>
  <Text style={styles.title}>Título</Text>
</View>
```

**DEPOIS (Styled Components):**
```javascript
// Arquivo: products.styles.tsx (separado!)
import styled from 'styled-components/native';
import { colors, spacing } from '../../constants/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: ${spacing.xl}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.textPrimary};
`;

// Arquivo: products.tsx (só lógica!)
import * as S from './products.styles';

<S.Container>
  <S.Title>Título</S.Title>
</S.Container>
```

### Vantagens:

1. **Organização:** Estilos separados da lógica
2. **Reutilização:** Componentes podem ser reutilizados
3. **Temas:** Cores centralizadas em `theme.ts`
4. **Manutenção:** Mudar cor em 1 lugar atualiza tudo
5. **Profissional:** Padrão usado em Uber, Airbnb, etc

---

### Sistema de Temas (`constants/theme.ts`):

```typescript
export const colors = {
  primary: '#4CAF50',      // Verde principal
  secondary: '#2196F3',    // Azul
  error: '#F44336',        // Vermelho (erros)
  warning: '#FF9800',      // Laranja (alertas)
  success: '#4CAF50',      // Verde (sucesso)
  // ... mais 15 cores
};

export const spacing = {
  xs: 4,   sm: 8,   md: 12,
  lg: 16,  xl: 20,  xxl: 30
};

export const fontSize = {
  xs: 10,  sm: 12,  md: 14,
  lg: 16,  xl: 18,  title: 24
};
```

**Benefício:** Mudar `colors.primary` de verde para azul atualiza TODO o app!

---

## 🔧 PARTE 2: BACKEND (Node.js + Express)

### Tecnologias da API:

#### 1. **Node.js (18+)**
**O que é:** Ambiente para rodar JavaScript no servidor  
**Por que:** Mesma linguagem do frontend (JavaScript/TypeScript)

#### 2. **Express**
**O que é:** Framework web minimalista para Node.js  
**Por que:** Criar rotas HTTP facilmente

#### 3. **Sequelize**
**O que é:** ORM (Object-Relational Mapping)  
**Por que:** Trabalhar com banco sem escrever SQL direto  
**Como funciona:** Define modelos em JavaScript, Sequelize gera SQL

#### 4. **SQLite**
**O que é:** Banco de dados em arquivo único  
**Por que:** 
- Simples, sem servidor separado
- Arquivo `database.sqlite`
- Perfeito para desenvolvimento

#### 5. **CORS**
**O que é:** Permite requisições de outras origens  
**Por que:** Frontend (Expo) precisa acessar API

---

### ESTRUTURA DA API:

```
api/
├── index.js           # API completa (651 linhas)
├── database.sqlite    # Banco de dados
├── reset-db.js        # Script para resetar banco
└── package.json       # Dependências
```

**Porta:** 3000  
**URL:** `http://localhost:3000`

---

### OS 5 MODELOS (Tabelas) DO BANCO:

#### 1. **Cliente (Fornecedores)**
```javascript
{
  codigo: INTEGER (PK, auto increment),
  nome: STRING (obrigatório),
  email: STRING (obrigatório, validado),
  telefone: STRING (opcional),
  ativo: BOOLEAN (padrão: true),
  foto: TEXT (URI da foto),
  createdAt: TIMESTAMP (automático),
  updatedAt: TIMESTAMP (automático)
}
```

**Validações:**
- Email deve ser válido (@)
- Nome não pode ser vazio
- Email único foi removido (para facilitar testes)

---

#### 2. **Categoria**
```javascript
{
  codigo: INTEGER (PK, auto increment),
  nome: STRING (obrigatório, único),
  descricao: TEXT (opcional),
  ativo: BOOLEAN (padrão: true),
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

**Validação:** Nome da categoria deve ser único

---

#### 3. **Produto**
```javascript
{
  codigo: INTEGER (PK, auto increment),
  nome: STRING (obrigatório),
  descricao: TEXT (opcional),
  categoria_id: INTEGER (FK → Categoria),
  fornecedor_id: INTEGER (FK → Cliente),
  foto: TEXT (URI),
  codigo_barras: STRING (opcional),
  preco_custo: DECIMAL (padrão: 0),
  preco_venda: DECIMAL (padrão: 0),
  estoque_minimo: INTEGER (padrão: 0),
  ativo: BOOLEAN (padrão: true),
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

**Relacionamentos:**
- `categoria_id` → Pertence a uma Categoria
- `fornecedor_id` → Fornecido por um Cliente

**Include Automático:**
Quando busca produto, já traz categoria e fornecedor:
```javascript
include: [
  { model: Categoria, as: 'categoria' },
  { model: Fornecedor, as: 'fornecedor' }
]
```

---

#### 4. **Estoque**
```javascript
{
  produto_id: INTEGER (PK, FK → Produto),
  quantidade_atual: INTEGER (padrão: 0),
  localizacao: STRING (opcional, ex: "Prateleira A-2"),
  data_ultima_mov: TIMESTAMP,
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

**Nota:** 1 produto = 1 registro de estoque (relação 1:1)

---

#### 5. **Movimentacao** (Histórico)
```javascript
{
  codigo: INTEGER (PK, auto increment),
  tipo: STRING ('entrada' ou 'saida'),
  produto_id: INTEGER (FK → Produto),
  quantidade: INTEGER,
  usuario: STRING,
  observacao: TEXT,
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

**Tipos:**
- `'entrada'`: Adiciona ao estoque
- `'saida'`: Remove do estoque

**Automação:**
Quando cria movimentação, a API automaticamente:
1. Atualiza `quantidade_atual` no Estoque
2. Atualiza `data_ultima_mov`
3. Registra quem fez e quando

---

## 📡 ROTAS DA API (Endpoints)

### Health Check:
```
GET /
Retorna: { status: 'ok' }
Uso: Verificar se API está rodando
```

---

### CLIENTES (Fornecedores):

#### 1. Listar Todos
```
GET /clientes

Retorna: Array de clientes
[
  {
    codigo: 1,
    nome: "Fornecedor ABC",
    email: "abc@email.com",
    telefone: "11999999999",
    ativo: true,
    foto: "file:///..."
  }
]
```

#### 2. Buscar Um
```
GET /clientes/:codigo

Exemplo: GET /clientes/1
Retorna: Objeto do cliente
```

#### 3. Criar
```
POST /clientes
Body: {
  nome: "Novo Fornecedor",
  email: "novo@email.com",
  telefone: "11888888888",
  ativo: true,
  foto: ""
}

Retorna: Cliente criado com código
```

#### 4. Atualizar Completo
```
PUT /clientes/:codigo
Body: { todos os campos }

Atualiza todos os dados do cliente
```

#### 5. Atualizar Parcial
```
PATCH /clientes/:codigo
Body: { ativo: false }

Atualiza apenas campos enviados
Uso: Ativar/Desativar fornecedor
```

#### 6. Deletar
```
DELETE /clientes/:codigo

Remove cliente do banco
```

---

### CATEGORIAS:

```
GET    /categorias              # Listar todas
GET    /categorias/:codigo      # Buscar uma
POST   /categorias              # Criar
PUT    /categorias/:codigo      # Atualizar
DELETE /categorias/:codigo      # Deletar
```

**Mesma estrutura que clientes!**

---

### PRODUTOS:

```
GET    /produtos                # Listar todos (com categoria e fornecedor)
GET    /produtos/:codigo        # Buscar um
POST   /produtos                # Criar
PUT    /produtos/:codigo        # Atualizar
DELETE /produtos/:codigo        # Deletar (remove estoque também!)
```

**Importante:** Quando cria produto, cria estoque automaticamente com quantidade 0.

**DELETE especial:**
Quando deleta produto, a API:
1. Deleta estoque associado
2. Deleta movimentações associadas
3. Deleta o produto
(Em ordem, para não dar erro de FK)

---

### ESTOQUE:

```
GET /estoque

Retorna: Array com produtos e estoque
[
  {
    produto_id: 1,
    quantidade_atual: 50,
    localizacao: "Prateleira A-1",
    data_ultima_mov: "2024-10-15",
    produto: {
      codigo: 1,
      nome: "Produto X",
      foto: "...",
      estoque_minimo: 10
    }
  }
]
```

**Include:** Já traz dados do produto junto!

---

### MOVIMENTAÇÕES:

#### Criar Movimentação
```
POST /movimentacoes
Body: {
  tipo: "entrada",        # ou "saida"
  produto_id: 1,
  quantidade: 20,
  usuario: "João",
  observacao: "Compra fornecedor"
}

O que acontece automaticamente:
1. Valida tipo (só aceita 'entrada' ou 'saida')
2. Se entrada: quantidade_atual += quantidade
3. Se saída: quantidade_atual -= quantidade
4. Atualiza data_ultima_mov
5. Salva histórico na tabela movimentacoes
```

#### Listar Histórico
```
GET /movimentacoes?produto_id=1

Retorna histórico de um produto específico
```

---

## 🔗 FLUXO COMPLETO DE DADOS

### Exemplo: Cadastrar Produto

```
1. FRONTEND (products.tsx):
   ↓
   Usuário preenche formulário
   ↓
   Clica em "Salvar"
   ↓
   
2. CÓDIGO:
   ↓
   const salvarProduto = async () => {
     const dados = {
       nome: "Notebook Dell",
       categoria_id: 2,
       fornecedor_id: 1,
       preco_custo: 2000,
       preco_venda: 2500,
       estoque_minimo: 5
     };
     
     await fetch('http://localhost:3000/produtos', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(dados)
     });
   }
   ↓

3. BACKEND (api/index.js):
   ↓
   app.post('/produtos', async (req, res) => {
     // Cria produto no banco
     const produto = await Produto.create(req.body);
     
     // Cria estoque automático
     await Estoque.create({
       produto_id: produto.codigo,
       quantidade_atual: 0
     });
     
     res.json(produto);
   });
   ↓

4. BANCO DE DADOS:
   ↓
   INSERT INTO produtos (nome, categoria_id, ...) VALUES (...)
   INSERT INTO estoque (produto_id, quantidade_atual) VALUES (...)
   ↓

5. RESPOSTA:
   ↓
   Frontend recebe produto criado
   ↓
   Mostra "Sucesso!"
   ↓
   Recarrega lista de produtos
```

---

## 🌐 APIS EXTERNAS

### 1. **ViaCEP** (app/services/viaCep.ts)

**O que faz:** Busca endereço por CEP

**Uso:** (Preparado para futuro uso)
```typescript
const dados = await buscarEnderecoPorCEP('01310-100');
// Retorna: rua, bairro, cidade, estado
```

**API:** https://viacep.com.br/ws/{cep}/json/

**Coverage:** 100%

---

### 2. **Open Food Facts** (app/services/codigoBarras.ts)

**O que faz:** Busca informações de produtos por código de barras

**Uso:**
```typescript
const produto = await buscarProdutoPorCodigoBarras('7891234567890');
// Retorna: nome, marca, categoria, imagem
```

**API:** https://world.openfoodfacts.org/api/v0/product/{codigo}.json

**Coverage:** 100%

**Exemplo Real:**
- Digite: 7891000100103 (Coca-Cola)
- Retorna: "Coca Cola" com todas as infos!

---

## 📦 DEPENDÊNCIAS DO PROJETO

### Frontend (package.json):

**Essenciais:**
```json
{
  "expo": "~54.0",                    // Plataforma
  "react": "19.1.0",                  // React
  "react-native": "0.81.4",           // Framework mobile
  "expo-router": "~6.0",              // Navegação
  "styled-components": "^6.x",        // Estilos (NOVO!)
  "@expo/vector-icons": "^15.0",      // Ícones
  "expo-image-picker": "^17.0",       // Câmera/Galeria
  "typescript": "~5.9"                // Tipagem
}
```

**DevDependencies (Testes):**
```json
{
  "jest": "^30.2",
  "@testing-library/react-native": "^13.3",
  "@types/styled-components": "^x.x"  // Types (NOVO!)
}
```

---

### Backend (api/package.json):

```json
{
  "express": "^4.18",          // Framework web
  "sequelize": "^6.35",        // ORM
  "sqlite3": "^5.1",           // Driver SQLite
  "cors": "^2.8",              // CORS
  "nodemon": "^3.1"            // Auto-reload
}
```

---

## 🚀 COMO TUDO FUNCIONA JUNTO

### Inicialização do Sistema:

#### Terminal 1 - API:
```bash
cd api
npm run dev
```

**O que acontece:**
1. Node.js executa `api/index.js`
2. Sequelize conecta ao SQLite (`database.sqlite`)
3. Se não existe, cria banco novo
4. Sincroniza modelos (cria tabelas)
5. Inicia servidor Express na porta 3000
6. Console: "Banco conectado e modelos sincronizados."
7. Console: "API rodando na porta 3000"

**Nodemon:** Monitora mudanças no código e reinicia automaticamente

---

#### Terminal 2 - App:
```bash
npm start
```

**O que acontece:**
1. Expo inicia Metro Bundler (porta 8081)
2. Gera QR Code
3. Compila TypeScript
4. Carrega app no Expo Go
5. Console: "Expo DevTools rodando..."

---

### Fluxo de Uma Requisição Completa:

**Exemplo: Listar Produtos**

```
1. USUÁRIO
   ↓
   Abre tela "Produtos"
   
2. REACT (products.tsx)
   ↓
   useEffect executa buscarProdutos()
   
3. FETCH API
   ↓
   fetch('http://localhost:3000/produtos')
   
4. EXPRESS (api/index.js)
   ↓
   app.get('/produtos', async (req, res) => {
     const produtos = await Produto.findAll({
       include: ['categoria', 'fornecedor']
     });
     res.json(produtos);
   });
   
5. SEQUELIZE
   ↓
   SELECT * FROM produtos
   LEFT JOIN categorias ON produtos.categoria_id = categorias.codigo
   LEFT JOIN clientes ON produtos.fornecedor_id = clientes.codigo
   
6. SQLITE
   ↓
   Busca dados no database.sqlite
   
7. RESPOSTA
   ↓
   JSON volta para frontend
   
8. REACT ATUALIZA
   ↓
   setProdutos(data)
   
9. TELA RENDERIZA
   ↓
   Lista aparece na tela do celular
```

**Tempo total:** ~100-300ms

---

## 🧪 TESTES AUTOMATIZADOS

### Estrutura de Testes:

```
__tests__/
├── services/
│   ├── codigoBarras.test.ts    # Testa API código barras
│   ├── viaCep.test.ts          # Testa API ViaCEP
│   └── utils.test.ts           # Funções auxiliares
├── components/
│   └── ClientCard.test.tsx     # Componente de teste
└── example.test.tsx            # Exemplo básico
```

**Framework:** Jest + React Native Testing Library

**Comandos:**
```bash
npm test                 # Roda testes
npm run test:watch       # Modo watch
npm run test:coverage    # Com cobertura
```

**Resultado Atual:**
- 68 testes passando
- 100% cobertura em services
- 0 testes falhando

---

### Exemplo de Teste:

```typescript
// Testa se busca CEP funciona
test('deve buscar endereço por CEP válido', async () => {
  const resultado = await buscarEnderecoPorCEP('01310-100');
  
  expect(resultado).toBeDefined();
  expect(resultado.localidade).toBe('São Paulo');
  expect(resultado.uf).toBe('SP');
});
```

**Coverage HTML:** `coverage/lcov-report/index.html`  
Mostra código colorido (verde=testado, vermelho=não testado)

---

## 📁 ESTRUTURA DE PASTAS EXPLICADA

### Onde fica cada coisa:

```
Alunos_SENAI/
│
├── app/                    # FRONTEND
│   ├── (tabs)/            # TELAS PRINCIPAIS
│   │   │
│   │   ├── index.tsx              # TELA: Cadastrar fornecedor
│   │   ├── index.styles.tsx       # ESTILOS: Botões, inputs, etc
│   │   │
│   │   ├── about.tsx              # TELA: Lista fornecedores
│   │   ├── about.styles.tsx       # ESTILOS: Cards, badges
│   │   │
│   │   ├── categories.tsx         # TELA: Gerenciar categorias
│   │   ├── categories.styles.tsx  # ESTILOS: Modal, lista
│   │   │
│   │   ├── products.tsx           # TELA: Gerenciar produtos
│   │   ├── products.styles.tsx    # ESTILOS: Form complexo
│   │   │
│   │   ├── stock.tsx              # TELA: Controle estoque
│   │   └── stock.styles.tsx       # ESTILOS: Dashboard, cards
│   │
│   └── services/          # INTEGRAÇÕES EXTERNAS
│       ├── viaCep.ts             # Busca CEP
│       └── codigoBarras.ts       # Busca código barras
│
├── components/             # COMPONENTES REUTILIZÁVEIS
│   └── README.md          # (vazio, preparado para futuro)
│
├── constants/              # CONFIGURAÇÕES GLOBAIS
│   └── theme.ts           # Cores, espaçamentos, fontes
│
├── hooks/                  # HOOKS PERSONALIZADOS
│   └── README.md          # (vazio, preparado para futuro)
│
├── api/                    # BACKEND
│   ├── index.js           # API REST completa
│   ├── database.sqlite    # Banco de dados
│   └── reset-db.js        # Reset banco
│
├── __tests__/              # TESTES
│   ├── services/          # Testa integrações
│   └── components/        # Testa componentes
│
├── coverage/               # RELATÓRIOS DE TESTES
│   └── lcov-report/       # HTML interativo
│
├── docs/                   # DOCUMENTAÇÃO (20 arquivos)
│   ├── README.md          # Índice
│   ├── ROTEIRO_APRESENTACAO_COMPLETO.md  # ESTE ARQUIVO
│   └── ...
│
└── assets/                 # RECURSOS
    └── images/            # Ícones do app
```

---

## 🎯 PADRÕES DE CÓDIGO UTILIZADOS

### 1. **Nomenclatura:**

**Componentes:** PascalCase
```typescript
function HomeScreen() { }
const Cliente = sequelize.define('Cliente', { });
```

**Variáveis/Funções:** camelCase
```typescript
const buscarClientes = async () => { };
const [novoCliente, setNovoCliente] = useState({ });
```

**Constantes:** UPPER_CASE
```typescript
const API_URL = 'http://localhost:3000';
```

**Arquivos:**
- Componentes: `PascalCase.tsx`
- Estilos: `nome.styles.tsx`
- Utilitários: `camelCase.ts`

---

### 2. **TypeScript - Interfaces:**

```typescript
// Define formato dos dados
interface Cliente {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;
  ativo: boolean;
  foto?: string;  // ? = opcional
}

// Uso
const [clientes, setClientes] = useState<Cliente[]>([]);
```

**Benefício:** IDE avisa se tentar acessar campo que não existe!

---

### 3. **Async/Await:**

```typescript
// Função assíncrona
const buscarClientes = async () => {
  try {
    const response = await fetch(`${API_URL}/clientes`);
    const data = await response.json();
    setClientes(data);
  } catch (error) {
    Alert.alert('Erro', 'Falha na conexão');
  }
};
```

**Por que usar:** Código mais limpo que .then().then()

---

### 4. **Hooks do React:**

```typescript
// Estado
const [clientes, setClientes] = useState<Cliente[]>([]);

// Efeito (executa ao montar componente)
useEffect(() => {
  buscarClientes();
}, []);

// Efeito ao focar tela (navigation)
useFocusEffect(
  React.useCallback(() => {
    buscarClientes(); // Recarrega ao voltar
  }, [])
);
```

---

## 🎨 DECISÕES DE DESIGN

### Cores do Sistema:

- **Verde (#4CAF50):** Sucesso, ativo, confirmações
- **Vermelho (#F44336):** Erro, inativo, deletar
- **Azul (#2196F3):** Informação, editar, links
- **Laranja (#FF9800):** Alerta, estoque baixo
- **Roxo (#9C27B0):** Secundário, fornecedores

### Por que essas cores?
- Material Design (padrão do Google)
- Cores universais e acessíveis
- Significado intuitivo

---

### Tamanhos de Foto:

- **Fornecedores:** 200x200 (grandes, destaque visual)
- **Produtos:** 80x80 ou 100x100 (médias, em listas)
- **Aspect Ratio:** 3:4 (padrão foto 3x4)

**Por que 3x4?** Requisito do projeto (foto tipo documento)

---

## 💡 FUNCIONALIDADES ESPECIAIS

### 1. **Busca em Tempo Real (index.tsx)**

Enquanto digita, mostra dropdown com sugestões:
- Busca por nome, email ou telefone
- Mostra até 5 resultados
- Clique seleciona e fecha dropdown
- Delay de 200ms no onBlur (permite clique)

---

### 2. **Código de Barras Automático (products.tsx)**

```typescript
const buscarCodigoBarras = async () => {
  const produto = await buscarProdutoPorCodigoBarras(codigo);
  
  if (produto && produto.product_name) {
    Alert.alert(
      'Produto Encontrado',
      produto.product_name,
      [
        { text: 'Cancelar' },
        { 
          text: 'Usar Nome',
          onPress: () => setNovoProduto({
            ...novoProduto,
            nome: produto.product_name
          })
        }
      ]
    );
  }
};
```

**Usuário:**
1. Digita código: 7891000100103
2. Clica na lupa
3. Sistema busca na internet
4. Mostra: "Coca-Cola 2L"
5. Pergunta: "Usar Nome?"
6. Clica sim
7. Campo nome preenche automaticamente!

---

### 3. **Validação de Estoque na Saída**

```typescript
if (tipoMovimentacao === 'saida' && qtd > estoqueAtual) {
  Alert.alert('Erro', `Quantidade maior que estoque (${estoqueAtual})`);
  return;
}
```

**Evita:** Estoque negativo

---

### 4. **Atualização Automática de Listas**

```typescript
useFocusEffect(
  React.useCallback(() => {
    buscarProdutos(); // Recarrega ao voltar para tela
  }, [])
);
```

**Cenário:**
1. Cria produto na tela Produtos
2. Vai para tela Estoque
3. Produto já aparece lá!

---

## 🔒 VALIDAÇÕES IMPLEMENTADAS

### Frontend:

1. **Campos Obrigatórios:**
```typescript
if (!novoCliente.nome || !novoCliente.email) {
  Alert.alert('Erro', 'Nome e email são obrigatórios');
  return;
}
```

2. **Email Válido:**
```typescript
keyboardType="email-address"  // Teclado específico
autoCapitalize="none"          // Sem maiúsculas
```

3. **Números:**
```typescript
keyboardType="numeric"         // Só números
keyboardType="phone-pad"       // Teclado telefone
keyboardType="decimal-pad"     // Decimais (preços)
```

---

### Backend:

1. **Validação de Email:**
```javascript
email: {
  type: DataTypes.STRING,
  validate: { isEmail: true }  // Sequelize valida
}
```

2. **Campos Obrigatórios:**
```javascript
nome: {
  type: DataTypes.STRING,
  allowNull: false,           // Não pode ser null
  validate: { notEmpty: true } // Não pode ser vazio
}
```

3. **Valores Padrão:**
```javascript
ativo: {
  type: DataTypes.BOOLEAN,
  defaultValue: true  // Padrão: ativo
}
```

---

## 📸 GERENCIAMENTO DE FOTOS

### Como funciona:

**1. Solicita Permissão:**
```typescript
const { status } = await ImagePicker.requestCameraPermissionsAsync();
if (status !== 'granted') {
  Alert.alert('Permissão Negada', '...');
  return;
}
```

**2. Abre Câmera ou Galeria:**
```typescript
const result = await ImagePicker.launchCameraAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [3, 4],      // Proporção 3:4
  quality: 0.5         // 50% qualidade (reduz tamanho)
});
```

**3. Salva URI:**
```typescript
if (!result.canceled && result.assets[0]) {
  setNovoCliente({
    ...novoCliente, 
    foto: result.assets[0].uri  // "file:///..."
  });
}
```

**4. Envia para API:**
A URI (caminho do arquivo) vai pro banco como TEXT

**5. Exibe na Tela:**
```typescript
<S.ClienteFoto source={{ uri: item.foto }} />
```

---

## 🔄 CICLO DE VIDA DAS TELAS

### 1. **Montagem (useEffect):**
```typescript
useEffect(() => {
  buscarDados(); // Executa 1x ao abrir tela
}, []);
```

### 2. **Foco (useFocusEffect):**
```typescript
useFocusEffect(
  React.useCallback(() => {
    buscarDados(); // Executa SEMPRE que volta pra tela
  }, [])
);
```

**Diferença:**
- `useEffect`: Só quando cria componente
- `useFocusEffect`: Toda vez que foca (volta pra tela)

---

## 🎯 PONTOS FORTES PARA MENCIONAR

### 1. **Arquitetura Moderna**
"Implementamos Styled Components, padrão usado por empresas como Uber, Airbnb e Netflix"

### 2. **Sistema de Temas**
"Todas as cores estão centralizadas. Mudar uma cor atualiza em todo o app automaticamente"

### 3. **Separação de Responsabilidades**
"Cada tela tem seu arquivo de estilos separado. Facilita manutenção e trabalho em equipe"

### 4. **APIs Externas**
"Integramos com ViaCEP para buscar endereços e Open Food Facts para buscar produtos por código de barras"

### 5. **Testes Automatizados**
"68 testes rodando automaticamente. Services têm 100% de cobertura"

### 6. **Banco de Dados Relacional**
"Usamos SQLite com Sequelize ORM. Relacionamentos entre Produtos, Categorias e Fornecedores"

### 7. **Código Profissional**
"Removemos todos os emojis conforme orientação. Código pronto para ambiente corporativo"

---

## 📊 DEMONSTRAÇÃO SUGERIDA

### Ordem de Apresentação (15-20 min):

#### 1. **Introdução (2 min)**
- Apresentar o que é o sistema
- Mostrar telas rapidamente
- Mencionar tecnologias

#### 2. **Arquitetura (3 min)**
- Mostrar diagrama (Frontend → Backend → Banco)
- Explicar como se comunicam
- Falar das 3 camadas

#### 3. **Backend/API (3 min)**
- Abrir `api/index.js`
- Mostrar estrutura dos modelos
- Mostrar uma rota (ex: GET /produtos)
- Explicar Sequelize e relacionamentos

#### 4. **Frontend - Styled Components (4 min)**
- Mostrar arquivo de tema (`constants/theme.ts`)
- Mostrar uma tela (ex: `products.tsx`)
- Mostrar arquivo de estilos (`products.styles.tsx`)
- Explicar vantagens da separação

#### 5. **Funcionalidade Ao Vivo (5 min)**
- Abrir app no celular
- Criar um fornecedor com foto
- Criar uma categoria
- Criar um produto com código de barras
- Fazer entrada de estoque
- Mostrar lista atualizada

#### 6. **Testes e Qualidade (2 min)**
- Rodar `npm test` no terminal
- Mostrar 68 testes passando
- Abrir `coverage/lcov-report/index.html`
- Mostrar 100% em services

#### 7. **Conclusão (1 min)**
- Resumir diferenciais
- Mencionar que está pronto para produção
- Agradecer

---

## 💬 ROTEIRO DE FALAS SUGERIDAS

### Abertura:

> "Bom dia/Boa tarde! Vou apresentar o Sistema de Gerenciamento desenvolvido em React Native com Node.js. É um sistema completo para controle de fornecedores, produtos e estoque, que pode ser usado em empresas reais como distribuidoras, lojas e almoxarifados."

---

### Falando sobre Tecnologias:

> "No frontend, usamos React Native com Expo, que permite desenvolver um app que roda tanto em iOS quanto Android com o mesmo código. Implementamos Styled Components, que é uma biblioteca moderna usada por empresas como Uber e Airbnb, para organizar melhor os estilos."

> "No backend, temos uma API REST em Node.js com Express, usando Sequelize como ORM para trabalhar com SQLite. Isso nos permite ter um banco de dados relacional sem precisar de um servidor separado."

---

### Falando sobre Arquitetura:

> "A arquitetura segue o padrão MVC adaptado para mobile. O frontend se comunica com o backend via HTTP/REST, fazendo requisições GET, POST, PUT e DELETE. O backend processa essas requisições, valida os dados, e usa o Sequelize para fazer as operações no banco SQLite."

> "Organizamos o código em pastas específicas: components para componentes reutilizáveis, constants para temas e configurações, hooks para lógica reutilizável, e services para integrações com APIs externas."

---

### Falando sobre Styled Components:

> "Refatoramos todo o projeto usando Styled Components. Antes, os estilos ficavam misturados com a lógica no mesmo arquivo. Agora, cada tela tem seu arquivo .styles.tsx separado, e todas as cores vêm de um tema centralizado. Isso facilita muito a manutenção - se precisar mudar uma cor, mudo em um único lugar e atualiza em todo o app."

---

### Falando sobre o Banco:

> "O banco tem 5 tabelas principais: Clientes (fornecedores), Categorias, Produtos, Estoque e Movimentações. Temos relacionamentos: um Produto pertence a uma Categoria e a um Fornecedor. Quando buscamos produtos, o Sequelize faz join automático e já traz os dados relacionados."

---

### Falando sobre APIs Externas:

> "Integramos duas APIs externas: ViaCEP para buscar endereços por CEP, e Open Food Facts para buscar informações de produtos pelo código de barras. Por exemplo, se digitar o código de uma Coca-Cola, o sistema busca na internet e preenche automaticamente o nome e categoria do produto."

---

### Falando sobre Testes:

> "Implementamos testes automatizados com Jest. Temos 68 testes rodando, e os services têm 100% de cobertura. Geramos relatórios HTML interativos que mostram exatamente quais linhas do código estão testadas."

---

### Falando sobre Código Profissional:

> "Seguindo as orientações recebidas, removemos todos os emojis do código - total de 32 emojis removidos do frontend e backend. O código agora segue padrões corporativos, pronto para ambiente empresarial."

---

### Fechamento:

> "Este sistema demonstra a aplicação prática de conceitos modernos de desenvolvimento: arquitetura em camadas, separação de responsabilidades, testes automatizados, e integração frontend-backend. Está pronto para ser usado em produção e pode ser facilmente expandido com novas funcionalidades."

---

## ❓ PERGUNTAS QUE PODEM FAZER

### "Por que usar React Native em vez de app nativo?"

**Resposta:**  
> "React Native permite criar um app com uma única base de código que funciona em iOS e Android. Isso economiza tempo e recursos - não precisa manter duas equipes separadas. Empresas como Facebook, Instagram, Uber e Airbnb usam React Native em produção."

---

### "Por que SQLite e não MySQL/PostgreSQL?"

**Resposta:**  
> "Para este projeto, SQLite é ideal porque é um banco em arquivo único, sem necessidade de servidor separado. Facilita desenvolvimento e distribuição. Para produção em larga escala, poderíamos migrar facilmente para PostgreSQL ou MySQL alterando apenas a configuração do Sequelize."

---

### "O que é Sequelize?"

**Resposta:**  
> "Sequelize é um ORM - Object-Relational Mapping. Permite trabalhar com banco de dados usando JavaScript ao invés de SQL puro. Definimos modelos como objetos JavaScript, e o Sequelize gera o SQL automaticamente. Também facilita migração entre diferentes bancos de dados."

---

### "Por que Styled Components?"

**Resposta:**  
> "Styled Components traz várias vantagens: separa estilos da lógica, permite criar componentes reutilizáveis com estilos embutidos, facilita tematização, e oferece melhor experiência de desenvolvimento com autocomplete. Removemos mais de 1.500 linhas de StyleSheet e organizamos tudo em arquivos separados."

---

### "Como funciona a navegação por tabs?"

**Resposta:**  
> "Usamos Expo Router, que é file-based routing. A pasta (tabs) indica navegação por abas. Cada arquivo .tsx dentro dela vira automaticamente uma aba no aplicativo. O arquivo _layout.tsx configura os ícones e títulos de cada aba."

---

### "E se o celular não tiver internet?"

**Resposta:**  
> "O app precisa de conexão com a API local (localhost:3000). Para funcionar em rede, basta trocar localhost pelo IP da máquina que está rodando a API. Em produção, a API estaria em um servidor cloud (AWS, Heroku, etc) acessível pela internet."

---

### "Quantas linhas de código tem o projeto?"

**Resposta:**  
> "O backend tem cerca de 650 linhas (api/index.js). O frontend tem aproximadamente 2.500 linhas distribuídas nas 5 telas. Os arquivos de estilos somam cerca de 1.500 linhas. No total, são mais de 4.500 linhas de código sem contar testes e documentação."

---

### "Pode rodar em produção?"

**Resposta:**  
> "Sim! O código está pronto para produção. Para deploy, precisaríamos: 1) Hospedar API em servidor cloud, 2) Migrar SQLite para PostgreSQL, 3) Build do app para publicar nas lojas (Play Store/App Store), 4) Configurar variáveis de ambiente. A arquitetura já está preparada para isso."

---

## 🛠️ COMANDOS PARA DEMONSTRAÇÃO

### Preparar Demonstração:

```bash
# Terminal 1 - API
cd api
npm run dev
# Aguardar: "API rodando na porta 3000"

# Terminal 2 - App
npm start
# Escanear QR Code no Expo Go

# Terminal 3 - Testes (mostrar)
npm test
```

---

### Se Precisar Resetar:

```bash
# Resetar banco de dados
cd api
node reset-db.js
npm run dev  # Inicia limpo
```

---

### Mostrar Coverage:

```bash
# Gerar relatório atualizado
npm run test:coverage

# Abrir HTML
start coverage/lcov-report/index.html
```

---

## 📚 MATERIAIS DE APOIO

### Durante Apresentação, ter aberto:

1. **Terminal** com API rodando
2. **Expo Go** com app aberto
3. **VS Code** com projeto aberto
4. **Browser** com coverage (opcional)
5. **Este roteiro** para consulta

### Arquivos para mostrar no código:

1. `constants/theme.ts` - Sistema de temas
2. `app/(tabs)/products.tsx` - Tela complexa
3. `app/(tabs)/products.styles.tsx` - Estilos separados
4. `api/index.js` - Rota de produtos (linha ~420)
5. `coverage/lcov-report/index.html` - Cobertura

---

## 🎯 DIFERENCIAIS DO PROJETO

### vs Outros Projetos SENAI:

1. **Styled Components** (não usa StyleSheet básico)
2. **Sistema de Temas** (cores centralizadas)
3. **Arquitetura em Camadas** (separação clara)
4. **APIs Externas** (integração real)
5. **Testes Automatizados** (68 testes)
6. **Coverage 100%** (services testados completamente)
7. **Código Profissional** (sem emojis, padrões corporativos)

---

## 💡 EXPANSÕES FUTURAS (Se Perguntarem)

### O que poderia ser adicionado:

1. **Autenticação:**
   - Login de usuários
   - Permissões por função
   - JWT tokens

2. **Relatórios:**
   - Movimentações por período
   - Produtos mais vendidos
   - Estoque por categoria

3. **Notificações:**
   - Push quando estoque baixo
   - Alertas de vencimento

4. **Offline First:**
   - Funcionar sem internet
   - Sincronizar quando conectar

5. **Gráficos:**
   - Dashboard com charts
   - Análise de vendas

6. **Impressão:**
   - Etiquetas de produtos
   - Relatórios em PDF

---

## ✅ CHECKLIST PRÉ-APRESENTAÇÃO

### Verificar Hoje:

- [ ] API rodando sem erros
- [ ] App abre no Expo Go
- [ ] Consegue criar fornecedor
- [ ] Consegue tirar foto
- [ ] Categorias funcionando
- [ ] Produtos funcionando
- [ ] Estoque funcionando
- [ ] Código de barras testado
- [ ] Testes passando (npm test)
- [ ] Coverage gerado

### Preparar:

- [ ] Carregar bateria do celular
- [ ] Testar WiFi da sala
- [ ] Ter código aberto no VS Code
- [ ] Ter este roteiro impresso/aberto
- [ ] Ter exemplos para cadastrar

### Dados de Exemplo para Cadastrar:

**Fornecedor:**
- Nome: Distribuidora ABC Ltda
- Email: contato@abc.com
- Telefone: 11 98765-4321

**Categoria:**
- Nome: Eletrônicos
- Descrição: Produtos eletrônicos e acessórios

**Produto:**
- Nome: Mouse Gamer RGB
- Código: 7891234567890
- Categoria: Eletrônicos
- Fornecedor: Distribuidora ABC
- Preço Custo: R$ 50,00
- Preço Venda: R$ 89,90
- Estoque Mínimo: 5

---

## 🎓 DICAS FINAIS

### Durante a Apresentação:

1. **Fale devagar e com clareza**
2. **Mostre o código enquanto explica**
3. **Demonstre funcionando no celular**
4. **Explique "por que" das escolhas técnicas**
5. **Esteja preparado para perguntas**

### Se der erro:

1. **Mantenha a calma**
2. **Explique o que deveria acontecer**
3. **Mostre o código da solução**
4. **Lembre: sistema funciona (já testado)**

### Pontos de atenção:

- **API deve estar rodando** antes de abrir app
- **WiFi** do celular e PC devem estar na mesma rede
- **Permissões** de câmera devem ser aceitas no primeiro uso

---

## 📈 MÉTRICAS PARA IMPRESSIONAR

- **5 telas** completamente funcionais
- **32 emojis** removidos (código profissional)
- **~1.520 linhas** de StyleSheet refatoradas
- **68 testes** automatizados passando
- **100% coverage** nos services
- **5 entidades** no banco com relacionamentos
- **20+ rotas** REST implementadas
- **2 APIs externas** integradas
- **~4.500 linhas** de código total
- **20 documentos** técnicos

---

## 🎊 MENSAGEM FINAL

**Você desenvolveu um sistema de nível empresarial!**

Este projeto demonstra:
- ✅ Conhecimento de React Native
- ✅ Domínio de Node.js e Express
- ✅ Entendimento de bancos relacionais
- ✅ Integração de sistemas
- ✅ Arquitetura profissional
- ✅ Qualidade de código
- ✅ Boas práticas de desenvolvimento

**Apresente com confiança! Você sabe do que está falando!** 🚀

---

**BOA SORTE NA APRESENTAÇÃO! 🎯**

---

## 📞 SUPORTE DURANTE APRESENTAÇÃO

Se travar e não lembrar algo, **consulte rápido:**

- **Tecnologias:** Página 2-3 deste documento
- **Arquitetura:** Página 1-2 (diagrama)
- **Rotas da API:** Página 10-12
- **Modelos do Banco:** Página 7-9
- **Styled Components:** Página 6-7

**Você está preparado! Boa apresentação! 🎓**


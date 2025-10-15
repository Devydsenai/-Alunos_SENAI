# 📦 Sistema de Gerenciamento - Clientes e Almoxarifado

> **Projeto SENAI** - Sistema completo de gerenciamento de clientes/fornecedores e controle de almoxarifado com React Native + Expo

[![Expo](https://img.shields.io/badge/Expo-~54.0-000020.svg?style=flat&logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB.svg?style=flat&logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg?style=flat&logo=node.js)](https://nodejs.org/)

## 📋 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [APIs Utilizadas](#apis-utilizadas)
- [Testes](#testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Documentação](#documentação)

## 🎯 Sobre o Projeto

Sistema completo desenvolvido em **React Native + Expo** para gerenciamento de:
- **Clientes/Fornecedores** com fotos 3x4
- **Produtos** com código de barras e fotos
- **Controle de Estoque** com movimentações
- **Categorias** para organização

### ✨ Refatoração Recente (Nova Arquitetura!)

O projeto passou por uma **refatoração completa** seguindo as melhores práticas profissionais:

- 🎨 **Styled Components** - Estilos separados e organizados
- 📁 **Estrutura Profissional** - Pastas `components/`, `constants/`, `hooks/`
- 🎯 **Sistema de Temas** - Cores e espaçamentos centralizados
- 📝 **Código Limpo** - ~1.520 linhas de StyleSheet removidas
- 📚 **Documentação Atualizada** - Coverage e guias atualizados

**[Ver detalhes da refatoração →](docs/ORGANIZACAO_CODIGO.md)**

### 📱 Requisitos Atendidos

- ✅ **Expo + React Native** - Framework mobile cross-platform
- ✅ **Componentes React Native** - 100% nativos (zero HTML)
- ✅ **Expo Go** - Roda no app Expo Go
- ✅ **APIs Externas** - ViaCEP, Código de Barras
- ✅ **Testes Unitários** - Jest + React Native Testing Library
- ✅ **Documentação Completa** - README, API docs, comentários
- ✅ **Styled Components** - ✨ Arquitetura profissional
- ✅ **Código Organizado** - ✨ Padrões de mercado
- ✅ **Relevância** - Sistema útil para negócios reais

## ✨ Funcionalidades

### 👥 Módulo de Clientes/Fornecedores
- [x] Cadastro completo com foto 3x4
- [x] Busca e filtros avançados
- [x] Status ativo/inativo
- [x] Edição e exclusão
- [x] Integração com ViaCEP para endereços

### 📦 Módulo de Produtos
- [x] Cadastro com foto e código de barras ✅
- [x] Vinculação com fornecedores ✅
- [x] Categorização ✅
- [x] Preço de custo e venda ✅
- [x] Estoque mínimo ✅
- [x] Busca automática por código de barras ✅

### 📊 Módulo de Estoque
- [x] Controle de quantidade ✅
- [x] Localização no almoxarifado ✅
- [x] Alertas de estoque mínimo ✅
- [x] Movimentações de entrada/saída ✅
- [x] Filtro de estoque baixo ✅
- [x] Resumo estatístico ✅

### 🎨 Módulo de Arquitetura (NOVO)
- [x] Styled Components implementado ✨
- [x] Sistema de temas centralizado ✨
- [x] Estilos separados por tela ✨
- [x] Componentização profissional ✨

## 🛠️ Tecnologias

### Frontend (Mobile)
- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **Styled Components** - ✨ Estilização de componentes
- **Expo Router** - Navegação file-based
- **Expo Image Picker** - Captura de fotos
- **Ionicons** - Ícones

### Backend (API)
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Sequelize** - ORM para banco de dados
- **SQLite** - Banco de dados local
- **Nodemon** - Auto-reload em desenvolvimento

### APIs Externas
- **ViaCEP** - Busca de endereços por CEP
- **Open Food Facts** - Validação de código de barras (planejado)

### Testes
- **Jest** - Framework de testes
- **React Native Testing Library** - Testes de componentes
- **Supertest** - Testes de API (planejado)

## 📥 Instalação

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn
- Expo Go instalado no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Passo a passo

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd Alunos_SENAI
```

2. **Instale as dependências do projeto**
```bash
npm install
```

3. **Instale as dependências da API**
```bash
cd api
npm install
cd ..
```

4. **Inicie a API**
```bash
cd api
npm run dev
```
A API estará rodando em `http://localhost:3000`

5. **Inicie o app (em outro terminal)**
```bash
npm start
```

6. **Abra no Expo Go**
- Escaneie o QR Code com o Expo Go
- Ou pressione `a` para Android / `i` para iOS (emulador)

## 🚀 Como Usar

### Iniciando o Sistema

1. **Inicie a API** (terminal 1):
```bash
cd api
npm run dev
```

2. **Inicie o App** (terminal 2):
```bash
npm start
```

3. **Acesse pelo Expo Go** - Escaneie o QR Code

### Funcionalidades Principais

#### 📱 Cadastrar Cliente/Fornecedor
1. Acesse a aba **Home**
2. Tire/selecione foto 3x4
3. Preencha nome, email, telefone
4. Clique em **Criar Cliente**

#### 👀 Visualizar Clientes
1. Acesse a aba **Clientes**
2. Use a busca para filtrar
3. Veja fotos e informações
4. Edite ou desative clientes

## 🌐 APIs Utilizadas

### API Local (Backend)

**Base URL:** `http://localhost:3000`

#### Endpoints Clientes
```
GET    /clientes           - Lista todos os clientes
GET    /clientes/:codigo   - Busca cliente por código
POST   /clientes           - Cria novo cliente
PUT    /clientes/:codigo   - Atualiza cliente
PATCH  /clientes/:codigo   - Atualização parcial
DELETE /clientes/:codigo   - Remove cliente
```

**Exemplo de Request:**
```json
POST /clientes
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "11999999999",
  "ativo": true,
  "foto": "file:///path/to/photo.jpg"
}
```

### APIs Externas

#### ViaCEP
- **URL:** `https://viacep.com.br/ws/{cep}/json/`
- **Uso:** Busca endereço por CEP para fornecedores
- **Documentação:** [viacep.com.br](https://viacep.com.br/)

#### Open Food Facts (Planejado)
- **URL:** `https://world.openfoodfacts.org/api/v0/product/{barcode}.json`
- **Uso:** Validação de código de barras de produtos
- **Documentação:** [openfoodfacts.org](https://world.openfoodfacts.org/)

## 🧪 Testes

### Executar Testes

```bash
# Todos os testes
npm test

# Modo watch
npm run test:watch

# Com coverage
npm run test:coverage
```

### Estrutura de Testes

```
__tests__/
├── components/          # Testes de componentes
│   ├── ClientCard.test.tsx
│   └── ProductCard.test.tsx
├── screens/            # Testes de telas
│   ├── HomeScreen.test.tsx
│   └── ClientsScreen.test.tsx
└── api/               # Testes de API
    └── clientes.test.js
```

### Exemplos de Testes

**Componente:**
```typescript
import { render, fireEvent } from '@testing-library/react-native';
import ClientCard from '@/components/ClientCard';

test('should render client name', () => {
  const client = { nome: 'João Silva', email: 'joao@test.com' };
  const { getByText } = render(<ClientCard client={client} />);
  expect(getByText('João Silva')).toBeTruthy();
});
```

**API:**
```javascript
const request = require('supertest');
const app = require('../api/index');

test('GET /clientes should return array', async () => {
  const response = await request(app).get('/clientes');
  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});
```

## 📁 Estrutura do Projeto

```
Alunos_SENAI/
├── app/                           # Aplicação React Native
│   ├── (tabs)/                    # Telas com navegação em tabs
│   │   ├── index.tsx              # Home - Cadastro de fornecedores
│   │   ├── index.styles.tsx       # ✨ Estilos da tela index
│   │   ├── about.tsx              # Lista de fornecedores
│   │   ├── about.styles.tsx       # ✨ Estilos da tela about
│   │   ├── categories.tsx         # Gestão de categorias
│   │   ├── categories.styles.tsx  # ✨ Estilos da tela categories
│   │   ├── products.tsx           # Gestão de produtos
│   │   ├── products.styles.tsx    # ✨ Estilos da tela products
│   │   ├── stock.tsx              # Controle de estoque
│   │   ├── stock.styles.tsx       # ✨ Estilos da tela stock
│   │   └── _layout.tsx            # Layout das tabs
│   ├── services/                  # Serviços de APIs externas
│   │   ├── codigoBarras.ts        # Integração com API de código de barras
│   │   └── viaCep.ts              # Integração com ViaCEP
│   └── _layout.tsx                # Layout principal
│
├── components/                    # ✨ Componentes reutilizáveis
│   └── README.md                  # Guia de uso
│
├── constants/                     # ✨ Constantes e temas
│   └── theme.ts                   # Cores, espaçamentos, fontes
│
├── hooks/                         # ✨ Hooks personalizados
│   └── README.md                  # Guia de uso
│
├── api/                           # Backend Node.js
│   ├── index.js                   # API REST principal
│   ├── database.sqlite            # Banco de dados SQLite
│   ├── package.json               # Dependências da API
│   └── reset-db.js                # Script para resetar banco
│
├── __tests__/                     # Testes automatizados
│   ├── components/                # Testes de componentes
│   ├── services/                  # Testes de serviços
│   └── example.test.tsx           # Exemplos de testes
│
├── coverage/                      # Relatórios de cobertura de testes
│   └── lcov-report/               # Documentação HTML interativa
│
├── docs/                          # 📚 Documentação completa
│   ├── API.md                     # Documentação da API REST
│   ├── APIS_EXTERNAS.md           # ViaCEP e Código de Barras
│   ├── SETUP.md                   # Guia de instalação
│   ├── COMO_USAR.md               # Manual de uso
│   ├── ORGANIZACAO_CODIGO.md      # ⭐ Arquitetura e organização
│   ├── COVERAGE_ATUALIZADO.md     # ⭐ Relatórios de testes
│   └── README.md                  # Índice da documentação
│
├── assets/                        # Recursos do app
│   └── images/                    # Ícones e imagens
│
├── package.json                   # Dependências do projeto
├── tsconfig.json                  # Configuração TypeScript
├── jest.config.js                 # Configuração de testes
└── README.md                      # Este arquivo
```

## 📚 Documentação

### 📖 Documentação Completa
Toda a documentação está organizada na pasta **[docs/](docs/)** com um índice completo.

**Principais Documentos:**
- [📖 Índice Completo](docs/README.md) - Navegue por toda documentação
- [🏗️ Organização do Código](docs/ORGANIZACAO_CODIGO.md) ⭐ **NOVO** - Arquitetura e Styled Components
- [📊 Coverage Atualizado](docs/COVERAGE_ATUALIZADO.md) ⭐ **NOVO** - Relatórios de testes
- [🚀 Como Usar](docs/COMO_USAR.md) - Manual completo do sistema
- [🔧 Setup](docs/SETUP.md) - Guia de instalação passo a passo
- [📡 API](docs/API.md) - Documentação da API REST
- [🌐 APIs Externas](docs/APIS_EXTERNAS.md) - ViaCEP e Código de Barras
- [🧪 Testes](docs/GUIA_RAPIDO_TESTES.md) - Como executar testes
- [🎤 Demonstração](docs/DEMONSTRACAO.md) - Roteiro de apresentação

## 👨‍💻 Desenvolvimento

### Comandos Úteis

```bash
# App
npm start              # Inicia o Expo
npm run android       # Abre no Android
npm run ios          # Abre no iOS
npm run web          # Abre no navegador
npm test             # Executa testes

# API
cd api
npm run dev          # Modo desenvolvimento (auto-reload)
npm start           # Modo produção
```

### Padrões de Código

- **TypeScript** para tipagem forte
- **Componentes funcionais** com Hooks
- **Comentários** em funções complexas
- **Nomes descritivos** de variáveis
- **Testes** para novas funcionalidades

## 🐛 Troubleshooting

### API não conecta
```bash
# Verifique se a API está rodando
curl http://localhost:3000

# Reinicie a API
cd api
npm run dev
```

### Expo não carrega
```bash
# Limpe o cache
npx expo start --clear

# Reinstale dependências
rm -rf node_modules
npm install
```

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais no SENAI.

## 👥 Autores

- **Devyd Silva** - Desenvolvimento inicial

## 🙏 Agradecimentos

- SENAI - Instituição de ensino
- Professor - Orientação e requisitos
- Comunidade Expo/React Native

---

**Desenvolvido com ❤️ usando React Native + Expo**

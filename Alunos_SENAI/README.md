# Sistema de Clientes SENAI

Sistema simples de gerenciamento de clientes desenvolvido com React Native (Expo) e Node.js para alunos iniciantes do SENAI.

## 🚀 Tecnologias Utilizadas

### Frontend (App Mobile)
- **React Native** com **Expo**
- **Expo Router** para navegação
- **TypeScript** para tipagem
- **Ionicons** para ícones

### Backend (API)
- **Node.js** com **Express**
- **Sequelize** (ORM)
- **SQLite** (banco de dados)
- **CORS** habilitado

## 📱 Funcionalidades do App

- ✅ Tela inicial com informações do sistema
- ✅ Lista de clientes com busca na API
- ✅ Navegação por abas (Home e Clientes)
- ✅ Interface simples e intuitiva
- ✅ Exclusão de clientes
- ✅ Atualização da lista

## 🛠️ Como executar o projeto

### 1. Executar a API (Backend)

```bash
# Navegar para a pasta da API
cd api

# Instalar dependências
npm install

# Executar a API
npm start
```

A API estará rodando em: `http://localhost:3000`

### 2. Executar o App (Frontend)

```bash
# Navegar para a pasta do app
cd Alunos_SENAI

# Instalar dependências (se necessário)
npm install

# Executar o app
npx expo start
```

## 📋 Estrutura do Projeto

```
Alunos_SENAI/
├── app/                    # Código do app React Native
│   ├── (tabs)/            # Navegação por abas
│   │   ├── _layout.tsx    # Layout das abas
│   │   ├── index.tsx      # Tela Home
│   │   └── about.tsx      # Lista de Clientes
│   └── _layout.tsx        # Layout principal
├── api/                   # API REST
│   ├── index.js           # Servidor Express
│   ├── package.json       # Dependências da API
│   └── README.md          # Documentação da API
└── README.md              # Este arquivo
```

## 🔧 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Health check |
| GET | `/clientes` | Listar todos os clientes |
| GET | `/clientes/:codigo` | Buscar cliente por código |
| POST | `/clientes` | Criar novo cliente |
| PUT | `/clientes/:codigo` | Atualizar cliente completo |
| PATCH | `/clientes/:codigo` | Atualizar campos específicos |
| DELETE | `/clientes/:codigo` | Excluir cliente |

## 📊 Modelo de Dados (Cliente)

```json
{
  "codigo": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "11999999999",
  "ativo": true
}
```

## 🎯 Objetivos de Aprendizado

Este projeto foi desenvolvido para ensinar:

1. **Navegação em React Native** com Expo Router
2. **Consumo de APIs REST** com fetch
3. **Criação de APIs simples** com Express
4. **Banco de dados** com SQLite e Sequelize
5. **Interface de usuário** responsiva e intuitiva
6. **Gerenciamento de estado** básico
7. **Tratamento de erros** em aplicações móveis

## 📱 Como usar o app

1. **Tela Home**: Apresenta informações sobre o sistema
2. **Tela Clientes**: Lista todos os clientes cadastrados
   - Use o botão "🔄 Atualizar" para recarregar a lista
   - Toque em "Excluir" para remover um cliente
   - Botão "Editar" (funcionalidade futura)

## ⚠️ Observações Importantes

- Certifique-se de que a API esteja rodando antes de usar o app
- O app está configurado para conectar em `http://localhost:3000`
- Para usar em dispositivos físicos, ajuste o IP da API no código
- Este é um projeto educacional, ideal para iniciantes

## 🔄 Próximos Passos

- [ ] Implementar tela de cadastro de clientes
- [ ] Implementar tela de edição de clientes
- [ ] Adicionar validação de formulários
- [ ] Implementar busca/filtros
- [ ] Adicionar loading states
- [ ] Implementar tratamento de erros mais robusto

## 📚 Recursos de Aprendizado

- [Documentação do Expo](https://docs.expo.dev/)
- [Expo Router](https://expo.github.io/router/)
- [React Native](https://reactnative.dev/)
- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)

---

**Desenvolvido para fins educacionais - SENAI**
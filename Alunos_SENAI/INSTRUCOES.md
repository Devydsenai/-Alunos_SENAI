# 🚀 Instruções para Executar o Sistema

## ✅ Sistema Completo Implementado!

O sistema de clientes SENAI está pronto com todas as funcionalidades solicitadas:

### 📱 Funcionalidades Implementadas

#### Página Home:
- ✅ Campo de pesquisa
- ✅ Informações sobre o sistema
- ✅ Cards com estatísticas
- ✅ Navegação para lista de clientes

#### Página de Clientes:
- ✅ Lista de clientes em cards
- ✅ Campo de pesquisa funcional
- ✅ Botão "Adicionar" para novos clientes
- ✅ Modal com formulário completo
- ✅ Botões de ativar/desativar clientes
- ✅ Botão de excluir clientes
- ✅ Design responsivo e moderno

#### API REST:
- ✅ Todas as rotas implementadas (GET, POST, PUT, PATCH, DELETE)
- ✅ Banco SQLite configurado
- ✅ Validações de dados
- ✅ CORS habilitado

## 🛠️ Como Executar

### 1. Executar a API (Backend)
```bash
# Abrir terminal na pasta api
cd api

# Instalar dependências (se necessário)
npm install

# Executar a API
npm start
```
A API estará rodando em: `http://localhost:3000`

### 2. Executar o App (Frontend)
```bash
# Abrir novo terminal na pasta do projeto
cd Alunos_SENAI

# Executar o app
npx expo start
```

## 📋 Como Usar o Sistema

### Adicionar Cliente:
1. Na aba "Clientes", clique em "+ Adicionar"
2. Preencha o formulário (Nome e Email são obrigatórios)
3. Clique em "Salvar"

### Pesquisar Clientes:
1. Use o campo de pesquisa na parte superior
2. Digite nome, email ou telefone
3. A lista será filtrada automaticamente

### Gerenciar Clientes:
- **Ativar/Desativar**: Clique no botão colorido no card do cliente
- **Excluir**: Clique em "Excluir" e confirme
- **Atualizar**: Clique no botão "🔄" no cabeçalho

## 🎨 Características do Design

- **Cards modernos** com sombras e bordas arredondadas
- **Cores intuitivas**: Verde para ativo, vermelho para inativo
- **Interface responsiva** que funciona em diferentes tamanhos de tela
- **Animações suaves** nos modais e transições
- **Ícones visuais** para melhor experiência do usuário

## 🔧 Tecnologias Utilizadas

- **React Native** com **Expo**
- **TypeScript** para tipagem
- **Expo Router** para navegação
- **Node.js** com **Express**
- **Sequelize** com **SQLite**
- **CORS** para comunicação

## 📱 Testando no Dispositivo

1. Instale o app **Expo Go** no seu celular
2. Escaneie o QR code que aparece no terminal
3. O app será carregado no seu dispositivo

## ⚠️ Observações Importantes

- Certifique-se de que a API esteja rodando antes de usar o app
- Para usar em dispositivos físicos, ajuste o IP da API no código se necessário
- Este é um projeto educacional, ideal para alunos iniciantes

## 🎯 Próximos Passos (Opcionais)

- Implementar edição de clientes
- Adicionar validação de formulários mais robusta
- Implementar notificações push
- Adicionar relatórios e estatísticas
- Implementar autenticação de usuários

---

**Sistema desenvolvido para fins educacionais - SENAI** 🎓

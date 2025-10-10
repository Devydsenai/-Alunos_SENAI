# 🎬 Cinema App - Aplicativo Profissional de Cinema

> **Aplicativo moderno de gerenciamento e exploração de filmes**  
> Desenvolvido com React Native, Expo e TypeScript

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

---

## 📋 Índice

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Screenshots](#screenshots)
- [Contribuindo](#contribuindo)

---

## 🎯 Sobre

Cinema App é um aplicativo profissional para explorar, gerenciar e descobrir filmes. Com design inspirado em plataformas premium como Netflix e Disney+, oferece uma experiência moderna e intuitiva.

### Diferenciais

✨ **Design Profissional** - Interface limpa e moderna  
🎨 **Sistema de Cores** - Paleta cuidadosamente selecionada  
📱 **Responsivo** - Adapta a diferentes tamanhos de tela  
⚡ **Performance** - Otimizado e rápido  
🔧 **Manutenível** - Código organizado e escalável  

---

## ✨ Funcionalidades

### 🏠 Dashboard
- Visualização de filmes populares
- Filmes em cartaz
- Próximos lançamentos
- Navegação rápida

### 🔍 Explorar Filmes
- Busca inteligente em tempo real
- Filtros por título, gênero, diretor
- Visualização em grid
- Player de trailers integrado

### ➕ Cadastrar Filmes
- Formulário completo
- Validação de campos
- Integração com API local
- Feedback visual de sucesso/erro

### 🎟️ Seleção de Poltronas
- Interface interativa
- Visualização de disponibilidade
- Confirmação de reserva

### 🎬 Detalhes do Filme
- Informações completas
- Trailer em HD
- Avaliações e reviews
- Elenco e equipe

---

## 🛠️ Tecnologias

### Core
- **React Native** - Framework mobile multiplataforma
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Type safety e autocomplete
- **Expo Router** - Navegação file-based

### UI/UX
- **Styled Components** - Estilização em JS
- **Expo Video** - Player de vídeo nativo
- **React Native Web** - Suporte web

### APIs
- **TMDB API** - Dados de filmes reais
- **API Local** - Backend Node.js com SQLite

### Ferramentas
- **ESLint** - Linting
- **Prettier** - Formatação de código
- **Git** - Controle de versão

---

## 📦 Instalação

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Expo Go app (para testar no celular)

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/cinema-app.git

# 2. Entre na pasta
cd cinemaLancamento

# 3. Instale as dependências
npm install

# 4. Inicie o aplicativo
npm start

# 5. (Opcional) Inicie a API local
cd api
node index.js
```

### Variáveis de Ambiente

Crie um arquivo `.env` em `app/services/`:

```env
TMDB_API_KEY="sua-chave-aqui"
API_URL="https://api.themoviedb.org/3"
IMAGE_BASE_URL="https://image.tmdb.org/t/p/w500"
```

---

## 🚀 Como Usar

### Modo Desenvolvimento

```bash
# Iniciar em modo desenvolvimento
npm start

# Opções:
# - Pressione 'a' para Android
# - Pressione 'i' para iOS
# - Pressione 'w' para Web
# - Escaneie o QR code com Expo Go
```

### Build para Produção

```bash
# Android
expo build:android

# iOS
expo build:ios

# Web
expo build:web
```

---

## 📁 Estrutura do Projeto

```
cinemaLancamento/
├── app/                        # Aplicativo principal
│   ├── (tabs)/                # Telas com navegação
│   │   ├── dashboard.tsx      # Tela inicial
│   │   ├── explore.tsx        # Explorar filmes
│   │   ├── cadastro.tsx       # Cadastrar filmes
│   │   ├── seats.tsx          # Selecionar poltronas
│   │   └── about.tsx          # Sobre
│   ├── services/              # Serviços e APIs
│   │   ├── api.ts            # API local
│   │   ├── tmdb.ts           # API TMDB
│   │   └── .env              # Variáveis de ambiente
│   └── navigation/            # Configuração de rotas
│
├── components/                 # Componentes reutilizáveis
│   ├── movie/                 # Componentes de filmes
│   │   ├── MovieCard.tsx
│   │   ├── SearchBar.tsx
│   │   └── styles.ts
│   ├── video/                 # Componentes de vídeo
│   │   ├── VideoPlayer.tsx
│   │   └── styles.ts
│   └── index.ts
│
├── styles/                     # Sistema de estilos
│   ├── cores/                 # Paleta de cores
│   │   ├── index.ts          # 40+ cores
│   │   └── README.md
│   └── index.ts
│
├── api/                        # Backend local
│   ├── database.sqlite        # Banco de dados
│   ├── index.js              # Servidor Express
│   └── seed.js               # Dados iniciais
│
├── assets/                     # Recursos estáticos
│   └── images/
│
├── app.json                    # Configuração Expo
├── package.json                # Dependências
├── tsconfig.json              # Config TypeScript
└── README.md                  # Este arquivo
```

---

## 📸 Screenshots

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Explorar Filmes
![Explore](docs/screenshots/explore.png)

### Cadastrar Filme
![Cadastro](docs/screenshots/cadastro.png)

### Seleção de Poltronas
![Seats](docs/screenshots/seats.png)

---

## 🎨 Design System

### Cores Principais

| Uso | Hex | Preview |
|-----|-----|---------|
| Primária | #E50914 | 🔴 |
| Fundo | #000000 | ⬛ |
| Card | #0F0F0F | ⬜ |
| Texto | #FFFFFF | ⚪ |
| Destaque | #FFD700 | ⭐ |

### Tipografia

- **Títulos:** 24-48px, Bold
- **Subtítulos:** 18-20px, Semi-Bold
- **Corpo:** 14-16px, Regular
- **Legendas:** 12px, Regular

### Espaçamentos

- **Pequeno:** 4-8px
- **Médio:** 12-16px
- **Grande:** 20-32px

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript
- Siga o ESLint
- Documente funções complexas
- Escreva commits descritivos

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Autores

- **Devyd Silva** - Desenvolvedor Principal

---

## 🙏 Agradecimentos

- [The Movie Database (TMDB)](https://www.themoviedb.org/) - Dados de filmes
- [Expo](https://expo.dev/) - Framework e ferramentas
- [React Native](https://reactnative.dev/) - Framework mobile

---

## 📞 Contato

- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- Email: seu-email@exemplo.com

---

<div align="center">

**⭐ Se você gostou deste projeto, não esqueça de dar uma estrela!**

Made with ❤️ and ☕

</div>

# 🎬 Cinema App - Catálogo de Filmes Profissional

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.81.4-blue.svg)
![Expo](https://img.shields.io/badge/Expo-~54.0.13-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)

Um aplicativo moderno e profissional para explorar filmes populares, construído com React Native, Expo e TypeScript. Design UI/UX de alta qualidade com gradientes modernos e componentes reutilizáveis.

## ✨ Features

- 🎨 **Design Moderno**: Interface com gradientes vibrantes e componentes profissionais
- 🔐 **Sistema de Autenticação**: Login e cadastro com validações completas
- 🎬 **Catálogo de Filmes**: Integração com TMDB API para filmes populares
- 📱 **Responsivo**: Layout otimizado para diferentes tamanhos de tela
- 💾 **Banco de Dados Local**: SQLite para armazenamento de usuários
- 🔒 **Segurança**: Hash de senhas com SHA-256
- 📚 **Documentação Completa**: Código totalmente documentado
- 🎯 **TypeScript**: Tipagem completa para maior segurança

## 📸 Screenshots

```
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│   Tela Inicial      │  │   Login/Cadastro    │  │   Lista de Filmes   │
│   🎬 Cinema App     │  │   👋 Bem-vindo!     │  │   🎬 Populares      │
│   • Gradientes      │  │   • Validações      │  │   • Grid Layout     │
│   • Animações       │  │   • Segurança       │  │   • Cards Modernos  │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘
```

## 🚀 Tecnologias

### Frontend
- **React Native** 0.81.4 - Framework mobile
- **Expo** ~54.0.13 - Plataforma de desenvolvimento
- **TypeScript** 5.9.2 - Tipagem estática
- **Expo Router** 6.0.11 - Navegação

### Backend/API
- **SQLite** (expo-sqlite) - Banco de dados local
- **TMDB API** - Dados de filmes
- **Crypto** (expo-crypto) - Criptografia de senhas

### UI/UX
- **Linear Gradient** - Gradientes modernos
- **Custom Components** - Componentes reutilizáveis
- **Theme System** - Sistema de design consistente

## 📁 Estrutura do Projeto

```
projeto_Cinema/Meu-app/
│
├── api/                          # 🔧 Backend e lógica de negócio
│   ├── src/
│   │   ├── config/              # Configurações
│   │   │   └── database.ts      # Setup do SQLite
│   │   ├── models/              # Modelos de dados
│   │   │   └── User.model.ts    # Model de usuário
│   │   ├── services/            # Lógica de negócio
│   │   │   ├── auth.service.ts  # Serviço de autenticação
│   │   │   └── movie.service.ts # Serviço de filmes
│   │   ├── controllers/         # Controladores
│   │   │   └── auth.controller.ts
│   │   └── index.ts             # Entry point da API
│   ├── auth.ts                  # Interface compatível
│   └── README.md                # Documentação da API
│
├── app/                          # 📱 Telas do aplicativo
│   ├── (auth)/                  # Rotas de autenticação
│   │   ├── login.tsx            # Tela de login
│   │   └── signup.tsx           # Tela de cadastro
│   ├── _layout.tsx              # Layout principal
│   ├── index.tsx                # Tela inicial
│   └── movies.tsx               # Lista de filmes
│
├── components/                   # 🎨 Componentes reutilizáveis
│   └── ui/
│       ├── GradientBackground.tsx
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       ├── MovieCard.tsx
│       └── index.ts
│
├── constants/                    # 🎨 Sistema de design
│   └── theme.ts                 # Cores, espaçamentos, tipografia
│
├── services/                     # 🔌 Serviços externos
│   └── tmdb.service.ts          # Cliente TMDB API
│
├── assets/                       # 🖼️ Imagens e ícones
├── .env                         # Variáveis de ambiente
├── app.config.ts                # Configuração do Expo
├── package.json                 # Dependências
└── tsconfig.json                # Config TypeScript
```

## 🛠️ Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Expo CLI (opcional, mas recomendado)
- Android Studio (para Android) ou Xcode (para iOS)

### Passo a Passo

1. **Clone o repositório**
```bash
git clone <repository-url>
cd projeto_Cinema/Meu-app
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env na raiz do projeto
touch .env
```

Adicione suas chaves da API do TMDB:
```env
TMDB_API_KEY=sua_chave_aqui
TMDB_API_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
```

> 📝 **Nota**: Para obter uma chave da API do TMDB, acesse [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

4. **Inicie o projeto**
```bash
# Desenvolvimento
npm start

# Android
npm run android

# iOS (apenas macOS)
npm run ios

# Web
npm run web
```

## 📱 Uso

### Navegação

1. **Tela Inicial**: Apresentação do app com opções de login, cadastro e explorar filmes
2. **Cadastro**: Crie uma nova conta com nome, email e senha
3. **Login**: Acesse sua conta existente
4. **Filmes**: Explore o catálogo de filmes populares

### Funcionalidades

#### Autenticação
- ✅ Cadastro com validação completa
- ✅ Login seguro com hash de senha
- ✅ Verificação de email duplicado
- ✅ Indicador de força da senha
- ✅ Feedback visual de erros

#### Catálogo de Filmes
- ✅ Lista de filmes populares do TMDB
- ✅ Grid responsivo de 2 colunas
- ✅ Cards com poster e classificação
- ✅ Pull-to-refresh
- ✅ Estados de carregamento e erro

## 🎨 Sistema de Design

### Cores

O app utiliza um sistema de cores moderno com gradientes:

```typescript
// Gradiente Principal (Roxo → Rosa)
primary: {
  start: '#667eea',
  middle: '#764ba2',
  end: '#f093fb',
}

// Gradiente Secundário (Azul)
secondary: {
  start: '#4facfe',
  end: '#00f2fe',
}

// Cores de Estado
success: '#10b981'  // Verde
error: '#ef4444'    // Vermelho
warning: '#f59e0b'  // Amarelo
info: '#3b82f6'     // Azul
```

### Componentes UI

#### GradientBackground
Fundo com gradiente personalizável:
```tsx
<GradientBackground variant="primary">
  {/* Conteúdo */}
</GradientBackground>
```

#### Button
Botão com múltiplas variantes:
```tsx
<Button
  title="Entrar"
  onPress={handlePress}
  variant="primary"  // primary | secondary | outline | ghost
  size="large"       // small | medium | large
  loading={false}
/>
```

#### Input
Campo de entrada com validação:
```tsx
<Input
  label="Email"
  placeholder="seu@email.com"
  value={email}
  onChangeText={setEmail}
  error={errors.email}
/>
```

#### MovieCard
Card especializado para filmes:
```tsx
<MovieCard
  title="Filme Exemplo"
  posterPath="https://..."
  rating={8.5}
  onPress={() => {}}
/>
```

## 🔐 Segurança

### Autenticação
- Senhas hasheadas com SHA-256
- Validação de entrada em todas as requisições
- Proteção contra SQL injection com prepared statements
- Normalização de emails para lowercase

### Boas Práticas
- TypeScript para tipagem segura
- Validações no frontend e backend
- Tratamento apropriado de erros
- Não exposição de dados sensíveis

## 📚 Documentação da API

Para documentação detalhada da API, consulte [api/README.md](./api/README.md)

### Principais Endpoints

```typescript
// Autenticação
await authController.signup({ name, email, password, confirmPassword });
await authController.login({ email, password });
await authController.checkEmail(email);

// Filmes
await movieService.getPopularMovies(page);
await movieService.getNowPlayingMovies(page);
await movieService.searchMovies(query, page);
await movieService.getMovieDetails(movieId);
```

## 🧪 Scripts Disponíveis

```bash
npm start          # Inicia o Expo Dev Server
npm run android    # Abre no emulador Android
npm run ios        # Abre no simulador iOS
npm run web        # Abre no navegador
npm run lint       # Executa o linter
```

## 📦 Dependências Principais

```json
{
  "expo": "~54.0.13",
  "react": "19.1.0",
  "react-native": "0.81.4",
  "expo-router": "~6.0.11",
  "expo-sqlite": "latest",
  "expo-crypto": "latest",
  "expo-linear-gradient": "latest",
  "typescript": "~5.9.2"
}
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript
- Documente todas as funções e componentes
- Siga o guia de estilo do ESLint
- Mantenha componentes pequenos e reutilizáveis
- Escreva testes para novas funcionalidades

## 🐛 Problemas Conhecidos

- A API do TMDB tem limite de requisições gratuitas
- Banco de dados SQLite é local (não sincroniza entre dispositivos)
- Sistema de autenticação é básico (sem JWT/refresh tokens)

## 🔄 Roadmap

### v1.1 (Próximo)
- [ ] Detalhes completos de filmes
- [ ] Busca de filmes
- [ ] Favoritos do usuário
- [ ] Tema escuro/claro

### v1.2 (Futuro)
- [ ] Sistema de reviews
- [ ] Compartilhamento social
- [ ] Notificações de lançamentos
- [ ] Cache de imagens
- [ ] Suporte offline

### v2.0 (Planejado)
- [ ] Backend real com Node.js
- [ ] JWT authentication
- [ ] Sincronização na nuvem
- [ ] Recomendações personalizadas
- [ ] Watchlist compartilhável

## 📄 Licença

Este projeto é desenvolvido para fins educacionais no SENAI.

## 👥 Autores

- Desenvolvido no SENAI
- Projeto Cinema - Turma Alunos SENAI

## 🙏 Agradecimentos

- [TMDB](https://www.themoviedb.org/) pela API de filmes
- [Expo](https://expo.dev/) pela plataforma incrível
- [React Native](https://reactnative.dev/) pela framework
- Comunidade open source

## 📞 Suporte

Para questões e suporte:
- Abra uma [issue](../../issues)
- Consulte a [documentação da API](./api/README.md)
- Revise os [exemplos de código](./docs/examples.md)

---

**Feito com ❤️ e React Native**

🎬 *"O cinema é a vida com as partes chatas cortadas fora"* - Alfred Hitchcock

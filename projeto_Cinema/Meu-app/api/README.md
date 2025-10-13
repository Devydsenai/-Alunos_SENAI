# 📚 API Documentation

Esta é a documentação completa da API do Cinema App. A API está organizada seguindo as melhores práticas de arquitetura em camadas.

## 📁 Estrutura de Pastas

```
api/
├── src/
│   ├── config/          # Configurações (banco de dados, etc)
│   │   └── database.ts  # Configuração do SQLite
│   ├── models/          # Modelos de dados
│   │   └── User.model.ts
│   ├── services/        # Lógica de negócio
│   │   ├── auth.service.ts
│   │   └── movie.service.ts
│   ├── controllers/     # Controladores de requisições
│   │   └── auth.controller.ts
│   └── index.ts         # Entry point da API
├── auth.ts              # Interface compatível (deprecated)
└── README.md            # Esta documentação
```

## 🏗️ Arquitetura

A API segue uma arquitetura em camadas:

1. **Controllers**: Processam requisições e respostas
2. **Services**: Contêm a lógica de negócio
3. **Models**: Gerenciam acesso aos dados
4. **Config**: Configurações da aplicação

## 🔐 Autenticação

### Signup (Cadastro)

Registra um novo usuário no sistema.

**Uso:**
```typescript
import { authController } from './api/src';

const result = await authController.signup({
  name: 'João Silva',
  email: 'joao@exemplo.com',
  password: 'senha123',
  confirmPassword: 'senha123'
});
```

**Validações:**
- Nome deve ter pelo menos 3 caracteres
- Email deve ser válido
- Senha deve ter pelo menos 6 caracteres
- Senha e confirmação devem ser iguais
- Email não pode estar em uso

**Resposta de Sucesso:**
```typescript
{
  success: true,
  message: 'Cadastro realizado com sucesso',
  data: {
    user: {
      id: 1,
      name: 'João Silva',
      email: 'joao@exemplo.com',
      createdAt: '2025-10-12T10:30:00.000Z'
    }
  }
}
```

**Resposta de Erro:**
```typescript
{
  success: false,
  message: 'Email já cadastrado',
  data: null
}
```

### Login

Autentica um usuário existente.

**Uso:**
```typescript
import { authController } from './api/src';

const result = await authController.login({
  email: 'joao@exemplo.com',
  password: 'senha123'
});
```

**Validações:**
- Email e senha são obrigatórios
- Credenciais devem ser válidas

**Resposta de Sucesso:**
```typescript
{
  success: true,
  message: 'Login realizado com sucesso',
  data: {
    user: {
      id: 1,
      name: 'João Silva',
      email: 'joao@exemplo.com',
      createdAt: '2025-10-12T10:30:00.000Z'
    }
  }
}
```

### Check Email

Verifica se um email já está em uso.

**Uso:**
```typescript
import { authController } from './api/src';

const result = await authController.checkEmail('joao@exemplo.com');
```

**Resposta:**
```typescript
{
  success: true,
  data: {
    exists: true
  }
}
```

## 🎬 Filmes (TMDB Integration)

### Get Popular Movies

Busca filmes populares do TMDB.

**Uso:**
```typescript
import { movieService } from './api/src';

const result = await movieService.getPopularMovies(1);
```

**Parâmetros:**
- `page` (opcional): Número da página (padrão: 1)

**Resposta:**
```typescript
{
  movies: [
    {
      id: 123,
      title: 'Filme Exemplo',
      originalTitle: 'Example Movie',
      overview: 'Descrição do filme...',
      posterPath: 'https://image.tmdb.org/t/p/w500/path.jpg',
      backdropPath: 'https://image.tmdb.org/t/p/w500/backdrop.jpg',
      releaseDate: '2025-01-01',
      voteAverage: 8.5,
      voteCount: 1234,
      popularity: 567.89,
      adult: false,
      genreIds: [28, 12]
    }
  ],
  page: 1,
  totalPages: 500,
  totalResults: 10000
}
```

### Get Now Playing Movies

Busca filmes atualmente em cartaz.

**Uso:**
```typescript
import { movieService } from './api/src';

const result = await movieService.getNowPlayingMovies(1);
```

**Retorna:** Mesma estrutura de `getPopularMovies`

### Search Movies

Busca filmes por termo.

**Uso:**
```typescript
import { movieService } from './api/src';

const result = await movieService.searchMovies('batman', 1);
```

**Parâmetros:**
- `query`: Termo de busca
- `page` (opcional): Número da página (padrão: 1)

**Retorna:** Mesma estrutura de `getPopularMovies`

### Get Movie Details

Busca detalhes completos de um filme.

**Uso:**
```typescript
import { movieService } from './api/src';

const movie = await movieService.getMovieDetails(123);
```

**Parâmetros:**
- `movieId`: ID do filme no TMDB

**Retorna:** Objeto `Movie` com detalhes completos

## 🗄️ Banco de Dados

### Inicialização

O banco de dados é inicializado automaticamente:

```typescript
import { initializeAPI } from './api/src';

await initializeAPI();
```

### Schema

**Tabela `users`:**
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔒 Segurança

- **Senhas**: Armazenadas com hash SHA-256
- **Validação**: Todos os inputs são validados
- **SQL Injection**: Protegido com prepared statements
- **Email**: Normalizado para lowercase

## 📝 Tipos TypeScript

Todos os tipos estão disponíveis para importação:

```typescript
import type {
  User,
  UserResponse,
  SignupData,
  LoginData,
  AuthResponse,
  Movie,
  MovieServiceConfig
} from './api/src';
```

## 🚀 Próximas Melhorias

- [ ] Implementar JWT tokens
- [ ] Adicionar refresh tokens
- [ ] Implementar rate limiting
- [ ] Adicionar cache para filmes
- [ ] Criar middleware de autenticação
- [ ] Adicionar testes unitários
- [ ] Implementar logging estruturado
- [ ] Adicionar validação com Zod ou Yup

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação completa no README principal do projeto.



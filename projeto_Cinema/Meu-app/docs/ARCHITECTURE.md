# 🏗️ Arquitetura do Projeto

## Visão Geral

Este documento descreve a arquitetura do Cinema App, incluindo decisões de design, padrões utilizados e justificativas técnicas.

## Princípios de Design

### 1. Separation of Concerns (Separação de Responsabilidades)

O projeto está organizado em camadas distintas:

```
┌─────────────────────────────────────────┐
│           UI Components (View)           │  ← Apresentação
├─────────────────────────────────────────┤
│         Screens (Containers)             │  ← Orchestração
├─────────────────────────────────────────┤
│       Controllers (Handlers)             │  ← Coordenação
├─────────────────────────────────────────┤
│      Services (Business Logic)           │  ← Lógica de Negócio
├─────────────────────────────────────────┤
│         Models (Data Layer)              │  ← Acesso aos Dados
├─────────────────────────────────────────┤
│      Database (Persistence)              │  ← Persistência
└─────────────────────────────────────────┘
```

### 2. Component-Based Architecture

Componentes reutilizáveis e isolados:

- **Atomic Design**: Componentes divididos em atoms (Button, Input) e molecules (Card, MovieCard)
- **Props Interface**: Todas as props são tipadas com TypeScript
- **Single Responsibility**: Cada componente tem uma única responsabilidade

### 3. Type Safety First

TypeScript em todo o código:

- Interfaces para todas as entidades de dados
- Tipos de retorno explícitos em funções
- Uso de tipos utilitários (Partial, Pick, Omit)

## Estrutura de Camadas

### 1. Presentation Layer (app/, components/)

**Responsabilidade**: Renderização UI e interação do usuário

```typescript
// Exemplo: Componente de tela
export default function LoginScreen() {
  // Estado local da UI
  const [email, setEmail] = useState('');
  
  // Handlers de eventos
  const handleLogin = async () => {
    const user = await login(email, password);
    router.push('/movies');
  };
  
  // Renderização
  return <GradientBackground>...</GradientBackground>;
}
```

**Características**:
- Componentes funcionais com hooks
- Estado local para UI
- Não contém lógica de negócio
- Comunica-se apenas com Controllers/Services

### 2. Controller Layer (api/src/controllers/)

**Responsabilidade**: Orquestrar requisições e respostas

```typescript
export class AuthController {
  private authService: AuthService;
  
  async login(data: LoginData) {
    try {
      const result = await this.authService.login(data);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
```

**Características**:
- Processa entradas do usuário
- Chama serviços apropriados
- Formata respostas
- Trata erros de alto nível

### 3. Service Layer (api/src/services/)

**Responsabilidade**: Lógica de negócio e regras

```typescript
export class AuthService {
  async signup(data: SignupData) {
    // Validações de negócio
    this.validateSignupData(data);
    
    // Hash de senha
    const hashedPassword = await this.hashPassword(data.password);
    
    // Persistência via Model
    const user = await this.userModel.create({
      ...data,
      password: hashedPassword
    });
    
    return user;
  }
}
```

**Características**:
- Contém regras de negócio
- Validações complexas
- Transformações de dados
- Orquestração entre models

### 4. Model Layer (api/src/models/)

**Responsabilidade**: Acesso e manipulação de dados

```typescript
export class UserModel {
  async create(userData: CreateUserDTO): Promise<UserResponse> {
    const database = this.db.getDatabase();
    
    // Verifica duplicatas
    const existing = await database.getFirstAsync(
      'SELECT * FROM users WHERE email = ?',
      [userData.email]
    );
    
    if (existing) {
      throw new Error('Email já cadastrado');
    }
    
    // Insere novo usuário
    const result = await database.runAsync(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [userData.name, userData.email, userData.password]
    );
    
    return user;
  }
}
```

**Características**:
- CRUD operations
- Queries ao banco de dados
- Validações de dados
- Tratamento de duplicatas

### 5. Configuration Layer (api/src/config/)

**Responsabilidade**: Configurações e inicializações

```typescript
class Database {
  private static instance: Database;
  
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  
  public async initialize(): Promise<void> {
    this.db = await SQLite.openDatabaseAsync('cinema.db');
    await this.createTables();
  }
}
```

**Características**:
- Singleton pattern
- Inicialização lazy
- Gerenciamento de conexões

## Padrões de Design

### 1. Singleton Pattern

**Uso**: Database, configurações globais

**Motivo**: Garantir única instância de conexão com banco de dados

```typescript
class Database {
  private static instance: Database;
  
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
```

### 2. Repository Pattern

**Uso**: Models para acesso aos dados

**Motivo**: Abstrair lógica de acesso aos dados

```typescript
class UserModel {
  async findByEmail(email: string): Promise<User | null> {
    // Implementação específica do banco
  }
  
  async create(userData: CreateUserDTO): Promise<User> {
    // Implementação específica do banco
  }
}
```

### 3. Service Pattern

**Uso**: Services para lógica de negócio

**Motivo**: Centralizar regras de negócio

```typescript
class AuthService {
  private userModel: UserModel;
  
  async login(data: LoginData): Promise<AuthResponse> {
    // Lógica de negócio complexa
  }
}
```

### 4. DTO Pattern (Data Transfer Object)

**Uso**: Interfaces para transferência de dados

**Motivo**: Tipagem forte e validação

```typescript
export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}
```

## Fluxo de Dados

### Autenticação (Exemplo)

```
User Action
    ↓
[LoginScreen Component]
    ↓ calls
await login(email, password)
    ↓
[api/auth.ts Interface]
    ↓ calls
authController.login({ email, password })
    ↓
[AuthController]
    ↓ calls
authService.login(data)
    ↓
[AuthService]
    ↓ validates & hashes
    ↓ calls
userModel.findByEmail(email)
    ↓
[UserModel]
    ↓ queries
[SQLite Database]
    ↓ returns
User Data
    ↓ flows back
[LoginScreen]
    ↓
Router.push('/movies')
```

### Busca de Filmes (Exemplo)

```
User Opens Movies Screen
    ↓
[MoviesScreen Component]
    ↓ useEffect calls
fetchPopularMovies()
    ↓
[services/tmdb.service.ts]
    ↓ calls
movieService.getPopularMovies()
    ↓
[MovieService]
    ↓ HTTP Request
[TMDB API]
    ↓ returns
Movie Data (raw)
    ↓ transforms
formatMovie(tmdbMovie)
    ↓ returns
Movie[] (formatted)
    ↓ renders
[MovieCard Components]
```

## Sistema de Design

### Theme System

Centralização de estilos em `constants/theme.ts`:

```typescript
export const Colors = {
  primary: { start: '#667eea', end: '#f093fb' },
  // ...
};

export const Spacing = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32
};

export const Typography = {
  sizes: { xs: 12, sm: 14, md: 16, ... },
  weights: { regular: '400', bold: '700', ... }
};
```

**Benefícios**:
- Consistência visual
- Fácil manutenção
- Suporte a temas
- Type-safe com TypeScript

### Component Composition

Componentes compostos para flexibilidade:

```typescript
// Composição simples
<GradientBackground variant="primary">
  <Card variant="elevated">
    <Input label="Email" />
    <Button title="Entrar" />
  </Card>
</GradientBackground>

// Cada componente é independente e reutilizável
```

## Gerenciamento de Estado

### Estado Local (useState)

Para estado de UI simples:

```typescript
const [email, setEmail] = useState('');
const [loading, setLoading] = useState(false);
```

### Estado Derivado

Calculado a partir do estado existente:

```typescript
const passwordStrength = useMemo(() => {
  return calculateStrength(password);
}, [password]);
```

### Futura Evolução (Context API / Redux)

Para estado global quando necessário:
- Usuário autenticado
- Preferências do app
- Cache de dados

## Segurança

### 1. Input Validation

Validação em múltiplas camadas:

```typescript
// Frontend (UI)
if (!email.trim()) {
  setError('Email é obrigatório');
}

// Service (Business Logic)
private validateSignupData(data: SignupData) {
  if (!emailRegex.test(data.email)) {
    throw new Error('Email inválido');
  }
}

// Model (Data Layer)
const existing = await database.getFirstAsync(
  'SELECT * FROM users WHERE email = ?',
  [email]
);
```

### 2. Password Security

```typescript
// Hash com SHA-256
private async hashPassword(password: string): Promise<string> {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
}
```

### 3. SQL Injection Prevention

Uso de prepared statements:

```typescript
// ✅ Seguro
await database.runAsync(
  'SELECT * FROM users WHERE email = ?',
  [email]
);

// ❌ Inseguro
await database.runAsync(
  `SELECT * FROM users WHERE email = '${email}'`
);
```

## Performance

### 1. Lazy Loading

Componentes carregados apenas quando necessários:

```typescript
// Navegação automática com Expo Router
// Telas carregadas on-demand
```

### 2. Memoization

Evitar recálculos desnecessários:

```typescript
const passwordStrength = useMemo(() => 
  calculateStrength(password),
  [password]
);
```

### 3. Image Optimization

```typescript
<Image
  source={{ uri: posterPath }}
  resizeMode="cover"
  // Expo automaticamente otimiza
/>
```

## Testes (Futuro)

### Estrutura de Testes

```
__tests__/
├── unit/
│   ├── services/
│   ├── models/
│   └── utils/
├── integration/
│   ├── api/
│   └── database/
└── e2e/
    └── screens/
```

### Estratégia

- **Unit Tests**: Services, Models, Utils
- **Integration Tests**: Controllers, API flows
- **E2E Tests**: User flows críticos

## Escalabilidade

### Futuras Melhorias

1. **Backend Separado**
   - Node.js + Express
   - MongoDB/PostgreSQL
   - JWT authentication

2. **Cache Layer**
   - Redis para dados de filmes
   - AsyncStorage para dados do usuário

3. **State Management**
   - Redux Toolkit
   - React Query para cache de API

4. **Code Splitting**
   - Lazy loading de rotas
   - Dynamic imports

## Conclusão

Esta arquitetura foi projetada para:
- ✅ Ser fácil de entender
- ✅ Permitir crescimento
- ✅ Facilitar manutenção
- ✅ Promover reusabilidade
- ✅ Garantir qualidade

O projeto segue as melhores práticas da indústria e está preparado para evoluir conforme necessário.


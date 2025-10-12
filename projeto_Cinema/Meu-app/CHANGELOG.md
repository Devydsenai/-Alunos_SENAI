# 📋 Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2025-10-12

### ✨ Adicionado

#### UI/UX
- Sistema de design profissional com gradientes modernos
- Componente `GradientBackground` com múltiplas variantes (primary, secondary, accent, dark)
- Componente `Button` com 4 variantes (primary, secondary, outline, ghost)
- Componente `Input` com validação visual e suporte a ícones
- Componente `Card` com 3 variantes (default, elevated, outlined)
- Componente `MovieCard` especializado para exibição de filmes
- Tela inicial redesenhada com gradientes e animações
- Tela de login modernizada com validações em tempo real
- Tela de cadastro com indicador de força da senha
- Tela de filmes com grid responsivo e pull-to-refresh

#### API e Backend
- Estrutura de API profissional com arquitetura em camadas
- `Database` singleton para gerenciamento do SQLite
- `UserModel` com CRUD completo
- `AuthService` com validações e hash de senhas SHA-256
- `MovieService` para integração com TMDB API
- `AuthController` para orquestração de requisições
- Interface de compatibilidade retroativa em `api/auth.ts`
- Serviço de filmes em `services/tmdb.service.ts`

#### Theme System
- Sistema de cores com gradientes (primary, secondary, accent)
- Paleta de cores de estado (success, error, warning, info)
- Sistema de espaçamento consistente (xs, sm, md, lg, xl, xxl)
- Tipografia padronizada (sizes e weights)
- Sombras predefinidas (small, medium, large)
- Border radius consistente

#### Documentação
- README.md profissional com guia completo
- api/README.md com documentação detalhada da API
- docs/ARCHITECTURE.md explicando a arquitetura
- docs/EXAMPLES.md com exemplos práticos
- CONTRIBUTING.md com guia de contribuição
- CHANGELOG.md (este arquivo)

#### Segurança
- Hash de senhas com SHA-256
- Validação de entrada em múltiplas camadas
- Proteção contra SQL injection com prepared statements
- Normalização de emails para lowercase
- Validação de força da senha no frontend

#### Qualidade de Código
- TypeScript em 100% do código
- Interfaces para todas as entidades
- Documentação JSDoc em funções e componentes
- Separação clara de responsabilidades
- Padrões de design (Singleton, Repository, Service, DTO)

### 🔧 Alterado
- Estrutura de pastas reorganizada para melhor manutenibilidade
- API movida de arquivo único para estrutura em camadas
- Componentes UI refatorados para serem mais reutilizáveis
- Estilos inline substituídos por sistema de design

### 🗑️ Depreciado
- `api/auth.ts` mantido apenas para compatibilidade
- `tmdb.tsx` movido para `services/tmdb.service.ts`

### 📦 Dependências
- Adicionado `expo-linear-gradient` para gradientes
- Adicionado `expo-sqlite` para banco de dados
- Adicionado `expo-crypto` para hash de senhas

### 🐛 Corrigido
- N/A (primeira versão estável)

---

## [0.1.0] - 2025-10-11

### ✨ Adicionado
- Configuração inicial do projeto com Expo
- Estrutura básica de navegação com Expo Router
- Telas básicas de login e cadastro
- Integração básica com TMDB API
- Listagem simples de filmes populares

---

## Tipos de Mudanças

- `✨ Adicionado` - Novas features
- `🔧 Alterado` - Mudanças em features existentes
- `🗑️ Depreciado` - Features que serão removidas
- `🚫 Removido` - Features removidas
- `🐛 Corrigido` - Bug fixes
- `🔒 Segurança` - Correções de segurança
- `📦 Dependências` - Atualizações de dependências

---

## Links

- [1.0.0]: https://github.com/username/cinema-app/releases/tag/v1.0.0
- [0.1.0]: https://github.com/username/cinema-app/releases/tag/v0.1.0


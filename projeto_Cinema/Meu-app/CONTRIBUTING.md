# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o Cinema App! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)

## 📜 Código de Conduta

Este projeto segue um código de conduta. Ao participar, você concorda em manter um ambiente respeitoso e colaborativo.

### Nossas Promessas

- Usar linguagem acolhedora e inclusiva
- Respeitar pontos de vista e experiências diferentes
- Aceitar críticas construtivas graciosamente
- Focar no que é melhor para a comunidade
- Mostrar empatia com outros membros da comunidade

## 🚀 Como Contribuir

### 1. Fork do Projeto

```bash
# Clone seu fork
git clone https://github.com/seu-usuario/cinema-app.git
cd cinema-app

# Adicione o repositório original como remote
git remote add upstream https://github.com/original/cinema-app.git
```

### 2. Crie uma Branch

```bash
# Atualize sua main
git checkout main
git pull upstream main

# Crie uma nova branch
git checkout -b feature/minha-feature
# ou
git checkout -b fix/meu-bugfix
```

### 3. Faça suas Alterações

- Escreva código limpo e bem documentado
- Siga os padrões de código do projeto
- Adicione testes quando aplicável
- Mantenha commits pequenos e focados

### 4. Commit suas Alterações

```bash
git add .
git commit -m "feat: adiciona nova funcionalidade X"
```

#### Padrão de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Mudanças na documentação
- `style:` Formatação, ponto e vírgula, etc
- `refactor:` Refatoração de código
- `test:` Adição ou correção de testes
- `chore:` Manutenção, dependências, etc

**Exemplos:**
```bash
feat: adiciona tela de detalhes do filme
fix: corrige validação de email no login
docs: atualiza README com novas instruções
style: formata código seguindo ESLint
refactor: reorganiza estrutura de pastas da API
test: adiciona testes para AuthService
chore: atualiza dependências do projeto
```

### 5. Push para o GitHub

```bash
git push origin feature/minha-feature
```

### 6. Abra um Pull Request

- Vá para o repositório no GitHub
- Clique em "New Pull Request"
- Selecione sua branch
- Preencha o template de PR
- Aguarde revisão

## 💻 Padrões de Código

### TypeScript

```typescript
// ✅ Bom: Tipos explícitos
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): Promise<User> {
  // ...
}

// ❌ Ruim: Tipos implícitos/any
function getUser(id): any {
  // ...
}
```

### Componentes React

```tsx
// ✅ Bom: Componente documentado com tipos
/**
 * Componente de botão reutilizável
 * 
 * @param title - Texto do botão
 * @param onPress - Callback ao pressionar
 */
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ title, onPress, variant = 'primary' }: ButtonProps) {
  return <TouchableOpacity onPress={onPress}>...</TouchableOpacity>;
}

// ❌ Ruim: Sem tipos ou documentação
export function Button(props) {
  return <TouchableOpacity>...</TouchableOpacity>;
}
```

### Nomenclatura

```typescript
// ✅ Bom: Nomes descritivos
const handleLoginSubmit = async () => { /* ... */ };
const isEmailValid = validateEmail(email);
const userProfileData = await fetchUserProfile(userId);

// ❌ Ruim: Nomes vagos
const handle = async () => { /* ... */ };
const valid = validate(e);
const data = await fetch(id);
```

### Estrutura de Arquivos

```
components/
├── ui/                    # Componentes base reutilizáveis
│   ├── Button.tsx
│   ├── Input.tsx
│   └── index.ts           # Export barrel
├── layout/                # Componentes de layout
│   └── Header.tsx
└── features/              # Componentes específicos de features
    └── MovieList.tsx
```

### Importações

```typescript
// ✅ Bom: Importações organizadas
// 1. Bibliotecas externas
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';

// 2. Componentes internos
import { Button, Input } from '../components/ui';
import { Colors, Spacing } from '../constants/theme';

// 3. Tipos
import type { User } from '../api/src';

// 4. Utilitários
import { validateEmail } from '../utils/validation';

// ❌ Ruim: Importações misturadas
import { validateEmail } from '../utils/validation';
import React from 'react';
import { Button } from '../components/ui';
import { View } from 'react-native';
```

### Comentários e Documentação

```typescript
/**
 * Autentica um usuário no sistema
 * 
 * Esta função valida as credenciais do usuário e retorna
 * os dados do usuário se a autenticação for bem-sucedida.
 * 
 * @param email - Email do usuário
 * @param password - Senha do usuário
 * @returns Dados do usuário autenticado
 * @throws {Error} Se as credenciais forem inválidas
 * 
 * @example
 * ```typescript
 * const user = await login('user@email.com', 'senha123');
 * console.log(`Bem-vindo, ${user.name}!`);
 * ```
 */
export async function login(email: string, password: string): Promise<User> {
  // Validar entradas
  if (!email || !password) {
    throw new Error('Email e senha são obrigatórios');
  }
  
  // Buscar usuário no banco
  const user = await userModel.findByEmail(email);
  
  // Verificar senha
  if (!user || !verifyPassword(password, user.password)) {
    throw new Error('Credenciais inválidas');
  }
  
  return user;
}
```

### Estilos

```typescript
// ✅ Bom: Usar sistema de design
import { Colors, Spacing, Typography } from '../constants/theme';

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    backgroundColor: Colors.light,
  },
  title: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
  },
});

// ❌ Ruim: Valores hardcoded
const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a2e',
  },
});
```

## 🔄 Processo de Pull Request

### Checklist antes de submeter

- [ ] Código segue os padrões do projeto
- [ ] Comentários e documentação adicionados
- [ ] Testes passando (se aplicável)
- [ ] ESLint sem erros
- [ ] TypeScript sem erros
- [ ] Testado em dispositivo/emulador
- [ ] Screenshots adicionados (para mudanças visuais)
- [ ] Documentação atualizada (se necessário)

### Template de Pull Request

```markdown
## Descrição

Breve descrição das mudanças realizadas.

## Tipo de Mudança

- [ ] Bug fix (correção que resolve um problema)
- [ ] Nova feature (adiciona funcionalidade)
- [ ] Breaking change (mudança que quebra compatibilidade)
- [ ] Documentação

## Como Testar

1. Clone o PR
2. Execute `npm install`
3. Execute `npm start`
4. Teste X, Y, Z

## Screenshots

(Se aplicável, adicione screenshots)

## Checklist

- [ ] Código segue padrões do projeto
- [ ] Comentários adicionados
- [ ] Testes passando
- [ ] Documentação atualizada
```

### Processo de Revisão

1. **Revisão Automática**: GitHub Actions verifica lint e build
2. **Revisão Manual**: Mantenedor revisa o código
3. **Discussão**: Comentários e sugestões
4. **Aprovação**: PR aprovado
5. **Merge**: PR incorporado ao projeto

## 🐛 Reportando Bugs

### Antes de Reportar

1. Verifique se o bug já foi reportado
2. Use a versão mais recente
3. Tente reproduzir o bug

### Template de Bug Report

```markdown
**Descrição do Bug**
Descrição clara e concisa do bug.

**Reproduzir**
Passos para reproduzir o comportamento:
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

**Comportamento Esperado**
O que deveria acontecer.

**Comportamento Atual**
O que está acontecendo.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
 - OS: [e.g. iOS 17, Android 14]
 - Versão do App: [e.g. 1.0.0]
 - Dispositivo: [e.g. iPhone 15, Pixel 8]

**Contexto Adicional**
Qualquer outra informação relevante.
```

## 💡 Sugerindo Melhorias

### Template de Feature Request

```markdown
**Sua sugestão está relacionada a um problema?**
Descrição clara do problema. Ex: Fico frustrado quando [...]

**Descreva a solução desejada**
Descrição clara do que você quer que aconteça.

**Descreva alternativas consideradas**
Descrição de soluções ou features alternativas.

**Contexto adicional**
Screenshots, mockups, etc.
```

## 📚 Recursos Úteis

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## ❓ Perguntas?

Se tiver dúvidas, você pode:

1. Abrir uma issue com a tag `question`
2. Consultar a documentação existente
3. Procurar em issues fechadas

## 🎉 Agradecimentos

Obrigado por contribuir! Toda contribuição, grande ou pequena, é valorizada.

---

**Happy Coding! 🚀**


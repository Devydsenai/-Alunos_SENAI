# 📦 Pasta Components

Esta pasta deve conter **componentes reutilizáveis** que são usados em múltiplas partes da aplicação.

## 🎯 O que colocar aqui?

### ✅ Deve ir para components/
- Botões personalizados
- Inputs customizados
- Cards reutilizáveis
- Modais genéricos
- Listas customizadas
- Headers/Footers compartilhados
- Loading indicators
- Componentes de formulário

### ❌ Não deve ir para components/
- Telas completas (vão em `app/`)
- Estilos (vão em arquivos `.styles.tsx`)
- Lógica de negócio (vão em `services/` ou hooks)
- Configurações (vão em `constants/`)

## 📁 Estrutura Recomendada

### Opção 1: Componente Simples
```
components/
└── Button.tsx
```

### Opção 2: Componente com Estilos (Recomendado)
```
components/
└── Button/
    ├── index.tsx          # Componente
    └── styles.tsx         # Estilos com styled-components
```

### Opção 3: Componente Complexo
```
components/
└── Card/
    ├── index.tsx          # Componente principal
    ├── styles.tsx         # Estilos
    ├── CardHeader.tsx     # Sub-componente
    ├── CardBody.tsx       # Sub-componente
    └── types.ts           # Tipos TypeScript
```

## 💡 Exemplo de Componente

### Button/index.tsx
```tsx
import React from 'react';
import * as S from './styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

export function Button({ title, onPress, variant = 'primary', disabled }: ButtonProps) {
  return (
    <S.Container variant={variant} onPress={onPress} disabled={disabled}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}
```

### Button/styles.tsx
```tsx
import styled from 'styled-components/native';
import { colors } from '../../constants/theme';

export const Container = styled.TouchableOpacity<{ variant: string; disabled?: boolean }>`
  background-color: ${(props: { variant: string }) => 
    props.variant === 'primary' ? colors.primary :
    props.variant === 'secondary' ? colors.secondary :
    colors.error};
  padding: 15px 30px;
  border-radius: 25px;
  opacity: ${(props: { disabled?: boolean }) => props.disabled ? 0.5 : 1};
`;

export const Title = styled.Text`
  color: ${colors.textLight};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
```

### Uso em uma tela:
```tsx
import { Button } from '@/components/Button';

// ...
<Button 
  title="Salvar" 
  variant="primary" 
  onPress={handleSave} 
/>
```

## 🚀 Componentes Sugeridos para Este Projeto

1. **FormInput** - Input reutilizável para formulários
2. **Card** - Card genérico para exibir informações
3. **StatusBadge** - Badge de status (ativo/inativo)
4. **LoadingSpinner** - Indicador de carregamento
5. **EmptyState** - Tela vazia com ícone e mensagem
6. **SearchBar** - Barra de pesquisa reutilizável
7. **ConfirmModal** - Modal de confirmação

## 📚 Boas Práticas

1. **Use TypeScript**: Sempre defina interfaces para as props
2. **Seja Genérico**: Componente deve funcionar em vários contextos
3. **Props Claras**: Nomes de props devem ser descritivos
4. **Documentação**: Comente comportamentos não óbvios
5. **Testável**: Componentes devem ser fáceis de testar
6. **Acessibilidade**: Use labels e aria-labels quando necessário

## 🎓 Exercício para Alunos

**Desafio 1**: Criar um componente `Card` reutilizável que seja usado nas telas de categorias, produtos e fornecedores.

**Desafio 2**: Extrair o checkbox usado nos formulários para um componente `Checkbox` reutilizável.

**Desafio 3**: Criar um componente `SearchBar` que seja usado nas telas de pesquisa.

---

📖 **Documentação completa**: Veja `ORGANIZACAO_CODIGO.md` na raiz do projeto



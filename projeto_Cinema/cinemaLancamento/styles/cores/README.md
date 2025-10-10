# 🎨 Guia de Cores do Cinema App

## 📖 Visão Geral

Este arquivo contém toda a paleta de cores do aplicativo com nomenclatura semântica em português.

## 🚀 Como Usar

### Importação Básica

```typescript
import * as cores from '../../styles/cores';

// Usar
backgroundColor: cores.vermelhoPrimario
```

### Importação Específica

```typescript
import { vermelhoPrimario, branco, cinzaTexto } from '../../styles/cores';
```

### Com Styled Components

```typescript
import styled from 'styled-components/native';
import * as cores from '../../styles/cores';

export const Container = styled.View`
  background-color: ${cores.pretoPrincipal};
`;

export const Title = styled.Text`
  color: ${cores.branco};
`;
```

## 🎨 Referência Rápida de Cores

### Interface Visual

| Uso | Nome da Variável | Hex | Preview |
|-----|------------------|-----|---------|
| **Primária** | `vermelhoPrimario` | #E50914 | 🔴 |
| **Fundo Principal** | `pretoPrincipal` | #141414 | ⬛ |
| **Fundo Card** | `cinzaMedio` | #2a2a2a | ⬜ |
| **Texto Principal** | `branco` | #FFFFFF | ⚪ |
| **Texto Secundário** | `cinzaTexto` | #999999 | 🔘 |
| **Estrelas** | `dourado` | #FFD700 | ⭐ |
| **Sucesso** | `verde` | #4CAF50 | 🟢 |
| **Erro** | `vermelho` | #F44336 | 🔴 |
| **Aviso** | `laranja` | #FF9800 | 🟠 |

## 📋 Casos de Uso

### Telas e Fundos

```typescript
// Fundo da aplicação
backgroundColor: cores.pretoPrincipal

// Fundo de cards
backgroundColor: cores.cinzaMedio

// Fundo de header
backgroundColor: cores.cinzaEscuro

// Fundo do player de vídeo
backgroundColor: cores.corPlayer
```

### Textos

```typescript
// Título principal
color: cores.branco

// Texto secundário (descrição)
color: cores.cinzaTexto

// Links e destaques
color: cores.vermelhoPrimario

// Avaliações
color: cores.dourado
```

### Botões

```typescript
// Botão primário
backgroundColor: cores.vermelhoPrimario
color: cores.branco

// Botão desabilitado
backgroundColor: cores.cinzaDesabilitado
color: cores.cinzaTexto

// Botão sucesso
backgroundColor: cores.verde
color: cores.branco
```

### Estados

```typescript
// Disponível
borderColor: cores.verdeClaro
backgroundColor: cores.verdeTransparente

// Indisponível
borderColor: cores.vermelho
backgroundColor: cores.vermelhoTransparente

// Aviso
borderColor: cores.laranja
backgroundColor: cores.laranjaTransparente
```

## 🔄 Alterando Cores Globalmente

Para mudar uma cor em todo o app:

1. Abra `styles/cores/index.ts`
2. Modifique o valor hex da cor desejada
3. Todas as telas serão atualizadas automaticamente!

Exemplo:
```typescript
// Mudar cor primária de vermelho para azul
export const vermelhoPrimario = '#2196F3'; // era #E50914
```

## ⚠️ Importante

### ✅ FAZER
- Sempre usar variáveis de cor: `cores.vermelhoPrimario`
- Usar nomes semânticos: `cores.textoSecundario`
- Importar de `'../../styles/cores'`

### ❌ NÃO FAZER
- Usar hex direto: `#E50914`
- Criar cores inline: `backgroundColor: '#ff0000'`
- Duplicar valores de cores
- Inventar nomes confusos: `cores.cor1`, `cores.azulQueUseiAli`

## 🎯 Exemplos Completos

### Componente com Styled Components

```typescript
// styles.ts
import styled from 'styled-components/native';
import * as cores from '../../styles/cores';

export const Card = styled.View`
  background-color: ${cores.cinzaMedio};
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 10px;
  border-width: 1px;
  border-color: ${cores.cinzaClaro};
`;

export const CardTitle = styled.Text`
  color: ${cores.branco};
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const CardDescription = styled.Text`
  color: ${cores.cinzaTexto};
  font-size: 14px;
  line-height: 20px;
`;

export const CardBadge = styled.View`
  background-color: ${cores.vermelhoPrimario};
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
`;

export const BadgeText = styled.Text`
  color: ${cores.branco};
  font-size: 12px;
  font-weight: bold;
`;
```

### Componente Funcional

```typescript
// MyCard.tsx
import React from 'react';
import * as S from './styles';

interface MyCardProps {
  title: string;
  description: string;
  badge?: string;
}

export default function MyCard({ title, description, badge }: MyCardProps) {
  return (
    <S.Card>
      <S.CardTitle>{title}</S.CardTitle>
      <S.CardDescription>{description}</S.CardDescription>
      {badge && (
        <S.CardBadge>
          <S.BadgeText>{badge}</S.BadgeText>
        </S.CardBadge>
      )}
    </S.Card>
  );
}
```

## 🎨 Tema Escuro (Futuro)

O sistema de cores está preparado para suportar tema dark/light:

```typescript
// Futuro: themes.ts
export const darkTheme = {
  fundo: cores.pretoPrincipal,
  texto: cores.branco,
  // ...
};

export const lightTheme = {
  fundo: cores.branco,
  texto: cores.pretoPrincipal,
  // ...
};
```

## 📚 Mais Informações

- Ver [styles/README.md](../README.md) para documentação completa
- Ver exemplos em `components/movie/styles.ts`
- Ver uso em `app/(tabs)/index.tsx`




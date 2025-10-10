# 🎨 Sistema de Estilos e Cores

Este diretório contém todo o sistema de design do aplicativo, incluindo paleta de cores, temas e styled-components.

## 📁 Estrutura

```
styles/
├── cores/
│   └── index.ts        # Paleta de cores completa
└── README.md           # Esta documentação
```

## 🎨 Paleta de Cores

### Uso das Cores

Todas as cores estão centralizadas em `styles/cores/index.ts` com nomes semânticos em português.

#### Importação

```typescript
// Importar cores específicas
import { vermelhoPrimario, branco, cinzaTexto } from '../../styles/cores';

// Importar todas as cores
import * as cores from '../../styles/cores';

// Usar no código
backgroundColor: cores.vermelhoPrimario
color: cores.branco
```

### Categorias de Cores

#### 🔴 Cores Primárias
- `vermelhoPrimario` - #E50914 (Netflix)
- `vermelhoEscuro` - #B20710
- `vermelhoClaro` - #FF1A1F

#### ⚫ Cores de Fundo
- `pretoPrincipal` - #141414
- `pretoSecundario` - #000000
- `cinzaEscuro` - #1a1a1a
- `cinzaMedio` - #2a2a2a
- `cinzaClaro` - #333333

#### 📝 Cores de Texto
- `branco` - #FFFFFF
- `cinzaTexto` - #999999
- `cinzaTextoClaro` - #CCCCCC

#### ⭐ Cores de Destaque
- `dourado` - #FFD700 (estrelas)
- `amarelo` - #FFC107
- `laranja` - #FF9800
- `laranjaClaro` - #FFB74D

#### 🟢 Cores de Estado
- `verde` / `verdeClaro` / `verdeSucesso`
- `vermelho` / `vermelhoErro`
- `azul` / `azulClaro`
- `cinzaDesabilitado`

## 💅 Styled Components

### Organização

Cada componente tem seu próprio arquivo `styles.ts` no mesmo diretório:

```
components/
├── movie/
│   ├── MovieCard.tsx
│   ├── SearchBar.tsx
│   └── styles.ts        # Estilos do MovieCard e SearchBar
└── video/
    ├── VideoPlayer.tsx
    └── styles.ts        # Estilos do VideoPlayer
```

### Padrão de Uso

#### 1. Criar arquivo `styles.ts`

```typescript
import styled from 'styled-components/native';
import * as cores from '../../styles/cores';

export const Container = styled.View`
  background-color: ${cores.cinzaMedio};
  padding: 15px;
  border-radius: 12px;
`;

export const Title = styled.Text`
  color: ${cores.branco};
  font-size: 18px;
  font-weight: bold;
`;
```

#### 2. Usar no componente

```typescript
import * as S from './styles';

export default function MeuComponente() {
  return (
    <S.Container>
      <S.Title>Título</S.Title>
    </S.Container>
  );
}
```

### Props Dinâmicas

```typescript
// styles.ts
export const Button = styled.TouchableOpacity<{ disabled: boolean }>`
  background-color: ${props => 
    props.disabled ? cores.cinzaDesabilitado : cores.vermelhoPrimario
  };
  padding: 10px;
`;

// Component.tsx
<S.Button disabled={!isActive}>
  <S.ButtonText>Clique</S.ButtonText>
</S.Button>
```

## 🎯 Benefícios

### ✅ Manutenibilidade
- Cores centralizadas em um único lugar
- Mudança de tema global fácil
- Nomes semânticos facilitam entendimento

### ✅ Consistência
- Design system unificado
- Mesmas cores em todo o app
- Padrões visuais mantidos

### ✅ Organização
- Estilos separados da lógica
- Arquivos menores e mais focados
- Fácil de encontrar e modificar

### ✅ TypeScript
- Type safety nas cores
- Autocomplete de propriedades
- Menos erros em tempo de execução

## 📝 Convenções

### Nomenclatura de Cores
- Use nomes semânticos: `vermelhoPrimario` ❌ `cor1`
- Use português para consistência
- Descreva a função: `textoSecundario` ✅
- Evite valores hex diretos no código ❌ `#E50914`

### Nomenclatura de Componentes Styled
- Use PascalCase: `Container`, `Title`
- Seja descritivo: `HeaderTitle` ✅ não `Text1` ❌
- Agrupe por contexto no arquivo `styles.ts`

### Estrutura de Arquivos
```
ComponentName/
├── ComponentName.tsx    # Lógica do componente
└── styles.ts           # Estilos styled-components
```

## 🔄 Migrando Componentes Existentes

### Antes (StyleSheet)
```typescript
import { StyleSheet, View, Text } from 'react-native';

const Component = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Título</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a2a2a',
    padding: 15,
  },
  title: {
    color: '#fff',
    fontSize: 18,
  },
});
```

### Depois (Styled Components)
```typescript
// styles.ts
import styled from 'styled-components/native';
import * as cores from '../../styles/cores';

export const Container = styled.View`
  background-color: ${cores.cinzaMedio};
  padding: 15px;
`;

export const Title = styled.Text`
  color: ${cores.branco};
  font-size: 18px;
`;

// Component.tsx
import * as S from './styles';

const Component = () => (
  <S.Container>
    <S.Title>Título</S.Title>
  </S.Container>
);
```

## 🚀 Próximos Passos

- [ ] Migrar componentes restantes para styled-components
- [ ] Criar tema dark/light mode
- [ ] Adicionar animações com styled-components
- [ ] Documentar componentes no Storybook

## 📚 Referências

- [Styled Components](https://styled-components.com/)
- [Styled Components React Native](https://styled-components.com/docs/basics#react-native)
- [Design System Best Practices](https://www.designsystems.com/)




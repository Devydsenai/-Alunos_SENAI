# 📘 Exemplos de Uso - Styled Components

## 🎯 Como Usar o Novo Sistema

### 1️⃣ Importar Cores e Styled Components

```typescript
// Importar cores organizadas
import { Colors } from '../constants/colors';

// OU usar o tema existente (compatível)
import { Colors } from '../constants/theme';

// Importar styled components prontos
import * as S from '../styles/seats.styles';
```

---

## 2️⃣ Exemplo Completo - Tela Refatorada

### Antes (StyleSheet):

```typescript
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function Screen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cinema App</Text>
      </View>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
```

### Depois (Styled Components):

```typescript
import styled from 'styled-components/native';
import { Colors } from '../constants/colors';
import { Spacing, Typography, BorderRadius } from '../constants/theme';

export default function Screen() {
  return (
    <Container>
      <Header>
        <Title>Cinema App</Title>
      </Header>
      
      <BuyButton>
        <ButtonText>Comprar</ButtonText>
      </BuyButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.background.dark};
`;

const Header = styled.View`
  padding: ${Spacing.md}px;
`;

const Title = styled.Text`
  font-size: ${Typography.sizes.xl}px;
  font-weight: ${Typography.weights.bold};
  color: ${Colors.text.light};
`;

const BuyButton = styled.TouchableOpacity`
  background-color: ${Colors.buttons.primary};
  padding: ${Spacing.md}px;
  border-radius: ${BorderRadius.sm}px;
`;

const ButtonText = styled.Text`
  color: ${Colors.text.light};
  font-size: ${Typography.sizes.md}px;
  font-weight: ${Typography.weights.bold};
`;
```

---

## 3️⃣ Componentes com Props Dinâmicas

### Botão com Estado Disabled:

```typescript
const Button = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${props => 
    props.disabled ? Colors.buttons.disabled : Colors.buttons.primary
  };
  opacity: ${props => props.disabled ? 0.5 : 1};
  padding: ${Spacing.md}px;
  border-radius: ${BorderRadius.md}px;
`;

// Uso:
<Button disabled={false}>
  <ButtonText>Ativo</ButtonText>
</Button>

<Button disabled={true}>
  <ButtonText>Desabilitado</ButtonText>
</Button>
```

### Assento com Múltiplos Estados:

```typescript
const Seat = styled.TouchableOpacity<{
  selected?: boolean;
  purchased?: boolean;
  occupied?: boolean;
}>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${props => {
    if (props.purchased) return Colors.seats.purchased;
    if (props.selected) return Colors.seats.selected;
    if (props.occupied) return Colors.seats.occupied;
    return Colors.seats.available;
  }};
  justify-content: center;
  align-items: center;
`;

// Uso:
<Seat selected={true}>...</Seat>
<Seat purchased={true}>...</Seat>
<Seat occupied={true}>...</Seat>
```

---

## 4️⃣ Sistema de Cores - Referência Rápida

### Cores de Assentos (mais usado):
```typescript
Colors.seats.available    // #007AFF - Azul
Colors.seats.selected     // #22C55E - Verde  
Colors.seats.purchased    // #F44336 - Vermelho
Colors.seats.occupied     // #4A4A4A - Cinza
```

### Cores de Botões:
```typescript
Colors.buttons.primary    // #007AFF - Azul
Colors.buttons.danger     // #FF3B30 - Vermelho
Colors.buttons.warning    // #FF9500 - Laranja
Colors.buttons.success    // #22C55E - Verde
Colors.buttons.disabled   // #8E8E93 - Cinza
```

### Cores de Background:
```typescript
Colors.background.dark      // #1a1a1a
Colors.background.medium    // #2a2a2a
Colors.background.light     // #FFFFFF
Colors.background.overlay   // rgba(0, 0, 0, 0.3)
```

### Cores de Texto:
```typescript
Colors.text.light        // #FFFFFF
Colors.text.primary      // #1C1C1E
Colors.text.secondary    // #8E8E93
```

---

## 5️⃣ Migração Gradual

### ✅ O que já está pronto:
- Sistema de cores centralizado
- Styled components para tela de assentos
- Tema atualizado com novas cores
- Documentação completa

### 📋 Próximos passos (opcional):
1. Migrar `movies.tsx` para styled-components
2. Migrar `sessions.tsx` para styled-components
3. Migrar componentes UI (Button, Card, etc)
4. Criar arquivo `styles/movies.styles.ts`
5. Criar arquivo `styles/sessions.styles.ts`

### 💡 Dica:
Você pode usar **ambos os sistemas** (StyleSheet e Styled Components) juntos durante a migração gradual!

---

## 🎯 Benefícios Implementados

✅ **Organização**: Cores em um único lugar
✅ **Consistência**: Mesmas cores em todo o app
✅ **Type-Safe**: TypeScript ajuda a não errar
✅ **Manutenibilidade**: Fácil de atualizar cores
✅ **Escalabilidade**: Fácil adicionar novas cores
✅ **DX**: Autocomplete ao digitar `Colors.`

---

## 📚 Arquivos Criados

1. `constants/colors.ts` - Sistema de cores
2. `styles/seats.styles.ts` - Styled components
3. `docs/STYLE_GUIDE.md` - Este guia
4. `docs/STYLED_COMPONENTS_EXAMPLE.md` - Exemplos

**Agora você tem um sistema de cores profissional e organizado!** 🎉


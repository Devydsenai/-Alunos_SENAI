# 🎨 Guia de Estilo - Cinema App

## Sistema de Cores Organizado

### 📁 Estrutura de Arquivos

```
constants/
  ├── colors.ts          # Sistema de cores centralizado (NOVO)
  └── theme.ts           # Tema completo (spacing, typography, etc)

styles/
  └── seats.styles.ts    # Styled components da tela de assentos (NOVO)
```

---

## 🎨 Sistema de Cores

### Arquivo: `constants/colors.ts`

#### 1. Cores Primárias (Gradientes)
```typescript
primary: {
  start: '#6366f1',    // Indigo
  middle: '#8b5cf6',   // Purple
  end: '#d946ef',      // Fuchsia
}
```

#### 2. Cores de Background
```typescript
background: {
  primary: 'transparent',
  dark: '#1a1a1a',
  medium: '#2a2a2a',
  light: '#FFFFFF',
  lightSecondary: '#F5F5F7',
  overlay: 'rgba(0, 0, 0, 0.3)',
  overlayDark: 'rgba(0, 0, 0, 0.7)',
}
```

#### 3. Cores de Assentos
```typescript
seats: {
  available: '#007AFF',         // Azul - Disponível
  selected: '#22C55E',          // Verde - Selecionado
  purchased: '#F44336',         // Vermelho - Comprado
  occupied: '#4A4A4A',          // Cinza - Ocupado
  wheelchair: '#007AFF',        // Azul - Cadeirante
  reducedMobility: '#007AFF',   // Azul - Mobilidade Reduzida
  companion: '#007AFF',         // Azul - Acompanhante
}
```

#### 4. Cores de Botões
```typescript
buttons: {
  primary: '#007AFF',
  danger: '#FF3B30',
  warning: '#FF9500',
  success: '#22C55E',
  disabled: '#8E8E93',
}
```

---

## 💅 Styled Components

### Arquivo: `styles/seats.styles.ts`

#### Componentes Principais:

```typescript
import * as S from '../styles/seats.styles';

// Uso:
<S.Container>
  <S.Header>
    <S.MovieTitle>Título do Filme</S.MovieTitle>
  </S.Header>
  
  <S.ActionsFooter>
    <S.BuyButton disabled={false}>
      <S.BuyButtonText>Comprar</S.BuyButtonText>
    </S.BuyButton>
  </S.ActionsFooter>
</S.Container>
```

#### Componentes Disponíveis:

**Layout:**
- `Container` - Container principal
- `Header` / `HeaderLeft` - Cabeçalho
- `MainContent` - Conteúdo principal
- `ActionsFooter` - Rodapé de ações

**Textos:**
- `MovieTitle` - Título do filme
- `CinemaName` - Nome do cinema
- `LoadingText` / `LoadingSubtext` - Textos de carregamento

**Botões:**
- `BuyButton` - Botão de compra
- `ClearButton` - Botão de desistir
- `CloseButton` - Botão fechar
- `Tab` - Tab de navegação

**Assentos:**
- `SeatMapContainer` - Container do mapa
- `SeatRow` - Fileira de assentos
- `SeatGroup` - Grupo de assentos
- `RowLabel` - Label da fileira

**Modal:**
- `ModalOverlay` - Fundo do modal
- `ModalContent` - Conteúdo do modal
- `ModalHeader` / `ModalBody` - Partes do modal
- `ModalActions` - Ações do modal

**Legenda:**
- `LegendContainer` - Container da legenda
- `LegendSection` - Seção da legenda
- `LegendItem` - Item da legenda

---

## 📝 Migração para Styled Components

### Antes (StyleSheet):
```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

<View style={styles.container}>
  <Text style={styles.title}>Título</Text>
</View>
```

### Depois (Styled Components):
```typescript
const Container = styled.View`
  flex: 1;
  background-color: ${Colors.background.dark};
  padding: ${Spacing.md}px;
`;

const Title = styled.Text`
  font-size: ${Typography.sizes.xl}px;
  font-weight: ${Typography.weights.bold};
  color: ${Colors.text.light};
`;

<Container>
  <Title>Título</Title>
</Container>
```

---

## ✅ Vantagens do Sistema Organizado

1. **Cores Centralizadas**: Todas as cores em um único arquivo
2. **Type-Safe**: TypeScript garante que cores existem
3. **Reutilizável**: Styled components podem ser importados
4. **Manutenível**: Mudança de cor em um lugar afeta todo o app
5. **Semântico**: Nomes descritivos (seats.available, buttons.danger)
6. **DX Melhor**: Autocomplete para todas as cores

---

## 🚀 Próximos Passos

1. ✅ Sistema de cores criado (`constants/colors.ts`)
2. ✅ Styled components criados (`styles/seats.styles.ts`)
3. ⏳ Migrar componentes existentes para styled-components
4. ⏳ Criar styles para outras telas (movies, sessions, etc)

---

## 📖 Referências

- [Styled Components](https://styled-components.com/)
- [React Native Styled Components](https://styled-components.com/docs/basics#react-native)


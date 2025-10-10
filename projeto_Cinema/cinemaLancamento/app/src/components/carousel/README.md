# 🎠 MovieCarousel - Componente de Carrossel

Componente profissional de carrossel com navegação por setas e indicadores visuais.

## ✨ Características

- 🎯 **Setas de Navegação** - Botões laterais para navegar
- 📊 **Indicadores de Posição** - Mostra onde você está no carrossel
- 🎨 **Design Moderno** - Estilo Netflix/Disney+
- 📱 **Responsivo** - Adapta ao tamanho da tela
- ⚡ **Animações Suaves** - Transições fluidas
- 🔄 **Auto-hide das Setas** - Aparecem apenas quando necessário

## 🚀 Como Usar

### Importação

```typescript
import { MovieCarousel } from '../../components';
```

### Exemplo Básico

```typescript
<MovieCarousel
  title="🔥 Populares"
  data={filmes}
  renderItem={({ item }) => <FilmeCard filme={item} />}
  onViewAll={() => navigation.navigate('Explore')}
/>
```

### Props

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `title` | `string` | ✅ | Título da seção |
| `data` | `any[]` | ✅ | Array de itens para exibir |
| `renderItem` | `function` | ✅ | Função que renderiza cada item |
| `onViewAll` | `function` | ❌ | Callback ao clicar em "Ver todos" |

### Exemplo Completo

```typescript
import { MovieCarousel } from '../../components';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const router = useRouter();
  const [filmes, setFilmes] = useState([]);

  const renderFilme = ({ item }) => (
    <FilmeCard
      filme={item}
      onPress={() => navigateToDetails(item.id)}
    />
  );

  return (
    <MovieCarousel
      title="🎭 Em Cartaz"
      data={filmes}
      renderItem={renderFilme}
      onViewAll={() => router.push('/explore')}
    />
  );
}
```

## 🎨 Personalização

### Modificar Quantidade de Cards Visíveis

Edite `components/carousel/MovieCarousel.tsx`:

```typescript
const CARDS_PER_VIEW = 4; // Altere para 3, 5, etc.
```

### Modificar Tamanho dos Cards

```typescript
const CARD_WIDTH = width * 0.28; // Altere o multiplicador
```

### Modificar Espaçamento

```typescript
const CARD_MARGIN = 15; // Espaçamento entre cards
```

## 🎯 Funcionalidades

### Navegação

- **Seta Esquerda (‹):** Navega para filmes anteriores
- **Seta Direita (›):** Navega para próximos filmes
- **Scroll Manual:** Arraste com o dedo (touch/mouse)
- **Snap:** Cards se alinham automaticamente

### Indicadores

- **Bolinhas embaixo:** Mostram sua posição no carrossel
- **Bolinha ativa:** Maior e vermelha
- **Bolinhas inativas:** Menores e cinzas

### Auto-hide

- **Setas aparecem** apenas quando há mais conteúdo
- **Primeira posição:** Sem seta esquerda
- **Última posição:** Sem seta direita

## 🎬 Exemplo Visual

```
┌──────────────────────────────────────────┐
│  🔥 Populares            Ver todos →     │
├──────────────────────────────────────────┤
│                                          │
│  ‹  [🎬] [🎬] [🎬] [🎬] [🎬]  ›        │
│                                          │
│         • • ● • •                        │
└──────────────────────────────────────────┘
```

## 📱 Comportamento Responsivo

### Desktop (> 1024px)
- Mostra 4-5 cards por vez
- Setas grandes e visíveis

### Tablet (768px - 1024px)
- Mostra 3-4 cards por vez
- Setas médias

### Mobile (< 768px)
- Mostra 2-3 cards por vez
- Setas menores
- Scroll touch otimizado

## ⚡ Performance

- **FlatList otimizado** - Renderiza apenas itens visíveis
- **ScrollToOffset** - Navegação eficiente
- **Memo** - Evita re-renders desnecessários
- **Key extractor** - IDs únicos para cada item

## 🔧 Manutenção

### Adicionar Nova Animação

```typescript
// Em MovieCarousel.tsx
import Animated from 'react-native-reanimated';

const scrollToNext = () => {
  // Adicione animação aqui
};
```

### Modificar Estilo das Setas

```typescript
// Em components/carousel/styles.ts
export const ArrowButton = styled.TouchableOpacity`
  // Modifique estilos aqui
  background-color: ${cores.vermelhoPrimario};
  // ...
`;
```

## 🎯 Casos de Uso

### Dashboard
```typescript
<MovieCarousel
  title="🔥 Populares"
  data={filmesPopulares}
  renderItem={renderFilme}
/>
```

### Categorias
```typescript
<MovieCarousel
  title="🎭 Ação"
  data={filmesAcao}
  renderItem={renderFilme}
/>
```

### Recomendações
```typescript
<MovieCarousel
  title="💡 Para Você"
  data={recomendacoes}
  renderItem={renderFilme}
/>
```

## 🐛 Troubleshooting

### Setas não aparecem
- Verifique se há mais de 4 itens no `data`
- Confira se `CARDS_PER_VIEW` está correto

### Cards muito pequenos
- Ajuste `CARD_WIDTH` no componente
- Verifique dimensões da tela

### Scroll travando
- Verifique `scrollEnabled={true}`
- Confira `snapToInterval`

## 📚 Referências

- [React Native FlatList](https://reactnative.dev/docs/flatlist)
- [Styled Components](https://styled-components.com/)
- [Expo Router](https://docs.expo.dev/router/introduction/)

---

**Desenvolvido com ❤️ para Cinema App**




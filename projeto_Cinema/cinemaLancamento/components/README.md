# 🎬 Componentes do Cinema App

Esta pasta contém todos os componentes reutilizáveis do aplicativo, organizados por categoria.

## 📁 Estrutura

```
components/
├── movie/          # Componentes relacionados a filmes
│   ├── MovieCard.tsx
│   └── SearchBar.tsx
├── video/          # Componentes de reprodução de vídeo
│   └── VideoPlayer.tsx
└── index.ts        # Exportações centralizadas
```

## 🎯 Componentes Disponíveis

### MovieCard
Exibe um card de filme com informações e opções de interação.

**Props:**
- `filme` - Dados do filme (TMDBFilme)
- `isSelected` - Se o filme está selecionado
- `onPress` - Callback ao clicar no card
- `onSeatsPress` - Callback para escolher poltronas (opcional)

**Uso:**
```tsx
import { MovieCard } from '../../components';

<MovieCard
  filme={filmeData}
  isSelected={selectedId === filmeData.id}
  onPress={() => handleSelect(filmeData)}
  onSeatsPress={handleSeats}
/>
```

### SearchBar
Barra de busca com contador de resultados e botão limpar.

**Props:**
- `value` - Texto da busca
- `onChangeText` - Callback de mudança de texto
- `placeholder` - Texto placeholder (opcional)
- `resultCount` - Número de resultados (opcional)

**Uso:**
```tsx
import { SearchBar } from '../../components';

<SearchBar 
  value={searchText}
  onChangeText={setSearchText}
  resultCount={filmes.length}
/>
```

### VideoPlayer
Player de vídeo com controles nativos e informações do filme.

**Props:**
- `player` - Instância do VideoPlayer (expo-video)
- `selectedMovie` - Filme selecionado para exibir informações
- `loading` - Estado de carregamento (opcional)

**Uso:**
```tsx
import { VideoPlayer } from '../../components';
import { useVideoPlayer } from 'expo-video';

const player = useVideoPlayer(videoUrl);

<VideoPlayer 
  player={player}
  selectedMovie={movie}
  loading={isLoading}
/>
```

## 🎨 Padrões de Design

### Cores
- **Primária:** `#E50914` (Vermelho Netflix)
- **Fundo:** `#141414` (Preto)
- **Cards:** `#2a2a2a` (Cinza escuro)
- **Texto:** `#fff` (Branco)
- **Texto Secundário:** `#999` (Cinza)
- **Estrelas:** `#ffd700` (Dourado)

### Espaçamento
- Padding interno: `12-15px`
- Margin entre elementos: `10-15px`
- Border radius: `8-12px`

### Tipografia
- Títulos: `18px, bold`
- Subtítulos: `14px`
- Texto normal: `13px`
- Texto pequeno: `12px`

## 📦 Importação

Todos os componentes podem ser importados do arquivo `index.ts`:

```tsx
import { MovieCard, SearchBar, VideoPlayer } from '../../components';
```

Ou individualmente:

```tsx
import MovieCard from '../../components/movie/MovieCard';
import SearchBar from '../../components/movie/SearchBar';
import VideoPlayer from '../../components/video/VideoPlayer';
```

## 🚀 Criando Novos Componentes

1. Crie o componente na pasta apropriada
2. Adicione TypeScript types/interfaces
3. Documente as props
4. Adicione ao `index.ts` para exportação
5. Atualize este README com exemplos de uso

## ✅ Boas Práticas

- ✅ Use TypeScript para type safety
- ✅ Componentes devem ser reutilizáveis
- ✅ Props devem ter tipos bem definidos
- ✅ Evite lógica de negócio complexa
- ✅ Use StyleSheet para estilos
- ✅ Prefira componentes funcionais
- ✅ Use hooks quando necessário
- ✅ Mantenha componentes pequenos e focados

## 🔄 Manutenção

Ao modificar componentes existentes:
1. Verifique se não quebra uso existente
2. Atualize a documentação
3. Teste em diferentes telas
4. Mantenha compatibilidade com props existentes


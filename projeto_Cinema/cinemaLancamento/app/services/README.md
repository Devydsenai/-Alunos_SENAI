# 🎬 Serviço de API - Cinema

API client para conectar o app React Native com o backend Node.js.

## 📡 Configuração

### URL da API
```typescript
const API_URL = 'http://localhost:3000';
```

**Importante:** 
- Para Android Emulator, use: `http://10.0.2.2:3000`
- Para iOS Simulator, use: `http://localhost:3000`
- Para dispositivo físico, use o IP da sua máquina: `http://192.168.x.x:3000`

## 🚀 Como usar

### 1. Importar o serviço
```typescript
import { api } from '../services/api';
```

### 2. Buscar filmes

#### Todos os filmes
```typescript
const filmes = await api.getFilmes();
```

#### Com filtros
```typescript
const filmes = await api.getFilmes({
  limit: 10,
  offset: 0,
  genre: 'Action',
  year: '2024',
  comingSoon: false
});
```

#### Filmes em cartaz
```typescript
const emCartaz = await api.getFilmesEmCartaz(20, 0);
```

#### Filmes em lançamento
```typescript
const lancamentos = await api.getLancamentos(20, 0);
```

#### Buscar por código
```typescript
const filme = await api.getFilmePorCodigo(1);
```

### 3. Criar filme
```typescript
const novoFilme = await api.criarFilme({
  Title: "Novo Filme",
  Year: "2024",
  Genre: "Action",
  Director: "Diretor",
  Plot: "Sinopse do filme",
  Poster: "https://...",
  imdbRating: "8.5",
  Runtime: "120 min",
  Rated: "PG-13",
  ComingSoon: false
});
```

### 4. Atualizar filme
```typescript
const filmeAtualizado = await api.atualizarFilme(1, {
  Title: "Título Atualizado",
  imdbRating: "9.0"
});
```

### 5. Deletar filme
```typescript
const resultado = await api.deletarFilme(1);
console.log(resultado.message); // "Filme removido"
```

## 🔧 Tratamento de erros

```typescript
try {
  const filmes = await api.getFilmes();
  console.log(filmes);
} catch (error) {
  console.error('Erro ao buscar filmes:', error);
  // Usar dados locais como fallback
}
```

## 📊 Interface Filme

```typescript
interface Filme {
  codigo: number;
  Title: string;
  Year: string;
  Rated: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  ComingSoon: boolean;
  // Campos opcionais
  Released?: string;
  Writer?: string;
  Actors?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Metascore?: string;
  imdbVotes?: string;
  imdbID?: string;
  Type?: string;
  Images?: string[];
  totalSeasons?: string;
}
```

## 🎯 Exemplo completo

```typescript
import { useState, useEffect } from 'react';
import { api, Filme } from '../services/api';

export default function MeuComponente() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarFilmes();
  }, []);

  const carregarFilmes = async () => {
    try {
      setLoading(true);
      const dados = await api.getFilmesEmCartaz();
      setFilmes(dados);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Text>Carregando...</Text>;

  return (
    <View>
      {filmes.map(filme => (
        <Text key={filme.codigo}>{filme.Title}</Text>
      ))}
    </View>
  );
}
```

## ✨ Funcionalidades da tela Home

A tela Home (`app/(tabs)/index.tsx`) já está configurada para:

1. ✅ **Carregar filmes da API** automaticamente
2. ✅ **Fallback para dados locais** se a API falhar
3. ✅ **Loading state** com spinner
4. ✅ **Error handling** com banner de aviso
5. ✅ **Botão recarregar** para tentar novamente
6. ✅ **Separação** entre filmes em cartaz e lançamentos

## 🔄 Iniciar o backend

```bash
cd api
node index.js
```

A API estará rodando em `http://localhost:3000`

## 📝 Endpoints disponíveis

- `GET /` - Health check
- `GET /filmes` - Listar todos
- `GET /filmes/em-cartaz` - Filmes em cartaz
- `GET /filmes/lancamentos` - Lançamentos
- `GET /filmes/:codigo` - Buscar por código
- `POST /filmes` - Criar filme
- `PUT /filmes/:codigo` - Atualizar filme
- `PATCH /filmes/:codigo` - Atualizar parcialmente
- `DELETE /filmes/:codigo` - Deletar filme


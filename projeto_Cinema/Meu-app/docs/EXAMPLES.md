# 📖 Exemplos de Uso

Este documento contém exemplos práticos de como usar os componentes e serviços do Cinema App.

## 📱 Componentes UI

### GradientBackground

Cria um fundo com gradiente colorido.

```tsx
import { GradientBackground } from '../components/ui';

// Gradiente primário (roxo → rosa)
<GradientBackground variant="primary">
  <Text>Conteúdo aqui</Text>
</GradientBackground>

// Gradiente secundário (azul)
<GradientBackground variant="secondary">
  <Text>Conteúdo aqui</Text>
</GradientBackground>

// Gradiente escuro
<GradientBackground variant="dark">
  <Text>Conteúdo aqui</Text>
</GradientBackground>

// Com estilos customizados
<GradientBackground 
  variant="primary" 
  style={{ padding: 20 }}
>
  <Text>Conteúdo com padding</Text>
</GradientBackground>
```

### Button

Botão customizável com múltiplas variantes.

```tsx
import { Button } from '../components/ui';

// Botão primário (com gradiente)
<Button
  title="Entrar"
  onPress={() => console.log('Pressed')}
  variant="primary"
  size="large"
/>

// Botão secundário (fundo cinza)
<Button
  title="Cancelar"
  onPress={() => console.log('Cancelled')}
  variant="secondary"
  size="medium"
/>

// Botão outline (apenas borda)
<Button
  title="Saiba Mais"
  onPress={() => console.log('Learn more')}
  variant="outline"
  size="medium"
/>

// Botão ghost (transparente)
<Button
  title="Voltar"
  onPress={() => console.log('Back')}
  variant="ghost"
  size="small"
/>

// Botão com loading
<Button
  title="Salvando..."
  onPress={() => {}}
  loading={true}
  disabled={true}
/>

// Botão com ícone
import { Ionicons } from '@expo/vector-icons';

<Button
  title="Adicionar"
  onPress={() => {}}
  icon={<Ionicons name="add" size={20} color="white" />}
/>
```

### Input

Campo de entrada com label e validação.

```tsx
import { Input } from '../components/ui';
import { Ionicons } from '@expo/vector-icons';

// Input simples
<Input
  label="Nome"
  placeholder="Digite seu nome"
  value={name}
  onChangeText={setName}
/>

// Input com validação de erro
<Input
  label="Email"
  placeholder="seu@email.com"
  value={email}
  onChangeText={setEmail}
  error={emailError}
/>

// Input de senha
<Input
  label="Senha"
  placeholder="••••••••"
  secureTextEntry
  value={password}
  onChangeText={setPassword}
/>

// Input com ícone
<Input
  label="Buscar"
  placeholder="Digite para buscar..."
  value={search}
  onChangeText={setSearch}
  icon={<Ionicons name="search" size={20} color="#666" />}
/>

// Input com props do TextInput
<Input
  label="Telefone"
  placeholder="(00) 00000-0000"
  keyboardType="phone-pad"
  maxLength={15}
  value={phone}
  onChangeText={setPhone}
/>
```

### Card

Container estilizado para agrupar conteúdo.

```tsx
import { Card } from '../components/ui';

// Card padrão
<Card>
  <Text>Conteúdo do card</Text>
</Card>

// Card elevado (sombra maior)
<Card variant="elevated">
  <Text>Card com sombra mais pronunciada</Text>
</Card>

// Card com outline (borda ao invés de sombra)
<Card variant="outlined">
  <Text>Card com borda</Text>
</Card>

// Card com estilos customizados
<Card style={{ margin: 20, padding: 30 }}>
  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
    Título
  </Text>
  <Text>Descrição do conteúdo</Text>
</Card>
```

### MovieCard

Card especializado para exibir filmes.

```tsx
import { MovieCard } from '../components/ui';

// Card básico de filme
<MovieCard
  title="Matrix"
  posterPath="https://image.tmdb.org/t/p/w500/path.jpg"
  rating={8.7}
  onPress={() => console.log('Movie pressed')}
/>

// Card sem classificação
<MovieCard
  title="Filme Novo"
  posterPath="https://..."
  onPress={() => navigateToDetails(123)}
/>

// Exemplo em FlatList
<FlatList
  data={movies}
  numColumns={2}
  renderItem={({ item }) => (
    <MovieCard
      title={item.title}
      posterPath={item.posterPath}
      rating={item.voteAverage}
      onPress={() => navigateToMovie(item.id)}
    />
  )}
  keyExtractor={(item) => String(item.id)}
/>
```

## 🎨 Uso do Theme

### Cores

```tsx
import { Colors } from '../constants/theme';

// Usar cores do tema
<View style={{ backgroundColor: Colors.primary.start }}>
  <Text style={{ color: Colors.light }}>Texto</Text>
</View>

// Cores de estado
<Text style={{ color: Colors.success }}>Sucesso!</Text>
<Text style={{ color: Colors.error }}>Erro!</Text>
<Text style={{ color: Colors.warning }}>Atenção!</Text>

// Cores de texto
<Text style={{ color: Colors.text.primary }}>Texto principal</Text>
<Text style={{ color: Colors.text.secondary }}>Texto secundário</Text>
<Text style={{ color: Colors.text.disabled }}>Texto desabilitado</Text>
```

### Espaçamentos

```tsx
import { Spacing } from '../constants/theme';

<View style={{
  padding: Spacing.lg,
  marginBottom: Spacing.md,
  gap: Spacing.sm,
}}>
  {/* Conteúdo */}
</View>

// Espaçamentos disponíveis:
// xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48
```

### Tipografia

```tsx
import { Typography } from '../constants/theme';

<Text style={{
  fontSize: Typography.sizes.xl,
  fontWeight: Typography.weights.bold,
}}>
  Título Grande
</Text>

<Text style={{
  fontSize: Typography.sizes.md,
  fontWeight: Typography.weights.regular,
}}>
  Texto normal
</Text>
```

### Sombras

```tsx
import { Shadows } from '../constants/theme';

<View style={[styles.card, Shadows.medium]}>
  {/* Conteúdo com sombra */}
</View>

// Sombras disponíveis: small, medium, large
```

## 🔐 Autenticação

### Cadastro (Signup)

```tsx
import { signup } from '../api/auth';

async function handleSignup() {
  try {
    const result = await signup({
      name: 'João Silva',
      email: 'joao@email.com',
      password: 'senha123',
      confirmPassword: 'senha123'
    });
    
    console.log('Cadastro realizado:', result.message);
    // Redirecionar para login
    
  } catch (error) {
    console.error('Erro no cadastro:', error.message);
    Alert.alert('Erro', error.message);
  }
}
```

### Login

```tsx
import { login } from '../api/auth';
import { router } from 'expo-router';

async function handleLogin() {
  try {
    const user = await login('joao@email.com', 'senha123');
    
    console.log('Usuário autenticado:', user);
    // { id, name, email, createdAt }
    
    Alert.alert('Bem-vindo!', `Olá, ${user.name}!`);
    router.push('/movies');
    
  } catch (error) {
    console.error('Erro no login:', error.message);
    Alert.alert('Erro', error.message);
  }
}
```

### Validação Customizada

```tsx
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return 'Email é obrigatório';
    }
    if (!regex.test(email)) {
      return 'Email inválido';
    }
    return null;
  };
  
  const handleSubmit = () => {
    const emailError = validateEmail(email);
    
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }
    
    // Prosseguir com login
  };
  
  return (
    <Input
      label="Email"
      value={email}
      onChangeText={setEmail}
      error={errors.email}
    />
  );
}
```

## 🎬 Filmes (TMDB)

### Buscar Filmes Populares

```tsx
import { fetchPopularMovies } from '../services/tmdb.service';

async function loadPopularMovies() {
  try {
    const result = await fetchPopularMovies(1);
    
    console.log('Total de filmes:', result.total_results);
    console.log('Página atual:', result.page);
    console.log('Total de páginas:', result.total_pages);
    
    result.results.forEach(movie => {
      console.log(`${movie.title} - ${movie.voteAverage}/10`);
    });
    
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
  }
}
```

### Buscar Filmes em Cartaz

```tsx
import { fetchNowPlayingMovies } from '../services/tmdb.service';

async function loadNowPlaying() {
  try {
    const result = await fetchNowPlayingMovies(1);
    setMovies(result.results);
  } catch (error) {
    console.error('Erro:', error);
  }
}
```

### Buscar Filmes por Termo

```tsx
import { searchMovies } from '../services/tmdb.service';

async function handleSearch(query: string) {
  if (!query.trim()) return;
  
  try {
    const result = await searchMovies(query, 1);
    
    if (result.total_results === 0) {
      Alert.alert('Nenhum resultado', 'Tente outra busca');
    } else {
      setMovies(result.results);
    }
    
  } catch (error) {
    Alert.alert('Erro', 'Falha ao buscar filmes');
  }
}
```

### Detalhes de um Filme

```tsx
import { fetchMovieDetails } from '../services/tmdb.service';

async function loadMovieDetails(movieId: number) {
  try {
    const movie = await fetchMovieDetails(movieId);
    
    console.log('Título:', movie.title);
    console.log('Sinopse:', movie.overview);
    console.log('Nota:', movie.voteAverage);
    console.log('Lançamento:', movie.releaseDate);
    console.log('Poster:', movie.posterPath);
    
  } catch (error) {
    console.error('Erro ao carregar detalhes:', error);
  }
}
```

### Paginação

```tsx
import { useState, useEffect } from 'react';
import { fetchPopularMovies } from '../services/tmdb.service';

function MoviesWithPagination() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  
  useEffect(() => {
    loadMovies(page);
  }, [page]);
  
  const loadMovies = async (currentPage: number) => {
    try {
      const result = await fetchPopularMovies(currentPage);
      setMovies(result.results);
      setTotalPages(result.total_pages);
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  
  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  
  return (
    <View>
      <FlatList data={movies} renderItem={...} />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Button title="Anterior" onPress={prevPage} disabled={page === 1} />
        <Text>Página {page} de {totalPages}</Text>
        <Button title="Próxima" onPress={nextPage} disabled={page === totalPages} />
      </View>
    </View>
  );
}
```

## 🔄 Estados de Loading

### Loading com ActivityIndicator

```tsx
import { ActivityIndicator } from 'react-native';
import { Colors } from '../constants/theme';

function LoadingState() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={Colors.primary.start} />
      <Text style={{ marginTop: 16 }}>Carregando...</Text>
    </View>
  );
}
```

### Pull to Refresh

```tsx
import { FlatList, RefreshControl } from 'react-native';

function MoviesWithRefresh() {
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await loadMovies();
    setRefreshing(false);
  };
  
  return (
    <FlatList
      data={movies}
      renderItem={...}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.primary.start}
        />
      }
    />
  );
}
```

## 📱 Navegação

### Navegação Básica

```tsx
import { router } from 'expo-router';

// Navegar para outra tela
router.push('/movies');

// Navegar e substituir a tela atual
router.replace('/movies');

// Voltar para tela anterior
router.back();

// Navegar com parâmetros
router.push({
  pathname: '/movie/[id]',
  params: { id: 123 }
});
```

### Link Component

```tsx
import { Link } from 'expo-router';

<Link href="/movies">
  <Text>Ver Filmes</Text>
</Link>

// Com estilo
<Link href="/movies" asChild>
  <Button title="Ver Filmes" />
</Link>
```

## 🎯 Exemplos Completos

### Tela de Login Completa

```tsx
import { useState } from 'react';
import { View, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { GradientBackground, Input, Button, Card } from '../components/ui';
import { login } from '../api/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    }
    
    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleLogin = async () => {
    if (!validate()) return;
    
    try {
      setLoading(true);
      const user = await login(email.trim(), password);
      Alert.alert('Bem-vindo!', `Olá, ${user.name}!`);
      router.replace('/movies');
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <GradientBackground variant="primary">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'center', padding: 24 }}
      >
        <Card>
          <Input
            label="Email"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Input
            label="Senha"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            secureTextEntry
          />
          
          <Button
            title={loading ? 'Entrando...' : 'Entrar'}
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            size="large"
          />
        </Card>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}
```

### Grid de Filmes Completo

```tsx
import { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { MovieCard } from '../components/ui';
import { fetchPopularMovies } from '../services/tmdb.service';

export default function MoviesScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadMovies();
  }, []);
  
  const loadMovies = async () => {
    try {
      setLoading(true);
      const result = await fetchPopularMovies(1);
      setMovies(result.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  return (
    <FlatList
      data={movies}
      numColumns={2}
      contentContainerStyle={{ padding: 12 }}
      columnWrapperStyle={{ gap: 12 }}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={{ flex: 1, marginBottom: 12 }}>
          <MovieCard
            title={item.title}
            posterPath={item.posterPath}
            rating={item.voteAverage}
            onPress={() => console.log('Movie:', item.id)}
          />
        </View>
      )}
    />
  );
}
```

## 💡 Dicas e Truques

### Debounce em Busca

```tsx
import { useEffect, useState } from 'react';

function SearchScreen() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  useEffect(() => {
    if (debouncedQuery) {
      searchMovies(debouncedQuery);
    }
  }, [debouncedQuery]);
  
  return (
    <Input
      placeholder="Buscar filmes..."
      value={query}
      onChangeText={setQuery}
    />
  );
}
```

### Lazy Loading de Imagens

```tsx
import { Image } from 'react-native';
import { useState } from 'react';

function MoviePoster({ uri }) {
  const [loading, setLoading] = useState(true);
  
  return (
    <View>
      {loading && <ActivityIndicator />}
      <Image
        source={{ uri }}
        style={{ width: '100%', aspectRatio: 2/3 }}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
}
```

---

Para mais exemplos, consulte o código-fonte das telas em `app/` e componentes em `components/ui/`.


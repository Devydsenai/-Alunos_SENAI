/**
 * Movies Screen
 * 
 * Tela de listagem de filmes com grid moderno e cards profissionais.
 * Implementa carregamento de dados e tratamento de erros.
 */

import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import type { Movie } from '../api/src';
import { Input, MovieCard } from '../components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '../constants/theme';
import { fetchPopularMovies, searchMovies } from '../services/tmdb.service';

export default function MoviesScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  /**
   * Carrega os filmes populares
   */
  const loadMovies = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const res = await fetchPopularMovies();
      setData(res.results ?? []);
    } catch (e: any) {
      setError(e.message ?? 'Erro ao carregar filmes');
      console.error('Error loading movies:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /**
   * Busca filmes por query
   */
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      // Se query vazia, volta para filmes populares
      loadMovies();
      return;
    }

    try {
      setSearching(true);
      setError(null);
      
      const res = await searchMovies(query.trim());
      setData(res.results ?? []);
    } catch (e: any) {
      setError(e.message ?? 'Erro ao buscar filmes');
      console.error('Error searching movies:', e);
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  /**
   * Renderiza o cabeçalho da lista
   */
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Input
          placeholder="🔍 Buscar filmes..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            // Debounce da busca - busca após 500ms de inatividade
            clearTimeout(searchTimeout ?? 0);
            const timeoutId = setTimeout(() => {
              handleSearch(text);
            }, 500);
            setSearchTimeout(timeoutId);
          }}
          style={[styles.searchInput, { flex: 1 }]}
          autoCapitalize="none"
          returnKeyType="search"
          onSubmitEditing={() => handleSearch(searchQuery)}
        />
        <TouchableOpacity
          style={styles.sessionsButton}
          onPress={() => router.push('/sessions')}
        >
          <Text style={styles.sessionsButtonText}>Sessões</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.headerSubtitle}>
        {searchQuery ? `Resultados para "${searchQuery}"` : 'Descubra os filmes mais assistidos do momento'}
      </Text>
    </View>
  );

  // Estado para debounce da busca
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Renderiza estado de carregamento
   */
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.primary.start} />
          <Text style={styles.loadingText}>Carregando filmes...</Text>
          <Text style={styles.loadingSubtext}>Buscando os melhores títulos para você</Text>
        </View>
      </SafeAreaView>
    );
  }

  /**
   * Renderiza estado de erro
   */
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorEmoji}>😕</Text>
          <Text style={styles.errorTitle}>Oops! Algo deu errado</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => loadMovies()}
          >
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /**
   * Renderiza lista vazia
   */
  if (data.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.emptyEmoji}>🎭</Text>
          <Text style={styles.emptyTitle}>Nenhum filme encontrado</Text>
          <Text style={styles.emptyMessage}>
            Não conseguimos encontrar filmes no momento.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  /**
   * Renderiza a lista de filmes
   */
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadMovies(true)}
            tintColor={Colors.primary.start}
            colors={[Colors.primary.start, Colors.primary.middle]}
          />
        }
        renderItem={({ item }) => (
          <View style={styles.movieCardWrapper}>
            <MovieCard
              title={item.title}
              posterPath={item.posterPath}
              rating={item.voteAverage}
              onPress={() => {
                router.push(`/movie/${item.id}` as any);
              }}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.lightSecondary,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  header: {
    padding: Spacing.md,
    backgroundColor: Colors.light,
    gap: Spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  searchInput: {
    marginBottom: 0,
  },
  sessionsButton: {
    backgroundColor: Colors.primary.start,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  sessionsButtonText: {
    color: Colors.light,
    fontWeight: Typography.weights.bold,
    fontSize: Typography.sizes.sm,
  },
  headerSubtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  listContent: {
    padding: Spacing.md,
    paddingTop: Spacing.lg,
  },
  columnWrapper: {
    gap: Spacing.md,
  },
  movieCardWrapper: {
    flex: 1,
  },
  loadingText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
    marginTop: Spacing.md,
  },
  loadingSubtext: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  errorEmoji: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  errorTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: Typography.sizes.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  retryButton: {
    backgroundColor: Colors.primary.start,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  retryButtonText: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    color: Colors.light,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: Typography.sizes.md,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});

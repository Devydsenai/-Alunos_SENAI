import { useRouter } from 'expo-router';
import { useVideoPlayer } from 'expo-video';
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { MovieCard, SearchBar, VideoPlayer } from '../../components';
import { tmdb, TMDBFilme } from '../services/tmdb';

// Interface estendida para adicionar disponibilidade
interface FilmeComSessao extends TMDBFilme {
  sessaoDisponivel: boolean;
  vagasDisponiveis: number;
  generoNomes?: string; // Para armazenar os nomes dos gêneros
}

export default function Index() {
  const [todosFilmes, setTodosFilmes] = useState<FilmeComSessao[]>([]);
  const [filmesFiltrados, setFilmesFiltrados] = useState<FilmeComSessao[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<FilmeComSessao | null>(null);
  const [trailerUrl, setTrailerUrl] = useState<string>('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const router = useRouter();

  // Player de vídeo
  const player = useVideoPlayer(trailerUrl, player => {
    player.loop = true;
    player.muted = false;
    player.volume = 0.7;
  });

  useEffect(() => {
    carregarFilmes();
  }, []);

  useEffect(() => {
    // Filtrar filmes quando o texto de busca mudar
    if (searchText.trim() === '') {
      setFilmesFiltrados(todosFilmes);
    } else {
      const filtrados = todosFilmes.filter(filme => 
        filme.title.toLowerCase().includes(searchText.toLowerCase()) ||
        filme.original_title.toLowerCase().includes(searchText.toLowerCase()) ||
        filme.overview.toLowerCase().includes(searchText.toLowerCase()) ||
        (filme.generoNomes && filme.generoNomes.toLowerCase().includes(searchText.toLowerCase()))
      );
      setFilmesFiltrados(filtrados);
    }
  }, [searchText, todosFilmes]);

  // Atualizar o player quando a URL do trailer mudar
  useEffect(() => {
    if (trailerUrl) {
      player.replace(trailerUrl);
    }
  }, [trailerUrl]);

  // Carregar trailer do primeiro filme ao iniciar
  useEffect(() => {
    if (todosFilmes.length > 0 && !selectedMovie) {
      carregarTrailer(todosFilmes[0]);
    }
  }, [todosFilmes]);

  const carregarTrailer = async (filme: FilmeComSessao) => {
    try {
      setLoadingTrailer(true);
      setSelectedMovie(filme);
      
      const trailerKey = await tmdb.getTrailerURL(filme.id);
      
      if (trailerKey) {
        // Converter URL do YouTube para formato de vídeo direto
        // Usar um serviço ou fallback para vídeo padrão
        setTrailerUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
      }
    } catch (err) {
      console.error('Erro ao carregar trailer:', err);
    } finally {
      setLoadingTrailer(false);
    }
  };

  const carregarFilmes = async () => {
    try {
      setLoading(true);
      setError(null);

      // Mapeamento de IDs de gêneros para nomes em português
      const generos: Record<number, string> = {
        28: 'Ação',
        12: 'Aventura',
        16: 'Animação',
        35: 'Comédia',
        80: 'Crime',
        99: 'Documentário',
        18: 'Drama',
        10751: 'Família',
        14: 'Fantasia',
        36: 'História',
        27: 'Terror',
        10402: 'Música',
        9648: 'Mistério',
        10749: 'Romance',
        878: 'Ficção Científica',
        10770: 'Cinema TV',
        53: 'Suspense',
        10752: 'Guerra',
        37: 'Faroeste',
      };

      // Carregar filmes do TMDB - combinando populares e em cartaz
      const [popularResponse, nowPlayingResponse] = await Promise.all([
        tmdb.getPopularMovies(1),
        tmdb.getNowPlayingMovies(1),
      ]);
      
      // Combinar e remover duplicatas
      const filmesUnicos = new Map<number, TMDBFilme>();
      
      [...popularResponse.results, ...nowPlayingResponse.results].forEach(filme => {
        if (!filmesUnicos.has(filme.id)) {
          filmesUnicos.set(filme.id, filme);
        }
      });
      
      // Adicionar informações de sessão aos filmes
      const filmesComSessao: FilmeComSessao[] = Array.from(filmesUnicos.values()).map(filme => {
        const sessaoDisponivel = Math.random() > 0.2; // 80% de chance de estar disponível
        const vagasDisponiveis = sessaoDisponivel 
          ? Math.floor(Math.random() * 80) + 20 // Entre 20 e 100 vagas
          : 0;
        
        // Mapear os IDs de gêneros para nomes
        const generoNomes = filme.genre_ids
          .map(id => generos[id] || 'Outro')
          .join(', ');
        
        return {
          ...filme,
          sessaoDisponivel,
          vagasDisponiveis,
          generoNomes,
        };
      });
      
      setTodosFilmes(filmesComSessao);
      setFilmesFiltrados(filmesComSessao);
    } catch (err) {
      console.error('Erro ao carregar filmes do TMDB:', err);
      setError('Não foi possível conectar ao TMDB. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  const handleSeatsPress = (filmeId: number, filmeTitulo: string, vagasDisponiveis: number) => {
    router.push({
      pathname: '/(tabs)/seats',
      params: { 
        filmeId,
        filmeTitulo,
        vagasDisponiveis
      }
    } as any);
  };



  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Carregando filmes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔍 Pesquisar Filmes</Text>
        
        {/* Barra de pesquisa */}
        <SearchBar 
          value={searchText}
          onChangeText={setSearchText}
          resultCount={filmesFiltrados.length}
        />

        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}
      </View>

      {/* Layout em duas colunas */}
      <View style={styles.mainContainer}>
        {/* Coluna dos Cards */}
        <ScrollView 
          style={styles.cardsContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.resultsGrid}>
            {filmesFiltrados.length > 0 ? (
              filmesFiltrados.map((item) => (
                <MovieCard
                  key={item.id}
                  filme={item}
                  isSelected={selectedMovie?.id === item.id}
                  onPress={() => carregarTrailer(item)}
                  onSeatsPress={handleSeatsPress}
                />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>🎬</Text>
                <Text style={styles.emptyTitle}>Nenhum filme encontrado</Text>
                <Text style={styles.emptySubtitle}>
                  Tente buscar por outro termo
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        
        {/* Coluna do Player de Vídeo */}
        <View style={styles.videoSection}>
          <VideoPlayer 
            player={player}
            selectedMovie={selectedMovie}
            loading={loadingTrailer}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#1a1a1a",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E50914",
    marginBottom: 15,
  },
  errorBanner: {
    backgroundColor: "rgba(255, 152, 0, 0.2)",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ff9800",
  },
  errorText: {
    color: "#ff9800",
    fontSize: 12,
    textAlign: "center",
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  cardsContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#141414',
  },
  videoSection: {
    width: 350,
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderLeftWidth: 1,
    borderLeftColor: '#333',
  },
  resultsGrid: {
    flexDirection: 'column',
    gap: 15,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 60,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#999",
  },
});




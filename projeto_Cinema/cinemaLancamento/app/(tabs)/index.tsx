import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { WebView } from 'react-native-webview';
import { api, Filme } from '../services/api';

const { width: screenWidth } = Dimensions.get('window');

// Interface estendida para adicionar disponibilidade
interface FilmeComSessao extends Filme {
  sessaoDisponivel: boolean;
  vagasDisponiveis: number;
}

export default function Index() {
  const [todosFilmes, setTodosFilmes] = useState<FilmeComSessao[]>([]);
  const [filmesFiltrados, setFilmesFiltrados] = useState<FilmeComSessao[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<FilmeComSessao | null>(null);
  const router = useRouter();

  useEffect(() => {
    carregarFilmes();
  }, []);

  useEffect(() => {
    // Filtrar filmes quando o texto de busca mudar
    if (searchText.trim() === '') {
      setFilmesFiltrados(todosFilmes);
    } else {
      const filtrados = todosFilmes.filter(filme => 
        filme.Title.toLowerCase().includes(searchText.toLowerCase()) ||
        filme.Genre.toLowerCase().includes(searchText.toLowerCase()) ||
        filme.Director.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilmesFiltrados(filtrados);
    }
  }, [searchText, todosFilmes]);

  const carregarFilmes = async () => {
    try {
      setLoading(true);
      setError(null);

      // Carregar todos os filmes da API
      const filmes = await api.getFilmes({ limit: 100 });
      
      // Adicionar informações de sessão aos filmes
      const filmesComSessao: FilmeComSessao[] = filmes.map(filme => {
        const sessaoDisponivel = Math.random() > 0.2; // 80% de chance de estar disponível
        const vagasDisponiveis = sessaoDisponivel 
          ? Math.floor(Math.random() * 80) + 20 // Entre 20 e 100 vagas
          : 0;
        
        return {
          ...filme,
          sessaoDisponivel,
          vagasDisponiveis
        };
      });
      
      setTodosFilmes(filmesComSessao);
      setFilmesFiltrados(filmesComSessao);
    } catch (err) {
      console.error('Erro ao carregar filmes da API:', err);
      setError('Não foi possível conectar à API.');
    } finally {
      setLoading(false);
    }
  };

  const renderFilmeItem = ({ item }: { item: FilmeComSessao }) => {
    return (
      <View style={styles.filmeContainer}>
        <View style={styles.filmeItem}>
          <Image 
            source={{ uri: item.Poster }} 
            style={styles.filmePoster}
            resizeMode="cover"
            defaultSource={require('../../assets/images/icon.png')}
            onError={() => {
              console.log('Erro ao carregar imagem:', item.Title);
            }}
          />
          <View style={styles.filmeInfo}>
            <Text style={styles.filmeTitle} numberOfLines={2}>{item.Title}</Text>
            <Text style={styles.filmeYear}>{item.Year} • {item.Runtime}</Text>
            <Text style={styles.filmeGenre}>{item.Genre}</Text>
            <View style={styles.filmeFooter}>
              <Text style={styles.filmeRating}>⭐ {item.imdbRating}</Text>
              {item.ComingSoon && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>EM BREVE</Text>
                </View>
              )}
            </View>
            
            {/* Botão Escolher Poltronas no lugar da avaliação */}
            {!item.ComingSoon && (
              <TouchableOpacity 
                style={[
                  styles.seatsButtonCompact,
                  !item.sessaoDisponivel && styles.seatsButtonDisabled
                ]}
                onPress={() => {
                  if (item.sessaoDisponivel) {
                    router.push({
                      pathname: '/(tabs)/seats',
                      params: { 
                        filmeId: item.codigo,
                        filmeTitulo: item.Title,
                        vagasDisponiveis: item.vagasDisponiveis
                      }
                    } as any);
                  }
                }}
                disabled={!item.sessaoDisponivel}
              >
                <Text style={styles.seatsButtonText}>
                  {item.sessaoDisponivel ? '🎟️ Escolher Poltronas' : '🚫 Indisponível'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderYouTubePlayer = () => {
    // Sempre mostrar o trailer do Avatar
    const avatarVideoId = '5PSNL1qE6VY'; // Trailer oficial do Avatar
    const embedUrl = `https://www.youtube.com/embed/${avatarVideoId}?autoplay=0&rel=0&modestbranding=1&showinfo=0&controls=1&fs=1`;

    return (
      <View style={styles.videoContainer}>
        <Text style={styles.videoTitle}>Avatar</Text>
        <Text style={styles.videoSubtitle}>Trailer Oficial</Text>
        
        {/* WebView com o trailer do Avatar */}
        <View style={styles.youtubeContainer}>
          <WebView
            source={{ uri: embedUrl }}
            style={styles.webview}
            allowsFullscreenVideo={true}
            mediaPlaybackRequiresUserAction={false}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#E50914" />
                <Text style={styles.videoLoadingText}>Carregando trailer...</Text>
              </View>
            )}
          />
        </View>
        
        <View style={styles.videoInfo}>
          <Text style={styles.videoYear}>2009 • 162 min</Text>
          <Text style={styles.videoGenre}>Action, Adventure, Fantasy</Text>
          <Text style={styles.videoRating}>⭐ 7.9</Text>
        </View>
      </View>
    );
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
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por título, gênero ou diretor..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchText('')}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Informações da busca */}
        <Text style={styles.resultCount}>
          {filmesFiltrados.length} {filmesFiltrados.length === 1 ? 'filme encontrado' : 'filmes encontrados'}
        </Text>

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
              filmesFiltrados.map((item) => renderFilmeItem({ item }))
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
        
        {/* Coluna do Vídeo */}
        <View style={styles.videoSection}>
          {renderYouTubePlayer()}
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
    color: "#E5091",
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: "#fff",
    fontSize: 16,
  },
  clearButton: {
    padding: 10,
  },
  clearButtonText: {
    color: "#999",
    fontSize: 20,
    fontWeight: "bold",
  },
  resultCount: {
    fontSize: 14,
    color: "#999",
    marginTop: 5,
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
    alignItems: 'flex-start',
  },
  cardsContainer: {
    flex: 1,
    padding: 12,
    backgroundColor: '#141414',
  },
  videoSection: {
    width: 180, // Mesmo tamanho dos cards
    padding: 12,
    backgroundColor: '#1a1a1a',
    borderLeftWidth: 1,
    borderLeftColor: '#333',
    marginLeft: 10,
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  filmeContainer: {
    width: 160, // Largura reduzida para caber na coluna
    marginRight: 10,
    marginBottom: 15,
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
    elevation: 8,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#E50914",
  },
  filmeItem: {
    flexDirection: "column", // Mudança para layout vertical
    backgroundColor: "#2a2a2a",
  },
  filmePoster: {
    width: "100%",
    height: 240,
  },
  filmeInfo: {
    padding: 12,
    justifyContent: "space-between",
    minHeight: 70,
  },
  filmeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  filmeYear: {
    fontSize: 14,
    color: "#E50914",
    marginBottom: 4,
  },
  filmeGenre: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  filmeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filmeRating: {
    fontSize: 14,
    color: "#ffd700",
    fontWeight: "bold",
  },
  badge: {
    backgroundColor: "#E50914",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
  },
  badgeText: {
    fontSize: 6,
    color: "#fff",
    fontWeight: "bold",
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
  seatsContainer: {
    padding: 15,
    backgroundColor: "#1f1f1f",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  seatsInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  seatsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusAvailable: {
    backgroundColor: "rgba(0, 255, 0, 0.2)",
    borderWidth: 1,
    borderColor: "#00ff00",
  },
  statusFull: {
    backgroundColor: "rgba(229, 9, 20, 0.2)",
    borderWidth: 1,
    borderColor: "#E50914",
  },
  statusText: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#fff",
  },
  seatsButtonCompact: {
    backgroundColor: "#E50914",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 6,
    width: "100%",
  },
  seatsButton: {
    backgroundColor: "#E50914",
    padding: 4,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 2,
  },
  seatsButtonDisabled: {
    backgroundColor: "#555",
  },
  seatsButtonText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  placeholderText: {
    fontSize: 48,
    marginBottom: 16,
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  placeholderSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  placeholderHint: {
    fontSize: 12,
    color: '#E50914',
    marginTop: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  videoContainer: {
    width: '100%',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  videoSubtitle: {
    fontSize: 12,
    color: '#E50914',
    marginBottom: 12,
  },
  youtubeContainer: {
    width: '100%',
    height: 240, // Mesma altura dos posters dos cards
    backgroundColor: '#000',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  videoLoadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
  },
  videoInfo: {
    padding: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
  },
  videoYear: {
    fontSize: 14,
    color: '#E50914',
    marginBottom: 4,
  },
  videoGenre: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  videoRating: {
    fontSize: 14,
    color: '#ffd700',
    fontWeight: 'bold',
  },
});




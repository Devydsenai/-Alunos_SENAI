import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { api, Filme } from '../services/api';
import { ColorProperties } from 'react-native-reanimated/lib/typescript/Colors';

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
            defaultSource={require('../../assets/images/icon.png')}
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

      {/* Lista de filmes */}
      <FlatList
        data={filmesFiltrados}
        renderItem={renderFilmeItem}
        keyExtractor={(item) => item.codigo.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>🎬</Text>
            <Text style={styles.emptyTitle}>Nenhum filme encontrado</Text>
            <Text style={styles.emptySubtitle}>
              Tente buscar por outro termo
            </Text>
          </View>
        }
      />
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
  listContainer: {
    padding: 12,
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  filmeContainer: {
    backgroundColor: "#2a2a2a",
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    width: '45%', // Largura ideal para o tamanho da imagem
  },
  filmeItem: {
    flexDirection: "column", // Mudança para layout vertical
    backgroundColor: "#1a1a1a",
  },
  filmePoster: {
    width: '25%', // Largura total do container
    height: 150, // Altura maior para dar destaque ao poster como na imagem
    resizeMode: "cover",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  filmeInfo: {
    padding: 8,
    justifyContent: "space-between",
    minHeight: 70,
  },
  filmeTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 2,
    lineHeight: 16,
  },
  filmeYear: {
    fontSize: 11,
    color: "#999",
    marginBottom: 2,
  },
  filmeGenre: {
    fontSize: 10,
    color: "#E50914",
    marginBottom: 4,
  },
  filmeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  filmeRating: {
    fontSize: 11,
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
    height: 50,
    width: 180,
    backgroundColor: "#E50914",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 6,
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
});




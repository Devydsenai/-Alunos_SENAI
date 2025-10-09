import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api, Filme } from '../services/api';

export default function AboutScreen() {
  const [filmesEmCartaz, setFilmesEmCartaz] = useState<Filme[]>([]);
  const [lancamentos, setLancamentos] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarFilmes();
  }, []);

  const carregarFilmes = async () => {
    try {
      setLoading(true);
      setError(null);

      // Carregar filmes da API
      const [emCartazAPI, lancamentosAPI] = await Promise.all([
        api.getFilmesEmCartaz(100, 0),
        api.getLancamentos(100, 0),
      ]);

      setFilmesEmCartaz(emCartazAPI);
      setLancamentos(lancamentosAPI);
    } catch (err) {
      console.error('Erro ao carregar filmes da API:', err);
      setError('Não foi possível conectar à API. Verifique se o servidor está rodando em http://localhost:3000');
    } finally {
      setLoading(false);
    }
  };

  const renderFilmeCard = (filme: Filme) => (
    <TouchableOpacity key={filme.codigo} style={styles.card}>
      <Image 
        source={{ uri: filme.Poster }} 
        style={styles.poster}
        defaultSource={require('../../assets/images/icon.png')}
        onError={() => console.log('Erro ao carregar imagem:', filme.Title)}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{filme.Title}</Text>
        <Text style={styles.cardYear}>{filme.Year}</Text>
        <Text style={styles.cardGenre}>{filme.Genre}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {filme.imdbRating}</Text>
          {filme.ComingSoon && (
            <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>EM BREVE</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  // Loading state
  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Carregando filmes...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎬 Cinema</Text>
        <Text style={styles.headerSubtitle}>Filmes em Cartaz</Text>
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}
      </View>

      {/* Filmes em Cartaz */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📽️ Em Cartaz</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {filmesEmCartaz.map(renderFilmeCard)}
        </ScrollView>
      </View>

      {/* Lançamentos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚀 Lançamentos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {lancamentos.map(renderFilmeCard)}
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Total de filmes: {filmesEmCartaz.length + lancamentos.length}
        </Text>
        <TouchableOpacity style={styles.refreshButton} onPress={carregarFilmes}>
          <Text style={styles.refreshButtonText}>🔄 Recarregar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#1a1a1a",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E50914",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#fff",
    opacity: 0.8,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 20,
    marginBottom: 15,
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  card: {
    width: 180,
    marginRight: 15,
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  poster: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  cardYear: {
    fontSize: 14,
    color: "#E50914",
    marginBottom: 4,
  },
  cardGenre: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: "#ffd700",
    fontWeight: "bold",
  },
  comingSoonBadge: {
    backgroundColor: "#E50914",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  comingSoonText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  refreshButton: {
    backgroundColor: "#E50914",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  refreshButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
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
});

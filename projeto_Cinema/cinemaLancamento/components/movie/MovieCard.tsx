import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { tmdb, TMDBFilme } from '../../app/services/tmdb';

interface MovieCardProps {
  filme: TMDBFilme & {
    sessaoDisponivel: boolean;
    vagasDisponiveis: number;
    generoNomes?: string;
  };
  isSelected: boolean;
  onPress: () => void;
  onSeatsPress?: (filmeId: number, titulo: string, vagas: number) => void;
}

export default function MovieCard({ filme, isSelected, onPress, onSeatsPress }: MovieCardProps) {
  // Extrair o ano da data de lançamento
  const anoLancamento = filme.release_date ? filme.release_date.split('-')[0] : 'N/A';
  
  // Verificar se é um lançamento futuro
  const dataLancamento = filme.release_date ? new Date(filme.release_date) : null;
  const hoje = new Date();
  const emBreve = dataLancamento ? dataLancamento > hoje : false;

  return (
    <TouchableOpacity 
      style={[styles.container, isSelected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Image 
          source={{ uri: tmdb.getImageURL(filme.poster_path) }} 
          style={styles.poster}
          resizeMode="cover"
        />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>{filme.title}</Text>
          <Text style={styles.year}>{anoLancamento} • {filme.original_language.toUpperCase()}</Text>
          <Text style={styles.genre} numberOfLines={1}>{filme.generoNomes || 'Sem gênero'}</Text>
          
          <View style={styles.footer}>
            <Text style={styles.rating}>⭐ {filme.vote_average.toFixed(1)}</Text>
            {emBreve && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>EM BREVE</Text>
              </View>
            )}
          </View>
          
          {/* Botão Escolher Poltronas */}
          {!emBreve && onSeatsPress && (
            <TouchableOpacity 
              style={[
                styles.seatsButton,
                !filme.sessaoDisponivel && styles.seatsButtonDisabled
              ]}
              onPress={() => {
                if (filme.sessaoDisponivel) {
                  onSeatsPress(filme.id, filme.title, filme.vagasDisponiveis);
                }
              }}
              disabled={!filme.sessaoDisponivel}
            >
              <Text style={styles.seatsButtonText}>
                {filme.sessaoDisponivel ? '🎟️ Escolher Poltronas' : '🚫 Indisponível'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 8,
  },
  selected: {
    borderWidth: 2,
    borderColor: "#E50914",
  },
  content: {
    flexDirection: "row",
    backgroundColor: "#2a2a2a",
  },
  poster: {
    width: 120,
    height: 180,
  },
  info: {
    flex: 1,
    padding: 15,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },
  year: {
    fontSize: 14,
    color: "#E50914",
    marginBottom: 6,
  },
  genre: {
    fontSize: 13,
    color: "#999",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
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
  seatsButton: {
    backgroundColor: "#E50914",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  seatsButtonDisabled: {
    backgroundColor: "#555",
  },
  seatsButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});


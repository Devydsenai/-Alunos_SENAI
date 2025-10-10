import type { VideoPlayer } from 'expo-video';
import { VideoView } from 'expo-video';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface VideoPlayerProps {
  player: VideoPlayer;
  selectedMovie: {
    title: string;
    release_date?: string;
    original_language: string;
    generoNomes?: string;
    vote_average: number;
  } | null;
  loading?: boolean;
}

export default function VideoPlayerComponent({ player, selectedMovie, loading }: VideoPlayerProps) {
  if (!selectedMovie) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderIcon}>🎬</Text>
        <Text style={styles.placeholderTitle}>Selecione um filme</Text>
        <Text style={styles.placeholderSubtitle}>para assistir ao trailer</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={1}>{selectedMovie.title}</Text>
      <Text style={styles.subtitle}>Trailer</Text>
      
      <View style={styles.playerContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#E50914" />
            <Text style={styles.loadingText}>Carregando trailer...</Text>
          </View>
        ) : (
          <VideoView
            player={player}
            style={styles.video}
            nativeControls={true}
            allowsFullscreen={true}
            contentFit="contain"
          />
        )}
      </View>
      
      <View style={styles.info}>
        <Text style={styles.year}>
          {selectedMovie.release_date ? selectedMovie.release_date.split('-')[0] : 'N/A'} • {selectedMovie.original_language.toUpperCase()}
        </Text>
        <Text style={styles.genre} numberOfLines={2}>{selectedMovie.generoNomes || 'Sem gênero'}</Text>
        <Text style={styles.rating}>⭐ {selectedMovie.vote_average.toFixed(1)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
  },
  placeholderIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  placeholderSubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#E50914',
    marginBottom: 15,
  },
  playerContainer: {
    width: '100%',
    height: 280,
    backgroundColor: '#000',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
  },
  info: {
    padding: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
  },
  year: {
    fontSize: 14,
    color: '#E50914',
    marginBottom: 6,
  },
  genre: {
    fontSize: 13,
    color: '#999',
    marginBottom: 6,
  },
  rating: {
    fontSize: 16,
    color: '#ffd700',
    fontWeight: 'bold',
  },
});


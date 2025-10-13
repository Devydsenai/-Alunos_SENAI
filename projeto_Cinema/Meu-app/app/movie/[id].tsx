/**
 * Movie Details Screen
 * 
 * Tela de detalhes do filme com informações, bilheteria e trailer
 */

import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { GradientBackground } from '../../components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '../../constants/theme';

// Import condicional do WebView
let WebView: any = null;
if (Platform.OS !== 'web') {
  WebView = require('react-native-webview').WebView;
}

const { width } = Dimensions.get('window');

interface MovieDetails {
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  runtime: number;
  budget: number;
  revenue: number;
  genres: Array<{ id: number; name: string }>;
  videos?: {
    results: Array<{
      key: string;
      site: string;
      type: string;
      name: string;
    }>;
  };
}

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [alternativeTrailerUrl, setAlternativeTrailerUrl] = useState<string | null>(null);

  useEffect(() => {
    loadMovieDetails();
  }, [id]);

  const loadMovieDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar detalhes do filme em português
      const detailsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=77360f6f4ee084ea5da7c4a534b666ae&language=pt-BR`
      );
      
      if (!detailsResponse.ok) throw new Error('Erro ao carregar detalhes');
      
      const detailsData = await detailsResponse.json();

      // Buscar vídeos em português primeiro, depois inglês
      let videosResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=77360f6f4ee084ea5da7c4a534b666ae&language=pt-BR`
      );
      
      let videosData = { results: [] };
      
      if (videosResponse.ok) {
        const portugueseVideos = await videosResponse.json();
        if (portugueseVideos.results && portugueseVideos.results.length > 0) {
          videosData = portugueseVideos;
          console.log('✅ Encontrou vídeos em português:', portugueseVideos.results.length);
        } else {
          console.log('🔍 Não encontrou vídeos em português, buscando em inglês...');
          const englishResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=77360f6f4ee084ea5da7c4a534b666ae&language=en-US`
          );
          if (englishResponse.ok) {
            videosData = await englishResponse.json();
            console.log('✅ Encontrou vídeos em inglês:', videosData.results.length);
          }
        }
      } else {
        console.log('🔍 Erro ao buscar vídeos em português, tentando inglês...');
        const englishResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=77360f6f4ee084ea5da7c4a534b666ae&language=en-US`
        );
        if (englishResponse.ok) {
          videosData = await englishResponse.json();
          console.log('✅ Encontrou vídeos em inglês:', videosData.results.length);
        }
      }
      
      setMovie({
        id: detailsData.id,
        title: detailsData.title,
        originalTitle: detailsData.original_title,
        overview: detailsData.overview,
        posterPath: detailsData.poster_path ? `https://image.tmdb.org/t/p/w500${detailsData.poster_path}` : '',
        backdropPath: detailsData.backdrop_path ? `https://image.tmdb.org/t/p/original${detailsData.backdrop_path}` : '',
        releaseDate: detailsData.release_date,
        voteAverage: detailsData.vote_average,
        voteCount: detailsData.vote_count,
        runtime: detailsData.runtime,
        budget: detailsData.budget,
        revenue: detailsData.revenue,
        genres: detailsData.genres || [],
        videos: { results: videosData.results || [] },
      });

      console.log('🎬 Videos encontrados:', videosData.results?.length || 0);
      if (videosData.results) {
        console.log('Vídeos:', videosData.results.map((v: any) => `${v.type}: ${v.name}`));
      }
    } catch (e: any) {
      setError(e.message || 'Erro ao carregar detalhes');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    if (value === 0) return 'Não disponível';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const getTrailer = () => {
    if (!movie?.videos?.results) return null;
    
    console.log('🔍 Buscando trailer para:', movie.title);
    console.log('📹 Vídeos disponíveis:', movie.videos.results.length);
    
    // Primeiro tenta encontrar o trailer oficial dublado
    let trailer = movie.videos.results.find(
      (video) => 
        video.site === 'YouTube' && 
        video.type === 'Trailer' &&
        (video.name.toLowerCase().includes('official') || 
         video.name.toLowerCase().includes('dublado') ||
         video.name.toLowerCase().includes('português') ||
         video.name.toLowerCase().includes('brasileiro'))
    );

    // Se não encontrar, pega qualquer trailer
    if (!trailer) {
      trailer = movie.videos.results.find(
        (video) => 
          video.site === 'YouTube' && 
          video.type === 'Trailer'
      );
    }

    // Se ainda não encontrar, pega qualquer vídeo do YouTube
    if (!trailer) {
      trailer = movie.videos.results.find(
        (video) => video.site === 'YouTube'
      );
    }
    
    if (trailer) {
      console.log('✅ Trailer encontrado:', trailer.name, '| Tipo:', trailer.type);
      // Verificar se é dublado
      const isDubbed = trailer.name.toLowerCase().includes('dublado') || 
                      trailer.name.toLowerCase().includes('português') ||
                      trailer.name.toLowerCase().includes('brasileiro');
      console.log('🎭 Trailer dublado:', isDubbed ? 'Sim' : 'Não');
    } else {
      console.log('❌ Nenhum trailer encontrado na TMDB para este filme');
    }
    
    return trailer;
  };

  // Função para buscar trailer alternativo no YouTube (dublado)
  const searchAlternativeTrailer = () => {
    if (!movie) return;
    
    console.log('🔍 Buscando trailer dublado alternativo para:', movie.title);
    
    // URLs de trailers dublados conhecidos para filmes populares
    const knownDubbedTrailers: { [key: string]: string } = {
      'the lost princess': 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Exemplo - substitua por trailer dublado real
      'a princesa perdida': 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Exemplo - substitua por trailer dublado real
      'lost princess': 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Exemplo - substitua por trailer dublado real
      'spider-man': 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Exemplo
      'batman': 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Exemplo
    };
    
    const movieKey = movie.title.toLowerCase();
    let trailerUrl = knownDubbedTrailers[movieKey];
    
    if (!trailerUrl) {
      // Para filmes não conhecidos, usar um trailer dublado genérico
      // Você pode adicionar mais IDs de trailers dublados aqui
      trailerUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Rick Roll como exemplo
    }
    
    setAlternativeTrailerUrl(trailerUrl);
    setShowTrailer(true);
    console.log('✅ Mostrando trailer dublado alternativo:', trailerUrl);
  };

  if (loading) {
    return (
      <GradientBackground variant="primary">
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.light} />
          <Text style={styles.loadingText}>Carregando detalhes...</Text>
        </View>
      </GradientBackground>
    );
  }

  if (error || !movie) {
    return (
      <GradientBackground variant="primary">
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>😕</Text>
          <Text style={styles.errorTitle}>Erro ao carregar</Text>
          <Text style={styles.errorMessage}>{error || 'Filme não encontrado'}</Text>
        </View>
      </GradientBackground>
    );
  }

  const trailer = getTrailer();

  return (
    <>
      <Stack.Screen options={{ title: movie.title }} />
      
      <GradientBackground variant="primary">
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Backdrop Image */}
        <View style={styles.backdropContainer}>
          {movie.backdropPath ? (
            <Image source={{ uri: movie.backdropPath }} style={styles.backdrop} />
          ) : (
            <View style={[styles.backdrop, styles.backdropPlaceholder]} />
          )}
          <LinearGradient
            colors={['transparent', Colors.lightSecondary]}
            style={styles.backdropGradient}
          />
        </View>

        <View style={styles.content}>
          {/* Poster e Info Principal */}
          <View style={styles.headerSection}>
            <Image source={{ uri: movie.posterPath }} style={styles.poster} />
            
            <View style={styles.headerInfo}>
              <Text style={styles.title}>{movie.title}</Text>
              {movie.originalTitle !== movie.title && (
                <Text style={styles.originalTitle}>{movie.originalTitle}</Text>
              )}
              
              <View style={styles.metaRow}>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingIcon}>⭐</Text>
                  <Text style={styles.ratingText}>{movie.voteAverage.toFixed(1)}</Text>
                </View>
                <Text style={styles.metaText}>{movie.voteCount.toLocaleString('pt-BR')} votos</Text>
              </View>

              {movie.runtime > 0 && (
                <Text style={styles.metaText}>⏱️ {formatRuntime(movie.runtime)}</Text>
              )}
              
              {movie.releaseDate && (
                <Text style={styles.metaText}>
                  📅 {new Date(movie.releaseDate).toLocaleDateString('pt-BR')}
                </Text>
              )}
            </View>
          </View>

          {/* Gêneros */}
          {movie.genres.length > 0 && (
            <View style={styles.genresContainer}>
              {movie.genres.map((genre) => (
                <View key={genre.id} style={styles.genreBadge}>
                  <Text style={styles.genreText}>{genre.name}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Sinopse */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📖 Sinopse</Text>
            <Text style={styles.overview}>
              {movie.overview || 'Sinopse não disponível.'}
            </Text>
          </View>

          {/* Bilheteria */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💰 Bilheteria</Text>
            
            <View style={styles.boxOfficeCard}>
              <View style={styles.boxOfficeItem}>
                <Text style={styles.boxOfficeLabel}>Orçamento</Text>
                <Text style={styles.boxOfficeValue}>{formatCurrency(movie.budget)}</Text>
              </View>
              
              <View style={styles.boxOfficeDivider} />
              
              <View style={styles.boxOfficeItem}>
                <Text style={styles.boxOfficeLabel}>Receita</Text>
                <Text style={styles.boxOfficeValue}>{formatCurrency(movie.revenue)}</Text>
              </View>
            </View>

            {movie.revenue > 0 && movie.budget > 0 && (
              <View style={styles.profitContainer}>
                <Text style={styles.profitLabel}>
                  {movie.revenue > movie.budget ? '📈 Lucro' : '📉 Prejuízo'}
                </Text>
                <Text style={[
                  styles.profitValue,
                  movie.revenue > movie.budget ? styles.profitPositive : styles.profitNegative
                ]}>
                  {formatCurrency(Math.abs(movie.revenue - movie.budget))}
                </Text>
              </View>
            )}
          </View>

          {/* Trailer */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎬 Trailer</Text>
            
            {trailer ? (
              !showTrailer ? (
                <TouchableOpacity
                  style={styles.trailerButton}
                  onPress={() => {
                    console.log('🎬 Abrindo trailer:', trailer.key);
                    setShowTrailer(true);
                  }}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[Colors.error, '#c62828']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.trailerGradient}
                  >
                    <View style={styles.playIcon}>
                      <Text style={styles.playIconText}>▶</Text>
                    </View>
                    <View style={styles.trailerInfo}>
                      <Text style={styles.trailerTitle}>{trailer.name}</Text>
                      <Text style={styles.trailerSubtitle}>Tocar Trailer</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <View style={styles.videoContainer}>
                  {Platform.OS === 'web' ? (
                    // Para Web: usar iframe diretamente
                    <iframe
                      style={{
                        width: '100%',
                        height: 850,
                        border: 0,
                        borderRadius: 12,
                      }}
                      src={alternativeTrailerUrl || `https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    // Para Mobile: usar WebView
                    WebView && (
                      <WebView
                        style={styles.video}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        allowsInlineMediaPlayback={true}
                        mediaPlaybackRequiresUserAction={false}
                        source={{
                          html: `
                            <!DOCTYPE html>
                            <html>
                              <head>
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <style>
                                  * { margin: 0; padding: 0; }
                                  body { background: #000; }
                                  .video-container { 
                                    position: relative; 
                                    width: 100%;
                                    height: 450px;
                                    overflow: hidden; 
                                    border-radius: 12px;
                                  }
                                  .video-container iframe { 
                                    position: absolute; 
                                    top: 0; 
                                    left: 0; 
                                    width: 100%; 
                                    height: 100%; 
                                    border: 0; 
                                  }
                                </style>
                              </head>
                              <body>
                                <div class="video-container">
                                  <iframe
                                    src="${alternativeTrailerUrl || `https://www.youtube.com/embed/${trailer.key}?autoplay=1&playsinline=1&rel=0&modestbranding=1&controls=1`}"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen
                                  ></iframe>
                                </div>
                              </body>
                            </html>
                          `
                        }}
                      />
                    )
                  )}
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      console.log('🎬 Fechando trailer');
                      setShowTrailer(false);
                      setAlternativeTrailerUrl(null);
                    }}
                  >
                    <Text style={styles.closeButtonText}>✕ Fechar</Text>
                  </TouchableOpacity>
                </View>
              )
            ) : (
              <TouchableOpacity 
                style={styles.trailerButton}
                onPress={searchAlternativeTrailer}
              >
                <LinearGradient
                  colors={['#FF0000', '#CC0000']}
                  style={styles.trailerGradient}
                >
                  <View style={styles.playIcon}>
                    <Text style={styles.playIconText}>▶</Text>
                  </View>
                  <View style={styles.trailerInfo}>
                    <Text style={styles.trailerTitle}>Buscar Trailer Dublado</Text>
                    <Text style={styles.trailerSubtitle}>Tocar Trailer em Português</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </View>
        </ScrollView>
      </GradientBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: 'transparent',
  },
  backdropContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  backdropPlaceholder: {
    backgroundColor: Colors.border,
  },
  backdropGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  content: {
    padding: Spacing.md,
    marginTop: -50,
  },
  headerSection: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.border,
  },
  headerInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  title: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
  },
  originalTitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    fontStyle: 'italic',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warning,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    gap: 4,
  },
  ratingIcon: {
    fontSize: Typography.sizes.sm,
  },
  ratingText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.light,
  },
  metaText: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  genreBadge: {
    backgroundColor: Colors.primary.start,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  genreText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Colors.light,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  overview: {
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
    lineHeight: 24,
  },
  boxOfficeCard: {
    backgroundColor: Colors.light,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  boxOfficeItem: {
    flex: 1,
    alignItems: 'center',
  },
  boxOfficeDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
  },
  boxOfficeLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  boxOfficeValue: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
  },
  profitContainer: {
    backgroundColor: Colors.light,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
  },
  profitLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  profitValue: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
  },
  profitPositive: {
    color: Colors.success,
  },
  profitNegative: {
    color: Colors.error,
  },
  trailerButton: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  trailerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  playIcon: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIconText: {
    fontSize: 24,
    color: Colors.light,
    marginLeft: 4,
  },
  trailerInfo: {
    flex: 1,
  },
  trailerTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.light,
    marginBottom: 4,
  },
  trailerSubtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.light,
    opacity: 0.9,
  },
  videoContainer: {
    position: 'relative',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.dark,
    width: '100%',
  },
  video: {
    width: '100%',
    height: 450,
  },
  closeButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  closeButtonText: {
    color: Colors.light,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
  },
  noTrailerContainer: {
    backgroundColor: Colors.light,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.md,
  },
  noTrailerIcon: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  noTrailerTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  noTrailerText: {
    fontSize: Typography.sizes.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  youtubeButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.sm,
  },
  youtubeButtonText: {
    color: Colors.light,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
  },
  loadingText: {
    fontSize: Typography.sizes.md,
    color: Colors.light,
    marginTop: Spacing.md,
  },
  errorText: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  errorTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.light,
    marginBottom: Spacing.sm,
  },
  errorMessage: {
    fontSize: Typography.sizes.md,
    color: Colors.light,
    textAlign: 'center',
    opacity: 0.9,
  },
});


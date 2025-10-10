// Tela Home (Dashboard)
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import * as cores from '../../../styles/cores';
import { MovieCarousel } from '../components';
import { tmdb, TMDBFilme } from '../services/tmdb';
import * as S from './HomeScreen.styles';

const { width } = Dimensions.get('window');
const POSTER_WIDTH = 250;  // Tamanho bem maior para melhor visualização
const POSTER_HEIGHT = 240; // Altura original que funcionava bem

export default function HomeScreen() {
  const navigation = useNavigation();
  const [filmesPopulares, setFilmesPopulares] = useState<TMDBFilme[]>([]);
  const [filmesCartaz, setFilmesCartaz] = useState<TMDBFilme[]>([]);
  const [filmesLancamentos, setFilmesLancamentos] = useState<TMDBFilme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarFilmes();
  }, []);

  const carregarFilmes = async () => {
    try {
      setLoading(true);
      const [populares, cartaz, lancamentos] = await Promise.all([
        tmdb.getPopularMovies(1),
        tmdb.getNowPlayingMovies(1),
        tmdb.getUpcomingMovies(1),
      ]);

      // Evitar duplicação - usar filmes únicos para cada seção
      setFilmesPopulares(populares.results.slice(0, 8));
      setFilmesCartaz(cartaz.results.slice(8, 16)); // Próximos 8 filmes
      setFilmesLancamentos(lancamentos.results.slice(0, 8));
    } catch (err) {
      console.error('Erro ao carregar filmes:', err);
      setError('Não foi possível carregar os filmes.');
    } finally {
      setLoading(false);
    }
  };

  const renderFilmeHorizontal = ({ item }: { item: TMDBFilme }) => {
    // Gerar sessão aleatória para cada filme
    const sessaoDisponivel = Math.random() > 0.2; // 80% disponível
    const vagasDisponiveis = sessaoDisponivel ? Math.floor(Math.random() * 80) + 20 : 0;

    return (
      <S.FilmeCard 
        onPress={() => {
          if (sessaoDisponivel) {
            // Ir direto para escolher poltronas
            navigation.navigate('Seats' as never, {
              filmeId: item.id,
              filmeTitulo: item.title,
              vagasDisponiveis
            } as never);
          } else {
            // Se não tiver sessão, ir para explorar
            navigation.navigate('Explore' as never);
          }
        }}
      >
        <S.FilmePoster 
          source={{ uri: tmdb.getImageURL(item.poster_path) }}
          style={{ width: POSTER_WIDTH, height: POSTER_HEIGHT }}
        />
        <S.FilmeRating>⭐ {item.vote_average.toFixed(1)}</S.FilmeRating>
        
        {/* Badge de disponibilidade */}
        {sessaoDisponivel ? (
          <S.StatusBadge style={{ backgroundColor: cores.verdeAcento }}>
            <S.StatusText>🎟️ DISPONÍVEL</S.StatusText>
          </S.StatusBadge>
        ) : (
          <S.StatusBadge style={{ backgroundColor: cores.cinzaDesabilitado }}>
            <S.StatusText>🚫 ESGOTADO</S.StatusText>
          </S.StatusBadge>
        )}
      </S.FilmeCard>
    );
  };

  if (loading) {
    return (
      <S.LoadingContainer>
        <ActivityIndicator size="large" color={cores.vermelhoPrimario} />
        <S.LoadingText>Carregando filmes...</S.LoadingText>
      </S.LoadingContainer>
    );
  }

  return (
    <S.Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Hero */}
        <S.HeroSection>
          <S.LogoContainer>
            <S.LogoText>🎬 CINEMA</S.LogoText>
            <S.LogoSubtext>Explore o melhor do cinema</S.LogoSubtext>
          </S.LogoContainer>

          <S.ActionButtons>
            <S.ActionButton
              onPress={() => navigation.navigate('Explore' as never)}
              style={{ backgroundColor: cores.vermelhoPrimario }}
            >
              <S.ActionButtonText>🔍 Explorar Filmes</S.ActionButtonText>
            </S.ActionButton>

            <S.ActionButton
              onPress={() => navigation.navigate('Signup' as never)}
              style={{ backgroundColor: cores.cinzaMedio }}
            >
              <S.ActionButtonText>➕ Cadastrar Filme</S.ActionButtonText>
            </S.ActionButton>
          </S.ActionButtons>
        </S.HeroSection>

        {error && (
          <S.ErrorBanner>
            <S.ErrorText>⚠️ {error}</S.ErrorText>
          </S.ErrorBanner>
        )}

        {/* Filmes Populares - Carrossel com Setas */}
        <MovieCarousel
          title="🔥 Populares"
          data={filmesPopulares}
          renderItem={renderFilmeHorizontal}
          onViewAll={() => navigation.navigate('Explore' as never)}
        />

        {/* Filmes em Cartaz - Carrossel com Setas */}
        <MovieCarousel
          title="🎭 Em Cartaz"
          data={filmesCartaz}
          renderItem={renderFilmeHorizontal}
          onViewAll={() => navigation.navigate('Explore' as never)}
        />

        {/* Próximos Lançamentos - Carrossel com Setas */}
        <MovieCarousel
          title="🎬 Em Breve"
          data={filmesLancamentos}
          renderItem={renderFilmeHorizontal}
          onViewAll={() => navigation.navigate('Explore' as never)}
        />

        <S.FooterSpace />
      </ScrollView>
    </S.Container>
  );
}


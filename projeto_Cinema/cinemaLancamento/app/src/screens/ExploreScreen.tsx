import { useNavigation } from '@react-navigation/native';
import { useVideoPlayer } from 'expo-video';
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import * as cores from '../../../styles/cores';
import { MovieCard, SearchBar, VideoPlayer } from '../components';
import { tmdb, TMDBFilme } from '../services/tmdb';
import * as S from './ExploreScreen.styles';

// Interface estendida para adicionar disponibilidade
interface FilmeComSessao extends TMDBFilme {
  sessaoDisponivel: boolean;
  vagasDisponiveis: number;
  generoNomes?: string;
}

export default function Explore() {
  const [todosFilmes, setTodosFilmes] = useState<FilmeComSessao[]>([]);
  const [filmesFiltrados, setFilmesFiltrados] = useState<FilmeComSessao[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<FilmeComSessao | null>(null);
  const [trailerUrl, setTrailerUrl] = useState<string>('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const navigation = useNavigation();

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
    navigation.navigate('Seats' as never, {
      filmeId,
      filmeTitulo,
      vagasDisponiveis
    } as never);
  };

  if (loading) {
    return (
      <S.Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={cores.vermelhoPrimario} />
        <S.LoadingText>Carregando filmes...</S.LoadingText>
      </S.Container>
    );
  }

  return (
    <S.Container>
      {/* Header */}
      <S.Header>
        <S.HeaderTitle>🔍 Explorar Filmes</S.HeaderTitle>
        
        {/* Barra de pesquisa */}
        <SearchBar 
          value={searchText}
          onChangeText={setSearchText}
          resultCount={filmesFiltrados.length}
        />

        {error && (
          <S.ErrorBanner>
            <S.ErrorText>⚠️ {error}</S.ErrorText>
          </S.ErrorBanner>
        )}
      </S.Header>

      {/* Layout em duas colunas */}
      <S.MainContainer>
        {/* Coluna dos Cards */}
        <S.CardsContainer showsVerticalScrollIndicator={false}>
          <S.ResultsGrid>
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
              <S.EmptyContainer>
                <S.EmptyText>🎬</S.EmptyText>
                <S.EmptyTitle>Nenhum filme encontrado</S.EmptyTitle>
                <S.EmptySubtitle>
                  Tente buscar por outro termo
                </S.EmptySubtitle>
              </S.EmptyContainer>
            )}
          </S.ResultsGrid>
        </S.CardsContainer>
        
        {/* Coluna do Player de Vídeo */}
        <S.VideoSection>
          <VideoPlayer 
            player={player}
            selectedMovie={selectedMovie}
            loading={loadingTrailer}
          />
        </S.VideoSection>
      </S.MainContainer>
    </S.Container>
  );
}


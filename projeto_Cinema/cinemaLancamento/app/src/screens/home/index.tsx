// Tela Home (Dashboard)
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, ScrollView, Switch } from 'react-native';
import * as cores from '../../../../styles/cores';
import { MovieCarousel } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { Filme } from '../../services/api';
import { tmdb, TMDBFilme } from '../../services/tmdb';
import * as S from './styles';

const { width } = Dimensions.get('window');
const POSTER_WIDTH = 250;  // Tamanho bem maior para melhor visualização
const POSTER_HEIGHT = 240; // Altura original que funcionava bem

// Interface estendida para incluir disponibilidade
interface FilmeComDisponibilidade extends TMDBFilme {
  disponivel: boolean;
  codigo?: number;
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const { isAdmin } = useAuth();
  const [filmesCartaz, setFilmesCartaz] = useState<FilmeComDisponibilidade[]>([]);
  const [filmesLancamentos, setFilmesLancamentos] = useState<FilmeComDisponibilidade[]>([]);
  const [filmesLocais, setFilmesLocais] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarFilmes();
  }, []);

  const carregarFilmes = async () => {
    try {
      setLoading(true);
      
      // Carregar filmes do TMDB
      const [cartazTMDB, lancamentosTMDB] = await Promise.all([
        tmdb.getNowPlayingMovies(1),
        tmdb.getUpcomingMovies(1),
      ]);

      // Sistema agora usa apenas TMDB para filmes
      // API local é apenas para poltronas
      setFilmesLocais([]);

      // Buscar disponibilidade do banco
      let disponibilidades: { [key: string]: boolean } = {};
      try {
        const respDisp = await fetch('http://localhost:3000/filmes/disponibilidade');
        if (respDisp.ok) {
          const filmesDisp = await respDisp.json();
          filmesDisp.forEach((f: any) => {
            disponibilidades[f.filmeId] = f.disponivel;
          });
        }
      } catch (err) {
        console.log('Disponibilidade não carregada, usando padrão');
      }

      // Adicionar disponibilidade aos filmes TMDB
      const cartazComDisp = cartazTMDB.results.slice(0, 10).map(filme => ({
        ...filme,
        disponivel: disponibilidades[filme.id.toString()] !== undefined 
          ? disponibilidades[filme.id.toString()] 
          : true,
      }));

      const lancamentosComDisp = lancamentosTMDB.results.slice(0, 10).map(filme => ({
        ...filme,
        disponivel: disponibilidades[filme.id.toString()] !== undefined 
          ? disponibilidades[filme.id.toString()] 
          : true,
      }));

      setFilmesCartaz(cartazComDisp);
      setFilmesLancamentos(lancamentosComDisp);
    } catch (err) {
      console.error('Erro ao carregar filmes:', err);
      setError('Não foi possível carregar os filmes.');
    } finally {
      setLoading(false);
    }
  };

  const toggleDisponibilidade = async (filme: FilmeComDisponibilidade) => {
    try {
      const novaDisponibilidade = !filme.disponivel;
      
      // Salvar no banco de dados
      await fetch(`http://localhost:3000/filmes/${filme.id}/disponibilidade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filmeTitulo: filme.title,
          disponivel: novaDisponibilidade
        })
      });
      
      // Atualizar estado local
      setFilmesCartaz(prev => 
        prev.map(f => f.id === filme.id ? { ...f, disponivel: novaDisponibilidade } : f)
      );
      setFilmesLancamentos(prev => 
        prev.map(f => f.id === filme.id ? { ...f, disponivel: novaDisponibilidade } : f)
      );
      
      Alert.alert(
        '✅ Sucesso', 
        `Filme ${novaDisponibilidade ? 'disponibilizado' : 'marcado como esgotado'}!\n\n💾 Salvo no banco de dados!`
      );
    } catch (err) {
      console.error('Erro ao atualizar disponibilidade:', err);
      Alert.alert('❌ Erro', 'Não foi possível atualizar. Verifique se a API está rodando.');
    }
  };

  const renderFilmeHorizontal = ({ item }: { item: FilmeComDisponibilidade }) => {
    const vagasDisponiveis = item.disponivel ? Math.floor(Math.random() * 80) + 20 : 0;

    return (
      <S.FilmeCard 
        onPress={() => {
          if (item.disponivel && !isAdmin) {
            // Cliente: ir direto para escolher poltronas
            navigation.navigate('Seats', {
              filmeId: item.id,
              filmeTitulo: item.title,
              vagasDisponiveis
            });
          } else if (!item.disponivel && !isAdmin) {
            // Cliente: se não tiver sessão, ir para explorar
            (navigation as any).navigate('Explore');
          }
          // Admin: apenas visualiza, não navega (toggle está no card)
        }}
      >
        <S.FilmePoster 
          source={{ uri: tmdb.getImageURL(item.poster_path) }}
          style={{ width: POSTER_WIDTH, height: POSTER_HEIGHT }}
        />
        <S.FilmeRating>⭐ {item.vote_average.toFixed(1)}</S.FilmeRating>
        
        {/* Badge de disponibilidade ou Toggle para Admin */}
        {isAdmin ? (
          <S.AdminToggleContainer>
            <S.AdminToggleLabel>
              {item.disponivel ? '🎟️ DISPONÍVEL' : '🚫 ESGOTADO'}
            </S.AdminToggleLabel>
            <Switch
              value={item.disponivel}
              onValueChange={() => toggleDisponibilidade(item)}
              trackColor={{ false: cores.cinzaDesabilitado, true: cores.verdeAcento }}
              thumbColor={cores.brancoTotal}
            />
          </S.AdminToggleContainer>
        ) : (
          <>
            {item.disponivel ? (
              <S.StatusBadge style={{ backgroundColor: cores.verdeAcento }}>
                <S.StatusText>🎟️ DISPONÍVEL</S.StatusText>
              </S.StatusBadge>
            ) : (
              <S.StatusBadge style={{ backgroundColor: cores.cinzaDesabilitado }}>
                <S.StatusText>🚫 ESGOTADO</S.StatusText>
              </S.StatusBadge>
            )}
          </>
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
              onPress={() => (navigation as any).navigate('Explore')}
              style={{ backgroundColor: cores.vermelhoPrimario }}
            >
              <S.ActionButtonText>🔍 Explorar Filmes</S.ActionButtonText>
            </S.ActionButton>

            <S.ActionButton
              onPress={() => (navigation as any).navigate('Signup')}
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

        {/* Filmes em Cartaz - Carrossel com Setas */}
        <MovieCarousel
          title="🎭 Em Cartaz"
          data={isAdmin ? filmesCartaz : filmesCartaz.filter(f => f.disponivel)}
          renderItem={renderFilmeHorizontal}
          onViewAll={() => (navigation as any).navigate('Explore')}
        />

        {/* Próximos Lançamentos - Carrossel com Setas */}
        <MovieCarousel
          title="🎬 Em Breve"
          data={isAdmin ? filmesLancamentos : filmesLancamentos.filter(f => f.disponivel)}
          renderItem={renderFilmeHorizontal}
          onViewAll={() => (navigation as any).navigate('Explore')}
        />

        <S.FooterSpace />
      </ScrollView>
    </S.Container>
  );
}


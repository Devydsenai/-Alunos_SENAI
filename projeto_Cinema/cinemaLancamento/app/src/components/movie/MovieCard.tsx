import React from 'react';
import { tmdb, TMDBFilme } from '../../services/tmdb';
import * as S from './styles';

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
    <S.Container 
      isSelected={isSelected}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <S.Content>
        <S.Poster 
          source={{ uri: tmdb.getImageURL(filme.poster_path) }} 
          resizeMode="cover"
        />
        <S.Info>
          <S.Title numberOfLines={2}>{filme.title}</S.Title>
          <S.Year>{anoLancamento} • {filme.original_language.toUpperCase()}</S.Year>
          <S.Genre numberOfLines={1}>{filme.generoNomes || 'Sem gênero'}</S.Genre>
          
          <S.Footer>
            <S.Rating>⭐ {filme.vote_average.toFixed(1)}</S.Rating>
            {emBreve && (
              <S.Badge>
                <S.BadgeText>EM BREVE</S.BadgeText>
              </S.Badge>
            )}
          </S.Footer>
          
          {/* Botão Escolher Poltronas */}
          {!emBreve && onSeatsPress && (
            <S.SeatsButton 
              disabled={!filme.sessaoDisponivel}
              onPress={() => {
                if (filme.sessaoDisponivel) {
                  onSeatsPress(filme.id, filme.title, filme.vagasDisponiveis);
                }
              }}
            >
              <S.SeatsButtonText>
                {filme.sessaoDisponivel ? '🎟️ Escolher Poltronas' : '🚫 Indisponível'}
              </S.SeatsButtonText>
            </S.SeatsButton>
          )}
        </S.Info>
      </S.Content>
    </S.Container>
  );
}

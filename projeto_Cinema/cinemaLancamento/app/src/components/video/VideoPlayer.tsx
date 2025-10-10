import type { VideoPlayer } from 'expo-video';
import { VideoView } from 'expo-video';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import * as cores from '../../../../styles/cores';
import * as S from './styles';

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
      <S.Placeholder>
        <S.PlaceholderIcon>🎬</S.PlaceholderIcon>
        <S.PlaceholderTitle>Selecione um filme</S.PlaceholderTitle>
        <S.PlaceholderSubtitle>para assistir ao trailer</S.PlaceholderSubtitle>
      </S.Placeholder>
    );
  }

  return (
    <S.Container>
      <S.Title numberOfLines={1}>{selectedMovie.title}</S.Title>
      <S.Subtitle>Trailer</S.Subtitle>
      
      <S.PlayerContainer>
        {loading ? (
          <S.LoadingContainer>
            <ActivityIndicator size="large" color={cores.vermelhoPrimario} />
            <S.LoadingText>Carregando trailer...</S.LoadingText>
          </S.LoadingContainer>
        ) : (
          <View style={{ width: '100%', height: '100%' }}>
            <VideoView
              player={player}
              style={{ width: '100%', height: '100%' }}
              nativeControls={true}
              allowsFullscreen={true}
              contentFit="contain"
            />
          </View>
        )}
      </S.PlayerContainer>
      
      <S.InfoContainer>
        <S.Year>
          {selectedMovie.release_date ? selectedMovie.release_date.split('-')[0] : 'N/A'} • {selectedMovie.original_language.toUpperCase()}
        </S.Year>
        <S.Genre numberOfLines={2}>{selectedMovie.generoNomes || 'Sem gênero'}</S.Genre>
        <S.Rating>⭐ {selectedMovie.vote_average.toFixed(1)}</S.Rating>
      </S.InfoContainer>
    </S.Container>
  );
}

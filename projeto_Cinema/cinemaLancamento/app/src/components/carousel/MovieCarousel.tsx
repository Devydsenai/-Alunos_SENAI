import React, { useRef, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import * as S from './styles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 280;  // Ajustado para o novo tamanho do container
const CARD_MARGIN = 16;
const CARDS_PER_VIEW = 1.3;  // Ajustado para o novo tamanho

interface MovieCarouselProps {
  data: any[];
  renderItem: ({ item, index }: { item: any; index: number }) => React.ReactElement;
  title: string;
  onViewAll?: () => void;
}

export default function MovieCarousel({ data, renderItem, title, onViewAll }: MovieCarouselProps) {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.max(0, data.length - CARDS_PER_VIEW);

  const scrollToNext = () => {
    if (currentIndex < maxIndex) {
      const nextIndex = Math.min(currentIndex + 1, maxIndex);
      setCurrentIndex(nextIndex);
      
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * (CARD_WIDTH + CARD_MARGIN),
        animated: true,
      });
    }
  };

  const scrollToPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = Math.max(currentIndex - 1, 0);
      setCurrentIndex(prevIndex);
      
      flatListRef.current?.scrollToOffset({
        offset: prevIndex * (CARD_WIDTH + CARD_MARGIN),
        animated: true,
      });
    }
  };

  const canScrollPrevious = currentIndex > 0;
  const canScrollNext = currentIndex < maxIndex;

  return (
    <S.Container>
      {/* Header com título e link "Ver todos" */}
      <S.Header>
        <S.Title>{title}</S.Title>
        {onViewAll && (
          <S.ViewAllButton onPress={onViewAll}>
            <S.ViewAllText>Ver todos →</S.ViewAllText>
          </S.ViewAllButton>
        )}
      </S.Header>

      {/* Carrossel com setas */}
      <S.CarouselContainer>
        {/* Seta Esquerda */}
        {canScrollPrevious && (
          <S.ArrowButton 
            style={{ left: 10 }}
            onPress={scrollToPrevious}
          >
            <S.ArrowIcon>‹</S.ArrowIcon>
          </S.ArrowButton>
        )}

        {/* Lista de filmes */}
        <FlatList
          ref={flatListRef}
          horizontal
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ 
            paddingHorizontal: 20,
            gap: CARD_MARGIN,
          }}
          scrollEnabled={true}
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH + CARD_MARGIN}
          snapToAlignment="start"
        />

        {/* Seta Direita */}
        {canScrollNext && (
          <S.ArrowButton 
            style={{ right: 10 }}
            onPress={scrollToNext}
          >
            <S.ArrowIcon>›</S.ArrowIcon>
          </S.ArrowButton>
        )}
      </S.CarouselContainer>

      {/* Indicadores de posição */}
      {data.length > CARDS_PER_VIEW && (
        <S.IndicatorsContainer>
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <S.Indicator 
              key={index}
              active={index === currentIndex}
            />
          ))}
        </S.IndicatorsContainer>
      )}
    </S.Container>
  );
}


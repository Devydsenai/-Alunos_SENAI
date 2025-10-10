import React from 'react';
import * as S from './styles';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  resultCount?: number;
}

export default function SearchBar({ 
  value, 
  onChangeText, 
  placeholder = "Buscar por título, gênero ou diretor...",
  resultCount 
}: SearchBarProps) {
  return (
    <S.SearchContainer>
      <S.InputContainer>
        <S.Input
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
        />
        {value.length > 0 && (
          <S.ClearButton onPress={() => onChangeText('')}>
            <S.ClearButtonText>✕</S.ClearButtonText>
          </S.ClearButton>
        )}
      </S.InputContainer>

      {resultCount !== undefined && (
        <S.ResultCount>
          {resultCount} {resultCount === 1 ? 'filme encontrado' : 'filmes encontrados'}
        </S.ResultCount>
      )}
    </S.SearchContainer>
  );
}

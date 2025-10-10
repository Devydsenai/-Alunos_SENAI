import styled from 'styled-components/native';
import * as cores from '../../styles/cores';

// ========================================
// 🎬 MovieCard Styled Components
// ========================================

export const Container = styled.TouchableOpacity<{ isSelected: boolean }>`
  width: 100%;
  margin-bottom: 15px;
  background-color: ${cores.cinzaMedio};
  border-radius: 12px;
  overflow: hidden;
  elevation: 8;
  ${props => props.isSelected && `
    border-width: 2px;
    border-color: ${cores.vermelhoPrimario};
  `}
`;

export const Content = styled.View`
  flex-direction: row;
  background-color: ${cores.cinzaMedio};
`;

export const Poster = styled.Image`
  width: 120px;
  height: 180px;
`;

export const Info = styled.View`
  flex: 1;
  padding: 15px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${cores.branco};
  margin-bottom: 6px;
`;

export const Year = styled.Text`
  font-size: 14px;
  color: ${cores.vermelhoPrimario};
  margin-bottom: 6px;
`;

export const Genre = styled.Text`
  font-size: 13px;
  color: ${cores.cinzaTexto};
  margin-bottom: 10px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Rating = styled.Text`
  font-size: 14px;
  color: ${cores.dourado};
  font-weight: bold;
`;

export const Badge = styled.View`
  background-color: ${cores.vermelhoPrimario};
  padding-horizontal: 4px;
  padding-vertical: 1px;
  border-radius: 2px;
`;

export const BadgeText = styled.Text`
  font-size: 6px;
  color: ${cores.branco};
  font-weight: bold;
`;

export const SeatsButton = styled.TouchableOpacity<{ disabled: boolean }>`
  background-color: ${props => props.disabled ? cores.cinzaDesabilitado : cores.vermelhoPrimario};
  padding: 10px;
  border-radius: 8px;
  align-items: center;
  margin-top: 10px;
  width: 100%;
`;

export const SeatsButtonText = styled.Text`
  color: ${cores.branco};
  font-size: 12px;
  font-weight: bold;
`;

// ========================================
// 🔍 SearchBar Styled Components
// ========================================

export const SearchContainer = styled.View`
  margin-bottom: 10px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${cores.cinzaMedio};
  border-radius: 12px;
  padding-horizontal: 15px;
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 50px;
  color: ${cores.branco};
  font-size: 16px;
`;

export const ClearButton = styled.TouchableOpacity`
  padding: 10px;
`;

export const ClearButtonText = styled.Text`
  color: ${cores.cinzaTexto};
  font-size: 20px;
  font-weight: bold;
`;

export const ResultCount = styled.Text`
  font-size: 14px;
  color: ${cores.cinzaTexto};
  margin-top: 5px;
`;




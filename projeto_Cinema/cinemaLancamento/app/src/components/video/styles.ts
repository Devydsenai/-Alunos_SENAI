import styled from 'styled-components/native';
import * as cores from '../../../../styles/cores';

// ========================================
// 📺 VideoPlayer Styled Components
// ========================================

export const Container = styled.View`
  flex: 1;
`;

export const Placeholder = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${cores.cinzaEscuro};
  border-radius: 12px;
  padding: 20px;
`;

export const PlaceholderIcon = styled.Text`
  font-size: 60px;
  margin-bottom: 16px;
`;

export const PlaceholderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${cores.branco};
  margin-bottom: 8px;
  text-align: center;
`;

export const PlaceholderSubtitle = styled.Text`
  font-size: 14px;
  color: ${cores.cinzaTexto};
  text-align: center;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${cores.branco};
  margin-bottom: 4px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: ${cores.vermelhoPrimario};
  margin-bottom: 15px;
`;

export const PlayerContainer = styled.View`
  width: 100%;
  height: 280px;
  background-color: ${cores.corPlayer};
  border-radius: 12px;
  margin-bottom: 15px;
  overflow: hidden;
`;

export const VideoStyled = styled.View`
  width: 100%;
  height: 100%;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${cores.corPlayer};
`;

export const LoadingText = styled.Text`
  color: ${cores.branco};
  margin-top: 10px;
  font-size: 14px;
`;

export const InfoContainer = styled.View`
  padding: 12px;
  background-color: ${cores.cinzaMedio};
  border-radius: 12px;
`;

export const Year = styled.Text`
  font-size: 14px;
  color: ${cores.vermelhoPrimario};
  margin-bottom: 6px;
`;

export const Genre = styled.Text`
  font-size: 13px;
  color: ${cores.cinzaTexto};
  margin-bottom: 6px;
`;

export const Rating = styled.Text`
  font-size: 16px;
  color: ${cores.dourado};
  font-weight: bold;
`;


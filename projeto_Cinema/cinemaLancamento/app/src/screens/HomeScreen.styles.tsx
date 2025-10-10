import styled from 'styled-components/native';
import * as cores from '../../../styles/cores';

export const Container = styled.View`
  flex: 1;
  background-color: ${cores.pretoProfundo};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${cores.pretoProfundo};
`;

export const LoadingText = styled.Text`
  color: ${cores.brancoSuave};
  font-size: 16px;
  margin-top: 12px;
`;

export const HeroSection = styled.View`
  padding: 60px 20px 30px;
  background: ${cores.cinzaProfundo};
  border-bottom-width: 1px;
  border-bottom-color: ${cores.cinzaBorda};
`;

export const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: 24px;
`;

export const LogoText = styled.Text`
  font-size: 42px;
  font-weight: bold;
  color: ${cores.vermelhoPrimario};
  letter-spacing: 2px;
`;

export const LogoSubtext = styled.Text`
  font-size: 16px;
  color: ${cores.cinzaTexto};
  margin-top: 8px;
`;

export const ActionButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
`;

export const ActionButton = styled.TouchableOpacity`
  flex: 1;
  padding: 16px;
  border-radius: 12px;
  align-items: center;
`;

export const ActionButtonText = styled.Text`
  color: ${cores.brancoTotal};
  font-size: 14px;
  font-weight: 600;
`;

export const FilmeCard = styled.TouchableOpacity`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;

export const FilmePoster = styled.Image`
  border-radius: 8px;
`;

export const FilmeRating = styled.Text`
  position: absolute;
  top: 6px;
  right: 6px;
  background-color: ${cores.pretoTransparente80};
  color: ${cores.douradoPremium};
  font-size: 11px;
  font-weight: bold;
  padding: 3px 6px;
  border-radius: 4px;
`;

export const StatusBadge = styled.View`
  position: absolute;
  top: 6px;
  left: 6px;
  padding: 4px 8px;
  border-radius: 4px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.6;
  shadow-radius: 3px;
  elevation: 4;
`;

export const StatusText = styled.Text`
  color: ${cores.brancoTotal};
  font-size: 9px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const ErrorBanner = styled.View`
  background-color: ${cores.laranjaTransparente20};
  padding: 12px 20px;
  margin: 16px 20px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${cores.laranjaAviso};
`;

export const ErrorText = styled.Text`
  color: ${cores.laranjaAviso};
  font-size: 14px;
  text-align: center;
`;

export const FooterSpace = styled.View`
  height: 40px;
`;


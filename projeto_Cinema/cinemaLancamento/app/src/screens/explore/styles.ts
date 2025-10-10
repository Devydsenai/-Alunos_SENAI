import styled from 'styled-components/native';
import * as cores from '../../../../styles/cores';

// ========================================
// 🏠 Home Screen Styled Components
// ========================================

export const Container = styled.View`
  flex: 1;
  background-color: ${cores.pretoProfundo};
`;

export const CenterContent = styled.View`
  justify-content: center;
  align-items: center;
`;

export const LoadingText = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  color: ${cores.brancoTotal};
`;

export const Header = styled.View`
  padding: 20px;
  padding-top: 60px;
  background-color: ${cores.cinzaEscuro};
  border-bottom-width: 1px;
  border-bottom-color: ${cores.cinzaClaro};
`;

export const HeaderTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${cores.vermelhoPrimario};
  margin-bottom: 15px;
`;

export const ErrorBanner = styled.View`
  background-color: ${cores.laranjaTransparente};
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
  border-width: 1px;
  border-color: ${cores.laranja};
`;

export const ErrorText = styled.Text`
  color: ${cores.laranja};
  font-size: 12px;
  text-align: center;
`;

export const MainContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const CardsContainer = styled.ScrollView`
  flex: 1;
  padding: 15px;
  background-color: ${cores.pretoProfundo};
`;

export const VideoSection = styled.View`
  width: 350px;
  padding: 15px;
  background-color: ${cores.cinzaEscuro};
  border-left-width: 1px;
  border-left-color: ${cores.cinzaClaro};
`;

export const ResultsGrid = styled.View`
  flex-direction: column;
`;

export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-vertical: 60px;
`;

export const EmptyText = styled.Text`
  font-size: 60px;
  margin-bottom: 10px;
`;

export const EmptyTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${cores.brancoTotal};
  margin-bottom: 5px;
`;

export const EmptySubtitle = styled.Text`
  font-size: 14px;
  color: ${cores.cinzaTexto};
`;


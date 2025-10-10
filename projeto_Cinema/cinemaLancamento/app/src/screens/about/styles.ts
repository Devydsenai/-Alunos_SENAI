import styled from 'styled-components/native';
import * as cores from '../../../../styles/cores';

export const Container = styled.View`
  flex: 1;
  background-color: ${cores.pretoProfundo};
`;

export const Header = styled.View`
  padding: 60px 20px 20px;
  background-color: ${cores.cinzaProfundo};
  border-bottom-width: 1px;
  border-bottom-color: ${cores.cinzaBorda};
`;

export const HeaderTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${cores.vermelhoPrimario};
  margin-bottom: 8px;
`;

export const HeaderSubtitle = styled.Text`
  font-size: 14px;
  color: ${cores.cinzaTexto};
`;

export const Content = styled.View`
  padding: 20px;
`;

export const Section = styled.View`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${cores.brancoTotal};
  margin-bottom: 16px;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: ${cores.cinzaTexto};
  margin-bottom: 16px;
  line-height: 20px;
`;

// Status Card
export const StatusCard = styled.View<{ isAdmin: boolean }>`
  background-color: ${(props: { isAdmin: boolean }) => props.isAdmin ? cores.vermelhoTransparente20 : cores.cinzaCard};
  padding: 20px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${(props: { isAdmin: boolean }) => props.isAdmin ? cores.vermelhoPrimario : cores.cinzaBorda};
  align-items: center;
`;

export const StatusIcon = styled.Text`
  font-size: 48px;
  margin-bottom: 12px;
`;

export const StatusText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${cores.brancoTotal};
  margin-bottom: 8px;
`;

export const StatusDescription = styled.Text`
  font-size: 14px;
  color: ${cores.cinzaTexto};
  text-align: center;
  line-height: 20px;
`;

// Input e Button
export const Input = styled.TextInput`
  background-color: ${cores.cinzaCard};
  color: ${cores.brancoTotal};
  font-size: 16px;
  padding: 14px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${cores.cinzaBorda};
  margin-bottom: 16px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${cores.vermelhoPrimario};
  padding: 16px;
  border-radius: 12px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${cores.brancoTotal};
  font-size: 16px;
  font-weight: bold;
`;

export const Hint = styled.Text`
  font-size: 12px;
  color: ${cores.cinzaTexto};
  margin-top: 8px;
  text-align: center;
  font-style: italic;
`;

// Info Card
export const InfoCard = styled.View`
  background-color: ${cores.cinzaCard};
  padding: 16px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${cores.cinzaBorda};
`;

export const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const InfoLabel = styled.Text`
  font-size: 14px;
  color: ${cores.cinzaTexto};
`;

export const InfoValue = styled.Text`
  font-size: 14px;
  color: ${cores.brancoTotal};
  font-weight: 600;
`;

// Features
export const FeaturesList = styled.View`
  gap: 12px;
`;

export const FeatureItem = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${cores.cinzaCard};
  padding: 12px;
  border-radius: 8px;
`;

export const FeatureIcon = styled.Text`
  font-size: 24px;
  margin-right: 12px;
`;

export const FeatureText = styled.Text`
  font-size: 14px;
  color: ${cores.brancoSuave};
  flex: 1;
`;

// Demo Card
export const DemoCard = styled.View`
  background-color: ${cores.vermelhoTransparente20};
  padding: 20px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${cores.vermelhoPrimario};
  align-items: center;
`;

export const DemoIcon = styled.Text`
  font-size: 36px;
  margin-bottom: 12px;
`;

export const DemoTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${cores.brancoTotal};
  margin-bottom: 12px;
`;

export const DemoText = styled.Text`
  font-size: 13px;
  color: ${cores.brancoSuave};
  line-height: 20px;
`;

export const FooterSpace = styled.View`
  height: 40px;
`;


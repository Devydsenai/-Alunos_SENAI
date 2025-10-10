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

export const Form = styled.View`
  padding: 20px;
`;

export const FormGroup = styled.View`
  margin-bottom: 20px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${cores.brancoSuave};
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  background-color: ${cores.cinzaCard};
  color: ${cores.brancoTotal};
  font-size: 16px;
  padding: 14px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${cores.cinzaBorda};
`;

export const TextArea = styled.TextInput`
  background-color: ${cores.cinzaCard};
  color: ${cores.brancoTotal};
  font-size: 16px;
  padding: 14px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${cores.cinzaBorda};
  height: 100px;
  text-align-vertical: top;
`;

export const CheckboxGroup = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

export const Checkbox = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  border-width: 2px;
  border-color: ${cores.vermelhoPrimario};
  border-radius: 4px;
  margin-right: 12px;
  justify-content: center;
  align-items: center;
`;

export const CheckboxChecked = styled.Text`
  color: ${cores.vermelhoPrimario};
  font-size: 16px;
  font-weight: bold;
`;

export const CheckboxLabel = styled.Text`
  font-size: 14px;
  color: ${cores.brancoSuave};
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: ${cores.vermelhoPrimario};
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  margin-top: 8px;
`;

export const SubmitButtonText = styled.Text`
  color: ${cores.brancoTotal};
  font-size: 16px;
  font-weight: bold;
`;

export const InfoText = styled.Text`
  font-size: 12px;
  color: ${cores.cinzaTexto};
  margin-top: 12px;
  text-align: center;
`;

export const FooterSpace = styled.View`
  height: 40px;
`;


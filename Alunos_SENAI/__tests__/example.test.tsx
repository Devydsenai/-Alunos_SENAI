import { render } from '@testing-library/react-native';
import { Text, View } from 'react-native';

// Teste básico para validar configuração
describe('Configuração de Testes', () => {
  it('deve renderizar componente simples', () => {
    const { getByText } = render(
      <View>
        <Text>Hello Test</Text>
      </View>
    );
    
    expect(getByText('Hello Test')).toBeTruthy();
  });

  it('deve passar teste matemático', () => {
    expect(2 + 2).toBe(4);
  });
});


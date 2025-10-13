import { fireEvent, render } from '@testing-library/react-native';
import { Text, TouchableOpacity, View } from 'react-native';

// Componente de exemplo para teste
const ClientCard = ({ client, onEdit, onDelete }: any) => {
  return (
    <View testID="client-card">
      <Text>{client.nome}</Text>
      <Text>{client.email}</Text>
      <TouchableOpacity testID="edit-button" onPress={() => onEdit(client.codigo)}>
        <Text>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="delete-button" onPress={() => onDelete(client.codigo)}>
        <Text>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
};

describe('ClientCard', () => {
  const mockClient = {
    codigo: 1,
    nome: 'João Silva',
    email: 'joao@test.com',
    telefone: '11999999999',
    ativo: true,
  };

  it('deve renderizar informações do cliente', () => {
    const { getByText } = render(
      <ClientCard client={mockClient} onEdit={() => {}} onDelete={() => {}} />
    );

    expect(getByText('João Silva')).toBeTruthy();
    expect(getByText('joao@test.com')).toBeTruthy();
  });

  it('deve chamar onEdit quando botão editar for clicado', () => {
    const onEditMock = jest.fn();
    const { getByTestId } = render(
      <ClientCard client={mockClient} onEdit={onEditMock} onDelete={() => {}} />
    );

    fireEvent.press(getByTestId('edit-button'));
    expect(onEditMock).toHaveBeenCalledWith(1);
  });

  it('deve chamar onDelete quando botão excluir for clicado', () => {
    const onDeleteMock = jest.fn();
    const { getByTestId } = render(
      <ClientCard client={mockClient} onEdit={() => {}} onDelete={onDeleteMock} />
    );

    fireEvent.press(getByTestId('delete-button'));
    expect(onDeleteMock).toHaveBeenCalledWith(1);
  });
});


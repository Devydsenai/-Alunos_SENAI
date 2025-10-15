import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Modal } from 'react-native';
import * as S from './about.styles';

// Interface para o fornecedor
interface Cliente {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;
  ativo: boolean;
  foto?: string;
}

export default function AboutScreen() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [pesquisa, setPesquisa] = useState('');
  const [clienteEditando, setClienteEditando] = useState<number | null>(null);
  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
    ativo: true,
    foto: ''
  });

  // URL da API (ajuste conforme necessário)
  const API_URL = 'http://localhost:3000';

  // Função para buscar fornecedores
  const buscarClientes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/clientes`);
      if (response.ok) {
        const data = await response.json();
        setClientes(data);
        setClientesFiltrados(data);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar os clientes');
      }
    } catch (error) {
      Alert.alert('Erro', 'Verifique se a API está rodando');
      console.error('Erro ao buscar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para filtrar fornecedores
  const filtrarClientes = (texto: string) => {
    setPesquisa(texto);
    if (texto.trim() === '') {
      setClientesFiltrados(clientes);
    } else {
      const filtrados = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(texto.toLowerCase()) ||
        cliente.email.toLowerCase().includes(texto.toLowerCase()) ||
        cliente.telefone.includes(texto)
      );
      setClientesFiltrados(filtrados);
    }
  };

  // Função para adicionar/editar fornecedor
  const adicionarCliente = async () => {
    if (!novoCliente.nome || !novoCliente.email) {
      Alert.alert('Erro', 'Nome e email são obrigatórios');
      return;
    }

    try {
      const isEditando = clienteEditando !== null;
      const url = isEditando ? `${API_URL}/clientes/${clienteEditando}` : `${API_URL}/clientes`;
      const method = isEditando ? 'PUT' : 'POST';

      console.log(`${isEditando ? 'Editando' : 'Criando'} cliente:`, novoCliente);
      console.log('URL:', url, 'Method:', method);

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoCliente),
      });

      if (response.ok) {
        const successMessage = isEditando ? 'Fornecedor editado com sucesso!' : 'Fornecedor adicionado com sucesso!';
        Alert.alert('Sucesso', successMessage);
        setNovoCliente({ nome: '', email: '', telefone: '', ativo: true, foto: '' });
        setClienteEditando(null);
        setModalVisible(false);
        buscarClientes();
      } else {
        const error = await response.json();
        console.error('Erro da API:', error);
        
        // Tratar erro de email duplicado
        if (error.error && error.error.includes('já cadastrado')) {
          Alert.alert('Erro', 'Este e-mail já está cadastrado. Use um e-mail diferente.');
        } else {
          Alert.alert('Erro', error.error || `Não foi possível ${isEditando ? 'editar' : 'adicionar'} o cliente`);
        }
      }
    } catch (error) {
      Alert.alert('Erro', `Erro ao ${clienteEditando ? 'editar' : 'adicionar'} cliente`);
      console.error('Erro ao processar cliente:', error);
    }
  };

  // Função para alternar status do fornecedor
  const alternarStatusCliente = async (codigo: number, ativo: boolean) => {
    try {
      console.log(`Alterando status do fornecedor ${codigo} de ${ativo} para ${!ativo}`);
      
      const response = await fetch(`${API_URL}/clientes/${codigo}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ativo: !ativo }),
      });

      console.log('Resposta da API:', response.status);

      if (response.ok) {
        Alert.alert('Sucesso', `Fornecedor ${!ativo ? 'ativado' : 'desativado'} com sucesso!`);
        buscarClientes();
      } else {
        const errorData = await response.json();
        console.error('Erro da API:', errorData);
        Alert.alert('Erro', `Não foi possível alterar o status: ${errorData.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      Alert.alert('Erro', `Erro de conexão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  // Função para excluir fornecedor (usando a função que funciona)
  const excluirCliente = async (codigo: number, nome: string) => {
    console.log('=== BOTÃO DELETAR CLICADO ===');
    console.log('API URL:', API_URL);
    console.log('Fornecedor selecionado:', { codigo, nome });
    
    try {
      console.log('1. Testando DELETE para cliente:', codigo);
      console.log('URL de delete:', `${API_URL}/clientes/${codigo}`);
      
      const deleteResponse = await fetch(`${API_URL}/clientes/${codigo}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('2. Resposta do DELETE:');
      console.log('Status:', deleteResponse.status);
      console.log('OK:', deleteResponse.ok);
      
      const deleteResult = await deleteResponse.json();
      console.log('3. Resultado do DELETE:', deleteResult);
      
      if (deleteResponse.ok) {
        Alert.alert('Sucesso!', `Fornecedor ${nome} (código: ${codigo}) foi deletado com sucesso!`);
        buscarClientes(); // Recarregar lista
      } else {
        Alert.alert('Erro no DELETE', `Status: ${deleteResponse.status}\nErro: ${deleteResult.error || 'Erro desconhecido'}`);
      }
      
    } catch (error) {
      console.error('Erro no teste de delete:', error);
      Alert.alert('Erro de Conexão', `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}\n\nVerifique se a API está rodando.`);
    }
  };

  // Função para editar fornecedor
  const editarCliente = async (codigo: number) => {
    console.log('=== BOTÃO EDITAR CLICADO ===');
    console.log('Código do fornecedor:', codigo);
    
    try {
      // Buscar dados do fornecedor
      const response = await fetch(`${API_URL}/clientes/${codigo}`);
      
      if (response.ok) {
        const cliente = await response.json();
        console.log('Fornecedor encontrado:', cliente);
        
        // Mostrar modal de edição
        setNovoCliente({
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone || '',
          ativo: cliente.ativo,
          foto: cliente.foto || ''
        });
        setModalVisible(true);
        
        // Armazenar código do fornecedor para edição
        setClienteEditando(codigo);
      } else {
        Alert.alert('Erro', 'Fornecedor não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar fornecedor:', error);
      Alert.alert('Erro', `Erro ao buscar fornecedor: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };



  // Carregar fornecedores quando a tela for montada
  useEffect(() => {
    buscarClientes();
  }, []);

  // Recarregar fornecedores sempre que a tela for focada (quando voltar de outras telas)
  useFocusEffect(
    React.useCallback(() => {
      buscarClientes();
    }, [])
  );

  // Função para renderizar cada item da lista
  const renderCliente = ({ item }: { item: Cliente }) => (
    <S.ClienteCard inativo={!item.ativo}>
      <S.ClienteHeader>
        {item.foto ? (
          <S.ClienteFoto source={{ uri: item.foto }} />
        ) : (
          <S.ClienteSemFoto>
            <Ionicons name="person" size={100} color="#ccc" />
          </S.ClienteSemFoto>
        )}
        <S.ClienteInfo>
          <S.ClienteNome inativo={!item.ativo}>{item.nome}</S.ClienteNome>
          <S.ClienteEmail inativo={!item.ativo}>{item.email}</S.ClienteEmail>
          {item.telefone && (
            <S.ClienteTelefone inativo={!item.ativo}>{item.telefone}</S.ClienteTelefone>
          )}
        </S.ClienteInfo>
        <S.StatusBadge ativo={item.ativo}>
          <S.StatusText>{item.ativo ? 'Ativo' : 'Inativo'}</S.StatusText>
        </S.StatusBadge>
      </S.ClienteHeader>
      
      <S.BotoesContainer>
        <S.BotaoEditar onPress={() => editarCliente(item.codigo)}>
          <Ionicons name="pencil" size={12} color="#fff" />
          <S.BotaoTexto>Editar</S.BotaoTexto>
        </S.BotaoEditar>
        
        <S.BotaoStatus 
          ativo={item.ativo}
          onPress={() => alternarStatusCliente(item.codigo, item.ativo)}
        >
          <Ionicons name={item.ativo ? "pause" : "play"} size={12} color="#fff" />
          <S.BotaoTexto>{item.ativo ? 'Desativar' : 'Ativar'}</S.BotaoTexto>
        </S.BotaoStatus>
        
        <S.BotaoTeste onPress={() => excluirCliente(item.codigo, item.nome)}>
          <Ionicons name="trash" size={12} color="#fff" />
          <S.BotaoTexto>Deletar</S.BotaoTexto>
        </S.BotaoTeste>
      </S.BotoesContainer>
    </S.ClienteCard>
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Lista de Fornecedores</S.Title>
        <S.HeaderButtons>
          <S.BotaoAdicionar onPress={() => setModalVisible(true)}>
            <S.BotaoAdicionarTexto>+ Adicionar</S.BotaoAdicionarTexto>
          </S.BotaoAdicionar>
          <S.BotaoAtualizar onPress={buscarClientes}>
            <S.BotaoAtualizarTexto>🔄</S.BotaoAtualizarTexto>
          </S.BotaoAtualizar>
        </S.HeaderButtons>
      </S.Header>

      <S.SearchContainer>
        <S.SearchInput
          placeholder="Pesquisar fornecedores..."
          value={pesquisa}
          onChangeText={filtrarClientes}
          placeholderTextColor="#999"
        />
      </S.SearchContainer>

      {loading ? (
        <S.LoadingContainer>
          <S.LoadingText>Carregando fornecedores...</S.LoadingText>
        </S.LoadingContainer>
      ) : clientesFiltrados.length === 0 ? (
        <S.EmptyContainer>
          <S.EmptyText>
            {pesquisa ? 'Nenhum fornecedor encontrado para a pesquisa' : 'Nenhum fornecedor encontrado'}
          </S.EmptyText>
          <S.EmptySubtext>
            {pesquisa ? 'Tente uma pesquisa diferente' : 'Verifique se a API está rodando ou adicione alguns fornecedores'}
          </S.EmptySubtext>
        </S.EmptyContainer>
      ) : (
        <S.Lista
          data={clientesFiltrados}
          renderItem={renderCliente}
          keyExtractor={(item: Cliente) => item.codigo.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Modal para adicionar cliente */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <S.ModalOverlay>
          <S.ModalContent>
            <S.ModalTitle>
              {clienteEditando ? 'Editar Fornecedor' : 'Adicionar Novo Fornecedor'}
            </S.ModalTitle>
            
            <S.ModalForm>
              <S.Input
                placeholder="Nome *"
                value={novoCliente.nome}
                onChangeText={(text: string) => setNovoCliente({...novoCliente, nome: text})}
                placeholderTextColor="#999"
              />
              
              <S.Input
                placeholder="Email *"
                value={novoCliente.email}
                onChangeText={(text: string) => setNovoCliente({...novoCliente, email: text})}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
              
              <S.Input
                placeholder="Telefone"
                value={novoCliente.telefone}
                onChangeText={(text: string) => setNovoCliente({...novoCliente, telefone: text})}
                keyboardType="phone-pad"
                placeholderTextColor="#999"
              />
              
              <S.CheckboxContainer>
                <S.Checkbox
                  checked={novoCliente.ativo}
                  onPress={() => setNovoCliente({...novoCliente, ativo: !novoCliente.ativo})}
                >
                  <S.CheckboxText>✓</S.CheckboxText>
                </S.Checkbox>
                <S.CheckboxLabel>Fornecedor ativo</S.CheckboxLabel>
              </S.CheckboxContainer>
            </S.ModalForm>
            
            <S.ModalButtons>
              <S.CancelButton
                onPress={() => {
                  setModalVisible(false);
                  setNovoCliente({ nome: '', email: '', telefone: '', ativo: true, foto: '' });
                  setClienteEditando(null);
                }}
              >
                <S.CancelButtonText>Cancelar</S.CancelButtonText>
              </S.CancelButton>
              
              <S.SaveButton onPress={adicionarCliente}>
                <S.SaveButtonText>
                  {clienteEditando ? 'Atualizar' : 'Salvar'}
                </S.SaveButtonText>
              </S.SaveButton>
            </S.ModalButtons>
          </S.ModalContent>
        </S.ModalOverlay>
      </Modal>
    </S.Container>
  );
}

// Estilos movidos para about.styles.tsx usando styled-components

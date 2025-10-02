import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput, Modal, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

// Interface para o cliente
interface Cliente {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;
  ativo: boolean;
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
    ativo: true
  });

  // URL da API (ajuste conforme necessário)
  const API_URL = 'http://localhost:3000';

  // Função para buscar clientes
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

  // Função para filtrar clientes
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

  // Função para adicionar/editar cliente
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
        const successMessage = isEditando ? 'Cliente editado com sucesso!' : 'Cliente adicionado com sucesso!';
        Alert.alert('Sucesso', successMessage);
        setNovoCliente({ nome: '', email: '', telefone: '', ativo: true });
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

  // Função para alternar status do cliente
  const alternarStatusCliente = async (codigo: number, ativo: boolean) => {
    try {
      console.log(`Alterando status do cliente ${codigo} de ${ativo} para ${!ativo}`);
      
      const response = await fetch(`${API_URL}/clientes/${codigo}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ativo: !ativo }),
      });

      console.log('Resposta da API:', response.status);

      if (response.ok) {
        Alert.alert('Sucesso', `Cliente ${!ativo ? 'ativado' : 'desativado'} com sucesso!`);
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

  // Função para excluir cliente
  const excluirCliente = async (codigo: number) => {
    console.log('=== BOTÃO DELETAR CLICADO ===');
    console.log('Código do cliente:', codigo);
    console.log('API URL:', `${API_URL}/clientes/${codigo}`);
    
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir o cliente ${codigo}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log(`Executando exclusão do cliente ${codigo}`);
              console.log('Fazendo requisição DELETE para:', `${API_URL}/clientes/${codigo}`);
              
              const response = await fetch(`${API_URL}/clientes/${codigo}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              
              console.log('Resposta da API:', response.status);
              console.log('Response OK:', response.ok);

              if (response.ok) {
                const result = await response.json();
                console.log('Resultado da exclusão:', result);
                Alert.alert('Sucesso', 'Cliente excluído com sucesso!');
                buscarClientes(); // Recarregar lista
              } else {
                const errorData = await response.json();
                console.error('Erro da API:', errorData);
                Alert.alert('Erro', `Não foi possível excluir: ${errorData.error || 'Erro desconhecido'}`);
              }
            } catch (error) {
              console.error('Erro ao excluir cliente:', error);
              Alert.alert('Erro', `Erro de conexão: ${error instanceof Error ? error.message : 'Erro desconhecido'}\n\nVerifique se a API está rodando.`);
            }
          },
        },
      ]
    );
  };

  // Função para editar cliente
  const editarCliente = async (codigo: number) => {
    console.log('=== BOTÃO EDITAR CLICADO ===');
    console.log('Código do cliente:', codigo);
    
    try {
      // Buscar dados do cliente
      const response = await fetch(`${API_URL}/clientes/${codigo}`);
      
      if (response.ok) {
        const cliente = await response.json();
        console.log('Cliente encontrado:', cliente);
        
        // Mostrar modal de edição
        setNovoCliente({
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone || '',
          ativo: cliente.ativo
        });
        setModalVisible(true);
        
        // Armazenar código do cliente para edição
        setClienteEditando(codigo);
      } else {
        Alert.alert('Erro', 'Cliente não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      Alert.alert('Erro', `Erro ao buscar cliente: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  // Carregar clientes quando a tela for montada
  useEffect(() => {
    buscarClientes();
  }, []);

  // Recarregar clientes sempre que a tela for focada (quando voltar de outras telas)
  useFocusEffect(
    React.useCallback(() => {
      buscarClientes();
    }, [])
  );

  // Função para renderizar cada item da lista
  const renderCliente = ({ item }: { item: Cliente }) => (
    <View style={[styles.clienteCard, !item.ativo && styles.clienteInativo]}>
      <View style={styles.clienteHeader}>
        <View style={styles.clienteInfo}>
          <Text style={[styles.clienteNome, !item.ativo && styles.textoInativo]}>{item.nome}</Text>
          <Text style={[styles.clienteEmail, !item.ativo && styles.textoInativo]}>{item.email}</Text>
          {item.telefone && (
            <Text style={[styles.clienteTelefone, !item.ativo && styles.textoInativo]}>{item.telefone}</Text>
          )}
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.ativo ? '#4CAF50' : '#F44336' }]}>
          <Text style={styles.statusText}>{item.ativo ? 'Ativo' : 'Inativo'}</Text>
        </View>
      </View>
      
      <View style={styles.botoesContainer}>
        <TouchableOpacity 
          style={styles.botaoEditar}
          onPress={() => editarCliente(item.codigo)}
        >
          <Text style={styles.botaoTexto}>✏️ Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.botaoStatus, { backgroundColor: item.ativo ? '#FF9800' : '#4CAF50' }]}
          onPress={() => alternarStatusCliente(item.codigo, item.ativo)}
        >
          <Text style={styles.botaoTexto}>{item.ativo ? '⏸️ Desativar' : '▶️ Ativar'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.botaoExcluir}
          onPress={() => excluirCliente(item.codigo)}
        >
          <Text style={styles.botaoTexto}>🗑️ Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Clientes</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.botaoAdicionar} onPress={() => setModalVisible(true)}>
            <Text style={styles.botaoAdicionarTexto}>+ Adicionar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoAtualizar} onPress={buscarClientes}>
            <Text style={styles.botaoAtualizarTexto}>🔄</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar clientes..."
          value={pesquisa}
          onChangeText={filtrarClientes}
          placeholderTextColor="#999"
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando clientes...</Text>
        </View>
      ) : clientesFiltrados.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {pesquisa ? 'Nenhum cliente encontrado para a pesquisa' : 'Nenhum cliente encontrado'}
          </Text>
          <Text style={styles.emptySubtext}>
            {pesquisa ? 'Tente uma pesquisa diferente' : 'Verifique se a API está rodando ou adicione alguns clientes'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={clientesFiltrados}
          renderItem={renderCliente}
          keyExtractor={(item) => item.codigo.toString()}
          style={styles.lista}
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {clienteEditando ? 'Editar Cliente' : 'Adicionar Novo Cliente'}
            </Text>
            
            <ScrollView style={styles.modalForm}>
              <TextInput
                style={styles.input}
                placeholder="Nome *"
                value={novoCliente.nome}
                onChangeText={(text) => setNovoCliente({...novoCliente, nome: text})}
                placeholderTextColor="#999"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Email *"
                value={novoCliente.email}
                onChangeText={(text) => setNovoCliente({...novoCliente, email: text})}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Telefone"
                value={novoCliente.telefone}
                onChangeText={(text) => setNovoCliente({...novoCliente, telefone: text})}
                keyboardType="phone-pad"
                placeholderTextColor="#999"
              />
              
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={[styles.checkbox, novoCliente.ativo && styles.checkboxChecked]}
                  onPress={() => setNovoCliente({...novoCliente, ativo: !novoCliente.ativo})}
                >
                  <Text style={styles.checkboxText}>✓</Text>
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Cliente ativo</Text>
              </View>
            </ScrollView>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setNovoCliente({ nome: '', email: '', telefone: '', ativo: true });
                  setClienteEditando(null);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={adicionarCliente}
              >
                <Text style={styles.saveButtonText}>
                  {clienteEditando ? 'Atualizar' : 'Salvar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoAdicionar: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  botaoAdicionarTexto: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  botaoAtualizar: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  botaoAtualizarTexto: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  lista: {
    flex: 1,
    padding: 10,
  },
  clienteCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  clienteInativo: {
    backgroundColor: '#f5f5f5',
    opacity: 0.7,
  },
  textoInativo: {
    color: '#999',
  },
  clienteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  clienteInfo: {
    flex: 1,
    marginRight: 10,
  },
  clienteNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  clienteEmail: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  clienteTelefone: {
    fontSize: 12,
    color: '#666',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
    gap: 2,
  },
  botaoEditar: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    minWidth: 40,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoStatus: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    minWidth: 40,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoExcluir: {
    backgroundColor: '#F44336',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    minWidth: 40,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalForm: {
    maxHeight: 300,
  },
  input: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkboxText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

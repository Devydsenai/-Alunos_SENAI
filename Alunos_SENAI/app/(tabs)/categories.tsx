import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Interface para categoria
interface Categoria {
  codigo: number;
  nome: string;
  descricao?: string;
  ativo: boolean;
}

export default function CategoriesScreen() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState<number | null>(null);
  const [novaCategoria, setNovaCategoria] = useState({
    nome: '',
    descricao: '',
    ativo: true,
  });

  const API_URL = 'http://localhost:3000';

  // Buscar categorias
  const buscarCategorias = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/categorias`);
      if (response.ok) {
        const data = await response.json();
        setCategorias(data);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar as categorias');
      }
    } catch (error) {
      Alert.alert('Erro', 'Verifique se a API está rodando');
      console.error('Erro ao buscar categorias:', error);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar/Editar categoria
  const salvarCategoria = async () => {
    if (!novaCategoria.nome) {
      Alert.alert('Erro', 'Nome é obrigatório');
      return;
    }

    try {
      const isEditando = categoriaEditando !== null;
      const url = isEditando
        ? `${API_URL}/categorias/${categoriaEditando}`
        : `${API_URL}/categorias`;
      const method = isEditando ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaCategoria),
      });

      if (response.ok) {
        Alert.alert(
          'Sucesso',
          isEditando ? 'Categoria atualizada!' : 'Categoria criada!'
        );
        setNovaCategoria({ nome: '', descricao: '', ativo: true });
        setCategoriaEditando(null);
        setModalVisible(false);
        buscarCategorias();
      } else {
        const error = await response.json();
        Alert.alert('Erro', error.error || 'Não foi possível salvar');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar categoria');
      console.error(error);
    }
  };

  // Editar categoria
  const editarCategoria = async (codigo: number) => {
    try {
      const response = await fetch(`${API_URL}/categorias/${codigo}`);
      if (response.ok) {
        const categoria = await response.json();
        setNovaCategoria({
          nome: categoria.nome,
          descricao: categoria.descricao || '',
          ativo: categoria.ativo,
        });
        setCategoriaEditando(codigo);
        setModalVisible(true);
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar categoria');
    }
  };

  // Deletar categoria (COPIADO DA FUNÇÃO QUE FUNCIONA EM about.tsx)
  const deletarCategoria = async (codigo: number, nome: string) => {
    console.log('=== BOTÃO DELETAR CLICADO ===');
    console.log('API URL:', API_URL);
    console.log('Categoria selecionada:', { codigo, nome });
    
    try {
      console.log('1. Testando DELETE para categoria:', codigo);
      console.log('URL de delete:', `${API_URL}/categorias/${codigo}`);
      
      const deleteResponse = await fetch(`${API_URL}/categorias/${codigo}`, {
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
        Alert.alert('Sucesso!', `Categoria ${nome} (código: ${codigo}) foi deletada com sucesso!`);
        buscarCategorias(); // Recarregar lista
      } else {
        Alert.alert('Erro no DELETE', `Status: ${deleteResponse.status}\nErro: ${deleteResult.error || 'Erro desconhecido'}`);
      }
      
    } catch (error) {
      console.error('Erro no teste de delete:', error);
      Alert.alert('Erro de Conexão', `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}\n\nVerifique se a API está rodando.`);
    }
  };

  useEffect(() => {
    buscarCategorias();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      buscarCategorias();
    }, [])
  );

  const renderCategoria = ({ item }: { item: Categoria }) => (
    <View style={[styles.card, !item.ativo && styles.cardInativo]}>
      <View style={styles.cardHeader}>
        <View style={styles.cardInfo}>
          <Text style={[styles.cardNome, !item.ativo && styles.textoInativo]}>
            {item.nome}
          </Text>
          {item.descricao && (
            <Text style={[styles.cardDescricao, !item.ativo && styles.textoInativo]}>
              {item.descricao}
            </Text>
          )}
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: item.ativo ? '#4CAF50' : '#F44336' },
          ]}
        >
          <Text style={styles.statusText}>{item.ativo ? 'Ativa' : 'Inativa'}</Text>
        </View>
      </View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.botaoEditar}
          onPress={() => editarCategoria(item.codigo)}
        >
          <Ionicons name="pencil" size={14} color="#fff" />
          <Text style={styles.botaoTexto}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoDeletar}
          onPress={() => deletarCategoria(item.codigo, item.nome)}
        >
          <Ionicons name="trash" size={14} color="#fff" />
          <Text style={styles.botaoTexto}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categorias</Text>
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.botaoAdicionarTexto}>Nova</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      ) : categorias.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="folder-open-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Nenhuma categoria cadastrada</Text>
          <Text style={styles.emptySubtext}>Crie uma categoria para começar</Text>
        </View>
      ) : (
        <FlatList
          data={categorias}
          renderItem={renderCategoria}
          keyExtractor={(item) => item.codigo.toString()}
          style={styles.lista}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {categoriaEditando ? 'Editar Categoria' : 'Nova Categoria'}
            </Text>

            <ScrollView style={styles.modalForm}>
              <TextInput
                style={styles.input}
                placeholder="Nome da Categoria *"
                value={novaCategoria.nome}
                onChangeText={(text) =>
                  setNovaCategoria({ ...novaCategoria, nome: text })
                }
                placeholderTextColor="#999"
              />

              <TextInput
                style={[styles.input, styles.inputMultiline]}
                placeholder="Descrição (opcional)"
                value={novaCategoria.descricao}
                onChangeText={(text) =>
                  setNovaCategoria({ ...novaCategoria, descricao: text })
                }
                multiline
                numberOfLines={3}
                placeholderTextColor="#999"
              />

              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    novaCategoria.ativo && styles.checkboxChecked,
                  ]}
                  onPress={() =>
                    setNovaCategoria({ ...novaCategoria, ativo: !novaCategoria.ativo })
                  }
                >
                  <Text style={styles.checkboxText}>✓</Text>
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Categoria ativa</Text>
              </View>
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setNovaCategoria({ nome: '', descricao: '', ativo: true });
                  setCategoriaEditando(null);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={salvarCategoria}
              >
                <Text style={styles.saveButtonText}>Salvar</Text>
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
  },
  botaoAdicionar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 5,
  },
  botaoAdicionarTexto: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  lista: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardInativo: {
    backgroundColor: '#f5f5f5',
    opacity: 0.7,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardInfo: {
    flex: 1,
    marginRight: 10,
  },
  cardNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardDescricao: {
    fontSize: 14,
    color: '#666',
  },
  textoInativo: {
    color: '#999',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  botoesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  botaoEditar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  botaoDeletar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F44336',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Modal
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
  inputMultiline: {
    height: 80,
    textAlignVertical: 'top',
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


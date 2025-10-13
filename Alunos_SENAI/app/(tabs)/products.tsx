import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { buscarProdutoPorCodigoBarras } from '../services/codigoBarras';

interface Categoria {
  codigo: number;
  nome: string;
}

interface Fornecedor {
  codigo: number;
  nome: string;
}

interface Produto {
  codigo: number;
  nome: string;
  descricao?: string;
  categoria_id?: number;
  fornecedor_id?: number;
  foto?: string;
  codigo_barras?: string;
  preco_custo: number;
  preco_venda: number;
  estoque_minimo: number;
  ativo: boolean;
  categoria?: Categoria;
  fornecedor?: Fornecedor;
}

export default function ProductsScreen() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<number | null>(null);
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    descricao: '',
    categoria_id: 0,
    fornecedor_id: 0,
    foto: '',
    codigo_barras: '',
    preco_custo: '0',
    preco_venda: '0',
    estoque_minimo: '0',
    ativo: true,
  });

  const API_URL = 'http://localhost:3000';

  // Buscar produtos
  const buscarProdutos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/produtos`);
      if (response.ok) {
        const data = await response.json();
        setProdutos(data);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Buscar categorias
  const buscarCategorias = async () => {
    try {
      const response = await fetch(`${API_URL}/categorias`);
      if (response.ok) {
        const data = await response.json();
        setCategorias(data.filter((c: Categoria) => c));
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  // Buscar fornecedores
  const buscarFornecedores = async () => {
    try {
      const response = await fetch(`${API_URL}/clientes`);
      if (response.ok) {
        const data = await response.json();
        setFornecedores(data);
      }
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
    }
  };

  // Tirar foto
  const tirarFoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'Precisamos de permissão para acessar a câmera');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.5,
      });

      if (!result.canceled && result.assets[0]) {
        setNovoProduto({ ...novoProduto, foto: result.assets[0].uri });
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível tirar a foto');
    }
  };

  // Selecionar da galeria
  const selecionarImagem = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'Precisamos de permissão para acessar a galeria');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.5,
      });

      if (!result.canceled && result.assets[0]) {
        setNovoProduto({ ...novoProduto, foto: result.assets[0].uri });
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    }
  };

  // Buscar por código de barras
  const buscarCodigoBarras = async () => {
    if (!novoProduto.codigo_barras) {
      Alert.alert('Erro', 'Digite o código de barras');
      return;
    }

    try {
      const produto = await buscarProdutoPorCodigoBarras(novoProduto.codigo_barras);
      if (produto && produto.product_name) {
        Alert.alert(
          'Produto Encontrado',
          `${produto.product_name}\n${produto.brands || ''}`,
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Usar Nome',
              onPress: () => {
                setNovoProduto({
                  ...novoProduto,
                  nome: produto.product_name || '',
                  descricao: produto.categories || '',
                });
              },
            },
          ]
        );
      } else {
        Alert.alert('Não encontrado', 'Produto não encontrado na base de dados');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar código de barras');
    }
  };

  // Salvar produto
  const salvarProduto = async () => {
    if (!novoProduto.nome) {
      Alert.alert('Erro', 'Nome é obrigatório');
      return;
    }

    try {
      const isEditando = produtoEditando !== null;
      const url = isEditando
        ? `${API_URL}/produtos/${produtoEditando}`
        : `${API_URL}/produtos`;
      const method = isEditando ? 'PUT' : 'POST';

      const dados = {
        ...novoProduto,
        categoria_id: novoProduto.categoria_id || null,
        fornecedor_id: novoProduto.fornecedor_id || null,
        preco_custo: parseFloat(novoProduto.preco_custo) || 0,
        preco_venda: parseFloat(novoProduto.preco_venda) || 0,
        estoque_minimo: parseInt(novoProduto.estoque_minimo) || 0,
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        Alert.alert('Sucesso', isEditando ? 'Produto atualizado!' : 'Produto criado!');
        setNovoProduto({
          nome: '',
          descricao: '',
          categoria_id: 0,
          fornecedor_id: 0,
          foto: '',
          codigo_barras: '',
          preco_custo: '0',
          preco_venda: '0',
          estoque_minimo: '0',
          ativo: true,
        });
        setProdutoEditando(null);
        setModalVisible(false);
        buscarProdutos();
      } else {
        Alert.alert('Erro', 'Não foi possível salvar');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar produto');
    }
  };

  // Deletar produto (COPIADO DA FUNÇÃO QUE FUNCIONA EM about.tsx)
  const deletarProduto = async (codigo: number, nome: string) => {
    console.log('=== BOTÃO DELETAR CLICADO ===');
    console.log('API URL:', API_URL);
    console.log('Produto selecionado:', { codigo, nome });
    
    try {
      console.log('1. Testando DELETE para produto:', codigo);
      console.log('URL de delete:', `${API_URL}/produtos/${codigo}`);
      
      const deleteResponse = await fetch(`${API_URL}/produtos/${codigo}`, {
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
        Alert.alert('Sucesso!', `Produto ${nome} (código: ${codigo}) foi deletado com sucesso!`);
        buscarProdutos(); // Recarregar lista
      } else {
        Alert.alert('Erro no DELETE', `Status: ${deleteResponse.status}\nErro: ${deleteResult.error || 'Erro desconhecido'}`);
      }
      
    } catch (error) {
      console.error('Erro no teste de delete:', error);
      Alert.alert('Erro de Conexão', `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}\n\nVerifique se a API está rodando.`);
    }
  };

  // Editar produto
  const editarProduto = async (codigo: number) => {
    try {
      const response = await fetch(`${API_URL}/produtos/${codigo}`);
      if (response.ok) {
        const produto = await response.json();
        setNovoProduto({
          nome: produto.nome,
          descricao: produto.descricao || '',
          categoria_id: produto.categoria_id || 0,
          fornecedor_id: produto.fornecedor_id || 0,
          foto: produto.foto || '',
          codigo_barras: produto.codigo_barras || '',
          preco_custo: produto.preco_custo?.toString() || '0',
          preco_venda: produto.preco_venda?.toString() || '0',
          estoque_minimo: produto.estoque_minimo?.toString() || '0',
          ativo: produto.ativo,
        });
        setProdutoEditando(codigo);
        setModalVisible(true);
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar produto');
    }
  };

  useEffect(() => {
    buscarProdutos();
    buscarCategorias();
    buscarFornecedores();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      buscarProdutos();
    }, [])
  );

  const renderProduto = ({ item }: { item: Produto }) => (
    <View style={[styles.card, !item.ativo && styles.cardInativo]}>
      <View style={styles.cardContent}>
        {item.foto ? (
          <Image source={{ uri: item.foto }} style={styles.produtoFoto} />
        ) : (
          <View style={styles.produtoSemFoto}>
            <Ionicons name="cube-outline" size={40} color="#ccc" />
          </View>
        )}

        <View style={styles.produtoInfo}>
          <Text style={[styles.produtoNome, !item.ativo && styles.textoInativo]}>
            {item.nome}
          </Text>
          {item.descricao && (
            <Text style={[styles.produtoDescricao, !item.ativo && styles.textoInativo]}>
              {item.descricao}
            </Text>
          )}
          {item.categoria && (
            <Text style={styles.produtoCategoria}>📁 {item.categoria.nome}</Text>
          )}
          {item.fornecedor && (
            <Text style={styles.produtoFornecedor}>🏢 {item.fornecedor.nome}</Text>
          )}
          <View style={styles.precosContainer}>
            <Text style={styles.preco}>💰 R$ {item.preco_venda?.toFixed(2)}</Text>
            {item.codigo_barras && (
              <Text style={styles.codigoBarras}>📊 {item.codigo_barras}</Text>
            )}
          </View>
        </View>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: item.ativo ? '#4CAF50' : '#F44336' },
          ]}
        >
          <Text style={styles.statusText}>{item.ativo ? 'Ativo' : 'Inativo'}</Text>
        </View>
      </View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.botaoEditar}
          onPress={() => editarProduto(item.codigo)}
        >
          <Ionicons name="pencil" size={14} color="#fff" />
          <Text style={styles.botaoTexto}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoDeletar}
          onPress={() => deletarProduto(item.codigo, item.nome)}
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
        <Text style={styles.title}>Produtos</Text>
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.botaoAdicionarTexto}>Novo</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      ) : produtos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cube-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Nenhum produto cadastrado</Text>
        </View>
      ) : (
        <FlatList
          data={produtos}
          renderItem={renderProduto}
          keyExtractor={(item) => item.codigo.toString()}
          style={styles.lista}
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
              {produtoEditando ? 'Editar Produto' : 'Novo Produto'}
            </Text>

            <ScrollView style={styles.modalForm}>
              {/* Foto */}
              <View style={styles.fotoContainer}>
                {novoProduto.foto ? (
                  <Image source={{ uri: novoProduto.foto }} style={styles.fotoPreview} />
                ) : (
                  <View style={styles.semFoto}>
                    <Ionicons name="cube-outline" size={60} color="#ccc" />
                  </View>
                )}
                <View style={styles.fotoBotoes}>
                  <TouchableOpacity style={styles.botaoFoto} onPress={tirarFoto}>
                    <Ionicons name="camera" size={18} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.botaoGaleria} onPress={selecionarImagem}>
                    <Ionicons name="images" size={18} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Nome do Produto *"
                value={novoProduto.nome}
                onChangeText={(text) => setNovoProduto({ ...novoProduto, nome: text })}
                placeholderTextColor="#999"
              />

              <TextInput
                style={[styles.input, styles.inputMultiline]}
                placeholder="Descrição"
                value={novoProduto.descricao}
                onChangeText={(text) => setNovoProduto({ ...novoProduto, descricao: text })}
                multiline
                numberOfLines={2}
                placeholderTextColor="#999"
              />

              {/* Código de Barras */}
              <View style={styles.codigoBarrasContainer}>
                <TextInput
                  style={[styles.input, { flex: 1, marginBottom: 0 }]}
                  placeholder="Código de Barras"
                  value={novoProduto.codigo_barras}
                  onChangeText={(text) =>
                    setNovoProduto({ ...novoProduto, codigo_barras: text })
                  }
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
                <TouchableOpacity
                  style={styles.botaoBuscarCodigo}
                  onPress={buscarCodigoBarras}
                >
                  <Ionicons name="search" size={20} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Categoria */}
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Categoria:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {categorias.map((cat) => (
                    <TouchableOpacity
                      key={cat.codigo}
                      style={[
                        styles.pickerItem,
                        novoProduto.categoria_id === cat.codigo && styles.pickerItemSelected,
                      ]}
                      onPress={() =>
                        setNovoProduto({ ...novoProduto, categoria_id: cat.codigo })
                      }
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          novoProduto.categoria_id === cat.codigo &&
                            styles.pickerItemTextSelected,
                        ]}
                      >
                        {cat.nome}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Fornecedor */}
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Fornecedor:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {fornecedores.map((forn) => (
                    <TouchableOpacity
                      key={forn.codigo}
                      style={[
                        styles.pickerItem,
                        novoProduto.fornecedor_id === forn.codigo && styles.pickerItemSelected,
                      ]}
                      onPress={() =>
                        setNovoProduto({ ...novoProduto, fornecedor_id: forn.codigo })
                      }
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          novoProduto.fornecedor_id === forn.codigo &&
                            styles.pickerItemTextSelected,
                        ]}
                      >
                        {forn.nome}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.row}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Preço Custo"
                  value={novoProduto.preco_custo}
                  onChangeText={(text) =>
                    setNovoProduto({ ...novoProduto, preco_custo: text })
                  }
                  keyboardType="decimal-pad"
                  placeholderTextColor="#999"
                />
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Preço Venda"
                  value={novoProduto.preco_venda}
                  onChangeText={(text) =>
                    setNovoProduto({ ...novoProduto, preco_venda: text })
                  }
                  keyboardType="decimal-pad"
                  placeholderTextColor="#999"
                />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Estoque Mínimo"
                value={novoProduto.estoque_minimo}
                onChangeText={(text) =>
                  setNovoProduto({ ...novoProduto, estoque_minimo: text })
                }
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setNovoProduto({
                    nome: '',
                    descricao: '',
                    categoria_id: 0,
                    fornecedor_id: 0,
                    foto: '',
                    codigo_barras: '',
                    preco_custo: '0',
                    preco_venda: '0',
                    estoque_minimo: '0',
                    ativo: true,
                  });
                  setProdutoEditando(null);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={salvarProduto}
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
  lista: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  cardInativo: {
    opacity: 0.6,
  },
  cardContent: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  produtoFoto: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  produtoSemFoto: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  produtoInfo: {
    flex: 1,
  },
  produtoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  produtoDescricao: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  produtoCategoria: {
    fontSize: 11,
    color: '#2196F3',
  },
  produtoFornecedor: {
    fontSize: 11,
    color: '#9C27B0',
  },
  precosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  preco: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  codigoBarras: {
    fontSize: 10,
    color: '#999',
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
    width: '95%',
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalForm: {
    maxHeight: 500,
  },
  fotoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  fotoPreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  semFoto: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  fotoBotoes: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoFoto: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 8,
  },
  botaoGaleria: {
    backgroundColor: '#9C27B0',
    padding: 8,
    borderRadius: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputMultiline: {
    height: 60,
    textAlignVertical: 'top',
  },
  codigoBarrasContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  botaoBuscarCodigo: {
    backgroundColor: '#FF9800',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
  },
  pickerContainer: {
    marginBottom: 12,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  pickerItem: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  pickerItemSelected: {
    backgroundColor: '#4CAF50',
  },
  pickerItemText: {
    fontSize: 12,
    color: '#666',
  },
  pickerItemTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
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

import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, ScrollView } from 'react-native';
import { buscarProdutoPorCodigoBarras } from '../services/codigoBarras';
import * as S from './products.styles';

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
    <S.Card inativo={!item.ativo}>
      <S.CardContent>
        {item.foto ? (
          <S.ProdutoFoto source={{ uri: item.foto }} />
        ) : (
          <S.ProdutoSemFoto>
            <Ionicons name="cube-outline" size={40} color="#ccc" />
          </S.ProdutoSemFoto>
        )}

        <S.ProdutoInfo>
          <S.ProdutoNome inativo={!item.ativo}>
            {item.nome}
          </S.ProdutoNome>
          {item.descricao && (
            <S.ProdutoDescricao inativo={!item.ativo}>
              {item.descricao}
            </S.ProdutoDescricao>
          )}
          {item.categoria && (
            <S.ProdutoCategoria>📁 {item.categoria.nome}</S.ProdutoCategoria>
          )}
          {item.fornecedor && (
            <S.ProdutoFornecedor>🏢 {item.fornecedor.nome}</S.ProdutoFornecedor>
          )}
          <S.PrecosContainer>
            <S.Preco>💰 R$ {item.preco_venda?.toFixed(2)}</S.Preco>
            {item.codigo_barras && (
              <S.CodigoBarras>📊 {item.codigo_barras}</S.CodigoBarras>
            )}
          </S.PrecosContainer>
        </S.ProdutoInfo>

        <S.StatusBadge ativo={item.ativo}>
          <S.StatusText>{item.ativo ? 'Ativo' : 'Inativo'}</S.StatusText>
        </S.StatusBadge>
      </S.CardContent>

      <S.BotoesContainer>
        <S.BotaoEditar onPress={() => editarProduto(item.codigo)}>
          <Ionicons name="pencil" size={14} color="#fff" />
          <S.BotaoTexto>Editar</S.BotaoTexto>
        </S.BotaoEditar>

        <S.BotaoDeletar onPress={() => deletarProduto(item.codigo, item.nome)}>
          <Ionicons name="trash" size={14} color="#fff" />
          <S.BotaoTexto>Excluir</S.BotaoTexto>
        </S.BotaoDeletar>
      </S.BotoesContainer>
    </S.Card>
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Produtos</S.Title>
        <S.BotaoAdicionar onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle" size={24} color="#fff" />
          <S.BotaoAdicionarTexto>Novo</S.BotaoAdicionarTexto>
        </S.BotaoAdicionar>
      </S.Header>

      {loading ? (
        <S.LoadingContainer>
          <S.LoadingText>Carregando...</S.LoadingText>
        </S.LoadingContainer>
      ) : produtos.length === 0 ? (
        <S.EmptyContainer>
          <Ionicons name="cube-outline" size={64} color="#ccc" />
          <S.EmptyText>Nenhum produto cadastrado</S.EmptyText>
        </S.EmptyContainer>
      ) : (
        <S.Lista
          data={produtos}
          renderItem={renderProduto}
          keyExtractor={(item: Produto) => item.codigo.toString()}
        />
      )}

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <S.ModalOverlay>
          <S.ModalContent>
            <S.ModalTitle>
              {produtoEditando ? 'Editar Produto' : 'Novo Produto'}
            </S.ModalTitle>

            <S.ModalForm>
              {/* Foto */}
              <S.FotoContainer>
                {novoProduto.foto ? (
                  <S.FotoPreview source={{ uri: novoProduto.foto }} />
                ) : (
                  <S.SemFoto>
                    <Ionicons name="cube-outline" size={60} color="#ccc" />
                  </S.SemFoto>
                )}
                <S.FotoBotoes>
                  <S.BotaoFoto onPress={tirarFoto}>
                    <Ionicons name="camera" size={18} color="#fff" />
                  </S.BotaoFoto>
                  <S.BotaoGaleria onPress={selecionarImagem}>
                    <Ionicons name="images" size={18} color="#fff" />
                  </S.BotaoGaleria>
                </S.FotoBotoes>
              </S.FotoContainer>

              <S.Input
                placeholder="Nome do Produto *"
                value={novoProduto.nome}
                onChangeText={(text: string) => setNovoProduto({ ...novoProduto, nome: text })}
                placeholderTextColor="#999"
              />

              <S.InputMultiline
                placeholder="Descrição"
                value={novoProduto.descricao}
                onChangeText={(text: string) => setNovoProduto({ ...novoProduto, descricao: text })}
                multiline
                numberOfLines={2}
                placeholderTextColor="#999"
              />

              {/* Código de Barras */}
              <S.CodigoBarrasContainer>
                <S.Input
                  style={{ flex: 1, marginBottom: 0 }}
                  placeholder="Código de Barras"
                  value={novoProduto.codigo_barras}
                  onChangeText={(text: string) =>
                    setNovoProduto({ ...novoProduto, codigo_barras: text })
                  }
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
                <S.BotaoBuscarCodigo onPress={buscarCodigoBarras}>
                  <Ionicons name="search" size={20} color="#fff" />
                </S.BotaoBuscarCodigo>
              </S.CodigoBarrasContainer>

              {/* Categoria */}
              <S.PickerContainer>
                <S.PickerLabel>Categoria:</S.PickerLabel>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {categorias.map((cat) => (
                    <S.PickerItem
                      key={cat.codigo}
                      selected={novoProduto.categoria_id === cat.codigo}
                      onPress={() =>
                        setNovoProduto({ ...novoProduto, categoria_id: cat.codigo })
                      }
                    >
                      <S.PickerItemText selected={novoProduto.categoria_id === cat.codigo}>
                        {cat.nome}
                      </S.PickerItemText>
                    </S.PickerItem>
                  ))}
                </ScrollView>
              </S.PickerContainer>

              {/* Fornecedor */}
              <S.PickerContainer>
                <S.PickerLabel>Fornecedor:</S.PickerLabel>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {fornecedores.map((forn) => (
                    <S.PickerItem
                      key={forn.codigo}
                      selected={novoProduto.fornecedor_id === forn.codigo}
                      onPress={() =>
                        setNovoProduto({ ...novoProduto, fornecedor_id: forn.codigo })
                      }
                    >
                      <S.PickerItemText selected={novoProduto.fornecedor_id === forn.codigo}>
                        {forn.nome}
                      </S.PickerItemText>
                    </S.PickerItem>
                  ))}
                </ScrollView>
              </S.PickerContainer>

              <S.Row>
                <S.Input
                  style={{ flex: 1 }}
                  placeholder="Preço Custo"
                  value={novoProduto.preco_custo}
                  onChangeText={(text: string) =>
                    setNovoProduto({ ...novoProduto, preco_custo: text })
                  }
                  keyboardType="decimal-pad"
                  placeholderTextColor="#999"
                />
                <S.Input
                  style={{ flex: 1 }}
                  placeholder="Preço Venda"
                  value={novoProduto.preco_venda}
                  onChangeText={(text: string) =>
                    setNovoProduto({ ...novoProduto, preco_venda: text })
                  }
                  keyboardType="decimal-pad"
                  placeholderTextColor="#999"
                />
              </S.Row>

              <S.Input
                placeholder="Estoque Mínimo"
                value={novoProduto.estoque_minimo}
                onChangeText={(text: string) =>
                  setNovoProduto({ ...novoProduto, estoque_minimo: text })
                }
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </S.ModalForm>

            <S.ModalButtons>
              <S.CancelButton
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
                <S.CancelButtonText>Cancelar</S.CancelButtonText>
              </S.CancelButton>

              <S.SaveButton onPress={salvarProduto}>
                <S.SaveButtonText>Salvar</S.SaveButtonText>
              </S.SaveButton>
            </S.ModalButtons>
          </S.ModalContent>
        </S.ModalOverlay>
      </Modal>
    </S.Container>
  );
}

// Estilos movidos para products.styles.tsx usando styled-components
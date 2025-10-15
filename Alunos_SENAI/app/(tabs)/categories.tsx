import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Modal } from 'react-native';
import * as S from './categories.styles';

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
    <S.Card inativo={!item.ativo}>
      <S.CardHeader>
        <S.CardInfo>
          <S.CardNome inativo={!item.ativo}>
            {item.nome}
          </S.CardNome>
          {item.descricao && (
            <S.CardDescricao inativo={!item.ativo}>
              {item.descricao}
            </S.CardDescricao>
          )}
        </S.CardInfo>
        <S.StatusBadge ativo={item.ativo}>
          <S.StatusText>{item.ativo ? 'Ativa' : 'Inativa'}</S.StatusText>
        </S.StatusBadge>
      </S.CardHeader>

      <S.BotoesContainer>
        <S.BotaoEditar onPress={() => editarCategoria(item.codigo)}>
          <Ionicons name="pencil" size={14} color="#fff" />
          <S.BotaoTexto>Editar</S.BotaoTexto>
        </S.BotaoEditar>

        <S.BotaoDeletar onPress={() => deletarCategoria(item.codigo, item.nome)}>
          <Ionicons name="trash" size={14} color="#fff" />
          <S.BotaoTexto>Excluir</S.BotaoTexto>
        </S.BotaoDeletar>
      </S.BotoesContainer>
    </S.Card>
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Categorias</S.Title>
        <S.BotaoAdicionar onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle" size={24} color="#fff" />
          <S.BotaoAdicionarTexto>Nova</S.BotaoAdicionarTexto>
        </S.BotaoAdicionar>
      </S.Header>

      {loading ? (
        <S.LoadingContainer>
          <S.LoadingText>Carregando...</S.LoadingText>
        </S.LoadingContainer>
      ) : categorias.length === 0 ? (
        <S.EmptyContainer>
          <Ionicons name="folder-open-outline" size={64} color="#ccc" />
          <S.EmptyText>Nenhuma categoria cadastrada</S.EmptyText>
          <S.EmptySubtext>Crie uma categoria para começar</S.EmptySubtext>
        </S.EmptyContainer>
      ) : (
        <S.Lista
          data={categorias}
          renderItem={renderCategoria}
          keyExtractor={(item: Categoria) => item.codigo.toString()}
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
        <S.ModalOverlay>
          <S.ModalContent>
            <S.ModalTitle>
              {categoriaEditando ? 'Editar Categoria' : 'Nova Categoria'}
            </S.ModalTitle>

            <S.ModalForm>
              <S.Input
                placeholder="Nome da Categoria *"
                value={novaCategoria.nome}
                onChangeText={(text: string) =>
                  setNovaCategoria({ ...novaCategoria, nome: text })
                }
                placeholderTextColor="#999"
              />

              <S.InputMultiline
                placeholder="Descrição (opcional)"
                value={novaCategoria.descricao}
                onChangeText={(text: string) =>
                  setNovaCategoria({ ...novaCategoria, descricao: text })
                }
                multiline
                numberOfLines={3}
                placeholderTextColor="#999"
              />

              <S.CheckboxContainer>
                <S.Checkbox
                  checked={novaCategoria.ativo}
                  onPress={() =>
                    setNovaCategoria({ ...novaCategoria, ativo: !novaCategoria.ativo })
                  }
                >
                  <S.CheckboxText>✓</S.CheckboxText>
                </S.Checkbox>
                <S.CheckboxLabel>Categoria ativa</S.CheckboxLabel>
              </S.CheckboxContainer>
            </S.ModalForm>

            <S.ModalButtons>
              <S.CancelButton
                onPress={() => {
                  setModalVisible(false);
                  setNovaCategoria({ nome: '', descricao: '', ativo: true });
                  setCategoriaEditando(null);
                }}
              >
                <S.CancelButtonText>Cancelar</S.CancelButtonText>
              </S.CancelButton>

              <S.SaveButton onPress={salvarCategoria}>
                <S.SaveButtonText>Salvar</S.SaveButtonText>
              </S.SaveButton>
            </S.ModalButtons>
          </S.ModalContent>
        </S.ModalOverlay>
      </Modal>
    </S.Container>
  );
}

// Estilos movidos para categories.styles.tsx usando styled-components


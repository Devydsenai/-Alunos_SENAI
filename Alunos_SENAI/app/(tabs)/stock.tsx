import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Modal } from 'react-native';
import * as S from './stock.styles';

interface Produto {
  codigo: number;
  nome: string;
  foto?: string;
  estoque_minimo: number;
}

interface Estoque {
  produto_id: number;
  quantidade_atual: number;
  localizacao?: string;
  data_ultima_mov?: string;
  produto: Produto;
}

export default function StockScreen() {
  const [estoques, setEstoques] = useState<Estoque[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [estoqueEditando, setEstoqueEditando] = useState<number | null>(null);
  const [quantidade, setQuantidade] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [alertaBaixo, setAlertaBaixo] = useState(false);
  const [tipoMovimentacao, setTipoMovimentacao] = useState<'entrada' | 'saida'>('entrada');
  const [estoqueAtual, setEstoqueAtual] = useState(0);

  const API_URL = 'http://localhost:3000';

  // Buscar estoque
  const buscarEstoque = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/estoque`);
      if (response.ok) {
        const data = await response.json();
        setEstoques(data);
      }
    } catch (error) {
      console.error('Erro ao buscar estoque:', error);
    } finally {
      setLoading(false);
    }
  };

  // Registrar movimentação (entrada/saída)
  const registrarMovimentacao = async (
    produto_id: number,
    tipo: 'entrada' | 'saida',
    qtd: number
  ) => {
    try {
      const response = await fetch(`${API_URL}/movimentacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo,
          produto_id,
          quantidade: qtd,
          usuario: 'Sistema',
          observacao: tipo === 'entrada' ? 'Entrada manual' : 'Saída manual',
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', `${tipo === 'entrada' ? 'Entrada' : 'Saída'} registrada!`);
        buscarEstoque();
      } else {
        Alert.alert('Erro', 'Não foi possível registrar movimentação');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao registrar movimentação');
    }
  };

  // Modal de entrada
  const abrirModalEntrada = (item: Estoque) => {
    setEstoqueEditando(item.produto_id);
    setEstoqueAtual(item.quantidade_atual);
    setTipoMovimentacao('entrada');
    setQuantidade('');
    setModalVisible(true);
  };

  // Modal de saída
  const abrirModalSaida = (item: Estoque) => {
    if (item.quantidade_atual <= 0) {
      Alert.alert('Erro', 'Estoque zerado!');
      return;
    }
    setEstoqueEditando(item.produto_id);
    setEstoqueAtual(item.quantidade_atual);
    setTipoMovimentacao('saida');
    setQuantidade('');
    setModalVisible(true);
  };

  // Confirmar movimentação (entrada ou saída)
  const confirmarMovimentacao = () => {
    const qtd = parseInt(quantidade);
    if (!qtd || qtd <= 0) {
      Alert.alert('Erro', 'Digite uma quantidade válida');
      return;
    }

    // Validar saída
    if (tipoMovimentacao === 'saida' && qtd > estoqueAtual) {
      Alert.alert('Erro', `Quantidade maior que o estoque atual (${estoqueAtual})`);
      return;
    }

    if (estoqueEditando) {
      registrarMovimentacao(estoqueEditando, tipoMovimentacao, qtd);
      setModalVisible(false);
      setQuantidade('');
    }
  };

  useEffect(() => {
    buscarEstoque();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      buscarEstoque();
    }, [])
  );

  const renderEstoque = ({ item }: { item: Estoque }) => {
    const estoqueBaixo = item.quantidade_atual <= item.produto.estoque_minimo;

    return (
      <S.Card alerta={estoqueBaixo}>
        <S.CardContent>
          {item.produto.foto ? (
            <S.ProdutoFoto source={{ uri: item.produto.foto }} />
          ) : (
            <S.ProdutoSemFoto>
              <Ionicons name="cube-outline" size={30} color="#ccc" />
            </S.ProdutoSemFoto>
          )}

          <S.ProdutoInfo>
            <S.ProdutoNome>{item.produto.nome}</S.ProdutoNome>
            {item.localizacao && (
              <S.Localizacao>{item.localizacao}</S.Localizacao>
            )}
            <S.EstoqueInfo>
              <S.Quantidade baixo={estoqueBaixo}>
                Estoque: {item.quantidade_atual}
              </S.Quantidade>
              <S.MinimoText>Mínimo: {item.produto.estoque_minimo}</S.MinimoText>
            </S.EstoqueInfo>
            {item.data_ultima_mov && (
              <S.DataText>
                Última movimentação: {new Date(item.data_ultima_mov).toLocaleDateString()}
              </S.DataText>
            )}
          </S.ProdutoInfo>

          {estoqueBaixo && (
            <S.AlertaBadge>
              <Ionicons name="warning" size={20} color="#FFF" />
            </S.AlertaBadge>
          )}
        </S.CardContent>

        <S.BotoesContainer>
          <S.BotaoEntrada onPress={() => abrirModalEntrada(item)}>
            <Ionicons name="arrow-down-circle" size={16} color="#fff" />
            <S.BotaoTexto>Entrada</S.BotaoTexto>
          </S.BotaoEntrada>

          <S.BotaoSaida
            onPress={() => abrirModalSaida(item)}
            disabled={item.quantidade_atual <= 0}
          >
            <Ionicons name="arrow-up-circle" size={16} color="#fff" />
            <S.BotaoTexto>Saída</S.BotaoTexto>
          </S.BotaoSaida>
        </S.BotoesContainer>
      </S.Card>
    );
  };

  // Filtrar produtos com estoque baixo
  const estoqueBaixo = estoques.filter(
    (e) => e.quantidade_atual <= e.produto.estoque_minimo
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Estoque</S.Title>
        <S.BotaoFiltro onPress={() => setAlertaBaixo(!alertaBaixo)}>
          <Ionicons
            name={alertaBaixo ? 'funnel' : 'funnel-outline'}
            size={20}
            color="#fff"
          />
          <S.BotaoFiltroTexto>
            Baixo ({estoqueBaixo.length})
          </S.BotaoFiltroTexto>
        </S.BotaoFiltro>
      </S.Header>

      {/* Resumo */}
      <S.Resumo>
        <S.ResumoItem>
          <S.ResumoValor>{estoques.length}</S.ResumoValor>
          <S.ResumoLabel>Produtos</S.ResumoLabel>
        </S.ResumoItem>
        <S.ResumoDivider />
        <S.ResumoItem>
          <S.ResumoValor alerta>
            {estoqueBaixo.length}
          </S.ResumoValor>
          <S.ResumoLabel>Estoque Baixo</S.ResumoLabel>
        </S.ResumoItem>
        <S.ResumoDivider />
        <S.ResumoItem>
          <S.ResumoValor>
            {estoques.reduce((acc, e) => acc + e.quantidade_atual, 0)}
          </S.ResumoValor>
          <S.ResumoLabel>Total Itens</S.ResumoLabel>
        </S.ResumoItem>
      </S.Resumo>

      {loading ? (
        <S.LoadingContainer>
          <S.LoadingText>Carregando...</S.LoadingText>
        </S.LoadingContainer>
      ) : estoques.length === 0 ? (
        <S.EmptyContainer>
          <Ionicons name="archive-outline" size={64} color="#ccc" />
          <S.EmptyText>Nenhum produto em estoque</S.EmptyText>
          <S.EmptySubtext>Cadastre produtos primeiro</S.EmptySubtext>
        </S.EmptyContainer>
      ) : (
        <S.Lista
          data={alertaBaixo ? estoqueBaixo : estoques}
          renderItem={renderEstoque}
          keyExtractor={(item: Estoque) => item.produto_id.toString()}
        />
      )}

      {/* Modal de Movimentação */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <S.ModalOverlay>
          <S.ModalContent>
            <S.ModalTitle>
              {tipoMovimentacao === 'entrada' ? 'Entrada de Estoque' : 'Saída de Estoque'}
            </S.ModalTitle>

            {tipoMovimentacao === 'saida' && (
              <S.EstoqueAtualInfo>
                <S.EstoqueAtualLabel>Estoque atual:</S.EstoqueAtualLabel>
                <S.EstoqueAtualValor>{estoqueAtual}</S.EstoqueAtualValor>
              </S.EstoqueAtualInfo>
            )}

            <S.Input
              placeholder="Quantidade"
              value={quantidade}
              onChangeText={setQuantidade}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />

            <S.ModalButtons>
              <S.CancelButton
                onPress={() => {
                  setModalVisible(false);
                  setQuantidade('');
                }}
              >
                <S.CancelButtonText>Cancelar</S.CancelButtonText>
              </S.CancelButton>

              <S.SaveButton onPress={confirmarMovimentacao}>
                <S.SaveButtonText>Confirmar</S.SaveButtonText>
              </S.SaveButton>
            </S.ModalButtons>
          </S.ModalContent>
        </S.ModalOverlay>
      </Modal>
    </S.Container>
  );
}

// Estilos movidos para stock.styles.tsx usando styled-components

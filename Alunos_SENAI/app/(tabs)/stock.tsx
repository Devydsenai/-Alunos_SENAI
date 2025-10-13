import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

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
      <View style={[styles.card, estoqueBaixo && styles.cardAlerta]}>
        <View style={styles.cardContent}>
          {item.produto.foto ? (
            <Image source={{ uri: item.produto.foto }} style={styles.produtoFoto} />
          ) : (
            <View style={styles.produtoSemFoto}>
              <Ionicons name="cube-outline" size={30} color="#ccc" />
            </View>
          )}

          <View style={styles.produtoInfo}>
            <Text style={styles.produtoNome}>{item.produto.nome}</Text>
            {item.localizacao && (
              <Text style={styles.localizacao}>📍 {item.localizacao}</Text>
            )}
            <View style={styles.estoqueInfo}>
              <Text style={[styles.quantidade, estoqueBaixo && styles.quantidadeBaixa]}>
                Estoque: {item.quantidade_atual}
              </Text>
              <Text style={styles.minimoText}>Mín: {item.produto.estoque_minimo}</Text>
            </View>
            {item.data_ultima_mov && (
              <Text style={styles.dataText}>
                Últ. mov: {new Date(item.data_ultima_mov).toLocaleDateString()}
              </Text>
            )}
          </View>

          {estoqueBaixo && (
            <View style={styles.alertaBadge}>
              <Ionicons name="warning" size={20} color="#FFF" />
            </View>
          )}
        </View>

        <View style={styles.botoesContainer}>
          <TouchableOpacity
            style={styles.botaoEntrada}
            onPress={() => abrirModalEntrada(item)}
          >
            <Ionicons name="arrow-down-circle" size={16} color="#fff" />
            <Text style={styles.botaoTexto}>Entrada</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoSaida}
            onPress={() => abrirModalSaida(item)}
            disabled={item.quantidade_atual <= 0}
          >
            <Ionicons name="arrow-up-circle" size={16} color="#fff" />
            <Text style={styles.botaoTexto}>Saída</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Filtrar produtos com estoque baixo
  const estoqueBaixo = estoques.filter(
    (e) => e.quantidade_atual <= e.produto.estoque_minimo
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Estoque</Text>
        <TouchableOpacity
          style={styles.botaoFiltro}
          onPress={() => setAlertaBaixo(!alertaBaixo)}
        >
          <Ionicons
            name={alertaBaixo ? 'funnel' : 'funnel-outline'}
            size={20}
            color="#fff"
          />
          <Text style={styles.botaoFiltroTexto}>
            Baixo ({estoqueBaixo.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Resumo */}
      <View style={styles.resumo}>
        <View style={styles.resumoItem}>
          <Text style={styles.resumoValor}>{estoques.length}</Text>
          <Text style={styles.resumoLabel}>Produtos</Text>
        </View>
        <View style={styles.resumoDivider} />
        <View style={styles.resumoItem}>
          <Text style={[styles.resumoValor, styles.valorAlerta]}>
            {estoqueBaixo.length}
          </Text>
          <Text style={styles.resumoLabel}>Estoque Baixo</Text>
        </View>
        <View style={styles.resumoDivider} />
        <View style={styles.resumoItem}>
          <Text style={styles.resumoValor}>
            {estoques.reduce((acc, e) => acc + e.quantidade_atual, 0)}
          </Text>
          <Text style={styles.resumoLabel}>Total Itens</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      ) : estoques.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="archive-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Nenhum produto em estoque</Text>
          <Text style={styles.emptySubtext}>Cadastre produtos primeiro</Text>
        </View>
      ) : (
        <FlatList
          data={alertaBaixo ? estoqueBaixo : estoques}
          renderItem={renderEstoque}
          keyExtractor={(item) => item.produto_id.toString()}
          style={styles.lista}
        />
      )}

      {/* Modal de Movimentação */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {tipoMovimentacao === 'entrada' ? '📥 Entrada de Estoque' : '📤 Saída de Estoque'}
            </Text>

            {tipoMovimentacao === 'saida' && (
              <View style={styles.estoqueAtualInfo}>
                <Text style={styles.estoqueAtualLabel}>Estoque atual:</Text>
                <Text style={styles.estoqueAtualValor}>{estoqueAtual}</Text>
              </View>
            )}

            <TextInput
              style={styles.input}
              placeholder="Quantidade"
              value={quantidade}
              onChangeText={setQuantidade}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setQuantidade('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={confirmarMovimentacao}
              >
                <Text style={styles.saveButtonText}>Confirmar</Text>
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
  botaoFiltro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9800',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 5,
  },
  botaoFiltroTexto: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  resumo: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
  },
  resumoItem: {
    flex: 1,
    alignItems: 'center',
  },
  resumoValor: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  valorAlerta: {
    color: '#FF9800',
  },
  resumoLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  resumoDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
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
  },
  cardAlerta: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  cardContent: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  produtoFoto: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  produtoSemFoto: {
    width: 60,
    height: 60,
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
  localizacao: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  estoqueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantidade: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  quantidadeBaixa: {
    color: '#FF9800',
  },
  minimoText: {
    fontSize: 12,
    color: '#999',
  },
  dataText: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
  alertaBadge: {
    backgroundColor: '#FF9800',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botoesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  botaoEntrada: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
    flex: 1,
    justifyContent: 'center',
  },
  botaoSaida: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
    flex: 1,
    justifyContent: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 14,
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  estoqueAtualInfo: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  estoqueAtualLabel: {
    fontSize: 14,
    color: '#666',
  },
  estoqueAtualValor: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  input: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

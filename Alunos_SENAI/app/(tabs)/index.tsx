/**
 * @fileoverview Tela principal do sistema de gerenciamento de fornecedores
 * Permite visualizar, cadastrar, editar e excluir fornecedores/clientes
 * @module app/(tabs)/index
 */

import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

/**
 * Interface representando um cliente/fornecedor no sistema
 * @interface Cliente
 * @property {number} codigo - Código único identificador do cliente
 * @property {string} nome - Nome completo do cliente
 * @property {string} email - Endereço de email do cliente
 * @property {string} telefone - Número de telefone do cliente
 * @property {boolean} ativo - Status de atividade do cliente
 * @property {string} [foto] - URI da foto do cliente (opcional)
 */
interface Cliente {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;
  ativo: boolean;
  foto?: string;
}

/**
 * Componente principal da tela Home - Sistema de Fornecedores
 * Gerencia o CRUD completo de clientes/fornecedores com interface integrada
 * @component
 * @returns {JSX.Element} Tela principal do sistema
 */
export default function HomeScreen() {
  const [pesquisa, setPesquisa] = useState('');
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>([]);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingClientes, setLoadingClientes] = useState(true);
  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
    ativo: true,
    foto: ''
  });
  const router = useRouter();

  // URL da API
  const API_URL = 'http://localhost:3000';

  /**
   * Busca todos os clientes cadastrados na API
   * @async
   * @function buscarClientes
   * @returns {Promise<void>}
   * @throws {Error} Exibe alerta se a API não estiver disponível
   */
  const buscarClientes = async () => {
    try {
      setLoadingClientes(true);
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
      setLoadingClientes(false);
    }
  };

  /**
   * Filtra clientes por nome, email ou telefone
   * @function filtrarClientes
   * @param {string} texto - Texto de busca para filtrar clientes
   * @returns {void}
   */
  const filtrarClientes = (texto: string) => {
    setPesquisa(texto);
    if (texto.trim() === '') {
      setClientesFiltrados([]);
      setMostrarSugestoes(false);
    } else {
      const filtrados = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(texto.toLowerCase()) ||
        cliente.email.toLowerCase().includes(texto.toLowerCase()) ||
        cliente.telefone.includes(texto)
      );
      setClientesFiltrados(filtrados);
      setMostrarSugestoes(filtrados.length > 0);
    }
  };

  /**
   * Abre a câmera do dispositivo para tirar foto do cliente
   * Solicita permissões necessárias automaticamente
   * @async
   * @function tirarFoto
   * @returns {Promise<void>}
   */
  const tirarFoto = async () => {
    try {
      // Pedir permissão para usar a câmera
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'Precisamos de permissão para acessar a câmera');
        return;
      }

      // Abrir câmera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.5,
      });

      if (!result.canceled && result.assets[0]) {
        setNovoCliente({...novoCliente, foto: result.assets[0].uri});
      }
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
      Alert.alert('Erro', 'Não foi possível tirar a foto');
    }
  };

  /**
   * Abre a galeria de imagens do dispositivo para selecionar foto do cliente
   * Solicita permissões necessárias automaticamente
   * @async
   * @function selecionarImagem
   * @returns {Promise<void>}
   */
  const selecionarImagem = async () => {
    try {
      // Pedir permissão para acessar a galeria
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'Precisamos de permissão para acessar a galeria');
        return;
      }

      // Abrir galeria
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.5,
      });

      if (!result.canceled && result.assets[0]) {
        setNovoCliente({...novoCliente, foto: result.assets[0].uri});
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    }
  };

  /**
   * Remove a foto selecionada do formulário de novo cliente
   * @function removerFoto
   * @returns {void}
   */
  const removerFoto = () => {
    setNovoCliente({...novoCliente, foto: ''});
  };

  /**
   * Seleciona um cliente da lista de sugestões de pesquisa
   * @function selecionarCliente
   * @param {Cliente} cliente - Cliente selecionado da lista
   * @returns {void}
   */
  const selecionarCliente = (cliente: Cliente) => {
    setPesquisa(cliente.nome);
    setMostrarSugestoes(false);
  };

  /**
   * Adiciona um novo cliente/fornecedor ao sistema via API
   * Valida campos obrigatórios e trata erros de email duplicado
   * @async
   * @function adicionarCliente
   * @returns {Promise<void>}
   * @throws {Error} Exibe alerta com mensagem de erro apropriada
   */
  const adicionarCliente = async () => {
    if (!novoCliente.nome || !novoCliente.email) {
      Alert.alert('Erro', 'Nome e email são obrigatórios');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoCliente),
      });

      if (response.ok) {
        // Limpar campos imediatamente após sucesso
        setNovoCliente({ nome: '', email: '', telefone: '', ativo: true, foto: '' });
        
        // Recarregar lista de clientes
        await buscarClientes();
        
        Alert.alert('Sucesso', 'Fornecedor criado com sucesso!');
      } else {
        const error = await response.json();
        console.error('Erro da API:', error);
        
        // Tratar erro de email duplicado
        if (error.error && error.error.includes('já cadastrado')) {
          Alert.alert('Erro', 'Este e-mail já está cadastrado. Use um e-mail diferente.');
        } else {
          Alert.alert('Erro', error.error || 'Não foi possível criar o fornecedor');
        }
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao criar fornecedor');
      console.error('Erro ao criar fornecedor:', error);
    } finally {
      setLoading(false);
    }
  };

  // Carregar clientes quando a tela for montada
  useEffect(() => {
    buscarClientes();
  }, []);


  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sistema de Fornecedores </Text>
        <Text style={styles.subtitle}>Criar Novo Fornecedor</Text>
        
        {/* Campo de Pesquisa */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar fornecedores..."
            value={pesquisa}
            onChangeText={filtrarClientes}
            onFocus={() => {
              if (pesquisa.trim() !== '' && clientesFiltrados.length > 0) {
                setMostrarSugestoes(true);
              }
            }}
            onBlur={() => {
              // Delay para permitir clique na sugestão
              setTimeout(() => setMostrarSugestoes(false), 200);
            }}
            placeholderTextColor="#999"
          />
          
          {/* Dropdown de Sugestões */}
          {mostrarSugestoes && clientesFiltrados.length > 0 && (
            <View style={styles.sugestoesContainer}>
              {clientesFiltrados.slice(0, 5).map((cliente) => (
                <TouchableOpacity
                  key={cliente.codigo}
                  style={styles.sugestaoItem}
                  onPress={() => selecionarCliente(cliente)}
                >
                  <View style={styles.sugestaoInfo}>
                    <Text style={[styles.sugestaoNome, !cliente.ativo && styles.textoInativo]}>
                      {cliente.nome}
                    </Text>
                    <Text style={[styles.sugestaoEmail, !cliente.ativo && styles.textoInativo]}>
                      {cliente.email}
                    </Text>
                  </View>
                  <View style={[styles.sugestaoStatus, { backgroundColor: cliente.ativo ? '#4CAF50' : '#F44336' }]}>
                    <Text style={styles.sugestaoStatusText}>
                      {cliente.ativo ? 'Ativo' : 'Inativo'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Formulário de Criação */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Dados do Fornecedor</Text>
          
          {/* Seção de Foto */}
          <View style={styles.fotoContainer}>
            {novoCliente.foto ? (
              <View style={styles.fotoPreviewContainer}>
                <Image source={{ uri: novoCliente.foto }} style={styles.fotoPreview} />
                <TouchableOpacity 
                  style={styles.botaoRemoverFoto}
                  onPress={removerFoto}
                >
                  <Ionicons name="close-circle" size={30} color="#F44336" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.semFoto}>
                <Ionicons name="person-circle-outline" size={80} color="#ccc" />
                <Text style={styles.semFotoTexto}>Sem foto</Text>
              </View>
            )}
            
            <View style={styles.botoesContainer}>
              <TouchableOpacity 
                style={styles.botaoFoto}
                onPress={tirarFoto}
              >
                <Ionicons name="camera" size={20} color="#fff" />
                <Text style={styles.botaoFotoTexto}>Tirar Foto</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.botaoGaleria}
                onPress={selecionarImagem}
              >
                <Ionicons name="images" size={20} color="#fff" />
                <Text style={styles.botaoFotoTexto}>Galeria</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Nome do Fornecedor *"
            value={novoCliente.nome}
            onChangeText={(text) => setNovoCliente({...novoCliente, nome: text})}
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={styles.input}
            placeholder="E-mail do Fornecedor *"
            value={novoCliente.email}
            onChangeText={(text) => setNovoCliente({...novoCliente, email: text})}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Telefone do Fornecedor"
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
            <Text style={styles.checkboxLabel}>Fornecedor ativo</Text>
          </View>
          
          <TouchableOpacity
            style={[styles.createButton, loading && styles.buttonDisabled]}
            onPress={adicionarCliente}
            disabled={loading}
          >
            <Text style={styles.createButtonText}>
              {loading ? 'Criando...' : 'Criar Fornecedor'}
            </Text>
          </TouchableOpacity>
        </View>


        {/* Link para ver fornecedores */}
        <View style={styles.linkContainer}>
          <Link href="/(tabs)/about" style={styles.linkButton}>
            <Text style={styles.linkText}>Ver Lista Completa de Fornecedores</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  searchContainer: {
    marginBottom: 20,
    position: 'relative',
    zIndex: 1000,
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Estilos para o dropdown de sugestões
  sugestoesContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 5,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1001,
  },
  sugestaoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sugestaoInfo: {
    flex: 1,
    marginRight: 10,
  },
  sugestaoNome: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  sugestaoEmail: {
    fontSize: 12,
    color: '#666',
  },
  sugestaoStatus: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  sugestaoStatusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
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
  createButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    alignItems: 'center',
  },
  linkButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoInativo: {
    color: '#999',
  },
  // Estilos para foto
  fotoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  fotoPreviewContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  fotoPreview: {
    width: 90,
    height: 120,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  botaoRemoverFoto: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  semFoto: {
    alignItems: 'center',
    marginBottom: 15,
  },
  semFotoTexto: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  botoesContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoFoto: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  botaoGaleria: {
    backgroundColor: '#9C27B0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  botaoFotoTexto: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

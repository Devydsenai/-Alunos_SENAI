/**
 * @fileoverview Tela principal do sistema de gerenciamento de fornecedores
 * Permite visualizar, cadastrar, editar e excluir fornecedores/clientes
 * @module app/(tabs)/index
 */

import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as S from './index.styles';

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
    <S.Container>
      <S.Content>
        <S.Title>Sistema de Fornecedores </S.Title>
        <S.Subtitle>Criar Novo Fornecedor</S.Subtitle>
        
        {/* Campo de Pesquisa */}
        <S.SearchContainer>
          <S.SearchInput
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
            <S.SugestoesContainer>
              {clientesFiltrados.slice(0, 5).map((cliente) => (
                <S.SugestaoItem
                  key={cliente.codigo}
                  onPress={() => selecionarCliente(cliente)}
                >
                  <S.SugestaoInfo>
                    <S.SugestaoNome inativo={!cliente.ativo}>
                      {cliente.nome}
                    </S.SugestaoNome>
                    <S.SugestaoEmail inativo={!cliente.ativo}>
                      {cliente.email}
                    </S.SugestaoEmail>
                  </S.SugestaoInfo>
                  <S.SugestaoStatus ativo={cliente.ativo}>
                    <S.SugestaoStatusText>
                      {cliente.ativo ? 'Ativo' : 'Inativo'}
                    </S.SugestaoStatusText>
                  </S.SugestaoStatus>
                </S.SugestaoItem>
              ))}
            </S.SugestoesContainer>
          )}
        </S.SearchContainer>

        {/* Formulário de Criação */}
        <S.FormContainer>
          <S.FormTitle>Dados do Fornecedor</S.FormTitle>
          
          {/* Seção de Foto */}
          <S.FotoContainer>
            {novoCliente.foto ? (
              <S.FotoPreviewContainer>
                <S.FotoPreview source={{ uri: novoCliente.foto }} />
                <S.BotaoRemoverFoto onPress={removerFoto}>
                  <Ionicons name="close-circle" size={30} color="#F44336" />
                </S.BotaoRemoverFoto>
              </S.FotoPreviewContainer>
            ) : (
              <S.SemFoto>
                <Ionicons name="person-circle-outline" size={80} color="#ccc" />
                <S.SemFotoTexto>Sem foto</S.SemFotoTexto>
              </S.SemFoto>
            )}
            
            <S.BotoesContainer>
              <S.BotaoFoto onPress={tirarFoto}>
                <Ionicons name="camera" size={20} color="#fff" />
                <S.BotaoFotoTexto>Tirar Foto</S.BotaoFotoTexto>
              </S.BotaoFoto>
              
              <S.BotaoGaleria onPress={selecionarImagem}>
                <Ionicons name="images" size={20} color="#fff" />
                <S.BotaoFotoTexto>Galeria</S.BotaoFotoTexto>
              </S.BotaoGaleria>
            </S.BotoesContainer>
          </S.FotoContainer>
          
          <S.Input
            placeholder="Nome do Fornecedor *"
            value={novoCliente.nome}
            onChangeText={(text: string) => setNovoCliente({...novoCliente, nome: text})}
            placeholderTextColor="#999"
          />
          
          <S.Input
            placeholder="E-mail do Fornecedor *"
            value={novoCliente.email}
            onChangeText={(text: string) => setNovoCliente({...novoCliente, email: text})}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          
          <S.Input
            placeholder="Telefone do Fornecedor"
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
          
          <S.CreateButton
            disabled={loading}
            onPress={adicionarCliente}
          >
            <S.CreateButtonText>
              {loading ? 'Criando...' : 'Criar Fornecedor'}
            </S.CreateButtonText>
          </S.CreateButton>
        </S.FormContainer>


        {/* Link para ver fornecedores */}
        <S.LinkContainer>
          <Link href="/(tabs)/about" asChild>
            <S.LinkButton>
              <S.LinkText>Ver Lista Completa de Fornecedores</S.LinkText>
            </S.LinkButton>
          </Link>
        </S.LinkContainer>
      </S.Content>
    </S.Container>
  );
}

// Estilos movidos para index.styles.tsx usando styled-components

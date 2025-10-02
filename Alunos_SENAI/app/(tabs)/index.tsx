import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';

// Interface para o cliente
interface Cliente {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;
  ativo: boolean;
}

export default function HomeScreen() {
  const [pesquisa, setPesquisa] = useState('');
  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
    ativo: true
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // URL da API
  const API_URL = 'http://localhost:3000';

  // Função para adicionar cliente
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
        setNovoCliente({ nome: '', email: '', telefone: '', ativo: true });
        
        Alert.alert('Sucesso', 'Cliente criado com sucesso!', [
          {
            text: 'OK',
            onPress: () => {
              router.push('/(tabs)/about'); // Redirecionar para lista de clientes
            }
          }
        ]);
      } else {
        const error = await response.json();
        console.error('Erro da API:', error);
        
        // Tratar erro de email duplicado
        if (error.error && error.error.includes('já cadastrado')) {
          Alert.alert('Erro', 'Este e-mail já está cadastrado. Use um e-mail diferente.');
        } else {
          Alert.alert('Erro', error.error || 'Não foi possível criar o cliente');
        }
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao criar cliente');
      console.error('Erro ao criar cliente:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sistema de Clientes SENAI</Text>
        <Text style={styles.subtitle}>Criar Novo Cliente</Text>
        
        {/* Campo de Pesquisa */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar clientes..."
            value={pesquisa}
            onChangeText={setPesquisa}
            placeholderTextColor="#999"
          />
        </View>

        {/* Formulário de Criação */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Dados do Cliente</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Nome do Cliente *"
            value={novoCliente.nome}
            onChangeText={(text) => setNovoCliente({...novoCliente, nome: text})}
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={styles.input}
            placeholder="E-mail do Cliente *"
            value={novoCliente.email}
            onChangeText={(text) => setNovoCliente({...novoCliente, email: text})}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Telefone do Cliente"
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
          
          <TouchableOpacity
            style={[styles.createButton, loading && styles.buttonDisabled]}
            onPress={adicionarCliente}
            disabled={loading}
          >
            <Text style={styles.createButtonText}>
              {loading ? 'Criando...' : 'Criar Cliente'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Link para ver clientes */}
        <View style={styles.linkContainer}>
          <Link href="/(tabs)/about" style={styles.linkButton}>
            <Text style={styles.linkText}>Ver Lista de Clientes</Text>
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
});

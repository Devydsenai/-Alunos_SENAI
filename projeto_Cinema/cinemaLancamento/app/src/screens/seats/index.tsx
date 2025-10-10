import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useAuth } from '../../context/AuthContext';
import { poltronasService } from '../../services/poltronas';
import { styles } from './styles';

// Tipos de poltronas
type SeatStatus = 'available' | 'selected' | 'occupied';

interface Seat {
  row: string;
  number: number;
  status: SeatStatus;
}

export default function SeatsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as any;
  const { isAdmin } = useAuth();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  // Dados do filme vindos da navegação
  const filmeId = params.filmeId || '0';
  const filmeTitulo = params.filmeTitulo || 'Filme';
  const vagasDisponiveis = Number(params.vagasDisponiveis) || 60;
  
  // Carregar poltronas ocupadas da API
  useEffect(() => {
    setSelectedSeats([]);
    carregarPoltronasOcupadas();
  }, [filmeId]);
  
  const carregarPoltronasOcupadas = async () => {
    try {
      const poltronasAPI = await poltronasService.getPoltronasFilme(filmeId);
      const ocupadas = poltronasAPI
        .filter(p => p.status === 'reservada')
        .map(p => p.poltrona);
      setOccupiedSeats(ocupadas);
    } catch (error) {
      console.log('Sem poltronas reservadas ainda ou API offline');
    }
  };
  
  // Criar layout de poltronas (10 fileiras x 12 poltronas)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seatsPerRow = 12;
  const totalSeats = rows.length * seatsPerRow; // 120 poltronas
  
  // Calcular poltronas ocupadas baseado nas vagas disponíveis
  const occupiedCount = totalSeats - vagasDisponiveis;
  
  // Gerar poltronas ocupadas específicas para este filme (baseado no ID)
  const generateOccupiedSeats = () => {
    const allSeats: string[] = [];
    
    // Criar lista de todas as poltronas
    rows.forEach(row => {
      for (let i = 1; i <= seatsPerRow; i++) {
        allSeats.push(`${row}${i}`);
      }
    });
    
    // Usar o ID do filme como seed para gerar poltronas ocupadas consistentes
    const seed = Number(filmeId) || 1;
    const seededRandom = (index: number) => {
      const x = Math.sin(seed * index) * 10000;
      return x - Math.floor(x);
    };
    
    // Ordenar baseado no seed
    const shuffled = [...allSeats].sort((a, b) => {
      const indexA = allSeats.indexOf(a);
      const indexB = allSeats.indexOf(b);
      return seededRandom(indexA) - seededRandom(indexB);
    });
    
    return shuffled.slice(0, occupiedCount);
  };
  
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>(generateOccupiedSeats());

  const toggleSeat = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) {
      Alert.alert('Poltrona Ocupada', 'Esta poltrona já está reservada.');
      return;
    }

    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };

  const getSeatStatus = (seatId: string): SeatStatus => {
    if (occupiedSeats.includes(seatId)) return 'occupied';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const desocuparSala = async () => {
    try {
      // Deletar do banco
      await poltronasService.limparSala(filmeId);
      
      // Limpar tela (poltronas ficam cinzas)
      setOccupiedSeats([]);
      setSelectedSeats([]);
      
      // Mensagem de sucesso
      Alert.alert(
        '✅ Sala Desocupada!', 
        'Todas as poltronas foram liberadas!\n\n🔴 Vermelhas → ⚪ Cinzas\n\n🗑️ Deletado do banco de dados!'
      );
    } catch (error) {
      Alert.alert('❌ Erro', 'Não foi possível desocupar a sala. Verifique se a API está rodando.');
    }
  };

  const renderSeat = (row: string, number: number) => {
    const seatId = `${row}${number}`;
    const status = getSeatStatus(seatId);
    
    return (
      <TouchableOpacity
        key={seatId}
        style={[
          styles.seat,
          status === 'selected' && styles.seatSelected,
          status === 'occupied' && styles.seatOccupied,
        ]}
        onPress={() => toggleSeat(seatId)}
        disabled={status === 'occupied'}
      >
        <Text style={[
          styles.seatText,
          status === 'selected' && styles.seatTextSelected,
          status === 'occupied' && styles.seatTextOccupied,
        ]}>
          {number}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRow = (row: string) => (
    <View key={row} style={styles.row}>
      <Text style={styles.rowLabel}>{row}</Text>
      <View style={styles.seatsRow}>
        {Array.from({ length: seatsPerRow }, (_, i) => i + 1).map(number => 
          renderSeat(row, number)
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => {
            setSelectedSeats([]);
            navigation.goBack();
          }}
        >
          <Text style={styles.backButtonText}>← Voltar para Pesquisa</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🪑 Seleção de Poltronas</Text>
        <Text style={styles.headerSubtitle}>{filmeTitulo}</Text>
        <View style={styles.availabilityInfo}>
          <Text style={styles.availabilityText}>
            💺 {vagasDisponiveis - selectedSeats.length} vagas disponíveis
          </Text>
        </View>
        
        {/* Botão de Admin */}
        {isAdmin && (
          <TouchableOpacity 
            style={styles.adminButton}
            onPress={desocuparSala}
          >
            <Text style={styles.adminButtonText}>🔧 Desocupar Sala</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Tela do cinema */}
      <View style={styles.screenContainer}>
        <View style={styles.screen}>
          <Text style={styles.screenText}>TELA</Text>
        </View>
      </View>

      {/* Legenda */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.seatAvailable]} />
          <Text style={styles.legendText}>Disponível</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.seatSelected]} />
          <Text style={styles.legendText}>Selecionado</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.seatOccupied]} />
          <Text style={styles.legendText}>Ocupado</Text>
        </View>
      </View>

      {/* Poltronas */}
      <View style={styles.seatsContainer}>
        {rows.map(renderRow)}
      </View>

      {/* Resumo da seleção */}
      {selectedSeats.length > 0 && (
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>
            Poltronas selecionadas: {selectedSeats.sort().join(', ')}
          </Text>
          <Text style={styles.summaryPrice}>
            Total: R$ {(selectedSeats.length * 25).toFixed(2)}
          </Text>
        </View>
      )}

      {/* Botão confirmar */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.confirmButton, selectedSeats.length === 0 && styles.confirmButtonDisabled]}
          onPress={async () => {
            if (selectedSeats.length === 0) {
              return;
            }
            
            // Salvar poltronas
            const poltronas = [...selectedSeats];
            
            try {
              // 1. SALVAR NA API
              const resultado = await poltronasService.reservarPoltronas({
                filmeId: filmeId,
                filmeTitulo: filmeTitulo,
                poltronas: poltronas,
                clienteNome: 'Cliente',
                clienteEmail: 'cliente@cinema.com'
              });
              
              // 2. MARCAR VERMELHAS
              setOccupiedSeats(prev => [...prev, ...poltronas]);
              setSelectedSeats([]);
              
              // 3. MOSTRAR SUCESSO
              Alert.alert(
                '✅ RESERVA CONFIRMADA!',
                `🎫 Poltronas: ${poltronas.join(', ')}\n\n🎬 Filme: ${filmeTitulo}\n\n💰 Total: R$ ${resultado.totalPago.toFixed(2)}\n\n🔴 Poltronas agora estão VERMELHAS!\n\n💾 ${resultado.message}`,
                [
                  {
                    text: 'OK - Voltar ao Início',
                    onPress: () => {
                      (navigation as any).navigate('MainTabs', { screen: 'Home' });
                    }
                  }
                ]
              );
              
            } catch (error) {
              Alert.alert('❌ Erro', 'Não foi possível salvar. Verifique se a API está rodando.');
            }
          }}
          disabled={selectedSeats.length === 0}
        >
          <Text style={styles.confirmButtonText}>
            {selectedSeats.length === 0 
              ? 'Selecione suas poltronas' 
              : `Confirmar (${selectedSeats.length} poltrona${selectedSeats.length > 1 ? 's' : ''})`
            }
          </Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}


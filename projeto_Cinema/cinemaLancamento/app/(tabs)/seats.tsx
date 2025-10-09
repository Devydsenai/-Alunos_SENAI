import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

// Tipos de poltronas
type SeatStatus = 'available' | 'selected' | 'occupied';

interface Seat {
  row: string;
  number: number;
  status: SeatStatus;
}

export default function SeatsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  // Dados do filme vindos da navegação
  const filmeTitulo = params.filmeTitulo || 'Filme';
  const vagasDisponiveis = Number(params.vagasDisponiveis) || 60;
  
  // Criar layout de poltronas (10 fileiras x 12 poltronas)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seatsPerRow = 12;
  const totalSeats = rows.length * seatsPerRow; // 120 poltronas
  
  // Calcular poltronas ocupadas baseado nas vagas disponíveis
  const occupiedCount = totalSeats - vagasDisponiveis;
  
  // Gerar poltronas ocupadas aleatoriamente
  const generateOccupiedSeats = () => {
    const occupied: string[] = [];
    const allSeats: string[] = [];
    
    // Criar lista de todas as poltronas
    rows.forEach(row => {
      for (let i = 1; i <= seatsPerRow; i++) {
        allSeats.push(`${row}${i}`);
      }
    });
    
    // Selecionar poltronas aleatórias como ocupadas
    const shuffled = [...allSeats].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, occupiedCount);
  };
  
  const [occupiedSeats] = useState<string[]>(generateOccupiedSeats());

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

  const confirmarReserva = () => {
    if (selectedSeats.length === 0) {
      Alert.alert('Atenção', 'Selecione pelo menos uma poltrona.');
      return;
    }

    Alert.alert(
      'Confirmar Reserva',
      `Você selecionou ${selectedSeats.length} poltrona(s): ${selectedSeats.sort().join(', ')}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Confirmar', 
          onPress: () => {
            Alert.alert('Sucesso!', 'Sua reserva foi confirmada!');
            setSelectedSeats([]);
          }
        }
      ]
    );
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
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🪑 Seleção de Poltronas</Text>
        <Text style={styles.headerSubtitle}>{filmeTitulo}</Text>
        <View style={styles.availabilityInfo}>
          <Text style={styles.availabilityText}>
            💺 {vagasDisponiveis - selectedSeats.length} vagas disponíveis
          </Text>
        </View>
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
          onPress={confirmarReserva}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#1a1a1a",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: "#E50914",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E50914",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  availabilityInfo: {
    backgroundColor: "rgba(0, 255, 0, 0.1)",
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#00ff00",
    marginTop: 5,
  },
  availabilityText: {
    color: "#00ff00",
    fontSize: 14,
    fontWeight: "bold",
  },
  screenContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  screen: {
    width: "80%",
    height: 6,
    backgroundColor: "#E50914",
    borderRadius: 50,
    shadowColor: "#E50914",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  screenText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    position: "absolute",
    top: -20,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  legendText: {
    color: "#fff",
    fontSize: 12,
  },
  seatsContainer: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rowLabel: {
    width: 30,
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  seatsRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  seat: {
    width: 28,
    height: 28,
    backgroundColor: "#4a4a4a",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#666",
  },
  seatAvailable: {
    backgroundColor: "#4a4a4a",
    borderColor: "#666",
  },
  seatSelected: {
    backgroundColor: "#00ff00",
    borderColor: "#00cc00",
  },
  seatOccupied: {
    backgroundColor: "#E50914",
    borderColor: "#b00712",
  },
  seatText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  seatTextSelected: {
    color: "#000",
  },
  seatTextOccupied: {
    color: "#fff",
    opacity: 0.5,
  },
  summary: {
    backgroundColor: "#2a2a2a",
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#00ff00",
  },
  summaryTitle: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
  },
  summaryPrice: {
    color: "#00ff00",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  confirmButton: {
    backgroundColor: "#E50914",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmButtonDisabled: {
    backgroundColor: "#555",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});


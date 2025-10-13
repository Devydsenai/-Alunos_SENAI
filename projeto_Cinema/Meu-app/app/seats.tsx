/**
 * Seat Selection Screen
 * 
 * Tela de seleção de assentos como no cinema real.
 * Com mapa de assentos, legendas e botão de compra.
 */

import { useFocusEffect } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { cancelBookingBySeat, createBooking, getSessionBookings } from '../api/booking';
import { GradientBackground } from '../components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '../constants/theme';
import { getUser } from '../services/auth.session';

interface Seat {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'occupied' | 'wheelchair' | 'reduced-mobility' | 'companion' | 'selected';
  type: 'regular' | 'special';
}

interface SeatRow {
  letter: string;
  seats: Seat[];
}

export default function SeatsScreen() {
  const params = useLocalSearchParams();
  const movieId = (params.movieId as string) || '1';
  const movieTitle = (params.movieTitle as string) || 'Tron: Ares';
  const format = (params.format as string) || 'DUBLADO';
  const time = (params.time as string) || '14:30';
  
  const [activeTab, setActiveTab] = useState<'seats' | 'prices'>('seats');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [purchasedSeats, setPurchasedSeats] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState(time);
  const [showModal, setShowModal] = useState(false);
  const [selectedSeatInfo, setSelectedSeatInfo] = useState<Seat | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserAndBookings = useCallback(async () => {
    try {
      setLoading(true);
      console.log('🔄 Carregando dados da sessão...');
      console.log('📍 Filme:', movieId, '| Horário:', time);
      
      // Busca o usuário logado
      const user = await getUser();
      if (user) {
        setUserId(user.id);
        console.log('👤 Usuário logado:', user.name, '(ID:', user.id, ')');
      } else {
        console.log('⚠️ Nenhum usuário logado');
      }

      // Busca as reservas desta sessão do banco de dados
      const bookings = await getSessionBookings(movieId, time);
      console.log('📦 Reservas encontradas no banco:', bookings);
      
      const bookedSeats = bookings.map(b => b.seatId);
      setPurchasedSeats(bookedSeats);
      console.log('🎫 Assentos reservados para esta sessão:', bookedSeats);
    } catch (error) {
      console.error('❌ Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
      console.log('✅ Carregamento concluído');
    }
  }, [movieId, time]);

  // Carrega ao montar o componente
  useEffect(() => {
    loadUserAndBookings();
  }, [loadUserAndBookings]);

  // Recarrega quando a tela receber foco
  useFocusEffect(
    useCallback(() => {
      console.log('🔄 Tela recebeu foco - recarregando dados...');
      loadUserAndBookings();
    }, [loadUserAndBookings])
  );

  // Horários disponíveis
  const showtimes = ['14:30', '16:30', '19:30', '22:00', '17:00', '21:30'];

  // Gera o mapa de assentos
  const generateSeatMap = (): SeatRow[] => {
    const rows: SeatRow[] = [];
    const rowLetters = ['P', 'O', 'N', 'M', 'L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    
    rowLetters.forEach((letter, rowIndex) => {
      const seats: Seat[] = [];
      const seatsPerRow = 20; // 10 assentos por lado
      
      for (let i = 1; i <= seatsPerRow; i++) {
        let status: Seat['status'] = 'available';
        let type: Seat['type'] = 'regular';
        
        // NÃO gera assentos ocupados aleatoriamente
        // Os assentos ocupados virão do banco de dados (purchasedSeats)
        
        // Assentos especiais
        if (letter === 'J' && (i === 4 || i === 11 || i === 16)) {
          status = 'wheelchair';
          type = 'special';
        } else if (letter === 'I' && (i === 1 || i === 20)) {
          status = 'reduced-mobility';
          type = 'special';
        } else if (letter === 'H' && (i === 1 || i === 20)) {
          status = 'companion';
          type = 'special';
        }
        
        seats.push({
          id: `${letter}${i}`,
          row: letter,
          number: i,
          status,
          type,
        });
      }
      
      rows.push({ letter, seats });
    });
    
    return rows;
  };

  const seatMap = generateSeatMap();

  /**
   * Renderiza os horários
   */
  const renderShowtimes = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.showtimesContainer}>
      {showtimes.map((time) => (
        <TouchableOpacity
          key={time}
          style={[
            styles.showtimeButton,
            selectedTime === time && styles.selectedShowtimeButton,
          ]}
          onPress={() => setSelectedTime(time)}
        >
          <Text style={[
            styles.showtimeText,
            selectedTime === time && styles.selectedShowtimeText,
          ]}>
            {time}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  /**
   * Renderiza os tabs
   */
  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'seats' && styles.activeTab]}
        onPress={() => setActiveTab('seats')}
      >
        <Text style={[styles.tabText, activeTab === 'seats' && styles.activeTabText]}>
          Assentos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'prices' && styles.activeTab]}
        onPress={() => setActiveTab('prices')}
      >
        <Text style={[styles.tabText, activeTab === 'prices' && styles.activeTabText]}>
          Preços
        </Text>
      </TouchableOpacity>
    </View>
  );

  /**
   * Renderiza um assento
   */
  const renderSeat = (seat: Seat) => {
    const isSelected = selectedSeats.includes(seat.id);
    const isPurchased = purchasedSeats.includes(seat.id);
    
    return (
      <TouchableOpacity
        key={seat.id}
        style={[
          styles.seat,
          seat.type === 'special' && styles.specialSeat,
          isPurchased && styles.purchasedSeat,
          isSelected && !isPurchased && styles.selectedSeat,
          seat.status === 'occupied' && !isPurchased && styles.occupiedSeat,
          seat.status === 'wheelchair' && !isPurchased && !isSelected && styles.wheelchairSeat,
          seat.status === 'reduced-mobility' && !isPurchased && !isSelected && styles.reducedMobilitySeat,
          seat.status === 'companion' && !isPurchased && !isSelected && styles.companionSeat,
        ]}
        onPress={() => {
          console.log(`🎯 Assento ${seat.id} clicado`);
          console.log(`📊 Status - Comprado: ${isPurchased}, Selecionado: ${isSelected}, Ocupado: ${seat.status}`);
          
          // Se o assento foi comprado pelo usuário, permite cancelar a compra
          if (isPurchased) {
            console.log('🔴 Assento COMPRADO - Abrindo confirmação de cancelamento');
            Alert.alert(
              'Cancelar Compra? 🎫',
              `Você comprou o assento ${seat.id}.\n\nDeseja cancelar esta compra?\n\nO assento ficará disponível novamente.`,
              [
                {
                  text: 'Não',
                  style: 'cancel',
                  onPress: () => console.log('❌ Cancelamento recusado')
                },
                {
                  text: 'Sim, Cancelar Compra',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      console.log(`✅ Cancelando compra do assento ${seat.id}`);
                      
                      // Cancela no banco de dados se o usuário estiver logado
                      if (userId) {
                        await cancelBookingBySeat(userId, movieId, seat.id, time);
                        console.log('🗑️ Reserva removida do banco de dados');
                      }
                      
                      const newPurchased = purchasedSeats.filter(id => id !== seat.id);
                      console.log('📝 Novos assentos comprados:', newPurchased);
                      setPurchasedSeats(newPurchased);
                      
                      Alert.alert(
                        'Compra Cancelada! ✓',
                        `O assento ${seat.id} foi liberado e está disponível novamente.`
                      );
                    } catch (error: any) {
                      console.error('Erro ao cancelar reserva:', error);
                      Alert.alert('Erro', 'Erro ao cancelar reserva. Tente novamente.');
                    }
                  }
                }
              ]
            );
            return;
          }
          
          // Não permite interação com assentos ocupados (mas não comprados por este usuário)
          if (seat.status === 'occupied') {
            console.log('⛔ Assento ocupado - sem ação');
            return;
          }
          
          // Se o assento já está selecionado, permite desmarcar direto
          if (isSelected) {
            console.log('🟢 Desmarcando assento selecionado');
            setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
            return;
          }
          
          // Abre modal com informações do assento
          console.log('ℹ️ Abrindo modal para assento disponível');
          setSelectedSeatInfo(seat);
          setShowModal(true);
        }}
        disabled={seat.status === 'occupied' && !isPurchased}
        activeOpacity={0.7}
      >
        {seat.status === 'wheelchair' && <Text style={styles.seatIcon}>♿</Text>}
        {seat.status === 'reduced-mobility' && <Text style={styles.seatIcon}>M</Text>}
        {seat.status === 'companion' && <Text style={styles.seatIcon}>👤</Text>}
        {seat.status === 'occupied' && <Text style={styles.seatIcon}>👤</Text>}
        {isPurchased && <Text style={styles.seatIcon}>👤</Text>}
        {isSelected && !isPurchased && <Text style={styles.seatIcon}>✓</Text>}
      </TouchableOpacity>
    );
  };

  /**
   * Renderiza uma fileira de assentos
   */
  const renderSeatRow = ({ item }: { item: SeatRow }) => (
    <View style={styles.seatRow}>
      <Text style={styles.rowLabel}>{item.letter}</Text>
      
      {/* Lado esquerdo */}
      <View style={styles.seatGroup}>
        {item.seats.slice(0, 10).map(renderSeat)}
      </View>
      
      {/* Corredor */}
      <View style={styles.aisle} />
      
      {/* Lado direito */}
      <View style={styles.seatGroup}>
        {item.seats.slice(10, 20).map(renderSeat)}
      </View>
      
      <Text style={styles.rowLabel}>{item.letter}</Text>
    </View>
  );

  /**
   * Renderiza o modal de seleção de assento
   */
  const renderSeatModal = () => (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Selecionar Assento</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          {selectedSeatInfo && (
            <View style={styles.modalBody}>
              <View style={styles.seatInfoContainer}>
                <View style={styles.seatPreview}>
                  <View style={[
                    styles.seatPreviewIcon,
                    selectedSeatInfo.status === 'wheelchair' && styles.wheelchairPreview,
                    selectedSeatInfo.status === 'reduced-mobility' && styles.reducedMobilityPreview,
                    selectedSeatInfo.status === 'companion' && styles.companionPreview,
                  ]}>
                    {selectedSeatInfo.status === 'wheelchair' && <Text style={styles.seatPreviewIconText}>♿</Text>}
                    {selectedSeatInfo.status === 'reduced-mobility' && <Text style={styles.seatPreviewIconText}>M</Text>}
                    {selectedSeatInfo.status === 'companion' && <Text style={styles.seatPreviewIconText}>👤</Text>}
                  </View>
                </View>
                
                <View style={styles.seatDetails}>
                  <Text style={styles.seatNumber}>{selectedSeatInfo.id}</Text>
                  <Text style={styles.seatType}>
                    {selectedSeatInfo.status === 'wheelchair' && 'Assento para Cadeirante'}
                    {selectedSeatInfo.status === 'reduced-mobility' && 'Mobilidade Reduzida'}
                    {selectedSeatInfo.status === 'companion' && 'Acompanhante'}
                    {selectedSeatInfo.status === 'available' && 'Assento Regular'}
                  </Text>
                  <Text style={styles.seatPrice}>Preço: R$ 32,00</Text>
                </View>
              </View>
              
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => {
                    if (selectedSeatInfo) {
                      const isSelected = selectedSeats.includes(selectedSeatInfo.id);
                      
                      if (isSelected) {
                        // Remove da seleção
                        setSelectedSeats(selectedSeats.filter(id => id !== selectedSeatInfo.id));
                      } else {
                        // Adiciona na seleção
                        setSelectedSeats([...selectedSeats, selectedSeatInfo.id]);
                      }
                    }
                    
                    setShowModal(false);
                  }}
                >
                  <Text style={styles.selectButtonText}>
                    {selectedSeatInfo && selectedSeats.includes(selectedSeatInfo.id) ? 'Desselecionar' : 'Selecionar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );

  /**
   * Renderiza a legenda
   */
  const renderLegend = () => (
    <View style={styles.legendContainer}>
       <View style={styles.legendSection}>
         <Text style={styles.legendTitle}>Status</Text>
         <View style={styles.legendItem}>
           <View style={[styles.legendIcon, styles.availableIcon]} />
           <Text style={styles.legendText}>Disponível</Text>
         </View>
         <View style={styles.legendItem}>
           <View style={[styles.legendIcon, styles.selectedIcon]}>
             <Text style={styles.legendIconText}>✓</Text>
           </View>
           <Text style={styles.legendText}>Selecionado</Text>
         </View>
         <View style={styles.legendItem}>
           <View style={[styles.legendIcon, styles.purchasedIcon]}>
             <Text style={styles.legendIconText}>👤</Text>
           </View>
           <Text style={styles.legendText}>Comprado</Text>
         </View>
         <View style={styles.legendItem}>
           <View style={[styles.legendIcon, styles.occupiedIcon]}>
             <Text style={styles.legendIconText}>👤</Text>
           </View>
           <Text style={styles.legendText}>Ocupado</Text>
         </View>
       </View>

      <View style={styles.legendSection}>
        <Text style={styles.legendTitle}>Normal</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, styles.availableIcon]} />
          <Text style={styles.legendText}>Regular</Text>
        </View>
      </View>

      <View style={styles.legendSection}>
        <Text style={styles.legendTitle}>Especial</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, styles.wheelchairIcon]}>
            <Text style={styles.legendIconText}>♿</Text>
          </View>
          <Text style={styles.legendText}>Cadeirante</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, styles.reducedMobilityIcon]}>
            <Text style={styles.legendIconText}>M</Text>
          </View>
          <Text style={styles.legendText}>Mobilidade Reduzida</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, styles.companionIcon]}>
            <Text style={styles.legendIconText}>👤</Text>
          </View>
          <Text style={styles.legendText}>Acompanhante Do Cadeirante</Text>
        </View>
      </View>
    </View>
  );

  // Mostra loading enquanto carrega os dados
  if (loading) {
    return (
      <GradientBackground variant="primary">
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.light} />
            <Text style={styles.loadingText}>Carregando assentos...</Text>
            <Text style={styles.loadingSubtext}>Buscando reservas do banco de dados</Text>
          </View>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground variant="primary">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.cinemaName}>UCI Kinoplex Shopping Recife</Text>
          <Text style={styles.movieTitle}>{movieTitle}</Text>
          <View style={styles.languageTag}>
            <Text style={styles.languageText}>{format}</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Horários */}
      {renderShowtimes()}

      {/* Tabs */}
      {renderTabs()}

      {/* Conteúdo principal */}
      <View style={styles.mainContent}>
        {activeTab === 'seats' ? (
          <View style={styles.seatMapContainer}>
            <FlatList
              data={seatMap}
              keyExtractor={(item) => item.letter}
              renderItem={renderSeatRow}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.seatMapContent}
            />
            
            {/* Tela */}
            <View style={styles.screen}>
              <Text style={styles.screenText}>TELA</Text>
            </View>
          </View>
        ) : (
          <View style={styles.pricesContainer}>
            <Text style={styles.pricesTitle}>Preços</Text>
            <Text style={styles.priceItem}>Inteira: R$ 32,00</Text>
            <Text style={styles.priceItem}>Meia: R$ 16,00</Text>
            <Text style={styles.priceItem}>Idoso: R$ 16,00</Text>
            <Text style={styles.priceItem}>Estudante: R$ 16,00</Text>
          </View>
        )}

        {/* Legenda */}
        {activeTab === 'seats' && renderLegend()}
      </View>

       {/* Botões de ação */}
       <View style={styles.actionsFooter}>
         {/* Botão desistir seleção */}
         {selectedSeats.length > 0 && (
           <TouchableOpacity
             style={styles.clearButton}
             onPress={() => {
               console.log('🔴 Botão Desistir clicado');
               console.log('📋 Assentos selecionados:', selectedSeats);
               
               Alert.alert(
                 'Desistir dos Assentos? 🎫',
                 `Você tem ${selectedSeats.length} assento(s) selecionado(s) (verdes).\n\nDeseja desmarcar todos?`,
                 [
                   {
                     text: 'Não',
                     style: 'cancel',
                     onPress: () => console.log('❌ Desistência cancelada')
                   },
                   {
                     text: 'Sim, Desmarcar',
                     style: 'destructive',
                     onPress: () => {
                       console.log('✅ Desmarcando assentos:', selectedSeats);
                       setSelectedSeats([]);
                       console.log('✓ Assentos desmarcados com sucesso');
                       
                       Alert.alert(
                         'Assentos Desmarcados! ✓',
                         'Todos os assentos selecionados foram desmarcados.'
                       );
                     }
                   }
                 ]
               );
             }}
             activeOpacity={0.7}
           >
             <Text style={styles.clearButtonText}>
               ✕ Desistir ({selectedSeats.length})
             </Text>
           </TouchableOpacity>
         )}
         
         {/* Botão de compra */}
         <TouchableOpacity
           style={[
             styles.buyButton,
             selectedSeats.length === 0 && styles.buyButtonDisabled
           ]}
           onPress={async () => {
             if (selectedSeats.length === 0) {
               Alert.alert('Selecione assentos', 'Por favor, selecione pelo menos um assento.');
               return;
             }

             if (!userId) {
               Alert.alert('Erro', 'Você precisa estar logado para fazer uma reserva.');
               return;
             }
             
             try {
               // Salva cada assento no banco de dados
               for (const seatId of selectedSeats) {
                 await createBooking({
                   userId: userId,
                   movieId: movieId,
                   movieTitle: movieTitle,
                   seatId: seatId,
                   sessionFormat: format,
                   sessionTime: time,
                   price: 32.00,
                 });
               }

               console.log('✅ Reservas salvas no banco de dados');
               
               // Marca os assentos como comprados (vermelhos)
               setPurchasedSeats([...purchasedSeats, ...selectedSeats]);
               
               const seats = selectedSeats.join(', ');
               
               // Limpa a seleção
               setSelectedSeats([]);
               
               Alert.alert(
                 'Compra realizada! 🎉',
                 `Assentos comprados: ${seats}\n\nFilme: ${movieTitle}\nHorário: ${time}\nFormato: ${format}\n\n✅ Reserva salva no sistema!`,
                 [
                   {
                     text: 'OK',
                     onPress: () => router.back()
                   }
                 ]
               );
             } catch (error: any) {
               console.error('Erro ao salvar reserva:', error);
               Alert.alert('Erro', error.message || 'Erro ao salvar reserva. Tente novamente.');
             }
           }}
           disabled={selectedSeats.length === 0}
         >
           <Text style={styles.buyButtonText}>
             Comprar {selectedSeats.length > 0 && `(${selectedSeats.length})`}
           </Text>
         </TouchableOpacity>
       </View>

       {/* Modal de seleção de assento */}
       {renderSeatModal()}
      </SafeAreaView>
    </GradientBackground>
   );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  loadingText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.light,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: Typography.sizes.sm,
    color: Colors.light,
    marginTop: Spacing.xs,
    textAlign: 'center',
    opacity: 0.9,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  headerLeft: {
    flex: 1,
  },
  cinemaName: {
    fontSize: Typography.sizes.sm,
    color: '#FFFFFF',
    marginBottom: Spacing.xs,
  },
  movieTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  languageTag: {
    backgroundColor: '#007AFF',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
  },
  languageText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: Typography.sizes.lg,
    color: '#FFFFFF',
    fontWeight: Typography.weights.bold,
  },
  
  // Showtimes
  showtimesContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  showtimeButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: 'transparent',
    marginRight: Spacing.sm,
  },
  selectedShowtimeButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  showtimeText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: '#FFFFFF',
  },
  selectedShowtimeText: {
    color: '#FFFFFF',
  },
  
  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  tab: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginRight: Spacing.lg,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.medium,
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: Typography.weights.bold,
  },
  
  // Main content
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  
  // Seat map
  seatMapContainer: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  seatMapContent: {
    paddingVertical: Spacing.md,
  },
  seatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  rowLabel: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
    width: 20,
    textAlign: 'center',
  },
  seatGroup: {
    flexDirection: 'row',
    gap: Spacing.xs,
    flex: 1,
  },
  aisle: {
    width: 20,
  },
  seat: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  specialSeat: {
    borderRadius: 4,
  },
  occupiedSeat: {
    backgroundColor: '#4A4A4A',
  },
  wheelchairSeat: {
    backgroundColor: '#007AFF',
  },
  reducedMobilitySeat: {
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  companionSeat: {
    backgroundColor: '#007AFF',
  },
  selectedSeat: {
    backgroundColor: '#22C55E', // Verde mais vibrante para assentos selecionados
  },
  purchasedSeat: {
    backgroundColor: '#F44336', // Vermelho para assentos comprados
  },
  seatIcon: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: Typography.weights.bold,
  },
  screen: {
    height: 40,
    backgroundColor: '#8E8E93',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginHorizontal: -Spacing.md,
  },
  screenText: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
  },
  
  // Legend
  legendContainer: {
    width: 200,
    padding: Spacing.md,
    backgroundColor: '#2a2a2a',
  },
  legendSection: {
    marginBottom: Spacing.md,
  },
  legendTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  legendIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendIconText: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  availableIcon: {
    backgroundColor: '#007AFF',
  },
  selectedIcon: {
    backgroundColor: '#22C55E',
  },
  purchasedIcon: {
    backgroundColor: '#F44336',
  },
  occupiedIcon: {
    backgroundColor: '#4A4A4A',
  },
  wheelchairIcon: {
    backgroundColor: '#007AFF',
  },
  reducedMobilityIcon: {
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  companionIcon: {
    backgroundColor: '#007AFF',
  },
  legendText: {
    fontSize: Typography.sizes.xs,
    color: '#FFFFFF',
  },
  
  // Prices
  pricesContainer: {
    flex: 1,
    padding: Spacing.lg,
  },
  pricesTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
    marginBottom: Spacing.lg,
  },
  priceItem: {
    fontSize: Typography.sizes.md,
    color: '#FFFFFF',
    marginBottom: Spacing.md,
  },
  
  // Buttons
  actionsFooter: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
  },
  buyButton: {
    backgroundColor: '#007AFF',
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  buyButtonDisabled: {
    backgroundColor: '#8E8E93',
    opacity: 0.5,
  },
  buyButtonText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: BorderRadius.lg,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  modalTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3a3a3a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: Typography.sizes.lg,
    color: '#FFFFFF',
    fontWeight: Typography.weights.bold,
  },
  modalBody: {
    padding: Spacing.lg,
  },
  seatInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  seatPreview: {
    alignItems: 'center',
  },
  seatPreviewIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  seatPreviewIconText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: Typography.weights.bold,
  },
  wheelchairPreview: {
    backgroundColor: '#007AFF',
  },
  reducedMobilityPreview: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  companionPreview: {
    backgroundColor: '#007AFF',
  },
  seatDetails: {
    flex: 1,
  },
  seatNumber: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  seatType: {
    fontSize: Typography.sizes.md,
    color: '#8E8E93',
    marginBottom: Spacing.sm,
  },
  seatPrice: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: '#22C55E',
  },
  modalActions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: '#3a3a3a',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.medium,
    color: '#FFFFFF',
  },
  selectButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: '#22C55E',
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
  },
});

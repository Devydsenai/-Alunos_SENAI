/**
 * Movie Sessions Screen
 * 
 * Tela de sessões de filmes como no cinema real.
 * Com tabs, seleção de dias e horários detalhados.
 */

import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { GradientBackground } from '../components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '../constants/theme';
import { fetchNowPlayingMovies } from '../services/tmdb.service';

interface MovieSession {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;
  duration: string;
  sessions: {
    format: string;
    times: string[];
  }[];
}

interface DayOption {
  date: string;
  day: string;
  dayNumber: string;
  isSelected: boolean;
}

export default function SessionsScreen() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MovieSession[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'sessions' | 'details'>('sessions');
  const [selectedFormat, setSelectedFormat] = useState('Normal');
  const [days, setDays] = useState<DayOption[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  /**
   * Gera dias da semana para seleção
   */
  const generateDays = () => {
    const today = new Date();
    const daysArray: DayOption[] = [];
    
    for (let i = 0; i < 16; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayNames = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
      const dayName = dayNames[date.getDay()];
      const dayNumber = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      
      daysArray.push({
        date: `${dayNumber}/${month}`,
        day: dayName,
        dayNumber: dayNumber,
        isSelected: i === 0, // Primeiro dia selecionado
      });
    }
    
    setDays(daysArray);
  };

  /**
   * Carrega as sessões
   */
  const loadSessions = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchNowPlayingMovies();
      const movies = res.results ?? [];
      
      // Simula dados de sessões para cada filme
      const sessionsData: MovieSession[] = movies.slice(0, 10).map((movie, index) => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.posterPath,
        voteAverage: movie.voteAverage,
        duration: `${Math.floor(Math.random() * 2) + 1}h${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        sessions: generateMovieSessions(index),
      }));

      setData(sessionsData);
    } catch (e: any) {
      setError(e.message ?? 'Erro ao carregar sessões');
      console.error('Error loading sessions:', e);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Gera sessões para um filme específico
   */
  const generateMovieSessions = (index: number) => {
    const sessionTypes = [
      { format: 'DUBLADO', times: ['14:30', '16:30', '19:30', '22:00'] },
      { format: 'LEGENDADO', times: ['17:00', '21:30'] },
      { format: '3D DUBLADO', times: ['19:00'] },
    ];

    // Varia as sessões baseado no índice
    if (index === 0) { // Tron: Ares
      return [
        { format: 'DUBLADO', times: ['14:30', '16:30', '19:30', '22:00'] },
        { format: 'LEGENDADO', times: ['17:00', '21:30'] },
        { format: '3D DUBLADO', times: ['19:00'] },
      ];
    } else if (index === 1) { // Demon Slayer
      return [
        { format: 'DUBLADO', times: ['20:50'] },
      ];
    }

    // Para outros filmes, gera sessões aleatórias
    const numSessions = Math.floor(Math.random() * 2) + 1;
    return sessionTypes.slice(0, numSessions);
  };

  useEffect(() => {
    generateDays();
    loadSessions();
  }, []);

  /**
   * Renderiza os tabs
   */
  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'sessions' && styles.activeTab]}
        onPress={() => setActiveTab('sessions')}
      >
        <Text style={[styles.tabText, activeTab === 'sessions' && styles.activeTabText]}>
          Sessões
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'details' && styles.activeTab]}
        onPress={() => setActiveTab('details')}
      >
        <Text style={[styles.tabText, activeTab === 'details' && styles.activeTabText]}>
          Detalhes
        </Text>
      </TouchableOpacity>
    </View>
  );

  /**
   * Renderiza seleção de dias
   */
  const renderDaysSelector = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysContainer}>
      {days.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.dayButton, day.isSelected && styles.selectedDayButton]}
          onPress={() => {
            const newDays = days.map((d, i) => ({
              ...d,
              isSelected: i === index,
            }));
            setDays(newDays);
          }}
        >
          <Text style={[styles.dayText, day.isSelected && styles.selectedDayText]}>
            {day.day}
          </Text>
          <Text style={[styles.dayNumber, day.isSelected && styles.selectedDayNumber]}>
            {day.dayNumber}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  /**
   * Renderiza filtros de formato
   */
  const renderFormatFilters = () => {
    const formats = ['Normal', 'Dublado', 'Legendado', '3D', 'Nacional'];
    
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        {formats.map((format) => (
          <TouchableOpacity
            key={format}
            style={[styles.filterButton, selectedFormat === format && styles.selectedFilterButton]}
            onPress={() => setSelectedFormat(format)}
          >
            <Text style={[styles.filterText, selectedFormat === format && styles.selectedFilterText]}>
              {format}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  /**
   * Renderiza um item de filme
   */
  const renderMovieItem = ({ item }: { item: MovieSession }) => (
    <View style={styles.movieItem}>
      <TouchableOpacity
        style={styles.posterContainer}
        onPress={() => router.push(`/movie/${item.id}` as any)}
      >
        <Image
          source={{ uri: item.posterPath }}
          style={styles.poster}
          resizeMode="cover"
        />
        <View style={styles.playButton}>
          <Text style={styles.playButtonText}>▶</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.movieDuration}>{item.duration}</Text>
        
        <View style={styles.sessionsContainer}>
          {item.sessions.map((session, index) => (
            <View key={index} style={styles.sessionGroup}>
              <TouchableOpacity style={styles.formatButton}>
                <Text style={styles.formatButtonText}>{session.format}</Text>
              </TouchableOpacity>
              
              <View style={styles.timesContainer}>
                {session.times.map((time, timeIndex) => {
                  const sessionKey = `${item.id}-${session.format}-${time}`;
                  const isSelected = selectedSession === sessionKey;
                  
                  return (
                    <TouchableOpacity 
                      key={timeIndex} 
                      style={[
                        styles.timeButton,
                        isSelected && styles.timeButtonSelected
                      ]}
                      onPress={() => {
                        setSelectedSession(sessionKey);
                      }}
                    >
                      <Text style={[
                        styles.timeButtonText,
                        isSelected && styles.timeButtonTextSelected
                      ]}>
                        {time}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {
            // Verifica se há uma sessão selecionada para este filme
            const hasSessionForThisMovie = selectedSession && selectedSession.startsWith(`${item.id}-`);
            
            if (!hasSessionForThisMovie) {
              Alert.alert('Selecione um horário', 'Por favor, selecione um horário para este filme antes de escolher os assentos.');
              return;
            }
            
            // Extrai informações da sessão selecionada
            const sessionParts = selectedSession.split('-');
            const format = sessionParts.slice(1, -1).join('-');
            const time = sessionParts[sessionParts.length - 1];
            
            router.push({
              pathname: '/seats',
              params: {
                movieId: item.id,
                movieTitle: item.title,
                format: format,
                time: time,
              }
            } as any);
          }}
        >
          <Text style={styles.actionIcon}>🪑</Text>
          <Text style={styles.actionText}>Assentos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>💰</Text>
          <Text style={styles.actionText}>Preços</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <GradientBackground variant="primary">
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={Colors.light} />
            <Text style={styles.loadingText}>Carregando sessões...</Text>
          </View>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  if (error) {
    return (
      <GradientBackground variant="primary">
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerContainer}>
            <Text style={styles.errorEmoji}>😕</Text>
            <Text style={styles.errorTitle}>Oops! Algo deu errado</Text>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground variant="primary">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
      
      {/* Header com tabs */}
      <View style={styles.header}>
        {renderTabs()}
        {renderDaysSelector()}
        {renderFormatFilters()}
      </View>

      {/* Lista de filmes */}
      <View style={styles.content}>
        <Text style={styles.contentTitle}>Toda a Programação</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={renderMovieItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: Spacing.md,
  },
  
  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: BorderRadius.xs,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.medium,
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: Typography.weights.bold,
  },
  
  // Days selector
  daysContainer: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  dayButton: {
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginHorizontal: 2,
    borderRadius: BorderRadius.sm,
    minWidth: 60,
  },
  selectedDayButton: {
    backgroundColor: '#007AFF',
  },
  dayText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.medium,
    color: '#8E8E93',
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  dayNumber: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
    marginTop: 2,
  },
  selectedDayNumber: {
    color: '#FFFFFF',
  },
  
  // Format filters
  filtersContainer: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  filterButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginHorizontal: 4,
    borderRadius: BorderRadius.sm,
    backgroundColor: '#2a2a2a',
  },
  selectedFilterButton: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: '#8E8E93',
  },
  selectedFilterText: {
    color: '#FFFFFF',
  },
  
  // Content
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
  },
  
  // Movie item
  movieItem: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  posterContainer: {
    position: 'relative',
    width: 80,
    height: 120,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 2,
  },
  
  // Movie info
  movieInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  movieTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
    marginBottom: Spacing.xs,
  },
  movieDuration: {
    fontSize: Typography.sizes.sm,
    color: '#8E8E93',
    marginBottom: Spacing.md,
  },
  
  // Sessions
  sessionsContainer: {
    gap: Spacing.sm,
  },
  sessionGroup: {
    gap: Spacing.xs,
  },
  formatButton: {
    backgroundColor: '#3a3a3a',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.xs,
    alignSelf: 'flex-start',
  },
  formatButtonText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
  },
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  timeButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.xs,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  timeButtonSelected: {
    backgroundColor: '#007AFF', // Azul quando selecionado
    borderColor: '#007AFF',
  },
  timeButtonText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: '#007AFF',
  },
  timeButtonTextSelected: {
    color: '#FFFFFF',
  },
  
  // Actions
  actionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionIcon: {
    fontSize: 20,
  },
  actionText: {
    fontSize: Typography.sizes.xs,
    color: '#8E8E93',
    fontWeight: Typography.weights.medium,
  },
  
  // Loading & Error
  loadingText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.light,
    marginTop: Spacing.md,
  },
  errorEmoji: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  errorTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.light,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: Typography.sizes.md,
    color: Colors.light,
    textAlign: 'center',
    opacity: 0.9,
  },
});

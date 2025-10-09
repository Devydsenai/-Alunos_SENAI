import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, View } from 'react-native';

export default function LoadScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animação de entrada
    Animated.parallel([
           Animated.timing(fadeAnim, {
             toValue: 1,
             duration: 1000,
             useNativeDriver: false,
           }),
           Animated.spring(scaleAnim, {
             toValue: 1,
             friction: 4,
             tension: 40,
             useNativeDriver: false,
           }),
    ]).start();

    // Redireciona para a tela de pesquisa após 3 segundos
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 3000);

    // Limpa o timer quando o componente for desmontado
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.title}>🎬 Bem vindo ao Cinema</Text>
        <ActivityIndicator size="large" color="#E50914" style={styles.loader} />
        <Text style={styles.subtitle}>Carregando...</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold' as 'bold',
    color: '#E50914',
    marginBottom: 40,
    textAlign: 'center' as 'center',
    letterSpacing: 2,
  },
  loader: {
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    opacity: 0.7,
    letterSpacing: 1,
  },
});

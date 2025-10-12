/**
 * GradientBackground Component
 * 
 * Componente reutilizável para criar fundos com gradientes modernos.
 * Suporta múltiplas variantes de cores predefinidas.
 */

import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/theme';

interface GradientBackgroundProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'dark';
  children?: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Componente que renderiza um fundo com gradiente
 * 
 * @param variant - Variante de cor do gradiente (padrão: 'primary')
 * @param children - Elementos filhos a serem renderizados sobre o gradiente
 * @param style - Estilos adicionais para o container
 */
export function GradientBackground({ 
  variant = 'primary', 
  children, 
  style 
}: GradientBackgroundProps) {
  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return [Colors.primary.start, Colors.primary.middle, Colors.primary.end];
      case 'secondary':
        return [Colors.secondary.start, Colors.secondary.end];
      case 'accent':
        return [Colors.accent.start, Colors.accent.end];
      case 'dark':
        return [Colors.dark, Colors.darkSecondary];
      default:
        return [Colors.primary.start, Colors.primary.end];
    }
  };

  return (
    <LinearGradient
      colors={getGradientColors() as [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


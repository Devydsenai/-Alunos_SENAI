/**
 * Card Component
 * 
 * Componente de card profissional com sombras e bordas arredondadas.
 * Ideal para exibir conteúdo agrupado com destaque visual.
 */

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
}

/**
 * Container estilizado em formato de card
 * 
 * @param children - Conteúdo do card
 * @param style - Estilos adicionais
 * @param variant - Variante visual do card (padrão: 'default')
 */
export function Card({ children, style, variant = 'default' }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        variant === 'elevated' && styles.elevated,
        variant === 'outlined' && styles.outlined,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.small,
  },
  elevated: {
    ...Shadows.large,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
});


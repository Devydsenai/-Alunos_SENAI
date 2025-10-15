/**
 * @fileoverview Tema e constantes de cores do aplicativo
 * Centraliza todas as cores, tamanhos e estilos reutilizáveis
 * @module constants/theme
 */

export const colors = {
  // Cores Principais
  primary: '#4CAF50',
  secondary: '#2196F3',
  tertiary: '#9C27B0',
  
  // Cores de Estado
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',
  
  // Cores de Fundo
  background: '#f5f5f5',
  backgroundLight: '#fff',
  backgroundDark: '#333',
  
  // Cores de Texto
  textPrimary: '#333',
  textSecondary: '#666',
  textDisabled: '#999',
  textLight: '#fff',
  
  // Cores de Borda
  border: '#e0e0e0',
  borderLight: '#f0f0f0',
  borderDark: '#ddd',
  
  // Outras
  shadow: '#000',
  overlay: 'rgba(0, 0, 0, 0.5)',
  placeholder: '#ccc',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 30,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 10,
  xl: 15,
  xxl: 20,
  round: 25,
  circle: 50,
};

export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  title: 24,
  largeTitle: 28,
};

export const fontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  bold: '700' as const,
  extraBold: '800' as const,
};

export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};


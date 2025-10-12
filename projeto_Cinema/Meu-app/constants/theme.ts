/**
 * Theme Configuration
 * 
 * Sistema de design profissional com cores gradientes modernas
 * e padrões consistentes para todo o aplicativo.
 */

export const Colors = {
  // Gradientes principais
  primary: {
    start: '#667eea',    // Roxo vibrante
    middle: '#764ba2',   // Roxo intermediário
    end: '#f093fb',      // Rosa suave
  },
  secondary: {
    start: '#4facfe',    // Azul claro
    end: '#00f2fe',      // Ciano
  },
  accent: {
    start: '#fa709a',    // Rosa
    end: '#fee140',      // Amarelo
  },
  
  // Cores sólidas
  dark: '#1a1a2e',
  darkSecondary: '#16213e',
  light: '#ffffff',
  lightSecondary: '#f8f9fa',
  
  // Estados
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  
  // Textos
  text: {
    primary: '#1a1a2e',
    secondary: '#6b7280',
    light: '#ffffff',
    disabled: '#9ca3af',
  },
  
  // Bordas e divisores
  border: '#e5e7eb',
  borderLight: '#f3f4f6',
  
  // Sombras
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.2)',
    dark: 'rgba(0, 0, 0, 0.3)',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
};

export const Shadows = {
  small: {
    shadowColor: Colors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: Colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: Colors.shadow.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const Animation = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
};


/**
 * Color System
 * Sistema de cores centralizado e organizado
 */

export const Colors = {
  // Cores Primárias - Gradientes
  primary: {
    start: '#6366f1',    // Indigo
    middle: '#8b5cf6',   // Purple
    end: '#d946ef',      // Fuchsia
  },

  // Cores de Background
  background: {
    primary: 'transparent',
    dark: '#1a1a1a',
    medium: '#2a2a2a',
    light: '#FFFFFF',
    lightSecondary: '#F5F5F7',
    overlay: 'rgba(0, 0, 0, 0.3)',
    overlayDark: 'rgba(0, 0, 0, 0.7)',
  },

  // Cores de Texto
  text: {
    primary: '#1C1C1E',
    secondary: '#8E8E93',
    light: '#FFFFFF',
    dark: '#000000',
  },

  // Cores de Estado
  status: {
    success: '#22C55E',     // Verde
    error: '#F44336',       // Vermelho
    warning: '#FF9500',     // Laranja
    info: '#007AFF',        // Azul
  },

  // Cores de Assentos
  seats: {
    available: '#007AFF',         // Azul - Disponível
    selected: '#22C55E',          // Verde - Selecionado
    purchased: '#F44336',         // Vermelho - Comprado
    occupied: '#4A4A4A',          // Cinza - Ocupado
    wheelchair: '#007AFF',        // Azul - Cadeirante
    reducedMobility: '#007AFF',   // Azul - Mobilidade Reduzida
    companion: '#007AFF',         // Azul - Acompanhante
  },

  // Cores de Botões
  buttons: {
    primary: '#007AFF',
    secondary: '#8E8E93',
    danger: '#FF3B30',
    warning: '#FF9500',
    success: '#22C55E',
    disabled: '#8E8E93',
  },

  // Cores de Bordas
  border: {
    light: '#E5E5EA',
    medium: '#2a2a2a',
    dark: '#3a3a3a',
    primary: '#007AFF',
  },

  // Cores Utilitárias
  utility: {
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
  },

  // Opacidades pré-definidas
  opacity: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.2)',
    heavy: 'rgba(255, 255, 255, 0.9)',
  },
} as const;

export type ColorPalette = typeof Colors;


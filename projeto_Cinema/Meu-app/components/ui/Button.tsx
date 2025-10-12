/**
 * Button Component
 * 
 * Componente de botão profissional com múltiplas variantes,
 * estados de carregamento e suporte a ícones.
 */

import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Botão customizável com gradientes e múltiplas variantes
 * 
 * @param title - Texto do botão
 * @param onPress - Função chamada ao pressionar o botão
 * @param variant - Estilo visual do botão (padrão: 'primary')
 * @param size - Tamanho do botão (padrão: 'medium')
 * @param loading - Mostra indicador de carregamento (padrão: false)
 * @param disabled - Desabilita o botão (padrão: false)
 * @param icon - Ícone opcional à esquerda do texto
 * @param style - Estilos adicionais para o container
 * @param textStyle - Estilos adicionais para o texto
 */
export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const getButtonHeight = () => {
    switch (size) {
      case 'small':
        return 40;
      case 'medium':
        return 52;
      case 'large':
        return 60;
      default:
        return 52;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return Typography.sizes.sm;
      case 'medium':
        return Typography.sizes.md;
      case 'large':
        return Typography.sizes.lg;
      default:
        return Typography.sizes.md;
    }
  };

  const renderContent = () => (
    <>
      {loading ? (
        <ActivityIndicator color={Colors.light} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              { fontSize: getFontSize() },
              variant === 'outline' && styles.textOutline,
              variant === 'ghost' && styles.textGhost,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </>
  );

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.8}
        style={[styles.container, { height: getButtonHeight(), opacity: isDisabled ? 0.5 : 1 }, style]}
      >
        <LinearGradient
          colors={[Colors.primary.start, Colors.primary.middle, Colors.primary.end]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Botões não-gradientes
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        styles.container,
        { height: getButtonHeight() },
        variant === 'secondary' && styles.secondary,
        variant === 'outline' && styles.outline,
        variant === 'ghost' && styles.ghost,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.small,
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  secondary: {
    backgroundColor: Colors.lightSecondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary.start,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  ghost: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: Colors.light,
    fontWeight: Typography.weights.semibold,
  },
  textOutline: {
    color: Colors.primary.start,
  },
  textGhost: {
    color: Colors.text.primary,
  },
});


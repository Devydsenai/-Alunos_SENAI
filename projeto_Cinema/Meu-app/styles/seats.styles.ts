/**
 * Seats Screen Styles
 * Estilos organizados com styled-components
 */

import styled from 'styled-components/native';
import { Colors } from '../constants/colors';
import { BorderRadius, Spacing, Typography } from '../constants/theme';

// Container Principal
export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: transparent;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${Spacing.xl}px;
`;

export const LoadingText = styled.Text`
  font-size: ${Typography.sizes.lg}px;
  font-weight: ${Typography.weights.semibold};
  color: ${Colors.text.light};
  margin-top: ${Spacing.md}px;
  text-align: center;
`;

export const LoadingSubtext = styled.Text`
  font-size: ${Typography.sizes.sm}px;
  color: ${Colors.text.light};
  margin-top: ${Spacing.xs}px;
  text-align: center;
  opacity: 0.9;
`;

// Header
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding-horizontal: ${Spacing.md}px;
  padding-vertical: ${Spacing.md}px;
`;

export const HeaderLeft = styled.View`
  flex: 1;
`;

export const CinemaName = styled.Text`
  font-size: ${Typography.sizes.sm}px;
  color: ${Colors.text.light};
  margin-bottom: ${Spacing.xs}px;
`;

export const MovieTitle = styled.Text`
  font-size: ${Typography.sizes.xl}px;
  font-weight: ${Typography.weights.bold};
  color: ${Colors.text.light};
  margin-bottom: ${Spacing.sm}px;
`;

export const LanguageTag = styled.View`
  background-color: ${Colors.buttons.primary};
  padding-horizontal: ${Spacing.sm}px;
  padding-vertical: 4px;
  border-radius: ${BorderRadius.sm}px;
  align-self: flex-start;
`;

export const LanguageText = styled.Text`
  font-size: ${Typography.sizes.xs}px;
  font-weight: ${Typography.weights.bold};
  color: ${Colors.text.light};
`;

export const CloseButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${Colors.background.medium};
  justify-content: center;
  align-items: center;
`;

export const CloseButtonText = styled.Text`
  font-size: ${Typography.sizes.lg}px;
  color: ${Colors.text.light};
  font-weight: ${Typography.weights.bold};
`;

// Botões de Ação
export const ActionsFooter = styled.View`
  flex-direction: row;
  padding: ${Spacing.md}px;
  gap: ${Spacing.sm}px;
  background-color: ${Colors.background.overlay};
  border-top-width: 1px;
  border-top-color: ${Colors.opacity.light};
`;

export const ClearButton = styled.TouchableOpacity`
  background-color: ${Colors.buttons.danger};
  padding-vertical: ${Spacing.md}px;
  padding-horizontal: ${Spacing.md}px;
  border-radius: ${BorderRadius.md}px;
  align-items: center;
  justify-content: center;
`;

export const ClearButtonText = styled.Text`
  font-size: ${Typography.sizes.sm}px;
  font-weight: ${Typography.weights.bold};
  color: ${Colors.text.light};
`;

export const BuyButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${props => props.disabled ? Colors.buttons.disabled : Colors.buttons.primary};
  opacity: ${props => props.disabled ? 0.5 : 1};
  flex: 1;
  padding-vertical: ${Spacing.md}px;
  border-radius: ${BorderRadius.md}px;
  align-items: center;
`;

export const BuyButtonText = styled.Text`
  font-size: ${Typography.sizes.lg}px;
  font-weight: ${Typography.weights.bold};
  color: ${Colors.text.light};
`;

// Legenda
export const LegendContainer = styled.View`
  width: 200px;
  padding: ${Spacing.md}px;
  background-color: ${Colors.background.medium};
`;

export const LegendSection = styled.View`
  margin-bottom: ${Spacing.md}px;
`;

export const LegendTitle = styled.Text`
  font-size: ${Typography.sizes.sm}px;
  font-weight: ${Typography.weights.bold};
  color: ${Colors.text.light};
  margin-bottom: ${Spacing.sm}px;
`;

export const LegendItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${Spacing.xs}px;
`;

export const LegendText = styled.Text`
  font-size: ${Typography.sizes.xs}px;
  color: ${Colors.text.light};
`;

// Tabs
export const TabsContainer = styled.View`
  flex-direction: row;
  padding-horizontal: ${Spacing.md}px;
  padding-vertical: ${Spacing.sm}px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.background.medium};
`;

export const Tab = styled.TouchableOpacity<{ active?: boolean }>`
  padding-vertical: ${Spacing.sm}px;
  padding-horizontal: ${Spacing.md}px;
  margin-right: ${Spacing.lg}px;
  ${props => props.active && `
    border-bottom-width: 2px;
    border-bottom-color: ${Colors.buttons.primary};
  `}
`;

export const TabText = styled.Text<{ active?: boolean }>`
  font-size: ${Typography.sizes.md}px;
  font-weight: ${props => props.active ? Typography.weights.bold : Typography.weights.medium};
  color: ${props => props.active ? Colors.buttons.primary : Colors.text.secondary};
`;

// Mapa de Assentos
export const MainContent = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const SeatMapContainer = styled.View`
  flex: 1;
  padding-horizontal: ${Spacing.md}px;
`;

export const SeatRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${Spacing.sm}px;
  gap: ${Spacing.sm}px;
`;

export const RowLabel = styled.Text`
  font-size: ${Typography.sizes.sm}px;
  font-weight: ${Typography.weights.bold};
  color: ${Colors.text.light};
  width: 20px;
  text-align: center;
`;

export const SeatGroup = styled.View`
  flex-direction: row;
  gap: ${Spacing.xs}px;
  flex: 1;
`;

export const Aisle = styled.View`
  width: 20px;
`;

export const Screen = styled.View`
  height: 40px;
  background-color: #8E8E93;
  justify-content: center;
  align-items: center;
  margin-top: ${Spacing.lg}px;
  margin-horizontal: -${Spacing.md}px;
`;

export const ScreenText = styled.Text`
  font-size: ${Typography.sizes.md}px;
  font-weight: ${Typography.weights.bold};
  color: ${Colors.text.light};
`;

// Preços
export const PricesContainer = styled.View`
  flex: 1;
  padding: ${Spacing.lg}px;
`;

export const PricesTitle = styled.Text`
  font-size: ${Typography.sizes.lg}px;
  font-weight: ${Typography.weights.bold};
  color: ${Colors.text.light};
  margin-bottom: ${Spacing.lg}px;
`;

export const PriceItem = styled.Text`
  font-size: ${Typography.sizes.md}px;
  color: ${Colors.text.light};
  margin-bottom: ${Spacing.md}px;
`;

// Modal
export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  padding: ${Spacing.lg}px;
`;

export const ModalContent = styled.View`
  background-color: ${Colors.background.medium};
  border-radius: ${BorderRadius.lg}px;
  width: 100%;
  max-width: 400px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${Spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.border.dark};
`;

export const ModalTitle = styled.Text`
  font-size: ${Typography.sizes.lg}px;
  font-weight: ${Typography.weights.bold};
  color: ${Colors.text.light};
`;

export const ModalBody = styled.View`
  padding: ${Spacing.lg}px;
`;

export const SeatInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${Spacing.lg}px;
  gap: ${Spacing.md}px;
`;

export const SeatDetails = styled.View`
  flex: 1;
`;

export const SeatNumber = styled.Text`
  font-size: ${Typography.sizes.xl}px;
  font-weight: ${Typography.weights.bold};
  color: ${Colors.text.light};
  margin-bottom: ${Spacing.sm}px;
`;

export const SeatType = styled.Text`
  font-size: ${Typography.sizes.md}px;
  color: ${Colors.text.secondary};
  margin-bottom: ${Spacing.sm}px;
`;

export const SeatPrice = styled.Text`
  font-size: ${Typography.sizes.lg}px;
  font-weight: ${Typography.weights.bold};
  color: ${Colors.status.success};
`;

export const ModalActions = styled.View`
  flex-direction: row;
  gap: ${Spacing.md}px;
`;

export const CancelButton = styled.TouchableOpacity`
  flex: 1;
  padding-vertical: ${Spacing.md}px;
  border-radius: ${BorderRadius.md}px;
  background-color: ${Colors.border.dark};
  align-items: center;
`;

export const CancelButtonText = styled.Text`
  font-size: ${Typography.sizes.md}px;
  font-weight: ${Typography.weights.medium};
  color: ${Colors.text.light};
`;

export const SelectButton = styled.TouchableOpacity`
  flex: 1;
  padding-vertical: ${Spacing.md}px;
  border-radius: ${BorderRadius.md}px;
  background-color: ${Colors.status.success};
  align-items: center;
`;

export const SelectButtonText = styled.Text`
  font-size: ${Typography.sizes.md}px;
  font-weight: ${Typography.weights.bold};
  color: ${Colors.text.light};
`;



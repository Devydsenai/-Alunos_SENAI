import styled from 'styled-components/native';
import { borderRadius, colors, fontSize, fontWeight, spacing } from '../../constants/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.xl}px;
  background-color: ${colors.backgroundLight};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`;

export const Title = styled.Text`
  font-size: ${fontSize.title}px;
  font-weight: ${fontWeight.bold};
  color: ${colors.textPrimary};
`;

export const BotaoFiltro = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.warning};
  padding-horizontal: ${spacing.lg}px;
  padding-vertical: ${spacing.sm}px;
  border-radius: ${borderRadius.xxl}px;
  gap: 5px;
`;

export const BotaoFiltroTexto = styled.Text`
  color: ${colors.textLight};
  font-size: ${fontSize.md}px;
  font-weight: ${fontWeight.bold};
`;

export const Resumo = styled.View`
  flex-direction: row;
  background-color: ${colors.backgroundLight};
  padding: ${spacing.lg}px;
  margin-bottom: ${spacing.sm}px;
`;

export const ResumoItem = styled.View`
  flex: 1;
  align-items: center;
`;

export const ResumoValor = styled.Text<{ alerta?: boolean }>`
  font-size: ${fontSize.title}px;
  font-weight: ${fontWeight.bold};
  color: ${(props: { alerta?: boolean }) => props.alerta ? colors.warning : colors.success};
`;

export const ResumoLabel = styled.Text`
  font-size: ${fontSize.sm}px;
  color: ${colors.textSecondary};
  margin-top: 4px;
`;

export const ResumoDivider = styled.View`
  width: 1px;
  background-color: ${colors.border};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LoadingText = styled.Text`
  font-size: ${fontSize.lg}px;
  color: ${colors.textSecondary};
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${spacing.xl}px;
`;

export const EmptyText = styled.Text`
  font-size: ${fontSize.xl}px;
  color: ${colors.textSecondary};
  margin-top: ${spacing.lg}px;
`;

export const EmptySubtext = styled.Text`
  font-size: ${fontSize.md}px;
  color: ${colors.textDisabled};
  margin-top: ${spacing.sm}px;
`;

export const Lista = styled.FlatList`
  flex: 1;
  padding: ${spacing.sm}px;
`;

export const Card = styled.View<{ alerta?: boolean }>`
  background-color: ${colors.backgroundLight};
  padding: ${spacing.lg}px;
  margin-bottom: ${spacing.sm}px;
  border-radius: ${borderRadius.lg}px;
  border-left-width: ${(props: { alerta?: boolean }) => props.alerta ? 4 : 0}px;
  border-left-color: ${colors.warning};
`;

export const CardContent = styled.View`
  flex-direction: row;
  margin-bottom: ${spacing.sm}px;
`;

export const ProdutoFoto = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: ${borderRadius.md}px;
  margin-right: ${spacing.md}px;
`;

export const ProdutoSemFoto = styled.View`
  width: 60px;
  height: 60px;
  border-radius: ${borderRadius.md}px;
  background-color: ${colors.borderLight};
  justify-content: center;
  align-items: center;
  margin-right: ${spacing.md}px;
`;

export const ProdutoInfo = styled.View`
  flex: 1;
`;

export const ProdutoNome = styled.Text`
  font-size: ${fontSize.lg}px;
  font-weight: ${fontWeight.bold};
  color: ${colors.textPrimary};
  margin-bottom: 4px;
`;

export const Localizacao = styled.Text`
  font-size: ${fontSize.sm}px;
  color: ${colors.textSecondary};
  margin-bottom: 4px;
`;

export const EstoqueInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
`;

export const Quantidade = styled.Text<{ baixo?: boolean }>`
  font-size: ${fontSize.xl}px;
  font-weight: ${fontWeight.bold};
  color: ${(props: { baixo?: boolean }) => props.baixo ? colors.warning : colors.success};
`;

export const MinimoText = styled.Text`
  font-size: ${fontSize.sm}px;
  color: ${colors.textDisabled};
`;

export const DataText = styled.Text`
  font-size: ${fontSize.xs}px;
  color: ${colors.textDisabled};
  margin-top: 4px;
`;

export const AlertaBadge = styled.View`
  background-color: ${colors.warning};
  width: 36px;
  height: 36px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
`;

export const BotoesContainer = styled.View`
  flex-direction: row;
  gap: ${spacing.sm}px;
`;

export const BotaoEntrada = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.success};
  padding-horizontal: ${spacing.md}px;
  padding-vertical: ${spacing.sm}px;
  border-radius: 6px;
  gap: 4px;
  flex: 1;
  justify-content: center;
`;

export const BotaoSaida = styled.TouchableOpacity<{ disabled?: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.info};
  padding-horizontal: ${spacing.md}px;
  padding-vertical: ${spacing.sm}px;
  border-radius: 6px;
  gap: 4px;
  flex: 1;
  justify-content: center;
  opacity: ${(props: { disabled?: boolean }) => props.disabled ? 0.5 : 1};
`;

export const BotaoTexto = styled.Text`
  color: ${colors.textLight};
  font-size: ${fontSize.md}px;
  font-weight: ${fontWeight.bold};
`;

// Modal
export const ModalOverlay = styled.View`
  flex: 1;
  background-color: ${colors.overlay};
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: ${colors.backgroundLight};
  border-radius: ${borderRadius.xl}px;
  padding: ${spacing.xl}px;
  width: 90%;
`;

export const ModalTitle = styled.Text`
  font-size: ${fontSize.xxl}px;
  font-weight: ${fontWeight.bold};
  color: ${colors.textPrimary};
  text-align: center;
  margin-bottom: ${spacing.xl}px;
`;

export const EstoqueAtualInfo = styled.View`
  background-color: #E3F2FD;
  padding: ${spacing.md}px;
  border-radius: ${borderRadius.md}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.lg}px;
`;

export const EstoqueAtualLabel = styled.Text`
  font-size: ${fontSize.md}px;
  color: ${colors.textSecondary};
`;

export const EstoqueAtualValor = styled.Text`
  font-size: ${fontSize.xxl}px;
  font-weight: ${fontWeight.bold};
  color: ${colors.info};
`;

export const Input = styled.TextInput`
  background-color: ${colors.background};
  padding-horizontal: ${spacing.lg}px;
  padding-vertical: ${spacing.md}px;
  border-radius: ${borderRadius.lg}px;
  font-size: ${fontSize.lg}px;
  margin-bottom: ${spacing.xl}px;
  border-width: 1px;
  border-color: ${colors.border};
`;

export const ModalButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ModalButton = styled.TouchableOpacity`
  padding-horizontal: ${spacing.xl}px;
  padding-vertical: ${spacing.md}px;
  border-radius: ${borderRadius.round}px;
  flex: 1;
  margin-horizontal: 5px;
`;

export const CancelButton = styled(ModalButton)`
  background-color: ${colors.background};
  border-width: 1px;
  border-color: ${colors.borderDark};
`;

export const SaveButton = styled(ModalButton)`
  background-color: ${colors.success};
`;

export const CancelButtonText = styled.Text`
  color: ${colors.textSecondary};
  font-size: ${fontSize.lg}px;
  font-weight: ${fontWeight.bold};
  text-align: center;
`;

export const SaveButtonText = styled.Text`
  color: ${colors.textLight};
  font-size: ${fontSize.lg}px;
  font-weight: ${fontWeight.bold};
  text-align: center;
`;


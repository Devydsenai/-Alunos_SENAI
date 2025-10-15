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

export const BotaoAdicionar = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.primary};
  padding-horizontal: ${spacing.lg}px;
  padding-vertical: ${spacing.sm}px;
  border-radius: ${borderRadius.xxl}px;
  gap: 5px;
`;

export const BotaoAdicionarTexto = styled.Text`
  color: ${colors.textLight};
  font-size: ${fontSize.md}px;
  font-weight: ${fontWeight.bold};
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

export const Card = styled.View<{ inativo?: boolean }>`
  background-color: ${(props: { inativo?: boolean }) => props.inativo ? colors.background : colors.backgroundLight};
  padding: ${spacing.lg}px;
  margin-bottom: ${spacing.sm}px;
  border-radius: ${borderRadius.lg}px;
  opacity: ${(props: { inativo?: boolean }) => props.inativo ? 0.7 : 1};
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${spacing.sm}px;
`;

export const CardInfo = styled.View`
  flex: 1;
  margin-right: ${spacing.sm}px;
`;

export const CardNome = styled.Text<{ inativo?: boolean }>`
  font-size: ${fontSize.lg}px;
  font-weight: ${fontWeight.bold};
  color: ${(props: { inativo?: boolean }) => props.inativo ? colors.textDisabled : colors.textPrimary};
  margin-bottom: 4px;
`;

export const CardDescricao = styled.Text<{ inativo?: boolean }>`
  font-size: ${fontSize.md}px;
  color: ${(props: { inativo?: boolean }) => props.inativo ? colors.textDisabled : colors.textSecondary};
`;

export const StatusBadge = styled.View<{ ativo: boolean }>`
  padding-horizontal: ${spacing.sm}px;
  padding-vertical: 4px;
  border-radius: ${borderRadius.lg}px;
  background-color: ${(props: { ativo: boolean }) => props.ativo ? colors.success : colors.error};
  align-self: flex-start;
`;

export const StatusText = styled.Text`
  color: ${colors.textLight};
  font-size: ${fontSize.xs}px;
  font-weight: ${fontWeight.bold};
`;

export const BotoesContainer = styled.View`
  flex-direction: row;
  gap: ${spacing.sm}px;
`;

export const BotaoEditar = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.info};
  padding-horizontal: ${spacing.md}px;
  padding-vertical: 6px;
  border-radius: 6px;
  gap: 4px;
`;

export const BotaoDeletar = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.error};
  padding-horizontal: ${spacing.md}px;
  padding-vertical: 6px;
  border-radius: 6px;
  gap: 4px;
`;

export const BotaoTexto = styled.Text`
  color: ${colors.textLight};
  font-size: ${fontSize.sm}px;
  font-weight: ${fontWeight.bold};
`;

// Modal Styles
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
  max-height: 80%;
`;

export const ModalTitle = styled.Text`
  font-size: ${fontSize.xxl}px;
  font-weight: ${fontWeight.bold};
  color: ${colors.textPrimary};
  text-align: center;
  margin-bottom: ${spacing.xl}px;
`;

export const ModalForm = styled.ScrollView`
  max-height: 300px;
`;

export const Input = styled.TextInput`
  background-color: ${colors.background};
  padding-horizontal: ${spacing.lg}px;
  padding-vertical: ${spacing.md}px;
  border-radius: ${borderRadius.lg}px;
  font-size: ${fontSize.lg}px;
  margin-bottom: ${spacing.lg}px;
  border-width: 1px;
  border-color: ${colors.border};
`;

export const InputMultiline = styled(Input)`
  height: 80px;
  text-align-vertical: top;
`;

export const CheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${spacing.xl}px;
`;

export const Checkbox = styled.TouchableOpacity<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-width: 2px;
  border-color: ${(props: { checked: boolean }) => props.checked ? colors.success : colors.borderDark};
  border-radius: ${borderRadius.sm}px;
  margin-right: ${spacing.sm}px;
  justify-content: center;
  align-items: center;
  background-color: ${(props: { checked: boolean }) => props.checked ? colors.success : 'transparent'};
`;

export const CheckboxText = styled.Text`
  color: ${colors.textLight};
  font-size: ${fontSize.lg}px;
  font-weight: ${fontWeight.bold};
`;

export const CheckboxLabel = styled.Text`
  font-size: ${fontSize.lg}px;
  color: ${colors.textPrimary};
`;

export const ModalButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${spacing.xl}px;
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


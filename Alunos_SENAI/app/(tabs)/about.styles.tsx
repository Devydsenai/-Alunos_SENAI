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
  flex: 1;
`;

export const HeaderButtons = styled.View`
  flex-direction: row;
  gap: ${spacing.sm}px;
`;

export const BotaoAdicionar = styled.TouchableOpacity`
  background-color: ${colors.primary};
  padding-horizontal: ${spacing.lg}px;
  padding-vertical: ${spacing.sm}px;
  border-radius: ${borderRadius.xxl}px;
`;

export const BotaoAdicionarTexto = styled.Text`
  color: ${colors.textLight};
  font-size: ${fontSize.md}px;
  font-weight: ${fontWeight.bold};
`;

export const BotaoAtualizar = styled.TouchableOpacity`
  background-color: ${colors.info};
  padding-horizontal: ${spacing.lg}px;
  padding-vertical: ${spacing.sm}px;
  border-radius: ${borderRadius.xxl}px;
`;

export const BotaoAtualizarTexto = styled.Text`
  color: ${colors.textLight};
  font-size: ${fontSize.md}px;
  font-weight: ${fontWeight.bold};
`;

export const SearchContainer = styled.View`
  padding: ${spacing.lg}px;
  background-color: ${colors.backgroundLight};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`;

export const SearchInput = styled.TextInput`
  background-color: ${colors.background};
  padding-horizontal: ${spacing.lg}px;
  padding-vertical: ${spacing.md}px;
  border-radius: ${borderRadius.round}px;
  font-size: ${fontSize.lg}px;
  border-width: 1px;
  border-color: ${colors.border};
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
  margin-bottom: ${spacing.sm}px;
`;

export const EmptySubtext = styled.Text`
  font-size: ${fontSize.md}px;
  color: ${colors.textDisabled};
  text-align: center;
`;

export const Lista = styled.FlatList`
  flex: 1;
  padding: ${spacing.sm}px;
`;

export const ClienteCard = styled.View<{ inativo?: boolean }>`
  background-color: ${(props: { inativo?: boolean }) => props.inativo ? colors.background : colors.backgroundLight};
  padding: ${spacing.lg}px;
  margin-bottom: ${spacing.lg}px;
  margin-horizontal: ${spacing.sm}px;
  border-radius: ${borderRadius.lg}px;
  opacity: ${(props: { inativo?: boolean }) => props.inativo ? 0.7 : 1};
`;

export const ClienteHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing.lg}px;
`;

export const ClienteFoto = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: ${borderRadius.md}px;
  margin-right: ${spacing.sm}px;
  border-width: 2px;
  border-color: ${colors.primary};
`;

export const ClienteSemFoto = styled.View`
  width: 200px;
  height: 200px;
  border-radius: ${borderRadius.md}px;
  margin-right: ${spacing.sm}px;
  background-color: ${colors.borderLight};
  justify-content: center;
  align-items: center;
`;

export const ClienteInfo = styled.View`
  flex: 1;
  margin-right: ${spacing.sm}px;
`;

export const ClienteNome = styled.Text<{ inativo?: boolean }>`
  font-size: ${fontSize.lg}px;
  font-weight: ${fontWeight.bold};
  color: ${(props: { inativo?: boolean }) => props.inativo ? colors.textDisabled : colors.textPrimary};
  margin-bottom: 2px;
`;

export const ClienteEmail = styled.Text<{ inativo?: boolean }>`
  font-size: ${fontSize.sm}px;
  color: ${(props: { inativo?: boolean }) => props.inativo ? colors.textDisabled : colors.textSecondary};
  margin-bottom: 2px;
`;

export const ClienteTelefone = styled.Text<{ inativo?: boolean }>`
  font-size: ${fontSize.sm}px;
  color: ${(props: { inativo?: boolean }) => props.inativo ? colors.textDisabled : colors.textSecondary};
`;

export const StatusBadge = styled.View<{ ativo: boolean }>`
  padding-horizontal: ${spacing.sm}px;
  padding-vertical: 3px;
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
  justify-content: flex-end;
  margin-top: 150px;
  gap: 2px;
`;

export const BotaoEditar = styled.TouchableOpacity`
  background-color: ${colors.info};
  padding-horizontal: 6px;
  padding-vertical: 3px;
  border-radius: 5px;
  min-width: 40px;
  height: 22px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

export const BotaoStatus = styled.TouchableOpacity<{ ativo: boolean }>`
  background-color: ${(props: { ativo: boolean }) => props.ativo ? colors.warning : colors.success};
  padding-horizontal: 6px;
  padding-vertical: 3px;
  border-radius: 5px;
  min-width: 40px;
  height: 22px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

export const BotaoTeste = styled.TouchableOpacity`
  background-color: ${colors.error};
  padding-horizontal: 6px;
  padding-vertical: 3px;
  border-radius: 5px;
  min-width: 40px;
  height: 22px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

export const BotaoTexto = styled.Text`
  color: ${colors.textLight};
  font-size: 8px;
  font-weight: ${fontWeight.bold};
  text-align: center;
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


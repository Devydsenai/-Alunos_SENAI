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

export const Lista = styled.FlatList`
  flex: 1;
  padding: ${spacing.sm}px;
`;

export const Card = styled.View<{ inativo?: boolean }>`
  background-color: ${colors.backgroundLight};
  padding: ${spacing.md}px;
  margin-bottom: ${spacing.sm}px;
  border-radius: ${borderRadius.lg}px;
  opacity: ${(props: { inativo?: boolean }) => props.inativo ? 0.6 : 1};
`;

export const CardContent = styled.View`
  flex-direction: row;
  margin-bottom: ${spacing.sm}px;
`;

export const ProdutoFoto = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: ${borderRadius.md}px;
  margin-right: ${spacing.md}px;
`;

export const ProdutoSemFoto = styled.View`
  width: 80px;
  height: 80px;
  border-radius: ${borderRadius.md}px;
  background-color: ${colors.borderLight};
  justify-content: center;
  align-items: center;
  margin-right: ${spacing.md}px;
`;

export const ProdutoInfo = styled.View`
  flex: 1;
`;

export const ProdutoNome = styled.Text<{ inativo?: boolean }>`
  font-size: ${fontSize.lg}px;
  font-weight: ${fontWeight.bold};
  color: ${(props: { inativo?: boolean }) => props.inativo ? colors.textDisabled : colors.textPrimary};
  margin-bottom: 4px;
`;

export const ProdutoDescricao = styled.Text<{ inativo?: boolean }>`
  font-size: ${fontSize.sm}px;
  color: ${(props: { inativo?: boolean }) => props.inativo ? colors.textDisabled : colors.textSecondary};
  margin-bottom: 4px;
`;

export const ProdutoCategoria = styled.Text`
  font-size: 11px;
  color: ${colors.info};
`;

export const ProdutoFornecedor = styled.Text`
  font-size: 11px;
  color: ${colors.tertiary};
`;

export const PrecosContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4px;
`;

export const Preco = styled.Text`
  font-size: ${fontSize.md}px;
  font-weight: ${fontWeight.bold};
  color: ${colors.success};
`;

export const CodigoBarras = styled.Text`
  font-size: ${fontSize.xs}px;
  color: ${colors.textDisabled};
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
  width: 95%;
  max-height: 90%;
`;

export const ModalTitle = styled.Text`
  font-size: ${fontSize.xxl}px;
  font-weight: ${fontWeight.bold};
  color: ${colors.textPrimary};
  text-align: center;
  margin-bottom: ${spacing.lg}px;
`;

export const ModalForm = styled.ScrollView`
  max-height: 500px;
`;

export const FotoContainer = styled.View`
  align-items: center;
  margin-bottom: ${spacing.lg}px;
`;

export const FotoPreview = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: ${borderRadius.md}px;
  margin-bottom: ${spacing.sm}px;
`;

export const SemFoto = styled.View`
  width: 100px;
  height: 100px;
  border-radius: ${borderRadius.md}px;
  background-color: ${colors.borderLight};
  justify-content: center;
  align-items: center;
  margin-bottom: ${spacing.sm}px;
`;

export const FotoBotoes = styled.View`
  flex-direction: row;
  gap: ${spacing.sm}px;
`;

export const BotaoFoto = styled.TouchableOpacity`
  background-color: ${colors.info};
  padding: ${spacing.sm}px;
  border-radius: ${borderRadius.md}px;
`;

export const BotaoGaleria = styled.TouchableOpacity`
  background-color: ${colors.tertiary};
  padding: ${spacing.sm}px;
  border-radius: ${borderRadius.md}px;
`;

export const Input = styled.TextInput`
  background-color: ${colors.background};
  padding-horizontal: ${spacing.lg}px;
  padding-vertical: ${spacing.md}px;
  border-radius: ${borderRadius.lg}px;
  font-size: ${fontSize.md}px;
  margin-bottom: ${spacing.md}px;
  border-width: 1px;
  border-color: ${colors.border};
`;

export const InputMultiline = styled(Input)`
  height: 60px;
  text-align-vertical: top;
`;

export const CodigoBarrasContainer = styled.View`
  flex-direction: row;
  gap: ${spacing.sm}px;
  margin-bottom: ${spacing.md}px;
`;

export const BotaoBuscarCodigo = styled.TouchableOpacity`
  background-color: ${colors.warning};
  padding: ${spacing.md}px;
  border-radius: ${borderRadius.lg}px;
  justify-content: center;
`;

export const PickerContainer = styled.View`
  margin-bottom: ${spacing.md}px;
`;

export const PickerLabel = styled.Text`
  font-size: ${fontSize.md}px;
  font-weight: ${fontWeight.bold};
  color: ${colors.textSecondary};
  margin-bottom: ${spacing.sm}px;
`;

export const PickerItem = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${(props: { selected: boolean }) => props.selected ? colors.success : colors.borderLight};
  padding-horizontal: ${spacing.md}px;
  padding-vertical: ${spacing.sm}px;
  border-radius: ${borderRadius.xl}px;
  margin-right: ${spacing.sm}px;
`;

export const PickerItemText = styled.Text<{ selected: boolean }>`
  font-size: ${fontSize.sm}px;
  color: ${(props: { selected: boolean }) => props.selected ? colors.textLight : colors.textSecondary};
  font-weight: ${(props: { selected: boolean }) => props.selected ? fontWeight.bold : fontWeight.normal};
`;

export const Row = styled.View`
  flex-direction: row;
  gap: ${spacing.sm}px;
`;

export const ModalButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${spacing.lg}px;
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


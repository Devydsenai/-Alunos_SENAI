import styled from 'styled-components/native';
import { borderRadius, colors, fontSize, fontWeight, spacing } from '../../constants/theme';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.background};
`;

export const Content = styled.View`
  padding: ${spacing.xl}px;
`;

export const Title = styled.Text`
  font-size: ${fontSize.largeTitle}px;
  font-weight: ${fontWeight.bold};
  color: ${colors.textPrimary};
  text-align: center;
  margin-bottom: ${spacing.sm}px;
`;

export const Subtitle = styled.Text`
  font-size: ${fontSize.xl}px;
  color: ${colors.textSecondary};
  text-align: center;
  margin-bottom: ${spacing.xxl}px;
`;

export const SearchContainer = styled.View`
  margin-bottom: ${spacing.xl}px;
  position: relative;
  z-index: 1000;
`;

export const SearchInput = styled.TextInput`
  background-color: ${colors.backgroundLight};
  padding-horizontal: ${spacing.lg}px;
  padding-vertical: ${spacing.md}px;
  border-radius: ${borderRadius.round}px;
  font-size: ${fontSize.lg}px;
  border-width: 1px;
  border-color: ${colors.border};
`;

export const SugestoesContainer = styled.View`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${colors.backgroundLight};
  border-radius: ${borderRadius.lg}px;
  border-width: 1px;
  border-color: ${colors.border};
  margin-top: 5px;
  max-height: 200px;
  z-index: 1001;
`;

export const SugestaoItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderLight};
`;

export const SugestaoInfo = styled.View`
  flex: 1;
  margin-right: ${spacing.sm}px;
`;

export const SugestaoNome = styled.Text<{ inativo?: boolean }>`
  font-size: ${fontSize.md}px;
  font-weight: ${fontWeight.bold};
  color: ${(props: { inativo?: boolean }) => props.inativo ? colors.textDisabled : colors.textPrimary};
  margin-bottom: 2px;
`;

export const SugestaoEmail = styled.Text<{ inativo?: boolean }>`
  font-size: ${fontSize.sm}px;
  color: ${(props: { inativo?: boolean }) => props.inativo ? colors.textDisabled : colors.textSecondary};
`;

export const SugestaoStatus = styled.View<{ ativo: boolean }>`
  padding-horizontal: 6px;
  padding-vertical: 2px;
  border-radius: ${borderRadius.md}px;
  background-color: ${(props: { ativo: boolean }) => props.ativo ? colors.success : colors.error};
`;

export const SugestaoStatusText = styled.Text`
  color: ${colors.textLight};
  font-size: ${fontSize.xs}px;
  font-weight: ${fontWeight.bold};
`;

export const FormContainer = styled.View`
  background-color: ${colors.backgroundLight};
  padding: ${spacing.xl}px;
  border-radius: ${borderRadius.xl}px;
  margin-bottom: ${spacing.xl}px;
`;

export const FormTitle = styled.Text`
  font-size: ${fontSize.xxl}px;
  font-weight: ${fontWeight.bold};
  color: ${colors.textPrimary};
  margin-bottom: ${spacing.xl}px;
  text-align: center;
`;

export const FotoContainer = styled.View`
  align-items: center;
  margin-bottom: ${spacing.xl}px;
  padding-vertical: ${spacing.xl}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`;

export const FotoPreviewContainer = styled.View`
  position: relative;
  margin-bottom: ${spacing.lg}px;
`;

export const FotoPreview = styled.Image`
  width: 90px;
  height: 120px;
  border-radius: ${borderRadius.lg}px;
  border-width: 3px;
  border-color: ${colors.primary};
`;

export const BotaoRemoverFoto = styled.TouchableOpacity`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: ${colors.backgroundLight};
  border-radius: ${borderRadius.xl}px;
`;

export const SemFoto = styled.View`
  align-items: center;
  margin-bottom: ${spacing.lg}px;
`;

export const SemFotoTexto = styled.Text`
  font-size: ${fontSize.sm}px;
  color: ${colors.textDisabled};
  margin-top: 5px;
`;

export const BotoesContainer = styled.View`
  flex-direction: row;
  gap: ${spacing.sm}px;
`;

export const BotaoFoto = styled.TouchableOpacity`
  background-color: ${colors.info};
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${spacing.xl}px;
  padding-vertical: ${spacing.sm}px;
  border-radius: ${borderRadius.xxl}px;
  gap: ${spacing.sm}px;
`;

export const BotaoGaleria = styled.TouchableOpacity`
  background-color: ${colors.tertiary};
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${spacing.xl}px;
  padding-vertical: ${spacing.sm}px;
  border-radius: ${borderRadius.xxl}px;
  gap: ${spacing.sm}px;
`;

export const BotaoFotoTexto = styled.Text`
  color: ${colors.textLight};
  font-size: ${fontSize.md}px;
  font-weight: ${fontWeight.bold};
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

export const CreateButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${(props: { disabled?: boolean }) => props.disabled ? colors.placeholder : colors.success};
  padding-horizontal: ${spacing.xl}px;
  padding-vertical: ${spacing.lg}px;
  border-radius: ${borderRadius.round}px;
  align-items: center;
`;

export const CreateButtonText = styled.Text`
  color: ${colors.textLight};
  font-size: ${fontSize.lg}px;
  font-weight: ${fontWeight.bold};
`;

export const LinkContainer = styled.View`
  align-items: center;
`;

export const LinkButton = styled.TouchableOpacity`
  background-color: ${colors.info};
  padding-horizontal: ${spacing.xxl}px;
  padding-vertical: ${spacing.md}px;
  border-radius: ${borderRadius.round}px;
`;

export const LinkText = styled.Text`
  color: ${colors.textLight};
  font-size: ${fontSize.lg}px;
  font-weight: ${fontWeight.bold};
`;


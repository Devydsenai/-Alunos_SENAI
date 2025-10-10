import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import * as cores from '../../../../styles/cores';
import { useAuth } from '../../context/AuthContext';
import * as S from './styles';

export default function About() {
  const { isAdmin, loginAsAdmin, loginAsClient, userRole } = useAuth();
  const [password, setPassword] = useState('');

  const handleLoginAdmin = () => {
    if (loginAsAdmin(password)) {
      Alert.alert('✅ Sucesso!', 'Você agora é um ADMINISTRADOR!\n\nA aba "Cadastrar" está disponível.');
      setPassword('');
    } else {
      Alert.alert('❌ Erro', 'Senha incorreta!\n\nDica: admin123');
    }
  };

  const handleLoginClient = () => {
    loginAsClient();
    Alert.alert('👤 Modo Cliente', 'Você voltou para o modo CLIENTE.\n\nA aba "Cadastrar" foi removida.');
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>ℹ️ Sobre o App</S.HeaderTitle>
        <S.HeaderSubtitle>Cinema App - Versão 1.0</S.HeaderSubtitle>
      </S.Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <S.Content>
          {/* Status Atual */}
          <S.Section>
            <S.SectionTitle>👤 Status Atual</S.SectionTitle>
            <S.StatusCard isAdmin={isAdmin}>
              <S.StatusIcon>{isAdmin ? '👨‍💼' : '👤'}</S.StatusIcon>
              <S.StatusText>
                {isAdmin ? 'ADMINISTRADOR' : 'CLIENTE'}
              </S.StatusText>
              <S.StatusDescription>
                {isAdmin 
                  ? 'Você tem acesso total ao sistema, incluindo cadastro de filmes.'
                  : 'Você pode explorar filmes e escolher poltronas.'
                }
              </S.StatusDescription>
            </S.StatusCard>
          </S.Section>

          {/* Alternar Modo */}
          <S.Section>
            <S.SectionTitle>🔐 Alternar Modo</S.SectionTitle>
            <S.Description>
              {isAdmin 
                ? 'Para voltar ao modo cliente, clique no botão abaixo:'
                : 'Para acessar o modo administrador, digite a senha:'
              }
            </S.Description>

            {!isAdmin ? (
              <>
                <S.Input
                  placeholder="Digite a senha de admin"
                  placeholderTextColor={cores.cinzaTexto}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <S.Button onPress={handleLoginAdmin}>
                  <S.ButtonText>🔓 Entrar como Admin</S.ButtonText>
                </S.Button>
                <S.Hint>💡 Dica: admin123</S.Hint>
              </>
            ) : (
              <S.Button 
                onPress={handleLoginClient}
                style={{ backgroundColor: cores.cinzaDesabilitado }}
              >
                <S.ButtonText>👤 Voltar para Cliente</S.ButtonText>
              </S.Button>
            )}
          </S.Section>

          {/* Informações */}
          <S.Section>
            <S.SectionTitle>📱 Sobre o Aplicativo</S.SectionTitle>
            <S.InfoCard>
              <S.InfoRow>
                <S.InfoLabel>Nome:</S.InfoLabel>
                <S.InfoValue>Cinema App</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>Versão:</S.InfoLabel>
                <S.InfoValue>1.0.0</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>Desenvolvido por:</S.InfoLabel>
                <S.InfoValue>Devyd Silva</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>Tecnologia:</S.InfoLabel>
                <S.InfoValue>React Native + Expo</S.InfoValue>
              </S.InfoRow>
            </S.InfoCard>
          </S.Section>

          {/* Recursos */}
          <S.Section>
            <S.SectionTitle>✨ Recursos</S.SectionTitle>
            <S.FeaturesList>
              <S.FeatureItem>
                <S.FeatureIcon>🎬</S.FeatureIcon>
                <S.FeatureText>Explorar filmes em cartaz</S.FeatureText>
              </S.FeatureItem>
              <S.FeatureItem>
                <S.FeatureIcon>🔍</S.FeatureIcon>
                <S.FeatureText>Busca inteligente de filmes</S.FeatureText>
              </S.FeatureItem>
              <S.FeatureItem>
                <S.FeatureIcon>🎟️</S.FeatureIcon>
                <S.FeatureText>Seleção de poltronas</S.FeatureText>
              </S.FeatureItem>
              <S.FeatureItem>
                <S.FeatureIcon>📺</S.FeatureIcon>
                <S.FeatureText>Trailers em HD</S.FeatureText>
              </S.FeatureItem>
              {isAdmin && (
                <S.FeatureItem>
                  <S.FeatureIcon>➕</S.FeatureIcon>
                  <S.FeatureText>Cadastro de filmes (Admin)</S.FeatureText>
                </S.FeatureItem>
              )}
            </S.FeaturesList>
          </S.Section>

          {/* Dica de Demonstração */}
          <S.Section>
            <S.DemoCard>
              <S.DemoIcon>💡</S.DemoIcon>
              <S.DemoTitle>Dica para Demonstração</S.DemoTitle>
              <S.DemoText>
                Para mostrar o app para clientes:{'\n'}
                1. Use o modo CLIENTE (padrão){'\n'}
                2. Navegue normalmente{'\n'}
                {'\n'}
                Para demonstrar funcionalidades admin:{'\n'}
                1. Entre como ADMIN (senha: admin123){'\n'}
                2. A aba "Cadastrar" aparecerá{'\n'}
                3. Cadastre filmes e mostre o poder do sistema!
              </S.DemoText>
            </S.DemoCard>
          </S.Section>

          <S.FooterSpace />
        </S.Content>
      </ScrollView>
    </S.Container>
  );
}

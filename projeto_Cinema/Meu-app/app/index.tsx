/**
 * Home Screen
 * 
 * Tela inicial do aplicativo com navegação para autenticação e filmes.
 * Design moderno com gradientes e layout profissional.
 */

import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Button, GradientBackground } from '../components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '../constants/theme';

export default function Index() {
  return (
    <GradientBackground variant="primary">
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Logo/Ícone */}
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🎬</Text>
          </View>

          {/* Título e Subtítulo */}
          <Text style={styles.title}>Cinema App</Text>
          <Text style={styles.subtitle}>
            Seu catálogo de filmes favorito{'\n'}na palma da sua mão
          </Text>

          {/* Features */}
          <View style={styles.features}>
            <FeatureItem icon="⭐" text="Filmes Populares" />
            <FeatureItem icon="🔍" text="Busca Avançada" />
            <FeatureItem icon="📱" text="Interface Moderna" />
          </View>
        </View>

        {/* Botões de Ação */}
        <View style={styles.actions}>
          <Button
            title="Criar Conta"
            onPress={() => router.push('/(auth)/signup')}
            size="large"
          />
          
          <Button
            title="Já tenho conta"
            onPress={() => router.push('/(auth)/login')}
            variant="outline"
            size="large"
            textStyle={{ color: Colors.light }}
          />
        </View>
      </View>
    </GradientBackground>
  );
}

/**
 * Componente de feature item
 */
function FeatureItem({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  icon: {
    fontSize: 64,
  },
  title: {
    fontSize: Typography.sizes.xxxl,
    fontWeight: Typography.weights.extrabold,
    color: Colors.light,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.sizes.lg,
    color: Colors.light,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 28,
  },
  features: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginTop: Spacing.xl,
  },
  featureItem: {
    alignItems: 'center',
    gap: Spacing.xs,
    flex: 1,
  },
  featureIcon: {
    fontSize: Typography.sizes.xxl,
  },
  featureText: {
    fontSize: Typography.sizes.sm,
    color: Colors.light,
    textAlign: 'center',
    fontWeight: Typography.weights.medium,
  },
  actions: {
    gap: Spacing.md,
    paddingBottom: Spacing.lg,
  },
});

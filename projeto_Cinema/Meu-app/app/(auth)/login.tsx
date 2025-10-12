/**
 * Login Screen
 * 
 * Tela de autenticação com design moderno e validações.
 * Utiliza componentes UI profissionais com gradientes.
 */

import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { login } from '../../api/auth';
import { Button, Card, GradientBackground, Input } from '../../components/ui';
import { Colors, Spacing, Typography } from '../../constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  /**
   * Valida os campos do formulário
   */
  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Processa o login
   */
  const onSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const user = await login(email.trim(), password);
      Alert.alert('Bem-vindo! 👋', `Olá, ${user.name}!`);
      router.replace('/movies' as any);
    } catch (e: any) {
      Alert.alert('Erro no Login', e.message ?? 'Falha no login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground variant="primary">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.emoji}>👋</Text>
            <Text style={styles.title}>Bem-vindo de volta!</Text>
            <Text style={styles.subtitle}>Entre para continuar explorando</Text>
          </View>

          {/* Card de Login */}
          <Card style={styles.card}>
            <Input
              label="Email"
              placeholder="seu@email.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              error={errors.email}
            />

            <Input
              label="Senha"
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              error={errors.password}
            />

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <Button
              title={loading ? 'Entrando...' : 'Entrar'}
              onPress={onSubmit}
              loading={loading}
              disabled={loading}
              size="large"
              style={{ marginTop: Spacing.md }}
            />
          </Card>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Não tem uma conta?</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
              <Text style={styles.footerLink}>Cadastre-se aqui</Text>
            </TouchableOpacity>
          </View>

          {/* Voltar */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  emoji: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.bold,
    color: Colors.light,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.sizes.md,
    color: Colors.light,
    opacity: 0.9,
    textAlign: 'center',
  },
  card: {
    paddingVertical: Spacing.xl,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -Spacing.sm,
    marginBottom: Spacing.sm,
  },
  forgotPasswordText: {
    fontSize: Typography.sizes.sm,
    color: Colors.primary.start,
    fontWeight: Typography.weights.semibold,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.xl,
  },
  footerText: {
    fontSize: Typography.sizes.md,
    color: Colors.light,
  },
  footerLink: {
    fontSize: Typography.sizes.md,
    color: Colors.light,
    fontWeight: Typography.weights.bold,
    textDecorationLine: 'underline',
  },
  backButton: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: Typography.sizes.md,
    color: Colors.light,
    fontWeight: Typography.weights.semibold,
  },
});

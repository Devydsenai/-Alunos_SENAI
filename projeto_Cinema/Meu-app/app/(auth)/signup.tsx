/**
 * Signup Screen
 * 
 * Tela de cadastro com validações completas e design moderno.
 * Interface profissional com feedback visual para o usuário.
 */

import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { signup } from '../../api/auth';
import { Button, Card, GradientBackground, Input } from '../../components/ui';
import { Colors, Spacing, Typography } from '../../constants/theme';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  /**
   * Valida os campos do formulário
   */
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não conferem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Processa o cadastro
   */
  const onSubmit = async () => {
    console.log('🔍 Validando formulário...');
    if (!validateForm()) {
      console.log('❌ Formulário inválido');
      return;
    }

    try {
      setLoading(true);
      console.log('🚀 Iniciando cadastro...');
      console.log('📝 Dados:', { name: name.trim(), email: email.trim() });
      
      const result = await signup({
        name: name.trim(),
        email: email.trim(),
        password,
        confirmPassword,
      });
      
      console.log('✅ Cadastro realizado com sucesso!', result);
      
      // Redireciona diretamente para login após sucesso
      console.log('🔄 Redirecionando para login...');
      
      // Redirecionamento imediato
      router.replace('/(auth)/login');
      
      // Alert de confirmação
      Alert.alert(
        'Sucesso! 🎉',
        'Cadastro realizado com sucesso! Você foi redirecionado para o login.'
      );
    } catch (e: any) {
      console.error('❌ Erro no cadastro:', e);
      Alert.alert('Erro no Cadastro', e.message ?? 'Falha no cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Calcula a força da senha
   */
  const getPasswordStrength = (): { strength: number; label: string; color: string } => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;

    if (strength <= 25) return { strength, label: 'Fraca', color: Colors.error };
    if (strength <= 50) return { strength, label: 'Média', color: Colors.warning };
    if (strength <= 75) return { strength, label: 'Boa', color: Colors.info };
    return { strength, label: 'Forte', color: Colors.success };
  };

  const passwordStrength = getPasswordStrength();

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
            <Text style={styles.emoji}>🎬</Text>
            <Text style={styles.title}>Crie sua Conta</Text>
            <Text style={styles.subtitle}>Junte-se a nós e explore o mundo do cinema</Text>
          </View>

          {/* Card de Cadastro */}
          <Card style={styles.card}>
            <Input
              label="Nome Completo"
              placeholder="João Silva"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              error={errors.name}
            />

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

            {/* Indicador de força da senha */}
            {password && (
              <View style={styles.passwordStrength}>
                <View style={styles.passwordStrengthBar}>
                  <View
                    style={[
                      styles.passwordStrengthFill,
                      {
                        width: `${passwordStrength.strength}%`,
                        backgroundColor: passwordStrength.color,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.passwordStrengthText, { color: passwordStrength.color }]}>
                  {passwordStrength.label}
                </Text>
              </View>
            )}

            <Input
              label="Confirmar Senha"
              placeholder="••••••••"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword)
                  setErrors({ ...errors, confirmPassword: undefined });
              }}
              error={errors.confirmPassword}
            />

            <Button
              title={loading ? 'Cadastrando...' : 'Criar Conta'}
              onPress={onSubmit}
              loading={loading}
              disabled={loading}
              size="large"
              style={{ marginTop: Spacing.md }}
            />
          </Card>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Já tem uma conta?</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.footerLink}>Entrar aqui</Text>
            </TouchableOpacity>
          </View>

          {/* Voltar */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
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
    paddingTop: Spacing.xxl,
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
  passwordStrength: {
    marginTop: -Spacing.sm,
    marginBottom: Spacing.md,
  },
  passwordStrengthBar: {
    height: 4,
    backgroundColor: Colors.borderLight,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  passwordStrengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  passwordStrengthText: {
    fontSize: Typography.sizes.xs,
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
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: Typography.sizes.md,
    color: Colors.light,
    fontWeight: Typography.weights.semibold,
  },
});

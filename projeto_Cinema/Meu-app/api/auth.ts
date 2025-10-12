/**
 * Authentication API - Client Interface
 * 
 * Interface simplificada para uso nas telas do aplicativo.
 * Mantém compatibilidade com o código existente.
 * 
 * @deprecated Este arquivo mantém compatibilidade retroativa.
 * Utilize os controladores em api/src/ para novos desenvolvimentos.
 */

import { authController, initializeAPI, type SignupData } from './src';

// Inicializa a API automaticamente
let initialized = false;

async function ensureInitialized() {
  if (!initialized) {
    await initializeAPI();
    initialized = true;
  }
}

/**
 * Interface de retorno para signup
 */
export interface SignupResponse {
  message: string;
}

/**
 * Interface de dados do usuário
 */
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

/**
 * Registra um novo usuário
 * 
 * @param input - Dados de cadastro (name, email, password, confirmPassword)
 * @returns Mensagem de sucesso
 * @throws Error se o cadastro falhar
 */
export async function signup(input: SignupData): Promise<SignupResponse> {
  await ensureInitialized();
  
  const result = await authController.signup(input);
  
  if (!result.success) {
    throw new Error(result.message);
  }
  
  return { message: result.message };
}

/**
 * Autentica um usuário
 * 
 * @param email - Email do usuário
 * @param password - Senha do usuário
 * @returns Dados do usuário autenticado
 * @throws Error se as credenciais forem inválidas
 */
export async function login(email: string, password: string): Promise<User> {
  await ensureInitialized();
  
  const result = await authController.login({ email, password });
  
  if (!result.success || !result.data) {
    throw new Error(result.message);
  }
  
  return result.data.user as User;
}

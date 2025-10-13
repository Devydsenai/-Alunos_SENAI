/**
 * Auth Session Service
 * 
 * Gerencia a sessão do usuário logado
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@cinema:user';

export interface SessionUser {
  id: number;
  name: string;
  email: string;
}

/**
 * Salva o usuário logado
 */
export async function saveUser(user: SessionUser): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
  }
}

/**
 * Busca o usuário logado
 */
export async function getUser(): Promise<SessionUser | null> {
  try {
    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return null;
  }
}

/**
 * Remove o usuário logado (logout)
 */
export async function clearUser(): Promise<void> {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Erro ao remover usuário:', error);
  }
}


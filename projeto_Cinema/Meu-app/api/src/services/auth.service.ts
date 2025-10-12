/**
 * Authentication Service
 * 
 * Serviço responsável pela lógica de negócio relacionada à autenticação.
 * Inclui validações, hash de senhas e gerenciamento de sessões.
 */

import * as Crypto from 'expo-crypto';
import { CreateUserDTO, UserModel, UserResponse } from '../models/User.model';

/**
 * Interface para dados de cadastro
 */
export interface SignupData extends CreateUserDTO {
  confirmPassword: string;
}

/**
 * Interface para dados de login
 */
export interface LoginData {
  email: string;
  password: string;
}

/**
 * Interface para resposta de autenticação
 */
export interface AuthResponse {
  user: UserResponse;
  token?: string;
}

/**
 * Classe de serviço para operações de autenticação
 */
export class AuthService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  /**
   * Cria um hash da senha usando SHA256
   * 
   * @param password - Senha em texto plano
   * @returns Hash da senha
   */
  private async hashPassword(password: string): Promise<string> {
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
  }

  /**
   * Valida os dados de cadastro
   * 
   * @param data - Dados de cadastro
   * @throws Error se os dados forem inválidos
   */
  private validateSignupData(data: SignupData): void {
    const { name, email, password, confirmPassword } = data;

    if (!name || !email || !password || !confirmPassword) {
      throw new Error('Todos os campos são obrigatórios');
    }

    if (name.trim().length < 3) {
      throw new Error('O nome deve ter pelo menos 3 caracteres');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido');
    }

    if (password.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres');
    }

    if (password !== confirmPassword) {
      throw new Error('As senhas não conferem');
    }
  }

  /**
   * Valida os dados de login
   * 
   * @param data - Dados de login
   * @throws Error se os dados forem inválidos
   */
  private validateLoginData(data: LoginData): void {
    const { email, password } = data;

    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }
  }

  /**
   * Registra um novo usuário no sistema
   * 
   * @param data - Dados de cadastro
   * @returns Dados do usuário criado
   * @throws Error se os dados forem inválidos ou o email já existir
   */
  async signup(data: SignupData): Promise<AuthResponse> {
    try {
      // Validar dados
      this.validateSignupData(data);

      // Hash da senha
      const hashedPassword = await this.hashPassword(data.password);

      // Criar usuário
      const user = await this.userModel.create({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        password: hashedPassword,
      });

      return {
        user,
        // TODO: Implementar geração de token JWT
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao realizar cadastro');
    }
  }

  /**
   * Autentica um usuário no sistema
   * 
   * @param data - Dados de login
   * @returns Dados do usuário autenticado
   * @throws Error se as credenciais forem inválidas
   */
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      // Validar dados
      this.validateLoginData(data);

      // Buscar usuário
      const user = await this.userModel.findByEmail(
        data.email.trim().toLowerCase()
      );

      if (!user) {
        throw new Error('Email ou senha inválidos');
      }

      // Verificar senha
      const hashedPassword = await this.hashPassword(data.password);
      if (user.password !== hashedPassword) {
        throw new Error('Email ou senha inválidos');
      }

      // Remover senha da resposta
      const { password, ...userWithoutPassword } = user;

      return {
        user: userWithoutPassword as UserResponse,
        // TODO: Implementar geração de token JWT
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao realizar login');
    }
  }

  /**
   * Verifica se um usuário existe pelo email
   * 
   * @param email - Email a ser verificado
   * @returns true se o usuário existir, false caso contrário
   */
  async userExists(email: string): Promise<boolean> {
    const user = await this.userModel.findByEmail(email.toLowerCase());
    return user !== null;
  }
}


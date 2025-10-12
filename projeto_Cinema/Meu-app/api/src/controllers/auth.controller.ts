/**
 * Authentication Controller
 * 
 * Controlador responsável por processar requisições de autenticação.
 * Atua como intermediário entre as rotas e os serviços.
 */

import { AuthService, LoginData, SignupData } from '../services/auth.service';

/**
 * Classe controladora para endpoints de autenticação
 */
export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Processa requisição de cadastro de usuário
   * 
   * @param data - Dados de cadastro
   * @returns Resposta com dados do usuário criado
   */
  async signup(data: SignupData) {
    try {
      const result = await this.authService.signup(data);
      
      return {
        success: true,
        message: 'Cadastro realizado com sucesso',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao realizar cadastro',
        data: null,
      };
    }
  }

  /**
   * Processa requisição de login
   * 
   * @param data - Dados de login
   * @returns Resposta com dados do usuário autenticado
   */
  async login(data: LoginData) {
    try {
      const result = await this.authService.login(data);
      
      return {
        success: true,
        message: 'Login realizado com sucesso',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao realizar login',
        data: null,
      };
    }
  }

  /**
   * Verifica se um email já está em uso
   * 
   * @param email - Email a ser verificado
   * @returns Resposta indicando se o email existe
   */
  async checkEmail(email: string) {
    try {
      const exists = await this.authService.userExists(email);
      
      return {
        success: true,
        data: { exists },
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao verificar email',
        data: null,
      };
    }
  }
}


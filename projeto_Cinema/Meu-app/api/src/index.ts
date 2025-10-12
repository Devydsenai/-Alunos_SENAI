/**
 * API Main Entry Point
 * 
 * Ponto de entrada principal da API.
 * Inicializa o banco de dados e exporta controladores e serviços.
 */

import Database from './config/database';
import { AuthController } from './controllers/auth.controller';
import { MovieService } from './services/movie.service';

/**
 * Configuração da API do TMDB
 */
export const TMDB_CONFIG = {
  apiKey: '77360f6f4ee084ea5da7c4a534b666ae',
  apiUrl: 'https://api.themoviedb.org/3',
  imageBaseUrl: 'https://image.tmdb.org/t/p/w500',
  language: 'pt-BR',
};

/**
 * Instâncias dos controladores
 */
export const authController = new AuthController();

/**
 * Instância do serviço de filmes
 */
export const movieService = new MovieService(TMDB_CONFIG);

/**
 * Inicializa a API e o banco de dados
 */
export async function initializeAPI(): Promise<void> {
  try {
    const db = Database.getInstance();
    await db.initialize();
    console.log('✅ API initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize API:', error);
    throw error;
  }
}

/**
 * Exporta tipos e interfaces públicas
 */
export type { UserResponse } from './models/User.model';
export type { AuthResponse, LoginData, SignupData } from './services/auth.service';
export type { Movie, MovieServiceConfig } from './services/movie.service';


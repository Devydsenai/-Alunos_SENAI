/**
 * TMDB Service - Client Interface
 * 
 * Interface simplificada para acesso ao serviço de filmes do TMDB.
 * Fornece métodos convenientes para buscar filmes populares e outros dados.
 */

import Constants from 'expo-constants';
import { movieService, type Movie } from '../api/src';

/**
 * Configuração de ambiente
 */
const extra = (Constants.expoConfig?.extra ?? {}) as any;

export const env = {
  apiKey: extra.TMDB_API_KEY ?? '77360f6f4ee084ea5da7c4a534b666ae',
  apiUrl: extra.TMDB_API_URL ?? 'https://api.themoviedb.org/3',
  imageBaseUrl: extra.TMDB_IMAGE_BASE_URL ?? 'https://image.tmdb.org/t/p/w500',
};

/**
 * Resposta de filmes populares
 */
export interface PopularMoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

/**
 * Busca filmes populares do TMDB
 * 
 * @param page - Número da página (padrão: 1)
 * @returns Lista de filmes populares
 */
export async function fetchPopularMovies(page: number = 1): Promise<PopularMoviesResponse> {
  try {
    const result = await movieService.getPopularMovies(page);
    
    return {
      results: result.movies,
      page: result.page,
      total_pages: result.totalPages,
      total_results: result.totalResults,
    };
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
}

/**
 * Busca filmes em cartaz
 * 
 * @param page - Número da página (padrão: 1)
 * @returns Lista de filmes em cartaz
 */
export async function fetchNowPlayingMovies(page: number = 1): Promise<PopularMoviesResponse> {
  try {
    const result = await movieService.getNowPlayingMovies(page);
    
    return {
      results: result.movies,
      page: result.page,
      total_pages: result.totalPages,
      total_results: 0, // API não retorna total_results para now_playing
    };
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    throw error;
  }
}

/**
 * Busca filmes por termo
 * 
 * @param query - Termo de busca
 * @param page - Número da página (padrão: 1)
 * @returns Lista de filmes encontrados
 */
export async function searchMovies(query: string, page: number = 1): Promise<PopularMoviesResponse> {
  try {
    const result = await movieService.searchMovies(query, page);
    
    return {
      results: result.movies,
      page: result.page,
      total_pages: result.totalPages,
      total_results: result.totalResults,
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
}

/**
 * Busca detalhes de um filme
 * 
 * @param movieId - ID do filme
 * @returns Detalhes completos do filme
 */
export async function fetchMovieDetails(movieId: number): Promise<Movie> {
  try {
    return await movieService.getMovieDetails(movieId);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}


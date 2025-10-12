/**
 * TMDB API Integration (Legacy)
 * 
 * @deprecated Este arquivo é mantido apenas para compatibilidade retroativa.
 * Use `services/tmdb.service.ts` para novos desenvolvimentos.
 * 
 * Redirecionamentos:
 * - fetchPopularMovies() → services/tmdb.service.ts
 * - movieService → api/src/services/movie.service.ts
 */

import { env, fetchPopularMovies as fetchPopular } from './services/tmdb.service';

export const TMDB_API_KEY = env.apiKey;
export const TMDB_API_URL = env.apiUrl;
export const TMDB_IMAGE_BASE_URL = env.imageBaseUrl;

export { env };

/**
 * @deprecated Use fetchPopularMovies from services/tmdb.service.ts
 */
export async function fetchPopularMovies(page: number = 1) {
  return fetchPopular(page);
}

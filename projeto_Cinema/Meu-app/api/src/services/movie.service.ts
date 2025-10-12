/**
 * Movie Service
 * 
 * Serviço responsável pela integração com a API do TMDB.
 * Gerencia buscas, cache e formatação de dados de filmes.
 */

/**
 * Interface para configuração de ambiente
 */
export interface MovieServiceConfig {
  apiKey: string;
  apiUrl: string;
  imageBaseUrl: string;
  language?: string;
}

/**
 * Interface para dados de um filme
 */
export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  adult: boolean;
  genreIds: number[];
}

/**
 * Interface para resposta da API do TMDB
 */
interface TMDBResponse {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

/**
 * Classe de serviço para operações relacionadas a filmes
 */
export class MovieService {
  private config: MovieServiceConfig;

  constructor(config: MovieServiceConfig) {
    this.config = {
      ...config,
      language: config.language || 'pt-BR',
    };
  }

  /**
   * Converte dados do TMDB para o formato interno
   * 
   * @param tmdbMovie - Dados do filme no formato TMDB
   * @returns Dados do filme no formato interno
   */
  private formatMovie(tmdbMovie: any): Movie {
    return {
      id: tmdbMovie.id,
      title: tmdbMovie.title,
      originalTitle: tmdbMovie.original_title,
      overview: tmdbMovie.overview,
      posterPath: tmdbMovie.poster_path
        ? `${this.config.imageBaseUrl}${tmdbMovie.poster_path}`
        : '',
      backdropPath: tmdbMovie.backdrop_path
        ? `${this.config.imageBaseUrl}${tmdbMovie.backdrop_path}`
        : '',
      releaseDate: tmdbMovie.release_date,
      voteAverage: tmdbMovie.vote_average,
      voteCount: tmdbMovie.vote_count,
      popularity: tmdbMovie.popularity,
      adult: tmdbMovie.adult,
      genreIds: tmdbMovie.genre_ids || [],
    };
  }

  /**
   * Busca filmes populares
   * 
   * @param page - Número da página (padrão: 1)
   * @returns Lista de filmes populares
   */
  async getPopularMovies(page: number = 1): Promise<{
    movies: Movie[];
    page: number;
    totalPages: number;
    totalResults: number;
  }> {
    try {
      const url = `${this.config.apiUrl}/movie/popular?api_key=${this.config.apiKey}&language=${this.config.language}&page=${page}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: TMDBResponse = await response.json();

      return {
        movies: data.results.map(movie => this.formatMovie(movie)),
        page: data.page,
        totalPages: data.total_pages,
        totalResults: data.total_results,
      };
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw new Error('Falha ao buscar filmes populares');
    }
  }

  /**
   * Busca filmes em cartaz
   * 
   * @param page - Número da página (padrão: 1)
   * @returns Lista de filmes em cartaz
   */
  async getNowPlayingMovies(page: number = 1): Promise<{
    movies: Movie[];
    page: number;
    totalPages: number;
  }> {
    try {
      const url = `${this.config.apiUrl}/movie/now_playing?api_key=${this.config.apiKey}&language=${this.config.language}&page=${page}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: TMDBResponse = await response.json();

      return {
        movies: data.results.map(movie => this.formatMovie(movie)),
        page: data.page,
        totalPages: data.total_pages,
      };
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
      throw new Error('Falha ao buscar filmes em cartaz');
    }
  }

  /**
   * Busca filmes por termo de busca
   * 
   * @param query - Termo de busca
   * @param page - Número da página (padrão: 1)
   * @returns Lista de filmes encontrados
   */
  async searchMovies(query: string, page: number = 1): Promise<{
    movies: Movie[];
    page: number;
    totalPages: number;
    totalResults: number;
  }> {
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `${this.config.apiUrl}/search/movie?api_key=${this.config.apiKey}&language=${this.config.language}&query=${encodedQuery}&page=${page}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: TMDBResponse = await response.json();

      return {
        movies: data.results.map(movie => this.formatMovie(movie)),
        page: data.page,
        totalPages: data.total_pages,
        totalResults: data.total_results,
      };
    } catch (error) {
      console.error('Error searching movies:', error);
      throw new Error('Falha ao buscar filmes');
    }
  }

  /**
   * Busca detalhes de um filme específico
   * 
   * @param movieId - ID do filme
   * @returns Detalhes completos do filme
   */
  async getMovieDetails(movieId: number): Promise<Movie> {
    try {
      const url = `${this.config.apiUrl}/movie/${movieId}?api_key=${this.config.apiKey}&language=${this.config.language}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      return this.formatMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw new Error('Falha ao buscar detalhes do filme');
    }
  }
}


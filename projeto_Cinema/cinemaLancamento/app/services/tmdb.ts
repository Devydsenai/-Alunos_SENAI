// Serviço para The Movie Database (TMDB)
const TMDB_API_KEY = "77360f6f4ee084ea5da7c4a534b666ae";
const TMDB_API_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// Interface para filmes do TMDB
export interface TMDBFilme {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  video: boolean;
}

// Interface para detalhes completos do filme
export interface TMDBFilmeDetalhes extends TMDBFilme {
  runtime: number;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string; logo_path: string }[];
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  homepage: string;
}

// Interface para resposta da API
interface TMDBResponse {
  page: number;
  results: TMDBFilme[];
  total_pages: number;
  total_results: number;
}

// Classe de serviço do TMDB
class TMDBService {
  private apiKey: string;
  private baseURL: string;
  private imageBaseURL: string;

  constructor(apiKey: string, baseURL: string, imageBaseURL: string) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
    this.imageBaseURL = imageBaseURL;
  }

  // Método auxiliar para fazer requisições
  private async request<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    try {
      const queryParams = new URLSearchParams({
        api_key: this.apiKey,
        language: 'pt-BR',
        ...params,
      });

      const response = await fetch(`${this.baseURL}${endpoint}?${queryParams}`);

      if (!response.ok) {
        throw new Error(`TMDB API error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('TMDB API Request Error:', error);
      throw error;
    }
  }

  // Obter URL completa da imagem
  getImageURL(path: string | null): string {
    if (!path) return 'https://via.placeholder.com/500x750?text=Sem+Imagem';
    return `${this.imageBaseURL}${path}`;
  }

  // GET: Filmes populares
  async getPopularMovies(page: number = 1): Promise<TMDBResponse> {
    return this.request<TMDBResponse>('/movie/popular', { page: page.toString() });
  }

  // GET: Filmes em cartaz (Now Playing)
  async getNowPlayingMovies(page: number = 1): Promise<TMDBResponse> {
    return this.request<TMDBResponse>('/movie/now_playing', { page: page.toString() });
  }

  // GET: Próximos lançamentos (Upcoming)
  async getUpcomingMovies(page: number = 1): Promise<TMDBResponse> {
    return this.request<TMDBResponse>('/movie/upcoming', { page: page.toString() });
  }

  // GET: Filmes mais bem avaliados
  async getTopRatedMovies(page: number = 1): Promise<TMDBResponse> {
    return this.request<TMDBResponse>('/movie/top_rated', { page: page.toString() });
  }

  // GET: Buscar filmes
  async searchMovies(query: string, page: number = 1): Promise<TMDBResponse> {
    return this.request<TMDBResponse>('/search/movie', {
      query,
      page: page.toString(),
    });
  }

  // GET: Detalhes do filme
  async getMovieDetails(movieId: number): Promise<TMDBFilmeDetalhes> {
    return this.request<TMDBFilmeDetalhes>(`/movie/${movieId}`);
  }

  // GET: Vídeos do filme (trailers, etc)
  async getMovieVideos(movieId: number): Promise<{
    results: Array<{
      key: string;
      site: string;
      type: string;
      name: string;
      official: boolean;
    }>;
  }> {
    return this.request(`/movie/${movieId}/videos`);
  }

  // GET: URL do trailer do YouTube
  async getTrailerURL(movieId: number): Promise<string | null> {
    try {
      const videos = await this.getMovieVideos(movieId);
      const trailer = videos.results.find(
        video => video.site === 'YouTube' && video.type === 'Trailer' && video.official
      ) || videos.results.find(
        video => video.site === 'YouTube' && video.type === 'Trailer'
      );
      
      if (trailer) {
        return `https://www.youtube.com/watch?v=${trailer.key}`;
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar trailer:', error);
      return null;
    }
  }

  // GET: Filmes semelhantes
  async getSimilarMovies(movieId: number, page: number = 1): Promise<TMDBResponse> {
    return this.request<TMDBResponse>(`/movie/${movieId}/similar`, {
      page: page.toString(),
    });
  }

  // GET: Descobrir filmes com filtros
  async discoverMovies(filters?: {
    page?: number;
    sort_by?: string;
    year?: number;
    with_genres?: string;
    vote_average_gte?: number;
    vote_average_lte?: number;
  }): Promise<TMDBResponse> {
    const params: Record<string, string> = {};
    
    if (filters?.page) params.page = filters.page.toString();
    if (filters?.sort_by) params.sort_by = filters.sort_by;
    if (filters?.year) params.year = filters.year.toString();
    if (filters?.with_genres) params.with_genres = filters.with_genres;
    if (filters?.vote_average_gte) params['vote_average.gte'] = filters.vote_average_gte.toString();
    if (filters?.vote_average_lte) params['vote_average.lte'] = filters.vote_average_lte.toString();

    return this.request<TMDBResponse>('/discover/movie', params);
  }
}

// Exporta instância do serviço
export const tmdb = new TMDBService(TMDB_API_KEY, TMDB_API_URL, TMDB_IMAGE_BASE_URL);

// Exporta também a classe para casos especiais
export default TMDBService;


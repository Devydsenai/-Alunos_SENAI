// Serviço de API para conectar com o backend
const API_URL = 'http://localhost:3000';

// Interface para os filmes
export interface Filme {
  codigo: number;
  Title: string;
  Year: string;
  Rated: string;
  Released?: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer?: string;
  Actors?: string;
  Plot: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster: string;
  Metascore?: string;
  imdbRating: string;
  imdbVotes?: string;
  imdbID?: string;
  Type?: string;
  Response?: string;
  Images?: string[];
  ComingSoon: boolean;
  disponivel: boolean;
  totalSeasons?: string;
}

// Interface para resposta de erro
interface ErrorResponse {
  error: string;
}

// Classe de serviço da API
class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Método auxiliar para fazer requisições
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // GET: Health check
  async healthCheck(): Promise<{ status: string }> {
    return this.request<{ status: string }>('/');
  }

  // GET: Listar todos os filmes
  async getFilmes(params?: {
    limit?: number;
    offset?: number;
    title?: string;
    genre?: string;
    type?: string;
    year?: string;
    comingSoon?: boolean;
  }): Promise<Filme[]> {
    const queryParams = new URLSearchParams();
    
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    if (params?.title) queryParams.append('title', params.title);
    if (params?.genre) queryParams.append('genre', params.genre);
    if (params?.type) queryParams.append('type', params.type);
    if (params?.year) queryParams.append('year', params.year);
    if (params?.comingSoon !== undefined) queryParams.append('comingSoon', params.comingSoon.toString());

    const query = queryParams.toString();
    return this.request<Filme[]>(`/filmes${query ? `?${query}` : ''}`);
  }

  // GET: Filmes em cartaz
  async getFilmesEmCartaz(limit?: number, offset?: number): Promise<Filme[]> {
    const queryParams = new URLSearchParams();
    if (limit) queryParams.append('limit', limit.toString());
    if (offset) queryParams.append('offset', offset.toString());
    
    const query = queryParams.toString();
    return this.request<Filme[]>(`/filmes/em-cartaz${query ? `?${query}` : ''}`);
  }

  // GET: Filmes em lançamento
  async getLancamentos(limit?: number, offset?: number): Promise<Filme[]> {
    const queryParams = new URLSearchParams();
    if (limit) queryParams.append('limit', limit.toString());
    if (offset) queryParams.append('offset', offset.toString());
    
    const query = queryParams.toString();
    return this.request<Filme[]>(`/filmes/lancamentos${query ? `?${query}` : ''}`);
  }

  // GET: Buscar filme por código
  async getFilmePorCodigo(codigo: number): Promise<Filme> {
    return this.request<Filme>(`/filmes/${codigo}`);
  }

  // POST: Criar novo filme
  async criarFilme(filme: Omit<Filme, 'codigo'>): Promise<Filme> {
    return this.request<Filme>('/filmes', {
      method: 'POST',
      body: JSON.stringify(filme),
    });
  }

  // PUT: Atualizar filme
  async atualizarFilme(codigo: number, filme: Partial<Filme>): Promise<Filme> {
    return this.request<Filme>(`/filmes/${codigo}`, {
      method: 'PUT',
      body: JSON.stringify(filme),
    });
  }

  // PATCH: Atualizar parcialmente
  async atualizarFilmeParcial(codigo: number, dados: Partial<Filme>): Promise<Filme> {
    return this.request<Filme>(`/filmes/${codigo}`, {
      method: 'PATCH',
      body: JSON.stringify(dados),
    });
  }

  // PATCH: Atualizar disponibilidade do filme
  async atualizarDisponibilidade(codigo: number, disponivel: boolean): Promise<Filme> {
    return this.request<Filme>(`/filmes/${codigo}/disponibilidade`, {
      method: 'PATCH',
      body: JSON.stringify({ disponivel }),
    });
  }

  // DELETE: Deletar filme
  async deletarFilme(codigo: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/filmes/${codigo}`, {
      method: 'DELETE',
    });
  }
}

// Exporta instância do serviço
export const api = new ApiService(API_URL);

// Exporta também a classe para casos especiais
export default ApiService;


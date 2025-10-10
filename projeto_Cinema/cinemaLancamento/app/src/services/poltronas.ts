// Serviço de API para Poltronas
const API_URL = 'http://localhost:3000';

export interface Poltrona {
  id: number;
  filmeId: string;
  filmeTitulo: string;
  poltrona: string;
  status: 'disponivel' | 'selecionada' | 'reservada';
  clienteNome?: string;
  clienteEmail?: string;
  total?: number;
  dataReserva?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReservaRequest {
  filmeId: string;
  filmeTitulo: string;
  poltronas: string[];
  clienteNome?: string;
  clienteEmail?: string;
}

export interface ReservaResponse {
  message: string;
  poltronas: Poltrona[];
  totalPago: number;
}

class PoltronasService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_URL;
  }

  /**
   * Requisição base
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
        throw new Error(error.error || `Erro HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

  /**
   * GET: Listar poltronas de um filme
   */
  async getPoltronasFilme(filmeId: string): Promise<Poltrona[]> {
    return this.request<Poltrona[]>(`/poltronas/filme/${filmeId}`);
  }

  /**
   * GET: Buscar poltrona por ID
   */
  async getPoltrona(id: number): Promise<Poltrona> {
    return this.request<Poltrona>(`/poltronas/${id}`);
  }

  /**
   * POST: Reservar poltronas
   */
  async reservarPoltronas(dados: ReservaRequest): Promise<ReservaResponse> {
    return this.request<ReservaResponse>('/poltronas/reservar', {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  }

  /**
   * DELETE: Cancelar reserva de uma poltrona
   */
  async cancelarReserva(filmeId: string, poltrona: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/poltronas/cancelar/${filmeId}/${poltrona}`, {
      method: 'DELETE',
    });
  }

  /**
   * DELETE: Limpar todas as poltronas de um filme (admin)
   */
  async limparSala(filmeId: string): Promise<{ message: string; filmeId: string }> {
    return this.request<{ message: string; filmeId: string }>(`/poltronas/filme/${filmeId}`, {
      method: 'DELETE',
    });
  }

  /**
   * GET: Listar todas as reservas
   */
  async getTodasReservas(params?: { limit?: number; offset?: number; status?: string }): Promise<Poltrona[]> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    if (params?.status) queryParams.append('status', params.status);

    const query = queryParams.toString();
    return this.request<Poltrona[]>(`/poltronas${query ? `?${query}` : ''}`);
  }
}

export const poltronasService = new PoltronasService();


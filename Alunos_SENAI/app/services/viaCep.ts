/**
 * Serviço para integração com a API ViaCEP
 * Documentação: https://viacep.com.br/
 */

export interface EnderecoViaCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

/**
 * Busca endereço pelo CEP
 * @param cep - CEP no formato 00000-000 ou 00000000
 * @returns Dados do endereço ou null em caso de erro
 */
export async function buscarCep(cep: string): Promise<EnderecoViaCep | null> {
  try {
    // Remove formatação do CEP
    const cepLimpo = cep.replace(/\D/g, '');
    
    // Valida CEP
    if (cepLimpo.length !== 8) {
      throw new Error('CEP inválido');
    }

    // Faz requisição à API
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar CEP');
    }

    const data: EnderecoViaCep = await response.json();

    // ViaCEP retorna um objeto com "erro": true quando não encontra o CEP
    if (data.erro) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    return null;
  }
}

/**
 * Formata CEP para o padrão 00000-000
 */
export function formatarCep(cep: string): string {
  const cepLimpo = cep.replace(/\D/g, '');
  return cepLimpo.replace(/(\d{5})(\d{3})/, '$1-$2');
}

/**
 * Valida se CEP está no formato correto
 */
export function validarCep(cep: string): boolean {
  const cepLimpo = cep.replace(/\D/g, '');
  return cepLimpo.length === 8;
}


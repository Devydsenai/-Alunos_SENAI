/**
 * Serviço para integração com a API ViaCEP
 * Permite buscar endereços completos através do CEP
 * @module services/viaCep
 * @see {@link https://viacep.com.br/ | Documentação ViaCEP}
 */

/**
 * Interface representando os dados de endereço retornados pela API ViaCEP
 * @interface EnderecoViaCep
 * @property {string} cep - CEP no formato 00000-000
 * @property {string} logradouro - Nome da rua/avenida
 * @property {string} complemento - Complemento do endereço
 * @property {string} bairro - Nome do bairro
 * @property {string} localidade - Nome da cidade
 * @property {string} uf - Sigla do estado (UF)
 * @property {string} ibge - Código IBGE do município
 * @property {string} gia - Código GIA (Guia de Informação e Apuração do ICMS)
 * @property {string} ddd - Código DDD da região
 * @property {string} siafi - Código SIAFI do município
 * @property {boolean} [erro] - Indica se houve erro na busca (CEP não encontrado)
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
 * Busca informações de endereço através do CEP na API ViaCEP
 * @async
 * @function buscarCep
 * @param {string} cep - CEP no formato 00000-000 ou 00000000 (com ou sem hífen)
 * @returns {Promise<EnderecoViaCep | null>} Dados do endereço encontrado ou null em caso de erro/CEP inválido
 * @throws {Error} Lança erro se o CEP for inválido (diferente de 8 dígitos)
 * @example
 * // Buscando CEP com hífen
 * const endereco = await buscarCep('01310-100');
 * if (endereco) {
 *   console.log(endereco.logradouro); // "Avenida Paulista"
 * }
 * 
 * @example
 * // Buscando CEP sem hífen
 * const endereco = await buscarCep('01310100');
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
 * Formata CEP para o padrão brasileiro 00000-000
 * @function formatarCep
 * @param {string} cep - CEP com ou sem formatação
 * @returns {string} CEP formatado no padrão 00000-000
 * @example
 * formatarCep('01310100'); // Retorna: "01310-100"
 * formatarCep('01310-100'); // Retorna: "01310-100"
 */
export function formatarCep(cep: string): string {
  const cepLimpo = cep.replace(/\D/g, '');
  return cepLimpo.replace(/(\d{5})(\d{3})/, '$1-$2');
}

/**
 * Valida se o CEP possui formato correto (8 dígitos numéricos)
 * @function validarCep
 * @param {string} cep - CEP a ser validado
 * @returns {boolean} true se o CEP é válido (8 dígitos), false caso contrário
 * @example
 * validarCep('01310-100'); // true
 * validarCep('01310100'); // true
 * validarCep('123'); // false
 * validarCep('abc'); // false
 */
export function validarCep(cep: string): boolean {
  const cepLimpo = cep.replace(/\D/g, '');
  return cepLimpo.length === 8;
}



/**
 * Serviço para validação e busca de produtos através de código de barras
 * Integração com Open Food Facts API para obter informações de produtos alimentícios
 * @module services/codigoBarras
 * @see {@link https://world.openfoodfacts.org/data | Documentação Open Food Facts}
 */

/**
 * Interface representando as informações de um produto obtidas via código de barras
 * @interface ProdutoCodigoBarras
 * @property {string} code - Código de barras do produto
 * @property {string} [product_name] - Nome do produto
 * @property {string} [brands] - Marcas associadas ao produto
 * @property {string} [categories] - Categorias do produto
 * @property {string} [image_url] - URL da imagem do produto
 * @property {string} [quantity] - Quantidade/peso do produto
 */
export interface ProdutoCodigoBarras {
  code: string;
  product_name?: string;
  brands?: string;
  categories?: string;
  image_url?: string;
  quantity?: string;
}

/**
 * Busca informações detalhadas de um produto através do código de barras
 * Utiliza a API Open Food Facts para obter dados de produtos alimentícios
 * @async
 * @function buscarProdutoPorCodigoBarras
 * @param {string} codigo - Código de barras (EAN-13, EAN-8, UPC-A, etc)
 * @returns {Promise<ProdutoCodigoBarras | null>} Dados do produto encontrado ou null se não encontrado/erro
 * @example
 * // Buscando produto por código EAN-13
 * const produto = await buscarProdutoPorCodigoBarras('7891000100103');
 * if (produto) {
 *   console.log(produto.product_name); // Nome do produto
 *   console.log(produto.brands); // Marca do produto
 * }
 */
export async function buscarProdutoPorCodigoBarras(codigo: string): Promise<ProdutoCodigoBarras | null> {
  try {
    const codigoLimpo = codigo.replace(/\D/g, '');
    
    // API Open Food Facts
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${codigoLimpo}.json`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // API retorna status: 0 quando produto não encontrado
    if (data.status === 0) {
      return null;
    }

    return {
      code: data.code,
      product_name: data.product?.product_name || '',
      brands: data.product?.brands || '',
      categories: data.product?.categories || '',
      image_url: data.product?.image_url || '',
      quantity: data.product?.quantity || '',
    };
  } catch (error) {
    console.error('Erro ao buscar código de barras:', error);
    return null;
  }
}

/**
 * Valida se o código de barras possui formato correto
 * Suporta formatos: EAN-13 (13 dígitos), EAN-8 (8 dígitos), UPC-A (12 dígitos)
 * Inclui validação de dígito verificador para códigos EAN-13
 * @function validarCodigoBarras
 * @param {string} codigo - Código de barras a ser validado
 * @returns {boolean} true se o código é válido, false caso contrário
 * @example
 * validarCodigoBarras('7891000100103'); // true (EAN-13 válido)
 * validarCodigoBarras('12345678'); // true (EAN-8)
 * validarCodigoBarras('123456789012'); // true (UPC-A)
 * validarCodigoBarras('123'); // false (tamanho inválido)
 */
export function validarCodigoBarras(codigo: string): boolean {
  const codigoLimpo = codigo.replace(/\D/g, '');
  
  // Aceita códigos de 8, 12 ou 13 dígitos
  const tamanhoValido = [8, 12, 13].includes(codigoLimpo.length);
  
  if (!tamanhoValido) {
    return false;
  }

  // Validação básica de dígito verificador (EAN-13)
  if (codigoLimpo.length === 13) {
    const digitos = codigoLimpo.split('').map(Number);
    const digitoVerificador = digitos.pop()!;
    
    let soma = 0;
    digitos.forEach((digito, index) => {
      soma += digito * (index % 2 === 0 ? 1 : 3);
    });
    
    const resto = soma % 10;
    const digitoCalculado = resto === 0 ? 0 : 10 - resto;
    
    return digitoCalculado === digitoVerificador;
  }

  return true; // Para outros formatos, aceita se tiver tamanho correto
}

/**
 * Formata código de barras para exibição amigável
 * Formato EAN-13: 0 000000 00000 0 (1+6+5+1 dígitos)
 * @function formatarCodigoBarras
 * @param {string} codigo - Código de barras a ser formatado
 * @returns {string} Código de barras formatado para exibição
 * @example
 * formatarCodigoBarras('7891000100103'); // "7 891000 10010 3"
 * formatarCodigoBarras('12345678'); // "12345678"
 */
export function formatarCodigoBarras(codigo: string): string {
  const codigoLimpo = codigo.replace(/\D/g, '');
  
  // Formata EAN-13: 0 000000 00000 0 (1+6+5+1=13 dígitos)
  if (codigoLimpo.length === 13) {
    return codigoLimpo.replace(/(\d{1})(\d{6})(\d{5})(\d{1})/, '$1 $2 $3 $4');
  }
  
  return codigoLimpo;
}



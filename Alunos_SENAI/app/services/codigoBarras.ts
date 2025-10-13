/**
 * Serviço para validação de código de barras
 * Usando Open Food Facts API para produtos alimentícios
 * Documentação: https://world.openfoodfacts.org/data
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
 * Busca informações de produto por código de barras
 * @param codigo - Código de barras (EAN-13, EAN-8, UPC, etc)
 * @returns Dados do produto ou null se não encontrado
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
 * Valida formato de código de barras
 * Suporta EAN-13, EAN-8, UPC-A
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
 * Formata código de barras para exibição
 */
export function formatarCodigoBarras(codigo: string): string {
  const codigoLimpo = codigo.replace(/\D/g, '');
  
  // Formata EAN-13: 0 000000 000000 0
  if (codigoLimpo.length === 13) {
    return codigoLimpo.replace(/(\d{1})(\d{6})(\d{6})(\d{1})/, '$1 $2 $3 $4');
  }
  
  return codigoLimpo;
}


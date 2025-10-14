/**
 * Testes unitários para o serviço de Código de Barras
 * @module __tests__/services/codigoBarras
 */

import {
    buscarProdutoPorCodigoBarras,
    formatarCodigoBarras,
    ProdutoCodigoBarras,
    validarCodigoBarras,
} from '../../app/services/codigoBarras';

// Mock do fetch global
global.fetch = jest.fn();

describe('Serviço Código de Barras', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('buscarProdutoPorCodigoBarras', () => {
    const produtoMock = {
      code: '7891000100103',
      status: 1,
      product: {
        product_name: 'Leite Condensado',
        brands: 'Nestlé',
        categories: 'Laticínios',
        image_url: 'https://exemplo.com/imagem.jpg',
        quantity: '395g',
      },
    };

    const produtoEsperado: ProdutoCodigoBarras = {
      code: '7891000100103',
      product_name: 'Leite Condensado',
      brands: 'Nestlé',
      categories: 'Laticínios',
      image_url: 'https://exemplo.com/imagem.jpg',
      quantity: '395g',
    };

    it('deve buscar produto com código válido', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => produtoMock,
      });

      const resultado = await buscarProdutoPorCodigoBarras('7891000100103');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://world.openfoodfacts.org/api/v0/product/7891000100103.json'
      );
      expect(resultado).toEqual(produtoEsperado);
    });

    it('deve retornar null quando produto não for encontrado', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ status: 0 }),
      });

      const resultado = await buscarProdutoPorCodigoBarras('1234567890123');

      expect(resultado).toBeNull();
    });

    it('deve retornar null quando a API retornar erro', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      const resultado = await buscarProdutoPorCodigoBarras('7891000100103');

      expect(resultado).toBeNull();
    });

    it('deve tratar exceções de rede', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const resultado = await buscarProdutoPorCodigoBarras('7891000100103');

      expect(resultado).toBeNull();
    });

    it('deve remover caracteres não numéricos do código', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => produtoMock,
      });

      await buscarProdutoPorCodigoBarras('789-1000-100103');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://world.openfoodfacts.org/api/v0/product/7891000100103.json'
      );
    });

    it('deve lidar com produto sem informações opcionais', async () => {
      const produtoVazio = {
        code: '7891000100103',
        status: 1,
        product: {},
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => produtoVazio,
      });

      const resultado = await buscarProdutoPorCodigoBarras('7891000100103');

      expect(resultado).toEqual({
        code: '7891000100103',
        product_name: '',
        brands: '',
        categories: '',
        image_url: '',
        quantity: '',
      });
    });
  });

  describe('validarCodigoBarras', () => {
    describe('EAN-13', () => {
      it('deve validar código EAN-13 válido', () => {
        // Código válido: 7891000100103
        expect(validarCodigoBarras('7891000100103')).toBe(true);
      });

      it('deve invalidar código EAN-13 com dígito verificador incorreto', () => {
        // Último dígito incorreto
        expect(validarCodigoBarras('7891000100104')).toBe(false);
      });

      it('deve validar outro código EAN-13 válido', () => {
        // Código válido: 5901234123457
        expect(validarCodigoBarras('5901234123457')).toBe(true);
      });
    });

    describe('EAN-8', () => {
      it('deve validar código EAN-8', () => {
        expect(validarCodigoBarras('12345678')).toBe(true);
      });
    });

    describe('UPC-A', () => {
      it('deve validar código UPC-A (12 dígitos)', () => {
        expect(validarCodigoBarras('123456789012')).toBe(true);
      });
    });

    describe('Códigos inválidos', () => {
      it('deve invalidar código com 7 dígitos', () => {
        expect(validarCodigoBarras('1234567')).toBe(false);
      });

      it('deve invalidar código com 14 dígitos', () => {
        expect(validarCodigoBarras('12345678901234')).toBe(false);
      });

      it('deve invalidar código vazio', () => {
        expect(validarCodigoBarras('')).toBe(false);
      });

      it('deve invalidar código apenas com letras', () => {
        expect(validarCodigoBarras('abcdefghijklm')).toBe(false);
      });
    });

    describe('Formatação', () => {
      it('deve validar código com hífens', () => {
        expect(validarCodigoBarras('789-1000-100103')).toBe(true);
      });

      it('deve validar código com espaços', () => {
        expect(validarCodigoBarras('7891 0001 00103')).toBe(true);
      });
    });
  });

  describe('formatarCodigoBarras', () => {
    it('deve formatar código EAN-13', () => {
      expect(formatarCodigoBarras('7891000100103')).toBe('7 891000 10010 3');
    });

    it('deve formatar código EAN-13 já com formatação', () => {
      expect(formatarCodigoBarras('789-1000-100103')).toBe('7 891000 10010 3');
    });

    it('deve retornar código EAN-8 sem formatação especial', () => {
      expect(formatarCodigoBarras('12345678')).toBe('12345678');
    });

    it('deve retornar código UPC-A sem formatação especial', () => {
      expect(formatarCodigoBarras('123456789012')).toBe('123456789012');
    });

    it('deve remover caracteres não numéricos', () => {
      expect(formatarCodigoBarras('789-1000-10010-3')).toBe('7 891000 10010 3');
    });

    it('deve retornar string vazia para entrada vazia', () => {
      expect(formatarCodigoBarras('')).toBe('');
    });
  });
});


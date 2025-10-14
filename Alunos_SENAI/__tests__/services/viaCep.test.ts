/**
 * Testes unitários para o serviço ViaCEP
 * @module __tests__/services/viaCep
 */

import { buscarCep, EnderecoViaCep, formatarCep, validarCep } from '../../app/services/viaCep';

// Mock do fetch global
global.fetch = jest.fn();

describe('Serviço ViaCEP', () => {
  // Limpa os mocks antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('buscarCep', () => {
    const enderecoMock: EnderecoViaCep = {
      cep: '01310-100',
      logradouro: 'Avenida Paulista',
      complemento: 'de 612 a 1510 - lado par',
      bairro: 'Bela Vista',
      localidade: 'São Paulo',
      uf: 'SP',
      ibge: '3550308',
      gia: '1004',
      ddd: '11',
      siafi: '7107',
    };

    it('deve buscar endereço com CEP válido (com hífen)', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => enderecoMock,
      });

      const resultado = await buscarCep('01310-100');

      expect(global.fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/01310100/json/');
      expect(resultado).toEqual(enderecoMock);
    });

    it('deve buscar endereço com CEP válido (sem hífen)', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => enderecoMock,
      });

      const resultado = await buscarCep('01310100');

      expect(global.fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/01310100/json/');
      expect(resultado).toEqual(enderecoMock);
    });

    it('deve retornar null para CEP não encontrado', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ erro: true }),
      });

      const resultado = await buscarCep('99999999');

      expect(resultado).toBeNull();
    });

    it('deve retornar null para CEP inválido (menos de 8 dígitos)', async () => {
      const resultado = await buscarCep('123');

      expect(global.fetch).not.toHaveBeenCalled();
      expect(resultado).toBeNull();
    });

    it('deve retornar null para CEP inválido (mais de 8 dígitos)', async () => {
      const resultado = await buscarCep('012345678901');

      expect(global.fetch).not.toHaveBeenCalled();
      expect(resultado).toBeNull();
    });

    it('deve retornar null quando a API retornar erro', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      const resultado = await buscarCep('01310100');

      expect(resultado).toBeNull();
    });

    it('deve tratar exceções de rede', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const resultado = await buscarCep('01310100');

      expect(resultado).toBeNull();
    });

    it('deve remover caracteres especiais do CEP antes de buscar', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => enderecoMock,
      });

      await buscarCep('01.310-100');

      expect(global.fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/01310100/json/');
    });
  });

  describe('formatarCep', () => {
    it('deve formatar CEP sem hífen', () => {
      expect(formatarCep('01310100')).toBe('01310-100');
    });

    it('deve manter CEP já formatado', () => {
      expect(formatarCep('01310-100')).toBe('01310-100');
    });

    it('deve remover caracteres especiais antes de formatar', () => {
      expect(formatarCep('01.310.100')).toBe('01310-100');
    });

    it('deve formatar CEP com espaços', () => {
      expect(formatarCep('01 310 100')).toBe('01310-100');
    });

    it('deve retornar string vazia para entrada vazia', () => {
      // Quando CEP está vazio, regex não encontra match e retorna string vazia
      expect(formatarCep('')).toBe('');
    });
  });

  describe('validarCep', () => {
    it('deve validar CEP com 8 dígitos (sem hífen)', () => {
      expect(validarCep('01310100')).toBe(true);
    });

    it('deve validar CEP com 8 dígitos (com hífen)', () => {
      expect(validarCep('01310-100')).toBe(true);
    });

    it('deve invalidar CEP com menos de 8 dígitos', () => {
      expect(validarCep('0131010')).toBe(false);
    });

    it('deve invalidar CEP com mais de 8 dígitos', () => {
      expect(validarCep('013101000')).toBe(false);
    });

    it('deve invalidar CEP vazio', () => {
      expect(validarCep('')).toBe(false);
    });

    it('deve invalidar CEP apenas com letras', () => {
      expect(validarCep('abcdefgh')).toBe(false);
    });

    it('deve validar CEP com caracteres especiais mas 8 dígitos', () => {
      expect(validarCep('01.310-100')).toBe(true);
    });
  });
});


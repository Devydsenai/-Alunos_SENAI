/**
 * @file time.test.js
 * @description Testes unitários para a classe Time usando Jest.
 */

const Time = require('../time');

describe('Classe Time', () => {
  test('deve criar um time com nome, cidade e títulos', () => {
    const time = new Time('Santa Cruz', 'Recife', 1);
    expect(time.nome).toBe('Santa Cruz');
    expect(time.cidade).toBe('Recife');
    expect(time.titulos).toBe(1);
  });

  test('getDescricao deve retornar a descrição correta', () => {
    const time = new Time('Sport', 'Recife', 3);
    expect(time.getDescricao()).toBe('Sport (Recife) - 3 títulos');
  });

  test('toJSON deve retornar os dados corretos', () => {
    const time = new Time('Palmeiras', 'São Paulo', 11);
    expect(time.toJSON()).toEqual({
      nome: 'Palmeiras',
      cidade: 'São Paulo',
      titulos: 11
    });
  });
});

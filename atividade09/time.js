/**
 * @file time.js
 * @description Define a classe Time para representar um time de futebol.
 */

/**
 * @class
 * @classdesc Representa um time de futebol.
 */
class Time {
  /**
   * @constructor
   * @param {string} nome - Nome do time.
   * @param {string} cidade - Cidade do time.
   * @param {number} titulos - Número de títulos conquistados.
   */
  constructor(nome, cidade, titulos) {
    this.nome = nome;
    this.cidade = cidade;
    this.titulos = titulos;
  }

  /**
   * @description Retorna uma descrição do time.
   * @returns {string} Descrição formatada.
   */
  getDescricao() {
    return `${this.nome} (${this.cidade}) - ${this.titulos} títulos`;
  }

  /**
   * @description Exporta os dados do time como objeto JSON.
   * @returns {Object} Objeto com os dados do time.
   */
  toJSON() {
    return {
      nome: this.nome,
      cidade: this.cidade,
      titulos: this.titulos
    };
  }
}

module.exports = Time;

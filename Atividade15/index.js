/**
 * @file index.js
 * @description Gerenciador de times de futebol com funcionalidades para adicionar, listar e buscar times.
 * @author Devyd
 */

// Criamos uma classe para representar um time de futebol
/**
 * @class
 * @classdesc Representa um time de futebol com nome, cidade e número de títulos.
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
   * @description Retorna uma descrição completa do time.
   * @returns {string} Descrição do time.
   */
  getDescricao() {
    return `${this.nome} é um time da cidade de ${this.cidade} com ${this.titulos} títulos.`;
  }
}

// Criamos uma classe para gerenciar os times cadastrados
/**
 * @class
 * @classdesc Gerencia uma lista de times de futebol.
 */
class GerenciadorDeTimes {
  constructor() {
    this.times = [];
  }

  /**
   * @description Adiciona um novo time à lista.
   * @param {Time} time - Instância da classe Time.
   */
  adicionarTime(time) {
    // Verificamos se o time já existe pelo nome
    const existe = this.times.some(t => t.nome === time.nome);
    if (!existe) {
      this.times.push(time);
    } else {
      console.warn(`O time ${time.nome} já está cadastrado.`);
    }
  }

  /**
   * @description Lista todos os times cadastrados.
   * @returns {Time[]} Lista de times.
   */
  listarTimes() {
    return this.times;
  }

  /**
   * @description Busca um time pelo nome.
   * @param {string} nome - Nome do time a ser buscado.
   * @returns {Time|null} Retorna o time encontrado ou null se não existir.
   */
  buscarTime(nome) {
    const timeEncontrado = this.times.find(t => t.nome.toLowerCase() === nome.toLowerCase());
    return timeEncontrado || null;
  }
}

// Exemplo de uso
const gerenciador = new GerenciadorDeTimes();

const flamengo = new Time("Flamengo", "Rio de Janeiro", 7);
const palmeiras = new Time("Palmeiras", "São Paulo", 11);

gerenciador.adicionarTime(flamengo);
gerenciador.adicionarTime(palmeiras);

// Teste de listagem
console.log("Times cadastrados:");
gerenciador.listarTimes().forEach(time => {
  console.log(time.getDescricao());
});

// Teste de busca
const buscado = gerenciador.buscarTime("Palmeiras");
if (buscado) {
  console.log("Time encontrado:", buscado.getDescricao());
} else {
  console.log("Time não encontrado.");
}

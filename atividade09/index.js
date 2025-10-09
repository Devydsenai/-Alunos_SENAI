/**
 * @file index.js
 * @description Arquivo principal que utiliza a classe Time.
 */

const Time = require('./time');

const flamengo = new Time("Flamengo", "Rio de Janeiro", 7);
console.log(flamengo.getDescricao());

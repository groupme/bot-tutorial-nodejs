'use strict';
module.exports = function (str) {
  var quotes_json = require('./quotes.json');
  var quote=quotes_json[Math.floor(Math.random()*quotes_json.length)];
  return quote;
};

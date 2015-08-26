'use strict';
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
var winston = require('winston');

module.exports = {
  init: init
};

function init() {
  global.logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({level: process.env.LOG_LEVEL || 'debug'})
    ]
  });
}

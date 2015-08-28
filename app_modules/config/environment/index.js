'use strict';

var path = require('path');
/*jshint -W079*/
var _ = require('lodash');

/*
 * Logging setup
 */
var winston = require('winston');
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({level: process.env.LOG_LEVEL || 'debug'})
  ]
});

// All configurations will extend these options
// ============================================
var all = {
  init: init,
  mainExchange: 'tnj.' + process.env.NODE_ENV

};

function init(services, cb) {
  if (services.indexOf('logger') > -1) {
    require('../../services/logger').init();
    services.forEach(function(service) {
      if (service !== 'logger') {
        require('../../services/' + service).init();
      }
    });
  } else {
    services.forEach(function(service) {
      require('../../services/' + service).init();
    });
  }
  var int = setInterval(function() {
    if (global.logger && global.rabbitInitialized) {
      initialized();
    }
  }, 100);
  function initialized() {
    clearInterval(int);
    cb();
  }
}


// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});

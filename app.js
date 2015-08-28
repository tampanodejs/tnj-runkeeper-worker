'use strict';
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

var config = require('./app_modules/config/environment');
config.init(['logger', 'mongo', 'rabbitmq', 'message-handler'], function() {
  var rabbit = global.rabbit;
  var seeder = require('./app_modules/config/seed');
  var logger = global.logger;

  seeder.initialize(process.env.NODE_ENV);

});

'use strict';
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

var config = require('./app_modules/config/environment');
config.init(['logger', 'mongo', 'rabbitmq', 'message-handler'], function() {
  var seeder = require('./app_modules/config/seed');
  var main = require('./app_modules/main');
  var logger = global.logger;

  seeder.initialize(process.env.NODE_ENV);

  /*
   ** Initialize queue handlers
   */

  /*
   * This handler is for handling all of the standard GET requests for the main worker
   */

  var getHandler = rabbit.handle('tnj.runkeeper.get', function(message) {
    main.get(message);
  });

  var postHandler = rabbit.handle('tnj.runkeeper.post', function(message) {
    main.post(message);
  });

  var putHandler = rabbit.handle('tnj.runkeeper.put', function(message) {
    main.put(message);
  });

  var destroyHandler = rabbit.handle('tnj.runkeeper.destroy', function(message) {
    main.destroy(message);
  });

  /*
   * This handler is for messages that are sent to but not handled by this worker
   */

  var unhandledMessageHandler = rabbit.onUnhandled(function(message) {
    message.body.rejection_reason = 'No handler available for this message';
    message.reply(message.body);
  });

});

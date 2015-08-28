'use strict';
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
global.rabbit = require('352-wascally');
var rabbit = global.rabbit;
var logger = global.logger;
var main = require('../../main');

module.exports = {
  init: init
};

function init() {

  var config = {
    connection: {
      user: process.env.AMQP_USER || null,
      pass: process.env.AMQP_PASSWORD || null,
      server: process.env.AMQP_HOST || '127.0.0.1',
      port: process.env.AMQP_PORT || 5672,
      vhost: process.env.AMQP_VHOST || null
    },
    exchanges: [
      {name: 'tnj.' + process.env.NODE_ENV, type: 'topic', persistent: true},
      {name: 'tnj-deadLetter.' + process.env.NODE_ENV, type: 'topic', persistent: true}
    ],
    queues: [
      {
        name: 'tnj.runkeeper',
        limit: 100,
        queueLimit: 100000,
        subscribe: true,
        durable: true,
        deadLetterExchange: 'tnj-deadLetter.' + process.env.NODE_ENV,
        deadLetterRoutingKey: 'tnj.runkeeper.rejected'
      },
      {
        name: 'tnj.runkeeper.rejected',
        subscribe: false,
        messageTtl: 3600000
      }
    ],
    bindings: [
      {
        exchange: 'tnj.' + process.env.NODE_ENV, target: 'tnj.runkeeper',
        keys: [
          'tnj.runkeeper.get',
          'tnj.runkeeper.post',
          'tnj.runkeeper.put',
          'tnj.runkeeper.destroy'
        ]
      },
      {
        exchange: 'tnj-deadLetter.' + process.env.NODE_ENV, target: 'tnj.runkeeper.rejected',
        keys: ['tnj.runkeeper.rejected']
      }
    ]
  };

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

  rabbit.configure(config).done(function() {
    logger.info('Connection to RabbitMQ established');
  });
}
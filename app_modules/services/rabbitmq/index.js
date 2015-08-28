'use strict';
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
global.rabbit = require('352-wascally');

module.exports = {
  init: init
};

function init() {

  global.rabbitConfig = {
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
}
var config = require('../../config/environment');
var logger = global.logger;
var handler = global.messageHandler;
var _ = require('lodash');
var request = require('request');
var rabbit = global.rabbit;

module.exports = {
  index: index,
  fitness_activities: fitnessActivities
};

/**
 * This method issues a call to a service to obtain a user based on the query_params passed to the tnj-runkeeper-worker
 * @param message
 * @param cb
 */
function findUser(message, cb) {
  var data = {
    payload: {
      query_params: message.body.payload.query_params,
      resource: '/user',
      meta_data: message.body.payload.meta_data
    },
    transaction_id: message.body.transaction_id,
    client_request_id: message.body.payload.client_request_id,
    from_api_name: process.env.APP_NAME
  };
  logger.debug('Issuing a message to tnj.main.get: ' + JSON.stringify(data));
  rabbit.request(config.mainExchange, {
    routingKey: 'tnj.main.get',
    type: 'tnj.main.get',
    body: data
  }).then(function(final) {
    logger.debug('Received message from tnj.main.get: ' + JSON.stringify(final.body));
    final.ack();
    cb(final.body);
  });
}

/**
 * GET /tnj/runkeeper
 * @param message
 */
function index(message) {
  logger.debug('GET /tnj/runkeeper: ' + JSON.stringify(message.body));
  findUser(message, function(response) {

  });
}

/**
 * GET /tnj/runkeeper/fitness_activities
 * @param message
 */
function fitness_activities(message) {
  logger.debug('GET /tnj/runkeeper/fitness_activities: ' + JSON.stringify(message.body));
  findUser(message, function(response) {

  });
}
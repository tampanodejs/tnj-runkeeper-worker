var config = require('../../config/environment');
var logger = global.logger;
var handler = global.messageHandler;
var _ = require('lodash');
var request = require('request');
var rabbit = global.rabbit;
var mockRunkeeperData = require('./mock/fitness_activities.json');

module.exports = {
  index: index,
  fitness_activities: fitness_activities
};

/**
 * This method issues a call to a service to obtain a user based on the query_params passed to the tnj-runkeeper-worker
 * @param message
 * @param cb
 */
function findUserOAuthToken(message, cb) {
  var data = {
    payload: {
      query_params: message.body.payload.query_params,
      resource: 'user',
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
    var runKeeperOAuthToken = _.find(final.body.payload[0].oauth_tokens, function(oAuthToken) {
      return oAuthToken.type === 'runkeeper';
    });
    cb(final.error, runKeeperOAuthToken);
  });
}

/**
 * GET /tnj/runkeeper
 * @param message
 */
function index(message) {
  logger.debug('GET /tnj/runkeeper: ' + JSON.stringify(message.body));

  // TODO: Uncomment the lines below if you are using RunKeeper OAuth
  //findUserOAuthToken(message, function processIndex(err, oAuthToken) {
  //  if (err) {
  //    handler.error(err, message);
  //  } else {
  //    var options = {
  //      url: 'https://api.runkeeper.com/user',
  //      headers: {
  //        'Authorization': 'Bearer ' + oAuthToken.token
  //      }
  //    };
  //
  //    request(options, function processRunkeeperRequest(error, response, body) {
  //      if (error) {
  //        handler.error(err, message);
  //      } else {
  //        handler.success(JSON.parse(body), message);
  //      }
  //    });
  //  }
  //});

  handler.success({message: 'TODO: This is where you would issue a RunKeeper profile call.'}, message);
}

/**
 * GET /tnj/runkeeper/fitness_activities
 * @param message
 */
function fitness_activities(message) {
  logger.debug('GET /tnj/runkeeper/fitness_activities: ' + JSON.stringify(message.body));

  // TODO: Uncomment the lines below if you are using RunKeeper OAuth
  //findUserOAuthToken(message, function processFitnessActivities(err, oAuthToken) {
  //  if (err) {
  //    handler.error(err, message);
  //  } else {
  //    var options = {
  //      url: 'https://api.runkeeper.com/fitnessActivities?pageSize=100',
  //      headers: {
  //        'Authorization': 'Bearer ' + oAuthToken.token
  //      }
  //    };
  //
  //    request(options, function processRunkeeperRequest(error, response, body) {
  //      if (error) {
  //        handler.error(err, message);
  //      } else {
  //        handler.success(JSON.parse(body), message);
  //      }
  //    });
  //  }
  //});

  handler.success(mockRunkeeperData, message);
}
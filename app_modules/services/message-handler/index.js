'use strict';
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
var config = require('../../config/environment');
var logger = global.logger;
var rabbit = global.rabbit;
var audit = global.audit;

module.exports = {
  init: init
};

function init() {
  global.messageHandler = {
    success: success,
    error: error
  }
}
function success(data, message) {
  message.reply({
    payload: data,
    transaction_id: message.body.transaction_id,
    client_request_id: message.body.client_request_id,
    from_worker_name: process.env.APP_NAME
  });
  logger.debug(JSON.stringify(data));
}

function error(err, message) {
  message.reply({
    error: err,
    transaction_id: message.body.transaction_id,
    client_request_id: message.body.client_request_id,
    from_worker_name: process.env.APP_NAME
  });
  logger.error(JSON.stringify(err));
}
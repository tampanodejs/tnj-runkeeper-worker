'use strict';
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
var mongoose = require('mongoose');

module.exports = {
  init: init
};

function init() {
  var config = {
    uri: process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/tnjrunners',
    options: {
      db: {
        safe: true
      }
    }
  };
  mongoose.connect(config.uri, config.options);
}
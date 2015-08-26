'use strict';
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
var mongoose = require('mongoose');
var config = require('../config/environment');

var schema = {
  password: String,
  user_name: String,
  display_name: String,
  last_login: {
    type: Date,
    default: Date.now,
    required: true
  },
  enabled: Boolean,
  oauth_tokens: mongoose.Schema.Types.Mixed
};


var mongooseSchema = new mongoose.Schema(schema);
var users = mongoose.model('users', mongooseSchema);

module.exports = users;
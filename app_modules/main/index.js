'use strict';
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

var handler = global.messageHandler;

/*
 ** Exposed Functions
 */
module.exports = {
  get: get,
  post: post,
  put: put,
  destroy: destroy
};

function get(message) {
  var resource = message.body.payload.resource; // e.g. /friends/list === GET /friends/list
  var args = resource.split('/');
  if (args[1]) {
    try {
      require('./' + args[0] + '/get')[args[1]](message);
    } catch (err) {
      handler.error(err, message);
    }
  } else {
    try {
      require('./' + args[0] + '/get')['index'](message);
    } catch (err) {
      handler.error(err, message);
    }
  }
}

function put(message) {
  var resource = message.body.payload.resource; // e.g. /friends/list === PUT /friends/list
  var args = resource.split('/');
  if (args[1]) {
    try {
      require('./' + args[0] + '/put')[args[1]](message);
    } catch (err) {
      handler.error(err, message);
    }
  } else {
    try {
      require('./' + args[0] + '/put')['index'](message);
    } catch (err) {
      handler.error(err, message);
    }
  }
}

function destroy(message) {
  var resource = message.body.payload.resource; // e.g. /friends/list === DELETE /friends/list
  var args = resource.split('/');
  if (args[1]) {
    try {
      require('./' + args[0] + '/destroy')[args[1]](message);
    } catch (err) {
      handler.error(err, message);
    }
  } else {
    try {
      require('./' + args[0] + '/destroy')['index'](message);
    } catch (err) {
      handler.error(err, message);
    }
  }
}

function post(message) {
  var resource = message.body.payload.resource; // e.g. /friends/list === POST /friends/list
  var args = resource.split('/');
  if (args[1]) {
    try {
      require('./' + args[0] + '/post')[args[1]](message);
    } catch (err) {
      handler.error(err, message);
    }
  } else {
    try {
      require('./' + args[0] + '/post')['index'](message);
    } catch (err) {
      handler.error(err, message);
    }
  }
}
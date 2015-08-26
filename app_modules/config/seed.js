/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var config = require('../config/environment');
module.exports = {
  initialize: initialize
};

/**
 * Initializes the collection this worker is in charge of
 * @param {Object} model - The Mongoose model to use for seeding
 */
function initialize(environment) {
  environment = environment.toLowerCase();
  console.log(environment, ' seeding...');
  if (environment === 'dev' || environment === 'development') {
    seedDev();
  } else if (environment === 'staging') {
    seedStaging();
  } else if (environment === 'qa') {
    seedQA();
  }
}

/**
 * Dev
 *
 * Run when in the development environment.
 */
function seedDev() {

}

/**
 * Staging
 *
 * Run when in the staging environment.
 */
function seedStaging() {

}

/**
 * QA
 *
 * Run when in the QA environment.
 */
function seedQA() {

}
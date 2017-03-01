'use strict';

/**
 * Module dependencies
 */
var wantsPolicy = require('../policies/wants.server.policy'),
  wants = require('../controllers/wants.server.controller');

module.exports = function(app) {
  // Wants Routes
  app.route('/api/wants').all(wantsPolicy.isAllowed)
    .get(wants.list)
    .post(wants.create);

  app.route('/api/wants/:wantId').all(wantsPolicy.isAllowed)
    .get(wants.read)
    .put(wants.update)
    .delete(wants.delete);

  // Finish by binding the Want middleware
  app.param('wantId', wants.wantByID);
};

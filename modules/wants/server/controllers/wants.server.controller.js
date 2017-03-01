'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Want = mongoose.model('Want'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Want
 */
exports.create = function(req, res) {
  var want = new Want(req.body);
  want.user = req.user;

  want.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(want);
    }
  });
};

/**
 * Show the current Want
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var want = req.want ? req.want.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  want.isCurrentUserOwner = req.user && want.user && want.user._id.toString() === req.user._id.toString();

  res.jsonp(want);
};

/**
 * Update a Want
 */
exports.update = function(req, res) {
  var want = req.want;

  want = _.extend(want, req.body);

  want.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(want);
    }
  });
};

/**
 * Delete an Want
 */
exports.delete = function(req, res) {
  var want = req.want;

  want.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(want);
    }
  });
};

/**
 * List of Wants
 */
exports.list = function(req, res) {
  Want.find().sort('-created').populate('user', 'displayName').exec(function(err, wants) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(wants);
    }
  });
};

/**
 * Want middleware
 */
exports.wantByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Want is invalid'
    });
  }

  Want.findById(id).populate('user', 'displayName').exec(function (err, want) {
    if (err) {
      return next(err);
    } else if (!want) {
      return res.status(404).send({
        message: 'No Want with that identifier has been found'
      });
    }
    req.want = want;
    next();
  });
};

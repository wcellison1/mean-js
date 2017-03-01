'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Profile Schema
 */
var ProfileSchema = new Schema({
  iq: {
    type: String,
    default: '',
    required: 'Please fill Profile IQ',
    trim: true
  },
   eq: {
    type: String,
    default: '',
    required: 'Please fill Profile EQ',
    trim: true
  },
   eyeColor: {
    type: String,
    default: '',
    required: 'Please fill Profile Eye Color',
    trim: true
  },
  disc: {
    type: String,
    default: '',
    required: 'Please fill Profile D.I.S.C',
    trim: true
  },
  interest: {
    type: String,
    default: '',
    required: 'Please fill Profile Intersts',
    trim: true
  },

  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Profile', ProfileSchema);

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Want Schema
 */
var WantSchema = new Schema({
   iq: {
    type: String,
    default: '',
    required: 'Please fill Want IQ',
    trim: true
  },
   eq: {
    type: String,
    default: '',
    required: 'Please fill Want EQ',
    trim: true
  }, 
  eyeColor: {
    type: String,
    default: '',
    required: 'Please fill Want Eye Color',
    trim: true
  },
  disc: {
    type: String,
    default: '',
    required: 'Please fill Want D.I.S.C',
    trim: true
  }, 
  interest: {
    type: String,
    default: '',
    required: 'Please fill Want Interests',
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

mongoose.model('Want', WantSchema);

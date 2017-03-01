'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Want = mongoose.model('Want'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  want;

/**
 * Want routes tests
 */
describe('Want CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Want
    user.save(function () {
      want = {
        name: 'Want name'
      };

      done();
    });
  });

  it('should be able to save a Want if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Want
        agent.post('/api/wants')
          .send(want)
          .expect(200)
          .end(function (wantSaveErr, wantSaveRes) {
            // Handle Want save error
            if (wantSaveErr) {
              return done(wantSaveErr);
            }

            // Get a list of Wants
            agent.get('/api/wants')
              .end(function (wantsGetErr, wantsGetRes) {
                // Handle Wants save error
                if (wantsGetErr) {
                  return done(wantsGetErr);
                }

                // Get Wants list
                var wants = wantsGetRes.body;

                // Set assertions
                (wants[0].user._id).should.equal(userId);
                (wants[0].name).should.match('Want name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Want if not logged in', function (done) {
    agent.post('/api/wants')
      .send(want)
      .expect(403)
      .end(function (wantSaveErr, wantSaveRes) {
        // Call the assertion callback
        done(wantSaveErr);
      });
  });

  it('should not be able to save an Want if no name is provided', function (done) {
    // Invalidate name field
    want.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Want
        agent.post('/api/wants')
          .send(want)
          .expect(400)
          .end(function (wantSaveErr, wantSaveRes) {
            // Set message assertion
            (wantSaveRes.body.message).should.match('Please fill Want name');

            // Handle Want save error
            done(wantSaveErr);
          });
      });
  });

  it('should be able to update an Want if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Want
        agent.post('/api/wants')
          .send(want)
          .expect(200)
          .end(function (wantSaveErr, wantSaveRes) {
            // Handle Want save error
            if (wantSaveErr) {
              return done(wantSaveErr);
            }

            // Update Want name
            want.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Want
            agent.put('/api/wants/' + wantSaveRes.body._id)
              .send(want)
              .expect(200)
              .end(function (wantUpdateErr, wantUpdateRes) {
                // Handle Want update error
                if (wantUpdateErr) {
                  return done(wantUpdateErr);
                }

                // Set assertions
                (wantUpdateRes.body._id).should.equal(wantSaveRes.body._id);
                (wantUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Wants if not signed in', function (done) {
    // Create new Want model instance
    var wantObj = new Want(want);

    // Save the want
    wantObj.save(function () {
      // Request Wants
      request(app).get('/api/wants')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Want if not signed in', function (done) {
    // Create new Want model instance
    var wantObj = new Want(want);

    // Save the Want
    wantObj.save(function () {
      request(app).get('/api/wants/' + wantObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', want.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Want with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/wants/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Want is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Want which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Want
    request(app).get('/api/wants/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Want with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Want if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Want
        agent.post('/api/wants')
          .send(want)
          .expect(200)
          .end(function (wantSaveErr, wantSaveRes) {
            // Handle Want save error
            if (wantSaveErr) {
              return done(wantSaveErr);
            }

            // Delete an existing Want
            agent.delete('/api/wants/' + wantSaveRes.body._id)
              .send(want)
              .expect(200)
              .end(function (wantDeleteErr, wantDeleteRes) {
                // Handle want error error
                if (wantDeleteErr) {
                  return done(wantDeleteErr);
                }

                // Set assertions
                (wantDeleteRes.body._id).should.equal(wantSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Want if not signed in', function (done) {
    // Set Want user
    want.user = user;

    // Create new Want model instance
    var wantObj = new Want(want);

    // Save the Want
    wantObj.save(function () {
      // Try deleting Want
      request(app).delete('/api/wants/' + wantObj._id)
        .expect(403)
        .end(function (wantDeleteErr, wantDeleteRes) {
          // Set message assertion
          (wantDeleteRes.body.message).should.match('User is not authorized');

          // Handle Want error error
          done(wantDeleteErr);
        });

    });
  });

  it('should be able to get a single Want that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Want
          agent.post('/api/wants')
            .send(want)
            .expect(200)
            .end(function (wantSaveErr, wantSaveRes) {
              // Handle Want save error
              if (wantSaveErr) {
                return done(wantSaveErr);
              }

              // Set assertions on new Want
              (wantSaveRes.body.name).should.equal(want.name);
              should.exist(wantSaveRes.body.user);
              should.equal(wantSaveRes.body.user._id, orphanId);

              // force the Want to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Want
                    agent.get('/api/wants/' + wantSaveRes.body._id)
                      .expect(200)
                      .end(function (wantInfoErr, wantInfoRes) {
                        // Handle Want error
                        if (wantInfoErr) {
                          return done(wantInfoErr);
                        }

                        // Set assertions
                        (wantInfoRes.body._id).should.equal(wantSaveRes.body._id);
                        (wantInfoRes.body.name).should.equal(want.name);
                        should.equal(wantInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Want.remove().exec(done);
    });
  });
});

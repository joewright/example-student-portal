/* globals describe, it, after */
const assert = require('assert');
const request = require('supertest');

const {app, server} = require('../');

after(() => {
  server.close();
});

describe('The api', () => {
  it('logs in with valid credentials', (done) => {
    const user = {
      username: 'wow',
      password: 'supersecure'
    };
    request(app)
      .post('/auth/login')
      .send({
        user: user
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(user.username, res.body.username);
        assert.notEqual(res.body.username, undefined);
        done();
      });
  });
  it('has an endpoint for retrieving assignments', () => {
    request(app)
      .get('/api/assignments')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        assert.notEqual(res.body.length, 0);
      });
  });
});
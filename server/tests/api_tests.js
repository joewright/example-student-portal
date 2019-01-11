/* globals describe, it, after */
const assert = require('assert');
const request = require('supertest');

const {
  app,
  server
} = require('../');

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

  it('retrieves a single assignment', () => {
    request(app)
      .get('/api/assignments/238d0a81-2adf-4a4a-8169-bfdffd10adf9')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        assert.notEqual(res.body._uuid, undefined);
      });
  });

  it('fails to upload a file', (done) => {
    request(app)
      .post('/api/assignments/4343d920-e9e6-4070-9110-dfc28b5e5b94/submit')
      .expect(422)
      .end((err, res) => {
        if (err) return done(err);
        assert.notEqual(res.body.error, undefined);
        done();
      });
  });
});
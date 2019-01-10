const uuidv4 = require('uuid/v4');

class Auth {
  constructor(options) {
    this.connection = options.dbConnection;
  }
  login(user, done) {
    // TODO: integrate with auth service
    done(null, {
      _uuid: uuidv4(),
      username: user.username,
      firstName: 'Test',
      lastName: 'User'
    });
  }
}

module.exports = Auth;
const uuidv4 = require('uuid/v4');

class Auth {
  constructor(options) {
    this.connection = options.dbConnection;
  }
  login() {
    return (req, res, next) => {
      // TODO: integrate with auth service
      if (!req.body.user) {
        req.errors = {
          error: 'Invalid credentials'
        };
      } else {
        req.resource = {
          _uuid: uuidv4(),
          username: req.body.user.username,
          firstName: 'Test',
          lastName: 'User'
        };
      }

      next();
    };
  }
}

module.exports = Auth;
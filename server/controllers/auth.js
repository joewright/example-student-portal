const uuidv4 = require('uuid/v4');

exports.Login = Login;

function Login(user, done) {
  // TODO: integrate with auth service
  done(null, {
    _uuid: uuidv4(),
    username: user.username
  });
}

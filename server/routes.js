const bodyParser = require('body-parser');
const Auth = require('./controllers/auth');
const Assignments = require('./controllers/assignments');

exports.setupRoutes = setupRoutes;

function setupRoutes(app) {
  app.post('/auth/login', bodyParser.json(), (req, res) => {
    Auth.Login(req.body.user, (error, user) => {
      if (error) {
        return res.status(422).send({
          error: 'Invalid username or password'
        });
      }
      res.send(user);
    });
  });

  app.get('/api/assignments', bodyParser.json(), (req, res) => {
    Assignments.list(null, (error, results) => {
      if (error) {
        return res.status(422).send({
          error: 'Unable to retrieve assignments'
        });
      }
      res.send(results);
    });
  });
}
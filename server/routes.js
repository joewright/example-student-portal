const bodyParser = require('body-parser');
const AuthResource = require('./controllers/auth');
const AssignmentResource = require('./controllers/assignments');

exports.setupRoutes = setupRoutes;

function setupRoutes(app) {
  const resourceOptions = {
    dbConnection: app.dbConnection
  };
  const Assignments = new AssignmentResource(resourceOptions);
  const Auth = new AuthResource(resourceOptions);

  app.post('/auth/login', bodyParser.json(), (req, res) => {
    Auth.login(req.body.user, (error, user) => {
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

  app.get('/api/assignments/:assignmentId', bodyParser.json(), (req, res) => {
    Assignments.findById(req.params.assignmentId, (error, result) => {
      if (error) {
        return res.status(422).send({
          error: 'Unable to retrieve assignments'
        });
      }
      res.send(result);
    });
  });
}
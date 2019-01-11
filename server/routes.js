const bodyParser = require('body-parser');

// set up endpoint resources
const AuthResource = require('./controllers/auth');
const AssignmentResource = require('./controllers/assignments');
const UploadHandler = require('./controllers/upload-handler');

exports.setupRoutes = setupRoutes;

function setupRoutes(app) {
  const resourceOptions = {
    dbConnection: app.dbConnection
  };
  const Auth = new AuthResource(resourceOptions);
  const Assignments = new AssignmentResource(resourceOptions);

  // user routes
  app.post('/auth/login',
    bodyParser.json(),
    Auth.login(),
    sendResult());

  // assignment routes
  app.get('/api/assignments',
    Assignments.index(),
    sendResult());

  app.get('/api/assignments/:assignmentId',
    Assignments.get(),
    sendResult());

  app.post('/api/assignments/:assignmentId/submit',
    Assignments.get(),
    UploadHandler.upload.single('file'),
    UploadHandler.validate(),
    sendResult());
}

// generic response formatter
function sendResult() {
  return (req, res) => {
    if (req.errors) {
      return res.status(422).send(req.errors);
    }
    res.send(req.resource);
  };
}
const path = require('path');
const express = require('express');

const port = process.env.PORT || 5000;

const app = express();
// set up static assets
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

if (process.env.APP_ENV === 'dev') {
  // allow cors for local frontend dev
  let cors = require('cors');
  app.use(cors());
}

// set up API routes
require('./routes').setupRoutes(app);

// start the server
var server = app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

exports.server = server;
exports.app = app;
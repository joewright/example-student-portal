const path = require('path');
const express = require('express');

const port = process.env.PORT || 5000;

const app = express();
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

if (process.env.APP_ENV === 'dev') {
  let cors = require('cors');
  app.use(cors());
}

require('./routes').setupRoutes(app);

var server = app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

exports.server = server;
exports.app = app;
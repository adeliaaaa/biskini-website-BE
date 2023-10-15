const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { busRoute } = require('./routes');

const initialize = () => {
  const app = express();

  app.use(bodyParser.json());

  app.use(cors());

  // routes
  app.use('/', busRoute);

  return app;
};

const app = initialize();
app.listen(8000, async () => {
  console.log('Server listening on http://localhost:8000');
});

'use strict'

let express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  app = express(),
  initRoutes = require('./routes/user.server.routes'),
  config = require('config'),
  staticFiles = express.static('public');

// using middlewares: *morgan to log every request in console and express.static to serve static files, body parser: parse request payload

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(staticFiles);
initRoutes(app);

app.listen(config.PORT, ()=>{
  console.log('Server started on port 3333');
});
'use strict'

// app.js

let express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  app = express(),
  initRoutes = require('./routes/user.server.routes'),
  config = require('./config'),
  staticFiles = express.static('public');

// using middlewares: *morgan to log every request in console, express.static to serve static files, body parser: parse request payload

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(staticFiles);

// init app router
initRoutes(app);

// set port to available dedicated Heroku port or 3333
app.set('port', (process.env.PORT || config.PORT));

// start server on port
app.listen(app.get('port'), ()=>{
  console.log(`Server started on port ${app.get('port')}`);
});
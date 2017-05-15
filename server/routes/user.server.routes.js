'use strict';

let users = require('../controllers/user.server.controller');

module.exports = (app) => {

  app.all((req, res, next) => {
    res.json('Hello from server side!');
    next();
  });

  app.route('/all-users')
    .get(users.getAll);

  app.route('/add-user')
    .post(users.create);

  app.route('/delete-user')
    .post(users.delete);

}
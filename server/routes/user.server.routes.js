'use strict';

// app routes

// require user controller
let users = require('../controllers/user.server.controller');

module.exports = (app) => {

  // Handle different request with, in order to get all users from DB, create new user and delete user from DB, URLs are pretty much self-explanatory
  app.route('/all-users')
    .get(users.getAll);

  // Add user to DB route
  app.route('/add-user')
    .post(users.create);

  //Delete user from DB route
  app.route('/delete-user')
    .post(users.delete);

}
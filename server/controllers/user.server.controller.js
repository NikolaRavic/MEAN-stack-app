'use strict'

// User controller

let config = require('../config'),
  mongoose = require('mongoose'),
  user = require('../models/user.model'),
  User = mongoose.model('User');

// Connect to mongoDB via URL in our config module
mongoose.connect(config.DB_URL);

// Create controller to handle adding user to DB logic
exports.create = (req, res) => {
  let user = req.body.user;
  let newUser = new User({
    fullName: user.fullName,
    address: user.address,
    email: user.email,
    country: user.country
  });
  newUser.save((err, user) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    setTimeout(() => {
      res.json(user);
    }, 2000);
    console.log('User successfully saved: ', user);
  });
}

// getAll controller which returns all users from DB
exports.getAll = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(`Something went wrong with fetching data: ${err}`);
      return res.json(users);
    }
    setTimeout(() => {
      res.json(users);
    }, 2000);
  });
}

// delete controller which handles delete user from DB and returns that deleted user as response
exports.delete = (req, res) => {
  User.findOneAndRemove({_id: req.body.id}, (err, user) => {
    if (err) {
      console.log(`Something went wrong with fetching data: ${err}`);
      return;
    }
    res.json(user);
  });
}
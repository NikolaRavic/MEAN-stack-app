'use strict'

let config = require('../config'),
  mongoose = require('mongoose'),
  user = require('../models/user.model'),
  User = mongoose.model('User');

mongoose.connect(config.DB_URL);

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
      res.json(err);
    }
    res.json(user);
    console.log('User successfully saved: ', user);
  });
}

exports.getAll = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(`Something went wrong with fetching data: ${err}`);
      return;
    }
    res.json(users);
  });
}

exports.delete = (req, res) => {
  User.findOneAndRemove({_id: req.body.id}, (err, user) => {
    if (err) {
      console.log(`Something went wrong with fetching data: ${err}`);
      return;
    }
    res.json(user);
  });
}
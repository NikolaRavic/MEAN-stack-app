let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let UserSchema = new Schema({
  fullName: {
    type: String,
    default: '',
    trim: true,
    required: 'Full name can not be blank!'
  },
  email: {
    type: String,
    default: '',
    trim: true,
    required: 'An Email address can not be blank!'
  },
  address: {
    type: String,
    default: '',
    trim: true,
    required: 'Address can not be blank!'
  },
  country: {
    type: String,
    default: '',
    trim: true,
    required: 'Country can not be blank!'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('User', UserSchema);
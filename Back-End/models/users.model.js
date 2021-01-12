'use strict';

const mongoose = require('./index');
const Schema = mongoose.Schema;

const user = new Schema({
  user_name: {
    type: String,
    required: true,
  },
  // user_email: {
  //   type: String,
  //   required: [true, 'Email or Phone number is required'],
  //   lowercase: true,
  //   unique: true,
  // },
  // user_password: {
  //   type: String,
  //   required: [true, 'Password is required'],
  // },
  profile_picture: {
    type: String,
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD6HFhpwNrwiye9Qp_o5StOPngPZTTq-If5Fksap0fCCYUE5kusg',
  },
  movies: {
    last_seen: Number,
    want_to_see: [Number],
    liked: [Number],
    disliked: [Number],
    favourites: [Number],
  },
});

module.exports = mongoose.model('User', user);

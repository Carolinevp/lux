'use strict';

const mongoose = require('./index');
const Schema = mongoose.Schema;

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD6HFhpwNrwiye9Qp_o5StOPngPZTTq-If5Fksap0fCCYUE5kusg',
  },
  last_seen: Number,
  want_to_see: [Number],
  liked: [Number],
  disliked: [Number],
  favourites: [Number],
});

module.exports = mongoose.model('User', user);

'use strict';

const mongoose = require('./index');
const Schema = mongoose.Schema;

const genres = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Genres', genres);

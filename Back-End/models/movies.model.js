'use strict';

const mongoose = require('./index');
const Schema = mongoose.Schema;

const movie = new Schema({
  title: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  backdrop_path: {
    type: String,
    required: true,
  },
  genre_ids: {
    type: [Number],
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  release_date: {
    type: Number,
    required: true,
  },
  nb_liked: {
    type: Number,
  },
  nb_disliked: {
    type: Number,
  },
  nb_favouried: {
    type: Number,
  },
  nb_watchlist: {
    type: Number,
  },
});

module.exports = mongoose.model('Movie', movie);

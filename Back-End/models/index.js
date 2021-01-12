'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/lux', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

module.exports = mongoose;

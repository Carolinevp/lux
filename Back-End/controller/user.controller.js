'use strict';

const Model = require('../models/users.model');

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Model.findById(id);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.AddToLikedList = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Model.findByIdAndUpdate(
      { _id: id },
      { liked: [] },
      { new: true },
    );
    res.send(user);
  } catch (err) {
    console.log('UPDATE MOVIE:', err);
    res.sendStatus(500);
  }
};

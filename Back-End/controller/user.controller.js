'use strict';

const Model = require('../models/users.model');

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Model.findById(id);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.getListByUser = async (req, res) => {
  const { id, listName } = req.params;
  try {
    const user = await Model.findOne({ _id: id }, listName);
    res.send(user[listName]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.addMovieToList = async (req, res) => {
  // const { id, listName } = req.params;
  const { id, listName, movieToAdd } = req.body;
  try {
    // let user = await Model.findById(id);
    let user = await Model.findOneAndUpdate(
      { _id: id, [listName]: { $nin: [movieToAdd] } },
      { $push: { [listName]: [movieToAdd] } },
      { new: true },
    );
    res.send(user);
    if (user !== null) {
      console.log('MOVIE SUCCESSFULLY ADDED:', movieToAdd);
    } else {
      console.log(`movie already in ${listName} list`);
    }
  } catch (err) {
    console.log('UPDATE MOVIE ERROR:', err);
    res.sendStatus(500);
  }
};

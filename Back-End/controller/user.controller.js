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

exports.addMovieToDislikedList = async (req, res) => {
  const { listName } = req.params;
  const { id, movieToAdd } = req.body;
  console.log('req.body', req.body);
  try {
    let user = await Model.findOneAndUpdate(
      { _id: id, disliked: { $nin: [movieToAdd] } },
      { $push: { disliked: [movieToAdd] } },
      { new: true },
    );
    user = await Model.findOneAndUpdate(
      { _id: id },
      { $pull: { liked: { $in: [movieToAdd] } } },
      { new: true },
    );
    user = await Model.findOneAndUpdate(
      { _id: id },
      { $pull: { want_to_see: { $in: [movieToAdd] } } },
      { new: true },
    );
    user = await Model.findOneAndUpdate(
      { _id: id },
      { $pull: { favourites: { $in: [movieToAdd] } } },
      { new: true },
    );
    user = await Model.findOneAndUpdate(
      { _id: id },
      { last_seen: [movieToAdd] },
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

exports.addMovieToLikedList = async (req, res) => {
  const { listName } = req.params;
  const { id, movieToAdd } = req.body;
  console.log('req.body', req.body);
  try {
    let user = await Model.findOneAndUpdate(
      { _id: id, liked: { $nin: [movieToAdd] } },
      { $push: { liked: [movieToAdd] } },
      { new: true },
    );
    user = await Model.findOneAndUpdate(
      { _id: id },
      { $pull: { disliked: { $in: [movieToAdd] } } },
      { new: true },
    );
    user = await Model.findOneAndUpdate(
      { _id: id },
      { $pull: { want_to_see: { $in: [movieToAdd] } } },
      { new: true },
    );
    user = await Model.findOneAndUpdate(
      { _id: id },
      { last_seen: [movieToAdd] },
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

exports.addMovieToFavourites = async (req, res) => {
  const { listName } = req.params;
  const { id, movieToAdd } = req.body;
  console.log('req.body', req.body);
  try {
    let user = await Model.findOneAndUpdate(
      { _id: id, favourites: { $nin: [movieToAdd] } },
      { $push: { favourites: [movieToAdd] } },
      { new: true },
    );
    user = await Model.findOneAndUpdate(
      { _id: id },
      { $pull: { want_to_see: { $in: [movieToAdd] } } },
      { new: true },
    );
    user = await Model.findOneAndUpdate(
      { _id: id },
      { $pull: { disliked: { $in: [movieToAdd] } } },
      { new: true },
    );
    user = await Model.findOneAndUpdate(
      { _id: id },
      { last_seen: [movieToAdd] },
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

exports.addMovieToWatchlist = async (req, res) => {
  const { listName } = req.params;
  const { id, movieToAdd } = req.body;
  console.log('req.body', req.body);
  try {
    let user = await Model.findOneAndUpdate(
      { _id: id, want_to_see: { $nin: [movieToAdd] } },
      { $push: { want_to_see: [movieToAdd] } },
      { new: true },
    );
    user = await Model.findOneAndUpdate(
      { _id: id },
      { $pull: { liked: { $in: [movieToAdd] } } },
      { new: true },
    );
    user = await Model.findOneAndUpdate(
      { _id: id },
      { $pull: { disliked: { $in: [movieToAdd] } } },
      { new: true },
    );
    user = await Model.findOneAndUpdate(
      { _id: id },
      { $pull: { favourites: { $in: [movieToAdd] } } },
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

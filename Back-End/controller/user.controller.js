'use strict';

const User = require('../models/users.model');

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.getListByUser = async (req, res) => {
  const { id, listName } = req.params;
  try {
    const user = await User.findOne({ _id: id }, listName);
    res.send(user[listName]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.addMovieToList = async (req, res) => {
  const { id, listName, movieToAdd } = req.body;
  try {
    let user = await User.findOneAndUpdate(
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
  const { id, movieToAdd } = req.body;
  try {
    let user = await User.findOneAndUpdate(
      { _id: id, disliked: { $nin: [movieToAdd] } },
      { $push: { disliked: [movieToAdd] } },
      { new: true },
    );
    if (user !== null) {
      user = await User.findOneAndUpdate(
        { _id: id },
        { $pull: { liked: { $in: [movieToAdd] } } },
        { new: true },
      );
      user = await User.findOneAndUpdate(
        { _id: id },
        { $pull: { watchlist: { $in: [movieToAdd] } } },
        { new: true },
      );
      user = await User.findOneAndUpdate(
        { _id: id },
        { $pull: { favourites: { $in: [movieToAdd] } } },
        { new: true },
      );
      user = await User.findOneAndUpdate(
        { _id: id },
        { last_seen: [movieToAdd] },
        { new: true },
      );
    }
    res.send(user);
    if (user !== null) {
      console.log('MOVIE SUCCESSFULLY ADDED:', movieToAdd);
    } else {
      console.log('movie already in disliked list');
    }
  } catch (err) {
    console.log('UPDATE MOVIE ERROR:', err);
    res.sendStatus(500);
  }
};

exports.addMovieToLikedList = async (req, res) => {
  const { id, movieToAdd } = req.body;
  try {
    let user = await User.findOneAndUpdate(
      { _id: id, liked: { $nin: [movieToAdd] } },
      { $push: { liked: [movieToAdd] } },
      { new: true },
    );
    if (user !== null) {
      user = await User.findOneAndUpdate(
        { _id: id },
        { $pull: { disliked: { $in: [movieToAdd] } } },
        { new: true },
      );
      user = await User.findOneAndUpdate(
        { _id: id },
        { $pull: { watchlist: { $in: [movieToAdd] } } },
        { new: true },
      );
      user = await User.findOneAndUpdate(
        { _id: id },
        { $pull: { favourites: { $in: [movieToAdd] } } },
        { new: true },
      );
      user = await User.findOneAndUpdate(
        { _id: id },
        { last_seen: [movieToAdd] },
        { new: true },
      );
    }
    res.send(user);
    if (user !== null) {
      console.log('MOVIE SUCCESSFULLY ADDED:', movieToAdd);
    } else {
      console.log('movie already in liked list');
    }
  } catch (err) {
    console.log('UPDATE MOVIE ERROR:', err);
    res.sendStatus(500);
  }
};

exports.addMovieToFavourites = async (req, res) => {
  const { id, movieToAdd } = req.body;
  try {
    let user = await User.findOneAndUpdate(
      { _id: id, favourites: { $nin: [movieToAdd] } },
      { $push: { favourites: [movieToAdd] } },
      { new: true },
    );
    if (user !== null) {
      user = await User.findOneAndUpdate(
        { _id: id },
        { $pull: { watchlist: { $in: [movieToAdd] } } },
        { new: true },
      );
      user = await User.findOneAndUpdate(
        { _id: id },
        { $pull: { disliked: { $in: [movieToAdd] } } },
        { new: true },
      );
      user = await User.findOneAndUpdate(
        { _id: id },
        { $pull: { liked: { $in: [movieToAdd] } } },
        { new: true },
      );
      user = await User.findOneAndUpdate(
        { _id: id },
        { last_seen: [movieToAdd] },
        { new: true },
      );
    }
    res.send(user);
    if (user !== null) {
      console.log('MOVIE SUCCESSFULLY ADDED:', movieToAdd);
    } else {
      console.log('movie already in favourites');
    }
  } catch (err) {
    console.log('UPDATE MOVIE ERROR:', err);
    res.sendStatus(500);
  }
};

exports.addMovieToWatchlist = async (req, res) => {
  const { id, movieToAdd } = req.body;
  try {
    let user = await User.findOneAndUpdate(
      { _id: id, watchlist: { $nin: [movieToAdd] } },
      { $push: { watchlist: [movieToAdd] } },
      { new: true },
    );
    if (user !== null) {
      user = await User.findOneAndUpdate(
        { _id: id },
        { $pull: { liked: { $in: [movieToAdd] } } },
        { new: true },
      );
      user = await User.findOneAndUpdate(
        { _id: id },
        { $pull: { disliked: { $in: [movieToAdd] } } },
        { new: true },
      );
      user = await User.findOneAndUpdate(
        { _id: id },
        { $pull: { favourites: { $in: [movieToAdd] } } },
        { new: true },
      );
    }
    res.send(user);
    if (user !== null) {
      console.log('MOVIE SUCCESSFULLY ADDED:', movieToAdd);
    } else {
      console.log('movie already in watchlist');
    }
  } catch (err) {
    console.log('UPDATE MOVIE ERROR:', err);
    res.sendStatus(500);
  }
};

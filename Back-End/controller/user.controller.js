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

exports.getListsByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Model.findById(id);
    res.send(user.lists);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.addMovieToList = async (req, res, movieToAdd) => {
  const { id, listName } = req.params;
  console.log('req.params', req.params);
  try {
    let user = await Model.findById(id);
    user = await Model.findOneAndUpdate(
      { _id: user.id, lists: listName },
      { listName: [...listName, movieToAdd] },
      { new: true },
    );
    res.send(user);
    console.log('UPDATE MOVIE:', movieToAdd);
  } catch (err) {
    console.log('UPDATE MOVIE:', err);
    res.sendStatus(500);
  }
};

// Book.findOneAndUpdate({ "_id": bookId }, { "$set": { "name": name, "genre": genre, "author": author, "similar": similar}}).exec(function(err, book){
//   if(err) {
//       console.log(err);
//       res.status(500).send(err);
//   } else {
//            res.status(200).send(book);
//   }
// });

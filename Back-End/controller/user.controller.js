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
    res.send(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.addMovieToList = async (req, res) => {
  // const { id, listName } = req.params;
  const { id, listName, movieToAdd } = req.body;
  // console.log('req.params', req.params);
  console.log('req.body', req.body);
  try {
    // let user = await Model.findById(id);
    // console.log('userbefore', user);
    let user = await Model.findOneAndUpdate(
      { _id: id },
      { $push: { [listName]: [movieToAdd] } },
      { new: true },
    );
    console.log('userafter', user);
    res.send(user);
  } catch (err) {
    console.log('UPDATE MOVIE ERROR:', err);
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

// {
//   "_id" : ObjectId("5ff9c7cfdf2f636e9546fe1c"),
//   "user_name" : "Caroline Victor-Pujebet",
//   "last_seen" : 773655,
//   "want_to_see" : [
//       749618,
//       441282
//   ],
//   "liked" : [
//       508442,
//       615677,
//       524047,
//       773655
//   ],
//   "disliked" : [
//       577922,
//       553604
//   ],
//   "favourites" : [
//       464052,
//       19190
//   ]
// }

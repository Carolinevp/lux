const router = require('express').Router();
const users = require('./controller/user.controller');

router.get('/users/:id', users.getUserById);
router.get('/lists/:id/:listName', users.getListByUser);
// router.put('/lists', users.addMovieToList);
router.put('/lists/disliked', users.addMovieToDislikedList);
router.put('/lists/liked', users.addMovieToLikedList);
router.put('/lists/favourites', users.addMovieToFavourites);
router.put('/lists/watchlist', users.addMovieToWatchlist);

module.exports = router;

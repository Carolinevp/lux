const router = require('express').Router();
const users = require('./controller/user.controller');

router.get('/users/:id', users.getUserById);
router.get('/lists/:id/:listName', users.getListByUser);
router.put('/lists', users.addMovieToList);
// router.delete('/lists/:name', users.deleteMovieFromList);

module.exports = router;

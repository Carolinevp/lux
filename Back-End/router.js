const router = require('express').Router();
const users = require('./controller/user.controller');

router.get('/users/:id', users.getUserById);
router.get('/lists/:id', users.getListsByUser);
router.put('/users/:id/:listName', users.addMovieToList);
// router.delete('/lists/:name', users.deleteMovieFromList);

module.exports = router;

const router = require('express').Router();
const users = require('./controller/user.controller');
const genres = require('./controller/genres.controller');

router.get('/users/:id', users.getUser);
router.get('/genres', genres.getGenres);
// router.post('/events', event.postEvent);

module.exports = router;

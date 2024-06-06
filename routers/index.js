const router = require('express').Router();
const movieRouters = require('./movieRouters');
const userRouters = require('./userRouters');
const genreRouters = require('./genreRouters');
const historyRouters = require('./historyRouters');
const customerRouters = require('./customerRouters');
const { authentication } = require('../middleware/authentication');
const errorHandler = require('../middleware/errorHandler');

router.use('/users', userRouters);
router.use('/publics', customerRouters)

router.use(authentication);

router.use('/movies', movieRouters);
router.use('/genres', genreRouters);
router.use('/histories', historyRouters);

router.use(errorHandler);

module.exports = router;
const genreRouters = require('express').Router();
const GenreController = require('../controllers/GenreController');

genreRouters.get('/', GenreController.allGenre);

module.exports = genreRouters;
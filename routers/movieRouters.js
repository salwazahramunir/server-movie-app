const movieRouters = require('express').Router();
const MovieController = require('../controllers/MovieController');
const { authorization, isAdmin } = require('../middleware/authorization');

movieRouters.get('/', MovieController.allMovie);
movieRouters.post('/', MovieController.createMovie);
movieRouters.get('/:id', MovieController.showMovie);
movieRouters.put('/:id', authorization, MovieController.updateMovie);
movieRouters.patch('/:id', isAdmin, MovieController.updateStatus);
movieRouters.delete('/:id', authorization, MovieController.deleteMovie);


module.exports = movieRouters;
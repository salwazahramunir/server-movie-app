const userRouters = require('express').Router();
const UserController = require('../controllers/UserController');
const { authentication } = require('../middleware/authentication');

userRouters.post('/register', UserController.register);
userRouters.post('/login', UserController.login);
userRouters.post('/login-google', UserController.loginGoogle);

userRouters.get('/show-profile', authentication, UserController.profileUser);

module.exports = userRouters;
const customerRouters = require('express').Router()
const CustomerController = require('../controllers/CustomerController')
const { authentication } = require('../middleware/authentication');

customerRouters.post('/register', CustomerController.register)
customerRouters.post('/login', CustomerController.login)
customerRouters.post('/login-google', CustomerController.loginGoogle);

customerRouters.get('/movies', CustomerController.readAllMovie);
customerRouters.get('/movies/:movieId', CustomerController.showMovie);
customerRouters.get('/favorites', authentication, CustomerController.readFavoriteByUser);
customerRouters.post('/favorites/:movieId', authentication, CustomerController.addFavorite);
customerRouters.get('/qrcode', CustomerController.generateQrCode);

module.exports = customerRouters
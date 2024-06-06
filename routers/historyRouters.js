const historyRouters = require('express').Router()
const HistoryController = require('../controllers/HistoryController')

historyRouters.get('/', HistoryController.allHistory);

module.exports = historyRouters;
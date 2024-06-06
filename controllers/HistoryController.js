const { History, Movie } = require('../models/index');
class HistoryController {
    static async allHistory(req, res, next) {
        try {
            let histories = await History.findAll({
                include: [Movie],
                order: [
                    ['createdAt', 'DESC'],
                ]
            });
            
            res.status(200).json({
                message: "Success read histories",
                histories
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = HistoryController
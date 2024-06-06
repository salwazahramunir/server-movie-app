const { Genre } = require('../models/index');

class GenreController {
    static async allGenre(req, res, next) {
        try {
            let genres = await Genre.findAll();
            
            res.status(200).json({
                message: "Success read genres",
                genres
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = GenreController;
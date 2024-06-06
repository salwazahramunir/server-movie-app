const { User, Movie, Genre, History } = require('../models/index');

class MovieController {
    static async createMovie(req, res, next) {
        try {
            const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
            let movie = await Movie.create({ title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId: +req.user.id, status: "active" })
            
            const description = `New movie with id: ${movie.id} created`;
            const user = await User.findByPk(+req.user.id, { attributes: ['email'] })

            await History.create({ title: movie.title, description, updatedBy: user.email, movieId: movie.id })
            
            res.status(201).json({
                message: "Success created movie",
                movie
            })
        } catch (error) {
            next(error);
        }
    }

    static async allMovie(req, res, next) {
        try {
            let movies = await Movie.findAll({
                include: [{
                    model: User,
                    attributes: [ 'id', 'username' ],
                }, {
                    model: Genre,
                    attributes: [ 'id', 'name' ]
                }],
                order: [
                    ['createdAt', 'DESC'],
                ]
            });
            res.status(200).json({
                message: "Success read movies",
                movies
            });
        } catch (error) {
            next(error);
        }
    }

    static async showMovie(req, res, next) {
        try {
            const { id } = req.params;
            let movie = await Movie.findByPk(+id)

            if (!movie) {
                throw { name: "Not Found"}
            }

            res.status(200).json({ movie });
        } catch (error) {
            next(error);
        }
    }

    static async updateMovie(req, res, next) {
        try {
            const { id } = req.params;
            const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;

            let findMovie = await Movie.findByPk(+id);
            
            if (!findMovie) {
                throw { name: "Not Found" }
            }

            await Movie.update({ title, synopsis, trailerUrl, imgUrl, rating, genreId }, { where: { id } })

            findMovie = await Movie.findByPk(+id);

            const description = `Movie with id:${id} updated`;

            const user = await User.findByPk(+req.user.id, { attributes: ['email'] })

            await History.create({ title: findMovie.title, description, updatedBy: user.email, movieId: id })

            res.status(200).json({
                message: `Success updated movie : ${findMovie.title}`
            })
        } catch (error) {
            next(error);
        }
    }

    static async updateStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            
            const findMovie = await Movie.findByPk(+id);
            
            if (!findMovie) {
                throw { name: "Not Found" }
            }
            
            await Movie.update({ status }, { where: { id } })
            
            const description = `Movie with id:${findMovie.id} status has been updated from ${findMovie.status} into ${status}`;
            const user = await User.findByPk(+req.user.id, { attributes: ['email'] })

            await History.create({ title: findMovie.title, description, updatedBy: user.email, movieId: id })
            
            res.status(200).json({
                message: `Success updated status movie : ${findMovie.title}`
            })
        } catch (error) {
            next(error);
        }
    }

    static async deleteMovie(req, res, next) {
        try {
            const { id } = req.params;
            let movie = await Movie.findByPk(+id);
            await Movie.destroy({ where: { id } });

            if (!movie) {
                throw { name: "Not Found" }
            }

            res.status(200).json({
                message: `${movie.title} success to delete`,
                movie
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = MovieController;
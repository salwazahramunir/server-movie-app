const { User, Movie } = require('../models/index');

async function authorization(req, res, next) {
    try {
        const { id, role } = req.user; // data user login
        const movieId = req.params.id // id movie
        
        if (role === "Admin") {
            next(); // jika admin langsung next
        } else {
            let movie = await Movie.findByPk(+movieId) // cari data movie by movieId

            if (!movie) { // jika movie tidak ditemukan
                throw { name: "Not Found" }
            }

            if (movie.authorId === id) {
                next(); // jika authorId dari data movie === id user login, maka next
            } else {
                throw { name: "Forbidden"}
            }
        }
    } catch (error) {
        next(error);
    }
}

async function isAdmin(req, res, next) {
    try {
        const { id, role } = req.user;
    
        if (role !== "Admin") {
            throw { name: "Forbidden"}
        }

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    authorization,
    isAdmin
}
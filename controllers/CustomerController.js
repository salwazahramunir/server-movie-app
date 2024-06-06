const { User, Movie, Favorite, Genre } = require('../models/index')
const { comparePassword } = require('../Helper/bcryptjs')
const { Op } = require("sequelize")
const { createToken } = require('../Helper/jwt')
const { OAuth2Client } = require('google-auth-library')
const { getPagination, getPaginationData } = require('../Helper/pagination')
const axios = require('axios')
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

class CustomerController {
    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body;

            let user = await User.create({ username, email, password, role: "Customer" })

            res.status(201).json({
                message: "Success created user",
                id: `${user.id}`,
                email: `${user.email}`
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            const findUser = await User.findOne({ where: { email } })

            if (!findUser) {
                throw { name: "Invalid email or password" }
            }

            const comparePass = comparePassword(password, findUser.password)

            if (!comparePass) {
                throw { name: "Invalid email or password" }
            }

            const payload = {
                id: findUser.id
            }

            const access_token = createToken(payload)

            res.status(200).json({
                message: "Success Login!",
                access_token
            });
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async loginGoogle(req, res, next) {
        try {
            const { google_token } = req.headers

            const client = new OAuth2Client(GOOGLE_CLIENT_ID)

            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: GOOGLE_CLIENT_ID,
            })

            const payload = ticket.getPayload()

            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    role: "Customer",
                    password: "passwordGoogle"
                }
            })

            const access_token = createToken({
                id: user.id
            });

            res.status(200).json({
                message: "Success Login!",
                access_token
            });

        } catch (error) {
            next(error)
        }
    }

    static async readAllMovie(req, res, next) {
        try {
            const { page, size, title, genre } = req.query;
            const { limit, offset, currentPage } = getPagination(page, size);
            const condition = {
                title: { [Op.iLike]: title ? `%${title}%` : '%%' },
                status: 'active'
            }

            if (genre > 0) {
                condition.genreId = {
                    [Op.eq]: +genre
                }
            }

            const movies = await Movie.findAndCountAll({
                where: condition,
                include: [
                    {
                        model: Genre,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    },
                    {
                        model: User,
                        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
                    }
                ],
                limit,
                offset
            })

            const data = getPaginationData(movies, currentPage, limit);

            res.status(200).json({
                message: "Success read movies",
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async showMovie(req, res, next) {
        try {
            const { movieId } = req.params

            const findMovie = await Movie.findByPk(+movieId, {
                include: [
                    {
                        model: Genre,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    },
                    {
                        model: User,
                        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
                    }
                ]
            })

            if (!findMovie) {
                throw { name: "Not Found" }
            }

            res.status(200).json({
                message: "Success show movie",
                movie: findMovie
            })
        } catch (error) {
            next(error)
        }
    }

    static async addFavorite(req, res, next) {
        try {
            const { movieId } = req.params
            const userId = req.user.id

            const findMovie = await Movie.findByPk(+movieId)

            if (!findMovie) {
                throw { name: "Not Found" }
            }

            const findFavorite = await Favorite.findOne({
                where: {
                    movieId,
                    userId
                }
            })

            if (findFavorite) {
                throw { name: "addFavoriteUnique" }
            }

            const favorite = await Favorite.create({ userId, movieId })

            res.status(201).json({
                message: "Successfully added movie to favorites",
                favorite
            })
        } catch (error) {
            next(error)
        }
    }

    static async readFavoriteByUser(req, res, next) {
        try {
            const userId = req.user.id
            const role = req.user.role

            if (role !== "Customer") {
                throw { name: "Forbidden" }
            }

            const favorites = await Favorite.findAll({
                where: { userId },
                include: [
                    {
                        model: Movie,
                        include: [
                            {
                                model: Genre,
                                attributes: { exclude: ['createdAt', 'updatedAt'] }
                            },
                            {
                                model: User,
                                attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
                            }
                        ]
                    },
                    {
                        model: User,
                        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
                    }
                ]
            })

            res.status(200).json({
                message: "Success read your favorite movie",
                favorites
            })
        } catch (error) {
            next(error)
        }
    }

    static async generateQrCode(req, res, next) {
        try {
            const { text } = req.body
            const apikey = "640747ChOVLrlcHglcoKZ0NOwANx0G1kGRPxbZr1xkQT9VqTsIFarpwj"

            const { data } = await axios({
                method: "GET",
                url: "https://api.happi.dev/v1/qrcode",
                headers: {
                    "x-happi-key": apikey,
                },
                params: {
                    data: text,
                    apikey
                }
            })

            res.status(200).json({
                data
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CustomerController
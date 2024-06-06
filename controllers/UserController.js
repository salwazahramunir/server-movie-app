const { comparePassword } = require('../Helper/bcryptjs');
const { createToken } = require('../Helper/jwt');
const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models/index');
const { use } = require('../routers');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

class UserController {
    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body;

            let user = await User.create({ username, email, password, role: "Admin" })

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
            const { email, password } = req.body;

            let findUser = await User.findOne({ where: { email } })

            if (!findUser) { // cek data user ditemukan / tidak
                throw { name: "Invalid email or password" }
            }

            const comparePass = comparePassword(password, findUser.password); // compare password

            if (!comparePass) { // cek input user valid atau tidak
                throw { name: "Invalid email or password" }
            }

            const payload = {
                id: findUser.id
            } // membuat payload

            const access_token = createToken(payload); // create token

            res.status(200).json({
                message: "Success Login!",
                access_token
            });

        } catch (error) {
            next(error);
        }
    }

    static async profileUser(req, res, next) {
        try {
            let user = await User.findByPk(+req.user.id);

            if (!user) {
                throw { name: "Not Found" }
            }

            res.status(200).json({
                message: "Success show user",
                user
            });
        } catch (error) {
            next(error);
        }
    }

    static async loginGoogle(req, res, next) {
        try {
            // token google dari req.headers
            const { google_token } = req.headers;

            //membuat object instance dari OAuth2Client
            const client = new OAuth2Client(GOOGLE_CLIENT_ID);

            // verify google token
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: GOOGLE_CLIENT_ID,
            });

            // get payload dari hasil verify
            const payload = ticket.getPayload();

            // jika where terpenuhi maka proses login, jika tidak maka proses register dan login
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    role: "Staff",
                    password: "passwordGoogle"
                }
            });

            // create token
            const access_token = createToken({
                id: user.id
            });

            // mengirim response
            res.status(200).json({
                message: "Success Login!",
                access_token
            });

        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController;
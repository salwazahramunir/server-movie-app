const { verifyToken } = require("../Helper/jwt");
const { User } = require('../models/index');

async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers;
    
        if (!access_token) { //cek token ada / tidak
            throw { name: "No Token"}
        }

        const payload = verifyToken(access_token);

        let user = await User.findByPk(+payload.id);

        if (!user) { // cek user ada / tidak
            throw { name: "Unauthorized"}
        }

        req.user = {
            id: user.id,
            role: user.role
        }

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    authentication
}
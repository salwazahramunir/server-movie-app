const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

function createToken(payload) { // membuat token
    return jwt.sign(payload, SECRET_KEY);
}

const verifyToken = (token) => jwt.verify(token, SECRET_KEY); // verify token

module.exports = {
    createToken,
    verifyToken
} 
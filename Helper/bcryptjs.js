const bcrypt = require('bcryptjs');

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    return hash;
} // hash password

const comparePassword = (password, hash) => bcrypt.compareSync(password, hash) // compare password

module.exports = {
    hashPassword,
    comparePassword
}
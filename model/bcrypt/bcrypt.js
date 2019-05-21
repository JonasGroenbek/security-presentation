const bcrypt = require('bcryptjs');
const saltRounds = 10;

/** a function taking a plaintext password returning a promise
 * @function
 * @param {String} plaintextPassword
 * @returns {Promise}
 */
function hashPassword(plaintextPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plaintextPassword, saltRounds, function (err, hash) {
            if (err) reject(err);
            resolve(hash)
        })
    })
}

/** a function taking a plaintext password returning a promise
 * @function
 * @param {String} plaintextPassword a plaintext password 
 * @param {String} hash the hashed version of the plaintextPassword
 * @returns {Promise}
 */
function matchPassword(plaintextPassword, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plaintextPassword, hash, function (err, res) {
            if (res) {
                resolve(res);
            } else {
                reject("username and password doesn't match");
            }
        });
    })
}

module.exports = {
    hashPassword,
    matchPassword
}
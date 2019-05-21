const db = require("../../config/db");
let jwt = require("../jwt/jwt");
const bcrypt = require("../bcrypt/bcrypt");
const Promise = require("promise")

/**
 * Validates a user
 * @param {String} username 
 * @param {String} password 
 * @returns {Promise} resolves to a string containing the token for the
 */
function validateUser(username, password) {
    return new Promise((resolve, reject) => {
        const query = `SELECT password, secret from users where username = "${username}";`
        db.query(query, function (error, results, fields) {
            if (error) {
                reject(error);
            } if (results[0] !== undefined) {
                bcrypt.matchPassword(password, results[0].password).then(res => {
                    resolve(jwt.signToken({ username: username, secret: results[0].secret }))
                }).catch(rejection => {
                    reject("username and password does not match")
                })
            } else {
                reject("user does not exist");
            }
        })
    })
}

/**
 * Creates a user
 * @param {String} username 
 * @param {String} password 
 * @returns {Promise} resolves to a string containing the username of the created user
 */
function createUser(username, password, secret) {
    return new Promise((resolve, reject) => {
        bcrypt.hashPassword(password).then(hash => {
            const query = `INSERT INTO users(username, password, secret) VALUES("${username}", "${hash}", "${secret}");`;
            db.query(query, function (error, results, fields) {
                if (error) {
                    if (error.message.includes("ER_DUP_ENTRY")) {
                        reject("username does already exist")
                    } else {
                        reject(error)
                    }
                } else {
                    resolve(jwt.signToken({ username: username, secret: secret}))
                }
            });
        })
    })
}
/**
 * @param {Number} id 
 * @return {Promise} resolves to a comment made by the specified user
 */
function search(id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT username FROM users WHERE id = "${id}";`;
        db.query(query, function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.stringify(results));
            }
        })
    })
}

/**
 * 
 * @param {String} username 
 * @return {Promise} resolves to userId
 */
function getUserIdByUsername(username) {
    return new Promise((resolve, reject) => {
        const query = `SELECT id FROM users WHERE username = "${username}";`;
        db.query(query, function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results[0].id)
            }
        })
    })
}

/**
 * 
 * @param {String} username 
 * @return {Promise} resolves to userId
 */
function getUserUsernameById(id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT username FROM users WHERE id = "${id}";`;
        db.query(query, function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results[0].username)
            }
        })
    })
}

/**
 * Inserts a comment
 * @param {String} content 
 * @param {String} token 
 * @return {Promise} 
 */
function comment(content, username) {
    return new Promise((resolve, reject) => {
        getUserIdByUsername(username).then(id => {
            const query = `INSERT INTO comments(content, userId) VALUES ('${content}', ${id})`
            db.query(query, function (error, results, fields) {
                if (error) {
                    reject("could not validate you!");
                } else {
                    resolve()
                }
            })
        })
    })
}

/** A function that loads all the comments with user info
 * @return {Promise} resolves to all comments
 */
function loadComments() {
    return new Promise((resolve, reject) => {
        const query = `SELECT c.content, c.created, u.username
        FROM comments c
        LEFT JOIN users u ON u.id = c.userId
        ORDER BY c.created DESC limit 40;`
        db.query(query, function (error, results, fields) {
            if (error) {
                console.log("error!")
                reject(error)
            } else {
                let parsedResults = [];
                results.forEach((result) => {
                    parsedResults.push({content: result.content, username: result.username, created: result.created});
                })
                resolve(parsedResults);
            }
        })
    })
}

module.exports = {
    validateUser,
    createUser,
    loadComments,
    comment,
    search
}
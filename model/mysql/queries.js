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
        const query = `SELECT password from users where username = "${username}";`
        db.query(query, function (error, results, fields) {
            if (error) {
                reject(error);
            } if (results.length > 0) {
                bcrypt.matchPassword(password, results[0].password).then(res => {
                    res ? resolve(jwt.signToken({ username: username })) : reject("username and password doesn't match")
                })
            } else {
                resolve("password and username doesn't match");
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
function createUser(username, password) {
    return new Promise((resolve, reject) => {
        bcrypt.hashPassword(password).then(hash => {
            const query = `INSERT INTO users(username, password) VALUES("${username}", "${hash}");`;
            db.query(query, function (error, results, fields) {
                if (error) {
                    if (error.message.includes("ER_DUP_ENTRY")) {
                        resolve("username does already exist")
                    } else {
                        reject(error)
                    }
                } else {
                    resolve(username);
                }
            });
        })
    })
}
/**
 * 
 * @param {Number} id 
 * @return {Promise} resolves to a comment made by the specified user
 */
function search(id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM comments WHERE userId = ${id}`;
        db.query(query, function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                let parsedResults = [];

                results.forEach((comment) => {
                    parsedResults.push({id: comment.id, content: comment.content, userId: comment.userId})
                })
                resolve({
                    comments: parsedResults
                });
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
 * Inserts a comment
 * @param {String} content 
 * @param {String} token 
 * @return {Promise} 
 */
function comment(token, content) {
    return new Promise((resolve, reject) => {
        getUserIdByUsername(jwt.verifyToken(token).username).then(id => {
            const query = `INSERT INTO comments(content, userId) VALUES ("${content}", ${id})`
            db.query(query, function (error, results, fields) {
                if (error) {
                    reject(error.toString())
                } else {
                    resolve("comment is created")
                }
            })
        })
    })
}

/** A function that loads all the comments
 * @return {Promise} resolves to all comments
 */
function loadComments() {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM comments";
        db.query(query, function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                let parsedResults = [];
                results.forEach((comment) => {
                    parsedResults.push({id: comment.id, content: comment.content, userId: comment.userId})
                })
                resolve({
                    comments: parsedResults
                });
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
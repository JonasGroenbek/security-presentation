'use strict';
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

const privateKey = fs.readFileSync(path.join(path.join(path.dirname(__filename), 'private.key')), 'utf8');
var publicKey = fs.readFileSync(path.join(path.join(path.dirname(__filename), 'public.key')), 'utf8');

const i = 'Gruppe5';  

const signOptions = {
    issuer: i,
    expiresIn: "12h",
    algorithm: "RS256"
};

const verifyOptions = {
    issuer: i,
    expiresIn: "12h",
    algorithm: ["RS256"]
};
/** a function taking a payload and returns a String
 * @function
 * @param {Object} payload JSON object containing field and values of payload
 * @returns {String} token
 */
function signToken(payload){
    return jwt.sign(payload, privateKey, signOptions);
}

/** a function taking a token return a decrypted token or string
 * @function
 * @param {String} token JSON object containing field and values of payload
 * @returns {String} decrypted token
 */
function verifyToken(token){
    return jwt.verify(token, publicKey, verifyOptions);
}

module.exports = {
    signToken,
    verifyToken
}
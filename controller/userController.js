const queries = require("../model/mysql/queries");

function validateUser(username, password){ 
    return queries.validateUser(username, password)
}

function createUser(username, password, secret){ 
    return queries.createUser(username, password, secret)
}

module.exports = {
    validateUser,
    createUser
}
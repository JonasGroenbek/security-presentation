const queries = require("../model/mysql/queries");

function validateUser(username, password){ 
    return queries.validateUser(username, password)
}

function createUser(username, password){ 
    return queries.createUser(username, password)
}

module.exports = {
    validateUser,
    createUser
}
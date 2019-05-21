const queries = require("../model/mysql/queries");



/**
 * Searches for comments made by owner of id specified
 * @param {Number} id 
 * @return {Promise} resolves to a comment made by the specified user
 */
function search(id){
    return queries.search(id)
};

function validateUser(username, password){ 
    return queries.validateUser(username, password)
}

function createUser(username, password, secret){ 
    return queries.createUser(username, password, secret)
}

module.exports = {
    validateUser,
    createUser,
    search
}
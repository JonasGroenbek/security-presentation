const queries = require("../model/mysql/queries");

/** A function that loads all the comments
 * @return {Promise} resolves to all comments
 */
function loadComments(){
    return queries.loadComments();
}

/**
 * Inserts a comment
 * @param {String} content 
 * @param {String} token 
 * @return {Promise} resolves to String
 */
function comment(content, username){
    return queries.comment(content, username)
}

module.exports = {
    loadComments,
    comment
}
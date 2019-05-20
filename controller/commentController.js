const queries = require("../model/mysql/queries");

/**
 * Searches for comments made by owner of id specified
 * @param {Number} id 
 * @return {Promise} resolves to a comment made by the specified user
 */
function search(id){
    return queries.search(id)
};

/** A function that loads all the comments
 * @return {Promise} resolves to all comments
 */
function loadComments(){
    return queries.loadComments();
}

/** A function that loads all the comments
 * @return {Promise} resolves to all comments
 */
function loadCommentsWithInfo(){
    return queries.loadCommentsWithInfo();
}

/**
 * Inserts a comment
 * @param {String} content 
 * @param {String} token 
 * @return {Promise} resolves to String
 */
function comment(content, token){
    return queries.comment(content, token)
}

module.exports = {
    search,
    loadComments,
    loadCommentsWithInfo,
    comment
}
const userController = require("../controller/userController");
const commentController = require("../controller/commentController");

const root = {
    createUser: async ({ credentials }) => {
        return await userController.createUser(credentials.username, credentials.password)
    },
    validateUser: async ({credentials}) => {
        return await userController.validateUser(credentials.username, credentials.password)
    },
    createComment: async ({ input }) => {
        return await commentController.comment(input.token, input.content);
    },
    getComments: async () => {
        return await commentController.loadComments();
    },
    search: async ({ userId }) => {
        return await commentController.search(userId)
    }
}

module.exports = root;

const userController = require("../controller/userController");
const commentController = require("../controller/commentController");

const root = {
    createUser: async ({ input }) => {
        return await userController.createUser(input.username, input.password)
    },
    validateUser: async ({ input }) => {
        return await userController.validateUser(input.username, input.password)
    },
    createComment: async ({ input }) => {
        return await commentController.comment(input.token, input.content);
    },
    getComments: async () => {
        return await commentController.loadComments();
    },
    getCommentsWithInfo: async () => {
        return await commentController.loadCommentsWithInfo();
    },
    search: async ({ input }) => {
        return await commentController.search(input)
    }
}

module.exports = root;

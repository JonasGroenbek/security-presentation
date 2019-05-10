const buildSchema = require("graphql").buildSchema;

const schema = buildSchema(
    `
    type Query {
        validateUser(input: Credentials!) : String
        getComments : Comments
        search(input: Int): Comments
    }

    type Mutation {
        createUser(input: Credentials!) : String
        createComment(input: tokenAndContent!) : String
    }

    input Credentials {
        username: String!
        password: String!
    }

    input tokenAndContent {
        token: String!
        content: String!
    }

    type Comments {
        comments: [Comment]
    }

    type Comment {
        id: Int
        content: String
        userId: Int
    }
    `
)

module.exports = schema;
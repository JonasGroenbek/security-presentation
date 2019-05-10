const app = require("express")();
const bodyParser = require('body-parser');
const userController = require("./controller/userController");
const root = require("./graphQL/resolvers");
const graphqlHTTP = require("express-graphql");
const schema = require("./graphQL/schema");

app.use(bodyParser.json({
    extended: true
}));

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

module.exports = app;


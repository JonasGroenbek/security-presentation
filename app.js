const express = require("express")
const app = express();
const bodyParser = require('body-parser');
const userController = require("./controller/userController");
const root = require("./graphQL/resolvers");
const graphqlHTTP = require("express-graphql");
const schema = require("./graphQL/schema");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json({
    extended: true
}));

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.engine('.ejs', require('ejs').__express);
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/views'))

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/feed", (req, res) => {
    res.render("feed.ejs");
})  
 
app.get("/searchUsers", (req, res) => {
    //do stuff
})

app.post("/login", (req, res) => {
    const {username, password} = req.body;
    res.status(200).send(req.body)
})

module.exports = app;


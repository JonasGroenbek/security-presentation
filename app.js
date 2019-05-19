const express = require("express")
const app = express();
const bodyParser = require('body-parser');
const userController = require("./controller/userController");
const root = require("./graphQL/resolvers");
const graphqlHTTP = require("express-graphql");
const schema = require("./graphQL/schema");
const fetch = require("node-fetch");
const PORT = require("./server").PORT;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({
    extended: true
}));

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: false
}))

app.engine('.ejs', require('ejs').__express);
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/views'))

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/search/:userId", (req,res) => {
})

/*
    fetch(`http://localhost:${1234}/graphql?query=query {
        search(userId:${req.params.userId}){
          comments{
            content
          }
        }
      }
      `, {
        headers: { 
            method: 'get',
            'Content-Type': 'application/json' }
      }).then(res => res.json())
      .then(json => res.status(200).send(json.data.search.comments))
*/

app.post("/login", (req, res) => {
    const {username, password} = req.body;
    fetch(`localhost:${PORT}/graphql?`)
    res.status(200).send(req.body)
})

module.exports = app;
const express = require("express")
const app = express();
const bodyParser = require('body-parser');
const userController = require("./controller/userController");
const commentController = require("./controller/commentController");
const cookieParser = require("cookie-parser");
const jwt = require("./model/jwt/jwt");

app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({
    extended: true
}));

app.engine('.ejs', require('ejs').__express);
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/views'))

app.get("/", (req, res) => {
    if (req.cookies.token) {
        res.render("feed.ejs");
    } else {
        res.render("index.ejs", {
            msg: ""
        });
    }
})

app.get("/logout", (req, res) => {
    res.clearCookie('token', { domain: "localhost", path: "/" });
    res.render("index.ejs", {
        msg: ""
    });
})

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "" || password === "") {
        res.render("index.ejs", {
            msg: "please provide both a username, and a password"
        });
    } else {
        userController.validateUser(username, password)
            .then(token => {
                res.setHeader("Set-Cookie", `token=${token}`)
                res.render("feed.ejs")
            }, rejection => {
                res.render("index.ejs", {
                    msg: rejection
                });
            })
    }
})

app.post("/createUser", (req, res) => {
    const { username, password, secret } = req.body;
    userController.createUser(username, password, secret).then(token => {
        res.setHeader("Set-Cookie", `token=${token}`)
        res.render("feed.ejs")
    }).catch(rejection => {
        res.render("index.ejs", {
            msg: rejection
        });
    })

})

app.post("/comment", (req, res) => {
    if (!req.cookies.token) {
        res.render("index.ejs", {
            msg: "could not verify you"
        });
    }
    const { username } = jwt.verifyToken(req.cookies.token);
    for (let index = 0; index < 5; index++) {
        const {content} = req.body;
        console.log(content)
    }
    const { content } = req.body;
    commentController.comment(content, username);
    res.render("feed.ejs");



})

app.post("/searchUsers", (req, res) => {
    if (!req.cookies.token) {
        res.render("index.ejs", {
            msg: "could not verify you"
        });
    }

})

app.get("/search", (req, res) => {

})

commentController.loadComments().then(res => {
    console.log(res)
}).catch(rejection => {
    console.log(rejection)
})

module.exports = app;
# security-presentation

A backend for a school project, where security vulnerabilities should be featured for fellow students to exploit in class.


##### edit config file for db




    const mysql = require('mysql');

    const db = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'password',
      database : 'test_db'
    });

    module.exports = db;

on deployment change graphiql property to false

[App.js](#App.js)

    app.use("/graphql", graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true //this guy
    }))
'

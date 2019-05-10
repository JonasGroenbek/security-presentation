const app = require('./app');
const http = require('http');
const db = require("./config/db");
const PORT = 1234;

const server = http.createServer(app);

function connect(port) {
    port ? server.listen(port, () => {
        server.listen(port);
    }) : server.listen(PORT);
}

function disconnect() {
    server.close();
}

function onListening() {
    console.log("listening on " + JSON.stringify(server.address()))
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    switch (error.code) {
        case 'EACCES':
            db.destroy();
            console.error('server requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            db.destroy();
            console.error(JSON.stringify(server.address()) + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

server.on('error', onError);
server.on('listening', onListening);

connect();

module.exports = { server, connect, disconnect }
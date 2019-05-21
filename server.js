const app = require('./app');
const http = require('http');
const PORT = 1234;

const server = http.createServer(app);

server.listen(PORT);
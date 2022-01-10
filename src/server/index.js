const http = require('http');
const { Server } = require('socket.io');
const events = require('./events');
const server = require('./server');
const SocketServer = require('./socketServer');

const httpServer = http.createServer(server);

const io = new Server(httpServer);

const port = server.get('port');

events.init(
    httpServer.listen(port),
);

SocketServer.init(io);

module.exports = {
    io,
};

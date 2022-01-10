const router = require('../components/Chat/socket.router');

function init(io) {
    io.on('connection', (socket) => {
        router(socket);
    });
}

module.exports = {
    init,
};

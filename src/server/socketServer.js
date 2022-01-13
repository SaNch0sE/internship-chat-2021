const { router } = require('../components/Chat/socket.router');

function init(io) {
    io.on('connection', (socket) => {
        router(io, socket);
    });
}

module.exports = {
    init,
};

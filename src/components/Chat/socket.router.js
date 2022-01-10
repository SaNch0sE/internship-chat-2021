const chat = require('.');

module.exports = (socket) => {
    socket.on('user connected', chat.connected);
    socket.on('user message', chat.message);
    socket.on('user typing', chat.isTyping);
};

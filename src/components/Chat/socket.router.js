const chat = require('.');

module.exports = (socket) => {
    console.log(socket.id);
    socket.on('user message', chat.message);
    socket.on('user typing', chat.isTyping);
};

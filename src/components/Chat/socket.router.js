const chat = require('.');

module.exports = {
    router: (io, socket) => {
        socket.on('user connected', chat.connected.bind({ socket, io }));
        socket.on('get userList', chat.getUsers.bind({ socket, io }));
        socket.on('user selected', chat.getAllMessages.bind({ socket, io }));

        socket.on('user message', chat.sendMessage.bind({ socket, io }));
        socket.on('user typing', chat.isTyping.bind({ socket, io }));

        socket.on('get messages', chat.getNewMessages.bind({ socket, io }));

        socket.on('disconnect', chat.disconnected.bind({ socket, io }));
    },
};

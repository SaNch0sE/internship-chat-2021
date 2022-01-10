const { io } = require('../../server');
const UserService = require('../User/service');
const { checkToken } = require('../shared/authMiddleware');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < any >}
 */
async function mainChat(req, res) {
    return res.render('chat');
}

/**
 * @function
 * @param { accessToken, socketId } credentials
 * @returns {}
 */
async function connected(credentials) {
    const { id } = checkToken(credentials.accessToken);
    await UserService.updateById(id, {
        socketId: credentials.socketId,
    });
}

function message(msg) {
    io.emit('user message', msg);
}

function isTyping(msg) {
    io.emit('user typing', msg);
}

module.exports = {
    connected,
    mainChat,
    message,
    isTyping,
};

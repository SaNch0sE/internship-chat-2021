const UserService = require('../User/service');
const { checkToken } = require('../shared/authMiddleware');
const MsgValidation = require('./validation');
const MessageService = require('./service');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < any >}
 */
async function signUp(req, res) {
    return res.render('signUp');
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < any >}
 */
async function signIn(req, res) {
    return res.render('login', {
        user: {
            email: req.query.email || '',
        },
    });
}

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
 * @param { accessToken, socketId, userId } credentials
 * @returns {}
 */
async function connected(credentials) {
    const { id } = checkToken(credentials.accessToken);
    await UserService.updateById(id, {
        socketId: this.socket.id,
        online: true,
    });
    this.socket.join(credentials.userId);
}

/**
 * @function
 * @returns {}
 */
async function disconnected() {
    await UserService.updateOnline(this.socket.id, false);
}

/**
 * @function
 * @returns {}
 */
async function getUsers() {
    const users = await UserService.getActiveUsers();
    this.io.to(this.socket.id).emit('send userList', users);
}

/**
 * @function
 * @param data.from
 * @param data.to
 * @returns {}
 */
async function getAllMessages(data) {
    const { value, error } = MsgValidation.getAllMessages(data);
    if (error) {
        throw error;
    }

    const messages = await MessageService.getAllMessages({
        from: value.from,
        to: value.to,
    });
    this.io.to(this.socket.id).emit('user selected', messages);
}

/**
 * @function
 * @param msg.lastId
 * @returns {}
 */
async function getNewMessages(msg) {
    const messages = await MessageService.getNewMessages(msg.lastId);
    this.io.to(this.socket.id).emit('user list', messages);
}

async function sendMessage(msg) {
    const { value, error } = MsgValidation.message(msg);
    if (error) {
        throw error;
    }

    await MessageService.create(value);

    this.io.to(value.to).emit('user message', value);
}

async function isTyping(msg) {
    this.io.to(msg.to).emit('user typing', { friendId: msg.from });
}

module.exports = {
    signUp,
    signIn,
    connected,
    disconnected,
    mainChat,
    sendMessage,
    isTyping,
    getUsers,
    getAllMessages,
    getNewMessages,
};

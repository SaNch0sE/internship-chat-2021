const { io } = require('../../server');

/**
 * @function
 * @name resetPasswordPage
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < any >}
 */
async function loadTemplate(req, res) {
    return res.render(req.params.templateName);
}

/**
 * @function
 * @name resetPasswordPage
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < any >}
 */
async function mainChat(req, res) {
    return res.render('chat');
}

function message(msg) {
    io.emit('user message', msg);
}

function isTyping(msg) {
    io.emit('user typing', msg);
}

module.exports = {
    mainChat,
    message,
    isTyping,
    loadTemplate,
};

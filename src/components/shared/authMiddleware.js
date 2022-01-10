const jwt = require('jsonwebtoken');
const AuthError = require('../../error/AuthError');

/**
 * @param {String} profile.token
 * @returns {payload}
 */
function checkToken(token) {
    try {
        return jwt.verify(token, process.env.SECRET);
    } catch (error) {
        throw new AuthError(error.message);
    }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {void}
 */
const authMiddleware = (req, res, next) => {
    req.user = checkToken(req.cookies.accessToken);
    next();
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {void}
 */
const graphicAuthMiddleware = (req, res, next) => {
    try {
        req.user = checkToken(req.cookies.accessToken);
        next();
    } catch (error) {
        
    }
};

module.exports = {
    authMiddleware,
    checkToken,
    graphicAuthMiddleware,
};

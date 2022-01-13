const { Router } = require('express');
const ChatComponent = require('.');
const { errorHandler } = require('../../error/errorsMiddleware');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route for rendering sign-up page.
 * @name /v1/chat
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/sign-up', errorHandler(ChatComponent.signUp));

/**
 * Route for rendering sign-up page.
 * @name /v1/chat
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/login', errorHandler(ChatComponent.signIn));

/**
 * Route for rendering main chat page.
 * @name /v1/chat
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', errorHandler(ChatComponent.mainChat));

module.exports = router;

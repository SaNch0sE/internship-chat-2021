const { Router } = require('express');
const ChatComponent = require('.');
const { errorHandler } = require('../../error/errorsMiddleware');
// const auth = require('../shared/authMiddleware');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route for rendering main chat page.
 * @name /v1/chat
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', errorHandler(ChatComponent.mainChat));

/**
 * Route for rendering main chat page.
 * @name /v1/chat/:templateName
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:templateName', errorHandler(ChatComponent.loadTemplate));

module.exports = router;

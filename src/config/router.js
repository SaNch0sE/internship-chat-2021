const express = require('express');
const UserRouter = require('../components/User/router');
const AuthRouter = require('../components/Auth/router');
const ChatRouter = require('../components/Chat/router');

module.exports = {
    /**
     * @function
     * @param {express.Application} app
     * @summary init Application router
     * @returns void
     */
    init(app) {
        const router = express.Router();

        /**
         * Forwards any requests to the /v1/users URI to UserRouter.
         * @name /v1/users
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/v1/users', UserRouter);

        /**
         * Forwards any requests to the /v1/auth URI to AuthRouter.
         * @name /v1/auth
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/v1/auth', AuthRouter);

        /**
         * Forwards any requests to the /v1/users URI to UserRouter.
         * @name /v1/chat
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/v1/chat', ChatRouter);

        /**
         * @description No results returned mean the object is not found
         * @function
         * @inner
         * @param {callback} middleware - Express middleware.
         */
        app.use((req, res) => {
            if (req.path.includes('/v1/chat')) {
                return res.status(404).render('404');
            }

            return res.status(404).json({
                error: 'Not Found',
            });
        });

        /**
         * @function
         * @inner
         * @param {express.Router}
         */
        app.use(router);
    },
};

const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

module.exports = {
    /**
   * @function
   * @description express middleware
   * @param {express.Application} app
   * @returns void
   */
    init(app) {
        app.use('/assets', express.static(path.join(__dirname, '../assets')));
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, '../views'));
        app.use(express.urlencoded({
            extended: false,
        }));
        app.use(express.json());
        // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
        app.use(cookieParser());
        // returns the compression middleware
        app.use(compression());
        // helps you secure your Express apps by setting various HTTP headers
        app.use(
            helmet.contentSecurityPolicy({
                useDefaults: false,
                'block-all-mixed-content': true,
                'upgrade-insecure-requests': true,
                directives: {
                    'default-src': [
                        "'self'",
                        'https://cors-anywhere.herokuapp.com',
                    ],
                    'base-uri': "'self'",
                    'font-src': [
                        "'self'",
                        'https:',
                        'data:',
                    ],
                    'frame-ancestors': [
                        "'self'",
                    ],
                    'img-src': [
                        "'self'",
                        'https://s3-us-west-2.amazonaws.com',
                        'data:',
                    ],
                    'object-src': [
                        "'none'",
                    ],
                    'script-src': [
                        "'self'",
                    ],
                    // 'script-src-attr': "'none'",
                    'style-src': [
                        "'self'",
                        'https://fonts.googleapis.com',
                    ],
                },
            }),
            helmet.dnsPrefetchControl({
                allow: true,
            }),
            helmet.frameguard({
                action: 'deny',
            }),
            helmet.hidePoweredBy(),
            helmet.hsts({
                maxAge: 123456,
                includeSubDomains: false,
            }),
            helmet.ieNoOpen(),
            helmet.noSniff(),
            helmet.referrerPolicy({
                policy: ['origin', 'unsafe-url'],
            }),
            helmet.xssFilter(),
        );
        /* providing a Connect/Express middleware that can
        be used to enable CORS */
        app.use(cors({
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept',
                'Authorization', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin'],
            credentials: true,
        }));
    },
};

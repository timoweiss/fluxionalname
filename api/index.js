'use strict';
require('@risingstack/trace');

const Glue = require('glue');
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const customerRoutes = require('./routes/customerRoutes');

const unwrap = require('./lib/responseCodes').unwrap;

const hoek = require('hoek');

const manifest = {
    connections: [{
        port: process.env['API_PORT'] || 8000
    }],
    registrations: [{
        plugin: {
            register: 'chairo',
            options: {
                log: 'info',
                strict: {result: false}
            }
        }
    }, {
        plugin: {
            register: 'inert',
            options: {}
        }
    }, {
        plugin: {
            register: 'vision',
            options: {}
        }
    }, {
        plugin: {
            register: 'hapi-swagger',
            options: {}
        }


    }, {
        plugin: {
            register: 'hapi-auth-cookie',
            options: {}
        }
    }]
};


Glue.compose(manifest, {relativeTo: __dirname}, (err, server) => {

    if (err) {
        console.log('er', err);
        throw err;
    }


    server.on('route', (route, connection, server) => {

        console.log('New route added: ' + route.path);
    });

    server.on('log', (event, tags) => {
        console.log(event, tags);
    });

    // configure auth strategy
    server.auth.strategy('session', 'cookie', true, {
        password: process.env['COOKIE_SECRET'] || 'secretzweiunddreisigzeichenmindestens',
        ttl: 24 * 60 * 60 * 1000 * 365,   // 1 year
        keepAlive: true,
        cookie: 'invoicesession',
        isSecure: false, //TODO
        clearInvalid: true,
        isHttpOnly: true
    });


    server.ext('onPostAuth', (request, reply) => {
        let requestAuth = request.auth;
        request.requesting_user_id = {};
        request.company_id = requestAuth.credentials ? requestAuth.credentials.company_id : '';
        request.requesting_user_id.ruid = requestAuth.credentials && requestAuth.credentials.user.id ? requestAuth.credentials.user.id : 'unknown';
        setTimeout(function () {
            reply.continue();
        }, 1000);

    });

    server.decorate('request', 'applyToDefaults', hoek.applyToDefaults);
    
    server.decorate('request', 'unwrap', unwrap);

    server.seneca.use('../all', {auto: true});
    server.route(userRoutes.routes);
    server.route(companyRoutes.routes);
    server.route(customerRoutes.routes);


    server.start(err => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});
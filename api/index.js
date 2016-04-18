'use strict';
require('@risingstack/trace');

const Glue = require('glue');
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');

const manifest = {
    connections: [{
        port: process.env['API_PORT'] || 8000
    }],
    registrations: [{
        plugin: {
            register: 'chairo',
            options: {
                log: 'info'
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


    }]
};


Glue.compose(manifest, {relativeTo: __dirname}, (err, server) => {

    if (err) {
        console.log('er', err);
        throw err;
    }
    server.seneca.use('mesh', {auto: true});
    server.route(userRoutes.routes);
    server.route(companyRoutes.routes);

    server.start(err => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});
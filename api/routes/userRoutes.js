'use strict';

const handler = require('../lib/user');

module.exports.routes = [{
    method: 'GET',
    path: '/users',
    config: {
        handler: handler.handler
    }
}, {
    method: 'POST',
    path: '/users',
    config: {
        handler: handler.registerUser
    }
}];
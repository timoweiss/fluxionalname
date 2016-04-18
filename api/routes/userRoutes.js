'use strict';

const handler = require('../lib/user');
const validation = require('../validation/userValidation');

module.exports.routes = [{
    method: 'GET',
    path: '/users',
    config: {
        description: 'deprecated',
        tags: ['api', 'user'],
        handler: handler.handler
    }
}, {
    method: 'POST',
    path: '/users',
    config: {
        description: 'register new user',
        tags: ['api', 'user'],
        handler: handler.registerUser,
        validate: {
            payload: validation.register
        }
    }
}];
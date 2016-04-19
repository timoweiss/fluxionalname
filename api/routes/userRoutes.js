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
        },
        auth: false
    }
}, {
    method: 'GET',
    path: '/users/{id}',
    config: {
        description: 'get user by id',
        tags: ['api', 'user'],
        handler: handler.getUserById,
        validate: {
            params: validation.id
        }
    }
}, {
    method: 'POST',
    path: '/users/login',
    config: {
        description: 'login with user-account',
        tags: ['api', 'user', 'login'],
        handler: handler.login,
        validate: {
            payload: validation.login
        },
        auth: false
    }
}];
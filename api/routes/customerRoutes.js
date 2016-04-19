'use strict';

const handler = require('../lib/customer');
const validation = require('../validation/customerValidation');


module.exports.routes = [{
    method: 'GET',
    path: '/customer',
    config: {
        description: 'get customer list',
        tags: ['api', 'user'],
        handler: handler.getCustomer
    }
}, {
    method: 'POST',
    path: '/customer',
    config: {
        description: 'create new customer',
        tags: ['api', 'customer'],
        handler: handler.createCustomer,
        validate: {
            payload: validation.create
        }
    }
}];
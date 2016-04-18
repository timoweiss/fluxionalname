'use strict';

const handler = require('../lib/company');

const validation = require('../validation/companyValidation');

module.exports.routes = [{
    method: 'POST',
    path: '/companies',
    config: {
        description: 'register new user',
        tags: ['api', 'user'],
        handler: handler.createCompany,
        validate: {
            payload: validation.create
        }
    }
}];
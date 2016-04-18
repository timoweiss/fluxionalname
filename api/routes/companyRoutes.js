'use strict';

const handler = require('../lib/company');

const validation = require('../validation/companyValidation');

module.exports.routes = [{
    method: 'POST',
    path: '/companies',
    config: {
        description: 'add new company',
        tags: ['api', 'company'],
        handler: handler.createCompany,
        validate: {
            payload: validation.create
        }
    }
}];
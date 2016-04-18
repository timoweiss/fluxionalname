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
}, {
    method: 'GET',
    path: '/companies/{id}',
    config: {
        description: 'get company by id',
        tags: ['api', 'company'],
        handler: handler.getCompanyById,
        validate: {
            params: validation.idRequired
        }
    }
}];
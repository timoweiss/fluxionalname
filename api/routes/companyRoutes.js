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
    path: '/companies',
    config: {
        description: 'get companies',
        tags: ['api', 'company'],
        handler: handler.getCompaniesByRuid
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
}, {
    method: 'GET',
    path: '/companies/select/{id}',
    config: {
        description: 'select company id for current session',
        tags: ['api', 'company'],
        handler: handler.selectCompany,
        validate: {
            params: validation.idRequired
        }
    }
}];
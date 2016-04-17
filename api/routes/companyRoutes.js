'use strict';

const handler = require('../lib/company');

module.exports.routes = [{
    method: 'POST',
    path: '/companies',
    config: {
        handler: handler.createCompany
    }
}];
'use strict';

const database = require('./database');

module.exports = {
    createCustomer,
    getCustomerByCompanyId
};


function createCustomer(args, callback) {
    database.createCustomer(args)
        .then(customer => callback(null, customer))
        .catch(callback);
}

function getCustomerByCompanyId(args, callback) {
    database.getCustomerByCompanyId(args.company_id)
        .then(customer => callback(null, customer))
        .catch(callback);
}
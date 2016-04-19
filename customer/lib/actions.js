'use strict';

const database = require('./database');

module.exports = {
    createCustomer
};


function createCustomer(args, callback) {
    database.createCustomer(args)
        .then(customer => callback(null, customer))
        .catch(callback);
}
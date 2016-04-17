'use strict';

const database = require('./database');

module.exports = {
    createCompany
};


function createCompany(args, callback) {
    database.createCompany(args)
        .then(company => callback(null, company))
        .catch(callback);
}
'use strict';

const database = require('./database');

module.exports = {
    createCompany,
    getCompanyById
};


function createCompany(args, callback) {
    database.createCompany(args)
        .then(company => callback(null, company))
        .catch(callback);
}

function getCompanyById(args, callback) {
    console.log(args)
    database.getById(args.id)
        .then(company => callback(null, company))
        .catch(callback);
}
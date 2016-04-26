'use strict';

const database = require('./database');

module.exports = {
    createCompany,
    getCompanyById,
    getCompanyByUserId,
    getCompanyMembers
};


function createCompany(args, callback) {

    const company = this.util.deepextend({executives: [args.ruid], employees: [], readonly: []}, args);
    company.created_by = company.ruid;
    database.createCompany(company)
        .then(company => callback(null, {data: company}))
        .catch(callback);
}

function getCompanyById(args, callback) {
    database.getById(args.id, args.ruid)
        .then(company => callback(null, {data: company}))
        .catch(err => {
            console.error(err);
            callback(err);
        });
}

function getCompanyByUserId(args, callback) {

    database.getCompaniesByUser(args.ruid)
        .then(companies => callback(null, {data: companies}))
        .catch(callback);
}

function getCompanyMembers(args, callback) {
    database.getById(args.company_id, args.ruid)
        .then(company => {
            return {
                executives: company.executives,
                employees: company.employees,
                readonly: company.readonly
            };
        })
        .then(members => callback(null, members))
        .catch(callback);
}
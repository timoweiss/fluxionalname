'use strict';

const database = require('./database');

module.exports = {
    createCompany,
    getCompanyById
};


function createCompany(args, callback) {

    const company = this.util.deepextend({executives:[args.ruid],employees:[], readonly:[]}, args);
    company.created_by = company.ruid;
    database.createCompany(company)
        .then(company => callback(null, company))
        .catch(callback);
}

function getCompanyById(args, callback) {
    const seneca = this;
    database.getById(args.id)
        .then(company => {
            return new Promise(resolve => {
                seneca.act('role:user,cmd:get,by:id,id:' + company.created_by, (err, data) => {
                    if (!err) {
                        company.created_by = data;
                    }
                    resolve(company);
                });
            });

        })
        .then(company => callback(null, company))
        .catch(callback);
}
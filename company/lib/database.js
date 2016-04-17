'use strict';

const thinky = require('thinky')();
const type = thinky.type;

module.exports = {
    createCompany
};

const Company = thinky.createModel('Company', {
    id: type.string(),
    name: type.string().min(2),
    mail: type.string().email(),
    image_id: type.string(),
    created_by: type.string(),
    address: {
        street: type.string(),
        number: type.number(),
        plz: type.number(),
        city: type.string()
    }
}, {enforce_extra:'remove'});


function createCompany(companyData) {
    const company = new Company(companyData);
    return company.save();
}
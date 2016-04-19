'use strict';

const thinky = require('thinky')();
const type = thinky.type;
const r = thinky.r;

module.exports = {
    createCompany,
    getById
};

const Company = thinky.createModel('Company', {
    id: type.string(),
    name: type.string().min(2),
    mail: type.string().email(),
    image_id: type.string(),
    created_by: type.string(),
    created_at: type.date().default(r.now()),
    executives: type.array(),
    employees: type.array(),
    readonly: type.array(),
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

function getById(id) {
    return Company.get(id).run();
}
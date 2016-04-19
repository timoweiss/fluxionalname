'use strict';

const thinky = require('thinky')();
const type = thinky.type;
const r = thinky.r;

module.exports = {
    createCompany,
    getById,
    getByUserId
};

const Company = thinky.createModel('Company', {
    id: type.string(),
    name: type.string().min(2),
    mail: type.string().email(),
    url: type.string(),
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

function getById(id, user_id) {
    console.log('getById', id, user_id);
    return Company.filter({id:id}).filter(company => {
        return company('executives').contains(user_id) || company('employees').contains(user_id) || company('readonly').contains(user_id);
    }).run();
}

function getByUserId(user_id) {
    return Company.filter(company => {
        return company('executives').contains(user_id) || company('employees').contains(user_id) || company('readonly').contains(user_id);
    });
}
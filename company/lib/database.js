'use strict';

const thinky = require('thinky')();
const type = thinky.type;
const r = thinky.r;

const COMPANY_COLORS = ['#2ecc71', '#3498db', '#9b59b6', '#34495e', '#e67e22', '#f1c40f', '#e74c3c', '#1abc9c', '#7f8c8d', '#f39c12', '#c0392b'];

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
    color: type.string(),
    address: {
        street: type.string(),
        number: type.number(),
        plz: type.number(),
        city: type.string()
    }
}, {enforce_extra: 'remove'});


function createCompany(companyData) {
    return Company
        .filter(company => filterByRights(company, companyData.ruid))
        .then(count => {
            companyData.color = COMPANY_COLORS[count.length % COMPANY_COLORS.length];
            const company = new Company(companyData);
            return company.save();
        }).catch(console.error);

}

function getById(id, user_id) {
    console.log('getById', id, user_id);
    return Company.filter({id: id}).filter(company => filterByRights(company, user_id)).run();
}

function getByUserId(user_id) {
    return Company.filter(company => filterByRights(company, user_id));
}

function filterByRights(company, user_id) {
    return company('executives').contains(user_id) || company('employees').contains(user_id) || company('readonly').contains(user_id);
}
'use strict';

const thinky = require('thinky')();
const type = thinky.type;
const r = thinky.r;

module.exports = {
    createCustomer
};

const Customer = thinky.createModel('Customer', {
    id: type.string(),
    name: type.string().min(2),
    mail: type.string().email(),
    url: type.string(),
    image_id: type.string(),
    created_by: type.string(),
    created_at: type.date().default(r.now()),
    address: {
        street: type.string(),
        number: type.number(),
        plz: type.number(),
        city: type.string()
    }
}, {enforce_extra: 'remove'});


function createCustomer(customerData) {
    const customer = new Customer(customerData);
    return customer.save();
}
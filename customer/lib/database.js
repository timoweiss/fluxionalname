'use strict';

const mongodb = require('mongodb');
const mongo = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

const joi = require('joi');
const mongoUrl = `mongodb://${process.env['DB_HOST'] || 'localhost'}:${process.env['DB_PORT'] || 27017}/${process.env['DB_NAME'] || 'test'}`;
const COLLECTION_CUSTOMER = 'customer';

const CUSTOMER_COLORS = ['#2ecc71', '#3498db', '#9b59b6', '#34495e', '#e67e22', '#f1c40f', '#e74c3c', '#1abc9c', '#7f8c8d', '#f39c12', '#c0392b'];


module.exports = {
    createCustomer,
    getCustomerByCompanyId,
    connect
};

let db = {};

const CustomerModel = joi.object().keys({
    id: joi.string(),
    name: joi.string().min(2).required(),
    mail: joi.string().email(),
    url: joi.string(),
    image_id: joi.string(),
    created_by: joi.string(),
    company_id: joi.string(),
    color: joi.string(),
    // created_at: joi.date().default(r.now()),
    address: {
        street: joi.string(),
        number: joi.number(),
        plz: joi.number(),
        city: joi.string()
    }
});

function createCustomer(customerData) {
    console.log('customerData', customerData);
    const ruid = customerData.ruid;

    const validated = joi.validate(customerData, CustomerModel, {stripUnknown: true});

    if (validated.error) {
        return Promise.reject({err: validated.error});
    }

    const customer = validated.value;

    return getCustomerColor(customer.company_id)
        .then(color => {
            customer.color = color;
            return customer;
        })
        .then(cus => db.collection(COLLECTION_CUSTOMER).insertOne(cus))
        .then(() => customer);
}

function getCustomerByCompanyId(companyId) {
    return db.collection(COLLECTION_CUSTOMER).find({company_id: companyId}).toArray();
}


function getCustomerColor(companyId) {
    return db.collection(COLLECTION_CUSTOMER)
        .count({company_id: companyId})
        .then(count => {
            return CUSTOMER_COLORS[count % CUSTOMER_COLORS.length];
        });
}


function connect() {
    return mongo.connect(mongoUrl).then(_db => {
        console.log('connected', mongoUrl);
        db = _db;
        return db;
    }).catch(err => console.error(err));
}

function unwrapFirstElem(arr) {
    return arr[0];
}
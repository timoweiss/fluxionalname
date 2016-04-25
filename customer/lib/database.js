'use strict';

const thinky = require('thinky')();
const type = thinky.type;
const r = thinky.r;

const mongodb = require('mongodb');
const mongo = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

const joi = require('joi');
const mongoUrl = `mongodb://${process.env['DB_HOST'] || 'localhost'}:${process.env['DB_PORT'] || 27017}/${process.env['DB_NAME'] || 'test'}`;
const COLLECTION_CUSTOMER = 'customer';

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
    const ruid = companyData.ruid;

    const validated = joi.validate(customerData, CustomerModel, {stripUnknown: true});

    if (validated.err) {
        return Promise.reject({err: validated.err});
    }

    const customer = validated.value;

    return db.collection(COLLECTION_CUSTOMER).insertOne(customer);
}

function getCustomerByCompanyId(companyId) {
    return db.collection(COLLECTION_CUSTOMER).find({company_id: companyId});
}


function connect() {
    return mongo.connect(mongoUrl).then(_db => {
        console.log('connected', mongoUrl);
        db = _db;
        return db;
    }).catch(err => console.error(err));
}

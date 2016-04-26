'use strict';

const mongodb = require('mongodb');
const mongo = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

const joi = require('joi');
const mongoUrl = `mongodb://${process.env['DB_HOST'] || 'localhost'}:${process.env['DB_PORT'] || 27017}/${process.env['DB_NAME'] || 'test'}`;
const COLLECTION_COMPANY = 'companies';

let db = {};

const COMPANY_COLORS = ['#2ecc71', '#3498db', '#9b59b6', '#34495e', '#e67e22', '#f1c40f', '#e74c3c', '#1abc9c', '#7f8c8d', '#f39c12', '#c0392b'];

module.exports = {
    createCompany,
    getById,
    getCompaniesByUser,
    connect
};

const CompanyModel = joi.object().keys({
    name: joi.string().required(),
    mail: joi.string().email(),
    url: joi.string(),
    image_id: joi.string(),
    created_by: joi.string(),
    // created_at: joi.date().default(r.now()),
    executives: joi.array(),
    employees: joi.array(),
    readonly: joi.array(),
    color: joi.string(),
    address: joi.object().keys({
        street: joi.string(),
        number: joi.number(),
        plz: joi.number(),
        city: joi.string()
    })
});


function createCompany(companyData) {

    const ruid = companyData.ruid;
    console.log(ruid)

    const validated = joi.validate(companyData, CompanyModel, {stripUnknown: true});
    console.log('asdlkjalskd')
    if (validated.error) {
        return Promise.reject({err: validated.error});
    }

    const validatedData = validated.value;
    const collection = db.collection(COLLECTION_COMPANY);

    return generateCompanyColor(ruid)
        .then(color => {
            validatedData.color = color;
            return validatedData;
        })
        .then(cd => collection.insertOne(validatedData))
        .then(result => {
            // TODO err handling
            console.log('asd');
            return validatedData;
        });

}

function getById(id, user_id) {
    return db.collection(COLLECTION_COMPANY)
        .find({_id: new ObjectId(id), $or: getUserIdQuery(user_id).$or})
        .toArray()
        .then(unwrapFirstElem);
}


function unwrapFirstElem(arr) {
    return arr[0];
}

function countCompaniesByUser(user_id) {
    const collection = db.collection(COLLECTION_COMPANY);
    return collection.count(getUserIdQuery(user_id));
}

function getCompaniesByUser(user_id) {
    const collection = db.collection(COLLECTION_COMPANY);
    return collection.find(getUserIdQuery(user_id)).toArray();
}

function getUserIdQuery(user_id) {
    return {
        $or: [
            {executives: user_id},
            {employees: user_id},
            {readonly: user_id}
        ]
    };
}

function generateCompanyColor(user_id) {
    return countCompaniesByUser(user_id)
        .then(count => {
            return COMPANY_COLORS[count % COMPANY_COLORS.length];
        });
}

function connect() {
    return mongo.connect(mongoUrl).then(_db => {
        console.log('connected', mongoUrl);
        db = _db;
        return db;
    }).catch(err => console.error(err));
}

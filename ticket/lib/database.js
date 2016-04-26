'use strict';

const mongodb = require('mongodb');
const mongo = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

const joi = require('joi');
const mongoUrl = `mongodb://${process.env['DB_HOST'] || 'localhost'}:${process.env['DB_PORT'] || 27017}/${process.env['DB_NAME'] || 'test'}`;
const COLLECTION_TICKETS = 'tickets';

let db = {};

module.exports = {
    connect,
    createTicket,
    getTicketById,
    getMultipleByKeyValue,
    getOneByKeyValue,
    updateStatus
};

const TicketModel = joi.object().keys({
    title: joi.string().min(2).required(),
    fulltext: joi.string(),
    created_by: joi.string().required(),
    company_id: joi.string().required(),
    customer_id: joi.string(),
    assignee: joi.string(),
    labels: joi.array().items(joi.string()),
    time_spent: joi.number(),
    status: joi.string().valid('open', 'closed')
});

function createTicket(args) {
    const validated = joi.validate(args, TicketModel, {stripUnknown: true});
    if (validated.error) {
        // TODO: discuss how to handle this kind of errors
        return Promise.reject(validated.error);
    }
    const ticket = validated.value;

    return db.collection(COLLECTION_TICKETS)
        .insertOne(ticket)
        .then(() => ticket);

}

function getTicketById(ticketId) {
    const oid = new ObjectId(ticketId);
    return db.collection(COLLECTION_TICKETS)
        .find({_id: oid})
        .limit(-1)
        .toArray()
        .then(unwrapFirstElem);
}

function getMultipleByKeyValue(key, value) {
    const query = {};
    query[key] = value;

    return db.collection(COLLECTION_TICKETS)
        .find(query)
        .toArray();
}

function getOneByKeyValue(key, value) {
    if(key === '_id'){
        value = new ObjectId(value);
    }
    return getMultipleByKeyValue(key, value)
        .then(unwrapFirstElem);
}

function updateStatus(ticketId, status) {
    return db.collection(COLLECTION_TICKETS)
        .findOneAndUpdate({_id: new ObjectId(ticketId)}, {$set: {status: status}}, {returnOriginal: false});
}

function connect() {
    return mongo.connect(mongoUrl).then(_db => {
        db = _db;
        return db;
    }).catch(err => console.error(err));
}

function unwrapFirstElem(arr) {
    return arr[0];
}
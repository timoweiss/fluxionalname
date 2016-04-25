'use strict';

const mongodb = require('mongodb');
const mongo = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

const joi = require('joi');
const mongoUrl = `mongodb://${process.env['DB_HOST'] || 'localhost'}:${process.env['DB_PORT'] || 27017}/${process.env['DB_NAME'] || 'test'}`;
const COLLECTION_TICKETS = 'tickets';

let db = {};

module.exports = {
    connect
};

function connect() {
    return mongo.connect(mongoUrl).then(_db => {
        db = _db;
        return db;
    }).catch(err => console.error(err));
}
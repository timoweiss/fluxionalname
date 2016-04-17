'use strict';

const database = require('./database');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

module.exports = {
    createUser,
    getAllUser
};


function createUser(args, callback) {
    
    bcrypt.hash(args.password, SALT_ROUNDS, (err, hash) => {
        if(err) {
            return callback(err);
        }
        args.password = hash;
        database.createUser(args)
            .then(data => callback(null, data))
            .catch(callback);
    });
}

function getAllUser(args, callback) {
    database.getAllUser(args)
        .then(data => callback(null, data))
        .catch(callback);
}
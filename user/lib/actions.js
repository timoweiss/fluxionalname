'use strict';

const database = require('./database');

module.exports = {
    createUser,
    getAllUser
};


function createUser(args, callback) {
    
    
    database.createUser(args)
        .then(data => callback(null, data))
        .catch(callback);
}

function getAllUser(args, callback) {
    database.getAllUser(args)
        .then(data => callback(null, data))
        .catch(callback);
}
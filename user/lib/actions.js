'use strict';

const database = require('./database');

module.exports = {
    createUser,
    serviceAction2
};


function createUser(args, callback) {
    
    
    database.createUser(args)
        .then(data => callback(null, data))
        .catch(callback);
}

function serviceAction2(args, callback) {
    callback(null, {data: 'data'});
}
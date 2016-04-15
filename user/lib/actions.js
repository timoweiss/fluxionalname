'use strict';

module.exports = {
    createUser,
    serviceAction2
};


function createUser(args, callback) {
    callback(null, {data: 'data'});
}

function serviceAction2(args, callback) {
    callback(null, {data: 'data'});
}
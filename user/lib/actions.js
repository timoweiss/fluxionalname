'use strict';

const database = require('./database');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

module.exports = {
    createUser,
    loginUser,
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

function loginUser(args, callback) {
    database.getUserByMail(args.mail).then(user => {
        if(!user) {
            return callback({msg: 'user not found'});
        }
        console.log('login with:', args.password, user);
        bcrypt.compare(args.password, user.password, (err, res) => {
            if(err) {
                return callback(err);
            }
            if (res) {
                return callback(null, user);
            }
            callback({msg: 'wrong password'});
        }); 
    }).catch(err => {
        console.error('login error:',err);
        callback(err);
    });
}

function getAllUser(args, callback) {
    database.getAllUser(args)
        .then(data => callback(null, data))
        .catch(callback);
}
'use strict';

const thinky = require('thinky')();
const type = thinky.type;

module.exports = {
    createUser,
    getUserByMail,
    getAllUser
};

const User = thinky.createModel('User', {
    id: type.string(),
    name: type.string().min(2),
    surname: type.string(),
    password: type.string(),
    mail: type.string().email(),
    image_id: type.string()
}, {enforce_extra:'remove'});


function createUser(userData) {
    const user = new User(userData);
    return user.save();
}

function getUserByMail(mail) {
    return User
        .filter({mail:mail})
        .run()
        .then(unwrapFirstElem);
}

function getAllUser(args) {
    return User.run();
}

function unwrapFirstElem(arr) {
    return arr[0];
}
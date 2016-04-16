'use strict';

const thinky = require('thinky')();
const type = thinky.type;

const User = thinky.createModel('User', {
    id: type.string(),
    name: type.string().min(2),
    surname: type.string(),
    mail: type.string().email()
}, {enforce_extra:'remove'});


const createUser = (userData) => {
    if(!userData) {
        throw new Error('spapspsps')
    }
    const user = new User(userData);
    return user.save();
}

module.exports = {
    createUser
}
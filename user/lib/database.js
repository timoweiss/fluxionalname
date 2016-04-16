'use strict';

const thinky = require('thinky')();
const type = thinky.type;

module.exports = {
    createUser,
    getAllUser
};

const User = thinky.createModel('User', {
    id: type.string(),
    name: type.string().min(2),
    surname: type.string(),
    mail: type.string().email()
}, {enforce_extra:'remove'});

    
    User.changes().then(function(feed) {
        feed.each(function(error, doc) {
            if (error) {
                console.log(error);
                process.exit(1);
            }

            if (doc.isSaved() === false) {
                console.log('The following document was deleted:');
                console.log(doc);
            } else if (doc.getOldValue() === null) {
                console.log('A new document was inserted:');
                console.log(doc);
            } else {
                console.log('A document was updated.');
                console.log('Old value:');
                console.log(doc.getOldValue());
                console.log('New value:');
                console.log(doc);
            }
        });
    });

function createUser(userData) {
    const user = new User(userData);
    return user.save();
}

function getAllUser(args) {
    return User.run();
}
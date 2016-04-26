'use strict';

const database = require('./database');

module.exports = {
    createTicket
};


function createTicket(args, callback) {
    const ticket = this.util.deepextend({created_by: args.ruid, status: 'open'}, args);
    database.createTicket(ticket)
        .then(ticket => callback(null, {data: ticket}))
        .catch(callback);
}
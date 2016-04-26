'use strict';

const database = require('./database');

module.exports = {
    createTicket,
    getTicketById
};


function createTicket(args, callback) {
    const ticket = this.util.deepextend({created_by: args.ruid, status: 'open'}, args);
    database.createTicket(ticket)
        .then(ticket => callback(null, {data: ticket}))
        .catch(callback);
}

function getTicketById(args, callback) {
    const ticketId = args.ticket_id;
    database.getTicketById(ticketId)
        .then(ticket => callback(null, {data: ticket}))
        .catch(callback);
}
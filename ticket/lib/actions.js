'use strict';

const database = require('./database');

module.exports = {
    createTicket,
    getTicketById,
    getTicketsByCompanyId,
    updateTicketStatus
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

function getTicketsByCompanyId(args, callback) {
    const companyId = args.company_id;
    database.getMultipleByKeyValue('company_id', companyId)
        .then(tickets => callback(null, {data: tickets}))
        .catch(callback);
}

function updateTicketStatus(args, callback) {
    const seneca = this;

    const ticketId = args.ticket_id;
    const ruid = args.ruid;
    const status = args.status;

    database.getTicketById(ticketId)
        .then(ticket => {
            if (!ticket) {
                return callback(null, {err: {msg: 'NOT_FOUND'}});
            }
            return isWriteOperationPermitted(ticket, ruid, seneca)
                .then(() => database.updateStatus(ticketId, status));
        })
        .then(res => callback(null, {data: res.value}))
        .catch(callback);
}


function isWriteOperationPermitted(ticket, ruid, seneca) {
    return new Promise((resolve, reject) => {

        // try to shorten 'rights checking'
        console.log(ticket.created_by, ticket, ruid)
        if (ruid === ticket.created_by || (ticket.assignee && ruid === ticket.assignee)) {
            resolve(true);
        }
        // go out and get the members of the company
        seneca.act('role:company,cmd:get,by:company_id,entity:member', {
            company_id: ticket.company_id,
            ruid: ruid
        }, function (err, result) {

            const memberlists = result.data;

            if (err) {
                // TODO logging
                console.err('err while trying to get members of company');
                // TODO can we recover from this?
                return reject(err);
            }
            if (memberlists.executives.includes(ruid) || memberlists.employees.includes(ruid)) {
                resolve(true);
            }
        });
    });
}
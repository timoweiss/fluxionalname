'use strict';

const actions = require('./lib/actions');
const database = require('./lib/database');

const defaults = {
    name: 'ticket'
};

module.exports = function (options) {

    const seneca = this;
    const extend = seneca.util.deepextend;

    const opts = extend(defaults, options);

    seneca.add({init: opts.name}, function (args, ready) {
        console.log('init', opts.name);
        // do some init work
        database.connect().then(() => ready());
    });

    seneca.add('role:seneca,cmd:close', function (close_msg, done) {
        // do some cleanup or something
        console.log('bye bye from ticket');
        this.prior(close_msg, done);
    });

    seneca.ready(function (err) {
        console.log(err || 'plugin ready:', opts.name);
        // seneca.act({
        //     role: 'ticket',
        //     cmd: 'create',
        //     ruid: 'timo',
        //     title: 'testticket',
        //     fulltext: 'large text',
        //     company_id: '123',
        //     customer_id: '321',
        //     labels: ['lalala']
        // }, console.log)
        // this.act({ticket_id: '571f5cea7e2a114d66e75b7e', role:'ticket', cmd: 'update',what:'status', ruid:'571f5cea7e2a114d66e75b7e', status: 'open'}, function() {
        //     console.log('looks good?', arguments);
        // });

    });

    seneca.add({role: 'ticket', cmd: 'create'}, actions.createTicket);
    seneca.add({role: 'ticket', cmd: 'get', by: 'id'}, actions.getTicketById);
    seneca.add({role: 'ticket', cmd: 'get', by: 'company_id'}, actions.getTicketsByCompanyId);
    seneca.add({role: 'ticket', cmd: 'update', what: 'status'}, actions.updateTicketStatus);

    return {
        name: opts.name
    };
};

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

    seneca.ready(function(err) {
        console.log(err || 'plugin ready:', opts.name);
    });

    seneca.add({role: 'ticket', cmd: 'create'}, actions.createTicket);
    seneca.add({role: 'ticket', cmd: 'get', by: 'id'}, actions.getTicketById);
    seneca.add({role: 'ticket', cmd: 'get', by: 'company_id'}, actions.getTicketsByCompanyId);

    return {
        name: opts.name
    };
};

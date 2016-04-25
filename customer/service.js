'use strict';

const actions = require('./lib/actions');
const database = require('./lib/database');

const defaults = {
    name: 'customer'
};

module.exports = function (options) {

    const seneca = this;
    const extend = seneca.util.deepextend;

    const opts = extend(defaults, options);

    seneca.add({init: opts.name}, function (args, ready) {
        console.log('init', opts.name);
        database.connect().then(() => ready());
    });

    seneca.add('role:seneca,cmd:close', function (close_msg, done) {
        // do some cleanup or something
        console.log('bye bye from customers');
        this.prior(close_msg, done);
    });


    seneca.ready(function(err) {
        console.log(err || 'plugin ready:', opts.name);
    });

    seneca.add({role: 'customer', cmd: 'create'}, actions.createCustomer);
    seneca.add({role: 'customer', cmd: 'get', company_id: '*'}, actions.getCustomerByCompanyId);

    return {
        name: opts.name
    };
};

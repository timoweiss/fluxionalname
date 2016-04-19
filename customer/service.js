'use strict';

const actions = require('./lib/actions');

const defaults = {
    name: 'customer'
};

module.exports = function (options) {

    const seneca = this;
    const extend = seneca.util.deepextend;

    const opts = extend(defaults, options);

    seneca.add({init: opts.name}, function (args, ready) {
        console.log('init');
        // do some init work
        setTimeout(ready, 100);
    });

    seneca.add('role:seneca,cmd:close', function (close_msg, done) {
        // do some cleanup or something
        console.log('bye bye from customers');
        this.prior(close_msg, done);
    });

    seneca.add({role: 'customer', cmd: 'create'}, actions.createCustomer);
    // seneca.add({role: 'customer', cmd: 'get'}, actions.createCustomer);

    return {
        name: opts.name
    };
};

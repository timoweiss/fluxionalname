'use strict';

const actions = require('./lib/actions');

const defaults = {
    name: 'user'
};

module.exports = function (options) {

    const seneca = this;
    const extend = seneca.util.deepextend;

    const opts = extend(defaults, options);

    seneca.add({init: opts.name}, function (args, ready) {
        console.log('init', defaults.name);
        // do some init work
        setTimeout(ready, 100);
    });

    seneca.add('role:seneca,cmd:close', function (close_msg, done) {
        // do some cleanup or something
        console.log('bye bye from', defaults.name);
        this.prior(close_msg, done);
    });

    seneca.add({role: 'user', cmd: 'create'}, actions.createUser);
    seneca.add({role: 'user', cmd: 'login'}, actions.loginUser);
    seneca.add({role: 'user', cmd: 'get', by: 'nothing'}, actions.getAllUser);
    seneca.add({role: 'user', cmd: 'get', by: 'id', id: '*'}, actions.getUserById);

    // seneca.act({role: 'user', cmd: 'get', by: 'id', id: 'e76d1ac9-bae0-4814-a19d-566547e8c92c'}, console.log);

    return {
        name: opts.name
    };
};

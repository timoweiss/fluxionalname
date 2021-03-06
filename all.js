'use strict';


const defaults = {
    name: 'everything'
};
var all;
module.exports = all = function (options) {

    const seneca = this;
    const extend = seneca.util.deepextend;

    const opts = extend(defaults, options);

    seneca.use(__dirname + '/user/service');
    seneca.use(__dirname + '/customer/service');
    seneca.use(__dirname + '/company/service');
    seneca.use(__dirname + '/ticket/service');

    seneca.add({ init: opts.name }, function (args, ready) {
        console.log('init', defaults.name);
        // do some init work
        setTimeout(ready, 100);
    });

    seneca.add('role:seneca,cmd:close', function (close_msg, done) {
        // do some cleanup or something
        console.log('bye bye from', defaults.name);
        this.prior(close_msg, done);
    });
    if (opts.startListening) {
        seneca.listen();
    }
    return {
        name: opts.name
    };
};

if (require.main === module) {
    console.log('called directly');
    const seneca = require('seneca')();
    seneca.use(all, { startListening: true });
} else {
    console.log('required as a module');
}
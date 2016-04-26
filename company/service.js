'use strict';

const actions = require('./lib/actions');
const database = require('./lib/database');

const defaults = {
    name: 'company'
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
        console.log('bye bye from company');
        this.prior(close_msg, done);
    });

    seneca.ready(function(err) {
        console.log(err || 'plugin ready:', opts.name);
    });

    seneca.add({role: 'company', cmd: 'create'}, actions.createCompany);
    seneca.add({role: 'company', cmd: 'get', by: 'id'}, actions.getCompanyById);
    seneca.add({role: 'company', cmd: 'get', by: 'ruid'}, actions.getCompanyByUserId);
    seneca.add({role: 'company', cmd: 'get', by: 'company_id', entity: 'member'}, actions.getCompanyMembers);

    return {
        name: opts.name
    };
};

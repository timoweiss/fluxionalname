'use strict';

const seneca = require('seneca');
const mesh = require('seneca-mesh');

const service = require('../service');

const opts = {
    seneca: {
        tag: 'company',
        strict:{result:false}
    },
    mesh: {
        auto: true,
        listen: [{pin: 'role:company', model:'consume'}]
    },
    plugin: {

    }
};

seneca(opts.seneca)
    .use(service, opts.plugin)
    .use(mesh, opts.mesh);

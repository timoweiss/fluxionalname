'use strict';
const Glue = require('glue');

const manifest = {
    connections: [{
        port: process.env['API_PORT'] || 8000
    }],
    registrations: [{
        plugin: 'chairo',
        options: {}
    }]
};


Glue.compose(manifest, {relativeTo: __dirname}, (err, server) => {

    if(err) {
        throw err;
    }

    const seneca = server.seneca;
    seneca
        .use(require('seneca-mesh'), { auto: true })
        .ready(senecaErr => {
            if (senecaErr) {
                throw senecaErr;
            }
            
            seneca.act({role: 'user', cmd: 'create'}, {
                name: 'timo',
                surname: 'weiß',
                mail: 'info@timo-weiss.com'
            }, (err, data) => {
                console.log(err || data);
            });
            
            server.start(err => {
                if (err) {
                    throw err;
                }
                console.log('Server running at:', server.info.uri);
            });
        });
});
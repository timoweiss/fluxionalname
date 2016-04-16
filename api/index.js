'use strict';
const Chairo = require('chairo');
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

server.register({ register: Chairo, options: { tag: 'api', log: 'debug', seneca: true } }, function (err) {

    const seneca = server.seneca;

    seneca
        .use(require('seneca-mesh'), { auto: true })
        .ready(function (senecaErr) {
            if (senecaErr) {
                throw senecaErr;
            }
            
            seneca.act({role: 'user', cmd: 'create'}, {
                name: "timo",
                surname: "weiß",
                mail: "info@timo-weiss.com"
            }, (err, data) => {
                console.log(err || data);
            })
            
            server.start(function (err) {
                if (err) {
                    throw err;
                }
                console.log('Server running at:', server.info.uri);
            });
        })



});
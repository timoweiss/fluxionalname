'use strict';
const Chairo = require('chairo');
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

server.register({ register: Chairo }, function (err) {

    
    server.seneca.use('../all');

    server.start(function () {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});
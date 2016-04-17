'use strict';

module.exports = {
    handler,
    registerUser
};

function handler(request, reply) {
    
    request.server.seneca.act('role:user,cmd:get,by:nothing,cache$:true', function(err, data) {
        reply(data);
    });
}

function registerUser(request, reply) {
    request.server.seneca.act('role:user,cmd:create', request.payload, function(err, data) {
        reply(data);
    });
}
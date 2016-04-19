'use strict';

module.exports = {
    handler,
    getUserById,
    registerUser,
    login
};

function handler(request, reply) {


    request.server.seneca.act({role: 'user', cmd: 'get', by: 'nothing'}, function (err, data) {
        reply(data);
    });
}
function getUserById(request, reply) {
    const pattern = request.applyToDefaults({role: 'user', cmd: 'get', by: 'id'}, request.requesting_user_id);

    request.server.seneca.act(pattern, request.params, function (err, data) {
        reply(data);
    });
}

function registerUser(request, reply) {
    request.server.seneca.act('role:user,cmd:create', request.payload, function (err, data) {

        reply(data);
        request.cookieAuth.set(data);
    });
}

function login(request, reply) {
    request.server.seneca.act('role:user,cmd:login', request.payload, function (err, data) {
        if (err) {
            return reply.code(401);
        }

        request.cookieAuth.set(data);
        reply(data);
    });
}
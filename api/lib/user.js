'use strict';

module.exports = {
    handler,
    getUserById,
    registerUser,
    login
};

function handler(request, reply) {

    console.log(request.requesting_user_id);
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
    const seneca = request.server.seneca;
    seneca.act('role:user,cmd:create', request.payload, function (err, data) {
        const sessionData = {user: data, company_id: ''};
        getCompaniesByUserId(data, seneca, resp => {
            
            request.cookieAuth.set(sessionData);
            reply(resp);
        });
    });
}

function login(request, reply) {
    const seneca = request.server.seneca;
    seneca.act('role:user,cmd:login', request.payload, function (err, data) {
        if (err) {
            return reply.code(401);
        }
        const sessionData = {user: data, company_id: ''};
        getCompaniesByUserId(data, seneca, resp => {
            request.cookieAuth.set(sessionData);
            reply(resp);
        });


    });
}

function getCompaniesByUserId(user, seneca, cb) {
    const response = {
        user: user,
        companies: []
    };

    const pattern = {role: 'company', cmd: 'get', by: 'ruid', ruid: user.id};

    seneca.act(pattern, (err, companies) => {
        if(!err) {
            response.companies = companies;
        }
        cb(response);
    });
}
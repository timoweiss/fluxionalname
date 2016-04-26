'use strict';

module.exports = {
    handler,
    getUserById,
    registerUser,
    login
};

function handler(request, reply) {

    request.server.seneca.act({role: 'user', cmd: 'get', by: 'nothing'}, function (err, data) {
        reply(request.unwrap(data));
    });
}
function getUserById(request, reply) {
    const pattern = request.applyToDefaults({role: 'user', cmd: 'get', by: 'id'}, request.requesting_user_id);

    request.server.seneca.act(pattern, request.params, function (err, user) {
        if (err) {

            request.logger.error(err, 'get user by id');
            return reply(request.unwrap({err: {msg: 'BAD_IMPL'}}));
        }

        reply(request.unwrap(user));
    });
}

function registerUser(request, reply) {
    const seneca = request.server.seneca;
    seneca.act('role:user,cmd:create', request.payload, function (err, data) {
        if (err) {
            request.logger.error(err, 'register user');
            return reply(request.unwrap({err: {msg: 'BAD_IMPL'}}));
        }

        let user = request.unwrap(data);

        if(user.isBoom) {
            return reply(user);
        }

        const sessionData = {user: user, company_id: ''};
        getCompaniesByUserId(user, seneca, resp => {

            request.cookieAuth.set(sessionData);
            reply(resp);
        });
    });
}

function login(request, reply) {
    const seneca = request.server.seneca;
    seneca.act('role:user,cmd:login', request.payload, function (err, data) {
        if (err) {
            request.logger.error(err, 'login user');
            return reply.code(401);
        }

        let user = request.unwrap(data);

        if(user.isBoom) {
            return reply(user);
        }

        const sessionData = {user: user, company_id: ''};
        getCompaniesByUserId(user, seneca, resp => {
            request.logger.debug(sessionData, 'setting session data');
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
        if (!err) {
            response.companies = companies.data;
        }
        cb(response);
    });
}
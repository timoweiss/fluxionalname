'use strict';

module.exports = {
    getCustomer,
    createCustomer
};

function getCustomer(request, reply) {
    if(!request.company_id) {
        return reply({msg: 'missing company id in session'}).code(400);
    }

    console.log(request.requesting_user_id);
    const pattern = request.applyToDefaults({role: 'customer', cmd: 'get', company_id: request.company_id}, request.requesting_user_id);
    request.server.seneca.act(pattern, function (err, data) {
        reply(data);
    });
}


function createCustomer(request, reply) {

    const seneca = request.server.seneca;
    const pattern = request.applyToDefaults({role: 'customer', cmd: 'create'}, request.requesting_user_id);
    seneca.act(pattern, request.payload, function (err, data) {
        if (err) {
            return reply(err);
        }
        reply(data);
    });
}
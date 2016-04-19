'use strict';

module.exports = {
    getCustomer,
    createCustomer
};

function getCustomer(request, reply) {
    if(!request.company_id) {
        return reply(request.unwrap({msg: 'MISSING_COMPANY_ID_SESSION'}));
    }

    console.log(request.requesting_user_id);
    const pattern = request.applyToDefaults({role: 'customer', cmd: 'get', company_id: request.company_id}, request.requesting_user_id);
    request.server.seneca.act(pattern, function (err, customers) {
        if (err) {
            // TODO add logging
            console.log(err);
            return reply(request.unwrap({err: {msg: 'BAD_IMPL'}}));
        }

        reply(request.unwrap(customers));
    });
}


function createCustomer(request, reply) {

    const seneca = request.server.seneca;
    const pattern = request.applyToDefaults({role: 'customer', cmd: 'create', company_id: request.company_id}, request.requesting_user_id);
    seneca.act(pattern, request.payload, function (err, customer) {
        if (err) {
            // TODO add logging
            console.log(err);
            return reply(request.unwrap({err: {msg: 'BAD_IMPL'}}));
        }
        reply(request.unwrap(customer));
    });
}
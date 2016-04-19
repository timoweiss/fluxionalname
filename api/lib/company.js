'use strict';

module.exports = {
    createCompany,
    getCompanyById
};

function createCompany(request, reply) {
    const pattern = request.applyToDefaults({role: 'company', cmd: 'create'}, request.requesting_user_id);

    request.server.seneca.act(pattern, request.payload, function(err, data) {
        reply(data);
    });
}

function getCompanyById(request, reply) {
    const pattern = request.applyToDefaults({role: 'company', cmd: 'get', by: 'id'}, request.requesting_user_id);

    request.server.seneca.act(pattern, request.params, function(err, data) {
        reply(err ||data);
    });
}
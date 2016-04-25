'use strict';

module.exports = {
    createCompany,
    getCompanyById,
    selectCompany,
    getCompaniesByRuid
};

function createCompany(request, reply) {
    const pattern = request.applyToDefaults({role: 'company', cmd: 'create'}, request.requesting_user_id);

    request.server.seneca.act(pattern, request.payload, function(err, data) {
        reply(err || data);
    });
}

function getCompanyById(request, reply) {
    const pattern = request.applyToDefaults({role: 'company', cmd: 'get', by: 'id'}, request.requesting_user_id);

    request.server.seneca.act(pattern, request.params, function(err, data) {
        reply(err || data);
    });
}

function getCompaniesByRuid(request, reply) {
    const pattern = request.applyToDefaults({role: 'company', cmd: 'get', by: 'ruid'}, request.requesting_user_id);

    request.server.seneca.act(pattern, request.params, function(err, data) {
        reply(err || data);
    });
}

function selectCompany(request, reply) {
    const sessionData = request.auth.credentials;
    let old = request.auth.credentials.company_id;

    // TODO validate company_id
    sessionData.company_id = request.params.id;
    let newCompanyId = sessionData.company_id;

    request.cookieAuth.set(sessionData);
    reply({oldCompanyId: old, newCompanyId: newCompanyId});
}
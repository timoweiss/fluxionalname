'use strict';

module.exports = {
    createCompany,
    getCompanyById
};

function createCompany(request, reply) {
    request.server.seneca.act('role:company,cmd:create', request.payload, function(err, data) {
        reply(data);
    });
}

function getCompanyById(request, reply) {
    request.server.seneca.act('role:company,cmd:get,by:id', request.params, function(err, data) {
        reply(err ||data);
    });
}
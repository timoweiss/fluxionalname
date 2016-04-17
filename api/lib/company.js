'use strict';

module.exports = {
    createCompany
};

function createCompany(request, reply) {
    request.server.seneca.act('role:company,cmd:create', request.payload, function(err, data) {
        reply(data);
    });
}
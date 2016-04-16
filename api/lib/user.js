'use strict';

module.exports = {
    handler
};

function handler(request, reply) {
    
    request.server.seneca.act('role:user,cmd:get,by:nothing,cache$:true', function(err, data) {
        reply(data);
    });
}
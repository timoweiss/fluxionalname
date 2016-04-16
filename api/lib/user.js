'use strict';

module.exports = {
    handler
};

function handler(request, reply) {
    reply('hallo');
    console.log(request.server.seneca)
}
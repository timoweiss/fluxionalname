'use strict';

const boom = require('boom');

module.exports = {
    unwrap
};

const ERRORS = {
    NOT_FOUND: boom.notFound,
    BAD_IMPL: boom.badImplementation
};


function unwrap(serviceResponse) {
    if (serviceResponse && !serviceResponse.err && serviceResponse.data) {
        return serviceResponse.data;
    }

    if (serviceResponse && serviceResponse.err) {

        // get boom function
        let boom = ERRORS[serviceResponse.err.msg];

        if (!boom) {
            console.error('TODO: unknown error-code:', serviceResponse.err.msg);
            return Boom.badImplementation();
        }

        // return boom function with (optional) message
        return boom(serviceResponse.err.detail);
    }
    // TODO: log, really bad - should never happen
    return Boom.badImplementation();

}
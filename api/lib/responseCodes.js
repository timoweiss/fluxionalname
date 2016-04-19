'use strict';

const boom = require('boom');

module.exports = {
    unwrap
};

const ERRORS = {
    NOT_FOUND: boom.notFound,
    BAD_IMPL: boom.badImplementation,
    MISSING_COMPANY_ID_SESSION: boom.badRequest
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
            return boom.badImplementation();
        }

        // return boom function with (optional) message
        return boom(serviceResponse.err.detail);
    }
    // TODO: log, really bad - should never happen
    console.error('really bad:', serviceResponse);
    return boom.badImplementation();

}
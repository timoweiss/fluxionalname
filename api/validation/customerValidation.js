'use strict';

const joi = require('joi');

let validations = {};

validations.create = joi.object().keys({
    mail: joi.string().email().min(3).max(60).required()
        .description('Mail address'),
    name: joi.string().required(),
    url: joi.string(),
    address: joi.object().keys({
        street: joi.string(),
        number: joi.number(),
        plz: joi.number(),
        city: joi.string()
    })
});

module.exports = validations;
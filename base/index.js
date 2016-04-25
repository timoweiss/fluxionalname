'use strict';
// require('@risingstack/trace');

const seneca = require('seneca')({
    tag: 'base'
});

seneca.use('mesh', {base: true});


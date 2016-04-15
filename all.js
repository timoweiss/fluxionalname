'use strict';
const seneca = require('seneca')();

seneca.use('./user/service');

seneca.listen();
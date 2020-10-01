"use strict";

const express = require('express');

const authRouts = require('./auth.routes');
const usersRouts = require('./users.routes.js');

const router = express.Router();

router
	.use('/auth', authRouts)
	.use('/users', usersRouts);


module.exports = router;


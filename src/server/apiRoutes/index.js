"use strict";

const express = require('express');

const configurationRoutes = require('./configuration.routes');
const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');

const router = express.Router();

router
	.use('/configuration', configurationRoutes)
	.use('/auth', authRoutes)
	.use('/users', usersRoutes);


module.exports = router;


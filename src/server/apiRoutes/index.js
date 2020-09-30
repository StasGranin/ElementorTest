"use strict";

const express = require('express');
const {verifyToken} = require('../services/auth.service');

const authRouts = require('./auth');
const usersRouts = require('./users');

const router = express.Router();

router
	.use('/auth', authRouts)
	.use('/users', usersRouts);


module.exports = router;


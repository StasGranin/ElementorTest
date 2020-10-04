"use strict";

const express = require('express');
const {getActiveUsers, getActiveSessionDetails} = require('../actions/users.actions');
const {verifyToken} = require('../services/auth.service');

const router = express.Router();

router
	.get('/getActiveUsers', [verifyToken], getActiveUsers)
	.get('/getActiveSessionDetails/:sessionId', [verifyToken], getActiveSessionDetails);

module.exports = router;
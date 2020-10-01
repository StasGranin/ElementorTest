"use strict";

const express = require('express');
const {getActiveUsers, getUserDetails} = require('../actions/users.actions');
const {verifyToken} = require('../services/auth.service');

const router = express.Router();

router
	.get('/getActiveUsers', [verifyToken], getActiveUsers)
	.get('/getUserDetails', [verifyToken], getUserDetails);

module.exports = router;
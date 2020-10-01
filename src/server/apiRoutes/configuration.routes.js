"use strict";

const express = require('express');
const {getConfiguration} = require('../actions/configuration.actions');
const {verifyToken} = require('../services/auth.service');

const router = express.Router();

router
	.get('/getConfiguration', [verifyToken], getConfiguration);

module.exports = router;
"use strict";

const express = require('express');
const {db} = require('../services/database.service');
const {verifyToken} = require('../services/auth.service');

const router = express.Router();

router
	.get('/api/users/getUsers', [verifyToken], (req, res) => {
	})

	.get('/api/users/getUserDetails', [verifyToken], (req, res) => {
	});

module.exports = router;
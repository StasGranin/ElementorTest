"use strict";

const jwt = require("jsonwebtoken");
const {silentlyLogOut} = require('../actions/auth.actions');
const {sendError} = require('./sendToClient.service');

const APP_TOKEN_SECRET = process.env.APP_TOKEN_SECRET || 'elementor';

module.exports = {
	makeToken: (username) => jwt.sign({username}, APP_TOKEN_SECRET),

	verifyToken: (req, res, next) => {
		const token = req.headers['x-access-token'];

		if (token) {
			jwt.verify(token, APP_TOKEN_SECRET, (err, decoded) => {
				if (err) {
					if (decoded.username) {
						silentlyLogOut(decoded);
					}

					return sendError(401, 'Invalid token');
				}

				req.username = decoded.username;
				next();
			});
		}
		else {
			return sendError(403, 'No token provided!');
		}

	},

	decodeToken: (req) => jwt.decode(req.headers['x-access-token'])
};
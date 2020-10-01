"use strict";

const jwt = require("jsonwebtoken");
const {silentlyLogOut} = require('../actions/auth.actions');
const {sendError} = require('./sendToClient.service');

const APP_TOKEN_SECRET = process.env.APP_TOKEN_SECRET || 'elementor';

module.exports = {
	makeToken: (sid, username) => jwt.sign({sid, username}, APP_TOKEN_SECRET),

	verifyToken: (req, res, next) => {
		const token = req.headers['x-access-token'];

		if (token) {
			jwt.verify(token, APP_TOKEN_SECRET, (err, decoded = {}) => {
				const {sid, username} = decoded;

				if (err) {
					if (sid && username) {
						silentlyLogOut(sid, username);
					}

					return sendError(401, 'Invalid token');
				}

				req.userSession = {sid, username};
				next();
			});
		}
		else {
			return sendError(401, 'No token provided!');
		}

	},

	decodeToken: (req) => jwt.decode(req.headers['x-access-token'])
};
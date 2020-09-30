"use strict";

const jwt = require("jsonwebtoken");

const APP_TOKEN_SECRET = process.env.APP_TOKEN_SECRET || 'elementor';
const APP_TOKEN_EXPIRE = process.env.APP_TOKEN_EXPIRE || 86400; // Default: expire in 24 hours

module.exports = {
	makeToken: (username) => jwt.sign({username}, APP_TOKEN_SECRET, {expiresIn: APP_TOKEN_EXPIRE}),

	verifyToken: (req, res, next) => {
		const token = req.headers['x-access-token'];

		if (!token) {
			return res.status(403).send({data: {errorMessage: 'No token provided!'}});
		}

		jwt.verify(token, APP_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				return res.status(401).send({data: {errorMessage: 'Unauthorized!'}});
			}

			//req.userId = decoded.id;
			next();
		});
	}
};
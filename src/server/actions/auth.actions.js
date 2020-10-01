"use strict";

const crypto = require('crypto');
const {getCollection, toObjectId} = require('../services/database.service');
const {makeToken, verifyToken, decodeToken} = require('../services/auth.service');
const {send, sendError, sendGenericError} = require('../services/sendToClient.service');
const {getClientIP, getClientUserAgent} = require('../services/util.services');


const _logIn = (req, res, username, password) => {
	if (username && password) {
		try {
			const now = new Date().getTime();
			const usersCollection = getCollection('users');
			const activeUsersCollection = getCollection('activeUsers');
			const passwordHash = crypto.createHash('sha1').update(password).digest("hex");

			usersCollection.updateOne({username, passwordHash}, {
				$inc: {loginCount: 1},
				$set: {lastLoginTime: now}
			}).then(result => {
				if (result.matchedCount) {
					activeUsersCollection.insertOne({
						username,
						lastUpdateTime: now,
						loginTime: now,
						userAgent: getClientUserAgent(req),
						userIP: getClientIP(req)
					}).then(result => {
						const sid = result.ops[0]._id;
						const accessToken = makeToken(sid, username);

						send(res, 200, {sid, username, accessToken});
					})
				}
				else {
					sendError(res, 400, 'Incorrect username or password');
				}
			});
		}
		catch (error) {
			sendGenericError(res);
		}
	}
	else {
		sendError(res, 400, 'Missing username or password');
	}
};


module.exports = {

	isLoggedIn: (req, res) => {
		const {sid, username} = decodeToken(req) || {};

		if (sid && username) {
			try {
				getCollection('activeUsers').findOne({
					_id: toObjectId(sid),
					username
				}).then(user => send(res, 200, {isLoggedIn: user && true || false}));
			}
			catch (error) {
				sendGenericError(res);
			}
		}
		else {
			send(res, 200, {isLoggedIn: false})
		}
	},

	signUp: (req, res) => {
		const username = req.body.username && req.body.username.trim();
		const password = req.body.password && req.body.password.trim();

		if (username && password) {
			try {
				const collection = getCollection('users');

				collection.findOne({username}).then(user => {
					const passwordHash = crypto.createHash('sha1').update(password).digest("hex"); // I decided not to use salt for hashing. Yes, I'm aware of the implications

					if (!user) {
						collection.insertOne({
							username,
							passwordHash,
							loginCount: 0,
							signUpTime: new Date().getTime()
						}).then(result => _logIn(req, res, username, password));
					}
					else {
						sendError(res, 400, 'Username already taken');
					}
				});
			}
			catch (error) {
				sendGenericError(res);
			}
		}
		else {
			sendError(res, 400, 'Missing username or password');
		}
	},

	logIn: (req, res) => {
		const username = req.body.username && req.body.username.trim();
		const password = req.body.password && req.body.password.trim();

		_logIn(req, res, username, password);
	},

	logOut: (req, res) => {
		const {sid, username} = decodeToken(req) || {};

		if (username) {
			try {
				getCollection('activeUsers').deleteOne({_id: toObjectId(sid), username}).then((result) => {
					send(res, 201);
				});
			}
			catch (error) {
				sendGenericError(res);
			}

		}
		else {
			sendError(res, 400, 'Failed to log-out properly! Supplied credentials are incorrect');
		}
	},

	silentlyLogOut: (username, sid) => {
		try {
			getCollection('activeUsers').deleteOne({_id: toObjectId(sid), username});
		}
		catch (error) {
			sendGenericError(res);
		}
	}
};
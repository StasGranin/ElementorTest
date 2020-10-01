"use strict";

const crypto = require('crypto');
const {getCollection} = require('../services/database.service');
const {makeToken, verifyToken, decodeToken} = require('../services/auth.service');


module.exports = {
	signUp: (req, res) => {
		const username = req.body.username && req.body.username.trim();
		const password = req.body.password && req.body.password.trim();

		if (username && password) {
			const collection = getCollection('users');

			collection.findOne({username}).then(user => {
				const passwordHash = crypto.createHash('sha1').update(password).digest("hex"); // I decided not to use salt for hashing. Yes, I'm aware of the implications

				if (!user) {
					try {
						collection.insertOne({
							username,
							passwordHash,
							loginCount: 0,
							signUpTime: new Date().getTime()
						}).then(result => res.status(201).send());
					}
					catch (err) {
						res.status(500).send({data: {errorMessage: 'User creation failed'}});
					}
				}
				else {
					res.status(400).send({data: {errorMessage: 'Username already exists'}});
				}
			});
		}
		else {
			res.status(400).send({data: {errorMessage: 'Missing username or password'}});
		}
	},

	logIn: (req, res) => {
		const username = req.body.username && req.body.username.trim();
		const password = req.body.password && req.body.password.trim();

		if (username && password) {
			const now = new Date().getTime();
			const usersCollection = getCollection('users');
			const activeUsersCollection = getCollection('activeUsers');
			const passwordHash = crypto.createHash('sha1').update(password).digest("hex");
			const updateUserPromise = usersCollection.updateOne({username, passwordHash}, {
				$inc: {loginCount: 1},
				$set: {lastLoginTime: now}
			});
			const findUserInActiveUsersPromise = activeUsersCollection.findOne({username}); // In case user is already logged in (say on a different machine/browser)

			Promise.all([updateUserPromise, findUserInActiveUsersPromise]).then(results => {
				const [user, activeUser] = results;
				const userIP = (req.ip === '::1' || req.ip === '127.0.0.1') ? 'localhost' : req.ip; // IPv6 localhost string is weird

				if (user.matchedCount) {
					let updateActiveUserPromise;
					const activeUserData = {
						username,
						lastUpdateTime: now,
						loginTime: now,
						userAgent: req.get('user-agent'),
						userIP
					};

					if (activeUser) {
						updateActiveUserPromise = activeUsersCollection.updateOne({username}, {$set: activeUserData});
					}
					else {
						updateActiveUserPromise = activeUsersCollection.insertOne(activeUserData);
					}

					updateActiveUserPromise.then((result) => {
						const accessToken = makeToken(username);

						res.status(200).send({data: {username, accessToken}});
					});
				}
				else {
					res.status(400).send({data: {errorMessage: 'Username or password are incorrect'}});
				}
			});
		}
		else {
			res.status(400).send({data: {errorMessage: 'Missing username or password'}});
		}
	},

	logOut: (req, res) => {
		const {username} = decodeToken(req) || {};

		if (username) {
			getCollection('activeUsers').deleteOne({username}).then((result) => {
				res.status(201).send();
			});
		}
		else {
			res.status(400).send({data: {errorMessage: 'Failed to log-out properly! Supplied credentials are incorrect'}});
		}
	}
};
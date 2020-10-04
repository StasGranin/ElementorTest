"use strict";

const {getCollection, toObjectId} = require('../services/database.service');
const {send, sendError, sendGenericError} = require('../services/sendToClient.service');
const {getClientIP, getClientUserAgent} = require('../services/util.services');

module.exports = {
	getActiveUsers: (req, res) => {
		const activeUsersCollection = getCollection('activeUsers');
		const {sid, username} = req.userSession;

		try {
			activeUsersCollection.updateOne({_id: toObjectId(sid), username}, {
				$set: {
					lastUpdateTime: new Date().getTime(),
					userAgent: getClientUserAgent(req),
					userIP: getClientIP(req)
				}
			}).then(result => {
				activeUsersCollection.find({}).project({userAgent: false}).toArray().then((results) => {
					send(res, 200, results);
				})
			});
		}
		catch (error) {
			sendGenericError(res);
		}
	},

	getActiveSessionDetails: (req, res) => {
		const {sessionId} = req.params;

		if (!sessionId) {
			sendError(res, 400, 'Session id was not provided');
		}

		try {
			getCollection('activeUsers').aggregate([
				{
					$lookup: {
						from: 'users',
						localField: 'username',
						foreignField: 'username',
						as: 'user'
					}
				},
				{
					$unwind: '$user'
				},
				{
					$match: {
						$and: [{_id: toObjectId(sessionId)}]
					}
				},
				{
					$project: {
						userAgent: 1,
						user: {signUpTime: 1, loginCount: 1}
					}
				}
			]).toArray().then(result => {
				if (result.length) {
					send(res, 200, result[0]);
				}
				else {
					sendError(res, 404, 'Session was not found');
				}


			});
		}
		catch (error) {
			sendGenericError(res);
		}
	}
};
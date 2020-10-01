"use strict";

const {getCollection} = require('../services/database.service');
const {send, sendError, sendGenericError} = require('../services/sendToClient.service');
const {getClientIP, getClientUserAgent} = require('../services/util.services');

module.exports = {
	getActiveUsers: (req, res) => {
		const activeUsersCollection = getCollection('activeUsers');
		const {sid, username} = req.userSession;

		try {
			activeUsersCollection.updateOne({_id: sid, username}, {
				$set: {
					lastUpdateTime: new Date().getTime(),
					userAgent: getClientUserAgent(req),
					userIP: getClientIP(req)
				}
			}).then(result => {
				activeUsersCollection.find({}).toArray().then((results) => {
					send(res, 200, results);
				})
			});
		}
		catch (error) {
			sendGenericError(res);
		}
	},

	getUserDetails: (req, res) => {
		/*collection.aggregate([
		 {
		 $lookup: {
		 from: 'activeUsers',
		 localField: 'username',
		 foreignField: 'username',
		 as: 'activeUsers'
		 }
		 },
		 {
		 $unwind: '$activeUsers'
		 },
		 {
		 $match:{
		 $and:[{username, passwordHash}]
		 }
		 },
		 {
		 $project: {
		 username: 1,
		 }
		 }]).toArray().then(a => console.log(a));*/
	}
};
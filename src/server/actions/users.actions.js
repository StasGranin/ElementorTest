"use strict";

const {getCollection} = require('../services/database.service');

module.exports = {
	getActiveUsers: (req, res) => {
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
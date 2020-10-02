"use strict";

const {send} = require('../services/sendToClient.service');

module.exports = {
	getConfiguration: (req, res) => {
		const pollingInterval = process.env.CLIENT_POLLING_INTERVAL || 2000;
		const {sid, username} = req.userSession;

		send(res, 200, {sid, username, pollingInterval})
	},
};
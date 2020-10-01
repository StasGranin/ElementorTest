"use strict";

const {send} = require('../services/sendToClient.service');

module.exports = {
	getConfiguration: (req, res) => {
		const pollingInterval = process.env.CLIENT_POLLING_INTERVAL || 2000;

		send(res, 200, {pollingInterval})
	},
};
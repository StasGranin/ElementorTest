"use strict";

module.exports = {
	send: (res, status, data = {}) => res.status(status).send({status, data}),

	sendError: (res, status, errorMessage) => this.send(res, status, {errorMessage}),

	sendGenericError: (res) => this.send(res, 500, {errorMessage: 'Something went wrong'})
};
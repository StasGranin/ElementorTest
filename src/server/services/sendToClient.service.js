"use strict";

const _send = (res, status, payload = {}) => res.status(status).send({status, payload});

module.exports = {
	send: _send,

	sendError: (res, status, errorMessage) => _send(res, status, {errorMessage}),

	sendGenericError: (res) => _send(res, 500, {errorMessage: 'Something went wrong'})
};
"use strict";

const send = (res, status, payload = {}) => res.status(status).send({status, payload});

module.exports = {
	send,

	sendError: (res, status, errorMessage) => send(res, status, {errorMessage}),

	sendGenericError: (res) => send(res, 500, {errorMessage: 'Something went wrong'})
};
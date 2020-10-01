"use strict";

module.exports = {
	getClientIP: (req) => (req.ip === '::1' || req.ip === '127.0.0.1') ? 'localhost' : req.ip, // IPv6 localhost string is weird
	getClientUserAgent: (req) => req.get('user-agent')
};
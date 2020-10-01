"use strict";

const express = require('express');
const crypto = require('crypto');

const {getCollection} = require('../services/database.service');
const {makeToken, verifyToken} = require('../services/auth.service');

const router = express.Router();

router
	.get('/user', [verifyToken], (req, res) => {
		const {username} = req;

		getCollection('users').findOne({username}).then(user => {
			if (user) {
				res.status(200).send({
					data: {
						username: user.username
					}
				});
			}
			else {
				res.status(400).send({data: {errorMessage: 'Something something error... whatever, man...'}});
			}
		});
	})

	.post('/signup', (req, res) => {
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
	})

	.post('/login', (req, res) => {
		const username = req.body.username && req.body.username.trim();
		const password = req.body.password && req.body.password.trim();

		if (username && password) {
			const collection = getCollection('users');
			const passwordHash = crypto.createHash('sha1').update(password).digest("hex");

			collection.findOne({username, passwordHash}).then(user => {
				const token = makeToken(username);

				res.status(200).send({
					data: {
						username: user.username,
						accessToken: token
					}
				});
			});
		}
		else {
			res.status(400).send({data: {errorMessage: 'Missing username or password'}});
		}
	})

	.post('/logout', (req, res) => {
	});

module.exports = router;
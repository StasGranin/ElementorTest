"use strict";

const express = require('express');
const {MongoClient} = require('mongodb'); // vanilla MongoDB driver. No Mongoose for you, come back next year!
const path = require('path');
const bodyParser = require('body-parser');
const https = require('https');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'ElementorTest';
const APP_TOKEN_SECRET = process.env.APP_TOKEN_SECRET || 'elementor';

const app = express();
let database;

const verifyToken = (req, res, next) => {
	const token = req.headers['x-access-token'];

	if (!token) {
		return res.status(403).send({data: {errorMessage: 'No token provided!'}});
	}

	jwt.verify(token, APP_TOKEN_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).send({data: {errorMessage: 'Unauthorized!'}});
		}

		//req.userId = decoded.id;
		next();
	});
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../../public', 'indexApp.html')));
app.get('/login', (req, res) => res.sendFile(path.resolve(__dirname, '../../public', 'indexLogin.html')));


/* --- API Calls --- */

app.get('/api/test', (req, res) => {
	database.collection('users').find({username: 'test'}).toArray((err, docs) => {

		res.status(200).send({data: docs});
	});
});

app.get('/api/user', [verifyToken], (req, res) => {
});

app.get('/api/configuration', [verifyToken], (req, res) => {
});

app.get('/api/users/getUsers', [verifyToken], (req, res) => {
});
app.get('/api/users/getUserDetails', [verifyToken], (req, res) => {
});


app.post('/api/auth/signup', (req, res) => {
	const username = req.body.username && req.body.username.trim();
	const password = req.body.password && req.body.password.trim();

	if (username && password) {
		const collection = database.collection('users');

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
});

app.post('/api/auth/login', (req, res) => {
	const username = req.body.username && req.body.username.trim();
	const password = req.body.password && req.body.password.trim();

	if (username && password) {
		const collection = database.collection('users');
		const passwordHash = crypto.createHash('sha1').update(password).digest("hex");

		collection.findOne({username, passwordHash}).then(user => {
			const token = jwt.sign({username: user.username}, APP_TOKEN_SECRET, {expiresIn: 86400}); // Expire in 24 hours

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
});

app.post('/api/auth/logout', (req, res) => {
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = process.env.MODE === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});


MongoClient.connect(MONGODB_URL, {useUnifiedTopology: true}).then((mongoClient) => {
	database = mongoClient.db(MONGODB_DATABASE);

	app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

}).catch(error => console.error(error));
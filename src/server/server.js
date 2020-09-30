"use strict";

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const database = require('./services/database.service');
const apiRouts = require('./apiRoutes');

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'ElementorTest';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../../public', 'indexApp.html')));
app.get('/login', (req, res) => res.sendFile(path.resolve(__dirname, '../../public', 'indexLogin.html')));

app.use('/api', apiRouts); // API routes

/*
app.get('/api/configuration', [verifyToken], (req, res) => {
});

 */

database.connect(MONGODB_URL, MONGODB_DATABASE, () => {
	app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))
});

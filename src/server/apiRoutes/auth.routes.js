"use strict";

const express = require('express');
const {isLoggedIn, signUp, logIn, logOut} = require('../actions/auth.actions');

const router = express.Router();

router
	.get('/isLoggedIn', isLoggedIn)
	.post('/signUp', signUp)
	.post('/logIn', logIn)
	.post('/logOut', logOut); // Should this be DELETE according to CRUD? Should this even conform to CRUD? I'm not sure...

module.exports = router;
"use strict";

import {AUTH_API, fetchAPI} from './api.service';

export const isLoggedIn = () => {
	fetchAPI(AUTH_API + '/isLoggedIn')
};

export const signUp = (username, password) => {
	return fetchAPI(AUTH_API + '/signUp', {
		method: 'POST',
		withAuthHeaders: false,
		body: {username, password}
	}).then(result => {
		if (result.payload.accessToken) {
			localStorage.setItem('user', JSON.stringify(result.payload));
			window.location = '/';
		}

		return result;
	});
};

export const logIn = (username, password) => {
	return fetchAPI(AUTH_API + '/logIn', {
		method: 'POST',
		withAuthHeaders: false,
		body: {username, password}
	}).then(result => {
		if (result.payload.accessToken) {
			localStorage.setItem('user', JSON.stringify(result.payload));
			window.location = '/';
		}

		return result;
	});
};

export const logOut = () => {
	return fetch(AUTH_API + '/logOut', {
		method: 'POST'
	}).then(result => {
		localStorage.removeItem('user');
		window.location = '/login';
	});
};


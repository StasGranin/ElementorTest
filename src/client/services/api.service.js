"use strict";

export const API = '/api';
export const CONFIGURATION_API = `${API}/configuration`;
export const AUTH_API = `${API}/auth`;
export const USERS_API = `${API}/users`;

export function fetchAPI(url, options = {}) {
	let fetchOptions = {
		headers: {'Content-Type': 'application/json'},
		method: options.method || 'GET'
	};

	if (options.withAuthHeaders !== false) {

		try {
			const user = JSON.parse(localStorage.getItem('user'));

			if (user && user.accessToken) {
				fetchOptions.headers['x-access-token'] = user.accessToken;
			}
		}
		catch (error) {
			window.location = '/login';
		}

	}

	if (options.body && fetchOptions.method !== 'GET') {
		fetchOptions.body = JSON.stringify(options.body);
	}

	return fetch(url, fetchOptions).then(response => response.json()).then(result => {
		if (result && result.status === 401) {
			window.location = '/login';
		}

		return result
	});
}


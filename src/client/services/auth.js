import {AUTH_API} from './api';
import authHeader from './authHeader';

class AuthService {
	login(username, password) {
		return fetch(AUTH_API + '/login', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({username, password})
		}).then(response => response.json()).then(response => {
			if (response.data.accessToken) {
				localStorage.setItem("user", JSON.stringify(response.data));
				location = '/';
			}

			return response.data;
		});
	}

	logout() {
		return fetch(AUTH_API + '/logout', {
			method: 'POST',
			headers: authHeader(),
			body: JSON.stringify({username, password})
		}).then(response => response.json()).then(response => {
			localStorage.removeItem("user");
			location = '/login';

			return response.data;
		});
	}

	getCurrentUser() {
		return JSON.parse(localStorage.getItem('user')) || {};
	}
}

export default new AuthService();

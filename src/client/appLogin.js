'use strict';

import {isLoggedIn} from './services/auth.service';
import MainLoginUIComponent from './modules/mainLogin.uiComponent/mainLogin.uiComponent';

let appState = {};

$(document).ready(() => {
	const $rootElement = $('#app');
	const main = new MainLoginUIComponent(appState);

	isLoggedIn.then(result => {
		if (result.payload.isLoggedIn) {
			window.location = '/';
		}
		else {
			main.appendTo($rootElement);
		}
	});

});

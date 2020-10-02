'use strict';

import {getConfiguration} from './services/configuration.service';
import MainUIComponent from './modules/main.uiComponent/main.uiComponent';

let appState = {};

$(document).ready(() => {
	const $rootElement = $('#app');

	getConfiguration().then(result => {
		appState = result.payload;

		new MainUIComponent(appState).appendTo($rootElement);
	});
});

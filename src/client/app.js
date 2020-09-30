'use strict';

import TestUIComponent from './modules/test.uiComponent/test.uiComponent';
import './app.scss';

let appState = {};

$(document).ready(() => {

	let $rootElement = $('#app');

	let test = new TestUIComponent(appState);

	test.render($rootElement);

});

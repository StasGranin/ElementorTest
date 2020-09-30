'use strict';

import UIComponent from '../uiComponent/uiComponent';

import template from './test.uiComponent.html';
import './test.uiComponent.scss';

export default class TestUIComponent extends UIComponent {
	constructor(appState) {
		super(appState, template)
	}
}

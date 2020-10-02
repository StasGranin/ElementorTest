'use strict';

import UIComponent from '../uiComponent/uiComponent';

import template from './activeUser.uiComponent.html';
import './activeUser.uiComponent.scss';

export default class ActiveUserUIComponent extends UIComponent {
	constructor(state) {
		super(state, template);

		this.uiElements.$self.on('click', () => this.getUserDetails());
	}

	onAppend() {
		const {state} = this;
		const uiElements = this.uiElements;

		uiElements.username.html(state.username);
		uiElements.loginTime.html(state.loginTime);
		uiElements.lastUpdateTime.html(state.lastUpdateTime);
		uiElements.lastLoginTime.html(state.lastLoginTime);
		uiElements.userIP.html(state.userIP);
	}

	onUpdate(state) {

	}

	getUserDetails() {
	}
}
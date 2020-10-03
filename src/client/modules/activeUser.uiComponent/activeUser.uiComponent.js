'use strict';

import UIComponent from '../uiComponent/uiComponent';
import moment from 'moment';

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
		uiElements.loginTime.html(moment(state.loginTime).format('MMM DD YYYY hh:mm:ss'));
		uiElements.lastUpdateTime.html(moment(state.lastUpdateTime).format('MMM DD YYYY hh:mm:ss'));
		uiElements.lastLoginTime.html(state.lastLoginTime);
		uiElements.userIP.html(state.userIP);
	}

	onUpdate(state) {

	}

	getUserDetails() {
	}
}
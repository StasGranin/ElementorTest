'use strict';

import UIComponent from '../uiComponent/uiComponent';
import moment from 'moment';

import template from './sessionDetails.uiComponent.html';
import './sessionDetails.uiComponent.scss';

export default class SessionDetailsUIComponent extends UIComponent {
	constructor(state) {
		super(state, template);

		this.uiElements.$self.on('click', () => this.remove());
	}

	onAppend() {
		const state = this.state;
		const uiElements = this.uiElements;

		uiElements.userAgent.html(state.userAgent);
		uiElements.signUpTime.html(moment(state.user.signUpTime).format('MMM DD YYYY hh:mm:ss'));
		uiElements.loginCount.html(state.user.loginCount);
	}
}
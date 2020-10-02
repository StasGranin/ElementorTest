'use strict';

import UIComponent from '../uiComponent/uiComponent';
import ActiveUserUIComponent from '../activeUser.uiComponent/activeUser.uiComponent';
import {getActiveUsers} from '../../services/users.service';

import template from './main.uiComponent.html';
import './main.uiComponent.scss';

export default class MainUIComponent extends UIComponent {
	constructor(state) {
		super(state, template);

		this.activeUsersComponents = {};
	}

	onAppend() {
		const {userName} = this.uiElements;

		userName.html(this.state.username);

		this.renderActiveUsers();
	}

	renderActiveUsers() {

		getActiveUsers().then(results => {
			const activeUsers = results.payload;
			const activeUsersSessionLookup = {};
			const {activeUsersComponents, uiElements} = this;
			const {content, activeUsersTable} = uiElements;

			content.removeClass('loading');

			activeUsers.forEach(item => {
				const sid = item._id;
				activeUsersSessionLookup[sid] = true;

				if (activeUsersComponents[sid]) {
					//
				} else {
					activeUsersComponents[sid] = new ActiveUserUIComponent(item);
				}

				activeUsersComponents[sid].appendTo(activeUsersTable);

				console.log(item);
			});

		});
	}
}

'use strict';

import UIComponent from '../uiComponent/uiComponent';
import ActiveUserUIComponent from '../activeUser.uiComponent/activeUser.uiComponent';
import {getActiveUsers} from '../../services/users.service';
import {logOut} from '../../services/auth.service';

import template from './main.uiComponent.html';
import './main.uiComponent.scss';

export default class MainUIComponent extends UIComponent {
	constructor(state) {
		super(state, template);

		this.activeUsersComponents = {};
	}

	onAppend() {
		const {userName, logoutButton} = this.uiElements;
		const state = this.state;

		userName.html(state.username);
		logoutButton.on('click', logOut);

		this.renderActiveUsers();

		setInterval(() => this.renderActiveUsers(), state.pollingInterval);
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
					activeUsersComponents[sid].update(item);
				} else {
					activeUsersComponents[sid] = new ActiveUserUIComponent(item);
				}

				activeUsersComponents[sid].appendTo(activeUsersTable);

				Object.keys(activeUsersComponents).forEach(key => {
					if (!activeUsersSessionLookup[key]) {
						activeUsersComponents[key].remove();
						delete activeUsersComponents[key];
					}
				});
			});

		});
	}
}

'use strict';

import UIComponent from '../uiComponent/uiComponent';
import {signUp, logIn} from '../../services/auth.service';

import template from './mainLogin.uiComponent.html';
import './mainLogin.uiComponent.scss';

export default class MainLoginUIComponent extends UIComponent {
	constructor(state) {
		super(state, template)
	}

	onAppend() {
		const {form, showSignUp, showLogIn} = this.uiElements;

		form.on('submit', this.onFormSubmit.bind(this));
		showSignUp.on('click', this.onShowSignUpClick.bind(this));
		showLogIn.on('click', this.onShowLogInClick.bind(this));
	}

	onShowSignUpClick() {
		this.uiElements.mainLogin.removeClass('showError logInMode').addClass('signUpMode');
		this.state.mode = 'signUp';
	}

	onShowLogInClick() {
		this.uiElements.mainLogin.removeClass('showError signUpMode').addClass('logInMode');
		this.state.mode = 'logIn';
	}

	onFormSubmit(event) {
		let formFields = {};

		event.preventDefault();
		this.uiElements.form.serializeArray().forEach(element => formFields[element.name] = element.value);

		if (!formFields.username.trim() || !formFields.password.trim()) {
			this.showError('Username and Password cannot be empty');
			return;
		}

		if (this.state.mode === 'signUp') {
			if (formFields.password !== formFields.verifyPassword) {
				this.showError('Password mismatch');
				return;
			}

			signUp(formFields.username, formFields.password).then(result => {
				if (result.status === 400) {
					this.showError(result.payload.errorMessage);
				}
			});
		}
		else {
			logIn(formFields.username, formFields.password).then(result => {
				if (result.status === 400) {
					this.showError(result.payload.errorMessage);
				}
			});
		}
	}

	showError(errorMessage) {
		const {mainLogin, error} = this.uiElements;

		mainLogin.addClass('showError');
		error.html(errorMessage);
	}
}

// Abstract UI component module. All other UI modules will inherit from it

'use strict';

export default class UIComponent {

	constructor(appState, templateHTML) {

		this.appState = appState;
		this.state = {};

		if (templateHTML) {
			this.$element = $(templateHTML);
		}
	}

	render($parent) {
		$parent.append(this.$element);
	}
}
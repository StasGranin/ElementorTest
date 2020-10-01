// Abstract UI component module. All other UI modules will inherit from it

'use strict';

export default class UIComponent {

	constructor(state, templateHTML) {

		this.state = state || {}; // Not really a true "state", more like "props" object in React
		this.$element = null;
		this.uiElements = {};

		if (templateHTML) { // Dunno why would you like to have a UI component without the UI but whatever, people are weird you know
			const $element = $(templateHTML); // Sort of like a "Virtual DOM" all the cool kids are talking about

			// Select all DOM elements with "ui" attribute and assign them to an object (with attribute value as the key) for easy access later on
			$('[ui]', $element).each((index, element) => {
				const uiElementName = element.getAttribute('ui');

				this.uiElements[uiElementName] = $(`[ui="${uiElementName}"]`, $element);
			});

			this.$element = $element;
		}
	}

	onAppend() {
	}

	onUpdate(state) {
	}

	onRemove() {
	}

	appendTo($parent) {
		$parent.append(this.$element);
		this.onUpdate(this.state);
		this.onAppend();
	}

	update(state) {
		if (state) {
			this.state = state;
		}

		this.onUpdate(state);
	}

	remove() {
		this.onRemove();
		this.$element && this.$element.remove();
	}
}
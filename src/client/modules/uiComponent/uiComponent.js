// Abstract UI component module. All other UI modules will inherit from it

'use strict';

export default class UIComponent {

	constructor(state, templateHTML) {

		this.appState = appState;
		this.state = state || {};
		this.$element = null;
		this.uiElements = {};

		if (templateHTML) {
			const $element = $(templateHTML);

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

	remove() {
		this.$element && this.$element.remove();
		this.onRemove();

		return this;
	}

	update(state) {
		if (state) {
			this.state = state;
		}

		this.onUpdate(state);

		return this;
	}

	appendTo($parent) {
		$parent.append(this.$element);
		this.onUpdate(this.state);
		this.onAppend();

		return this;
	}
}
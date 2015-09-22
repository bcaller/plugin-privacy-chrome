// Plugin Privacy extension for Chrome by Ben Caller
// Thanks to https://stackoverflow.com/questions/23202136/changing-navigator-useragent-using-chrome-extension
var pluginPrivacy = '(' + function () {
	'use strict';
	var properties = {};
	for(var property in window.navigator) {
		properties[property] = {
			value: window.navigator[property],
			configurable: false,
			enumerable: false,
			writable: false
		};
	}
	properties.plugins = properties.mimeTypes = {
		value: undefined,
		configurable: false,
		enumerable: true,
		writable: false
	}
	var navigator = Object.create(window.navigator);
	Object.defineProperties(navigator, properties);
	Object.defineProperty(window, 'navigator', {
		value: navigator,
		configurable: false,
		enumerable: false,
		writable: false
	});
	console.log("PluginPrivacy has removed the plugins and mimeTypes")
} + ')();';
document.documentElement.setAttribute('onreset', pluginPrivacy);
document.documentElement.dispatchEvent(new CustomEvent('reset'));
document.documentElement.removeAttribute('onreset');
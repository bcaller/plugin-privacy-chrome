// Plugin Privacy extension for Chrome by Ben Caller
// Thanks to https://stackoverflow.com/questions/23202136/changing-navigator-useragent-using-chrome-extension
var pluginPrivacy = '(' + function () {
	'use strict';
	if(!window.navigator.mimeTypes) return;
	
	var properties = {};
	for(var property in window.navigator) {
		var val = window.navigator[property];
		properties[property] = {
			value: typeof(val) == 'function' ? val.bind(window.navigator) : val,
			configurable: false,
			enumerable: false,
			writable: false
		};
	}
	properties.mimeTypes = {
		value: undefined,
		configurable: false,
		enumerable: true,
		writable: false
	};
	properties.plugins = {
		value: {
			length: 0,
			refresh: function() {}
		},
		configurable: false,
		enumerable: true,
		writable: false
	};
	
	//Expose Flash
	//Comment this section out to remove Flash
	var flashMime = window.navigator.mimeTypes["application/x-shockwave-flash"];
	if(flashMime) {
		var flash = flashMime.enabledPlugin;
		properties.mimeTypes.value = {length:1}
		properties.mimeTypes.value["application/x-shockwave-flash"] = flashMime;
		properties.mimeTypes.value[0] = flashMime;
		properties.plugins.value["length"] = 1;
		properties.plugins.value[flash["name"]] = flash;
	}
	
	var navigator = Object.create(window.navigator);
	Object.defineProperties(navigator, properties);
	try {
		Object.defineProperty(window, 'navigator', {
			value: navigator,
			configurable: false,
			enumerable: false,
			writable: false
		});
		console.log("PluginPrivacy has removed the plugins and mimeTypes", location.href)
	} catch(e) {/*Cannot redefine property: navigator*/}
} + ')();';

//Without CSP
document.documentElement.setAttribute('onreset', pluginPrivacy);
document.documentElement.dispatchEvent(new CustomEvent('reset'));
document.documentElement.removeAttribute('onreset');

//With CSP
var script = document.createElement('script');
script.textContent = pluginPrivacy;
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);
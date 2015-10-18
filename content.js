// Plugin Privacy extension for Chrome by Ben Caller
// Thanks to https://stackoverflow.com/questions/23202136/changing-navigator-useragent-using-chrome-extension
var pluginPrivacy = '(' + function () {
	'use strict';
	//Set the following line to false in order to hide the Flash plugin
	//This may prevent websites which use Flash from working
	var ALLOW_FLASH = false;
	
	if(!window.navigator.mimeTypes) return;
	
	function vecw(val, e, c, w) {
		// Makes an object describing a property
		return {
			value: val,
			enumerable: !!e,
			configurable: !!c,
			writable: !!w
		}
	}
	
	var properties = {};
	for(var property in window.navigator) {
		var val = window.navigator[property];
		properties[property] = vecw(typeof(val) == 'function' ? val.bind(window.navigator) : val)
	}
	properties.mimeTypes = vecw({}, true);
	properties.plugins = vecw({}, true);
	
	Object.defineProperty(properties.plugins.value, "refresh", vecw(function() {}));
	
	//Expose Flash
	var flashMime = ALLOW_FLASH && window.navigator.mimeTypes["application/x-shockwave-flash"];
	if(flashMime) {
		var flash = flashMime.enabledPlugin;
		Object.defineProperties(properties.mimeTypes.value, {
			'length': vecw(1),
			"application/x-shockwave-flash": vecw(flashMime, true),
			0: vecw(flashMime)
		})
		Object.defineProperties(properties.plugins.value, {
			'length': vecw(1),
			0: vecw(flash)
		})
		Object.defineProperty(properties.plugins.value, flash["name"], vecw(flash, true))
	} else {
		//Empty 'arrays'
		Object.defineProperty(properties.plugins.value, 'length', vecw(0))
		Object.defineProperty(properties.mimeTypes.value, 'length', vecw(0))
	}
	
	var navigator = Object.create(window.navigator);
	Object.defineProperties(navigator, properties);
	try {
		Object.defineProperty(window, 'navigator', vecw(navigator));
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
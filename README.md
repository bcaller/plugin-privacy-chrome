# Plugin Privacy for Chrome
Stop your browser plugins from being fingerprinted or interrogated. Protect your privacy by hiding navigator.plugins and navigator.mimeType.

##Why ?
Your list of plugins can help identify your browser and allows you to be tracked. See https://panopticlick.eff.org

##Installation
I'm not in the mood to pay Google the $5 for Chrome Web Store registration today so for now we will use an unpacked extension.

1. Clone the repo somewhere ```git clone https://github.com/bcaller/plugin-privacy-chrome.git```
2. Go to chrome://extensions
3. Enable developer mode
4. Click Load unpacked extension
5. Select the plugin-privacy-chrome folder
6. Also optionally check the box "Allow in incognito" next to the Plugin Privacy

##Flash
If you want to expose just Flash player, you can edit your copy of content.js and near the top change false into true ```var ALLOW_FLASH = true;```. Note: this may  actually make your signature more unique (a bad thing) but will stop certain websites from breaking. This is not recommended.
It is also recommended that you turn off Flash autorun to prevent your fonts from being fingerprinted. You will then need to right-click on a Flash element to load it. To do this go to Settings; Show advanced settings; Privacy; Content Settings; Plug-ins; Let me choose when to run plug-in content.
console.log("background load");
console.log(browser);
(function () {
	
	var dictionary = {aaa:2};

	browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
		console.log("got message",message,sendResponse);
		if (message.type === 'get'){
			sendResponse(dictionary[message.varName]);
			// return Promise.resolve(dictionary[message.varName]); // works only on firefox
		}
		if (message.type === 'set'){
			dictionary[message.varName] = message.value;
		}
  });
})();

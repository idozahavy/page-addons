var back = new (class {
 	sendMessage (message, callback=false) {
    var promise = browser.runtime.sendMessage(browser.runtime.id, message);
    if (callback) {
      promise.then(callback);
		}
		return promise;
  }

  /**
   * 
   * @param {string} varName 
   * @return {Promise}
   */
  get(varName) {
		console.log('send get');
    return this.sendMessage({type: "get", varName: varName});
  }
  set(varName, value) {
    this.sendMessage({type: "set", varName: varName, value: value});
  }
})();

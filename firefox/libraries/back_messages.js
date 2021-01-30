var back = new (class {
  sendMessage(message, callback = false) {
    /** @type {Promise} */
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
    return this.sendMessage({type: "get", varName: varName});
  }
  set(varName, value) {
    return this.sendMessage({type: "set", varName: varName, value: value});
  }
  getSiteAddonList() {
    return this.sendMessage({type: "site", locationJson: JSON.stringify(window.location)});
  }

  /**
   *
   * @param {SiteAddon} siteAddon
   */
  addSiteAddon(siteAddon) {
    return this.sendMessage({type: "addSiteAddon", newSiteAddonJson: siteAddon.toJson()});
  }

  saveSiteAddons() {
    return this.sendMessage({type: "saveSiteAddons"});
  }
})();

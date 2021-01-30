console.log("background load");
// (function () {
var dictionary;
var func = new Function("return 1");

var site_addons = [new SiteAddon()];
// {
//   locationAttributes: {
//     host: {
//       truth: ['return value.includes("ksp.co.il");'],
//       falsity: [],
//     },
//     search: {
//       truth: ["return new RegExp(/[&?]select=/).test(value);"],
//       falsity: ["return new RegExp(/[&?]uin=/).test(value);"],
//     },
//   },
//   funcs: {
//     inits: [
//       `
// 			var items = $(".searchproductbox");
// 			for (var idx=0;idx<items.length;idx++) {
// 				var item = items[idx];
// 				var lastDiv = $(item).find("> div").last();
// 				var ele = document.createElement("a");
// 				ele.style = "display: block;text-align: center;font-size: 1.5em;background: blue;color: white;position: absolute;bottom: 5px;width: 100%;";
// 				ele.href = "index.php?uin="+item.attributes["b_uin"].value;
// 				ele.target = "_blank";
// 				ele.onclick = function (event) {event.stopPropagation()};
// 				ele.innerText = "פתח בחלון חדש";
// 				lastDiv.append(ele);
// 			}
// 		`,
//     ],
//   },
// },

function setVar(varName, value) {
  dictionary[varName] = value;
}

function getVar(varName) {
  return dictionary[varName];
}

function getSiteAddons(location) {
  var result_addons = [];
  for (var idx = 0; idx < site_addons.length; ++idx) {
    var addon = site_addons[idx];
    if (SiteAddon.checkLocation(addon, location)) {
      result_addons.push(addon);
    }
  }
  return result_addons;
}

function convertAddonsToJsonList(addons) {
  var json_list = [];
  for (var idx = 0; idx < addons.length; idx++) {
    json_list.push(addons[idx].toJson());
  }
  return json_list;
}

/**
 *
 * @param {SiteAddon} newSiteAddon
 */
function addSiteAddon(newSiteAddon) {
  site_addons.push(newSiteAddon);
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("got message", message, sendResponse);
  switch (message.type) {
    case "get":
      return sendResponse(getVar(message.varName));
      // return Promise.resolve(dictionary[message.varName]); // works only on firefox
      break;
    case "set":
      setVar(message.varName, message.value);
      break;
    case "site":
      var location = JSON.parse(message.locationJson);
      var addons = getSiteAddons(location);
      return sendResponse(convertAddonsToJsonList(addons));
      break;
    // CRUD: create retrieve update delete
    case "addSiteAddon":
      addSiteAddon(SiteAddon.fromJson(message.newSiteAddonJson));
      break;
    case "reloadSiteAddons":
			populateData();
      break;
    case "saveSiteAddons":
			saveData();
      break;
    case "getSiteAddons":
      break;
    case "updateSiteAddon":
      break;
    case "deleteSiteAddon":
      break;
  }
  return sendResponse();
});

function saveData() {
  var siteAddonJsonList = [];
  for (var i = 0; i < site_addons.length; i++) {
    siteAddonJsonList.push(site_addons[i].toJson());
  }
  return browser.storage.local.set({
    siteAddonJsonList: siteAddonJsonList,
    dictionary: dictionary,
  });
}
function populateData() {
  return browser.storage.local.get().then((data) => {
    site_addons = [];
    for (var i = 0; i < data.siteAddonJsonList.length; i++) {
      site_addons.push(SiteAddon.fromJson(data.siteAddonJsonList[i]));
    }
    dictionary = data.dictionary;
  });
}

populateData();

// })();

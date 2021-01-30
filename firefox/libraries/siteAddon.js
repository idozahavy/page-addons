class SiteAddons extends Array {}

/**
 *
 * @param {[LocationAttribute]} locationAttributes
 * @param {SiteAddonFuncs} funcs
 */
function SiteAddon(locationAttributes, funcs) {
  this.locationAttributes = locationAttributes;
  this.funcs = funcs;
}

/**
 *
 * @param {string} name
 * @param {[string]} truths
 * @param {[string]} falsities
 */
function LocationAttribute(name, truths, falsities) {
  this.name = name;
  this.truths = truths;
	this.falsities = falsities;
	if (!truths){
		this.truths = [];
	}
	if (!falsities){
		this.falsities = [];
	}
}

/**
 *
 * @param {[string]} inits
 */
function SiteAddonFuncs(inits) {
  this.inits = inits;
}

// #region prototypes

// #region SiteAddon

/**
 * 
 * @param {SiteAddon} addon 
 * @param {*} location 
 */
SiteAddon.checkLocation = function (addon, location) {
  var false_func, truth_func;
  for (var idx= 0;idx<addon.locationAttributes.length;idx++) {
		var location_attr = addon.locationAttributes[idx];

    for (var false_idx = 0; false_idx < location_attr.falsities.length; false_idx++) {
      false_func = location_attr.falsities[false_idx];
      if (false_func(location[location_attr.name], location) !== false) {
        return false;
      }
    }
    for (var true_idx = 0; true_idx < location_attr.truths.length; true_idx++) {
      truth_func = location_attr.truths[true_idx];
      if (truth_func(location[location_attr.name], location) !== true) {
        return false;
      }
    }
  }
  return true;
};
SiteAddon.prototype.checkLocation = function (location) {
  return SiteAddon.checkLocation(this, location);
};

//#region funcs de/constructors

/**
 *
 * @param {SiteAddon} addon
 */
SiteAddon.deconstructFunctions = function (addon) {
  for (var func_type in addon.funcs) {
    for (var idx = 0; idx < addon.funcs[func_type].length; idx++) {
      if (typeof addon.funcs[func_type][idx] === "function") {
        addon.funcs[func_type][idx] = addon.funcs[func_type][idx].toString();
      }
    }
  }
  for (var idx = 0; idx < addon.locationAttributes.length; idx++) {
    var locationAttribute = addon.locationAttributes[idx];
    for (var truth_idx = 0; truth_idx < locationAttribute.truths.length; truth_idx++) {
      if (typeof locationAttribute.truths[truth_idx] === "function") {
        locationAttribute.truths[truth_idx] = locationAttribute.truths[truth_idx].toString();
      }
    }
    for (var falsity_idx = 0; falsity_idx < locationAttribute.falsities.length; falsity_idx++) {
      if (typeof locationAttribute.falsities[falsity_idx] === "function") {
        locationAttribute.falsities[falsity_idx] = locationAttribute.falsities[falsity_idx].toString();
      }
    }
  }
  return addon;
};
SiteAddon.prototype.deconstructFunctions = function () {
  return SiteAddon.deconstructFunctions(this);
};

/**
 *
 * @param {SiteAddon} addon
 */
SiteAddon.constructFunctions = function (addon) {
  for (var func_type in addon.funcs) {
    for (var idx = 0; idx < addon.funcs[func_type].length; idx++) {
      if (typeof addon.funcs[func_type][idx] === "string") {
				var function_string = addon.funcs[func_type][idx];
				function_string = function_string.substr(0, function_string.lastIndexOf("}"));
				function_string = function_string.substring(function_string.indexOf("{")+1, function_string.length);
        addon.funcs[func_type][idx] = new Function("value", "location", function_string);
      }
    }
  }
  for (var idx = 0; idx < addon.locationAttributes.length; idx++) {
    var locationAttribute = addon.locationAttributes[idx];
    for (var truth_idx = 0; truth_idx < locationAttribute.truths.length; truth_idx++) {
      if (typeof locationAttribute.truths[truth_idx] === "string") {
				var function_string = locationAttribute.truths[truth_idx];
				function_string = function_string.substr(0, function_string.lastIndexOf("}"));
				function_string = function_string.substring(function_string.indexOf("{")+1, function_string.length);
        locationAttribute.truths[truth_idx] = new Function("value", "location", function_string);
      }
    }
    for (var falsity_idx = 0; falsity_idx < locationAttribute.falsities.length; falsity_idx++) {
      if (typeof locationAttribute.falsities[falsity_idx] === "string") {
				var function_string = locationAttribute.falsities[falsity_idx];
				function_string = function_string.substr(0, function_string.lastIndexOf("}"));
				function_string = function_string.substring(function_string.indexOf("{")+1, function_string.length);
        locationAttribute.falsities[falsity_idx] = new Function("value", "location", function_string);
      }
    }
  }

  return addon;
};
SiteAddon.prototype.constructFunctions = function () {
  return SiteAddon.constructFunctions(this);
};

//#endregion

SiteAddon.fromJson = function (json) {
	var result = new SiteAddon();
	result = Object.assign(result, JSON.parse(json));
	result.constructFunctions();
  return result;
};

SiteAddon.toJson = function (addon) {
  return JSON.stringify(addon, function (key, value) {
    if (typeof value === "function") {
      return value.toString();
    }
    return value;
  });
};
SiteAddon.prototype.toJson = function () {
  return SiteAddon.toJson(this);
};

//#endregion

// #region SiteAddons

SiteAddons.filterByLocation = function (site_addon_list, location) {
  var result_addon_list = [];
  for (var idx = 0; idx < site_addon_list.length; ++idx) {
    var addon = site_addon_list[idx];
    if (SiteAddon.checkLocation(addon, location)) {
      result_addon_list.push(addon);
    }
  }
  return result_addon_list;
};

//#endregion

// #endregion

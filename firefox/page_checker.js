// back.sendMessage({type: "site", location: window.location});
back.getSiteAddonList().then((addons_json_list) => {
  for (var idx = 0; idx < addons_json_list.length; idx++) {
		var addon = SiteAddon.fromJson(addons_json_list[idx]);
		addon.constructFunctions();
		
		if (addon.funcs.inits) {
      for (var jdx=0; jdx < addon.funcs.inits.length;jdx++) {
        addon.funcs.inits[jdx]();
      }
    }
	}
});

// if (window.location.search.includes("select=")) {
// 	var items = $(".searchproductbox");
// 	for (var idx=0;idx<items.length;idx++) {
// 		var item = items[idx];
// 		var lastDiv = $(item).find("> div").last();

// 		var ele = document.createElement("a");
// 		ele.style = "display: block;text-align: center;font-size: 1.5em;background: blue;color: white;position: absolute;bottom: 5px;width: 100%;";
// 		ele.href = `index.php?uin=${item.attributes["b_uin"].value}`;
// 		ele.target = "_blank";
// 		ele.onclick = function (event) {event.stopPropagation()};
// 		ele.innerText = "פתח בחלון חדש";
// 		lastDiv.append(ele);
// 	}
// 	console.log("end");
// }

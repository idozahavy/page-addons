$("#addKspBtn").click(function () {
  back.addSiteAddon(
    new SiteAddon(
      [
        new LocationAttribute("host", [
          function (value) {
            return value.includes("ksp.co.il");
          },
        ]),
      ],
      new SiteAddonFuncs([
        function () {
          var items = $(".searchproductbox");
          for (var idx = 0; idx < items.length; idx++) {
            var item = items[idx];
            var lastDiv = $(item).find("> div").last();
            var ele = document.createElement("a");
            ele.style =
              "display: block;text-align: center;font-size: 1.5em;background: blue;color: white;position: absolute;bottom: 5px;width: 100%;";
            ele.href = "index.php?uin=" + item.attributes["b_uin"].value;
            ele.target = "_blank";
            ele.onclick = function (event) {
              event.stopPropagation();
            };
            ele.innerText = "פתח בחלון חדש";
            lastDiv.append(ele);
          }
        },
      ]),
    ),
  ).then(back.saveSiteAddons());
});

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

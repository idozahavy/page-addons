if (window.location.search.includes("select=")) {
	var items = $(".searchproductbox");
	for (var idx=0;idx<items.length;idx++) {
		var item = items[idx];
		var lastDiv = $(item).find("> div").last();

		var ele = document.createElement("a");
		ele.style = "display: block;text-align: center;font-size: 1.5em;background: blue;color: white;position: absolute;bottom: 5px;width: 100%;";
		ele.href = `index.php?uin=${item.attributes["b_uin"].value}`;
		ele.target = "_blank";
		ele.onclick = function (event) {event.stopPropagation()};
		ele.innerText = "פתח בחלון חדש";
		lastDiv.append(ele);
	}
	console.log("end");
}

	// var aaa = back.get("aaa");
	// aaa.then(console.log);
	// console.log(back.get("aaa"));
	// console.log(123);
	// sendMessage({type:"get",varName:"aaa"},(data)=>{console.log(data)});


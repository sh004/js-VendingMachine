var pay = 0;									//支払い金額合計
var num = document.getElementById("num");		//金額表示：金額
var en = document.getElementById("en");			//金額表示：円マーク

var one = document.getElementsByClassName("one");		//ボタン：110円
var three = document.getElementsByClassName("three");	//ボタン：130円
var six = document.getElementsByClassName("six");		//ボタン：160円

var purchaseNum = 0;
var itemName = [];		//商品名
var itemPrice = 0;		//商品の値段

var change = 0;							//おつり総計
var paper = 0, coin = 0;				//おつり紙幣, おつり硬貨
var getPaper = new Boolean(false);		//判定：紙幣返却用
var getCoin = new Boolean(false);		//判定：硬貨返却用


//--------------- お金投入,挿入処理 ---------------//
$(function(){
	$(".money").draggable({
		revert: true
	});
	$("#frameC-2").droppable({
		accept : ".money",
		drop : function(event , ui){
					var dragId = ui.draggable.attr("id");
					
					if ($(this).find(".drop" + dragId).length == 0) {
						var a = 0, b = 0;
						switch (dragId){
							case 'sen':		a = 1000;
											break;
							case 'ju':		a = 10;
											break;
							case 'goju':	a = 50;
											break;
							case 'hyaku':	a = 100;
											break;
							case 'gohyaku':	a = 500;
											break;
						}
						b = pay + a;
						if (b > 4200) {
							document.text.backlog.value += "上限に達しました。\n";
							goBottom();
							
							change += a;
							if (a == 1000) {
								paper += a;
								getPaper = true;
							} else {
								coin += a;
								getCoin = true;
							}
							change = 0;
						} else {
							pay += a;
							num.innerText = pay;
							num.style.color = "#ab3b3a";
							en.style.color = "#ab3b3a";
						}
					}
				}
	});
});

//--------------- 商品購入処理 ---------------//
//商品ボタン押下
function buttonEnter(btnNo) {
	switch(btnNo) {
		case 1: itemName[purchaseNum] = "コカ･コーラ";
				itemPrice = 160;
				purchaseNum++;
				break;
		case 2: itemName[purchaseNum] = "アクエリアス";
				itemPrice = 160;
				purchaseNum++;
				break;
		case 3: itemName[purchaseNum] = "い･ろ･は･す";
				itemPrice = 110;
				purchaseNum++;
				break;
		case 4: itemName[purchaseNum] = "スプライト";
				itemPrice = 160;
				purchaseNum++;
				break;
		case 5: itemName[purchaseNum] = "ファンタ グレープ";
				itemPrice = 160;
				purchaseNum++;
				break;
		case 6: itemName[purchaseNum] = "コーヒー";
				itemPrice = 130;
				purchaseNum++;
				break;
		case 7: itemName[purchaseNum] = "カフェラテ";
				itemPrice = 130;
				purchaseNum++;
				break;
		case 8: itemName[purchaseNum] = "爽健美茶";
				itemPrice = 130;
				purchaseNum++;
				break;
		case 9: itemName[purchaseNum] = "コーンポタージュ";
				itemPrice = 130;
				purchaseNum++;
				break;
		case 10: itemName[purchaseNum] = "おしるこ";
				 itemPrice = 130;
				 purchaseNum++;
				 break;
		case 11: itemName[purchaseNum] = "ホットレモン";
				 itemPrice = 130;
				 purchaseNum++;
				 break;
		case 12: itemName[purchaseNum] = "贅沢ミルクココア";
				 itemPrice = 130;
				 purchaseNum++;
				 break;
		case 13: itemName[purchaseNum] = "紅茶花伝";
				 itemPrice = 130;
				 purchaseNum++;
				 break;
	}
	
	if (pay < itemPrice) {
		document.text.backlog.value += itemPrice - pay + "円足りません。\n";
		goBottom();
		purchaseNum--;
		itemName[purchaseNum] = "";
	} else {
		pay = pay - itemPrice;
		num.innerText = pay;
		
		if (num.innerText == "0") {
			pay = 0;
			num.innerText = "0000";
			num.style.color = "#1c1c1c";
			en.style.color = "#1c1c1c";
		}
	}
}
//商品取り出し
function outputItem() {
	var all = "";
	if(itemName.length == 0){
		document.text.backlog.value += "商品を購入してください。";
		goBottom();
	} else {
		for (var i = 0; i <= purchaseNum-1; i++) {
			if (i == 0) {
				all += itemName[i];
			} else {
				all += ", " + itemName[i];
			}
		}
		if (purchaseNum == 1) {
			document.text.backlog.value += all + "を購入しました。";
		} else if (purchaseNum > 1) {
			document.text.backlog.value += all + "\n以上の" + purchaseNum + "本を購入しました。";
		} else {
			document.text.backlog.value += "商品を購入してください。";
		}
		goBottom();
		itemName = [];
		purchaseNum = 0;
	}
	document.text.backlog.value += "\n";
	goBottom();
}

//--------------- お金返却処理 ---------------//
//レバーを引く
function hasPulled() {
	document.text.backlog.value += "返却レバーを引きました。\n";
	goBottom();
	
	change += pay;
	pay = 0;
	num.innerText = "0000";
	num.style.color = "#1c1c1c";
	en.style.color = "#1c1c1c";
	
	//紙幣のおつり
	paper += Math.floor(change / 1000) * 1000;
	getPaper = true;
	
	//硬貨のおつり
	var b = 0;
	b =+ (change + '').slice(-3);
	coin += (b - 0);
	getCoin = true;
	
	change = 0;
}
//紙幣返却
function returnPaper() {
	if (getPaper == true) {
		if(paper == 0){
			document.text.backlog.value += "おつりはありません。";
		} else {
			document.text.backlog.value += paper + "円が返却されました。";
			paper = 0;
		}
		getPaper =false;
	} else {
		document.text.backlog.value += "おつりはありません。";
	}
	document.text.backlog.value += "\n";
	goBottom();
}
//硬貨返却
function returnCoin() {
	if (getCoin == true) {
		if(coin == 0){
			document.text.backlog.value += "おつりはありません。";
		} else {
			document.text.backlog.value += coin + "円が返却されました。";
			coin = 0;
		}
		getCoin = false;
	} else {
		document.text.backlog.value += "おつりはありません。";
	}
	document.text.backlog.value += "\n";
	goBottom();
}

//--------------- バックログ ---------------//
function goBottom(){
    var obj = document.getElementById("backlog");
    if(!obj) return;
    obj.scrollTop = obj.scrollHeight;
}
/*　メモ
	・お金の投入ができない
	・ボタンが光らない
	・商品を一度に複数購入できない	←配列で解決？
*/

var pay = 0;									//支払い金額合計
var num = document.getElementById("num");		//金額表示：金額
var en = document.getElementById("en");			//金額表示：円マーク

var one = document.getElementsByClassName("one");		//ボタン：110円
var three = document.getElementsByClassName("three");	//ボタン：130円
var six = document.getElementsByClassName("six");		//ボタン：160円

var itemName = "";		//商品名
var itemPrice = 0;		//商品の値段

var change = 0;			//おつり総計
var paper, coin;		//おつり紙幣, おつり硬貨
var getPaper = new Boolean(false);		//判定：紙幣返却用
var getCoin = new Boolean(false);		//判定：硬貨返却用


//----- お金投入,挿入処理 -----//
function handleDragStart(e) {
	this.style.opacity = '0.4';
}
function handleDragOver(e) {
	if (e.preventDefault) {
		e.preventDefault();
	}
	e.dataTransfer.dropEffect = 'move';
	return false;
}
function handleDragEnter(e) {
	this.classList.add('over');
}
function handleDragLeave(e) {
	this.classList.remove('over');
}
function handleDrop(e) {
	if (e.stopPropagation) {
		e.stopPropagation();
	}
	return false;
}

function handleDragEnd(e) {
	this.style.opacity = '1';
	[].forEach.call(cols, function (col) {
		col.classList.remove('over');
	});
}
var cols = document.querySelectorAll('#wallet .money');
[].forEach.call(cols, function(col) {
	col.addEventListener('dragstart', handleDragStart, false);
	col.addEventListener('dragenter', handleDragEnter, false)
	col.addEventListener('dragover', handleDragOver, false);
	col.addEventListener('dragleave', handleDragLeave, false);
	col.addEventListener('drop', handleDrop, false);
	col.addEventListener('dragend', handleDragEnd, false);
});

/*--------------- ここから仮 ---------------*/
//金額表示
pay = 1200;
if (pay > 0) {
	num.innerText = pay;
	num.style.color = "#ab3b3a";
	en.style.color = "#ab3b3a";
}
//ボタン発光
if (pay >= 110 && pay < 130) {

} else if (pay >= 130 && pay < 160) {

} else if (pay >= 160 && pay <= 4200) {

} else {
}
/*--------------- ここまで仮 ---------------*/

//----- 商品購入処理 -----//
//商品ボタン押下
function buttonEnter(btnNo) {
	switch(btnNo) {
		case 1: itemName = "コカ･コーラ";
				itemPrice = 160;
				break;
		case 2: itemName = "アクエリアス";
				itemPrice = 160;
				break;
		case 3: itemName = "い･ろ･は･す";
				itemPrice = 110;
				break;
		case 4: itemName = "スプライト";
				itemPrice = 160;
				break;
		case 5: itemName = "ファンタ グレープ";
				itemPrice = 160;
				break;
		case 6: itemName = "コーヒー";
				itemPrice = 130;
				break;
		case 7: itemName = "カフェラテ";
				itemPrice = 130;
				break;
		case 8: itemName = "爽健美茶";
				itemPrice = 130;
				break;
		case 9: itemName = "コーンポタージュ";
				itemPrice = 130;
				break;
		case 10: itemName = "おしるこ";
				 itemPrice = 130;
				 break;
		case 11: itemName = "ホットレモン";
				 itemPrice = 130;
				 break;
		case 12: itemName = "贅沢ミルクココア";
				 itemPrice = 130;
				 break;
		case 13: itemName = "紅茶花伝";
				 itemPrice = 130;
				 break;
		default: itemName ="";
	}
	
	if (pay < itemPrice) {
		document.text.backlog.value += itemPrice - pay + "円足りません。\n";
		goBottom();
		itemName ="";
	} else {
		pay = pay - itemPrice;
		num.innerText = pay;
	}
}
//商品取り出し
function outputItem() {
	if(itemName == ""){
		document.text.backlog.value += "商品を購入してください。";
		goBottom();
	} else {
		document.text.backlog.value += itemName + "を購入しました。";
		goBottom();
		itemName = "";
	}
	document.text.backlog.value += "\n";
	goBottom();
}

//----- お金返却処理 -----//
//レバーを引く
function hasPulled() {
	change = pay;
	pay = 0000;
	num.style.color = "#1c1c1c";
	en.style.color = "#1c1c1c";
	
	//紙幣のおつり
	paper = Math.floor(change / 1000) * 1000;
	getPaper = new Boolean(true);
	
	//硬貨のおつり
	coin =+ (change + '').slice(-3);
	getCoin = new Boolean(true);
	
	document.text.backlog.value += "返却レバーを引きました。\n";
	goBottom();
}
//紙幣返却
function returnPaper() {
	if (getPaper == true) {
		if(paper == 0){
			document.text.backlog.value += "おつりはありません。";
		} else {
			document.text.backlog.value += paper + "円が返却されました。";
		}
		getPaper = new Boolean(false);
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
		}
		getCoin = new Boolean(false);
	} else {
		document.text.backlog.value += "おつりはありません。";
	}
	document.text.backlog.value += "\n";
	goBottom();
}

//----- バックログ -----//
function goBottom(){
    var obj = document.getElementById("backlog");
    if(!obj) return;
    obj.scrollTop = obj.scrollHeight;
}
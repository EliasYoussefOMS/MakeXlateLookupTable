class lookupTableItem {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	};

	getLine() {
		let line;
		line = "/" + this.left + "/" + this.right.replace(/(\/)|(,)|(')/gm, this.replacer) + "/";
		return line;
	}

	replacer(match, p1, p2, p3) {
		if (p1) {
			return " ";
		} else if (p2||p3) {
			return "";
		}
	}
}

var rows = document.querySelector(".ui-dialog-content.ui-widget-content#dialog3").getElementsByTagName("TBODY")[0].children;
var left, right;
var lookupTableItemsArr = [];
Array.from(rows).forEach((elm) => {
	left = elm.getElementsByClassName("cd")[0].textContent;
	right = elm.getElementsByClassName("name")[0].textContent;
	let item = new lookupTableItem(left, right);
	lookupTableItemsArr.push(item);
});
var fileContent = "";
lookupTableItemsArr.forEach((elm) => {
	fileContent += elm.getLine() + "\r\n";
});
var NBTextFile = null;

function makeTextFile(fileContentText) {
	let data = new Blob([fileContentText], {type: 'text/plain'});
	if (NBTextFile !== null) {
		window.URL.revokeObjectURL(NBTextFile);
	}
	NBTextFile = window.URL.createObjectURL(data);
	return NBTextFile;
}

var linkElement = document.createElement("A");
linkElement.download = "LookupTable.tbl";
linkElement.href = makeTextFile(fileContent);
linkElement.click();
/**
 * Created by liujie .
 */
/*jshint -W065,-W098 */

/*global BMap:false, glMap:false, ClassBase:false */
function LayerManager() {
	// 默认停靠位置和偏移量
	this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
	this.defaultOffset = new BMap.Size(100, 100);
	
	this.map = null;
	this.layers = null;
	
	this.div = null;
	this.contentFrame = null;
	
	this.CLASS_NAME = "LayerManager";
	
	this.contentVisibility = false;
	
	var div = document.createElement("div");
	this.div = div;
	var btn = document.createTextNode("图层管理");
	div.appendChild(btn);
	
	div.style.cursor = "pointer";
	div.style.border = "2px solid red";
	div.style.backgroundColor = "gray";
	btn.onclick = ClassBase.bindFunctionScope(this, this.toggleContent);
	
	var contentFrame = document.createElement("div");
	this.contentFrame = contentFrame;
	//contentFrame.style.display = "none";
	div.appendChild(contentFrame);
	
}
LayerManager.prototype = new BMap.Control();
LayerManager.prototype.initialize = function (map) {
	this.map = map;
	
	return this.div;
};

LayerManager.prototype.setLayers = function (bMapLayers) {
	if (ClassBase.isArray(bMapLayers)) {
		this.clearContent();
		this.layers = bMapLayers;
		this.genContent();
	}
};
LayerManager.prototype.toggleContent = function (evt) {
	if (this.contentVisibility) {
		this.contentFrame.style.display = "none";
	} else {
		this.contentFrame.style.display = "block";
	}
};
LayerManager.prototype.clearContent = function () {
	this.contentFrame.innerHTML = "";
};
LayerManager.prototype.onItemClick = function (evt) {
	alert(evt.toString());
};
LayerManager.prototype.genContent = function () {
	
	if (this.layers) {
		var isChecked = "";
		for (var l in this.layers) {
			if (this.layers.hasOwnProperty(l)) {
				isChecked = l.visibility ? "checked" : "none";
				var item = document.createElement("input");
				item.name = "layerManager";
				item.type = "checkbox";
				item.value = l.id;
				item.checked = isChecked;
				item.onclick = ClassBase.bindFunctionScope(this, this.onItemClick);
				this.contentFrame.appendChild(item);
			}
		}
	}
};




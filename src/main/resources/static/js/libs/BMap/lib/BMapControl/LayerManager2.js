/**
 * Created by liujie .
 */
/*jshint -W065,-W098 */

/*global OpenLayers:false, glMap:false, ClassBase:false */


var LayerManager = ClassBase.extend({
	map: null,
	layers: null,
	
	div: null,
	contentFrame: null,
	
	contentVisibility: false,
	
	onMapZoomed: null,
	
	layerElements: null,
	
	init: function (options) {
		ClassBase.combine(this, options);
		this.base(options);
		
		var div = document.createElement("div");
		div.className = "layerManager";
		this.div = div;
		var btn = document.createElement("div");
		btn.className = "layerManagerBtn";
		div.appendChild(btn);
		
		btn.style.cursor = "pointer";
		btn.title="图层控制";
		btn.onclick = ClassBase.bindFunctionScope(this, this.toggleContent);
		
		var contentFrame = document.createElement("div");
		contentFrame.className = "layerManagerFrame";
		this.contentFrame = contentFrame;
		contentFrame.style.display = "none";
		div.appendChild(contentFrame);
		
		this.onMapZoomed = ClassBase.bindFunctionScope(this, this.mapZoomEnd);
		this.map.addEventListener("zoomend", this.onMapZoomed);
		
		this.layerElements = [];
		
	},
	getDomObject: function () {
		return this.div;
	},
	setLayers: function (bMapLayers) {
		if (ClassBase.isArray(bMapLayers)) {
			this.clearContent();
			this.layers = bMapLayers;
			this.genContent();
		}
	},
	toggleContent: function (evt) {
		if (this.contentVisibility) {
			this.contentFrame.style.display = "none";
		} else {
			this.contentFrame.style.display = "block";
		}
		this.contentVisibility = !this.contentVisibility;
	},
	clearContent: function () {
		this.contentFrame.innerHTML = "";
	},
	toggleLayer: function (layerID) {
		for (var i = 0; i < this.layers.length; i++) {
			if (this.layers[i].id === layerID) {
				this.layers[i].setVisibility(!this.layers[i].visibility);
			}
		}
	},
	onItemClick: function (evt) {
		var layerID = evt.target.value;
		this.toggleLayer(layerID);
	},
	genContent: function () {
		
		if (this.layers) {
			var layers = this.layers;
			var isChecked = "";
			for (var l in layers) {
				if (layers.hasOwnProperty(l)) {
					var tmpDiv = document.createElement("div");
					isChecked = layers[l].visibility ? "checked" : "none";
					var item = document.createElement("input");
					item.name = "layerManager";
					item.type = "checkbox";
					item.value = layers[l].id;
					item.checked = isChecked;
					item.disabled = !layers[l].getIsShow();
					item.onclick = ClassBase.bindFunctionScope(this, this.onItemClick);
					this.layerElements.push(item);
					tmpDiv.appendChild(item);
					tmpDiv.appendChild(document.createTextNode(layers[l].layerName));
					this.contentFrame.appendChild(tmpDiv);
				}
			}
		}
	},
	mapZoomEnd: function (evt) {
		if (this.layers && this.layerElements) {
			var layers = this.layers;
			var els = this.layerElements;
			for (var l in layers) {
				if (layers.hasOwnProperty(l)) {
					for (var el in els) {
						if (els.hasOwnProperty(el)) {
							if (layers[l].id === els[el].value) {
								els[el].disabled = !layers[l].getIsShow();
							}
						}
					}
				}
			}
		}
	},
	destroy: function () {
		if (this.bMap) {
			this.bMap.removeEventListener("zoomend", this.onMapZoomed);
		}
		this.onMapZoomed = null;
	},
	CLASS_NAME: "LayerManager"
});

/**
 * Created by liujie .
 */
/* jshint -W065,-W098 */

/* global IDUtils:false, BMap:false, ClassBase:false */

var BMapLayer = ClassBase.extend({
	
	id: null,
	
	bMap: null,
	
	wkt: null,
	
	mapZoom: null,
	
	features: null,
	
	visibility: true,
	
	layerName: "",
	
	isDisplayInManager: true,
	
	contentType: null,
	
	maxZoom: 19,// 19
	
	minZoom: 1,// 12
	
	renderField: null,
	
	renderType: null,
	
	labelField: "",
	
	enableLabel: false,
	
	showOnAdd: false,
	
	dataUrl: "",
	
	dataLoader: null,
	
	dataLoaderOptions: null,
	
	overlayHandler: null,
	
	init: function (options) {
		ClassBase.combine(this, options);
		this.id = IDUtils.getID(this.idPreFix);
	},
	getVisibility: function () {
		return this.visibility;
	},
	getIsShow: function () {
		return this.mapZoom >= this.minZoom && this.mapZoom <= this.maxZoom;
	},
	setVisibility: function (isShow) {
		if ((this.visibility !== isShow)) {
			this.visibility = isShow;
		}
		this.reDraw();
	},
	getRenderLevel: function (zoom) {
		var v = parseInt(zoom);
		switch (v) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
				return 12;
			case 18:
			case 19:
				return 16;
			default:
				return 12;
		}
	},
	
	addGeometryFromWKT: function (data, style) {
		
	},
	
	isFeatureLoaded: function (id) {
		for (var i = 0; i < this.features.length; i++) {
			var f = this.features[i];
			if (id === f.attributes.id) {
				return true;
			}
		}
		return false;
	},
	bindOverlayEvents: function (ol) {
		if (this.overlayHandler && this.overlayHandler.eventsHandler) {
			this.overlayHandler.registerOverlayEvents(ol);
		}
	},
	bindOverlayMenu: function (ol) {
		if (this.overlayHandler && this.overlayHandler.contextMenu) {
			this.overlayHandler.appendContextMenu(ol);
		}
	},
	setLableEnabled: function (enable) {
		this.enableLabel = enable;
	},
	
	mapZoomEnd: function (evt) {
		this.mapZoom = this.bMap.getZoom();
		var ext = this.bMap.getBounds();
		this.dataLoader.setBounds(ext);
		if (this.visibility && (this.mapZoom >= this.minZoom && this.mapZoom <= this.maxZoom)) {
			this.dataLoader.loadData();
		} else {
			this.removeFromMap();
		}
	},
	refreshData: function () {
		var wktExtent = this.getViewBounds();
		var extent = this.wkt.read(wktExtent);
	},
	getViewBounds: function () {
		var bounds = this.bMap.getBounds();
		var minX, maxY, maxX, minY;
		minX = bounds.getSouthWest().lng;
		maxX = bounds.getNorthEast().lng;
		minY = bounds.getSouthWest().lat;
		maxY = bounds.getNorthEast().lat;
		var wktExtent = "polygon((" + minX;
		wktExtent += " ";
		wktExtent += minY;
		wktExtent += ",";
		wktExtent += maxX;
		wktExtent += " ";
		wktExtent += minY;
		wktExtent += ",";
		wktExtent += maxX;
		wktExtent += " ";
		wktExtent += maxY;
		wktExtent += ",";
		wktExtent += minX;
		wktExtent += " ";
		wktExtent += maxY;
		wktExtent += ",";
		wktExtent += minX;
		wktExtent += " ";
		wktExtent += minY;
		wktExtent += "))";
		return wktExtent;
	},
	reDraw: function () {
		var wktExtent = this.getViewBounds();
		var extent = this.wkt.read(wktExtent);
		for (var i = 0; i < this.features.length; i++) {
			var f = this.features[i];
			var geom = f.geometry;
			if (!geom.intersects(extent)) {
				this.removeOverlay(f);
				this.features.splice(i, 1);
				--i;
			}
		}
		
		if (this.visibility && this.mapZoom && this.mapZoom >= this.minZoom && this.mapZoom <= this.maxZoom) {
			this.showInMap();
		} else {
			this.removeFromMap();
		}
	},
	
	transform: function (points) {
		var bPoints = [];
		for (var i = 0; i < points.length; i++) {
			bPoints.push(new BMap.Point(points[i].x, points[i].y));
		}
		return bPoints;
	},
	
	removeFromMap: function () {
		for (var i = 0; i < this.features.length; i++) {
			var f = this.features[i];
			for (var j = 0; j < f.BMapOverlays.length; j++) {
				var ol = f.BMapOverlays[j];
				this.bMap.removeOverlay(ol);
			}
		}
	},
	
	
	clearData: function () {
		this.clearOverlay();
		this.features = [];
	},
	clearOverlay: function () {
		this.removeFromMap();
	},
	
	removeOverlay: function (feature) {
		for (var j = 0; j < feature.BMapOverlays.length; j++) {
			var ol = feature.BMapOverlays[j];
			this.bMap.removeOverlay(ol);
		}
	},
	destroy: function () {
		this.features = null;
		this.bMap = null;
	},
	CLASS_NAME: "BMapLayer"
});

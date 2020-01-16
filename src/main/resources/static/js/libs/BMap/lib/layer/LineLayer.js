/**
 * Created by liujie .
 */
/* jshint -W065,-W098 */

/*
 * global
 * geoFormat:false,DataLoader:false,BMap:false,BMapLayer:false,Feature:false,ClassBase:false
 */

BMapLayer.LineLayer = BMapLayer.extend({
	
	idPreFix: "LineLayer",
	
	// 地图事件绑定函数
	
	onMapZoomed: null,
	
	init: function (options) {
		ClassBase.combine(this, options);
		this.base("init", options);
		
		if (!this.bMap) {
			throw new Error("传入地图为空！");
		}
		this.features = [];
		this.bMapOverlays = [];
		this.dataLoader = new DataLoader({
			layer: this,
			wktField: this.dataLoaderOptions.wktField,
			dataUrl: this.dataUrl
		});
		this.wkt = this.wkt ? this.wkt : new geoFormat.WKT();
		// 绑定地图绽放事件
		this.onMapZoomed = ClassBase.bindFunctionScope(this, this.mapZoomEnd);
		this.bMap.addEventListener("zoomend", this.onMapZoomed);
		this.bMap.addEventListener("moveend", this.onMapZoomed);
	},
	addGeometryFromWKT: function (data, lineStyle) {
		if (lineStyle) {
			this.renderType = lineStyle;
		}
		var id = data.attributes.id;
		var name = data.attributes.name;
		var isLoaded = this.isFeatureLoaded(id);
		if (isLoaded) {
			return;
		}
		var geom = this.wkt.read(data.wkt);
		
		var zoom = this.getRenderLevel(this.mapZoom);
		var typeId;
		if (this.renderField && this.renderField !== '') {
			typeId = data.attributes[this.renderField];
		} else {
			typeId = "default";
		}
		var style = this.renderType[typeId][zoom];
		var feature = new Feature(geom, data.attributes);
		feature.layer = this;
		
		var line = null;
		var bLine = null;
		var points = null;
		var bPoints = null;
		var isAdd = this.visibility && this.mapZoom
			&& this.mapZoom >= this.minZoom && this.mapZoom <= this.maxZoom
			&& this.showOnAdd;
		// 拆分polyline为line
		if (geom.CLASS_NAME === "Geometry.MultiLineString") {
			for (var i = 0; i < geom.components.length; i++) {
				line = geom.components[i];
				points = line.getVertices();
				bPoints = this.transform(points);
				bLine = new BMap.Polyline(bPoints, style);
				
				if (isAdd) {
					this.bMap.addOverlay(bLine);
				}
				feature.addOverlay(bLine);
				bLine.feature = feature;
				this.bindOverlayEvents(bLine);
				this.bindOverlayMenu(bLine);
			}
		} else {
			points = geom.getVertices();
			bPoints = this.transform(points);
			bLine = new BMap.Polyline(bPoints, style);
			
			if (isAdd) {
				this.bMap.addOverlay(bLine);
			}
			feature.addOverlay(bLine);
			bLine.feature = feature;
			this.bindOverlayEvents(bLine);
			this.bindOverlayMenu(bLine);
		}
		this.features.push(feature);
	},
	addLines: function (data, lineStyle) {
		if (lineStyle) {
			this.renderType = lineStyle;
		}
		for (var i = 0; i < data.length; i++) {
			this.addGeometryFromWKT(data[i], lineStyle);
		}
	},
	
	showInMap: function () {
		var zoom = this.getRenderLevel(this.mapZoom);
		for (var i = 0; i < this.features.length; i++) {
			var f = this.features[i];
			var typeId;
			if (this.renderField && this.renderField !== '') {
				typeId = f.attributes[this.renderField];
			} else {
				typeId = "default";
			}
			var style = null;
			if (this.renderType[typeId]) {
				style = this.renderType[typeId][zoom];
			} else {
				style = this.renderType['default'][zoom];
			}
			for (var j = 0; j < f.BMapOverlays.length; j++) {
				var ol = f.BMapOverlays[j];
				ol.setStrokeColor(style.strokeColor);
				ol.setStrokeWeight(style.strokeWeight);
				this.bMap.addOverlay(ol);
			}
		}
	},
	
	destroy: function () {
		if (this.bMap) {
			this.bMap.removeEventListener("zoomend", this.onMapZoomed);
			this.bMap.removeEventListener("moveend", this.onMapZoomed);
		}
		
		this.onMapZoomed = null;
		this.base("destroy");
	},
	CLASS_NAME: "BMapLayer.LineLayer"
});

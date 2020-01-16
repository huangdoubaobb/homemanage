/**
 * Created by liujie .
 */
/*jshint -W065,-W098 */

/*global  geoFormat:false,DataLoader:false,BMap:false,BMapLayer:false,basePath:false,Feature:false,ClassBase:false */

BMapLayer.MarkerLayer = BMapLayer.extend({
	
	idPreFix: "MarkerLayer",
	
	
	//地图事件绑定函数
	
	onMapZoomed: null,
	
	init: function (options) {
		ClassBase.combine(this, options);
		this.base("init", options);
		if (!this.bMap) {
			throw new Error("传入地图为空！");
		}
		this.features = [];
		this.dataLoader = new DataLoader({
			layer: this,
			wktField:this.dataLoaderOptions.wktField,
			dataUrl: this.dataUrl
		});
		this.wkt = this.wkt ? this.wkt : new geoFormat.WKT();
		//绑定地图绽放事件
		this.onMapZoomed = ClassBase.bindFunctionScope(this, this.mapZoomEnd);
		this.bMap.addEventListener("zoomend", this.onMapZoomed);
		this.bMap.addEventListener("moveend", this.onMapZoomed);
	},
	
	addGeometryFromWKT: function (data, markerStyle) {
		if (markerStyle) {
			this.renderType = markerStyle;
		}
		var id = data.attributes.id;
		var isLoaded = this.isFeatureLoaded(id);
		if (isLoaded) {
			return;
		}
		var geom = this.wkt.read(data.wkt);
		var typeId;
		if (this.renderField && this.renderField !== '') {
			typeId = data.attributes[this.renderField];
		}else{
			typeId="default";
		}
		var zoom = this.getRenderLevel(this.mapZoom);
		var style = this.renderType[typeId][zoom];
		
		var feature = new Feature(geom, data.attributes);
		feature.layer = this;
		
		var point = null;
		var bPoint = null;
		var bMarker = null;
		var label = null;
		var isAdd = this.visibility && this.mapZoom && this.mapZoom >= this.minZoom && this.mapZoom <= this.maxZoom && this.showOnAdd;
		if (geom.CLASS_NAME === "Geometry.MultiPoint") {
			for (var i = 0; i < geom.components.length; i++) {
				point = geom.components[i];
				bPoint = this.transform([point]);
				bMarker = new BMap.Marker(bPoint[0], style);
				if (this.enableLabel) {
					label = new BMap.Label(feature.attributes.name ? feature.attributes.name : "", {enableMassClear: false});
					label.setStyle({
						border: 0,
						backgroundColor: 'rgba(0,0,0,0)'
					});
					bMarker.setLabel(label);
				}
				if (isAdd) {
					this.bMap.addOverlay(bMarker);
				}
				feature.addOverlay(bMarker);
				bMarker.feature = feature;
				this.bindOverlayEvents(bMarker);
				this.bindOverlayMenu(bMarker);
			}
		}
		else {
			point = geom;
			bPoint = this.transform([point]);
			bMarker = new BMap.Marker(bPoint[0], style);
			if (this.enableLabel) {
				label = new BMap.Label(feature.attributes[this.labelField] ? feature.attributes[this.labelField] : "", {enableMassClear: false});
				label.setStyle({
					border: 0,
					backgroundColor: 'rgba(0,0,0,0)'
				});
				bMarker.setLabel(label);
			}
			if (isAdd) {
				this.bMap.addOverlay(bMarker);
			}
			feature.addOverlay(bMarker);
			bMarker.feature = feature;
			this.bindOverlayEvents(bMarker);
			this.bindOverlayMenu(bMarker);
		}
		this.features.push(feature);
	},
	
	addPoints: function (data, markerStyle) {
		if (markerStyle) {
			this.renderType = markerStyle;
		}
		for (var i = 0; i < data.length; i++) {
			this.addGeometryFromWKT(data[i], markerStyle);
		}
	},
	
	
	showInMap: function () {
		var zoom = this.getRenderLevel(this.mapZoom);
		if (zoom) {
			for (var i = 0; i < this.features.length; i++) {
				
				var f = this.features[i];
				var typeId;
				if (this.renderField && this.renderField !== '') {
					typeId = f.attributes[this.renderField];
				}else{
					typeId="default";
				}
				var style = null;
				if (this.renderType[typeId]) {
					style = this.renderType[typeId][zoom];
				}
				else {style = this.renderType['default'][zoom];}
				var icon = style.icon;
				//var icon = this.renderType[typeId][zoom].icon;
				for (var j = 0; j < f.BMapOverlays.length; j++) {
					var ol = f.BMapOverlays[j];
					ol.setIcon(icon);
					var offset = icon.size;
					var lb = ol.getLabel();
					if (lb) {
						lb.setOffset(offset);
					}
					this.bMap.addOverlay(ol);
				}
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
	CLASS_NAME: "BMapLayer.MarkerLayer"
});


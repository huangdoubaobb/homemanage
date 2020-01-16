/**
 * 基于openlaers开发地图底层操作 User: xubing Date: 14-5-23 Time: 下午4:02
 */
(function() {
	// window.GLens = new Object();
	var singleFile = (typeof GLens == "object" && GLens.singleFile);

	var scriptName = (!singleFile) ? "GLens/Map/Map.js" : "Map.js";

	window.GLens = {
		_getScriptLocation : (function() {
			var r = new RegExp("(^|(.*?\\/))(" + scriptName + ")(\\?|$)"), s = document
					.getElementsByTagName('script'), src, m, l = "";
			for ( var i = 0, len = s.length; i < len; i++) {
				src = s[i].getAttribute('src');
				if (src) {
					m = src.match(r);
					if (m) {
						l = m[1];
						break;
					}
				}
			}
			return (function() {
				return l;
			});
		})()
	};

	var jsFiles = [ "MapLayer.js", "SelectionLayer.js", "TrackLayer.js",
			"MarkersLayer.js", "Popup.js", "Button.js", "DrawLayer.js" ];
	var scriptTags = new Array(jsFiles.length);
	var host = GLens._getScriptLocation() + "GLens/Map/";
	for ( var i = 0, len = jsFiles.length; i < len; i++) {
		scriptTags[i] = "<script src='" + host + jsFiles[i] + "'></script>";
	}
	if (scriptTags.length > 0) {
		document.write(scriptTags.join(""));
	}
})();

function GLensMap(div, options) {
	this._options = options;
	this.queryUrl = options.queryUrl;
	this.mapUrl = options.mapUrl;
	this.GLens_Map_MinLocationScale = 0.000001;
	this.GLens_Map_MaxArea = 0.000110;// 拉框查询面积限制
	this.GLens_Map_MaxRadius = 0.0006;// 点击查询生成正方形的地图单位
	this._selectionLayer = null;
	this._trackLayer = null;
	this._markersLayer = null;
	this._glensMapLayer = null;
	this._drawLayer = null;
	this._map = null;
	this._buttonPanel = null;

	/* 初始化参数 */
	this.init = function(div, options) {
		options = options || {};
		if (options.proxyHost === undefined || options.proxyHost === null)
			OpenLayers.ProxyHost = "cgi-bin/proxy.py?url=";
		else
			OpenLayers.ProxyHost = options.proxyHost;
		this.createMap(div, options);/* 创建Map对象 */
		// this.addLayer(); /*默认添加主层*/
		this.initToolBar();/* 初始化地图工具栏 */
		// 点击查询单击事件响应
		OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
			defaultHandlerOptions : {
				'single' : true,
				'double' : false,
				'pixelTolerance' : 0,
				'stopSingle' : false,
				'stopDouble' : false
			},
			initialize : function(options) {
				this.handlerOptions = OpenLayers.Util.extend({},
						this.defaultHandlerOptions);
				OpenLayers.Control.prototype.initialize.apply(this, arguments);
				this.handler = new OpenLayers.Handler.Click(this, {
					'click' : this.trigger
				}, this.handlerOptions);
			},
			trigger : this.clickQueryCallback(this)
		});
		this.clickQuery = new OpenLayers.Control.Click();
		this._map.addControl(this.clickQuery);
	};
	
	/*点击查询事件处理*/
	this.clickQueryCallback=function(map){
		var thatMap=map;
		return function(e) {
			thatMap.clickQuery.deactivate();
			var lonlat = thatMap._map.getLonLatFromPixel(e.xy);
			var point = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
			var boxFeature = new OpenLayers.Feature.Vector(
					new OpenLayers.Geometry.Polygon.createRegularPolygon(point,
							thatMap.GLens_Map_MaxRadius, 4, 0));
			//thatMap._drawLayer._polygonLayer.addFeatures(boxFeature);
			thatMap._options.tips("正在查询该点周围的设备,请等待...");
			var queryOptions = {
				bounds : boxFeature.geometry.getBounds(),
				thatMap : thatMap
			};
			thatMap.drawBoxQueryByWFS(queryOptions);
		};
	};

	this.initToolBar = function() {
		var buttons = new Array();
		// 导航历史控件,nav_history定义为全局变量，否则下面找不到对象
		this.navHistory = new OpenLayers.Control.NavigationHistory();
		// 放大、缩小定义为全局变量，否则下面找不到对象
		this.zoomBox = new OpenLayers.Control.ZoomBox();
		// 移动地图定义为全局变量，否则下面找不到对象
		this.dragPan = new OpenLayers.Control.DragPan();
		this._map.addControls([ this.navHistory, this.zoomBox, this.dragPan ]);
		buttons.push({
			title : "移动",
			displayClass : "dragPanButton",
			trigger : this.triPanButton(this)
		});
		buttons.push({
			title : "点击查询",
			displayClass : "clickButton",
			trigger : this.triClickButton(this)
		});
		buttons.push({
			title : "拉框查询",
			displayClass : "drawRegularPolygonButton",
			trigger : this.triDrawBoxButton(this)
		});
		buttons.push({
			title : "多边形查询",
			displayClass : "drawPolygonButton",
			trigger : this.triDrawPolygonButton(this)
		});
		buttons.push({
			title : "拉框放大",
			displayClass : "zoomInButton",
			trigger : this.triZoomInButton(this)
		});
		buttons.push({
			title : "拉框缩小",
			displayClass : "zoomOutButton",
			trigger : this.triZoomOutButton(this)
		});
		buttons.push({
			title : "前进",
			displayClass : "nextButton",
			trigger : this.triNextButton(this)
		});
		buttons.push({
			title : "后退",
			displayClass : "previousButton",
			trigger : this.triPreviousButton(this)
		});
		buttons.push({
			title : "清除",
			displayClass : "clearButton",
			trigger : this.triClearButton(this)
		});
		this._buttonPanel = new GLensButtonPanel(this._map);
		this._buttonPanel.addButtons(buttons);
	};

	/* 创建一个map对象 */
	this.createMap = function(div, options) {
		this._map = new OpenLayers.Map({
			div : div,
			allOverlays : true,
			// maxExtent: new OpenLayers.Bounds(-180.0, -90.0, 180, 90),//left,
			// bottom, right, top
			maxExtent : new OpenLayers.Bounds(options.maxExtent.left,
					options.maxExtent.bottom, options.maxExtent.right,
					options.maxExtent.top), // 115.8282, 29.1312, 122.4364,
			// 36.7559
			// controls: [],
			projection : "EPSG:4326",
			units : 'degrees',
			eventListeners : {
				"moveend" : this.moveEndEvent(this),
				"zoomend" : this.zoomEndEvent(this)
			}
		});
		this._map.addControl(new OpenLayers.Control.MousePosition());// 显示鼠标指针的地理坐标
		this._map.addControl(new OpenLayers.Control.KeyboardDefaults());// 平移和缩放功能，用键盘控制
		this._map.addControl(new OpenLayers.Control.ScaleLine());// 显示比例尺
		this._map.addControl(new OpenLayers.Control.LayerSwitcher());// 图层管理
	};

	/* 创建一些临时图层，用来定位、轨迹回放等 */
	this.createTrackLayer = function() {
		this._selectionLayer = new GLensSelectionLayer(this._map);
		this._trackLayer = new GLensTrackLayer(this._map);
		this._markersLayer = new GLensMarkersLayer(this._map);
		this._drawLayer = new GLensDrawLayer(this._map, this._options);
	};

	/* 返回当前地图的临时定位图层 */
	this.getSelectionLayer = function() {
		return this._selectionLayer;
	};

	/* 返回当前地图的临时Track轨迹图层 */
	this.getTrackLayer = function() {
		return this._trackLayer;
	};

	/* 返回当前地图的临时Marker轨迹图层 */
	this.getMarkersLayer = function() {
		return this._markersLayer;
	};

	/* 返回当前地图的工具栏面板 */
	this.getButtonPanel = function() {
		return this._buttonPanel;
	};

	/* 返回当前地图的临时绘画层 */
	this.getDrawLayer = function() {
		return this._drawLayer;
	};

	/* extent为对象，属性包括{left,top,right,bottom} */
	this.zoomToExtent = function(extent) {
		this._map.zoomToExtent(new OpenLayers.Bounds(extent.left,
				extent.bottom, extent.right, extent.top));
	};

	/* 返回对象{left,top,right,bottom} */
	this.getExtent = function() {
		var bounds = this._map.getExtent();
		var extent = {
			left : bounds.left,
			top : bounds.top,
			right : bounds.right,
			bottom : bounds.bottom
		};
		return extent;
	};

	/*
	 * 坐标定位 lonlat:经纬度对象,属性：{lon, lat} zoom:比例，整型值，可选
	 */
	this.setCenter = function(lonlat, zoom) {
		if (zoom === undefined || zoom === null)
			zoom = 13;
		this._map
				.setCenter(new OpenLayers.LonLat(lonlat.lon, lonlat.lat), zoom); // 119.811,
		// 31.389
	};

	this.registerMoveEndEvent = function(callback) {
		this.moveEndEventCallback = callback;
	};

	this.registerZoomEndEvent = function(callback) {
		this.zoomEndEventCallback = callback;
	};

	this.getGLensMapMinLocationScale = function() {
		return this.GLens_Map_MinLocationScale;
	};

	// define custom map event listeners
	this.moveEndEvent = function(map) {
		var thatMap = map;
		return function(event) {
			if (typeof (thatMap.moveEndEventCallback) == "function") {
				thatMap.moveEndEventCallback(thatMap.getExtent());
			}
		};
	};

	this.zoomEndEvent = function(map) {
		var thatMap = map;
		return function(event) {
			if (typeof (thatMap.zoomEndEventCallback) == "function") {
				thatMap.zoomEndEventCallback(thatMap.getExtent());
			}
		};
	};

	/* 拉框回调函数 */
	this.drawBoxCallback = function(map) {
		var thatMap = map;
		return function(features) {
			if (features.geometry.getArea().toFixed(6) > thatMap.GLens_Map_MaxArea) {
				alert("选择范围过大，建议缩小范围！");
				thatMap._selectionLayer.removeAll();
				thatMap._drawLayer.removeAll();
				return;
			}
			thatMap._options.tips("正在查询指定范围的设备,请等待...");
			var queryOptions = {
				bounds : features.geometry.bounds,
				thatMap : thatMap
			};
			thatMap._drawLayer.deActivate();// 每次拉框结束后禁用拉框
			thatMap.drawBoxQueryByWFS(queryOptions);
		};
	};
	
	/* 拉框结束后执行查询 */
	this.drawBoxQueryByWFS = function(queryOptions) {
		var filter = new OpenLayers.Filter.Spatial({
			type : OpenLayers.Filter.Spatial.BBOX,
			value : queryOptions.bounds,
			property : "ID",
			projection : "EPSG:4326"
		});
		var circuitFilter = new OpenLayers.Filter.Spatial({
			type : OpenLayers.Filter.Spatial.INTERSECTS,
			value : queryOptions.bounds,
			property : "CIRCUITID",
			projection : "EPSG:4326"
		});
		var filter_1_0 = new OpenLayers.Format.Filter({
			version : "1.0.0"
		});
		var xml = new OpenLayers.Format.XML();
		var value = xml.write(filter_1_0.write(filter));
		var circuitValue = xml.write(filter_1_0.write(circuitFilter));
		var layerNames = queryOptions.thatMap._options.drawBoxQueryLayers;
		var query = "";
		for (index in layerNames) {
			var layer = layerNames[index];
			if (layer.type === "device") {
				query += '<wfs:Query typeName="' + layer.layerName
						+ '"  srsName="EPSG:4326">' + value + '</wfs:Query>';
			} else {
				query += '<wfs:Query typeName="' + layer.layerName
						+ '"  srsName="EPSG:4326">' + circuitValue
						+ '</wfs:Query>';
			}
		}
		var xmlPara = '<?xml version="1.0" encoding="UTF-8"?>'
				+ '<wfs:GetFeature xmlns:wfs="http://www.opengis.net/wfs" xmlns:ogc="http://www.opengis.net/ogc" '
				+ 'xmlns:gml="http://www.opengis.net/gml" xmlns:cgf="http://www.opengis.net/cite/geometry" '
				+ 'version="1.0.0" service="WFS"> ' + query
				+ '</wfs:GetFeature>';
		var request = OpenLayers.Request
				.POST({
					url : queryOptions.thatMap.queryUrl, // "http://172.26.48.10:8399/arcgis/services/NJGIS/MapServer/WFSServer",
					data : xmlPara,
					callback : queryOptions.thatMap
							.drawBoxQueryLocation({
								thatMap : queryOptions.thatMap,
								drawFeatureAdded : queryOptions.thatMap._options.drawFeatureAdded
							})
				});
	};
	
	/* 拉框查询结果 */
	this.drawBoxQueryLocation = function(options) {
		var callback = options.drawFeatureAdded;
		var thatMap = options.thatMap;
		return function(req) {
			var newFeatures = [];
			var callFeatures = [];
			var gml = new OpenLayers.Format.GML();
			var features = gml.read(req.responseText);
			thatMap._selectionLayer.removeAll();
			thatMap._drawLayer.removeAll();
			if (features.length > 0) {
				for (index in features) {
					var feature = features[index];
					// 过滤设备类型
					if (thatMap.filterDeviceType(feature.attributes.TYPEID) == false)
						continue;
					newFeatures.push(feature);
					feature.attributes.LAYER_NAME = feature.gml.featureType;
					callFeatures.push(feature.attributes);
				}
				thatMap._selectionLayer.addFeatures(newFeatures);
				thatMap._selectionLayer.selectFeatures(thatMap
						.selectFeaturesCallback(thatMap));
			}
			callback(callFeatures);
		};
	};

	this.selectFeaturesCallback = function(map) {
		var thatMap = map;
		return function(e) {
			thatMap._selectionLayer.unselectAll();
			var feature = e.feature;
			var html = '<div style="padding:0px;margin:0px;padding-top:5px;margin-top:5px"><table cellspacing="10">'
					+ '<tr><td>设备名称：</td><td><font color="red">'
					+ feature.attributes.NAME
					+ '</font></td></tr>'
					+ '<tr><td>设备类型：</td><td><font color="red">'
					+ feature.attributes.TYPENAME
					+ '</font></td></tr>'
					+ '</table></div>';
			thatMap._options.dialog("设备台账", html);
		};
	};

	// 拉框查询过滤设备
	this.filterDeviceType = function(feature) {
		var flag = false;
		var deviceType = [ 1, 183, 193, 2, 14, 9, 10, 18, 11, 7 ];
		for ( var i = 0; i < deviceType.length; i++) {
			if (deviceType[i] === parseInt(feature))
				flag = true;
		}
		return flag;
	};

	/* 点选事件 */
	this.triClickButton = function(map) {
		var thatMap = map;
		return function() {
			thatMap.clickQuery.activate();
			thatMap.dragPan.deactivate(); // 设置不可移动地图
			thatMap.zoomBox.deactivate(); // 设置放大缩小不可用
		};
	};

	/* 拉框事件 */
	this.triDrawBoxButton = function(map) {
		var thatMap = map;
		return function() {
			thatMap._drawLayer.activate("box", {
				drawFeatureAdded : thatMap.drawBoxCallback(thatMap)
			});
			thatMap.dragPan.deactivate(); // 设置不可移动地图
			thatMap.zoomBox.deactivate(); // 设置放大缩小不可用、
			thatMap.clickQuery.deactivate();
		};
	};
	
	/* 多边形事件 */
	this.triDrawPolygonButton = function(map) {
		var thatMap = map;
		return function() {
			thatMap._drawLayer.activate("polygon", {
				drawFeatureAdded : thatMap.drawBoxCallback(thatMap)
			});
			thatMap.dragPan.deactivate(); // 设置不可移动地图
			thatMap.zoomBox.deactivate(); // 设置放大缩小不可用、
			thatMap.clickQuery.deactivate();
		};
	};

	/* 清除事件 */
	this.triClearButton = function(map) {
		var thatMap = map;
		return function() {
			thatMap._selectionLayer.removeAll();//清除临时绘画层
			thatMap._drawLayer.removeAll();//清除画图临时层
			thatMap._trackLayer.removeAll();//清除轨迹描绘层
			thatMap._markersLayer.removeAll();//清除轨迹描绘层
			thatMap._drawLayer.deActivate();// 设置画图不可用
			thatMap.clickQuery.deactivate();
		};
	};
	
	/* 移动事件 */
	this.triPanButton = function(map) {
		var thatMap = map;
		return function() {
			if (!thatMap.dragPan.active)
				thatMap.dragPan.activate();
			thatMap.dragPan.panned;
			thatMap._drawLayer.deActivate();// 设置画图不可用
			thatMap.clickQuery.deactivate();
		};
	};
	
	/* 放大事件 */
	this.triZoomInButton = function(map) {
		var thatMap = map;
		return function() {
			if (!thatMap.zoomBox.active)
				thatMap.zoomBox.activate();
			thatMap.dragPan.deactivate(); // 设置不可移动地图
			thatMap._drawLayer.deActivate();// 设置画图不可用
			thatMap.clickQuery.deactivate();
			thatMap.zoomBox.out = false;
			thatMap.zoomBox.zoomOnClick;
		};
	};
	
	/* 缩小事件 */
	this.triZoomOutButton = function(map) {
		var thatMap = map;
		return function() {
			if (!thatMap.zoomBox.active)
				thatMap.zoomBox.activate();
			thatMap.dragPan.deactivate(); // 设置不可移动地图
			thatMap._drawLayer.deActivate();// 设置画图不可用
			thatMap.clickQuery.deactivate();
			thatMap.zoomBox.out = true;
		};
	};
	
	/* 前进事件 */
	this.triNextButton = function(map) {
		var thatMap = map;
		return function() {
			if (!thatMap.navHistory.active)
				thatMap.navHistory.activate();
			thatMap.navHistory.nextTrigger();
			thatMap._drawLayer.deActivate();// 设置画图不可用
			thatMap.clickQuery.deactivate();
		};
	};
	
	/* 后退事件 */
	this.triPreviousButton = function(map) {
		var thatMap = map;
		return function() {
			if (!thatMap.navHistory.active)
				thatMap.navHistory.activate();
			thatMap.navHistory.previousTrigger();
			thatMap._drawLayer.deActivate();// 设置画图不可用
			thatMap.clickQuery.deactivate();
		};
	};

	this.init(div, options);
}
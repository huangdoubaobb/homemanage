/**
 * 图层操作 User: xubing Date: 14-5-23 Time: 下午4:28
 * 
 */

function GLensMapLayer(map, options) {
	// 私有属性
	var GLens_Map_MapLayer_Protocol = {};
	var GLens_Map_MapLayer_Protocol_WMS = "WMS";
	var GLens_Map_MapLayer_Protocol_WFS = "WFS";
	var GLens_Map_MapLayer_Protocol_ArcGIS93Rest = "ArcGIS93Rest";

	this.query = function(requestUrl, layerName, propertyName, propertyValue,
			onCompleteEvent) {
		this.queryByPostMethod(requestUrl, layerName, propertyName,
				propertyValue, this.handlerQueryLocation(this._map,
						onCompleteEvent)); // handlerCircuitQuery
	};

	this.queryFilter = function(requestUrl, layerName, filter, onCompleteEvent) {
		this.queryFilterByPostMethod(requestUrl, layerName, filter, this
				.handlerQueryLocation(this._map, onCompleteEvent));
	};

	this.queryByPostMethod = function(requestUrl, layerName, propertyName,
			propertyValue, onCompleteEvent) {
		var filter = new OpenLayers.Filter.Comparison({
			type : OpenLayers.Filter.Comparison.EQUAL_TO,
			property : propertyName,
			value : propertyValue
		});
		this.queryFilterByPostMethod(requestUrl, layerName, filter,
				onCompleteEvent);
	};

	this.queryFilterByPostMethod = function(requestUrl, layerName, filter,
			onCompleteEvent) {
		var filter_1_0 = new OpenLayers.Format.Filter({
			version : "1.0.0"
		});

		var xml = new OpenLayers.Format.XML();

		var value = xml.write(filter_1_0.write(filter));

		/*var xmlPara = '<?xml version="1.0" encoding="UTF-8"?>'
				+ '<wfs:GetFeature xmlns:wfs="http://www.opengis.net/wfs" xmlns:ogc="http://www.opengis.net/ogc" '
				+ 'xmlns:gml="http://www.opengis.net/gml" xmlns:cgf="http://www.opengis.net/cite/geometry" '
				+
				// 'outputFormat="GML2" version="1.0.0" service="WFS"> ' +
				// //ArcGis Server 9.3不支持outputFormat为GML2
				'version="1.0.0" service="WFS"> ' + '<wfs:Query typeName="'
				+ layerName + '"  srsName="EPSG:4326">' + value
				+ '</wfs:Query>' + '</wfs:GetFeature>';
		*/
		var xmlPara = this.getXmlPara(layerName,value);
		var request = OpenLayers.Request.POST({
			url : requestUrl, // "http://127.0.0.1:8399/arcgis/services/testgis2/MapServer/WFSServer",
			data : xmlPara,
			callback : onCompleteEvent
		});
	};

	this.getXmlPara = function(layerNames, value) {
		var query="";
		if (OpenLayers.Util.isArray(layerNames)) {
			for (var i in layerNames) {
				query+='<wfs:Query typeName="'+ layerNames[i] + '"  srsName="EPSG:4326">' + value+ '</wfs:Query>';
			}
		}else{
			query='<wfs:Query typeName="'+ layerNames + '"  srsName="EPSG:4326">' + value+ '</wfs:Query>';
		}
		var xmlPara = '<?xml version="1.0" encoding="UTF-8"?>'
			+ '<wfs:GetFeature xmlns:wfs="http://www.opengis.net/wfs" xmlns:ogc="http://www.opengis.net/ogc" '
			+ 'xmlns:gml="http://www.opengis.net/gml" xmlns:cgf="http://www.opengis.net/cite/geometry" '
			// 'outputFormat="GML2" version="1.0.0" service="WFS"> ' +
			// //ArcGis Server 9.3不支持outputFormat为GML2
			+'version="1.0.0" service="WFS"> ' 
			+query
			+ '</wfs:GetFeature>';
		return xmlPara;
	};

	this.handlerQueryLocation = function(map, callback) {
		var thatMap = map;
		var thatCallback = callback;
		return function(req) {
			var gml = new OpenLayers.Format.GML();
			var features = gml.read(req.responseText);
			// alert("handlerQuery:"+req.responseText);
			// alert("handlerQuery:"+features.length);
			var locateExtent = null;
			// var tmp_map = this.GLens.Map;
			// alert("_handlerQueryLocation");
			var selectionLayer = thatMap.selectionLayer;
			var vectorFeatures = new Array();
			// 高亮显示
			for ( var featureIndex in features) {
				var feature = features[featureIndex];
				var vector = null;
				// 高亮显示
				switch (feature.geometry.CLASS_NAME) {
				case "OpenLayers.Geometry.Polygon":
				case "OpenLayers.Geometry.MultiPolygon": {
					// 经度纬度是相反的，所以需要重新构建
					var polygon = feature.geometry.components[0].clone();
					vector = new OpenLayers.Feature.Vector(polygon);
					vector.attributes = feature.attributes;
					vector.data = feature.data;

					// selectionLayer.addFeatures([vector]);
					vectorFeatures.push(vector);
				}
					break;
				case "OpenLayers.Geometry.Point": {
					// 经度纬度是相反的，所以需要重新构建
					var pt = feature.geometry.clone();
					vector = new OpenLayers.Feature.Vector(pt);
					vector.attributes = feature.attributes;
					vector.data = feature.data;
					// selectionLayer.addFeatures([vector]);
					vectorFeatures.push(vector);
				}
					break;
				case "OpenLayers.Geometry.LineString": // 支持ArcGis Server9.3
				case "OpenLayers.Geometry.MultiLineString": {
					// 经度纬度是相反的，所以需要重新构建
					var line = feature.geometry.clone();
					vector = new OpenLayers.Feature.Vector(line);
					vector.attributes = feature.attributes;
					vector.data = feature.data;
					// selectionLayer.addFeatures([vector]);
					vectorFeatures.push(vector);
				}
					break;
				}

				var geometryBounds = vector.geometry.getBounds();
				if (geometryBounds == null) {
					continue;
				}
				if (locateExtent == null) {
					locateExtent = geometryBounds.clone();
				} else {
					locateExtent.left = locateExtent.left > geometryBounds.left ? geometryBounds.left
							: locateExtent.left;
					locateExtent.bottom = locateExtent.bottom > geometryBounds.bottom ? geometryBounds.bottom
							: locateExtent.bottom;
					locateExtent.right = locateExtent.right > geometryBounds.right ? locateExtent.right
							: geometryBounds.right;
					locateExtent.top = locateExtent.top > geometryBounds.top ? locateExtent.top
							: geometryBounds.top;
				}
			}

			thatCallback(vectorFeatures, locateExtent);
		};
	};

	this._parseParams = function(options) {
		options = options || {}; // 对象若没有定义，设置为空对象
		if (options.url === undefined) {
			// TODO 异常
		}

		if (options.layerName === undefined) {
			options.layerName = "GLens.Map.MapLayer";
		}

		if (options.protocol === undefined) {
			options.protocol = GLens_Map_MapLayer_Protocol_WMS;
		}

		if (options.layers === undefined) {
			options.layers = "0";
		}

		if (options.isBaseLayer === undefined) {
			options.isBaseLayer = true;
		}

		if (options.visibility === undefined) {
			options.visibility = true;
		}

		if (options.displayInLayerSwitcher === undefined) {
			options.displayInLayerSwitcher = true;
		}
	};

	// 私有函数
	var _getLayer = function(options) {
		var mapLayer = null;
		var protocol = options.protocol.toUpperCase();
		if (protocol == GLens_Map_MapLayer_Protocol_WMS) {
			mapLayer = new OpenLayers.Layer.WMS(options.layerName, // "GeoLayer",
			options.url, // "http://127.0.0.1:8399/arcgis/services/testgis2/MapServer/WMSServer?",
			{
				layers : options.layers, // '0,1,2,3,4,5,6',
				transparent : true,
				format : 'image/png'
			}, {
				isBaseLayer : options.isBaseLayer,
				visibility : options.visibility,
				displayInLayerSwitcher : options.displayInLayerSwitcher
			});
		} else if (protocol == GLens_Map_MapLayer_Protocol_ArcGIS93Rest) {
			mapLayer = new OpenLayers.Layer.ArcGIS93Rest(options.layerName, // "GeoLayer",
			options.url, // "http://127.0.0.1:8399/arcgis/rest/services/testgis2/MapServer/export",
			{
				layers : "show:" + options.layers, // "show:0,1,2,3,4,5,6,7"
				transparent : true,
				format : 'image/png'
			}, {
				isBaseLayer : options.isBaseLayer,
				visibility : options.visibility,
				displayInLayerSwitcher : options.displayInLayerSwitcher
			});
		}
		return mapLayer;
	};

	this._map = map;
	this._parseParams(options);
	this.layer = _getLayer(options);
	this._map.addLayer(this.layer);
}
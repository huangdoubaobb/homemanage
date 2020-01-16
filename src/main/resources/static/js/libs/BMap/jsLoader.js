/**
 * Created by liujie .
 */
/**
 * @requires ClassBase.js
 */

/*global
 */
/*jshint -W065,-W060 */
(function (g) {
	g.JsLoader = {
		getScriptLocation: (function () {
			var r = new RegExp("(^|(.*?\\/))(jsLoader[^\\/]*?\\.js)(\\?|$)"),
				s = document.getElementsByTagName('script'),
				src, m, l = "";
			for (var i = 0, len = s.length; i < len; i++) {
				src = s[i].getAttribute('src');
				if (src) {
					m = src.match(r);
					if (m) {
						l = m[1];
						break;
					}
				}
			}
			return function () {
				return l;
			};
		}())
	};
	
	if (!g.jsFiles) {
		g.jsFiles = [];
	}
	
	// 这里维护所有js加载和加载的顺序，将来会用js编译器来维护
	g.jsFiles = [
		"./lib/classbase/ClassBase.js",
		"./lib/Utils.js",
		"./lib/Geometry.js",
		"./lib/Geometry/Point.js",
		"./lib/Geometry/Collection.js",
		"./lib/Geometry/MultiPoint.js",
		"./lib/Geometry/Curve.js",
		"./lib/Geometry/LineString.js",
		"./lib/Geometry/LinearRing.js",
		"./lib/Geometry/MultiLineString.js",
		"./lib/Geometry/Polygon.js",
		"./lib/Geometry/MultiPolygon.js",
		"./lib/TypeDefine.js",
		"./lib/Feature.js",
		"./lib/geoFormat.js",
		"./lib/geoformat/WKT.js",
		"./lib/DataLoader.js",
		"./lib/OverlayHandler.js",
		"./lib/overlayHandler/MarkerHandler.js",
		"./lib/overlayHandler/PolygonHandler.js",
		"./lib/overlayHandler/PolylineHandler.js",
		"./lib/BMapLayer.js",
		"./lib/layer/LineLayer.js",
		"./lib/layer/MarkerLayer.js",
		"./lib/LayerIniter.js",
		
		"./lib/BMapControl/LayerManager2.js"
	
	].concat(g.jsFiles);
	
	var scriptTags = new Array(jsFiles.length);
	var host = JsLoader.getScriptLocation();
	for (var i = 0, len = jsFiles.length; i < len; i++) {
		scriptTags[i] = "<script src='" + host + jsFiles[i] +
			"'></script>";
	}
	if (scriptTags.length > 0) {
		document.write(scriptTags.join(""));
	}
	
}(window));
/*jshint +W065,+W060 */

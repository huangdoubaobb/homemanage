/**
 * Created by liujie .
 */
/*jshint -W065,-W024,-W098 */

/*global JSON:false, alert:false, TypeDefine:false, ClassBase:false */

var DataLoader = ClassBase.extend({
	
	extent: null,
	dataUrl: null,
	layer: null,
	map: null,
	wktField:"",
	init: function (options) {
		ClassBase.combine(this, options);
		this.map = this.layer.bMap;
	},
	loadData: function () {
		$.ajax({
			url: this.dataUrl,
			type: 'get',
			async: true,
			dataType: 'text',
			data: this.extent,
			success: ClassBase.bindFunctionScope(this, this.dataLoaded),
			error: ClassBase.bindFunctionScope(this, this.dataLoadError)
		});
	},
	dataLoaded: function (data) {
		var features = JSON.parse(data);
		for (var i = 0; i < features.length; i++) {
			var f = features[i];
			var d = {
				attributes: {},
				wkt: null
			};
			for (var name in features[i]) {
				//noinspection JSUnfilteredForInLoop
				if (f.hasOwnProperty(name) && name !== "wkt") {
					//noinspection JSUnfilteredForInLoop
					d.attributes[name] = f[name];
				}
			}
			d.wkt = f[this.wktField];
			this.layer.addGeometryFromWKT(d);
		}
		this.layer.reDraw(true);
	},
	dataLoadError: function (data) {
		//alert("出错" + data);
	},
	setBounds: function (bounds) {
		var minX, maxY, maxX, minY;
		minX = bounds.getSouthWest().lng;
		maxX = bounds.getNorthEast().lng;
		minY = bounds.getSouthWest().lat;
		maxY = bounds.getNorthEast().lat;
		this.extent = {
			minX: minX,
			maxX: maxX,
			minY: minY,
			maxY: maxY
		};
	},
	CLASS_NAME: "DataLoader"
});



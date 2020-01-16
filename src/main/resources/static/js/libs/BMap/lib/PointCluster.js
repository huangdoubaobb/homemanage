/**
 * Created by liujie .
 */
/*jshint -W065,-W098 */

/*global OpenLayers:false, glMap:false, ClassBase:false */



var PointCluster = ClassBase.extend({
	
	idPrefix: "LineStringFilter",
	effectiveCount: null,
	
	init: function (options) {
		this.base("init", options);
		ClassBase.combine(this, options);
	},
	
	
	filter: function (geom) {
		
	},
	CLASS_NAME: 'PointCluster'
});


/**
 * Created by liujie .
 */
/*jshint -W065,-W098 */

/*global GeometryFilter:false, glMap:false, ClassBase:false */

GeometryFilter.LineStringFilter = GeometryFilter.extend({
	
	idPrefix: "LineStringFilter",
	effectiveCount: null,
	
	init: function (options) {
		this.base("init", options);
		ClassBase.combine(this, options);
	},
	
	
	filter: function (geom) {
		
	},
	CLASS_NAME: 'GeometryFilter.LineStringFilter'
});

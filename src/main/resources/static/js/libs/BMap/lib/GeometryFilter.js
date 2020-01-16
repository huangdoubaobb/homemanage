/**
 * Created by liujie .
 */
/*jshint -W065,-W098 */

/*global OpenLayers:false, IDUtils:false, ClassBase:false */

var GeometryFilter = ClassBase.extend({
	idPrefix: "filter",
	id: "",
	init: function (options) {
		ClassBase.combine(this, options);
		this.id = IDUtils.getID(this.idPrefix);
	},
	filter: function (geom) {
		
	},
	destroy:function() {
	  
	},
	CLASS_NAME: "GeometryFilter"
});

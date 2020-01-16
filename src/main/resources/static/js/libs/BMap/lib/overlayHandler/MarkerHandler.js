/*jshint -W065,-W098 */

/*global OverlayHandler:false, glMap:false, ClassBase:false */

OverlayHandler.MarkerHandler = OverlayHandler.extend({
	
	lastOverlay: null,
	
	currentOverlay: null,
	
	init: function (options) {
		ClassBase.combine(this, options);
		this.base("init");
	},
	CLASS_NAME: "OverlayHandler.MarkerHandler"
});



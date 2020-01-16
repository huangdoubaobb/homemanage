/**
 * Created by liujie .
 */
/*jshint -W065,-W098 */

/*global OpenLayers:false, glMap:false, ClassBase:false */

var Feature = ClassBase.extend({
	
	geometry: null,
	
	attributes: null,
	
	BMapOverlays: null,
	
	style: "default",
	
	//style: null,
	
	init: function (geometry, attributes) {
		this.geometry = geometry;
		this.attributes = attributes;
		this.BMapOverlays = [];
	},
	
	addOverlay: function (overlay) {
		this.BMapOverlays.push(overlay);
	},
	setAttribute: function (att) {
		this.attributes = att;
	},
	setStyle: function (style) {
		this.style = style;
		for(var ol in this.BMapOverlays){
			if(this.BMapOverlays.hasOwnProperty(ol)){
				
			}
		}
	},
	getAttributeValue:function(attribute){
		if(this.attributes.hasOwnProperty(attribute)){
			return this.attributes[attribute];
		}
	},
	setGeometry: function (geom) {
		this.geometry = geom;
	},
	CLASS_NAME: "Feature"
});



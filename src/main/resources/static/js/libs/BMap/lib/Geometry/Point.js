/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**
 * @requires OpenLayers/Geometry.js
 */

/**
 * Class: Geometry.Point
 * Point geometry class.
 *
 * Inherits from:
 *  - <Geometry>
 */
Geometry.Point = Geometry.extend({
	
	idPreFix: "Point",
	
	/**
	 * APIProperty: x
	 * {float}
	 */
	x: null,
	
	/**
	 * APIProperty: y
	 * {float}
	 */
	y: null,
	
	/**
	 * Constructor: Geometry.Point
	 * Construct a point geometry.
	 *
	 * Parameters:
	 * x - {float}
	 * y - {float}
	 *
	 */
	init: function (x, y) {
		this.base("init", x, y);
		
		this.x = parseFloat(x);
		this.y = parseFloat(y);
	},
	
	/**
	 * APIMethod: clone
	 *
	 * Returns:
	 * {<Geometry.Point>} An exact clone of this Geometry.Point
	 */
	clone: function (obj) {
		if (obj == null) {
			obj = new Geometry.Point(this.x, this.y);
		}
		
		// catch any randomly tagged-on properties
		ClassBase.applyDefaults(obj, this);
		
		return obj;
	},
	equals: function (geom) {
		var equals = false;
		if (geom !== null) {
			equals = ((this.x === geom.x && this.y === geom.y) ||
			(isNaN(this.x) && isNaN(this.y) && isNaN(geom.x) && isNaN(geom.y)));
		}
		return equals;
	},
	getVertices: function (nodes) {
		return [this];
	},
	intersects: function (geometry) {
		var intersect = false;
		if (geometry.CLASS_NAME === "Geometry.Point") {
			intersect = this.equals(geometry);
		} else {
			intersect = geometry.intersects(this);
		}
		return intersect;
	},
	
	CLASS_NAME: "Geometry.Point"
});

/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */
/*global Geometry:false, NumberUtils:false */
/*jshint -W016,-W127,-W098*/
/**
 * @requires OpenLayers/Geometry/Collection.js
 * @requires OpenLayers/Geometry/LinearRing.js
 */

/**
 * Class: Geometry.Polygon
 * Polygon is a collection of Geometry.LinearRings.
 *
 * Inherits from:
 *  - <Geometry.Collection>
 *  - <Geometry>
 */
Geometry.Polygon = Geometry.Collection.extend({
	
	
	idPreFix: "Polygon",
	
	
	/**
	 * Property: componentTypes
	 * {Array(String)} An array of class names representing the types of
	 * components that the collection can include.  A null value means the
	 * component types are not restricted.
	 */
	componentTypes: ["Geometry.LinearRing"],
	
	/**
	 * Constructor: Geometry.Polygon
	 * Constructor for a Polygon geometry.
	 * The first ring (this.component[0])is the outer bounds of the polygon and
	 * all subsequent rings (this.component[1-n]) are internal holes.
	 *
	 *
	 * Parameters:
	 * components - {Array(<Geometry.LinearRing>)}
	 */
	intersects: function(geometry) {
		var intersect = false;
		var i, len;
		if(geometry.CLASS_NAME === "Geometry.Point") {
			intersect = this.containsPoint(geometry);
		} else if(geometry.CLASS_NAME === "Geometry.LineString" ||
				geometry.CLASS_NAME === "Geometry.LinearRing") {
			// check if rings/linestrings intersect
			for(i=0, len=this.components.length; i<len; ++i) {
				intersect = geometry.intersects(this.components[i]);
				if(intersect) {
					break;
				}
			}
			if(!intersect) {
				// check if this poly contains points of the ring/linestring
				for(i=0, len=geometry.components.length; i<len; ++i) {
					intersect = this.containsPoint(geometry.components[i]);
					if(intersect) {
						break;
					}
				}
			}
		} else {
			for(i=0, len=geometry.components.length; i<len; ++ i) {
				intersect = this.intersects(geometry.components[i]);
				if(intersect) {
					break;
				}
			}
		}
		// check case where this poly is wholly contained by another
		if(!intersect && geometry.CLASS_NAME === "Geometry.Polygon") {
			// exterior ring points will be contained in the other geometry
			var ring = this.components[0];
			for(i=0, len=ring.components.length; i<len; ++i) {
				intersect = geometry.containsPoint(ring.components[i]);
				if(intersect) {
					break;
				}
			}
		}
		return intersect;
	},
	containsPoint: function(point) {
		var numRings = this.components.length;
		var contained = false;
		if(numRings > 0) {
			// check exterior ring - 1 means on edge, boolean otherwise
			contained = this.components[0].containsPoint(point);
			if(contained !== 1) {
				if(contained && numRings > 1) {
					// check interior rings
					var hole;
					for(var i=1; i<numRings; ++i) {
						hole = this.components[i].containsPoint(point);
						if(hole) {
							if(hole === 1) {
								// on edge
								contained = 1;
							} else {
								// in hole
								contained = false;
							}
							break;
						}
					}
				}
			}
		}
		return contained;
	},
	
	CLASS_NAME: "Geometry.Polygon"
});

/**
 * APIMethod: createRegularPolygon
 * Create a regular polygon around a radius. Useful for creating circles
 * and the like.
 *
 * Parameters:
 * origin - {<Geometry.Point>} center of polygon.
 * radius - {Float} distance to vertex, in map units.
 * sides - {Integer} Number of sides. 20 approximates a circle.
 * rotation - {Float} original angle of rotation, in degrees.
 */

Geometry.Polygon.createRegularPolygon = function (origin, radius, sides, rotation) {
	var angle = Math.PI * ((1 / sides) - (1 / 2));
	if (rotation) {
		angle += (rotation / 180) * Math.PI;
	}
	var rotatedAngle, x, y;
	var points = [];
	for (var i = 0; i < sides; ++i) {
		rotatedAngle = angle + (i * 2 * Math.PI / sides);
		x = origin.x + (radius * Math.cos(rotatedAngle));
		y = origin.y + (radius * Math.sin(rotatedAngle));
		points.push(new Geometry.Point(x, y));
	}
	var ring = new Geometry.LinearRing(points);
	return new Geometry.Polygon([ring]);
};

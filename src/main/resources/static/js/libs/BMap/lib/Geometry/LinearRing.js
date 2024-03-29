/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/*global Geometry:false, NumberUtils:false */

/*jshint -W016,-W098*/
/**
 * @requires OpenLayers/Geometry/LineString.js
 */

/**
 * Class: Geometry.LinearRing
 *
 * A Linear Ring is a special LineString which is closed. It closes itself
 * automatically on every addPoint/removePoint by adding a copy of the first
 * point as the last point.
 *
 * Also, as it is the first in the line family to close itself, a getArea()
 * function is defined to calculate the enclosed area of the linearRing
 *
 * Inherits:
 *  - <Geometry.LineString>
 */
Geometry.LinearRing = Geometry.LineString.extend({
	
	idPreFix: "LinearRing",
	/**
	 * Property: componentTypes
	 * {Array(String)} An array of class names representing the types of
	 *                 components that the collection can include.  A null
	 *                 value means the component types are not restricted.
	 */
	componentTypes: ["Geometry.Point"],
	
	/**
	 * Constructor: Geometry.LinearRing
	 * Linear rings are constructed with an array of points.  This array
	 *     can represent a closed or open ring.  If the ring is open (the last
	 *     point does not equal the first point), the constructor will close
	 *     the ring.  If the ring is already closed (the last point does equal
	 *     the first point), it will be left closed.
	 *
	 * Parameters:
	 * points - {Array(<Geometry.Point>)} points
	 */
	
	/**
	 * APIMethod: addComponent
	 * Adds a point to geometry components.  If the point is to be added to
	 *     the end of the components array and it is the same as the last point
	 *     already in that array, the duplicate point is not added.  This has
	 *     the effect of closing the ring if it is not already closed, and
	 *     doing the right thing if it is already closed.  This behavior can
	 *     be overridden by calling the method with a non-null index as the
	 *     second argument.
	 *
	 * Parameters:
	 * point - {<Geometry.Point>}
	 * index - {Integer} Index into the array to insert the component
	 *
	 * Returns:
	 * {Boolean} Was the Point successfully added?
	 */
	addComponent: function (point, index) {
		var added = false;
		
		//remove last point
		var lastPoint = this.components.pop();
		
		// given an index, add the point
		// without an index only add non-duplicate points
		if (index !== null || !point.equals(lastPoint)) {
			added = Geometry.Collection.prototype.addComponent.apply(this, arguments);
		}
		
		//append copy of first point
		var firstPoint = this.components[0];
		Geometry.Collection.prototype.addComponent.apply(this, [firstPoint]);
		
		return added;
	},
	
	/**
	 * APIMethod: removeComponent
	 * Removes a point from geometry components.
	 *
	 * Parameters:
	 * point - {<Geometry.Point>}
	 *
	 * Returns:
	 * {Boolean} The component was removed.
	 */
	removeComponent: function (point) {
		var removed = this.components && (this.components.length > 3);
		if (removed) {
			//remove last point
			this.components.pop();
			
			//remove our point
			Geometry.Collection.prototype.removeComponent.apply(this,
				arguments);
			//append copy of first point
			var firstPoint = this.components[0];
			Geometry.Collection.prototype.addComponent.apply(this,
				[firstPoint]);
		}
		return removed;
	},
	intersects: function (geometry) {
		var intersect = false;
		if (geometry.CLASS_NAME === "Geometry.Point") {
			intersect = this.containsPoint(geometry);
		} else if (geometry.CLASS_NAME === "Geometry.LineString") {
			intersect = geometry.intersects(this);
		} else if (geometry.CLASS_NAME === "Geometry.LinearRing") {
			intersect = Geometry.LineString.prototype.intersects.apply(
				this, [geometry]
			);
		} else {
			// check for component intersections
			for (var i = 0, len = geometry.components.length; i < len; ++i) {
				intersect = geometry.components[i].intersects(this);
				if (intersect) {
					break;
				}
			}
		}
		return intersect;
	},
	getVertices: function (nodes) {
		return (nodes === true) ? [] : this.components.slice(0, this.components.length - 1);
	},
	containsPoint: function (point) {
		var approx = NumberUtils.limitSigDigs;
		var digs = 14;
		var px = approx(point.x, digs);
		var py = approx(point.y, digs);
		
		function getX(y, x1, y1, x2, y2) {
			return (y - y2) * ((x2 - x1) / (y2 - y1)) + x2;
		}
		
		var numSeg = this.components.length - 1;
		var start, end, x1, y1, x2, y2, cx, cy;
		var crosses = 0;
		for (var i = 0; i < numSeg; ++i) {
			start = this.components[i];
			x1 = approx(start.x, digs);
			y1 = approx(start.y, digs);
			end = this.components[i + 1];
			x2 = approx(end.x, digs);
			y2 = approx(end.y, digs);
			
			/**
			 * The following conditions enforce five edge-crossing rules:
			 *    1. points coincident with edges are considered contained;
			 *    2. an upward edge includes its starting endpoint, and
			 *    excludes its final endpoint;
			 *    3. a downward edge excludes its starting endpoint, and
			 *    includes its final endpoint;
			 *    4. horizontal edges are excluded; and
			 *    5. the edge-ray intersection point must be strictly right
			 *    of the point P.
			 */
			if (y1 === y2) {
				// horizontal edge
				if (py === y1) {
					// point on horizontal line
					if (x1 <= x2 && (px >= x1 && px <= x2) || // right or vert
						x1 >= x2 && (px <= x1 && px >= x2)) { // left or vert
						// point on edge
						crosses = -1;
						break;
					}
				}
				// ignore other horizontal edges
				continue;
			}
			cx = approx(getX(py, x1, y1, x2, y2), digs);
			if (cx === px) {
				// point on line
				if (y1 < y2 && (py >= y1 && py <= y2) || // upward
					y1 > y2 && (py <= y1 && py >= y2)) { // downward
					// point on edge
					crosses = -1;
					break;
				}
			}
			if (cx <= px) {
				// no crossing to the right
				continue;
			}
			if (x1 !== x2 && (cx < Math.min(x1, x2) || cx > Math.max(x1, x2))) {
				// no crossing
				continue;
			}
			if (y1 < y2 && (py >= y1 && py < y2) || // upward
				y1 > y2 && (py < y1 && py >= y2)) { // downward
				++crosses;
			}
		}
		var contained = (crosses === -1) ?
			// on edge
			1 :
			// even (out) or odd (in)
			!!(crosses & 1);
		
		return contained;
	},
	
	CLASS_NAME: "Geometry.LinearRing"
});

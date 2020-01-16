/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */
/*global Geometry:false, NumberUtils:false */
/*jshint -W016,-W127,-W098*/

/**
 * Class:Geometry.LineString
 * A LineString is a Curve which, once two points have been added to it, can
 * never be less than two points long.
 *
 * Inherits from:
 *  - <Geometry.Curve>
 */
Geometry.LineString = Geometry.Curve.extend({
	
	idPreFix: "LineString",
	/**
	 * Constructor:Geometry.LineString
	 * Create a new LineString geometry
	 *
	 * Parameters:
	 * points - {Array(<Geometry.Point>)} An array of points used to
	 *          generate the linestring
	 *
	 */
	
	/**
	 * APIMethod: removeComponent
	 * Only allows removal of a point if there are three or more points in
	 * the linestring. (otherwise the result would be just a single point)
	 *
	 * Parameters:
	 * point - {<Geometry.Point>} The point to be removed
	 *
	 * Returns:
	 * {Boolean} The component was removed.
	 */
	removeComponent: function (point) {
		var removed = this.components && (this.components.length > 2);
		if (removed) {
			Geometry.Collection.prototype.removeComponent.apply(this, arguments);
		}
		return removed;
	},
	getVertices: function (nodes) {
		var vertices;
		if (nodes === true) {
			vertices = [
				this.components[0],
				this.components[this.components.length - 1]
			];
		} else if (nodes === false) {
			vertices = this.components.slice(1, this.components.length - 1);
		} else {
			vertices = this.components.slice();
		}
		return vertices;
	},
	intersects: function(geometry) {
		var intersect = false;
		var type = geometry.CLASS_NAME;
		if(type === "Geometry.LineString" ||
				type === "Geometry.LinearRing" ||
				type === "Geometry.Point") {
			var segs1 = this.getSortedSegments();
			var segs2;
			if(type === "Geometry.Point") {
				segs2 = [{
					x1: geometry.x, y1: geometry.y,
					x2: geometry.x, y2: geometry.y
				}];
			} else {
				segs2 = geometry.getSortedSegments();
			}
			var seg1, seg1x1, seg1x2, seg1y1, seg1y2,
					seg2, seg2y1, seg2y2;
			// sweep right
			outer: for(var i=0, len=segs1.length; i<len; ++i) {
				seg1 = segs1[i];
				seg1x1 = seg1.x1;
				seg1x2 = seg1.x2;
				seg1y1 = seg1.y1;
				seg1y2 = seg1.y2;
				inner: for(var j=0, jlen=segs2.length; j<jlen; ++j) {
					seg2 = segs2[j];
					if(seg2.x1 > seg1x2) {
						// seg1 still left of seg2
						break;
					}
					if(seg2.x2 < seg1x1) {
						// seg2 still left of seg1
						continue;
					}
					seg2y1 = seg2.y1;
					seg2y2 = seg2.y2;
					if(Math.min(seg2y1, seg2y2) > Math.max(seg1y1, seg1y2)) {
						// seg2 above seg1
						continue;
					}
					if(Math.max(seg2y1, seg2y2) < Math.min(seg1y1, seg1y2)) {
						// seg2 below seg1
						continue;
					}
					if(Geometry.segmentsIntersect(seg1, seg2)) {
						intersect = true;
						break outer;
					}
				}
			}
		} else {
			intersect = geometry.intersects(this);
		}
		return intersect;
	},
	
	getSortedSegments: function() {
		var numSeg = this.components.length - 1;
		var segments = new Array(numSeg), point1, point2;
		for(var i=0; i<numSeg; ++i) {
			point1 = this.components[i];
			point2 = this.components[i + 1];
			if(point1.x < point2.x) {
				segments[i] = {
					x1: point1.x,
					y1: point1.y,
					x2: point2.x,
					y2: point2.y
				};
			} else {
				segments[i] = {
					x1: point2.x,
					y1: point2.y,
					x2: point1.x,
					y2: point1.y
				};
			}
		}
		// more efficient to define this somewhere static
		function byX1(seg1, seg2) {
			return seg1.x1 - seg2.x1;
		}
		return segments.sort(byX1);
	},
	CLASS_NAME: "Geometry.LineString"
});

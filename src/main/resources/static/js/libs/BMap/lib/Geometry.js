/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/*global IDUtils:false,geoFormat:false,ClassBase:false */
/*jshint -W098,-W004,-W106 */
/**
 * Class: OpenLayers.Geometry
 * A Geometry is a description of a geographic object.  Create an instance of
 * this class with the <OpenLayers.Geometry> constructor.  This is a base class,
 * typical geometry types are described by subclasses of this class.
 *
 * Note that if you use the <OpenLayers.Geometry.fromWKT> method, you must
 * explicitly include the OpenLayers.Format.WKT in your build.
 */
var Geometry = ClassBase.extend({
	
	idPreFix: "Geometry",
	/**
	 * Property: id
	 * {String} A unique identifier for this geometry.
	 */
	id: null,
	
	/**
	 * Property: parent
	 * {<OpenLayers.Geometry>}This is set when a Geometry is added as component
	 * of another geometry
	 */
	parent: null,
	
	/**
	 * Property: bounds
	 * {<OpenLayers.Bounds>} The bounds of this geometry
	 */
	bounds: null,
	
	/**
	 * Constructor: OpenLayers.Geometry
	 * Creates a geometry object.
	 */
	init: function () {
		this.id = IDUtils.getID(this.idPreFix);
	},
	
	/**
	 * Method: destroy
	 * Destroy this geometry.
	 */
	destroy: function () {
		this.id = null;
		this.bounds = null;
	},
	
	/**
	 * APIMethod: clone
	 * Create a clone of this geometry.  Does not set any non-standard
	 *     properties of the cloned geometry.
	 *
	 * Returns:
	 * {<OpenLayers.Geometry>} An exact clone of this geometry.
	 */
	clone: function () {
		return new Geometry();
	},
	
	getVertices: function (nodes) {
	},
	transform: function (geom) {
		throw new Error("没有实现");
	},
	/**
	 * Method: toString
	 * Returns a text representation of the geometry.  If the WKT format is
	 *     included in a build, this will be the Well-Known Text
	 *     representation.
	 *
	 * Returns:
	 * {String} String representation of this geometry.
	 */
	toString: function () {
		var string;
		if (geoFormat && geoFormat.WKT) {
			string = geoFormat.WKT.prototype.write(this);
		} else {
			string = Object.prototype.toString.call(this);
		}
		return string;
	},
	
	CLASS_NAME: "Geometry"
});


Geometry.segmentsIntersect = function (seg1, seg2, options) {
	var point = options && options.point;
	var tolerance = options && options.tolerance;
	var intersection = false;
	var x11_21 = seg1.x1 - seg2.x1;
	var y11_21 = seg1.y1 - seg2.y1;
	var x12_11 = seg1.x2 - seg1.x1;
	var y12_11 = seg1.y2 - seg1.y1;
	var y22_21 = seg2.y2 - seg2.y1;
	var x22_21 = seg2.x2 - seg2.x1;
	var d = (y22_21 * x12_11) - (x22_21 * y12_11);
	var n1 = (x22_21 * y11_21) - (y22_21 * x11_21);
	var n2 = (x12_11 * y11_21) - (y12_11 * x11_21);
	if (d === 0) {
		// parallel
		if (n1 === 0 && n2 === 0) {
			// coincident
			intersection = true;
		}
	} else {
		var along1 = n1 / d;
		var along2 = n2 / d;
		if (along1 >= 0 && along1 <= 1 && along2 >= 0 && along2 <= 1) {
			// intersect
			if (!point) {
				intersection = true;
			} else {
				// calculate the intersection point
				var x = seg1.x1 + (along1 * x12_11);
				var y = seg1.y1 + (along1 * y12_11);
				intersection = new Geometry.Point(x, y);
			}
		}
	}
	if (tolerance) {
		var dist;
		if (intersection) {
			if (point) {
				var segs = [seg1, seg2];
				var seg, x, y;
				// check segment endpoints for proximity to intersection
				// set intersection to first endpoint within the tolerance
				outer: for (var i = 0; i < 2; ++i) {
					seg = segs[i];
					for (var j = 1; j < 3; ++j) {
						x = seg["x" + j];
						y = seg["y" + j];
						dist = Math.sqrt(
							Math.pow(x - intersection.x, 2) +
							Math.pow(y - intersection.y, 2)
						);
						if (dist < tolerance) {
							intersection.x = x;
							intersection.y = y;
							break outer;
						}
					}
				}
				
			}
		} else {
			// no calculated intersection, but segments could be within
			// the tolerance of one another
			var segs = [seg1, seg2];
			var source, target, x, y, p, result;
			// check segment endpoints for proximity to intersection
			// set intersection to first endpoint within the tolerance
			outer: for (var i = 0; i < 2; ++i) {
				source = segs[i];
				target = segs[(i + 1) % 2];
				for (var j = 1; j < 3; ++j) {
					p = {x: source["x" + j], y: source["y" + j]};
					result = Geometry.distanceToSegment(p, target);
					if (result.distance < tolerance) {
						if (point) {
							intersection = new Geometry.Point(p.x, p.y);
						} else {
							intersection = true;
						}
						break outer;
					}
				}
			}
		}
	}
	return intersection;
};

Geometry.distanceToSegment = function (point, segment) {
	var result = Geometry.distanceSquaredToSegment(point, segment);
	result.distance = Math.sqrt(result.distance);
	return result;
};

Geometry.distanceSquaredToSegment = function (point, segment) {
	var x0 = point.x;
	var y0 = point.y;
	var x1 = segment.x1;
	var y1 = segment.y1;
	var x2 = segment.x2;
	var y2 = segment.y2;
	var dx = x2 - x1;
	var dy = y2 - y1;
	var along = ((dx * (x0 - x1)) + (dy * (y0 - y1))) /
		(Math.pow(dx, 2) + Math.pow(dy, 2));
	var x, y;
	if (along <= 0.0) {
		x = x1;
		y = y1;
	} else if (along >= 1.0) {
		x = x2;
		y = y2;
	} else {
		x = x1 + along * dx;
		y = y1 + along * dy;
	}
	return {
		distance: Math.pow(x - x0, 2) + Math.pow(y - y0, 2),
		x: x, y: y,
		along: along
	};
};

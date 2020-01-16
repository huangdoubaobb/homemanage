/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**
 * @requires Geometry/MultiPoint
 */

/**
 * Class: Geometry.Curve
 * A Curve is a MultiPoint, whose points are assumed to be connected. To
 * this end, we provide a "getLength()" function, which iterates through
 * the points, summing the distances between them.
 *
 * Inherits:
 *  - <Geometry.MultiPoint>
 */
Geometry.Curve = Geometry.MultiPoint.extend({
	idPreFix: "Curve",
	/**
	 * Property: componentTypes
	 * {Array(String)} An array of class names representing the types of
	 *                 components that the collection can include.  A null
	 *                 value means the component types are not restricted.
	 */
	componentTypes: ["Geometry.Point"],
	
	/**
	 * Constructor: Geometry.Curve
	 *
	 * Parameters:
	 * point - {Array(<Geometry.Point>)}
	 */
	
	CLASS_NAME: "Geometry.Curve"
});

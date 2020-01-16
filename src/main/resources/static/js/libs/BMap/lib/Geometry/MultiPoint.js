/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**
 * @requires OpenLayers/Geometry/Collection.js
 * @requires OpenLayers/Geometry/Point.js
 */

/**
 * Class: Geometry.MultiPoint
 * MultiPoint is a collection of Points.  Create a new instance with the
 * <Geometry.MultiPoint> constructor.
 *
 * Inherits from:
 *  - <Geometry.Collection>
 *  - <Geometry>
 */
Geometry.MultiPoint = Geometry.Collection.extend({
	
	idPreFix: "MultiPoint",
	/**
	 * Property: componentTypes
	 * {Array(String)} An array of class names representing the types of
	 * components that the collection can include.  A null value means the
	 * component types are not restricted.
	 */
	componentTypes: ["Geometry.Point"],
	
	/**
	 * Constructor: Geometry.MultiPoint
	 * Create a new MultiPoint Geometry
	 *
	 * Parameters:
	 * components - {Array(<Geometry.Point>)}
	 *
	 * Returns:
	 * {<Geometry.MultiPoint>}
	 */
	
	/**
	 * APIMethod: addPoint
	 * Wrapper for <Geometry.Collection.addComponent>
	 *
	 * Parameters:
	 * point - {<Geometry.Point>} Point to be added
	 * index - {Integer} Optional index
	 */
	addPoint: function (point, index) {
		this.addComponent(point, index);
	},
	
	/**
	 * APIMethod: removePoint
	 * Wrapper for <Geometry.Collection.removeComponent>
	 *
	 * Parameters:
	 * point - {<Geometry.Point>} Point to be removed
	 */
	removePoint: function (point) {
		this.removeComponent(point);
	},
	
	CLASS_NAME: "Geometry.MultiPoint"
});

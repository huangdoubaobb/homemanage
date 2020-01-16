/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/*global  Geometry:false */

/**
 * Class: Geometry.MultiLineString
 * A MultiLineString is a geometry with multiple <Geometry.LineString>
 * components.
 *
 * Inherits from:
 *  - <Geometry.Collection>
 *  - <Geometry>
 */
Geometry.MultiLineString = Geometry.Collection.extend({
	idPreFix: "MultiLineString",
	/**
	 * Property: componentTypes
	 * {Array(String)} An array of class names representing the types of
	 * components that the collection can include.  A null value means the
	 * component types are not restricted.
	 */
	componentTypes: ["Geometry.LineString"],
	
	
	CLASS_NAME: "Geometry.MultiLineString"
});

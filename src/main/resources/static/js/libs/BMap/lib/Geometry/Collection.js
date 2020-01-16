/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**
 * @requires OpenLayers/Geometry.js
 */

/**
 * Class: OpenLayers.Geometry.Collection
 * A Collection is exactly what it sounds like: A collection of different
 * Geometries. These are stored in the local parameter <components> (which
 * can be passed as a parameter to the constructor).
 *
 * As new geometries are added to the collection, they are NOT cloned.
 * When removing geometries, they need to be specified by reference (ie you
 * have to pass in the *exact* geometry to be removed).
 *
 * The <getArea> and <getLength> functions here merely iterate through
 * the components, summing their respective areas and lengths.
 *
 * Create a new instance with the <OpenLayers.Geometry.Collection> constructor.
 *
 * Inherits from:
 *  - <OpenLayers.Geometry>
 */
Geometry.Collection = Geometry.extend({
	
	idPreFix: "Collection",
	/**
	 * APIProperty: components
	 * {Array(<OpenLayers.Geometry>)} The component parts of this geometry
	 */
	components: null,
	
	/**
	 * Property: componentTypes
	 * {Array(String)} An array of class names representing the types of
	 * components that the collection can include.  A null value means the
	 * component types are not restricted.
	 */
	componentTypes: null,
	
	/**
	 * Constructor: OpenLayers.Geometry.Collection
	 * Creates a Geometry Collection -- a list of geoms.
	 *
	 * Parameters:
	 * components - {Array(<OpenLayers.Geometry>)} Optional array of geometries
	 *
	 */
	init: function (components) {
		this.base("init", components);
		this.components = [];
		if (components !== null) {
			this.addComponents(components);
		}
	},
	
	/**
	 * APIMethod: destroy
	 * Destroy this geometry.
	 */
	destroy: function () {
		this.components.length = 0;
		this.components = null;
		this.base("destroy");
	},
	
	/**
	 * APIMethod: clone
	 * Clone this geometry.
	 *
	 * Returns:
	 * {<OpenLayers.Geometry.Collection>} An exact clone of this collection
	 */
	clone: function () {
		var geometry = eval("new " + this.CLASS_NAME + "()");
		for (var i = 0, len = this.components.length; i < len; i++) {
			geometry.addComponent(this.components[i].clone());
		}
		
		// catch any randomly tagged-on properties
		ClassBase.applyDefaults(geometry, this);
		
		return geometry;
	},
	
	
	/**
	 * APIMethod: addComponents
	 * Add components to this geometry.
	 *
	 * Parameters:
	 * components - {Array(<OpenLayers.Geometry>)} An array of geometries to add
	 */
	addComponents: function (components) {
		if (!(ClassBase.isArray(components))) {
			components = [components];
		}
		for (var i = 0, len = components.length; i < len; i++) {
			this.addComponent(components[i]);
		}
	},
	
	/**
	 * Method: addComponent
	 * Add a new component (geometry) to the collection.  If this.componentTypes
	 * is set, then the component class name must be in the componentTypes array.
	 *
	 * The bounds cache is reset.
	 *
	 * Parameters:
	 * component - {<OpenLayers.Geometry>} A geometry to add
	 * index - {int} Optional index into the array to insert the component
	 *
	 * Returns:
	 * {Boolean} The component geometry was successfully added
	 */
	addComponent: function (component, index) {
		var added = false;
		if (component) {
			if (this.componentTypes === null ||
				(ArrayUtils.indexOf(this.componentTypes,
					component.CLASS_NAME) > -1)) {
				
				if (index != null && (index < this.components.length)) {
					var components1 = this.components.slice(0, index);
					var components2 = this.components.slice(index,
						this.components.length);
					components1.push(component);
					this.components = components1.concat(components2);
				} else {
					this.components.push(component);
				}
				component.parent = this;
				added = true;
			}
		}
		return added;
	},
	
	/**
	 * APIMethod: removeComponents
	 * Remove components from this geometry.
	 *
	 * Parameters:
	 * components - {Array(<OpenLayers.Geometry>)} The components to be removed
	 *
	 * Returns:
	 * {Boolean} A component was removed.
	 */
	removeComponents: function (components) {
		var removed = false;
		
		if (!(ClassBase.isArray(components))) {
			components = [components];
		}
		for (var i = components.length - 1; i >= 0; --i) {
			removed = this.removeComponent(components[i]) || removed;
		}
		return removed;
	},
	
	/**
	 * Method: removeComponent
	 * Remove a component from this geometry.
	 *
	 * Parameters:
	 * component - {<OpenLayers.Geometry>}
	 *
	 * Returns:
	 * {Boolean} The component was removed.
	 */
	removeComponent: function (component) {
		
		ArrayUtils.removeItem(this.components, component);
		return true;
	},
	equals: function (geometry) {
		var equivalent = true;
		if (!geometry || !geometry.CLASS_NAME ||
			(this.CLASS_NAME != geometry.CLASS_NAME)) {
			equivalent = false;
		} else if (!(OpenLayers.Util.isArray(geometry.components)) ||
			(geometry.components.length != this.components.length)) {
			equivalent = false;
		} else {
			for (var i = 0, len = this.components.length; i < len; ++i) {
				if (!this.components[i].equals(geometry.components[i])) {
					equivalent = false;
					break;
				}
			}
		}
		return equivalent;
	},
	getVertices: function (nodes) {
		var vertices = [];
		for (var i = 0, len = this.components.length; i < len; ++i) {
			Array.prototype.push.apply(
				vertices, this.components[i].getVertices(nodes)
			);
		}
		return vertices;
	},
	intersects: function(geometry) {
		var intersect = false;
		for(var i=0, len=this.components.length; i<len; ++ i) {
			intersect = geometry.intersects(this.components[i]);
			if(intersect) {
				break;
			}
		}
		return intersect;
	},
	
	CLASS_NAME: "Geometry.Collection"
});

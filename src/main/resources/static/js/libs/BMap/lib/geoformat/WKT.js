/**
 * Created by liujie .
 */
/*jshint -W065,-W098 */

/*global StringUtils:false, Geometry:false,  geoFormat:false, ClassBase:false */


geoFormat.WKT = geoFormat.extend({
	
	
	init: function (options) {
		this.regExes = {
			'typeStr': /^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,
			'spaces': /\s+/,
			'parenComma': /\)\s*,\s*\(/,
			'doubleParenComma': /\)\s*\)\s*,\s*\(\s*\(/,  // can't use {2} here
			'trimParens': /^\s*\(?(.*?)\)?\s*$/
		};
		this.base("init", options);
	},
	read: function (wkt) {
		var features, type, str;
		wkt = wkt.replace(/[\n\r]/g, " ");
		var matches = this.regExes.typeStr.exec(wkt);
		if (matches) {
			type = matches[1].toLowerCase();
			str = matches[2];
			if (this.parse[type]) {
				features = this.parse[type].apply(this, [str]);
			}
		}
		return features;
	},
	write: function (geometrys) {
		var collection, geometry, isCollection;
		if (geometrys.constructor === Array) {
			collection = geometrys;
			isCollection = true;
		} else {
			collection = [geometrys];
			isCollection = false;
		}
		var pieces = [];
		if (isCollection) {
			pieces.push('GEOMETRYCOLLECTION(');
		}
		for (var i = 0, len = collection.length; i < len; ++i) {
			if (isCollection && i > 0) {
				pieces.push(',');
			}
			geometry = collection[i];
			pieces.push(this.extractGeometry(geometry));
		}
		if (isCollection) {
			pieces.push(')');
		}
		return pieces.join('');
	},
	extractGeometry: function (geometry) {
		var type = geometry.CLASS_NAME.split('.')[2].toLowerCase();
		if (!this.extract[type]) {
			return null;
		}
		if (this.internalProjection && this.externalProjection) {
			geometry = geometry.clone();
			geometry.transform(this.internalProjection, this.externalProjection);
		}
		var wktType = type === 'collection' ? 'GEOMETRYCOLLECTION' : type.toUpperCase();
		var data = wktType + '(' + this.extract[type].apply(this, [geometry]) + ')';
		return data;
	},
	extract: {
		/**
		 * Return a space delimited string of point coordinates.
		 * @param {Geometry.Point} point
		 * @returns {String} A string of coordinates representing the point
		 */
		'point': function (point) {
			return point.x + ' ' + point.y;
		},
		
		/**
		 * Return a comma delimited string of point coordinates from a multipoint.
		 * @param {Geometry.MultiPoint} multipoint
		 * @returns {String} A string of point coordinate strings representing
		 *                  the multipoint
		 */
		'multipoint': function (multipoint) {
			var array = [];
			for (var i = 0, len = multipoint.components.length; i < len; ++i) {
				array.push('(' +
					this.extract.point.apply(this, [multipoint.components[i]]) +
					')');
			}
			return array.join(',');
		},
		
		/**
		 * Return a comma delimited string of point coordinates from a line.
		 * @param {Geometry.LineString} linestring
		 * @returns {String} A string of point coordinate strings representing
		 *                  the linestring
		 */
		'linestring': function (linestring) {
			var array = [];
			for (var i = 0, len = linestring.components.length; i < len; ++i) {
				array.push(this.extract.point.apply(this, [linestring.components[i]]));
			}
			return array.join(',');
		},
		
		/**
		 * Return a comma delimited string of linestring strings from a multilinestring.
		 * @param {Geometry.MultiLineString} multilinestring
		 * @returns {String} A string of of linestring strings representing
		 *                  the multilinestring
		 */
		'multilinestring': function (multilinestring) {
			var array = [];
			for (var i = 0, len = multilinestring.components.length; i < len; ++i) {
				array.push('(' +
					this.extract.linestring.apply(this, [multilinestring.components[i]]) +
					')');
			}
			return array.join(',');
		},
		
		/**
		 * Return a comma delimited string of linear ring arrays from a polygon.
		 * @param {Geometry.Polygon} polygon
		 * @returns {String} An array of linear ring arrays representing the polygon
		 */
		'polygon': function (polygon) {
			var array = [];
			for (var i = 0, len = polygon.components.length; i < len; ++i) {
				array.push('(' +
					this.extract.linestring.apply(this, [polygon.components[i]]) +
					')');
			}
			return array.join(',');
		},
		
		/**
		 * Return an array of polygon arrays from a multipolygon.
		 * @param {Geometry.MultiPolygon} multipolygon
		 * @returns {String} An array of polygon arrays representing
		 *                  the multipolygon
		 */
		'multipolygon': function (multipolygon) {
			var array = [];
			for (var i = 0, len = multipolygon.components.length; i < len; ++i) {
				array.push('(' +
					this.extract.polygon.apply(this, [multipolygon.components[i]]) +
					')');
			}
			return array.join(',');
		},
		
		/**
		 * Return the WKT portion between 'GEOMETRYCOLLECTION(' and ')' for an <Geometry.Collection>
		 * @param {Geometry.Collection} collection
		 * @returns {String} internal WKT representation of the collection
		 */
		'collection': function (collection) {
			var array = [];
			for (var i = 0, len = collection.components.length; i < len; ++i) {
				array.push(this.extractGeometry.apply(this, [collection.components[i]]));
			}
			return array.join(',');
		}
		
	},
	parse: {
		/**
		 * Return point feature given a point WKT fragment.
		 * @param {String} str A WKT fragment representing the point
		 * @returns {Geometry} A point feature
		 * @private
		 */
		'point': function (str) {
			var coords = StringUtils.trim(str).split(this.regExes.spaces);
			return new Geometry.Point(coords[0], coords[1]);
			
		},
		
		/**
		 * Return a multipoint feature given a multipoint WKT fragment.
		 * @param {String} str A WKT fragment representing the multipoint
		 * @returns {Geometry} A multipoint feature
		 * @private
		 */
		'multipoint': function (str) {
			var point;
			var points = StringUtils.trim(str).split(',');
			var components = [];
			for (var i = 0, len = points.length; i < len; ++i) {
				point = points[i].replace(this.regExes.trimParens, '$1');
				components.push(this.parse.point.apply(this, [point]));
			}
			return new Geometry.MultiPoint(components);
		},
		
		/**
		 * Return a linestring feature given a linestring WKT fragment.
		 * @param {String} str A WKT fragment representing the linestring
		 * @returns {Geometry} A linestring feature
		 * @private
		 */
		'linestring': function (str) {
			var points = StringUtils.trim(str).split(',');
			var components = [];
			for (var i = 0, len = points.length; i < len; ++i) {
				components.push(this.parse.point.apply(this, [points[i]]));
			}
			return new Geometry.LineString(components);
		},
		
		/**
		 * Return a multilinestring feature given a multilinestring WKT fragment.
		 * @param {String} str A WKT fragment representing the multilinestring
		 * @returns {Geometry} A multilinestring feature
		 * @private
		 */
		'multilinestring': function (str) {
			var line;
			var lines = StringUtils.trim(str).split(this.regExes.parenComma);
			var components = [];
			for (var i = 0, len = lines.length; i < len; ++i) {
				line = lines[i].replace(this.regExes.trimParens, '$1');
				components.push(this.parse.linestring.apply(this, [line]));
			}
			return new Geometry.MultiLineString(components);
		},
		
		/**
		 * Return a polygon feature given a polygon WKT fragment.
		 * @param {String} str A WKT fragment representing the polygon
		 * @returns {Geometry} A polygon feature
		 * @private
		 */
		'polygon': function (str) {
			var ring, linestring, linearring;
			var rings = StringUtils.trim(str).split(this.regExes.parenComma);
			var components = [];
			for (var i = 0, len = rings.length; i < len; ++i) {
				ring = rings[i].replace(this.regExes.trimParens, '$1');
				linestring = this.parse.linestring.apply(this, [ring]);
				linearring = new Geometry.LinearRing(linestring.components);
				components.push(linearring);
			}
			return new Geometry.Polygon(components);
		},
		
		/**
		 * Return a multipolygon feature given a multipolygon WKT fragment.
		 * @param {String} str A WKT fragment representing the multipolygon
		 * @returns {Geometry} A multipolygon feature
		 * @private
		 */
		'multipolygon': function (str) {
			var polygon;
			var polygons = StringUtils.trim(str).split(this.regExes.doubleParenComma);
			var components = [];
			for (var i = 0, len = polygons.length; i < len; ++i) {
				polygon = polygons[i].replace(this.regExes.trimParens, '$1');
				components.push(this.parse.polygon.apply(this, [polygon]));
			}
			return new Geometry.MultiPolygon(components);
		},
		
		/**
		 * Return an array of features given a geometrycollection WKT fragment.
		 * @param {String} str A WKT fragment representing the geometrycollection
		 * @returns {Array} An array of Geometry
		 * @private
		 */
		'geometrycollection': function (str) {
			// separate components of the collection with |
			str = str.replace(/,\s*([A-Za-z])/g, '|$1');
			var wktArray = StringUtils.trim(str).split('|');
			var components = [];
			for (var i = 0, len = wktArray.length; i < len; ++i) {
				components.push(geoFormat.WKT.prototype.read.apply(this, [wktArray[i]]));
			}
			return components;
		}
		
	},
	CLASS_NAME: "geoFormat.WKT"
});

/*jshint +W065 ,+W098 */

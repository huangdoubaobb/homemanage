/*jshint -W065,-W098 */

var ArrayUtils = {
	
	indexOf: function (arr, item) {
		// use the build-in function if available.
		if (typeof arr.indexOf === "function") {
			return arr.indexOf(item);
		} else {
			for (var i = 0, len = arr.length; i < len; i++) {
				if (arr[i] === item) {
					return i;
				}
			}
			return -1;
		}
	},
	removeItem: function (arr, item) {
		for (var i = arr.length - 1; i >= 0; i--) {
			if (arr[i] === item) {
				arr.splice(i, 1);
				//break;more than once??
			}
		}
		return arr;
	},
	CLASS_NAME: "ArrayUtils"
};
var StringUtils = {
	dotless: /\./g,
	
	/**
	 * APIFunction: startsWith
	 * Test whether a string starts with another string.
	 *
	 * Parameters:
	 * str - {String} The string to test.
	 * sub - {String} The substring to look for.
	 *
	 * Returns:
	 * {Boolean} The first string starts with the second.
	 */
	startsWith: function (str, sub) {
		return (str.indexOf(sub) === 0);
	},
	
	/**
	 * APIFunction: contains
	 * Test whether a string contains another string.
	 *
	 * Parameters:
	 * str - {String} The string to test.
	 * sub - {String} The substring to look for.
	 *
	 * Returns:
	 * {Boolean} The first string contains the second.
	 */
	contains: function (str, sub) {
		return (str.indexOf(sub) !== -1);
	},
	
	/**
	 * APIFunction: trim
	 * Removes leading and trailing whitespace characters from a string.
	 *
	 * Parameters:
	 * str - {String} The (potentially) space padded string.  This string is not
	 *     modified.
	 *
	 * Returns:
	 * {String} A trimmed version of the string with all leading and
	 *     trailing spaces removed.
	 */
	trim: function (str) {
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	},
	
	/**
	 * APIFunction: camelize
	 * Camel-case a hyphenated string.
	 *     Ex. "chicken-head" becomes "chickenHead", and
	 *     "-chicken-head" becomes "ChickenHead".
	 *
	 * Parameters:
	 * str - {String} The string to be camelized.  The original is not modified.
	 *
	 * Returns:
	 * {String} The string, camelized
	 */
	camelize: function (str) {
		var oStringList = str.split('-');
		var camelizedString = oStringList[0];
		for (var i = 1, len = oStringList.length; i < len; i++) {
			var s = oStringList[i];
			camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
		}
		return camelizedString;
	},
	
	/**
	 * APIFunction: format
	 * Given a string with tokens in the form ${token}, return a string
	 *     with tokens replaced with properties from the given context
	 *     object.  Represent a literal "${" by doubling it, e.g. "${${".
     *
     * Parameters:
     * template - {String} A string with tokens to be replaced.  A template
     *     has the form "literal ${token}" where the token will be replaced
     *     by the value of context["token"].
     * context - {Object} An optional object with properties corresponding
     *     to the tokens in the format string.  If no context is sent, the
     *     window object will be used.
     * args - {Array} Optional arguments to pass to any functions found in
     *     the context.  If a context property is a function, the token
     *     will be replaced by the return from the function called with
     *     these arguments.
     *
     * Returns:
     * {String} A string with tokens replaced from the context object.
     */
	format: function (template, context, args) {
		if (!context) {
			context = window;
		}
		
		// Example matching: 
		// str   = ${foo.bar}
		// match = foo.bar
		var replacer = function (str, match) {
			var replacement;
			
			// Loop through all subs. Example: ${a.b.c}
			// 0 -> replacement = context[a];
			// 1 -> replacement = context[a][b];
			// 2 -> replacement = context[a][b][c];
			var subs = match.split(/\.+/);
			for (var i = 0; i < subs.length; i++) {
				if (i === 0) {
					replacement = context;
				}
				if (replacement === undefined) {
					break;
				}
				replacement = replacement[subs[i]];
			}
			
			if (typeof replacement === "function") {
				replacement = args ?
					replacement.apply(null, args) :
					replacement();
			}
			
			// If replacement is undefined, return the string 'undefined'.
			// This is a workaround for a bugs in browsers not properly 
			// dealing with non-participating groups in regular expressions:
			// http://blog.stevenlevithan.com/archives/npcg-javascript
			if (typeof replacement === 'undefined') {
				return 'undefined';
			} else {
				return replacement;
			}
		};
		
		return template.replace(StringUtils.tokenRegEx, replacer);
	},
	
	/**
	 * Property: tokenRegEx
	 * Used to find tokens in a string.
	 * Examples: ${a}, ${a.b.c}, ${a-b}, ${5}
	 */
	tokenRegEx: /\$\{([\w.]+?)\}/g,
	
	/**
	 * Property: numberRegEx
	 * Used to test strings as numbers.
	 */
	numberRegEx: /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/,
	
	/**
	 * APIFunction: isNumeric
	 * Determine whether a string contains only a numeric value.
	 *
	 * Examples:
	 * (code)
	 * OpenLayers.String.isNumeric("6.02e23") // true
	 * OpenLayers.String.isNumeric("12 dozen") // false
	 * OpenLayers.String.isNumeric("4") // true
	 * OpenLayers.String.isNumeric(" 4 ") // false
	 * (end)
	 *
	 * Returns:
	 * {Boolean} String contains only a number.
	 */
	isNumeric: function (value) {
		return StringUtils.numberRegEx.test(value);
	},
	
	/**
	 * APIFunction: numericIf
	 * Converts a string that appears to be a numeric value into a number.
	 *
	 * Parameters:
	 * value - {String}
	 * trimWhitespace - {Boolean}
	 *
	 * Returns:
	 * {Number|String} a Number if the passed value is a number, a String
	 *     otherwise.
	 */
	numericIf: function (value, trimWhitespace) {
		var originalValue = value;
		if (trimWhitespace === true && value !== null && value.replace) {
			value = value.replace(/^\s*|\s*$/g, "");
		}
		return StringUtils.isNumeric(value) ? parseFloat(value) : originalValue;
	}
	
};

var NumberUtils = {
	
	/**
	 * Property: decimalSeparator
	 * Decimal separator to use when formatting numbers.
	 */
	decimalSeparator: ".",
	
	/**
	 * Property: thousandsSeparator
	 * Thousands separator to use when formatting numbers.
	 */
	thousandsSeparator: ",",
	
	/**
	 * APIFunction: limitSigDigs
	 * Limit the number of significant digits on a float.
	 *
	 * Parameters:
	 * num - {Float}
	 * sig - {Integer}
	 *
	 * Returns:
	 * {Float} The number, rounded to the specified number of significant
	 *     digits.
	 */
	limitSigDigs: function (num, sig) {
		var fig = 0;
		if (sig > 0) {
			fig = parseFloat(num.toPrecision(sig));
		}
		return fig;
	},
	
	/**
	 * APIFunction: format
	 * Formats a number for output.
	 *
	 * Parameters:
	 * num  - {Float}
	 * dec  - {Integer} Number of decimal places to round to.
	 *        Defaults to 0. Set to null to leave decimal places unchanged.
	 * tsep - {String} Thousands separator.
	 *        Default is ",".
	 * dsep - {String} Decimal separator.
	 *        Default is ".".
	 *
	 * Returns:
	 * {String} A string representing the formatted number.
	 */
	format: function (num, dec, tsep, dsep) {
		dec = (typeof dec !== "undefined") ? dec : 0;
		tsep = (typeof tsep !== "undefined") ? tsep :
			NumberUtils.thousandsSeparator;
		dsep = (typeof dsep !== "undefined") ? dsep :
			NumberUtils.decimalSeparator;
		
		if (dec !== null) {
			num = parseFloat(num.toFixed(dec));
		}
		
		var parts = num.toString().split(".");
		if (parts.length === 1 && dec === null) {
			// integer where we do not want to touch the decimals
			dec = 0;
		}
		
		var integer = parts[0];
		if (tsep) {
			var thousands = /(-?[0-9]+)([0-9]{3})/;
			while (thousands.test(integer)) {
				integer = integer.replace(thousands, "$1" + tsep + "$2");
			}
		}
		
		var str;
		if (dec === 0) {
			str = integer;
		} else {
			var rem = parts.length > 1 ? parts[1] : "0";
			if (dec !== null) {
				rem = rem + new Array(dec - rem.length + 1).join("0");
			}
			str = integer + dsep + rem;
		}
		return str;
	},
	
	/**
	 * Method: zeroPad
	 * Create a zero padded string optionally with a radix for casting numbers.
	 *
	 * Parameters:
	 * num - {Number} The number to be zero padded.
	 * len - {Number} The length of the string to be returned.
	 * radix - {Number} An integer between 2 and 36 specifying the base to use
	 *     for representing numeric values.
	 */
	zeroPad: function (num, len, radix) {
		var str = num.toString(radix || 10);
		while (str.length < len) {
			str = "0" + str;
		}
		return str;
	}
};

var IDUtils = {
	getID: function (prefix) {
		if (!prefix) {
			prefix = "id_";
		} else {
			prefix = prefix.replace(StringUtils.dotless, "_");
		}
		IDUtils.lastSeqID += 1;
		return prefix + IDUtils.lastSeqID;
	},
	lastSeqID: 0
};

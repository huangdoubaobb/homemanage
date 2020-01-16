/*jshint -W065, -W117, -W030,-W106,-W089,-W083 */

(function (g) {
	// 所有类的基类
	g.ClassBase = function () {};
	ClassBase.prototype.extending = false;
	ClassBase.prototype.init = function () {};
	ClassBase.prototype.CLASS_NAME = "ClassBase";
	
	ClassBase.extend = function _extend(propertys) {
		var parentPrototype = this.prototype;
		
		this.prototype.extending = true;
		var childProto = new this();
		this.prototype.extending = false;
		for (var name in propertys) {
			//noinspection JSUnfilteredForInLoop
			
			childProto[name] = typeof propertys[name] === "function" &&
			typeof parentPrototype[name] === "function" ?
				(function (name, fn) {
					return function () {
						var tmp = this.base;
						this.base = function (methodName) {
							if (typeof  parentPrototype[methodName] === "function") {
								var args = new Array(arguments.length - 1);
								for (var i = 1; i < arguments.length; i++) {
									args[i - 1] = arguments[i];
								}
								return parentPrototype[methodName].apply(this, args);
							}
						};
						var ret = fn.apply(this, arguments);
						this.base = tmp;
						return ret;
					};
				})(name, propertys[name]) : propertys[name];
		}
		function CLS() {
			if (!this.extending && this.init) {
				this.init.apply(this, arguments);
			}
		}
		
		CLS.prototype = childProto;
		CLS.prototype.constructor = CLS;
		CLS.extend = _extend;
		return CLS;
	};
	ClassBase.combine = function (destination, source) {
		destination = destination || {};
		if (source) {
			for (var property in source) {
				//noinspection JSUnfilteredForInLoop
				destination[property] = source[property];
			}
			
			/**
			 * IE doesn't include the toString property when iterating over an object's
			 * properties with the for(property in object) syntax.  Explicitly check if
			 * the source has its own toString property.
			 */
			
			/**
			 * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
			 * prototype object" when calling hawOwnProperty if the source object
			 * is an instance of window.Event.
			 */
			
			var sourceIsEvt = typeof window.Event === "function" && source instanceof window.Event;
			
			if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty("toString")) {
				destination.toString = source.toString;
			}
		}
		return destination;
	};
	ClassBase.applyDefaults = function (destination, source) {
		destination = destination || {};
		/**
		 * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
		 * prototype object" when calling hawOwnProperty if the source object is an
		 * instance of window.Event.
		 */
		var sourceIsEvt = typeof window.Event === "function" && source instanceof window.Event;
		
		for (var key in source) {
			//noinspection JSUnfilteredForInLoop
			if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty(key) && !destination.hasOwnProperty(key)) {
				//noinspection JSUnfilteredForInLoop
				destination[key] = source[key];
			}
		}
		/**
		 * IE doesn't include the toString property when iterating over an object's
		 * properties with the for(property in object) syntax.  Explicitly check if
		 * the source has its own toString property.
		 */
		if (!sourceIsEvt && source && source.hasOwnProperty && source.hasOwnProperty('toString') && !destination.hasOwnProperty('toString')) {
			destination.toString = source.toString;
		}
		return destination;
	};
	ClassBase.bindFunctionScope = function (scope, fn) {
		return function () {
			return fn.apply(scope, arguments);
		};
	};
	ClassBase.falseFn = function () {
		return false;
	};
	ClassBase.isArray = function (obj) {
		return (Object.prototype.toString.call(obj) === '[object Array]');
	};
}(window));

/*jshint +W065 ,+W106, +W117, +W030 ,+W089,+W083*/

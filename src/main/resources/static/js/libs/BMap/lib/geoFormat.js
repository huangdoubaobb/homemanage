/**
 * Created by liujie .
 */
/*jshint -W065,-W098 */

/*global   ClassBase:false */

var geoFormat = ClassBase.extend({
	
	/**
	 * 传入的投影对象
	 */
	Projection: null,
	/**
	 * 内置投影对象执行默认抽影行为
	 */
	internalProjection: null,
	
	init: function (options) {
		
	},
	destroy: function () {
	},
	read: function (data) {
		throw new Error('Read not implemented.');
	},
	write: function (object) {
		throw new Error('Write not implemented.');
	},
	CLASS_NAME: "geoFormat"
});


/*jshint +W065 ,+W098 */

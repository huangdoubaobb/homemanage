var Initor = ClassBase.extend({
	
	bMapLayer: null,
	map: null,
	url: "",
	style: null,
	minZoom: 1,
	maxZoom: 19,
	renderField: "",
	dataLoaderOptions: null,
	labelField: "",
	enableLabel: false,
	layerType: null,
	layerName: "",
	overlayHandler: null,
	
	init: function (options) {
		ClassBase.combine(this, options);
		this.bMapLayer = new this.layerType({
			bMap: this.map,
			dataUrl: this.url,
			showOnAdd: true,
			minZoom: this.minZoom,
			maxZoom: this.maxZoom,
			renderField: this.renderField,
			dataLoaderOptions: this.dataLoaderOptions,
			labelField: this.labelField,
			enableLabel: this.enableLabel,
			renderType: this.style,
			layerName: this.layerName,
			overlayHandler: this.overlayHandler
		});
	}
});
/**
 * Created by liujie .
 */
/*jshint -W065,-W098 */

/*global OpenLayers:false, glMap:false, ClassBase:false */





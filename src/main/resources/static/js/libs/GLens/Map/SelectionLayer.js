/**
 * 在图层定位
 * User: xubing
 * Date: 14-5-26
 * Time: 上午10:12
 *
 */
function GLensSelectionLayer(map){
    this._map=map;
    var style = new OpenLayers.StyleMap({
    	'default': OpenLayers.Util.applyDefaults(
                {pointRadius: 1,strokeColor: "red"},
                OpenLayers.Feature.Vector.style.select
        ),
        'select': OpenLayers.Util.applyDefaults(
            {pointRadius: 1},
            OpenLayers.Feature.Vector.style.select
        )
    });
    
    this.selectionLayer = new OpenLayers.Layer.Vector("GLens.Map.SelectionLayer", {
        styleMap: new OpenLayers.Style(OpenLayers.Feature.Vector.style["select"]),
        displayInLayerSwitcher: false
    });
    this.selectControl = new OpenLayers.Control.SelectFeature(
			this.selectionLayer); //添加点击事件
    this._map.addLayer(this.selectionLayer);
    
    this.selectFeatures=function(callback){	
		this._map.addControl(this.selectControl);
		this.selectControl.activate();//激活点击事件
		this.selectionLayer.events.on({ //注册监听事件
			featureselected : callback
		});
    };
    
    this.unselectAll=function(options){
    	this.selectControl.unselectAll(options);
    };
    
    //features为OpenLayers.Feature.Vector对象数组
    this.addFeatures=function(features){
        this.selectionLayer.addFeatures(features);
    };

    this.removeAll=function(){
        this.selectionLayer.removeAllFeatures();
    };

    this.redraw=function(){
        this.selectionLayer.redraw();
    };
}
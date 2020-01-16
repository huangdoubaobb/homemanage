/**
 * 气泡弹出框 
 * User: xubing 
 * Date: 14-5-26 
 * Time: 上午10:12
 * 
 */

function GLensPopup(map, options) {
	/* 选中SelectFeature打开Popup标记事件回调函数 */
	this.onFeatureSelected = function(map,selectFeature) {
		var thatMap = map;
		var thatSelectFeature = selectFeature;
		return function(e) {
			var feature = e.feature;
			var popup = new OpenLayers.Popup.FramedCloud("", feature.geometry
					.getBounds().getCenterLonLat(), new OpenLayers.Size(100,
					100), feature.attributes.html, null, true, function(e) {
				thatSelectFeature._selectControl.unselect(feature);
			});
			feature.popup = popup;
			popup.feature = feature;
			thatMap.addPopup(popup);
		};
	};
	
	this._selectControl = new OpenLayers.Control.SelectFeature(options.layer); // 添加点击标记事件
	map.addControl(this._selectControl);
	options.layer.events.on({ // 画popup窗
		featureselected : this.onFeatureSelected(map,this),
		featureunselected : function(e) {
			var feature = e.feature;
			if (feature.popup) {
				map.removePopup(feature.popup);
				feature.popup.destroy();
				feature.popup = null;
			}
		}
	});
	
	this.removeAllPopup=function(){
		var popups = map.popups;
        for(var i=0;i<popups.length;i++){
            map.removePopup(popups[i]);
        }
	};

    this.activatePopup=function(){
        this._selectControl.activate();
    };
    
    this.deActivatePopup=function(){
        this._selectControl.deactivate();
    };
}

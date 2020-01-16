/**
 * 地图业务逻辑
 * User: xubing
 * Date: 14-5-26
 * Time: 上午10:12
 *
 */
function GLensMapView(div, options){
	options.drawBoxQueryLayers = [{layerName:'G_TZ_ZY_TRANSFORMER',type:"device"},
	                              {layerName:'G_TZ_ZY_LOADBREAKSWITCH',type:"device"},
	                              {layerName:'G_TZ_ZY_ENERGYCONSUMER',type:"device"},
	                              {layerName:'G_TZ_ZY_POLE',type:"device"},
	                              {layerName:'G_TZ_ZY_CONTAINER',type:"device"},
	                              {layerName:'G_TZ_ZY_ACLINESEGMENT',type:"circuit"}];//拉框查询所需的图层名称
    this.map = new GLensMap(div, options);
    this.queryUrl = options.queryUrl; //"http://127.0.0.1:8399/arcgis/services/testgis2/MapServer/WFSServer";
    this.mapUrl = options.mapUrl; //"http://127.0.0.1:8399/arcgis/services/testgis2/MapServer/WMSServer?";
    this.mapLayers = new Array();
    this.baseLayer = new GLensMapLayer(this.map._map,
        {
            layerName: options.layerName,
            url: this.mapUrl,
            layers: options.layers,
            isBaseLayer: true,
            visibility: true,
            displayInLayerSwitcher: false
        }
    );
    this.mapLayers.push(this.baseLayer);

    /*添加图层*/
    this.addOverlayer = function (layerName, layers) {
        var mapLayer = new GLensMapLayer(this.map._map,
            {
                layerName: layerName,
                url: this.mapUrl,
                layers: layers,
                isBaseLayer: false,
                visibility: true,
                displayInLayerSwitcher: true
            }
        );
        this.mapLayers.push(mapLayer);
    };

    /*创建一些临时图层，用来定位、轨迹回放等*/
    this.createTrackLayer = function () {
        this.map.createTrackLayer();
    };

    /*坐标定位
    *lonlat:经纬度对象,属性：{lon, lat}
    *zoom:比例，整型值，可选
    * */
    this.setCenter=function (lonlat, zoom) {
        this.map.setCenter(lonlat, zoom); //119.811, 31.389
    };

    /*extent为对象，属性包括
    *{left,top,right,bottom}
    */
    this.zoomToExtent = function (extent) {
        this.map.zoomToExtent(extent);
    };

    /*线路定位
    * */
    this.locateCircuit=function(id,options) {
        this.locate("G_TZ_ZY_ACLINESEGMENT", "CIRCUITID", id, options);//定位线路
    };

    /*变压器定位
    * */
    this.locateTransformer=function(id,options) {
        this.locate("G_TZ_ZY_TRANSFORMER", "ID", id, options);//定位变压器
    };
    
    /*开关定位
     * */
     this.locateLoadbreakSwitch=function(id,options) {
         this.locate("G_TZ_ZY_LOADBREAKSWITCH", "ID", id, options);//开关定位
     };

    /*杆塔定位
    * */
    this.locatePole=function(id,options) {
        this.locate("G_TZ_ZY_POLE", "ID", id, options);//定位杆塔
    };

    /*变电站、环网柜、分支箱、配电房、开闭所定位
    * */
    this.locateStation=function(id,options) {
        this.locate("G_TZ_ZY_CONTAINER", "ID", id, options);
    };
    
    /*缺陷定位
     * */
    this.locateDefect=function(id,options){
    	var layerNames=["G_TZ_ZY_TRANSFORMER","G_TZ_ZY_POLE","G_TZ_ZY_CONTAINER"];
    	this.locate(layerNames, "ID", id, options);
    };

    this.registerMoveEndEvent=function (callback) {
        this.map.registerMoveEndEvent(callback);
    };

    this.registerZoomEndEvent=function (callback) {
        this.map.registerZoomEndEvent(callback);
    };

    /*返回当前地图的临时定位图层*/
    this.getSelectionLayer = function () {
        return this.map.getSelectionLayer();
    };

    /*返回当前地图的临时Track轨迹图层*/
    this.getTrackLayer = function () {
        return this.map.getTrackLayer();
    };

    /*返回当前地图的临时Marker轨迹图层*/
    this.getMarkersLayer = function () {
        return this.map.getMarkersLayer();
    };

    /*返回当前地图的工具栏面板*/
    this.getButtonPanel = function () {
        return this.map.getButtonPanel();
    };
    
    /*返回当前地图的临时绘画层*/
	this.getDrawLayer=function(){
		return this.map.getDrawLayer();
	};

    this.getExtent=function () {
        return this.map.getExtent();
    };

    this.getGLensMapMinLocationScale = function () {
        return this.map.getGLensMapMinLocationScale();
    };

    /*
     * 属性定位
     * layerName:图层名称
     * propertyName：图层属性名称
     * propertyValue：需要定位的属性值
     * */
    this.locate = function (layerName, propertyName, propertyValue,options) {
        if (OpenLayers.Util.isArray(propertyValue)) {
            var filter = this.getFilterLogical_OR(propertyName, propertyValue);
            this.baseLayer.queryFilter(this.queryUrl, //"http://127.0.0.1:8399/arcgis/services/testgis2/MapServer/WFSServer"
                layerName, filter, this.handlerLocation(this.map,options));
        }
        else {
            this.baseLayer.query(this.queryUrl, //"http://127.0.0.1:8399/arcgis/services/testgis2/MapServer/WFSServer"
                layerName, propertyName, propertyValue, this.handlerLocation(this.map,options));
        }
    };

    /*属性定位回调函数
     *map:当前封装的GlensMap对象
     * */
    this.handlerLocation = function (map,options) {
        var thatMap = map;
        var thisOptions = options;
        var thatOptions = this._options || {};
        if (thatOptions.zoom === undefined) {
            thatOptions.zoom = 13;
        }
        return function (features, extent) {
            features = features || {};
            thatMap._selectionLayer.removeAll();
            if (features.length == 0) {
                alert("定位的设备或线路在地图上不存在!");
                thisOptions.callback();//定位结束的回调函数，此处用来关闭等待提示
                return;
            }
            thatMap._selectionLayer.addFeatures(features);
            if(thisOptions.selectFeature){
            	thatMap._selectionLayer.selectFeatures(thisOptions.selectFeaturesCallback(thisOptions.data,thatMap._selectionLayer));
            }
            if (extent.getWidth() < thatMap.GLens_Map_MinLocationScale || extent.getHeight() < thatMap.GLens_Map_MinLocationScale) {
                thatMap.setCenter(extent.getCenterLonLat(), thatOptions.zoom);
            }
            else {
                if (thatOptions.extent === undefined || thatOptions.extent === null) {
                    thatMap.zoomToExtent(extent);
                }
                else {
                    thatMap.zoomToExtent(new OpenLayers.Bounds(thatOptions.extent.left, thatOptions.extent.bottom,
                        thatOptions.extent.right, thatOptions.extent.top));
                }
            }
            thisOptions.callback();//定位结束的回调函数，此处用来关闭等待提示
        };
    };

    /*属性定位过滤条件*/
    this.getFilterLogical_OR = function (propertyName, propertyValues, op) {
        if (op === undefined || op === null)
            op = OpenLayers.Filter.Comparison.EQUAL_TO;
        var filters = new Array();
        for (var i in propertyValues) {
        		var filter = new OpenLayers.Filter.Comparison({
                    type: op,
                    property: propertyName,
                    //matchCase:false,
                    value: propertyValues[i]
                });
                filters.push(filter);
        }
        if (filters.length == 1) {
            return filters[0];
        }
        else {
            return new OpenLayers.Filter.Logical({
                    type: OpenLayers.Filter.Logical.OR,
                    filters: filters
                }
            );
        }
    };
}
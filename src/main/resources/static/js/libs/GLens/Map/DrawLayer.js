/**
 * 在地图上画点、线、多边形
 * User: xubing
 * Date: 14-5-26
 * Time: 上午10:12
 *
 */
function GLensDrawLayer(map,options){
    this._map=map;
    this._options=options;
    this._pointLayer = new OpenLayers.Layer.Vector("GLens.Map.PointLayer");//点
    this._lineLayer = new OpenLayers.Layer.Vector("GLens.Map.LineLayer");//线
    this._boxLayer = new OpenLayers.Layer.Vector("GLens.Map.BoxLayer");//矩形
    this._polygonLayer = new OpenLayers.Layer.Vector("GLens.Map.PolygonLayer");//多边形
    this._map.addLayers([this._pointLayer,this._lineLayer,this._boxLayer,this._polygonLayer]);
    this._popup= new GLensPopup(this._map,{layer:this._polygonLayer});//添加气泡弹出框
    this._drawControls = {
        point: new OpenLayers.Control.DrawFeature( this._pointLayer,
            OpenLayers.Handler.Point),//点
        line: new OpenLayers.Control.DrawFeature(this._lineLayer,
            OpenLayers.Handler.Path),//线
        polygon: new OpenLayers.Control.DrawFeature(this._polygonLayer,
            OpenLayers.Handler.Polygon),//多边形
        box: new OpenLayers.Control.DrawFeature( this._boxLayer,
            OpenLayers.Handler.RegularPolygon, {
                handlerOptions: {
                    sides: 4,
                    irregular: true
                }
            }//矩形
        )
    };
    for(var key in this._drawControls) {
        var control = this._drawControls[key];
        this._map.addControl(control);
        //control.featureAdded =this._options.drawFeatureAdded;
    }
    
    /*在地图上添加1个多边形
     * [{lon:119.22222,lat:32.22222},{lon:119.22222,lat:32.22222}]
     * */
    this.addPolygon=function(lonlats,html){
        var pointList = [];
        this._popup.removeAllPopup();
        this._polygonLayer.removeAllFeatures();
        for(var i=0;i<lonlats.length;i++){
            pointList.push(new OpenLayers.Geometry.Point(parseFloat(lonlats[i].lon), parseFloat(lonlats[i].lat)));
        }
        if( html  === undefined || html === null ){
        	html ="<tr></tr>";
        }
        var linearRing = new OpenLayers.Geometry.LinearRing(pointList);
        var polygonFeature = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Polygon([linearRing]),{html:html});
        this._polygonLayer.addFeatures([polygonFeature]);
        this._popup.activatePopup();
    };
    
    /*
     * 在地图上添加N个多边形
     * [{bounds:[{lon:119.87076,lat:32.33942},{lon:119.87076,lat:32.33992},{lon:119.87236,lat:32.33992},{lon:119.87236,lat:32.33942},{lon:119.87076,lat:32.33942}]}]
     * */
    this.addPolygons=function(bounds){
    	var polygonFeature=new Array();
    	this._popup.removeAllPopup();
    	this._polygonLayer.removeAllFeatures();
    	//bounds=[{bounds:[{lon:119.87076,lat:32.33942},{lon:119.87076,lat:32.33992},{lon:119.87236,lat:32.33992},{lon:119.87236,lat:32.33942},{lon:119.87076,lat:32.33942}]}];
    	for(var i=0;i<bounds.length;i++){
        	var bound=eval(bounds[i].bounds);
        	var pointList = [];
            for(var j=0;j<bound.length;j++){
                pointList.push(new OpenLayers.Geometry.Point(parseFloat(bound[j].lon), parseFloat(bound[j].lat)));
            }
            var html=bounds[i].html;
        	if( html  === undefined || html === null ){
            	html ="<tr></tr>";
            }
            var linearRing = new OpenLayers.Geometry.LinearRing(pointList);
            var polygonVector = new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Polygon([linearRing]),{html:html});
            polygonFeature.push(polygonVector);
        }
        this._polygonLayer.addFeatures(polygonFeature);
        this._popup.activatePopup();
    };
    
    /*激活*/
    this.activate=function(con,options){
        for(key in this._drawControls) {
            var control = this._drawControls[key];
            if(key===con){
            	control.featureAdded =options.drawFeatureAdded;
                control.activate();
            }
            else{
            	control.deactivate();
            } 
        }
    };
    
    this.deActivate=function(){
        for(key in this._drawControls) {
            var control = this._drawControls[key];
            control.deactivate();
        }
    };
    
    this.removeAll=function() {
    	this._popup.removeAllPopup();
        this._pointLayer.removeAllFeatures();
        this._lineLayer.removeAllFeatures();
        this._boxLayer.removeAllFeatures();
        this._polygonLayer.removeAllFeatures();
    };
}
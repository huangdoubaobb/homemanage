/**
 * 在地图上画轨迹
 * User: xubing
 * Date: 14-5-26
 * Time: 上午10:12
 *
 */
function GLensMarkersLayer(map){
    this._map=map;
    this._imgUrl = "GLens/img/default_marker.png";
    this._popupFlag=false;

    /*轨迹图层样式*/
    var GLens_Map_MarkersLayer_DEFAULT_MARKERS_STYLE = new OpenLayers.Style({
        strokeColor: "#00FF00",
        strokeOpacity: 1,
        strokeWidth: 3,
        fillColor: "#FF5500",
        fillOpacity: 1,
        pointRadius: 6,
        pointerEvents: "visiblePainted",

        //externalGraphic: "./images/marker.png", //externalGraphic url from attribute url use "${url}"
        externalGraphic: "${imgUrl}",
        graphicXOffset :  -16,
        graphicYOffset :  -32,
        graphicWidth   : 32,
        graphicHeight  : 32,
        rotation:0,

        label : "${label}",

        //fontColor: "${favColor}",
        fontColor:"red",
        fontSize: "12px",
        //fontFamily: "Courier New, monospace",
        fontFamily:"微软雅黑",
        //fontWeight: "bold",
        //labelAlign: "left",
        //labelXOffset: "${xOffset}",
        //labelYOffset: "${yOffset}",
        labelXOffset: 0,
        labelYOffset: 40

        //labelOutlineColor: "white",
        //labelOutlineWidth: 3
    });
    /**创建轨迹图层*/
    this.markerStyle = GLens_Map_MarkersLayer_DEFAULT_MARKERS_STYLE;
    this.markersLayer = new OpenLayers.Layer.Vector("GLens.Map.MarkersLayer", {
        styleMap: new OpenLayers.StyleMap(this.markerStyle),
        displayInLayerSwitcher: false
    });
    this._map.addLayer(this.markersLayer);
    this._popup= new GLensPopup(this._map,{layer:this.markersLayer});//添加气泡弹出框

    /*
     lon:经度
     lat:纬度
     imgUrl:marker的图标,可选
     label:marker的标签,可选
     */
    this.addMarker=function(lon, lat, imgUrl, label)
    {
    	var markers =  new Array(1);
    	markers[0] = {lon:lon, lat:lat,imgUrl:imgUrl, label:label};
        this.addMarkers(markers[0]);
    };

    /*
     markers:经纬度对象数组,属性：{lon, lat, [imgUrl], [label]}，imgUrl,label可选
     */
    this.addMarkers=function(markers,options)
    {
    	var featrues=new Array();
        markers = markers || {};
        this._popup.removeAllPopup();
        for(var i = 0; i<markers.length; i++)
        {
            var marker = markers[i];
            var imgUrl = marker.imgUrl;
            var label = marker.label;
            if ( imgUrl  === undefined || imgUrl === null )
            {
                imgUrl = GLens._getScriptLocation() + this._imgUrl;
            }else{
            	imgUrl =GLens._getScriptLocation() + imgUrl;
            }
            if ( label  === undefined || label === null )
            {
                label = "";
            }
            var html =marker.html;
            if( html  === undefined || html === null ){
            	html ="<tr></tr>";
            }
            var pointFeature = new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point(marker.lon, marker.lat), //119.811, 31.389
                {
                    label: label,
                    imgUrl:imgUrl,
                    html:html
                }
            );
            featrues.push(pointFeature);
        }
        this.markersLayer.addFeatures(featrues);
        if(options.isPopup){
        	this._popup.activatePopup();
        }else{
        	this._popup.deActivatePopup();
        }
    };

    //TODO 如何清除某个Track？？同Marker使用场景不同，可以全部清除，再添加
    this.removeAll=function() {
    	this._popup.removeAllPopup();
        this.markersLayer.removeAllFeatures();
    };

    this.redraw=function() {
        this.markersLayer.redraw();
    };
}
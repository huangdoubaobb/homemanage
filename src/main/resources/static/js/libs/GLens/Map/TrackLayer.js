/**
 * 在地图上画轨迹
 * User: xubing
 * Date: 14-5-26
 * Time: 上午10:12
 *
 */
function GLensTrackLayer(map){
    this._map=map;
    this._popupFlag=false;
    /*轨迹图层样式*/
    var GLens_Map_TrackLayer_DEFAULT_TRACK_STYLE = new OpenLayers.Style({
        fillColor: "#ffcc66",
        strokeColor: "#ff9933",
        strokeWidth: 2,
        label: "${seq}",//序号
        fontColor: "#333333",
        fontFamily: "sans-serif",
        fontWeight: "bold"
    }, {
        rules: [
            new OpenLayers.Rule({
                minScaleDenominator: 4000,
                symbolizer: {
                    pointRadius: 7,
                    fontSize: "9px"
                }
            }),
            new OpenLayers.Rule({
                maxScaleDenominator: 4000,
                minScaleDenominator: 2000,
                symbolizer: {
                    pointRadius: 10,
                    fontSize: "12px"
                }
            }),
            new OpenLayers.Rule({
                maxScaleDenominator: 2000,
                symbolizer: {
                    pointRadius: 13,
                    fontSize: "15px"
                }
            })
        ]
    });
    /**创建轨迹图层*/
    this.trackStyle = GLens_Map_TrackLayer_DEFAULT_TRACK_STYLE;
    this.trackLayer = new OpenLayers.Layer.Vector("GLens.Map.TrackLayer", {
        styleMap: new OpenLayers.StyleMap(this.trackStyle),
        displayInLayerSwitcher: false
    });
    this._map.addLayer(this.trackLayer);
    this._popup= new GLensPopup(this._map,{layer:this.trackLayer});//添加气泡弹出框

    /*
     lon:经度
     lat:纬度
     seq:序号，可选
     */
    this.addTrack=function(lon, lat, seq)
    {
    	var tracks = new Array(1);
        tracks[0] = {lon:lon, lat:lat, seq:seq};
        this.addTracks(tracks);
    };

    /*
     tracks:经纬度对象数组,属性：{lon,lat,[seq]}，seq可选
     */
    this.addTracks=function(tracks,options)
    {
    	var featrues=new Array();
        tracks = tracks || {};
        this._popup.removeAllPopup();
        for(var i = 0; i<tracks.length; i++)
        {
            var track = tracks[i];
            var seq = track.seq;
            if ( seq  === undefined || seq === null )
            {
                seq = i+1;
            }
            var html =track.html;
            if( html  === undefined || html === null ){
            	html ="<tr></tr>";
            }
            var pointFeature = new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point(track.lon, track.lat), //119.811, 31.389
                {seq: seq,html:html}
            );
            featrues.push(pointFeature);
        }
        this.trackLayer.addFeatures(featrues);
        if(options.isPopup){
        	this._popup.activatePopup();
        }else{
        	this._popup.deActivatePopup();
        }
    };

    //TODO 如何清除某个Track？？同Marker使用场景不同，可以全部清除，再添加
    this.removeAll=function() {
    	this._popup.removeAllPopup();
        this.trackLayer.removeAllFeatures();
    };

    this.redraw=function() {
        this.trackLayer.redraw();
    };
}
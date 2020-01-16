/**
 * User: xubing
 * Date: 15-10-28
 * Time: 上午11:03
 *
 */
function PolylineUtils(map, options) {
	var _thisMap=map;
    this._marker_local = window.location;
    this._marker_contextPath = this._marker_local.pathname.split("/")[1];
    this._marker_basePath = this._marker_local.protocol + "//" + this._marker_local.host + "/" + this._marker_contextPath;
    this._style={ strokeColor: "red", strokeWeight: 12, strokeOpacity: 0.5};
    
    this.addLines=function(data,options){
    	var viewportPoints=[];
    	var attributesObj=null;
    	var bp=null;
		for (var i = 0; i < data.length; i++) {
			var bPoints=[];
			for (var j = 0; j < data[i].length; j++) {
				attributesObj=data[i][j].attributes;
				bp= new BMap.Point(data[i][j].lon, data[i][j].lat);
				bPoints.push(bp);
				viewportPoints.push(bp);
			}
			var polyline = new BMap.Polyline(bPoints, this._style);
			addTaskClickHandler(_thisMap,polyline,options,attributesObj);
			_thisMap.addOverlay(polyline);
		}
		
        _thisMap.setViewport(viewportPoints);//设置轨迹视野
        if (typeof (options.callback(viewportPoints)) == "function")
        	options.callback(viewportPoints);
    };
    
	function addTaskClickHandler(map,marker,options,attributes){
    	marker.addEventListener("click",function(e){
    		map.closeInfoWindow(); //关闭信息窗口
    		if(typeof(options.listenerCallback)=="function")
    			options.listenerCallback(attributes);
       	  }
        );
    }
    
    function openTaskInfo(map,content,opts,e){
        var point = new BMap.Point(e.point.lng, e.point.lat);
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,point); //开启信息窗口
    }
    

    function getDate(tm){
        return new Date(tm).toLocaleString() + ' 星期' + '日一二三四五六'.charAt(new Date().getDay());
    }
}

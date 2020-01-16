/**
 * User: xubing
 * Date: 15-10-28
 * Time: 上午11:03
 *
 */
function MarkerUtils(map, options) {
    this._marker_local = window.location;
    this._marker_contextPath = this._marker_local.pathname.split("/")[1];
    this._marker_basePath = this._marker_local.protocol + "//" + this._marker_local.host + "/" + this._marker_contextPath;
    this._style={ strokeColor: "red", strokeWeight: 9, strokeOpacity: 0.5};
    this._viewportPoints=[];
    
    this.locatLine=function(lineData,options){
    	this._viewportPoints=[];
    	var d ={};
    	var f =null;
    	var features=lineData.data;
    	options.taskInfo=lineData.taskInfo;
    	options.taskHtmlInfo=lineData.taskHtmlInfo;
		for (var i = 0; i < features.length; i++) {
			f = features[i];
			d = {
				attributes: {},
				wkt: null
			};
			for (var name in features[i]) {
				//noinspection JSUnfilteredForInLoop
				if (f.hasOwnProperty(name) && name !== "wkt") {
					//noinspection JSUnfilteredForInLoop
					d.attributes[name] = f[name];
				}
			}
			d.wkt = f.wkt;
			this.addGeometryFromWKT(d,options);
		}
		var bounds= this.getExtent(this._viewportPoints);
		this._viewportPoints=[];
		this._viewportPoints.push(new BMap.Point(bounds.left, bounds.bottom));
		this._viewportPoints.push(new BMap.Point(bounds.right, bounds.top));
		if(options.isViewport===true)
	        map.setViewport(this._viewportPoints);//设置视野
        if (typeof (options.callback()) == "function")
        	options.callback();
    }
    
    this.getExtent=function (markers) {
		var left = 360;
		var right = -360;
		var bottom = 360;
		var top = -360;
		for ( var i = 0; i < markers.length; i++) {
			var marker = markers[i];
			if (marker.lng < left)
				left = marker.lng;
			if (marker.lng >= right)
				right = marker.lng;
			if (marker.lat < bottom)
				bottom = marker.lat;
			if (marker.lat >= top)
				top = marker.lat;
		}
		return {
			left : left,
			right : right,
			bottom : bottom,
			top : top
		};
	}
    
    this.addGeometryFromWKT=function (data,options) {
    	this.wkt = this.wkt ? this.wkt : new geoFormat.WKT();
		var geom = this.wkt.read(data.wkt);
		var feature = new Feature(geom, data.attributes);
		var opts = {
	            width : 300,     // 信息窗口宽度
	            height: 150,     // 信息窗口高度
	            title : "信息" , // 信息窗口标题
	            enableMessage:false//设置允许信息窗发送短息
	        };
		var line = null;
		var bLine = null;
		var points = null;
		var bPoints = null;
		var content=null;
		if(options.taskHtmlInfo==undefined || options.taskHtmlInfo==null){
            content="<table style='font-size:12px;'></table>";
        }
        else
            content=options.taskHtmlInfo;
		//拆分polyline为line
		if (geom.CLASS_NAME === "Geometry.MultiLineString") {
			for (var i = 0; i < geom.components.length; i++) {
				line = geom.components[i];
				points = line.getVertices();
				bPoints = this.transform(points);
				bLine = new BMap.Polyline(bPoints, this._style);
				addTaskClickHandler(map,content,opts,bLine,options,options.taskInfo);
				map.addOverlay(bLine);
			}
		}
		else {
			points = geom.getVertices();
			bPoints = this.transform(points);
			bLine = new BMap.Polyline(bPoints,  this._style);
			addTaskClickHandler(map,content,opts,bLine,options,options.taskInfo);
			map.addOverlay(bLine);
		}
	}
    
    this.transform=function (points) {
		var bPoints = [];
		var point=null;
		for (var i = 0; i < points.length; i++) {
			point=new BMap.Point(points[i].x, points[i].y);
			bPoints.push(point);
			this._viewportPoints.push(point);
		}
		return bPoints;
	}
    
    this.locatLineTasks = function (points, options) {
    	var baiduPoints=[];
    	var content=null;
    	var attributesObj=null;
    	var opts = {
                width : 300,     // 信息窗口宽度
                height: 150,     // 信息窗口高度
                title : "信息" , // 信息窗口标题
                enableMessage:false//设置允许信息窗发送短息
            };
        if (!points || points.length <= 0) return;
        if(points && points.length>0){
        	attributesObj=points[0].attributes;
        	if(points[0].html==undefined || points[0].html==null){
                content="<table style='font-size:12px;'></table>";
            }
            else
                content=points[0].html;
            for(var i=0;i<points.length;i++){
            	baiduPoints.push(new BMap.Point(points[i].lon, points[i].lat));
            }
        }
        //将轨迹点连线
        var polyline = new BMap.Polyline(baiduPoints,this._style);
        addTaskClickHandler(map,content,opts,polyline,options,attributesObj);
        map.addOverlay(polyline);
        //设置轨迹视野
        map.setViewport(baiduPoints);
        if (typeof (options.callback()) == "function")
        	options.callback();
    }
    
    /**
     * 定位任务
     */
    this.locatTasks=function(points,options){
    	var pt = null;
        var marker=null;
        var iconUrl=null;
        var content=null;
        var lable=null;
        var attributesObj=null;
        var baiduPoint=[];
        var bLable=null;

        var opts = {
            width : 300,     // 信息窗口宽度
            height: 150,     // 信息窗口高度
            title : "信息" , // 信息窗口标题
            enableMessage:false//设置允许信息窗发送短息
        };
        for(var i = 0; i<points.length; i++)
        {
        	attributesObj=points[i].attributes;
            iconUrl=points[i].imgUrl?(this._marker_basePath+points[i].imgUrl):(this._marker_basePath+"/images/map/guiji.png");
            if(points[i].html==undefined || points[i].html==null){
                content="<table style='font-size:12px;'></table>";
            }
            else
                content=points[i].html;
            lable=points[i].label?points[i].label:i+1;
            pt = new BMap.Point(points[i].lon,points[i].lat);
            marker=new BMap.Marker(pt,{icon:new BMap.Icon(iconUrl, new BMap.Size(39,25))});//创建标注
            bLable=new BMap.Label(lable,{offset:new BMap.Size(20,-10)});
            bLable.setStyle({border:"1px solid #ABABAB"});
            marker.setLabel(bLable);
            marker.setTop(true);
            //添加点击事件，信息窗口
            addTaskClickHandler(map,content,opts,marker,options,attributesObj);
            map.addOverlay(marker);
            baiduPoint.push(pt);
        }
        if(options.isViewport===true)
        	map.setViewport(baiduPoint);//设置视野
        if (typeof (options.callback()) == "function")
        	options.callback();
    }
    
    function addTaskClickHandler(map,content,opts,marker,options,attributes){
    	marker.addEventListener("click",function(e){
    		map.closeInfoWindow(); //关闭信息窗口
    		if(typeof(options.listenerCallback)=="function")
    			options.listenerCallback(attributes);
       	  }
        );
        /*marker.addEventListener("mouseover",function(e){
        	 openTaskInfo(map,content,opts,e);}
        );
        marker.addEventListener("mouseout",function(e){
        	 map.closeInfoWindow(); //关闭信息窗口
        	 }
        );*/
    }
    
    function openTaskInfo(map,content,opts,e){
        var point = new BMap.Point(e.point.lng, e.point.lat);
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,point); //开启信息窗口
    }
    
    /**
     * 视频终端定位
     * @param points
     * @param callback
     */
    this.locatVideoTerminal=function(points,options){
    	var pt = null;
        var marker=null;
        var iconUrl=null;
        var content=null;
        var lable=null;
        var attributesObj=null;
        var baiduPoint=[];
        var bLable=null;

        var opts = {
            width : 268,     // 信息窗口宽度
            height: 340,     // 信息窗口高度
            title : "视频窗口" , // 信息窗口标题
            enableMessage:false//设置允许信息窗发送短息
        };
        for(var i = 0; i<points.length; i++)
        {
        	attributesObj=points[i].attributes;
            iconUrl=points[i].imgUrl?points[i].imgUrl:(this._marker_basePath+"/images/map/video.png");
            content="<div id=\"windowbox"+i+"\" style=\"width:340px;height:268px;\"></div>";
            lable=points[i].label?points[i].label:i+1;
            pt = new BMap.Point(points[i].lon,points[i].lat);
            marker=new BMap.Marker(pt,{icon:new BMap.Icon(iconUrl, new BMap.Size(39,25))});//创建标注
            bLable=new BMap.Label(lable,{offset:new BMap.Size(20,-10)});
            bLable.setStyle({border:"1px solid #ABABAB"});
            marker.setLabel(bLable);
            //设置正在播放视频窗口的名称
            WebClient.SetIsPlayVideoName(attributesObj.puid, attributesObj.idx, attributesObj.name);
            //添加点击事件，信息窗口
            addVideoTerClickHandler(attributesObj,marker);
            map.addOverlay(marker);
            baiduPoint.push(pt);
        }
        map.setViewport(baiduPoint);//设置视野
        if (typeof (options.callback()) == "function")
        	options.callback();
    }
    
    function addVideoTerClickHandler(attributes,marker){
        marker.addEventListener("click",function(e){
        	WebClient.StartGPS(attributes.puid,attributes.idx,"",attributes.name);
        	WebClient.PlayVideo(attributes.puid,attributes.idx, attributes.name);}
        );
    }
    
    /**
     * 群定位
     * @param points
     * @param callback
     */
    this.locatClusterer=function(points,options){
        var pt = null;
        var marker=null;
        var iconUrl=null;
        var content=null;
        var lable=null;
        var baiduPoint=[];
        var bLable=null;
        var opts = {
            width : 250,     // 信息窗口宽度
            height: 300,     // 信息窗口高度
            title : "信息窗口" , // 信息窗口标题
            enableMessage:false//设置允许信息窗发送短息
        };
        for(var i = 0; i<points.length; i++)
        {
            iconUrl=points[i].imgUrl?(this._marker_basePath+"/images/map/"+points[i].imgUrl):(this._marker_basePath+"/images/map/guiji.png");
            if(points[i].html==undefined || points[i].html==null){
                content="<table style='font-size:12px;'></table>";
            }
            else
                content=points[i].html;
            lable=points[i].label?points[i].label:i+1;
            pt = new BMap.Point(points[i].lon,points[i].lat);
            marker=new BMap.Marker(pt,{icon:new BMap.Icon(iconUrl, new BMap.Size(39,25))});//创建标注
            bLable=new BMap.Label(lable,{offset:new BMap.Size(20,-10)});
            bLable.setStyle({border:"1px solid #ABABAB"});
            marker.setLabel(bLable);
            marker.setTop(true);
            addClickHandler(map,content,opts,marker);//添加点击事件，信息窗口
            map.addOverlay(marker);
            if(options.isAnimation)
            	marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            baiduPoint.push(pt);
        }
        map.setViewport(baiduPoint);//设置视野
        if (typeof (options.callback()) == "function")
        	options.callback();
    }

    /**
     * 根据坐标定位
     * {lon:,lat:}
     */
    this.locatByCoord=function(options,callback){
        if(!options || !options.lon || !options.lat){
            return;
        }
        var new_point = new BMap.Point(options.lon,options.lat);
        var marker = new BMap.Marker(new_point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.setViewport([new_point]);//设置视野
        map.panTo(new_point);
    }

    function addClickHandler(map,content,opts,marker){
        marker.addEventListener("click",function(e){
                openInfo(map,content,opts,e)}
        );
    }

    function openInfo(map,content,opts,e){
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,point); //开启信息窗口
    }

    function getDate(tm){
        return new Date(tm).toLocaleString() + ' 星期' + '日一二三四五六'.charAt(new Date().getDay());
    }
}

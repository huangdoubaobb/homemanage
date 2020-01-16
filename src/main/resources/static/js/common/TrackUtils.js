/**
 * 轨迹回放工具类
 * User: xubing
 * Date: 15-10-20
 * Time: 上午9:09
 *
 */
function TrackUtils(map, options) {
    // 私有属性
    var _thisMap=map;
    this._baiduPoints = [];
    this._track_play_back_centerPoint;
    this._track_play_back_index = 0;
    this._track_play_back_timer;
    this._track_carMk;
    this._track_local = window.location;
    this._track_contextPath = this._track_local.pathname.split("/")[1];
    this._track_basePath = this._track_local.protocol + "//" + this._track_local.host + "/" + this._track_contextPath;

    this.initParam = function () {
        this._baiduPoints = [];
        this._track_play_back_centerPoint;
        this._track_play_back_index = 0;
        this._track_play_back_timer;
        this._track_carMk;
    }

    //this=公有方法；var=私有方法

    /**
     * 轨迹
     * [{lon:,lat:}]
     * @param points
     */
    this.trackShow = function (points, options) {
        this.initParam();
        this.convertToBaiduPoints(points);
        if (!this._baiduPoints || this._baiduPoints.length <= 0) return;

        var startPoint = this._baiduPoints[0];
        var endPoint = this._baiduPoints.length <= 1 ? this._baiduPoints[0] : this._baiduPoints[this._baiduPoints.length - 1];
        var startIcon = new BMap.Icon(this._track_basePath+"/images/map/start.png", new BMap.Size(32, 70), {    //起点图片
            //offset: new BMap.Size(0, -15),    //相当于CSS精灵
            imageOffset: new BMap.Size(0, 6)    //图片的偏移量。为了是图片底部中心对准坐标点。
        });
        var endIcon = new BMap.Icon(this._track_basePath+"/images/map/end.png", new BMap.Size(32, 70), {    //终点图片
            //offset: new BMap.Size(0, -15),    //相当于CSS精灵
            imageOffset: new BMap.Size(6, 6)    //图片的偏移量。为了是图片底部中心对准坐标点。
        });
        //将轨迹点连线
        var polyline = new BMap.Polyline(this._baiduPoints, { strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5 });
        map.addOverlay(polyline);
        var startMarker = new BMap.Marker(startPoint, { icon: startIcon }); //添加起点图标
        var endMarker = new BMap.Marker(endPoint, { icon: endIcon }); //添加起点图标
        //startMarker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        map.addOverlay(startMarker);
        map.addOverlay(endMarker);
        //设置轨迹视野
        map.setViewport(this._baiduPoints);
        if (typeof (options.callback()) == "function")
        	options.callback();
    }

    /**
     * 轨迹回放
     * [{lon:,lat:}]
     * @param points
     */
    this.trackBack = function (points, options) {
        var te = points.length;
        this.initParam();
        this.convertToBaiduPoints(points);
        if (!this._baiduPoints || this._baiduPoints.length <= 0) return;
        var startPoint = this._baiduPoints[0];
        var endPoint = this._baiduPoints.length <= 1 ? this._baiduPoints[0] : this._baiduPoints[this._baiduPoints.length - 1];
        var startIcon = new BMap.Icon(this._track_basePath+"/images/map/start.png", new BMap.Size(32, 70), {    //起点图片
            //offset: new BMap.Size(0, -5),    //相当于CSS精灵
            imageOffset: new BMap.Size(0, 6)    //图片的偏移量。为了是图片底部中心对准坐标点。
        });
        var endIcon = new BMap.Icon(this._track_basePath+"/images/map/end.png", new BMap.Size(32, 70), {    //终点图片
            //offset: new BMap.Size(0, -5),    //相当于CSS精灵
            imageOffset: new BMap.Size(6, 6)    //图片的偏移量。为了是图片底部中心对准坐标点。
        });
        var carIcon = new BMap.Icon(this._track_basePath+"/images/map/Mario.png", new BMap.Size(32, 70), {    //小人图片
            //offset: new BMap.Size(0, -5),    //相当于CSS精灵
            imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
        });
        //连接所有点
        _thisMap.addOverlay(new BMap.Polyline(this._baiduPoints, { strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5 }));
        _track_carMk = new BMap.Marker(this._baiduPoints[0], { icon: carIcon });
        _thisMap.addOverlay(_track_carMk);
        var startMarker = new BMap.Marker(startPoint, { icon: startIcon }); //添加起点图标
        var endMarker = new BMap.Marker(endPoint, { icon: endIcon }); //添加起点图标
        //startMarker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        _thisMap.addOverlay(startMarker);
        _thisMap.addOverlay(endMarker);
        //设置轨迹视野
        _thisMap.setViewport(this._baiduPoints);
        if (typeof (options.callback()) == "function")
        	options.callback();
    }

    /**
     * 启动
     */
    this.start = function() {
        if (!this._baiduPoints || this._baiduPoints.length <= 0) return;
        _track_carMk.setPosition(this._baiduPoints[this._track_play_back_index]);
        if (this._track_play_back_index < this._baiduPoints.length) {
            var tempStart=this;
            this._track_play_back_timer=setTimeout(function(){
                tempStart._track_play_back_index++;
                tempStart.start();
            },1000);
        }
        _thisMap.panTo(this._baiduPoints[this._track_play_back_index]); //视图不跟随点动
    };

    /**
     * 停止
     */
    this.stop = function() {
        if (!this._baiduPoints || this._baiduPoints.length <= 0) return;
        if(this._track_play_back_timer) {
            window.clearTimeout(this._track_play_back_timer);
        }
        this._track_play_back_index = 0;
        _track_carMk.setPosition(this._baiduPoints[this._track_play_back_index]);
        //_thisMap.panTo(_track_play_back_centerPoint);
    };

    /**
     * 暂停
     */
    this.pause = function() {
        if (!this._baiduPoints || this._baiduPoints.length <= 0) return;
        if(this._track_play_back_timer) {
            window.clearTimeout(this._track_play_back_timer);
        }
        _track_carMk.setPosition(this._baiduPoints[this._track_play_back_index]);
    };

    this.clearOverlays = function () {
        _thisMap.clearOverlays();
    }

    this.convertToBaiduPoints = function(points) {
        if(points && points.length>0){
            for(var i=0;i<points.length;i++){
                this._baiduPoints.push(new BMap.Point(points[i].lon, points[i].lat));
            }
        }
    }
}
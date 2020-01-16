/**
 *create by 2012-08-25 pm 17:48
 *@author xubing 
 *验证当前用户是否已登录
 *
 *GLENS_SECURITY_INTERCEPTOR.checkTimeout();
 *
 */
(function(){
	var local = window.location;
	var contextPath = local.pathname.split("/")[1];
	var basePath = local.protocol + "//" + local.host + "/" + contextPath + "/";
	
	var _sessionCheck=function(){
		$.ajax({
            async: false,
            type: "post",
            dataType: "json",
            url: basePath+"login.do?method=getSession",
            success: function(data) {
                if (!data.result) {
                	_openAgainLoginDialog();
				}
            }
    	});
	};
	
	var _openAgainLoginDialog=function(){
		$.dialog({
			id : "againLogin", 
			title : "重新登录",
			content : "url:againLogin.html",
			lock : true,
			max : false,
			min: false,
			width : 345,
			height : 142,
			opacity : .5,
			padding : 0
		});
	};
	
	var _glensSecurityInterceptor={
		/**
		 * 判断Session是否有效
		 */
		checkTimeout:function(){
			_sessionCheck();
			setTimeout(function(){
				$("a.easyui-linkbutton").on('click',function(){  
					_sessionCheck();
				 });
			},1000);
		}
	};
	
	var _getUrlParameter=function getUrlParameter(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数getParameter
        if (r != null) return unescape(r[2]); return null; //返回参数值
    };
    
	window.GLENS_SECURITY_INTERCEPTOR = _glensSecurityInterceptor;
	window.BASE_PATH=basePath;
	window.GET_URL_PARAMETER=_getUrlParameter;
})();
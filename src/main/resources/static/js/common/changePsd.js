//修改密码:
function openChangePsdDialog(url) {
	$.dialog({
		id : "againLogin", 
		title : "密码修改",
		content : "url:" + url + "/changePsd.do?method=openChangePsdPage",
		lock : true,
		max : false,
		min: false,
		width : 320,
		height : 170,
		opacity : .5,
		padding : 0
	});
}

function subChangePsd(basePath, newPass) {
	var subType;
	// 提交数据
	$.ajax({
		type : "POST",
		async : false,
		dataType : "json",
		url : basePath + '/changePsd.do?method=changePsd',
		data : 'newPass=' + newPass,
		success : function(result) {
			if (result.success) {
				subType = true;
				$.dialog.tips('密码修改成功,下次登陆起效!', 2, '32X32/succ.png');
			} else {
				subType = false;
				$.dialog.tips(result.errorMsg + '!', 2, 'alert.gif');
			}
		}
	});

	return subType;
}
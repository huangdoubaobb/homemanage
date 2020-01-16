/*
-------------------------------------------------------------------------------
文件名称：tools.js
说    明：JavaScript脚本，前台开发常用的方法
版    本：1.0
修改纪录:
-------------------------------------------------------------------------------
时间      修改人  说明
2014-9-14 xubing  创建
-------------------------------------------------------------------------------  
 */

/*
 用途：实现文本框回车事件
 传入：controlID：控件ID
 callBackMethod：回车调用的方法
 */
function keydown(controlID, callBackMethod) {

	$("#" + controlID).keydown(function(e) {
		var curKey = e.which;
		if (curKey == 13 && typeof (callBackMethod) == "function") {
			callBackMethod();
			return false;
		}
	});
}

/*
 * 用途：格式化JSON字符串，替换特殊字符 输入：value：json字符串 返回：返回格式化后的json字符串；
 */
function jsonStrFormat(value) {
	re = new RegExp("\"", "g");
	re2 = new RegExp("'", "g");
	var newData = value.replace(re, "“");
	newData = newData.replace(re2, "‘");
	newData = newData.replace(/\r/g, " ");
	newData = newData.replace(/\n/g, " ");
	return newData;
}

/*
 * 用途：返回字符串的长度 输入：value：需要返回长度的字符串 返回：字符串长度
 */
function getLength(value) {
	return value.getBytes();
}

/*
 * 用途：去掉字符串的空格 输入：value 返回：去掉空格后的字符串
 */
function trim(value) {
	return value.trim();
}

/*
 * 用途：检查输入对象的值是否符合整数格式 输入：value 返回：如果通过验证返回true,否则返回false；
 */
function isInteger(value) {
	var regu = /^[-]{0,1}[0-9]{1,}$/;
	return regu.test(value);
}

/*
 * 用途：检查输入字符串是否符合正整数格式 输入：value：字符串 返回：如果通过验证返回true,否则返回false
 */
function isNumber(value) {
	var regu = "^[0-9]+$";
	var re = new RegExp(regu);
	if (value.search(re) != -1) {
		return true;
	} else {
		return false;
	}
}

/*
 * 用途：校验是否一个浮点数 输入：value 返回：如果通过验证返回true,否则返回false；
 */
function isFloat(value) {
	if (/^(-?\d+)(\.\d+)?$/.test(value))
		return true;
	else
		return false;
}

/*
 * 用途：校验是否是中文 输入：value 返回：如果通过验证返回true,否则返回false；
 */
function isChinese(value) {
	var str = value.replace(/(^\s*)|(\s*$)/g, '');
	if (!(/^[\u4E00-\uFA29]*$/.test(str) && (!/^[\uE7C7-\uE7F3]*$/.test(str))))
		return false;
	else
		return true;
}

/*
 * 用途：校验是否电子邮件 输入：value 返回：如果通过验证返回true,否则返回false；
 */
function isEmail(value) {
	if (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value))
		return true
	else
		return false;
}

/*
 * 用途：校验是否一个图片格式的文件 输入：value ：文件名 返回：如果通过验证返回true,否则返回false；
 */
function isImg(value) {
	var objReg = new RegExp("[.]+(jpg|jpeg|gif|png|ico|bmp)$", "gi");
	if (objReg.test(value))
		return true;
	else
		return false;
}

/*
 * 用途：检查输入字符串是否只由英文字母和数字和下划线组成 输入：value：字符串 返回：如果通过验证返回true,否则返回false
 */
function isNumberOr_Letter(value) { // 判断是否是数字或字母
	var regu = "^[0-9a-zA-Z\_]+$";
	var re = new RegExp(regu);
	if (re.test(value)) {
		return true;
	} else {
		return false;
	}
}

/*
 * 用途：检查输入字符串是否只由英文字母和数字组成 输入：value：字符串 返回：如果通过验证返回true,否则返回false
 */
function isNumberOrLetter(value) { // 判断是否是数字或字母
	var regu = "^[0-9a-zA-Z]+$";
	var re = new RegExp(regu);
	if (re.test(value)) {
		return true;
	} else {
		return false;
	}
}

/*
 * 用途：检查输入字符串是否只由汉字、字母、数字组成 输入：value：字符串 返回：如果通过验证返回true,否则返回false
 */
function isChinaOrNumbOrLett(value) { // 判断是否是汉字、字母、数字组成
	var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";
	var re = new RegExp(regu);
	if (re.test(value)) {
		return true;
	} else {
		return false;
	}
}

/*
 * 用途：字符1是包含字符串2 输入：str1：字符串；str2：被包含的字符串 返回：如果通过验证返回true,否则返回false
 */
function isMatch(str1, str2) {
	var index = str1.indexOf(str2);
	if (index == -1)
		return false;
	return true;
}

/*
 * 用途：校验是否手机号码 输入：value 返回：如果通过验证返回true,否则返回false；
 */
function isMobile(value) {
	var re = /^1\d{10}$/
	if (re.test(value)) {
		return true;
	} else {
		return false;
	}
}

/*
 * 用途：校验是否电话号码必须包含区号,可以含有分机号(例：0516-82396789-987) 输入：value
 * 返回：如果通过验证返回true,否则返回false；
 */
function isPhone(value) {
	if (/^(0[1-9]\d{1,2}-)\d{7,8}(-\d{1,8})?/.test(value))
		return true;
	else
		return false;
}

/*
 * 用途：校验ip地址的格式 输入：value：ip地址 返回：如果通过验证返回true,否则返回false；
 */
function isIP(value) {
	if (isNull(value))
		return false;
	var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g // 匹配IP地址的正则表达式
	if (re.test(value)) {
		if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256
				&& RegExp.$4 < 256)
			return true;
	}
	return false;
}

/*
 * 用途：检查输入字符串是否为空或者全部都是空格 输入：value 返回：如果全是空返回true,否则返回false
 */
function isNull(value) {
	if (value == "")
		return true;
	var regu = "^[ ]+$";
	var re = new RegExp(regu);
	return re.test(value);
}

/*
 * Easy UI 日期控件格式化
 */
function myformatter(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}
/*
 * Easy UI 日期控件格式化
 */
function myparser(s) {
	if (!s)
		return new Date();
	var ss = (s.split('-'));
	var y = parseInt(ss[0], 10);
	var m = parseInt(ss[1], 10);
	var d = parseInt(ss[2], 10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
		return new Date(y, m - 1, d);
	} else {
		return new Date();
	}
}

// lhgdialog提示框
function tipMsg(message, time) {
	var tempTime = 3;
	if (time) {
		tempTime = time;
	}
	$.dialog.tips(message, tempTime, 'tips.gif');
}
function successMsg(message, time) {
	var tempTime = 3;
	if (time) {
		tempTime = time;
	}
	$.dialog.tips(message, tempTime, 'success.gif');
}
function alertMsg(message, time) {
	var tempTime = 3;
	if (time) {
		tempTime = time;
	}
	$.dialog.tips(message, tempTime, 'alert.gif');
}
function errorMsg(message, time) {
	var tempTime = 3;
	if (time) {
		tempTime = time;
	}
	$.dialog.tips(message, tempTime, 'fail.png');
}

function diyMsg(title, message, icon) {
	$.dialog({
		lock : true,
		title : title,
		content : message,
		icon : icon,
		ok : function() {
			return true;
		}
	});
}

// 'error.gif'
// 弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function msgShow(title, msgString, msgType) {
	$.messager.alert(title, msgString, msgType);
}

String.prototype.getBytes = function() {
	var cArr = this.match(/[^x00-xff]/ig);
	return this.length + (cArr == null ? 0 : cArr.length);
}

String.prototype.trim = function() {
	return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function closeWebPage() {
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
			window.opener = null;
			window.close();
		} else {
			window.open('', '_top');
			window.top.close();
		}
	} else if (navigator.userAgent.indexOf("Firefox") > 0 ||
			navigator.userAgent.indexOf("Chrome") > 0) {
		window.location.href = 'about:blank ';
	} else {
		window.opener = null;
		window.open('', '_self', '');
		window.close();
	}
}
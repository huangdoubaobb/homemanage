function createGrid(gridViewID, titleText, isFitColumns,isNowrap,isFit, id, isStriped,isCollapsible, url,
		isSingleSelect,isRownumbers, isPagination,isRemoteSort, showFooter, getQueryParams,
		frozenColumns, gridColumns, toolbar,pageList,pageSize) {
	$('#' + gridViewID).datagrid({
		title : titleText, // 列表表头
		fitColumns : isFitColumns, // 设置字段是否可拖动
		nowrap : isNowrap, //如果为true，则在同一行中显示数据。设置为true可以提高加载性能。
		fit : isFit, // 如果为true，自适应宽度
		idField : id, // 设置唯一字段.
		striped : isStriped, // 当true时，单元格显示条纹。默认false
		collapsible : isCollapsible, // 定义是否可折叠按钮
		url : url, // 请求连接
		singleSelect : isSingleSelect, // 当true允许只选择一行
		rownumbers : isRownumbers, // 当true显示行号列.
		pagination : isPagination, // 当true时在DataGrid底部显示一个分页工具栏
		remoteSort : isRemoteSort, // 定义是否从服务器的数据进行排序.
		pageList : pageList, // 可以设置每页记录条数的列表
		pageSize : pageSize, // 每页显示的记录条数
		showFooter : showFooter, // 定义是否显示行尾.
		queryParams : getQueryParams(), // 查询条件
		frozenColumns : frozenColumns, // 列被固定在左边
		columns : gridColumns, // 其他列
		toolbar : toolbar // 定义菜单栏
	});
	// 表头都居中
	/*$("div.datagrid-header>.datagrid-header-inner>table>tbody div").css({
		"text-align" : "center"
	});*/
}

function createGrid2(gridViewID, titleText, isFitColumns, id, isStriped, url,
		isSingleSelect, isPagination, showFooter, getQueryParams,
		frozenColumns, gridColumns, toolbar) {
	$('#' + gridViewID).datagrid({
		title : titleText, // 列表表头
		fitColumns : isFitColumns, // 设置字段是否可拖动
		nowrap : false, //如果为true，则在同一行中显示数据。设置为true可以提高加载性能。
		fit : true, // 自适应宽度
		idField : id, // 设置唯一字段.
		striped : isStriped, // 当true时，单元格显示条纹。默认false
		collapsible : false, // 定义是否可折叠按钮
		url : url, // 绑定列表
		singleSelect : isSingleSelect, // 当true允许只选择一行
		rownumbers : true, // 当true显示行号列.
		pagination : isPagination, // 当true时在DataGrid底部显示一个分页工具栏
		remoteSort : false, // 定义不从服务器的数据进行排序.
		pageList : [ 10, 15, 20, 30 ], // 可以设置每页记录条数的列表
		pageSize : 15, // 每页显示的记录条数，默认为15
		showFooter : showFooter, // 定义是否显示行尾.
		queryParams : getQueryParams(), // 查询条件
		frozenColumns : [ frozenColumns ], // 列被固定在左边
		columns : [ gridColumns ], // 其他列
		toolbar : toolbar
	// 定义菜单栏
	});
	// 表头都居中
	/*$("div.datagrid-header>.datagrid-header-inner>table>tbody div").css({
		"text-align" : "center"
	});*/
}

function createGridEvents(gridViewID, titleText, isFitColumns,isNowrap,isFit, id, isStriped,isCollapsible, url,
		isSingleSelect,isRownumbers, isPagination,isRemoteSort, showFooter, getQueryParams,
		frozenColumns, gridColumns, toolbar,pageList,pageSize,eventsArray) {
	var dataGridProperties = new Object();
	dataGridProperties.title = titleText;// 列表表头
	dataGridProperties.fitColumns = isFitColumns;// 设置字段是否可拖动
	dataGridProperties.fit = isFit;// 如果为true，自适应宽度
	dataGridProperties.nowrap = isNowrap; //如果为true，则在同一行中显示数据。设置为true可以提高加载性能。
	dataGridProperties.idField = id;// 设置唯一字段.
	dataGridProperties.striped = isStriped;// 当true时，单元格显示条纹。默认false
	dataGridProperties.collapsible = isCollapsible;// 定义是否可折叠按钮
	dataGridProperties.url = url;// 请求连接
	dataGridProperties.singleSelect = isSingleSelect; // 当true允许只选择一行
	dataGridProperties.rownumbers = isRownumbers;// 当true显示行号列.
	dataGridProperties.pagination = isPagination;// 当true时在DataGrid底部显示一个分页工具栏
	dataGridProperties.remoteSort = isRemoteSort;// 定义是否从服务器的数据进行排序.
	dataGridProperties.pageList=pageList, // 可以设置每页记录条数的列表
	dataGridProperties.pageSize =pageSize, // 每页显示的记录条数
	dataGridProperties.showFooter = showFooter;// 定义是否显示行尾.
	dataGridProperties.queryParams = getQueryParams();// 查询条件
	dataGridProperties.frozenColumns = frozenColumns;// 列被固定在左边
	dataGridProperties.columns = gridColumns;// 其他列
	dataGridProperties.toolbar = toolbar;// 定义菜单栏
	//动态增加grid事件,参数类型是数组对象[{eventName:'onClickRow',methodName:'problemGridOnClickRow'}]
	for(var i=0 ;i<eventsArray.length;i++){
		eval("method="+eventsArray[i].methodName);
		dataGridProperties[eventsArray[i].eventName]= method;
	}
	$('#' + gridViewID).datagrid(dataGridProperties);
	// 表头都居中
	/*$("div.datagrid-header>.datagrid-header-inner>table>tbody div").css({
		"text-align" : "center"
	});*/
}

function createGridEvents2(gridViewID, titleText, isFitColumns, id, isStriped, url,
		isSingleSelect, isPagination, showFooter, getQueryParams,
		frozenColumns, gridColumns, toolbar,eventsArray) {
	var dataGridProperties = new Object();
	dataGridProperties.title = titleText;
	dataGridProperties.fitColumns = isFitColumns;
	dataGridProperties.fit = true;
	dataGridProperties.nowrap = false;
	dataGridProperties.idField = id;
	dataGridProperties.striped = isStriped;
	dataGridProperties.collapsible = false;
	dataGridProperties.url = url;
	dataGridProperties.singleSelect = isSingleSelect;
	dataGridProperties.rownumbers = true;
	dataGridProperties.pagination = isPagination;
	dataGridProperties.remoteSort = false;
	dataGridProperties.pageList= [ 100, 150, 200 ], // 可以设置每页记录条数的列表
	dataGridProperties.pageSize = 100, // 每页显示的记录条数，默认为15
	dataGridProperties.showFooter = showFooter;
	dataGridProperties.queryParams = getQueryParams();
	dataGridProperties.frozenColumns = [frozenColumns];
	dataGridProperties.columns = [gridColumns];
	dataGridProperties.toolbar = toolbar;
	//动态增加grid事件,参数类型是数组对象[{eventName:'onClickRow',methodName:'problemGridOnClickRow'}]
	for(var i=0 ;i<eventsArray.length;i++){
		eval("method="+eventsArray[i].methodName);
		dataGridProperties[eventsArray[i].eventName]= method;
	}
	$('#' + gridViewID).datagrid(dataGridProperties);
	// 表头都居中
	/*$("div.datagrid-header>.datagrid-header-inner>table>tbody div").css({
		"text-align" : "center"
	});*/
}

// 刷新表格
function Refresh(gridViewID) {
	$('#' + gridViewID).datagrid("reload");
}
// 刷新表格并清除选中状态
function RefreshAndClearSel(gridViewID) {
	$('#' + gridViewID).datagrid("reload");
	$('#' + gridViewID).datagrid("clearSelections");
}

// combobox输入提示功能
function ComboboxIndexOf(comboboxID) {
	$('#' + comboboxID).combobox({
		filter : function(q, row) {
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		}
	});
}

// 回车事件
function keydown(controlID, callBackMethod) {
	$("#" + controlID).bind('keyup', function(event) {
		if (event.keyCode == "13") {
			callBackMethod();
		}
	});
}

// 格式化字符串，替换特殊字符
function replace(data) {
	re = new RegExp("\"", "g");
	re2 = new RegExp("'", "g");
	var newData = data.replace(re, "“");
	newData = newData.replace(re2, "‘");
	newData = newData.replace(/\r/g, " ");
	newData = newData.replace(/\n/g, " ");
	return newData;
}
// lhgdialog弹出框
function showDialog(title, lock, url, width, height) {
	$.dialog({
		id : 'dialog', // 新窗口ID
		title : title, // 标题
		lock : lock, // 遮罩 bool值
		content : 'url:' + url,
		width : width,
		height : height,
		max : false,
		min : false
	});
}
// lhgdialog提示框
function tipMsg(message,time,url) {
	var tempTime=3;
	var tempUrl="tips.gif";
	if(time){
		tempTime=time;
	}
	if(url)
		tempUrl=url;
	$.dialog.tips(message, tempTime, 'tips.gif');
}
function successMsg(message,time) {
	var tempTime=3;
	if(time){
		tempTime=time;
	}
	$.dialog.tips(message, tempTime, 'success.gif');
}
function alertMsg(message,time) {
	var tempTime=3;
	if(time){
		tempTime=time;
	}
	$.dialog.tips(message, tempTime, 'alert.gif');
}
function errorMsg(message,time) {
	var tempTime=3;
	if(time){
		tempTime=time;
	}
	$.dialog.tips(message, tempTime, 'fail.png');
}

function diyMsg(title,message,icon){
	$.dialog({
	    lock: true,
	    title:title,
	    content: message,
	    icon: icon,
	    ok: function () {
	        return true;
	    }
	});
}

//'error.gif'
// 弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function msgShow(title, msgString, msgType) {
	$.messager.alert(title, msgString, msgType);
}



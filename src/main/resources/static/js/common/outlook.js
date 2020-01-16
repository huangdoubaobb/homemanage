$(function() {
	
});
// 获取导航的图标
function getIcon(menuid) {
	var icon = '';
	$($("#" + menuid + "").menubutton("options").menu).menu({
		onClick : function(item) {
			// item 的相关属性参见API中的menu
			icon = item.iconCls;
		}
	});
	return icon;
}

function addTab(subtitle, url, icon) {
	if (!$('#tabs').tabs('exists', subtitle)) {
		$('#tabs').tabs('add', {
			title : subtitle,
			content : createFrame(url),
			closable : true,
			icon : icon
		});
	} else {
		$('#tabs').tabs('select', subtitle);
	}
	tabClose();
}

function tabClose() {
	/* 双击关闭TAB选项卡 */
	$(".tabs-inner").dblclick(function() {
		var subtitle = $(this).children(".tabs-closable").text();
		$('#tabs').tabs('close', subtitle);
	});
	/* 为选项卡绑定右键 */
	$(".tabs-inner").bind('contextmenu', function(e) {
		$('#tabMenu').menu('show', {
			left : e.pageX,
			top : e.pageY
		});

		var subtitle = $(this).children(".tabs-closable").text();

		$('#tabs').tabs('select', subtitle);
		$('#tabMenu').data("currtab", subtitle);
		return false;
	});
}

function createFrame(url) {
	var s = '<iframe scrolling="auto" frameborder="0"  src="' + url
			+ '" style="width:100%;height:100%;"></iframe>';
	return s;
}

// 绑定右键菜单事件
function tabCloseEven() {
	// 刷新
	$('#mm-tabupdate').click(function() {
		var currTab = $('#tabs').tabs('getSelected');
		var url = $(currTab.panel('options').content).attr('src');
		if (url != undefined && currTab.panel('options').title != '首页') {
			$('#tabs').tabs('update', {
				tab : currTab,
				options : {
					content : createFrame(url)
				}
			});
		}
	});
	// 关闭当前
	$('#mm-tabclose').click(function() {
		var currtab_title = $('#tabMenu').data("currtab");
		$('#tabs').tabs('close', currtab_title);
	});
	// 全部关闭
	$('#mm-tabcloseall').click(function() {
		$('.tabs-inner span').each(function(i, n) {
			var t = $(n).text();
			if (t != '首页') {
				$('#tabs').tabs('close', t);
			}
		});
	});
	// 关闭除当前之外的TAB
	$('#mm-tabcloseother').click(function() {
		var prevall = $('.tabs-selected').prevAll();
		var nextall = $('.tabs-selected').nextAll();
		var currtab_title = $('#tabMenu').data("currtab");
		if (prevall.length > 0) {
			prevall.each(function(i, n) {
				var t = $('a:eq(0) span', $(n)).text();
				if (t != '首页' && t != currtab_title) {
					$('#tabs').tabs('close', t);
				}
			});
		}
		$('#tabs').tabs('select', currtab_title);
		if (nextall.length > 0) {
			nextall.each(function(i, n) {
				var t = $('a:eq(0) span', $(n)).text();
				if (t != '首页') {
					$('#tabs').tabs('close', t);
				}
			});
		}
		return false;
	});
	// 关闭当前右侧的TAB
	$('#mm-tabcloseright').click(function() {
		var nextall = $('.tabs-selected').nextAll();
		var currtab_title = $('#tabMenu').data("currtab");
		if (nextall.length == 0) {
			return false;
		}
		nextall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			if (t != '首页' && t != currtab_title) {
				$('#tabs').tabs('close', t);
			}
		});
		$('#tabs').tabs('select', currtab_title);
		return false;
	});
	// 关闭当前左侧的TAB
	$('#mm-tabcloseleft').click(function() {
		var prevall = $('.tabs-selected').prevAll();
		var currtab_title = $('#tabMenu').data("currtab");
		if (prevall.length == 0) {
			return false;
		}
		prevall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			if (t != '首页' && t != currtab_title) {
				$('#tabs').tabs('close', t);
			}
		});
		$('#tabs').tabs('select', currtab_title);
		return false;
	});
}
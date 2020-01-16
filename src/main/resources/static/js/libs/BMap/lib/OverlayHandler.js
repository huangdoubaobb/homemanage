/*jshint -W065,-W004,-W098 */

/*global BMap:false, glMap:false, ClassBase:false */

var OverlayHandler = ClassBase.extend({
	
	/**
	 * {
     *  default:{
     *      "删除":function(){
     *      }
     *  },
     *  18:{
     *      "打开":function(){
     *      }
     *  }
     * }
	 */
	contextMenu: null,//菜单
	
	/***
	 * 事件处理函数样式
	 * {
     *  default:{
     *       onclick:function(){
     *          }
     *  },
     *  //typeid 如一岁柜
     *  18:{
     *       onclick:function(){
     *          }
     *  },
     *  //变电站等
     *  10{
     *       onclick:function(){
     *          }
     *  }
     * }
	 */
	eventsHandler: null,
	
	lastOverlay: null,
	
	
	init: function (options) {
		ClassBase.combine(this, options);
		this.procFunctionScope();
	},
	
	procFunctionScope: function () {
		if (this.eventsHandler) {
			//noinspection JSDuplicatedDeclaration
			for (var typeID in this.eventsHandler) {
				if (this.eventsHandler.hasOwnProperty(typeID)) {
					var eh = this.eventsHandler[typeID];
					for (var evt in eh) {
						if (eh.hasOwnProperty(evt)) {
							eh[evt] = ClassBase.bindFunctionScope(this, eh[evt]);
						}
					}
				}
			}
		}
		if (this.contextMenu) {
			//noinspection JSDuplicatedDeclaration
			for (var typeID in this.contextMenu) {
				if (this.contextMenu.hasOwnProperty(typeID)) {
					var mh = this.contextMenu[typeID];
					for (var mi in mh) {
						if (mh.hasOwnProperty(mi)) {
							mh[mi] = ClassBase.bindFunctionScope(this, mh[mi]);
						}
					}
				}
			}
		}
	},
	appendContextMenu: function (ol) {
		if (this.contextMenu) {
			var typeField = ol.feature.layer.renderField;
			var typeID = ol.feature.attributes[typeField];
			var menu = null;
			if (this.contextMenu[typeID]) {
				menu = this.contextMenu[typeID];
			} else {
				menu = this.contextMenu["default"];
			}
			var cxtMenu = new BMap.ContextMenu();
			for (var i in menu) {
				if (menu.hasOwnProperty(i)) {
					var ovMenuItem = new BMap.MenuItem(i, menu[i]);
					cxtMenu.addItem(ovMenuItem);
				}
			}
			ol.glContextMenu = cxtMenu;
			ol.addContextMenu(cxtMenu);
		}
	},
	
	detachContextMenu: function (ol) {
		if (ol.glContextMenu) {
			ol.removeContextMenu(ol.glContextMenu);
		}
	},
	registerOverlayEvents: function (ol) {
		if (this.eventsHandler) {
			var typeField = ol.feature.layer.renderField;
			var typeID = ol.feature.attributes[typeField];
			var eh = null;
			if (this.eventsHandler[typeID]) {
				eh = this.eventsHandler[typeID];
			} else {
				eh = this.eventsHandler["default"];
			}
			for (var evt in eh) {
				if (eh.hasOwnProperty(evt)) {
					ol.addEventListener(evt, eh[evt]);
				}
			}
		}
	},
	unregisterOverlayEvents: function (ol) {
		if (this.eventsHandler) {
			var typeField = ol.feature.layer.renderField;
			var typeID = ol.feature.attributes[typeField];
			var eh = null;
			if (this.eventsHandler[typeID]) {
				eh = this.eventsHandler[typeID];
			} else {
				eh = this.eventsHandler["default"];
			}
			for (var evt in eh) {
				if (eh.hasOwnProperty(evt)) {
					ol.removeEventListener(evt, eh[evt]);
				}
			}
		}
	},
	
	destroy: function () {
		this.contextMenu = null;
		this.eventsHandler = null;
	},
	
	CLASS_NAME: "OverlayHandler"
});


/**
 * 按钮用来在地图上设置工具栏
 * User: xubing
 * Date: 14-5-26
 * Time: 上午10:12
 */

function GLensButtonPanel(map, options) {
	this._map = map;//******GLensMap对象
    this._options=options;
    //在地图上添加按钮
    this._toolbarPanel = new OpenLayers.Control.Panel({
        displayClass: "toolbarPanelDisplay",
        allowDepress: true,
        createControlMarkup: function(control) {
            var button = document.createElement('button'),
                iconSpan = document.createElement('span');
            textSpan = document.createElement('span');
            iconSpan.innerHTML = '&nbsp;';
            button.appendChild(iconSpan);
            if (control.text) {
                textSpan.innerHTML = control.text;
            }
            button.appendChild(textSpan);
            return button;
        }
    });

    this.addButtons=function(buttons) {
        var controls=new Array();
        if (buttons === undefined || buttons === null || buttons.length <= 0) {
            alert("按钮添加失败,原因是数据为空！");
            return;
        }

        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            var title = button.title;
            var displayClass = button.displayClass;
            var trigger = button.trigger;
            if (title === undefined || title === null) {
                title = "默认" + i;
            }
            if (displayClass === undefined || displayClass === null) {
                displayClass = "";
            }
            if (trigger === undefined || trigger === null) {
                trigger = function() { };
            }
            var buttonCon = new OpenLayers.Control.Button({ title: title,
                displayClass: displayClass,
                trigger: trigger
            });
            controls.push(buttonCon);
        }
        this._toolbarPanel.addControls(controls);
        this._map.addControl(this._toolbarPanel);
        //移动button面板位置
        this._toolbarPanel.moveTo(new OpenLayers.Pixel(50, 0));
    };

    this._trigger=function(callback, map) {
        var thatMap = map;
        return function() {
            callback(thatMap);
        };
    };
}

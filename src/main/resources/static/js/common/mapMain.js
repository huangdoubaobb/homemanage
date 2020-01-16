document.write("../../ppvision/js/mapOperation.js' type='text/javascript'></script>");
//加载设备树
/*function loadEquipmentTree(){
	  jQuery('#equipmentTree').jstree({
          "core": {
              "themes": {
                  "responsive": false
              },
              "data": [
                  {
                      "id": "1",
                      "text": "徐州市",
                      'state': {
                          'opened ': true  // is the node open
                      },
                      "children": [
                          {
                              "id": "1_1",
                              "text": "贺村变",
                              'state': {
                                  'selected': true  // is the node selected
                              },
                              "type": "file",
                              "children": [
                                {
                                	"id": "1_1_1",
                                    "text": "贺楚线",
                                    'state': {
                                        'selected': true  // is the node selected
                                    },
                                    "type": "file"
                                }
                              ]
                          },
                          {
                              "id": "1_2",
                              "text": "九里山变",
                              "type": "file"
                          },
                          {
                              "id": "1_3",
                              "text": "奎山变",
                              "type": "file"

                          }
                      ]
                  }
              ]
          },
          "types": {
              "default": {
                  "icon": false
              },
              "file": {
                  "icon": false
              }
          },
          "plugins": ["types"]
      });

}*/

function loadEquipmentTree(){
	 jQuery('#equipmentTree').jstree({
		 "core": {
             "themes": {
                 "responsive": false
             },
             "data":{
            	 "url" : function(node){
            		 return node.id === '#' ?
            		      '../../rest/panorama/initEquipmentTree' : '../../rest/panorama/getChildrenNodes';
            	 },
            	 "data" : function (node) {
            		 return node.id != '#' ? { 'nodeId' : node.id } : null;
            	 },
            	 "type" : "post",
            	 "dataType" : "json",
            	 "success" : function(data){
            		 return data;
            		 
            	 } 
             }
         },
         "types" : {
        	    "#" : {
        	      "max_children" : 1,
        	      "max_depth" : 4,
        	      "valid_children" : ["root"]
        	    },
        	    "root" : {
        	      "icon" : "/static/3.3.3/assets/images/tree_icon.png",
        	      "valid_children" : ["default"]
        	    },
        	    "default" : {
        	      "valid_children" : ["default","file"]
        	    },
        	    "file" : {
        	      "icon" : "glyphicon glyphicon-file",
        	      "valid_children" : []
        	    }
        	  },
        	  "plugins" : [
        	    "contextmenu", "dnd", "search",
        	    "state", "types", "wholerow"
        	  ]
	 }).bind('select_node.jstree', function (event, data) {  //绑定的点击事件
		 var node = data.node;
		 console.log(data.node);
		 $.ajax({
				url : '../../rest/panorama/getBatchId',
				dataType : 'json',
				type : 'post',
				data : {nodeId : node.id},
				success : function(returnData){	
					if(data.node.original.level == 2){//线路节点level为2
						if(returnData != "" && returnData !=null){
							var batch_id = returnData[0].batchId;
							loadTraildata(window.mapFrame.m_Map,batch_id,node.id);
						}else {
							$(".errorTip").show();
							setTimeout(function(){
								$(".errorTip").hide();
							},3000);
						}
					}
				} 
			});
     });
}

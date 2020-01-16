define(
    [],
    function () {
        return {
            /*body 高度 获得 开始*/
            intBodyHeiGai: function () {
                var intBodyHei = $(document.body).height();
                return intBodyHei
            },
            /*body 高度 获得 结束*/
            /*时间格式化 开始*/
            anyDateForm: function () {
                Date.prototype.Format = function (format) {
                    var o = {

                        "M+": this.getMonth() + 1, //month

                        "d+": this.getDate(), //day

                        "h+": this.getHours(), //hour

                        "m+": this.getMinutes(), //minute

                        "s+": this.getSeconds(), //second

                        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter

                        "S": this.getMilliseconds() //millisecond

                    }
                    //===
                    if (/(y+)/.test(format)) {

                        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

                    }
                    //===
                    for (var k in o) {

                        if (new RegExp("(" + k + ")").test(format)) {

                            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));

                        }

                    }
                    //===
                    return format;
                }
                /*用法 开始
                 function getDate(){
                     mOfeToo.anyDateForm();
                     var date = new Date();
                     var currentTime = date.Format("yyyy-MM-dd hh:mm:ss");
                 }
                 用法 结束*/
            }
            /*时间格式化 结束*/

        }
    }
);
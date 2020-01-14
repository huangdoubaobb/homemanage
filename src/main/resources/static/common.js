document.write('<link rel="stylesheet" href="webjars/bootstrap/3.3.7/css/bootstrap.min.css" />');
document.write('<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />');
document.write('<link href="assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />');
document.write('<link href="assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />');
document.write('<link href="assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css" />');
document.write('<link href="assets/global/css/components.min.css" rel="stylesheet" id="style_components" type="text/css" />');
document.write('<link href="assets/global/css/plugins.min.css" rel="stylesheet" type="text/css" />');
document.write('<script src="webjars/jquery/3.1.1/jquery.min.js"></script>');
document.write('<script src="webjars/bootstrap/3.3.7/js/bootstrap.min.js"></script>');
document.write('<script src="assets/global/plugins/respond.min.js"></script>');
document.write('<script src="assets/global/plugins/excanvas.min.js"></script>');
document.write('<script src="assets/global/plugins/ie8.fix.min.js"></script>');
document.write('<script src="assets/global/plugins/js.cookie.min.js" type="text/javascript"></script>');
document.write('<script src="assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>');
document.write('<script src="assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>');
document.write('<script src="assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>');
document.write('<script src="assets/global/scripts/app.min.js" type="text/javascript"></script>');

/**
 * FINTECH项目全局变量,对外提供一些共众变量、方法等
 */
var HOME = (function ($) {
    /**
     * 对外开放常量、方法对象
     */
    return {
        /**
         * 项目根地址
         */
        BASE_URL: "/homeManage",

    };
}(jQuery));
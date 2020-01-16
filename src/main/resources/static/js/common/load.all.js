(function () {
    var scriptName = "load.all.js";

    window.GLens = {};

    window.GLens.Load = {
        _getScriptLocation: (function () {
            var r = new RegExp("(^|(.*?\\/))(" + scriptName + ")(\\?|$)"), s = document
                .getElementsByTagName('script'), src, m, l = "";
            for (var i = 0, len = s.length; i < len; i++) {
                src = s[i].getAttribute('src');
                if (src) {
                    m = src.match(r);
                    if (m) {
                        l = m[1];
                        break;
                    }
                }
            }
            return (function () {
                return l;
            });
        })()
    };

    var jsFiles = [
        'jquery.min.js',
        '../../assets/global/plugins/bootstrap/js/bootstrap.min.js',
        'dateUtils.js',
        'jbase64.js',
        'securityInterceptor.js',
        'tools.js'
    ]; //"js/localization.js"语言本地化必须在最后加载

    var cssFiles = [
        '../../assets/global/plugins/font-awesome/css/font-awesome.min.css',
        '../../assets/global/plugins/bootstrap/css/bootstrap.min.css'
    ];

    var scriptTags = new Array(jsFiles.length);
    var host = GLens.Load._getScriptLocation();
    for (var i = 0, len = jsFiles.length; i < len; i++) {
        scriptTags[i] = "<script src='" + host + jsFiles[i] + "' type='text/javascript'></script>";
    }
    if (scriptTags.length > 0) {
        document.write(scriptTags.join(""));
    }

    var linkTags = new Array(cssFiles.length);
    for (var i = 0, len = cssFiles.length; i < len; i++) {
        linkTags[i] = "<link href='" + host + cssFiles[i] + "' rel='stylesheet'>";
    }
    if (linkTags.length > 0) {
        document.write(linkTags.join(""));
    }

})();
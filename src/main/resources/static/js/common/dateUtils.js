/*
-------------------------------------------------------------------------------
文件名称：dateUtils.js
说    明：JavaScript脚本，日期常用操作工具类
版    本：1.0
修改纪录:
-------------------------------------------------------------------------------
时间      修改人  说明
2016-6-23 xubing  创建

调用示例：
var dateUtil=new GlensDateUtils();
dateUtil.getMonthStartDate() 返回本月第一天

-------------------------------------------------------------------------------  
*/
function GlensDateUtils(){
	var now = new Date(); //当前日期 
	var nowDayOfWeek = now.getDay(); //今天本周的第几天 
	var nowDay = now.getDate(); //当前日 
	var nowMonth = now.getMonth(); //当前月 
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; // 
	
	var lastMonthDate = new Date(); //上月日期 
	lastMonthDate.setDate(1); 
	lastMonthDate.setMonth(lastMonthDate.getMonth()-1); 
	var lastYear = lastMonthDate.getYear(); 
	var lastMonth = lastMonthDate.getMonth(); 
	this.getLastMonthDate=function(){
		var lastMonthDate = new Date();  //上月日期
	    lastMonthDate.setDate(1);
	    lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
	    return lastMonthDate;
	};
	this.formatDate=function(date){  //格式化日期：yyyy-MM-dd
		var myyear = date.getFullYear();
	    var mymonth = date.getMonth()+1;
	    var myweekday = date.getDate();
	    mymonth=mymonth < 10?("0"+mymonth):mymonth;
	    myweekday=myweekday < 10?("0"+myweekday):myweekday;
	    return (myyear+"-"+mymonth + "-" + myweekday);
	};
	this.getMonthDays=function(value){//获得某月的天数
		var monthStartDate = new Date(nowYear, value, 1);
	    var monthEndDate = new Date(nowYear, value + 1, 1);
	    var days =(monthEndDate   -   monthStartDate)/(1000   *   60   *   60   *   24);
	    return  days;
	};
	this.getQuarterSeasonStartMonth = function (month) {
        var spring = 0; //春  
        var summer = 3; //夏  
        var fall = 6;   //秋  
        var winter = 9; //冬  
        //月份从0-11  
        if (month < 3) {
            return spring;
        }

        if (month < 6) {
            return summer;
        }

        if (month < 9) {
            return fall;
        }

        return winter;
    };
	this.getCurrentDate=function(){//今天
		return this.formatDate(new Date(nowYear, nowMonth, nowDay));
	};
	this.getYesterdayDate=function(){//昨天
		return this.formatDate(new Date(nowYear, nowMonth, nowDay-1));
	};
	this.getWeekStartDate=function(){//获得本周的开始日期
		return this.formatDate(new Date(nowYear, nowMonth, nowDay-nowDayOfWeek));
	};
	this.getWeekEndDate=function(){//获得本周的结束日期
		return this.formatDate(new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek)));
	};
	this.getUpWeekStartDate=function(){//获得上周的开始日期
		return this.formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek -7));
	};
	this.getUpWeekEndDate=function(){//获得上周的结束日期
		return this.formatDate(new Date(nowYear, nowMonth,  nowDay + (6 - nowDayOfWeek - 7)));
	};
	this.getMonthStartDate=function(){//获得本月的开始日期
		return this.formatDate(new Date(nowYear, nowMonth, 1));
	};
	this.getMonthEndDate=function(){//获得本月的结束日期
		return this.formatDate(new Date(nowYear, nowMonth, this.getMonthDays(nowMonth)));
	};
	this.getLastMonthStartDate=function(){//获得上月开始时间
		return this.formatDate(new Date(nowYear, lastMonth,1));
	};
	this.getLastMonthEndDate=function(){//获得上月结束时间
		return this.formatDate(new Date(nowYear, lastMonth,this.getMonthDays(lastMonth)));
	};
	this.getQuarterStartDate=function(){//获得本季度的开始日期
		 //获取当前时间  
        var currentDate = now;
        //获得当前月份0-11  
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();
        //获得本季度开始月份  
        var quarterSeasonStartMonth = this.getQuarterSeasonStartMonth(currentMonth);
        //获得本季度开始的日期  
        var quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1);
		return this.formatDate(quarterSeasonStartDate);
	};
	this.getQuarterEndDate=function(){//获得本季度的结束日期
		 //获取当前时间  
        var currentDate = now;
        //获得当前月份0-11  
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();
        //获得本季度开始月份  
        var quarterSeasonStartMonth = this.getQuarterSeasonStartMonth(currentMonth);
        //获得本季度结束月份  
        var quarterSeasonEndMonth = quarterSeasonStartMonth + 2;
        //获得本季度结束的日期  
        var quarterSeasonEndDate = new Date(currentYear, quarterSeasonEndMonth, this.getMonthDays(currentYear, quarterSeasonEndMonth));
		return this.formatDate(quarterSeasonEndDate);
	};
	this.getYearStartDate=function(){//获得本年开始日期
		//获取当前时间  
        var currentDate = now;
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();
        //本年第一天  
        var currentYearFirstDate = new Date(currentYear, 0, 1);
		return this.formatDate(currentYearFirstDate);
	};
	this.getYearEndDate=function(){//获得本年结束日期
		//获取当前时间  
        var currentDate =now;
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();
        //本年最后一天  
        var currentYearLastDate = new Date(currentYear, 11, 31);
		return this.formatDate(currentYearLastDate);
	};
}
	
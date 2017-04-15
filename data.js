(function(){
    var datepicker={};
    datepicker.getMonthData=function(year,month){
        var ret=[];
        if(!year&&!month){//如果没有传入year，month
            var today=new Date();
            year=today.getFullYear();
            month=today.getMonth()+1;
        }
        //获取该月份的第一天
        var firstDay=new Date(year,month-1,1);
        //获取该月份的年和月
        year=firstDay.getFullYear();
        month=firstDay.getMonth()+1;
        //获取该月第一天是星期几
        var firstDayWeekDay=firstDay.getDay();
        //矫正周日，在js里0是周日
        if(firstDayWeekDay===0){
            firstDayWeekDay=7;
        }
        //获取上个月的最后一天是几号
        var lastDayOfLastMonth=new Date(year,month-1,0);
        var lastDateOfLastMonth=lastDayOfLastMonth.getDate();
        //获取需要显示上个月多少天
        var preMonthDayCount=firstDayWeekDay-1;
        //获取本月最后一天是几号，
        var lastDay=new Date(year,month,0);
        var lastDate=lastDay.getDate();
        
        for(var i=0;i<7*6;i++){
            var date=i+1-preMonthDayCount;//
            var showDate=date;
            var thisMonth=month;
            if(date<=0){
                thisMonth=month-1;
                showDate=lastDateOfLastMonth+date;
            }else if(date>lastDate){
                thisMonth=month+1;
                showDate=showDate-lastDate;
            }
            if(thisMonth===0) thisMonth=12;
            if(thisMonth===13) thisMonth=1;
            ret.push({
                month:thisMonth,
                date:date,
                showDate:showDate
            })
        }
        return {
            year:year,
            month:month,
            days:ret
        };
    }
    window.datepicker=datepicker;
})();
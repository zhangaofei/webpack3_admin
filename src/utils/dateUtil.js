/**
 * Created by ENLINK on 2017/7/13.
 */


/****************
 * 将时间戳转换为标准日期格式
 * *****************/
export function  formatDateTime(date,noDay) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    // var h = date.getHours();
    // var minute = date.getMinutes();
    // minute = minute < 10 ? ('0' + minute) : minute;

    if(noDay){
        return y + '-' + m;
    }else {
        return y + '-' + m + '-' + d;
    }
};
// ***********zaf*******************
export function forTime(time) {
    var date = new Date(time);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    // var h = date.getHours();
    // var minute = date.getMinutes();
    // minute = minute < 10 ? ('0' + minute) : minute;
    return y + '-' + m + '-' + d;
};
export function forTimeVal(time) {
    var date = new Date(time);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var mm= date.getMinutes();
    var s=date.getSeconds();
    h = h < 10 ? ('0' + h) : h;
    mm = mm < 10 ? ('0' + mm) : mm;
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
};
export function flowmat(parm) {
    var dat=Number(parm);
    var userFlow=null,flowSize=null,obj={};
    if(dat<1024){
        userFlow=dat.toFixed(0);
        flowSize='B';
        obj={userFlow:userFlow,flowSize:flowSize};
        return obj
    }else if(dat/1024<1024){
        userFlow=(dat/1024).toFixed(0);
        flowSize='KB';
        obj={userFlow:userFlow,flowSize:flowSize};
        return obj
    }else if(dat/(1024*1024)<1024){
        userFlow=(dat/(1024*1024)).toFixed(0);
        flowSize='MB';
        obj={userFlow:userFlow,flowSize:flowSize};
        return obj
    }else {
        userFlow=(dat/(1024*1024*1024).toFixed(0));
        flowSize='GB';
        obj={userFlow:userFlow,flowSize:flowSize};
        return obj
    }
};
export function flowmatVal(parm) {
    var dat=Number(parm);
    let userFlow=null,flowSize=null,obj={};
    if(dat<1024){
        flowSize='B';
        userFlow=dat.toFixed(1);
        return userFlow+flowSize
    }else if(dat/1024<1024){
        flowSize='KB';
        userFlow=(dat/1024).toFixed(1);
        return userFlow+flowSize
    }else if(dat/(1024*1024)<1024){
        flowSize='MB';
        userFlow=(dat/(1024*1024)).toFixed(1);
        return userFlow+flowSize
    }else {
        flowSize='GB';
        userFlow=(dat/(1024*1024*1024)).toFixed(1);
        return userFlow+flowSize
    }
};
export function flowmatVal2(parm) {
    var dat=Number(parm);
    let userFlow=null,flowSize=null,obj={};
    if(dat<1024){
        flowSize='B';
        userFlow=dat.toFixed(0);
        return userFlow
    }else if(dat/1024<1024){
        flowSize='KB';
        userFlow=(dat/1024).toFixed(0);
        return userFlow
    }else if(dat/(1024*1024)<1024){
        flowSize='MB';
        userFlow=(dat/(1024*1024)).toFixed(0);
        return userFlow
    }else {
        flowSize='GB';
        userFlow=(dat/(1024*1024*1024).toFixed(0));
        return userFlow
    }
};
/****
 * 计算一个月有多少天
 * ***/
export function totalDays(year,month){
    if(has([1,3,5,7,8,10,12],month)){
        return 31;
    }else if(month==2){
        if(isLeap(year)) {
            return 29;
        }else {
            return 28;
        }
    }else {
        return 30;
    }

}

/*************
 * 计算是否是闰年
 * ************/
export function isLeap(year){
    if((year%100!=0&&year%4==0)||(year%100==0&&year%400==0)) {
        return true;
    }else {
        return false;
    }
}


export function has(list,item){
    for(let i of list){
        if(i==item){
            return true;
        }
    }
    return false;
}

function formatTen(num) {
    return num > 9 ? (num + "") : ("0" + num);
}

export function formatDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + "-" + formatTen(month) + "-" + formatTen(day);
}

export function dateFormat(fmt,date) {
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
export function timestampFormat(fmt, timestamp){
    return dateFormat(fmt, new Date(timestamp));
}
//数组重（元素是对象）
function obj2key(obj, keys){
    var n = keys.length,
        key = [];
    while(n--){
        key.push(obj[keys[n]]);
    }
    return key.join('|');
}
//去重操作
export function uniqeByKeys(array,keys){
    var arr = [];
    var hash = {};
    for (var i = 0, j = array.length; i < j; i++) {
        var k = obj2key(array[i], keys);
        if (!(k in hash)) {
            hash[k] = true;
            arr .push(array[i]);
        }
    }
    return arr ;
}
//布尔值false（true）转为字符串false（true）
export function toStrings(param){
    return param==false?'false':'true';
}
//字符串false（true）转为布尔值false（true）
export function toBoolean(param){
    return param=='false'?false:true;
}

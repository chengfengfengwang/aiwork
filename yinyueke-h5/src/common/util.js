function dateCount(timestamp) {
    var nowtime = Date.now();
    var curr_time = parseInt(nowtime / 1000);
    var diff_time = parseInt(timestamp - curr_time);// 倒计时时间差
    console.log(diff_time)
    var d = Math.floor(diff_time / (24 * 60 * 60));
    var h = Math.floor(diff_time / 3600);
    var m = Math.floor((diff_time / 60 % 60));
    var s = Math.floor((diff_time % 60));
    console.log(d, h, m, s)
    if (d > 0) {
        return '剩余' + d + '天过期'
    } else if (h > 0) {
        return `剩余${h}小时${m}分过期'`
    } else if (m > 0) {
        return '剩余' + m + '分钟过期'
    } else if (s > 0) {
        return `剩余${s}秒过期`
    } else {
        return '已过期'
    }
}
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return '';
}
function testPlat() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //return 'IOS';
        return 0
    } else if (/(Android)/i.test(navigator.userAgent)) {
        //return 'Android';
        return 1
    } else {
        return -1
    }
}
const platForm = testPlat()===0 ? 'IOS' : 'Android'
function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}
function formatTime(date) {
    var date = date * 1000; //项目返回的是秒级的时间戳
    var date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    //秒没有返回
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':');
}
function getDate(date) {
    var date = date; //项目返回的是秒级的时间戳
    var date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    //秒没有返回
    console.log(year, month, day)
    return year+'年'+month+'月'+day+'日'
}
function getCountDown(lefttime) {
    // var nowtime = new Date().valueOf();
    // var future = future * 1000;
    // var lefttime = parseInt((future - nowtime) / 1000);
    var d = parseInt(lefttime / (24 * 60 * 60));
    var h = parseInt(lefttime / (60 * 60) % 24);
    var m = parseInt(lefttime / 60 % 60);
    var s = parseInt(lefttime % 60);
    // h = formatNumber(h);
    // m = formatNumber(m);
    // s = formatNumber(s);
    var str = d + "天" + h + "小时" + m + "分";
    if(lefttime<=0){
        str = "已开始";
    };
    return str
}
const baseSize = 36
function setRem() {
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    if (document.documentElement.clientWidth < 1023) {
        const scale = document.documentElement.clientWidth / 750
        // 设置页面根节点字体大小
        document.documentElement.style.fontSize = (baseSize * Math.min(scale, .8)) + 'px'
    } else {
        document.documentElement.style.fontSize = '22px'
    }
}

const isIphonex = () => {
    if (typeof window !== 'undefined' && window) {
        return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;
    }
    return false;
};
//音乐壳
const openInYYK = window.navigator.userAgent.indexOf('com.immusician.children') != -1;
//校园版
const openInXYB = window.navigator.userAgent.indexOf('com.immusician.campus') != -1;

function testWeixin() { //判断是否是微信
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
};

function formatePhone(phone){
    if((phone+'').length != 11){
        return phone
    }else{
        return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');

    }
}
var u = navigator.userAgent, app = navigator.appVersion;
var openInApp = u.indexOf('immusician') != -1 || u.indexOf('buluobang') != -1 || u.indexOf('bangtabs') != -1;
export { getCountDown, formatePhone, getDate, openInApp, platForm, dateCount, formatNumber, getQueryVariable, testPlat, formatTime, setRem, isIphonex, openInYYK, openInXYB, testWeixin }
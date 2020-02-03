var axios = require('axios');
var testUrl = 'http://192.168.1.171:22222';

const baseUrl = 'http://iguitar.immusician.com:2525'; //http://192.168.1.171:22222
const coupon_id = '5c4ec0f9ab9a700db1667639'; //5c4fd6c09a5f77026df85cbf  本地 //5c4ec0f9ab9a700db1667639 //正式
function getPosition(e) {
    var x = e.getBoundingClientRect().left + document.documentElement.scrollLeft;
    var y = e.getBoundingClientRect().top + document.documentElement.scrollTop;
    return { x, y }
}
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return '';
}
function autoPlayAudio(id) {
    wx.config({
        // 配置信息, 即使不正确也能使用 wx.ready
        debug: false,
        appId: '',
        timestamp: 1,
        nonceStr: '',
        signature: '',
        jsApiList: []
    });
    wx.ready(function() {
        document.getElementById(id).play();
    });
}
function testPlat(){
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        return 'IOS';
      } else if (/(Android)/i.test(navigator.userAgent)) {
        return 'Android';
      } 
}
const platForm = testPlat();
function testWeixin() { //判断是否是微信
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
};
var isWeixin = testWeixin();
var u = navigator.userAgent.toLowerCase();
var openInApp  = u.indexOf('immusician')!=-1 || u.indexOf('buluobang')!=-1 || u.indexOf('bangtabs')!=-1;
function countVisit(is_whole){
    var myPlatForm;
    if(platForm=='IOS'){
        myPlatForm = '0'
    }else if(platForm=='Android'){
        myPlatForm = '1'
    }else{
        myPlatForm = '-1'
    }
    var myOpenInApp = openInApp?'0':'1';
    var param = {
        uid:getQueryVariable('uid'),       //个人信息  
        is_whole:is_whole+'',  //0整体 1个人
        platform:myPlatForm, //0是ios 1是安卓 -1未知
        source: myOpenInApp //0 app打开 1外部打开
    };
    console.log('---调用访问量接口---');
    console.log(param)
    axios.post(baseUrl + '/v3/user_view',param).then(res=>{

    })
}
function countShare(is_whole){
    var myPlatForm;
    if(platForm=='IOS'){
        myPlatForm = '0'
    }else if(platForm=='Android'){
        myPlatForm = '1'
    }else{
        myPlatForm = '-1'
    }
    var myOpenInApp = openInApp?'0':'1';
    axios.post(baseUrl + '/v3/user_share',{
        uid:getQueryVariable('uid'),       //个人信息  
        is_whole:is_whole+'',  //0整体 1个人
        platform:myPlatForm, //0是ios 1是安卓 -1未知
        source: myOpenInApp //0 app打开 1外部打开
    }).then(res=>{

    })
}
export {getPosition,getQueryVariable,autoPlayAudio,baseUrl,coupon_id,platForm,isWeixin,countVisit,countShare}
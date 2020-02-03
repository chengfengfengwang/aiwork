var axios = require('axios');
var qiniu = require("qiniu");

var accessKey = '493-3wqSvs35AYgjhYQaoY4qRHOb4i3bsxdFwwxQ';
var secretKey = 'DKXVZp563b434wmycV36njsqWrYr_ejYuZxSWE1S';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);


var cdnManager = new qiniu.cdn.CdnManager(mac);
var urlsToRefresh = [
    //'http://kids.immusician.com', 
    'http://kids.immusician.com/index.html',
    'http://kids.immusician.com/about.html',
    'http://kids.immusician.com/course.html',
    'http://kids.immusician.com/musicourse.html',
    'http://kids.immusician.com/index_mob.html',
    'http://kids.immusician.com/about_mob.html',
    'http://kids.immusician.com/course_mob.html',  
    'http://kids.immusician.com/musicourse_mob.html'
];
//刷新链接，单次请求链接不可以超过100个，如果超过，请分批发送请求
cdnManager.refreshUrls(urlsToRefresh, function (err, respBody, respInfo) {
    if (err) {
        throw err;
    }
    console.log(respInfo);
    var jsonBody = JSON.parse(respBody);
    console.log(jsonBody);
});
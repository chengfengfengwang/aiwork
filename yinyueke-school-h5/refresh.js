var qiniu = require("qiniu");

var accessKey = '493-3wqSvs35AYgjhYQaoY4qRHOb4i3bsxdFwwxQ';
var secretKey = 'DKXVZp563b434wmycV36njsqWrYr_ejYuZxSWE1S';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);


var cdnManager = new qiniu.cdn.CdnManager(mac);
var urlsToRefresh = [
    'http://kids.immusician.com/web/h5/test.html',
    'http://kids.immusician.com/web/h5/card.html',
    'http://kids.immusician.com/web/h5/cooperation.html',
    'http://kids.immusician.com/web/h5/songList.html',
    'http://kids.immusician.com/web/h5/songList.html?from=common',
    'http://kids.immusician.com/web/h5/songList.html?from=hb',
    'http://kids.immusician.com/web/h5/bookActivity.html',
    'http://kids.immusician.com/web/h5/instrument.html',
    'http://kids.immusician.com/web/h5/acSuccess.html',
    'http://kids.immusician.com/web/h5/courseAc.html',
    'http://kids.immusician.com/web/h5/courseDetail.html'
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
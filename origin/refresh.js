var qiniu = require("qiniu");

var accessKey = '493-3wqSvs35AYgjhYQaoY4qRHOb4i3bsxdFwwxQ';
var secretKey = 'DKXVZp563b434wmycV36njsqWrYr_ejYuZxSWE1S';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);


var cdnManager = new qiniu.cdn.CdnManager(mac);
var urlsToRefresh = [
    'http://s.immusician.com/static/web/item.html?type=68',
    'http://s.immusician.com/static/web/item.html?type=69'
];
//刷新链接，单次请求链接不可以超过100个，如果超过，请分批发送请求
cdnManager.refreshUrls(urlsToRefresh, function (err, respBody, respInfo) {
    if (err) {
        throw err;
    }
 
});
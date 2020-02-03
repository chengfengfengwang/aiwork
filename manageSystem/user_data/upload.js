var qiniu = require("qiniu");
var fs = require('mz/fs');
var path = require('path');
var find = require('lodash.find');
var qiniuConfig = {
    accessKey: '493-3wqSvs35AYgjhYQaoY4qRHOb4i3bsxdFwwxQ',
    secretKey: 'DKXVZp563b434wmycV36njsqWrYr_ejYuZxSWE1S',
    domains: [
        {
            domain: 'http://s.immusician.com',
            buckName: 'immusician'
        },
        {
            domain: 'http://cdn.kids.immusician.com',
            buckName: 'yinji'
        },
        {
            domain: 'http://cdn.kids-web.immusician.com',
            buckName: 'yinji-web'
        }
    ]
}
const hostConfig = {
    htmlBuckName: 'yinji-web',
    htmlHost: 'http://cdn.kids-web.immusician.com',
    htmlPath: 'admin/operation/',
    assetsBuckName: 'immusician',
    assetsHost: 'http://s.immusician.com',
    assetsPath: 'web/admin/operation/'
};

uploadApp();

function uploadApp() {
    showFiles('./dist', function (filePath) {
        var appConfig = hostConfig;
        var localFile = './dist/' + filePath;

        if (localFile.indexOf('html') !== -1) {
            uploadAndRefresh(appConfig['htmlBuckName'], appConfig['htmlPath'] + filePath, localFile)
        } else {
            uploadAndRefresh(appConfig['assetsBuckName'], appConfig['assetsPath'] + filePath, localFile)
        }

    })
}
async function showFiles(param, callBack) {
    var stat = await fs.stat(param);
    if (stat.isDirectory()) {
        var files = await fs.readdir(param);
        files.forEach(e => {
            const absolutePath = path.join(param, e);
            showFiles(absolutePath, callBack)
        })
    } else {
        var filePath = param.split('dist/')[1];
        if (callBack) {
            callBack(filePath)
        }
        //upload('immusician',key, localFile);
    }
}
function uploadAndRefresh(buckName, key, localFile) {
    var refreshUrl = find(qiniuConfig.domains, { buckName }).domain + '/' + key;
    upload(buckName, key, localFile, function () {
        //refresh(refreshUrl)
    })
}
function upload(buckName, key, localFile, successCallBack) {
    var accessKey = qiniuConfig.accessKey;
    var secretKey = qiniuConfig.secretKey;
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    var config = new qiniu.conf.Config();
    // 空间对应的机房
    //config.zone = qiniu.zone.Zone_z1;
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();

    var Bucket = `${buckName}:${key}`;
    var options = {
        scope: Bucket
        //MimeType:0,
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);

    formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr,
        respBody, respInfo) {
            console.log('------------')
            console.log(uploadToken, key, localFile, putExtra)
            console.log('------------')
        if (respErr) {
            throw respErr;
        } else {
            if (successCallBack) {
                successCallBack()
            }
        }
        if (respInfo.statusCode == 200) {
            console.log(respBody);
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
            if (respBody.error) {
                console.log(respBody.error)
            }
        }
    });
}
function refresh(url) {
    var accessKey = qiniuConfig.accessKey;
    var secretKey = qiniuConfig.secretKey;
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var cdnManager = new qiniu.cdn.CdnManager(mac);
    if ((typeof url) === 'string') {
        var arr = [];
        arr.push(url)
        var urlsToRefresh = arr;
    } else if (url instanceof Array) {
        var urlsToRefresh = url;
    }
    //刷新链接，单次请求链接不可以超过100个，如果超过，请分批发送请求
    cdnManager.refreshUrls(urlsToRefresh, function (err, respBody, respInfo) {
        if (err) {
            throw err;
        }
        console.log(respInfo);
        var jsonBody = JSON.parse(respBody);
        console.log(jsonBody);
    });
}


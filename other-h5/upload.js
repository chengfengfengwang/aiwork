var fs = require('fs');
var path = require('path');
var qiniu = require("qiniu");
//空间名称
//var buckName = 'base-html';
var buckName = 'immusician';
//前缀名
var prefix = 'web/h5/';

main()

function main(){
    displayFile('./dist')
}
// upload('static/css/app.4648e402426a319c1582ceb43ae85344.css',"./dist/static/css/app.4648e402426a319c1582ceb43ae85344.css")
// setTimeout(() => {
//     upload('static/js/app.aec09cb4c8c96792a361.js',"./dist/static/js/app.aec09cb4c8c96792a361.js")

// }, 0);

function upload(key,localFile) {

    var accessKey = '493-3wqSvs35AYgjhYQaoY4qRHOb4i3bsxdFwwxQ';
    var secretKey = 'DKXVZp563b434wmycV36njsqWrYr_ejYuZxSWE1S';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    
    
    var config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z1;
    // 是否使用https域名
    //config.useHttpsDomain = true;
    // 上传是否使用cdn加速
    //config.useCdnDomain = true;
    
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
        if (respErr) {
            throw respErr;
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

//遍历文件夹
function displayFile(param) {
    //转换为绝对路径
    //var param = path.resolve(param);
    fs.stat(param, function (err, stats) {
        //如果是目录的话，遍历目录下的文件信息
        if (stats.isDirectory()) {
            fs.readdir(param, function (err, file) {
                file.forEach((e) => {
                    //遍历之后递归调用查看文件函数
                    //遍历目录得到的文件名称是不含路径的，需要将前面的绝对路径拼接
                    var absolutePath = path.join(param, e);
                    //var absolutePath = path.resolve(path.join(param, e));
                    displayFile(absolutePath)
                })
            })
        } else {
            //如果不是目录，打印文件信息
            //console.log(param)
            //console.log(param);
            var key = prefix + param.split('dist/')[1];
            var localFile = './' + param;
            //console.log(key);
            upload(key,localFile)
        }
    })
}

//文件覆盖
function forceCover() {

    var srcBucket = Bucket;
    var srcKey = key;
    var destBucket = Bucket;
    var destKey = 'zzz.html';
    // 强制覆盖已有同名文件
    var options = {
        force: true
    }
    var bucketManager = new qiniu.rs.BucketManager(mac, config);
    bucketManager.move(srcBucket, srcKey, destBucket, destKey, options, function (
        err, respBody, respInfo) {
        if (err) {
            console.log(err);
            //throw err;
        } else {
            //200 is success
            console.log(respInfo.statusCode);
        }
    });
}
var fs = require('fs');
var path = require('path');
var qiniu = require("qiniu");
const uploadConfig = require('./uploadConfig');
//空间名称
var webBuckName = uploadConfig.webBuckName;
//前缀名
var webPrefix = uploadConfig.webPrefix;

//空间名称
var assetsBuckName = uploadConfig.assetsBuckName;
//前缀名
var assetsPrefix = uploadConfig.assetsPrefix;

main()

function main(){
    displayFile('./dist')
}

function upload(key,localFile,fileType) {

    var accessKey = '493-3wqSvs35AYgjhYQaoY4qRHOb4i3bsxdFwwxQ';
    var secretKey = 'DKXVZp563b434wmycV36njsqWrYr_ejYuZxSWE1S';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    
    
    var config = new qiniu.conf.Config();
    // 空间对应的机房
    if(fileType==='html'){
        config.zone = qiniu.zone.Zone_z1; //华北
        var Bucket = `${webBuckName}:${key}`;
    }else{
        config.zone = qiniu.zone.Zone_z0//华东
        var Bucket = `${assetsBuckName}:${key}`;
    }
    // 是否使用https域名
    //config.useHttpsDomain = true;
    // 上传是否使用cdn加速
    //config.useCdnDomain = true;
    
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();


    
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
            
            var localFile = './' + param;
            
            if(param.indexOf('.html')>-1){
                var key = webPrefix + param.split('dist/')[1];
                upload(key,localFile,'html')
            }else{
                var key = assetsPrefix + param.split('dist/')[1];
                upload(key,localFile,'assets')
            }
            console.log(key);
            
        }
    })
}


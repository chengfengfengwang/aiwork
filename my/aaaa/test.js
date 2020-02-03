var request = require('request');
var fs = require('fs');

/*
* url 网络文件地址
* filename 文件名
* callback 回调函数
*/
function downloadFile(uri,filename,callback){
    var stream = fs.createWriteStream(filename);
    request(uri).pipe(stream).on('close', callback); 
}

var fileUrl  = 'http://s.immusician.com/static/mp3/Moon%20River%E9%92%A2%E7%90%B4%E7%89%88.mp3';
var filename = 'beauty.mp3';
downloadFile(fileUrl,filename,function(){
    console.log(filename+'下载完毕');
});
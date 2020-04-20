var fs = require('fs');
var path = require('path');


main()

function main(){
    displayFile('./asd')
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
            console.log(param)
            //console.log(param);
            // var key = prefix + param.split('dist/')[1];
            // var localFile = './' + param;
            // console.log(key);
        }
    })
}


var Fontmin = require('fontmin');
var text = `
ABOUT US
北京音悦荚科技有限责任公司
音乐壳隶属于北京音乐荚科技有限公司，因一群热爱音乐、怀揣音乐梦想的人而生！致力于智能互动、数字化在线音乐教学的创新应用。
联系电话：
010-81708781
联系邮箱：
service@immusician.com
联系地址：
北京市昌平区回龙观西大街龙冠商务中心`
var fontmin = new Fontmin()
    .src('./originFonts/SourceHanSansK-Regular.ttf')
    .use(Fontmin.glyph({
        text: text,
        hinting: false         // keep ttf hint info (fpgm, prep, cvt). default = true
    }))
    .dest('src/assets/font');
fontmin.run(function (err, files) {
    if (err) {
        throw err;
    }

    //console.log(files[0]);
    // => { contents: <Buffer 00 01 00 ...> }
});


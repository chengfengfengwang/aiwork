var Fontmin = require('fontmin');
var regularText = `
P2-end 0123456789 年  月  日，你是第  个加入了AI音乐学院的同学 和 W+ 的同学 一起开启了你的音乐之旅
P3-end 千里之行，始于足下 这一年，你有一个小目标 是学会 你一共在AI音乐学院学习了  套课程 T
在线学琴时间 1304 分 弹奏音符 1274639 个 超过了 49% 的学员 恭喜你是当之无愧的
勇于追求，不断超越 是你的人生态度 一共拿到 345 次A 超过了 49% 的同学  吉他 尤克里里 卡林巴 非洲鼓 拇指琴我`
var fontmin = new Fontmin()
    .src('./originFont/SourceHanSerifCN-Regular.ttf')
    .use(Fontmin.glyph({
        text: regularText,
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


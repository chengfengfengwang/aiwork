var Fontmin = require('fontmin');
var text = `
关于我们`;
var fontmin = new Fontmin()
    .src('./originFonts/SourceHanSansK-Medium.ttf')
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


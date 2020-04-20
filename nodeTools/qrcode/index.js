const QRCode = require('qrcode');
var url = 'http://cdn.kids-web.immusician.com/yinji/book417.html';
//var url = 'http://cdn.kids-web.immusician.com/yinji/childMusicBook.html?s=1'
var arr = [];
for (var i=0;i<9;i++){
  arr.push(url+'?index='+i)
}
//console.log(arr)
arr.forEach((e,index)=>{
  var fileName = './qr-imgs/qr' + (index) + '.png'
  QRCode.toFile(fileName, e, {
    width:256,
    margin:2
  }, function (err) {
    if (err) throw err
    console.log('done')
  })
})

const QRCode = require('qrcode');
var url = 'http://cdn.kids-web.immusician.com/yinji/childMusicBook.html';
//var url = 'http://cdn.kids-web.immusician.com/yinji/childMusicBook.html?s=1'
var arr = [];
for (var i=0;i<25;i++){
  arr.push(url+'?s='+(i+1))
}
//console.log(arr)
arr.forEach((e,index)=>{
  var fileName = './qr-imgs-childMusicBook/qr' + (index+1) + '.png'
  QRCode.toFile(fileName, e, {
    width:256,
    margin:2
  }, function (err) {
    if (err) throw err
    console.log('done')
  })
})

const QRCode = require('qrcode');
var url = 'http://kids.immusician.com/web/h5/card.html';
var arr = [];
for (var i=0;i<25;i++){
  arr.push(url+'?v='+(i+1))
}
//console.log(arr)
arr.forEach((e,index)=>{
  var fileName = './qr/qr' + (index+1) + '.png'
  QRCode.toFile(fileName, e, {
    width:256,
    margin:2
  }, function (err) {
    if (err) throw err
    console.log('done')
  })
})

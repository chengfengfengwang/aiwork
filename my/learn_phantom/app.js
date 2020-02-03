var webPage = require('webpage');
var page = webPage.create();

page.viewportSize = { width: 1920, height: 1080 };

//var url = 'http://cdn.kids-web.immusician.com/yinji/learnReport.html?uid=25963&lessonId=53';
var url = "http://192.168.1.99:5502/learnReport/test.html";
var url = 'http://127.0.0.1:5502/learnReport/learnReport1.html?uid=25963&lessonId=53'
//var url = 'http://127.0.0.1:5502/learnReport/learnReport.html?uid=25963&lessonId=53'
var url = 'http://cdn.kids-web.immusician.com/web/h5/learnReport.html?uid=25963&lessonId=53'
page.settings.javascriptEnabled = true;
//page.viewportSize = { width: 375, height : 667 };
page.viewportSize = { width: 750, height : 1334 };

page.open(url, function start(status) {
    console.log(status)
    setTimeout(function () {
        page.render('asd.jpeg', { format: 'jpeg', quality: '100' });
        console.log('zzz')
        phantom.exit();
    }, 5000);

});
// const phantom = require('phantom');

// phantom.create(function (ph) {
//   ph.createPage(function (page) {
//     page.open("http://192.168.1.99:5502/learnReport/learnReport1.html?uid=25963&lessonId=53", function (status) {
//       console.log('Page Loaded');
//       ph.exit();
//     });
//   });
// });
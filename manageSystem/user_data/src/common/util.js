
// var find = require('lodash.find');
// var findkey = require('lodash.findkey');
function getTime(date, incomeTime) {
    if (incomeTime == 'incomeTime') {
        var frontTimeStap = new Date().setHours(0, 0, 0, 0);
        var date = frontTimeStap + date * 1000; //项目只返回了时间的时间戳
    } else {
        var date = date * 1000; //项目返回的是秒级的时间戳
    }

    var date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    //秒没有返回
    return [hour, minute].map(formatNumber).join(':');
}
function timeToTimeStamp(timeString) { //传入09:00 返回 32400秒级的时间戳
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var fullTimeString = [year, month, day].map(formatNumber).join('-') + ' ' + timeString;
    return (new Date(fullTimeString).valueOf() - new Date().setHours(0, 0, 0, 0)) / 1000;
}
function getDate(date) {
    var date = date * 1000;

    var date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    //秒没有返回
    return [year, month, day].map(formatNumber).join('-');
}
function formatTime(date) {
    var date = date * 1000; //项目返回的是秒级的时间戳
    var date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    //秒没有返回
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':');
}
function formatTimeOnlyDate(date) {
    var date = date * 1000; //项目返回的是秒级的时间戳
    var date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    //秒没有返回
    return [year, month, day].map(formatNumber).join('-');
}
function formatTimeY(date) {
    var date = date * 1000; //项目返回的是秒级的时间戳
    var date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    //秒没有返回
    return [year, month, day].map(formatNumber).join('-') + 'T' + [hour, minute,second].map(formatNumber).join(':');
}
function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}
function compare(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
function getIndex(arr, id) {
    var temp;
    arr.forEach((v, i) => {
        //console.log(v)
        if (v.id == id) {
            //console.log('xxx' + i)
            temp = i
        }
    })
    return temp
}
function getTagName(arr, value) {
    var temp;
    arr.forEach((v, i) => {
        //console.log(v)
        if (v.value == value) {
            //console.log('xxx' + i)
            temp = v.name
        }
    })
    return temp
}
function encodeSearchParams(obj) {
    const params = []
  
    Object.keys(obj).forEach((key) => {
      let value = obj[key]
      // 如果值为undefined我们将其置空
      if (typeof value === 'undefined') {
        value = ''
      }
      // 对于需要编码的文本（比如说中文）我们要进行编码
      params.push([key, encodeURIComponent(value)].join('='))
    })
  
    return params.join('&')
  }
//提交时候把空字符串过滤掉
function selectQuestionFilter(question) {
    for (var i = question.options.length; i > 0; i--) {
        if (question.options[i] === '') {
            question.options.splice(i, 1)
        }
    };
    return question
}
//数据来的时候把options补成4个
function selectQuestionOption(question) {
    var myOptions = JSON.parse(JSON.stringify(question.options));
    for (var i = 0; i < 4; i++) {
        if (myOptions[i] === '' || !myOptions[i]) {
            myOptions[i] = '';
        }
    }
    return myOptions
}
export { formatNumber, formatTimeOnlyDate, formatTimeY, formatTime, getTime, timeToTimeStamp, getDate, compare, getIndex, getTagName, selectQuestionFilter, selectQuestionOption, find, findkey, encodeSearchParams }
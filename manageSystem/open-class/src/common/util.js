
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
function formatPermission(value) {
    switch (value) {
        case 0:
            return '管理员';
            break;
        case 1:
            return '组长';
            break;
        case 2:
            return '组员';
            break
    }
}
function formatAscription(value) {
    switch (value) {
        case 0:
            return '管理员';
            break;
        case 1:
            return '一组';
            break;
        case 2:
            return '二组';
            break
    }
}
function tableColumnsFilter(arr){
    for(var i=arr.length-1;i>=0;i--){
        if (this.$store.getters.permission > arr[i].permission) {
            arr.splice(i,1)
        }
      }
}

export { formatNumber, formatTime, getTime, 
    timeToTimeStamp, getDate, compare, 
    getIndex, getTagName, formatPermission, 
    formatAscription, tableColumnsFilter }
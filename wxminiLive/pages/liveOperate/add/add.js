//index.js
//获取应用实例
const app = getApp()
const dateTimePicker = require('../../../utils/dateTimePicker.js');

Page({
  data: {
    dateTimeMinuteArray: null,
    dateTimeMinute: null,
    startYear: 2020,
    endYear: 2050,
    resultTimeValue:'请选择直播开始时间',
    items: [
      { name: '奥尔夫打击乐', value: '0' },
      { name: '果园一级', value: '1', checked: 'true' },
    ]
  },
  
  onLoad: function () {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj2 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj2.dateTimeArray.pop();
    var lastTime = obj2.dateTime.pop();
    console.log(obj1,obj2)
    this.setData({
      dateTimeMinute: obj2.dateTime,
      dateTimeMinuteArray: obj2.dateTimeArray
    });
  },
  changeDateTimeMinute(e) {
    console.log('changeDateTimeMinute: ' + e.detail.value);
    
    let tempTime = '';
    for(var i=0;i<5;i++){
      tempTime += `${this.data.dateTimeMinuteArray[i][this.data.dateTimeMinute[i]]}-`
    }
    //console.log(this.data.resultTimeValue)
    this.setData({ dateTime1: e.detail.value,resultTimeValue:tempTime });
  },


  changeDateTimeMinuteColumn(e) {
    var arr = this.data.dateTimeMinute, dateArr = this.data.dateTimeMinuteArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeMinuteArray: dateArr,
      dateTimeMinute: arr
    });
  }

})
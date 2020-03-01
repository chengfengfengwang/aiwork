//index.js
//获取应用实例
const util = require("../../../utils/util.js");
const baseUrl = getApp().globalData.baseUrl;
const v9 = getApp().globalData.v9;
const app = getApp();

const dateTimePicker = require("../../../utils/dateTimePicker.js");
let classId = "";
let courseId = "";
let lessonId = "";
let oTempTime = "";
Page({
  data: {
    dateTimeMinuteArray: null,
    dateTimeMinute: null,
    startYear: 2020,
    endYear: 2050,
    resultTimeValue: "请选择直播开始时间",
    lessons: [
    ]
  },

  onLoad: function(option) {
    classId = option.classId;
    courseId = option.courseId;
    this.getLessons();

    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj1 = dateTimePicker.dateTimePicker(
      this.data.startYear,
      this.data.endYear
    );
    var obj2 = dateTimePicker.dateTimePicker(
      this.data.startYear,
      this.data.endYear
    );
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj2.dateTimeArray.pop();
    var lastTime = obj2.dateTime.pop();
    console.log(obj1, obj2);
    this.setData({
      dateTimeMinute: obj2.dateTime,
      dateTimeMinuteArray: obj2.dateTimeArray
    });
  },
  radioChange: function (e) {
    lessonId = e.detail.value
    
  },
  getLessons() {
    wx.showLoading({
      title: "加载中"
    });
    util
      .$get(`${v9}/live_info/course_detail`, {
        course_id: courseId
      })
      .then(res => {
        this.setData({
          lessons:res.data,
        });
        wx.hideLoading();
      });
  },
  cteateLive() {
    wx.showLoading({
      title: "加载中"
    });
    util
      .$post(`${v9}/live_info/add_plan`, {
        group_id: classId,
        start_time: new Date(oTempTime).valueOf()/1000,
        lesson_id: lessonId
      })
      .then(res => {
        wx.hideLoading();
        wx.navigateTo({
          url: `/pages/classDetail/classDetail?classId=${classId}`
        });
      });
  },
  nextStep() {
    this.cteateLive();
  },
  changeDateTimeMinute(e) {
    console.log("changeDateTimeMinute: " + e.detail.value);

    let tempTime = "";
    for (var i = 0; i < 5; i++) {
      let timeGroup = `${
        this.data.dateTimeMinuteArray[i][this.data.dateTimeMinute[i]]
      }`;
      if (i == 3) {
        tempTime += `${timeGroup}:`;
      } else {
        tempTime += `${timeGroup} `;
      };
      if (i == 3) {
        oTempTime += `${timeGroup}:`;
      } else if(i == 4){
        oTempTime += `${timeGroup}`;
      }else {
        oTempTime += timeGroup.substring(0, timeGroup.length - 1) + ' ';
      }
    }
    this.setData({ dateTime1: e.detail.value, resultTimeValue: tempTime });
  },
  changeDateTimeMinuteColumn(e) {
    var arr = this.data.dateTimeMinute,
      dateArr = this.data.dateTimeMinuteArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(
      dateArr[0][arr[0]],
      dateArr[1][arr[1]]
    );

    this.setData({
      dateTimeMinuteArray: dateArr,
      dateTimeMinute: arr
    });
  }
});
// pages/coursesDetails/coursesDetails.js

const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: app.globalData.navHeight,
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,
    isShow: false,
    teacherAccount: "rainpleliu",
    borderRadius: 0,
    showOutline: true,
    isIOS: app.globalData.isIOS
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      course_id: options.course_id,
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    var telephone = wx.getStorageSync('telephone')
    var uid = wx.getStorageSync('uid')
    var token = wx.getStorageSync('token')
    console.log(telephone, uid, token)

    if (uid) {
      this.setData({
        uid: uid,
        token: token,
        telephone: telephone,
      })

    }

    this.getCourse()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    if (this.data.uid) {
      var uid = this.data.uid
    } else {
      var uid = ''
    }
    return {
      title: "AI音乐学院",
      path: '/pages/home/home?inviteId=' + uid,
      imageUrl: this.data.fileurl,
      success: function(res) {
        // 转发成功
        console.log("转发成功")
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败")
      }
    }
  },

  getCourse() {
    var cmd = `${getApp().globalData.urlBase}/v3/wechat/course_detail`
    var headers = {}
    if (this.data.uid) {
      headers.token = this.data.token
      headers.uid = this.data.uid
    }
    var newData = {
      course_id: this.data.course_id
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: cmd,
      header: headers,
      data: newData,
      success: (res) => {
        wx.hideLoading();
        if (res.data.data.wechat_course_desc.course_content) {

        } else {

          this.setData({
            showOutline: false,
          })

        }

        this.setData({
          course: res.data.data,
        })

        var time_arr = this.getDuration(res.data.data.countdown)
        this.countDown(time_arr)

      },
      fail: () => {
        wx.showToast({
          title: `网络错误！`,
          duration: 1000
        })
      }
    })
  },

  countDown(time_arr) {

    console.log(time_arr)
    var days = time_arr[0]
    var hours = time_arr[1]
    var minutes = time_arr[2]
    var seconds = time_arr[3]

    if (isNaN(parseInt(days))) {
      days = 5
    }
    if (isNaN(parseInt(hours))) {
      hours = 0
    }
    if (isNaN(parseInt(minutes))) {
      minutes = 0
    }
    if (isNaN(parseInt(seconds))) {
      seconds = 0
    }

    this.setData({
      countDownDay: days,
      countDownHour: hours,
      countDownMinute: minutes,
      countDownSecond: seconds,
    })

    var timer = setInterval(function() {

      if (seconds == 0) {
        if (minutes == 0) {
          if (hours == 0) {
            if (days == 0) {
              days = 5
            } else {
              seconds = 59
              minutes = 59
              hours = 23
              days--
            }
          } else {
            seconds = 59
            minutes = 59
            hours--
          }
        } else {
          seconds = 59
          minutes--
        }
      } else {
        seconds--
      }

      this.setData({
        countDownDay: days,
        countDownHour: hours,
        countDownMinute: minutes,
        countDownSecond: seconds,
      })

    }.bind(this), 1000)
  },
  getDuration(my_time) {
    console.log(my_time)
    var days = my_time / 1000 / 60 / 60 / 24;
    var daysRound = Math.floor(days);
    var hours = my_time / 1000 / 60 / 60 - (24 * daysRound);
    var hoursRound = Math.floor(hours);
    var minutes = my_time / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
    var minutesRound = Math.floor(minutes);
    var seconds = my_time / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
    var secondsRound = Math.floor(seconds);
    return [daysRound, hoursRound, minutesRound, secondsRound]
  },

  goIndent(event) {
    // console.log(event)
    var courseTitle = event.currentTarget.dataset.courseTitle
    var coursePrice = event.currentTarget.dataset.coursePrice
    var courseOldPrice = event.currentTarget.dataset.courseOldPrice
    var courseInstrumentType = event.currentTarget.dataset.courseInstrumentType
    var courseType = event.currentTarget.dataset.courseType
    var courseLevel = event.currentTarget.dataset.courseLevel
    var courseLevelType = event.currentTarget.dataset.courseLevelType
    var goodsId = event.currentTarget.dataset.goodsId

    if (!this.data.telephone) {
      wx.navigateTo({
        url: '../loginNew/loginNew?courseTitle=' + courseTitle + '&courseOldPrice=' + courseOldPrice + '&coursePrice=' + coursePrice + '&courseInstrumentType=' + courseInstrumentType + '&courseType=' + courseType + '&courseLevel=' + courseLevel + '&courseLevelType=' + courseLevelType + '&goodsId=' + goodsId
      })
    } else {
      wx.navigateTo({
        url: '../indent/indent?courseTitle=' + courseTitle + '&courseOldPrice=' + courseOldPrice + '&coursePrice=' + coursePrice + '&courseInstrumentType=' + courseInstrumentType + '&courseType=' + courseType + '&courseLevel=' + courseLevel + '&courseLevelType=' + courseLevelType + '&goodsId=' + goodsId
      })
    }


  },

  isShow() {
    this.setData({
      isShow: true,
    })
  },

  close() {
    this.setData({
      isShow: false,
    })
  },
  saveTeacherQrImg() {
    util.saveImg('https://s.immusician.com/static/wechat/images/rainpleliu.jpeg')
  },
  
  copyWxNumber() {
    wx.setClipboardData({
      data: this.data.teacherAccount,
      success(res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1500
        })
      }
    })
  }

})
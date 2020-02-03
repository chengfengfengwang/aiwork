// pages/courses/courses.js
const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: app.globalData.navHeight,
    isIOS: app.globalData.isIOS
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var coursesTitle = ""
    if (options.instrument_type == 0) {
      coursesTitle = "吉他课程"
    } else if (options.instrument_type == 1) {
      coursesTitle = "尤克里里课程"
    } else if (options.instrument_type == 2) {
      coursesTitle = "拇指琴课程"
    }
    this.setData({
      instrument_type: options.instrument_type,
      coursesTitle: coursesTitle
    })
    this.getCourses()

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
    var localUid = wx.getStorageSync('uid')
    if (localUid) {
      var uid = localUid
    } else {
      var uid = ''
    }
    return {
      title: "AI音乐学院",
      path: '/pages/home/home?inviteId=' + uid,
      imageUrl: this.data.fileurl,
      success: function (res) {
        // 转发成功
        console.log("转发成功")
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败")
      }
    }
  },

  getCourses() {    
    wx.showLoading({
      title: '加载中',
    })
    util.$get(`${getApp().globalData.urlBase}/v3/wechat/course_list`, {
      instrument_type: this.data.instrument_type
    }).then(res => {
      wx.hideLoading();
      console.log(res)
      console.log(res.data.data)
      this.setData({
        courses: res.data.data,
      })
    }).catch(e => {
      wx.showToast({
        title: `网络错误！`,
        duration: 1000,
        icon: "none"
      })
    })
  },

  goCoursesDetails: function(event) {
    var courseId = event.currentTarget.dataset.courseId
    wx.navigateTo({
      url: '../coursesDetails/coursesDetails?course_id=' + courseId
    })
  }


})
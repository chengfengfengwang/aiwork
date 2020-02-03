// pages/study/study.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: app.globalData.navHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var uid = wx.getStorageSync('uid')
    var token = wx.getStorageSync('token')

    if (uid) {
      this.setData({
        uid: uid,
        token: token,
      })
      this.getStudyProgress()
    } else {
      wx.redirectTo({
        url: '../activity/activity'
      })
    }
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

  getStudyProgress() {
    var cmd = `${getApp().globalData.urlBase}/v3/courses/study_schedule`
    var headers = {
      'token': this.data.uid,
      'uid': this.data.uid,
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: cmd,
      header: headers,
      success: (res) => {
        wx.hideLoading();
        if (res.data.data) {
          var courses = res.data.data
          this.setData({
            courses: courses,
          })
        } else {
          this.setData({
            courses: []
          })
        }

      },
      fail: () => {
        wx.showToast({
          title: `网络错误！`,
          duration: 1000
        })
      }
    })
  },

})
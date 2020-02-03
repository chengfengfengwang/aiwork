// pages/user/user.js
const app = getApp()
const openid = app.globalData.openid
const util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    navTitle: '我的',
    bright: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.q) {
      var parameter = decodeURIComponent(options.q)
      var paramArr = parameter.split("=")
      if (paramArr) {
        this.setData({
          bright: parseInt(paramArr[1])
        })
      }
    }
    this.setData({
      userInfo: wx.getStorageSync("userInfo"),
      hasUserInfo: true
    })
    this.data.openid = wx.getStorageSync("openid")
    if (this.data.bright) {
      util.$get(`${getApp().globalData.urlBase}/v3/wechat/is_bright`, {
        openid: this.data.openid
      }).then(res => {
        wx.hideLoading()
      }).catch(e => {
        wx.stopPullDownRefresh()
        wx.showToast({
          title: `网络错误！`,
          duration: 1000,
          icon: "none"
        })
      })
    }
  },
  onShareAppMessage: function () {
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
  myClass() {
    util.$get(`${getApp().globalData.urlBase}/v3/wechat/my_class`, {
      openid: this.data.openid
    }).then(res => {
      if (res.data.error == 0) {
        app.globalData.classList = res.data.data
        wx.navigateTo({
          url: `../user/class/class?bright=${this.data.bright}`,
        })
      } else {
        if (res.data.error == 1) {
          wx.navigateTo({
            url: `../user/guide/guide`,
          })
        }
      }
    }).catch(e => {
      this.setData({
        isLoading: true,
      })
      wx.stopPullDownRefresh()
      wx.showToast({
        title: `网络错误！`,
        duration: 1000,
        icon: "none"
      })
    })
  },
  backLast() {
    wx.navigateBack({
      delta: 1
    })
  },

})
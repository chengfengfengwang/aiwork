// pages/user/bright/bright.js
const app = getApp()
const wechatUrl = getApp().globalData.urlBase
const util = require('../../../utils/util.js')
let auth = require('../../../templates/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://192.168.1.77:22222/v3/wechat/help?instrument_type=1',
    showWebview:false
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    if (options.q) {
      var parameter = decodeURIComponent(options.q)
      var paramArr = parameter.split("=")
      if (paramArr) {
        this.setData({
          bright: parseInt(paramArr[1])
        })
      }
    }
    this.data.openid = options.openid
    this.setData({
      openid: wx.getStorageSync('openid'),
      showShare: options.showShare || false
    })
    if (this.data.bright) {
      this.setData({
        class_id: this.data.bright
      })
      util.$get(`${getApp().globalData.urlBase}/v3/wechat/is_bright`, { openid: this.data.openid, class_id: this.data.bright }).then(res => {
        wx.hideLoading()
        this.setData({
          showWebview: true,
          url: res.data.url
        })
      }).catch(e => {
        wx.stopPullDownRefresh()
        wx.showToast({ title: `网络错误！`, duration: 1000, icon: "none" })
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})
// pages/user/class/class.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle: '我的班级',
    classList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: wx.getStorageSync('openid'),
      classList: app.globalData.classList,
      bright: options.bright
    })
  },
  clickBright(e){
    let item = e.currentTarget.dataset.list
    util.$get(`${getApp().globalData.urlBase}/v3/wechat/is_bright`, { openid: this.data.openid, class_id: item.id,}).then(res => {
      this.setData({
        classList:res.data
      })
      wx.hideLoading()
    }).catch(e => {
      wx.stopPullDownRefresh()
      wx.showToast({ title: `网络错误！`, duration: 1000, icon: "none" })
    })
  },
  openClass(e){
    console.log(e)
    let item = e.currentTarget.dataset.list
    wx.navigateTo({
      url: '../rank/rank?openid='+this.data.openid+'&class_id='+item.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */  
  backLast() {
    wx.navigateBack({
      delta: 1
    })
  },
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

  /**
   * 用户点击右上角分享
   */
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
})
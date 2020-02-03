// pages/user/wechatQr/wechatQr.js
const app = getApp()
const util = require('../../../utils/util.js')
let auth = require('../../../templates/index.js');
Page(Object.assign({}, auth.authUserInfo, {
  data: {
    wechatQr: 'http://iguitar-new.iguitar.immusician.com/class=29.png',
    className: '尤克里里10届02班',
    userName: '尤晓坡',
    showShare: false,
    authInfoDlg: true, // 是否显示授权弹框
  },
  onLoad: function (options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权用户信息，不再弹出自定义授权弹框
          this.setData({
            authInfoDlg: false
          })
          wx.getUserInfo({
            success: res => {
              wx.setStorageSync('userInfo', res.userInfo)
            }
          })
        } else {
          // 没有授权，弹出自定义授权弹框
          this.setData({
            authInfoDlg: true
          })
        }
      }
    })
    util.$get(`${getApp().globalData.urlBase}/v3/wechat/get_wechat_qr`, {class_user_id: options.classUserId}).then(res=>{
      this.setData({
        wechatQr: res.data.wechatQr,
        className: res.data.className,
        userName: res.data.userName,
        class_user_id: res.data.classUserId,
      })
    })

  },

  previewImage() {
    this.data.openid = wx.getStorageSync('openid')
    this.data.userinof = wx.getStorageSync('userInfo')
    util.$get(`${getApp().globalData.urlBase}/v3/wechat/auto_class_login`, { openid: this.data.openid, nick_name: this.data.userinof.nickName, avatar_url: this.data.userinof.avatarUrl, class_user_id:this.data.class_user_id}).then(res=>{
    console.log(res.data,'AAAAAAAAAAAAAA')
    }).catch(e=>{
    })
    const arrQr = []
    arrQr.push(this.data.wechatQr)
    wx.previewImage({
      current: this.data.wechatQr, // 当前显示图片的http链接   
      urls: arrQr, // 需要预览的图片http链接列表   
    })
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
  backIndex() {
    wx.switchTab({
      url: '../../../pages/song/song',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
}))
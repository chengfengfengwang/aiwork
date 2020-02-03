// pages/login/login.js
const app = getApp()
const util = require('../../utils/util.js')
let auth = require('../../templates/index.js');
Page(Object.assign({}, auth.authUserInfo,{
  data: {
    className : 'aaaa',
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
            success: res =>{
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
    if (options.class_id){
      this.data.id=options.class_id
    }else{
    console.log(options.class_id, 'class_id下版测试')
    var parameter = decodeURIComponent(options.q)
    var paramArr = parameter.split("=")
    this.data.id = paramArr[1]
    }
    console.log(this.data.id, 22222222)
    this.getClass()
  },
  getClass(){
    util.$get(`${getApp().globalData.urlBase}/v3/wechat/class`, {class_id: this.data.id}).then(res => {
      this.setData({
        className: res.data.data.name
      })
    })
  },
  telLogin(e){
    this.data.openid = wx.getStorageSync('openid')
    this.data.userinof = wx.getStorageSync('userInfo')
    util.$get(`${getApp().globalData.urlBase}/v3/wechat/tel_login`, { class_id: this.data.id, openid: this.data.openid, tel: e.detail.value, nick_name: this.data.userinof.nickName, avatar_url: this.data.userinof.avatarUrl}).then(res => {
      console.log(res.data)
      if (res.data.error==0|| res.data.error==2 || res.data.error==4){
        wx.navigateTo({
          url: `../user/rank/rank?class_name=${this.data.className}&openid=${this.data.openid}&class_id=${this.data.id}`,
        })
      }
      // if (res.data.error==4) {
        // wx.navigateTo({
        // url:`../user/wechatQr/wechatQr?wechatQr=${res.data.wechat_qr}&userName=${res.data.user_name},&className=${res.data.class_name}`
        // })
      // }
      if (res.data.error==1){
         wx.showToast({ title: `${res.data.msg}`, duration: 1000, icon: "none" })
        }
      if (res.data.error==3){
        wx.navigateTo({
          url: `../user/guide/guide`,
          })
        }
      
    }).catch(e => {
        this.setData({
        isLoading: true,
      })
      wx.stopPullDownRefresh()
      wx.showToast({ title: `网络错误！`, duration: 1000, icon: "none" })
    })
  },
  backIndex(){
    wx.switchTab({
      url: '../../pages/song/song',
    })
  },
  onShareAppMessage(res){
    if (res.from === 'menu'){
      this.setData({
        showShare: true
      })
    }

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

onShow: function () {
    // 授权用户信息

  },
}))
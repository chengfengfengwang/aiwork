const app = getApp()
const wechatUrl = getApp().globalData.urlBase
var authUserInfo = {
  _getUserInfo (e) {
    if (e.detail.userInfo) {
      wx.setStorageSync('userInfo', e.detail.userInfo)
      // 关闭自定义授权弹框
      this.setData({
        authInfoDlg: false
      })
      wx.showToast({
        title: '授权成功'
      }) 
      if (this.authSuccess) {
        this.authSuccess();
      }
    }
  }
};

module.exports = authUserInfo;

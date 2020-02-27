const util = require('../../utils/util.js');
const baseUrl = getApp().globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    hasMore: true,
    phone:'',
    vcodeText: '获取验证码'
  },
  phoneInput(e){
    this.setData({
      phone:e.detail.value
    })
  },
  getPhoneCode(e) {
    let vcodeText = this.data.vcodeText;
    if (vcodeText === "重新获取" || vcodeText === "获取验证码") {
      this.axios
        .post(`${baseUrl}/v1/user/tx_sms/`, {
          phone: this.form.phone
        })
        .then(res => {
          console.log(res);
        });
    } else {
      return;
    }
    var count = 59;
    this.setData({
      vcodeText:count + "s"
    })
    var timer = setInterval(() => {
      this.setData({
        vcodeText:--count + "s"
      })
      if (count === 0) {
        clearInterval(timer);
        this.setData({
          vcodeText:"重新获取"
        })
      }
    }, 1000);
  },
  getList(type) {
    this.setData({
      isLoading: true,
      hasMore: true
    })
    type === 'down' ? this.setData({ id: 0 }) : null;
    util.$get(`${musicUrl}/api/channel/music/more`, { id: this.data.id }).then(res => {
      if (res.data.res === 0) {
        this.processData(type, res.data.data)
      }
    }).catch(e => {
      this.setData({
        isLoading: true,
        hasMore: false
      })
      wx.stopPullDownRefresh()
      wx.showToast({ title: `网络错误!`, duration: 1000, icon: "none" })
    })
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

  }
})
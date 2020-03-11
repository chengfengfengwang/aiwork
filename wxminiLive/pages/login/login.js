const util = require("../../utils/util.js");
const baseUrl = getApp().globalData.baseUrl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    hasMore: true,
    phone: "",
    vcode: "",
    vcodeText: "获取验证码",
    loginBtnActive: false
  },
  onLoad: function(options) {
    console.log('love3')
  },
  phoneInput(e) {
    this.setData({
      phone: e.detail.value
    });
    this.watchForm();
  },
  vcodeInput(e) {
    this.setData({
      vcode: e.detail.value
    });
    this.watchForm();
  },
  watchForm() {
    if (this.data.phone && this.data.vcode) {
      this.setData({
        loginBtnActive: true
      });
    } else {
      this.setData({
        loginBtnActive: false
      });
    }
  },
  getPhoneCode(e) {
    let vcodeText = this.data.vcodeText;
    if (vcodeText === "重新获取" || vcodeText === "获取验证码") {
      util
        .$post(`${baseUrl}/tx_sms`, {
          phone: this.data.phone
        })
        .then(res => {
          console.log(res);
        });
    } else {
      return;
    }
    var count = 59;
    this.setData({
      vcodeText: count + "s"
    });
    var timer = setInterval(() => {
      this.setData({
        vcodeText: --count + "s"
      });
      if (count === 0) {
        clearInterval(timer);
        this.setData({
          vcodeText: "重新获取"
        });
      }
    }, 1000);
  },
  login() {
    wx.showLoading({
      title: '加载中',
    });
    util
      .$post(`${baseUrl}/phone_login`, {
        phone: this.data.phone,
        code: this.data.vcode
      })
      .then(res => {
        wx.hideLoading();
        console.log(res.data.role)
        if(res.data.role!=1){
          wx.showToast({
            title: '请使用教师账号登录',
            icon: 'none',
            duration: 3000
          });
        }else{
          wx.setStorageSync('userAcount', this.data.phone);
          wx.setStorageSync('uid', res.data.uid);
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('institutions_id', res.data.institutions_id);
          wx.navigateTo({
            url: "/pages/liveClassList/liveClassList" 
          });
        }
       
      });
  },
  getList(type) {
    this.setData({
      isLoading: true,
      hasMore: true
    });
    type === "down" ? this.setData({ id: 0 }) : null;
    util
      .$get(`${musicUrl}/api/channel/music/more`, { id: this.data.id })
      .then(res => {
        if (res.data.res === 0) {
          this.processData(type, res.data.data);
        }
      })
      .catch(e => {
        this.setData({
          isLoading: true,
          hasMore: false
        });
        wx.stopPullDownRefresh();
        wx.showToast({ title: `网络错误!`, duration: 1000, icon: "none" });
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
